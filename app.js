let tripCount = 0;

function addTrip() {
  tripCount++;
  const tripList = document.getElementById('tripList');
  const item = document.createElement('div');
  item.className = 'trip-item';
  item.innerHTML = `
    <span class="trip-number">${tripList.children.length + 1}</span>
    <div class="form-row" style="flex:1; margin-bottom:0;">
      <div class="form-group">
        <label>${t('entryDate')}</label>
        <input type="date" class="trip-entry" onchange="updateTripDays(this)">
      </div>
      <div class="form-group">
        <label>${t('exitDate')}</label>
        <input type="date" class="trip-exit" onchange="updateTripDays(this)">
      </div>
    </div>
    <span class="trip-days"></span>
    <button class="btn-remove" onclick="removeTrip(this)" title="${t('deleteTrip')}">&times;</button>
  `;
  tripList.appendChild(item);
}

function removeTrip(btn) {
  btn.closest('.trip-item').remove();
  document.querySelectorAll('.trip-item').forEach((item, i) => {
    item.querySelector('.trip-number').textContent = i + 1;
  });
}

function updateTripDays(input) {
  const item = input.closest('.trip-item');
  const entry = item.querySelector('.trip-entry').value;
  const exit = item.querySelector('.trip-exit').value;
  const daysSpan = item.querySelector('.trip-days');
  if (entry && exit) {
    const days = inclusiveDaysBetween(parseLocalDate(entry), parseLocalDate(exit));
    daysSpan.textContent = days > 0 ? days + ' ' + t('days') : '';
  } else {
    daysSpan.textContent = '';
  }
}

// 用本地时间解析日期字符串，避免时区问题
function parseLocalDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

// 返回两个日期之间的天数 (d2 - d1)
function daysBetween(d1, d2) {
  const ms = d2.getTime() - d1.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

function inclusiveDaysBetween(d1, d2) {
  return daysBetween(d1, d2) + 1;
}

// 日期减去 N 个日历月，正确处理月末溢出
function subtractMonths(date, months) {
  const d = new Date(date);
  const originalDay = d.getDate();
  d.setMonth(d.getMonth() - months);
  if (d.getDate() !== originalDay) {
    d.setDate(0);
  }
  return d;
}

function cloneDate(d) {
  return new Date(d.getTime());
}

function addDays(d, n) {
  const r = cloneDate(d);
  r.setDate(r.getDate() + n);
  return r;
}

/**
 * 计算在 [windowStart, windowEnd] 窗口内，总共在澳洲待了多少天。
 *
 * - 历史行程: [entry, exit]，入境日和离境日都算。
 * - 当前行程: [currentEntry, currentEndDay]，两端都算。
 */
function countDaysInWindow(windowStart, windowEnd, trips, currentEntry, currentEndDay) {
  let total = 0;

  for (const trip of trips) {
    const overlapStart = trip.entry > windowStart ? trip.entry : windowStart;
    const overlapEnd = trip.exit < windowEnd ? trip.exit : windowEnd;
    if (overlapEnd >= overlapStart) {
      total += inclusiveDaysBetween(overlapStart, overlapEnd);
    }
  }

  if (currentEndDay >= currentEntry) {
    const overlapStart = currentEntry > windowStart ? currentEntry : windowStart;
    const overlapEnd = currentEndDay < windowEnd ? currentEndDay : windowEnd;
    if (overlapEnd >= overlapStart) {
      total += inclusiveDaysBetween(overlapStart, overlapEnd);
    }
  }

  return total;
}

/**
 * 找到最早可以入境并住满 365 天的日期。
 * 从 searchStart 开始逐日搜索，检查假设住满 365 天是否全程合规。
 */
function findEarliestFullYearDate(trips, searchStart) {
  const FULL_STAY = 365;

  // 如果没有历史行程，从 searchStart 即可住满
  if (trips.length === 0) return cloneDate(searchStart);

  // 搜索上限：最后一次历史离境 + 18 个月
  let latestExit = searchStart;
  for (const trip of trips) {
    if (trip.exit > latestExit) latestExit = trip.exit;
  }
  const searchEnd = addDays(subtractMonths(latestExit, -18), FULL_STAY);

  let candidate = cloneDate(searchStart);

  while (candidate <= searchEnd) {
    const stayEnd = addDays(candidate, FULL_STAY - 1);
    let valid = true;

    // 从最后一天往前检查（最后一天约束最紧，可以早期剪枝）
    let x = cloneDate(stayEnd);
    while (x >= candidate) {
      const windowStart = subtractMonths(x, 18);
      const totalInWindow = countDaysInWindow(windowStart, x, trips, candidate, x);
      if (totalInWindow > FULL_STAY) {
        valid = false;
        break;
      }
      x = addDays(x, -1);
    }

    if (valid) return candidate;
    candidate = addDays(candidate, 1);
  }

  return null;
}

function formatDateCN(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y} 年 ${m} 月 ${d} 日`;
}

function formatDateEN(date) {
  const months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function showError(msg) {
  const el = document.getElementById('errorMsg');
  el.textContent = msg;
  el.classList.add('show');
  document.getElementById('resultCard').classList.remove('show');
}

function calculate() {
  const errorEl = document.getElementById('errorMsg');
  errorEl.classList.remove('show');
  document.getElementById('resultCard').classList.remove('show');

  const lastArrivalStr = document.getElementById('visaLastArrivalDate').value;
  const currentEntryStr = document.getElementById('currentEntryDate').value;

  if (!lastArrivalStr || !currentEntryStr) {
    return showError(t('errorFillAll'));
  }

  const lastArrivalDate = parseLocalDate(lastArrivalStr);
  const currentEntry = parseLocalDate(currentEntryStr);

  if (currentEntry > lastArrivalDate) {
    return showError(t('errorArrivalExceeded'));
  }

  // 解析历史行程
  const trips = [];
  let totalHistoricalDays = 0;
  const tripItems = document.querySelectorAll('.trip-item');
  for (const item of tripItems) {
    const entryVal = item.querySelector('.trip-entry').value;
    const exitVal = item.querySelector('.trip-exit').value;
    if (!entryVal || !exitVal) {
      return showError(t('errorFillTrip'));
    }
    const entry = parseLocalDate(entryVal);
    const exit = parseLocalDate(exitVal);
    if (exit < entry) {
      return showError(t('errorExitBeforeEntry'));
    }
    const days = inclusiveDaysBetween(entry, exit);
    totalHistoricalDays += days;
    trips.push({ entry, exit });
  }

  trips.sort((a, b) => a.entry - b.entry);

  const MAX_STAY_DAYS = 365;
  const MAX_SEARCH_DAYS = 548;
  let lastValidDate = null;
  let limitedByRule = false;

  let d = cloneDate(currentEntry);
  const searchEnd = addDays(currentEntry, MAX_SEARCH_DAYS);

  while (d <= searchEnd) {
    const windowStart = subtractMonths(d, 18);
    const totalInWindow = countDaysInWindow(windowStart, d, trips, currentEntry, d);

    if (totalInWindow > MAX_STAY_DAYS) {
      lastValidDate = addDays(d, -1);
      limitedByRule = true;
      break;
    }

    d = addDays(d, 1);
  }

  if (!limitedByRule) {
    lastValidDate = searchEnd;
  }

  if (lastValidDate < currentEntry) {
    return showError(t('errorNoStay'));
  }

  const thisStayDays = inclusiveDaysBetween(currentEntry, lastValidDate);

  const finalWindowStart = subtractMonths(lastValidDate, 18);
  const totalUsedInWindow = countDaysInWindow(finalWindowStart, lastValidDate, trips, currentEntry, lastValidDate);

  // 展示结果
  document.getElementById('resultDateMain').textContent = formatDateCN(lastValidDate);
  document.getElementById('resultDateSub').textContent = formatDateEN(lastValidDate);
  document.getElementById('resultConstraint').textContent = t('constraintText');

  document.getElementById('resultDetails').innerHTML = `
    <div class="detail-item">
      <div class="detail-value">${totalHistoricalDays}</div>
      <div class="detail-label">${t('historicalDays')}</div>
    </div>
    <div class="detail-item">
      <div class="detail-value">${thisStayDays}</div>
      <div class="detail-label">${t('thisStayDays')}</div>
    </div>
    <div class="detail-item">
      <div class="detail-value">${totalUsedInWindow}</div>
      <div class="detail-label">${t('windowTotal')}</div>
    </div>
    <div class="detail-item">
      <div class="detail-value">${MAX_STAY_DAYS - totalUsedInWindow + thisStayDays}</div>
      <div class="detail-label">${t('windowRemaining')}</div>
    </div>
  `;

  const warningEl = document.getElementById('resultWarning');
  if (thisStayDays <= 14) {
    warningEl.textContent = t('warningFewDays');
    warningEl.style.display = 'block';
  } else {
    warningEl.style.display = 'none';
  }

  // 计算最早可住满一年的日期
  const allTrips = trips.slice();
  // 把本次停留也作为"历史"记录加入，计算下次入境
  allTrips.push({ entry: currentEntry, exit: lastValidDate });
  const fullYearEl = document.getElementById('fullYearInfo');
  const earliestFullYear = findEarliestFullYearDate(allTrips, addDays(lastValidDate, 1));
  if (earliestFullYear) {
    const beyondVisa = earliestFullYear > lastArrivalDate;
    if (beyondVisa) {
      fullYearEl.innerHTML = `
        <div class="full-year-label">${t('fullYearLabel')}</div>
        <div class="full-year-note">${t('fullYearVisaExpired')}</div>
      `;
    } else {
      fullYearEl.innerHTML = `
        <div class="full-year-label">${t('fullYearLabel')}</div>
        <div class="full-year-date">${formatDateCN(earliestFullYear)}</div>
        <div class="full-year-date-sub">${formatDateEN(earliestFullYear)}</div>
        <div class="full-year-note">${t('fullYearNote')}</div>
      `;
    }
    fullYearEl.style.display = 'block';
  } else {
    fullYearEl.style.display = 'none';
  }

  // 保存最终日期供日历功能使用
  window._lastValidDate = lastValidDate;

  const resultCard = document.getElementById('resultCard');
  resultCard.classList.add('show');
  setTimeout(() => {
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 50);
}

// 获取提醒日期（最终日期 - 提前天数）
function getReminderDate() {
  if (!window._lastValidDate) return null;
  const days = parseInt(document.getElementById('reminderDays').value) || 7;
  return addDays(window._lastValidDate, -days);
}

// 格式化为 YYYYMMDD（Google Calendar 用）
function toGCalDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

function addToGoogleCalendar() {
  const reminderDate = getReminderDate();
  if (!reminderDate) return;

  const title = encodeURIComponent(t('calendarEventTitle'));
  const desc = encodeURIComponent(t('calendarEventDesc'));
  const dateStr = toGCalDate(reminderDate);
  const nextDay = toGCalDate(addDays(reminderDate, 1));

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${desc}&dates=${dateStr}/${nextDay}`;
  window.open(url, '_blank');
}

/**
 * 从 URL 参数自动填充表单并触发计算。
 * 参数格式:
 *   ?lastArrival=2027-07-01
 *   &currentEntry=2027-03-29
 *   &trips=2024-10-15,2025-01-12;2025-04-13,2025-09-21
 *   &lang=zh
 *   &auto=1        （自动计算）
 */
function loadFromURLParams() {
  const params = new URLSearchParams(window.location.search);

  const lang = params.get('lang');
  if (lang) setLang(lang);

  const lastArrival = params.get('lastArrival');
  if (lastArrival) {
    document.getElementById('visaLastArrivalDate').value = lastArrival;
  }

  const tripsStr = params.get('trips');
  if (tripsStr) {
    const tripPairs = tripsStr.split(';');
    for (const pair of tripPairs) {
      const [entry, exit] = pair.split(',');
      if (entry && exit) {
        addTrip();
        const items = document.querySelectorAll('.trip-item');
        const lastItem = items[items.length - 1];
        lastItem.querySelector('.trip-entry').value = entry.trim();
        lastItem.querySelector('.trip-exit').value = exit.trim();
        updateTripDays(lastItem.querySelector('.trip-entry'));
      }
    }
  }

  const currentEntry = params.get('currentEntry');
  if (currentEntry) {
    document.getElementById('currentEntryDate').value = currentEntry;
  }

  if (params.get('auto') === '1' && lastArrival && currentEntry) {
    setTimeout(() => calculate(), 100);
  }
}

function addToAppleCalendar() {
  const reminderDate = getReminderDate();
  if (!reminderDate) return;

  const title = t('calendarEventTitle');
  const desc = t('calendarEventDesc');
  const dateStr = toGCalDate(reminderDate);

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART;VALUE=DATE:${dateStr}`,
    `DTEND;VALUE=DATE:${toGCalDate(addDays(reminderDate, 1))}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${desc}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT0M',
    'ACTION:DISPLAY',
    `DESCRIPTION:${title}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'visa-reminder.ics';
  link.click();
  URL.revokeObjectURL(link.href);
}
