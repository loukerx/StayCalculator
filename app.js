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
        <label>入境日期</label>
        <input type="date" class="trip-entry" onchange="updateTripDays(this)">
      </div>
      <div class="form-group">
        <label>离境日期</label>
        <input type="date" class="trip-exit" onchange="updateTripDays(this)">
      </div>
    </div>
    <span class="trip-days"></span>
    <button class="btn-remove" onclick="removeTrip(this)" title="删除">&times;</button>
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
    const days = daysBetween(parseLocalDate(entry), parseLocalDate(exit));
    daysSpan.textContent = days > 0 ? days + ' 天' : '';
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
 * - 历史行程: [entry, exit)，离境日不算。
 * - 当前行程: [currentEntry, currentEndDay]，两端都算。
 */
function countDaysInWindow(windowStart, windowEnd, trips, currentEntry, currentEndDay) {
  let total = 0;

  for (const trip of trips) {
    const overlapStart = trip.entry > windowStart ? trip.entry : windowStart;
    const windowExclEnd = addDays(windowEnd, 1);
    const overlapEnd = trip.exit < windowExclEnd ? trip.exit : windowExclEnd;
    const overlap = daysBetween(overlapStart, overlapEnd);
    if (overlap > 0) total += overlap;
  }

  if (currentEndDay >= currentEntry) {
    const overlapStart = currentEntry > windowStart ? currentEntry : windowStart;
    const overlapEnd = currentEndDay < windowEnd ? currentEndDay : windowEnd;
    const overlap = daysBetween(overlapStart, overlapEnd) + 1;
    if (overlap > 0) total += overlap;
  }

  return total;
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

  const grantStr = document.getElementById('visaGrantDate').value;
  const lastArrivalStr = document.getElementById('visaLastArrivalDate').value;
  const currentEntryStr = document.getElementById('currentEntryDate').value;

  if (!grantStr || !lastArrivalStr || !currentEntryStr) {
    return showError('请填写所有签证信息和本次入境日期。');
  }

  const grantDate = parseLocalDate(grantStr);
  const lastArrivalDate = parseLocalDate(lastArrivalStr);
  const currentEntry = parseLocalDate(currentEntryStr);

  if (lastArrivalDate <= grantDate) {
    return showError('签证最晚入境日期必须晚于签证批准日期。');
  }
  if (currentEntry < grantDate) {
    return showError('本次入境日期不能早于签证批准日期。');
  }
  if (currentEntry > lastArrivalDate) {
    return showError('本次入境日期已超过签证最晚入境日期（Must not arrive after）。');
  }

  // 解析历史行程
  const trips = [];
  let totalHistoricalDays = 0;
  const tripItems = document.querySelectorAll('.trip-item');
  for (const item of tripItems) {
    const entryVal = item.querySelector('.trip-entry').value;
    const exitVal = item.querySelector('.trip-exit').value;
    if (!entryVal || !exitVal) {
      return showError('请完整填写每条出入境记录的入境和离境日期。');
    }
    const entry = parseLocalDate(entryVal);
    const exit = parseLocalDate(exitVal);
    if (exit <= entry) {
      return showError('出入境记录中离境日期必须晚于入境日期。');
    }
    const days = daysBetween(entry, exit);
    totalHistoricalDays += days;
    trips.push({ entry, exit });
  }

  trips.sort((a, b) => a.entry - b.entry);

  /**
   * 核心计算：逐日模拟
   *
   * 签证最晚入境日期（Must not arrive after）仅限制能否入境，
   * 入境后的停留时长完全由 "18 个月内最多停留 12 个月" 规则决定。
   *
   * 逐日向后检查，直到 18 个月窗口内总天数超过 365 天。
   * 设置一个合理的上限（入境日 + 548 天，即 18 个月）防止无限循环，
   * 因为单次连续停留不可能超过 18 个月而不违规。
   */
  const MAX_STAY_DAYS = 365;
  const MAX_SEARCH_DAYS = 548; // 18 个月约 548 天，作为搜索上限
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

  // 如果在搜索范围内没有超限，最晚可待到搜索上限
  if (!limitedByRule) {
    lastValidDate = searchEnd;
  }

  // 如果最终日期早于入境日，说明已经没有可用天数
  if (lastValidDate < currentEntry) {
    return showError('根据 18 个月内最多停留 12 个月的规则，本次入境已无法停留。');
  }

  // 计算本次可停留天数
  const thisStayDays = daysBetween(currentEntry, lastValidDate) + 1;

  // 计算最终日期对应的 18 个月窗口内总天数
  const finalWindowStart = subtractMonths(lastValidDate, 18);
  const totalUsedInWindow = countDaysInWindow(finalWindowStart, lastValidDate, trips, currentEntry, lastValidDate);

  // 展示结果
  document.getElementById('resultDateMain').textContent = formatDateCN(lastValidDate);
  document.getElementById('resultDateSub').textContent = formatDateEN(lastValidDate);
  document.getElementById('resultConstraint').textContent = '受 18 个月内最多停留 12 个月规则限制';

  document.getElementById('resultDetails').innerHTML = `
    <div class="detail-item">
      <div class="detail-value">${totalHistoricalDays}</div>
      <div class="detail-label">历史停留总天数</div>
    </div>
    <div class="detail-item">
      <div class="detail-value">${thisStayDays}</div>
      <div class="detail-label">本次可停留天数</div>
    </div>
    <div class="detail-item">
      <div class="detail-value">${totalUsedInWindow}</div>
      <div class="detail-label">18 个月窗口内总天数</div>
    </div>
    <div class="detail-item">
      <div class="detail-value">${MAX_STAY_DAYS - totalUsedInWindow + thisStayDays}</div>
      <div class="detail-label">18 个月窗口内剩余天数</div>
    </div>
  `;

  // 警告
  const warningEl = document.getElementById('resultWarning');
  if (thisStayDays <= 14) {
    warningEl.textContent = '可停留天数较少，请注意安排行程。';
    warningEl.style.display = 'block';
  } else {
    warningEl.style.display = 'none';
  }

  const resultCard = document.getElementById('resultCard');
  resultCard.classList.add('show');
  setTimeout(() => {
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 50);
}
