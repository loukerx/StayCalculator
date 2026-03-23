const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Load app.js functions into this scope (no module exports in original code)
// We need to stub browser globals that app.js references at the top level
let tripCount;
const appCode = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf-8');
eval(appCode);

// Helper to create a local date easily
function d(y, m, day) {
  return new Date(y, m - 1, day);
}

// ==================== parseLocalDate ====================
describe('parseLocalDate', () => {
  it('parses a standard date string', () => {
    const date = parseLocalDate('2025-03-15');
    assert.equal(date.getFullYear(), 2025);
    assert.equal(date.getMonth(), 2); // 0-indexed
    assert.equal(date.getDate(), 15);
  });

  it('parses first day of year', () => {
    const date = parseLocalDate('2025-01-01');
    assert.equal(date.getFullYear(), 2025);
    assert.equal(date.getMonth(), 0);
    assert.equal(date.getDate(), 1);
  });

  it('parses last day of year', () => {
    const date = parseLocalDate('2025-12-31');
    assert.equal(date.getMonth(), 11);
    assert.equal(date.getDate(), 31);
  });
});

// ==================== daysBetween ====================
describe('daysBetween', () => {
  it('returns 0 for same date', () => {
    assert.equal(daysBetween(d(2025, 1, 1), d(2025, 1, 1)), 0);
  });

  it('returns positive for later date', () => {
    assert.equal(daysBetween(d(2025, 1, 1), d(2025, 1, 10)), 9);
  });

  it('returns negative for earlier date', () => {
    assert.equal(daysBetween(d(2025, 1, 10), d(2025, 1, 1)), -9);
  });

  it('works across months', () => {
    assert.equal(daysBetween(d(2025, 1, 31), d(2025, 2, 1)), 1);
  });

  it('works across years', () => {
    assert.equal(daysBetween(d(2024, 12, 31), d(2025, 1, 1)), 1);
  });
});

// ==================== subtractMonths ====================
describe('subtractMonths', () => {
  it('subtracts months normally', () => {
    const result = subtractMonths(d(2025, 6, 15), 3);
    assert.equal(result.getFullYear(), 2025);
    assert.equal(result.getMonth(), 2); // March
    assert.equal(result.getDate(), 15);
  });

  it('subtracts across year boundary', () => {
    const result = subtractMonths(d(2025, 2, 15), 3);
    assert.equal(result.getFullYear(), 2024);
    assert.equal(result.getMonth(), 10); // November
    assert.equal(result.getDate(), 15);
  });

  it('handles month-end overflow: Mar 31 - 1 month = Feb 28 (non-leap)', () => {
    const result = subtractMonths(d(2025, 3, 31), 1);
    assert.equal(result.getMonth(), 1); // February
    assert.equal(result.getDate(), 28);
  });

  it('handles month-end overflow: Mar 31 - 1 month = Feb 29 (leap year)', () => {
    const result = subtractMonths(d(2024, 3, 31), 1);
    assert.equal(result.getMonth(), 1); // February
    assert.equal(result.getDate(), 29);
  });

  it('subtracts 18 months', () => {
    const result = subtractMonths(d(2026, 6, 1), 18);
    assert.equal(result.getFullYear(), 2024);
    assert.equal(result.getMonth(), 11); // December
    assert.equal(result.getDate(), 1);
  });
});

// ==================== cloneDate ====================
describe('cloneDate', () => {
  it('creates a new Date with same value', () => {
    const original = d(2025, 6, 15);
    const clone = cloneDate(original);
    assert.deepEqual(clone, original);
    assert.notEqual(clone, original); // different object
  });

  it('modifying clone does not affect original', () => {
    const original = d(2025, 6, 15);
    const clone = cloneDate(original);
    clone.setDate(20);
    assert.equal(original.getDate(), 15);
  });
});

// ==================== addDays ====================
describe('addDays', () => {
  it('adds positive days', () => {
    const result = addDays(d(2025, 1, 1), 10);
    assert.equal(result.getDate(), 11);
  });

  it('adds negative days', () => {
    const result = addDays(d(2025, 1, 11), -10);
    assert.equal(result.getDate(), 1);
  });

  it('crosses month boundary', () => {
    const result = addDays(d(2025, 1, 31), 1);
    assert.equal(result.getMonth(), 1); // February
    assert.equal(result.getDate(), 1);
  });

  it('does not mutate original', () => {
    const original = d(2025, 1, 1);
    addDays(original, 10);
    assert.equal(original.getDate(), 1);
  });
});

// ==================== countDaysInWindow ====================
describe('countDaysInWindow', () => {
  it('returns 0 with no trips and no current stay', () => {
    const ws = d(2024, 1, 1);
    const we = d(2025, 6, 30);
    // currentEndDay < currentEntry means no current stay counted
    const total = countDaysInWindow(ws, we, [], d(2026, 1, 1), d(2025, 12, 31));
    assert.equal(total, 0);
  });

  it('counts a historical trip fully inside window', () => {
    const ws = d(2025, 1, 1);
    const we = d(2025, 12, 31);
    const trips = [{ entry: d(2025, 3, 1), exit: d(2025, 3, 11) }]; // 11 days [entry, exit]
    const total = countDaysInWindow(ws, we, trips, d(2026, 1, 1), d(2025, 12, 31));
    assert.equal(total, 11);
  });

  it('clips historical trip to window boundaries', () => {
    const ws = d(2025, 3, 5);
    const we = d(2025, 3, 8);
    // Trip: Mar 1 to Mar 11 (11 days), but window only covers Mar 5-8
    const trips = [{ entry: d(2025, 3, 1), exit: d(2025, 3, 11) }];
    const total = countDaysInWindow(ws, we, trips, d(2026, 1, 1), d(2025, 12, 31));
    // Overlap: Mar 5 to Mar 8 inclusive = 4 days
    assert.equal(total, 4);
  });

  it('counts a same-day historical entry and exit as 1 day', () => {
    const ws = d(2025, 3, 1);
    const we = d(2025, 3, 31);
    const trips = [{ entry: d(2025, 3, 10), exit: d(2025, 3, 10) }];
    const total = countDaysInWindow(ws, we, trips, d(2026, 1, 1), d(2025, 12, 31));
    assert.equal(total, 1);
  });

  it('counts current stay (inclusive both ends)', () => {
    const ws = d(2025, 1, 1);
    const we = d(2025, 12, 31);
    const currentEntry = d(2025, 6, 1);
    const currentEndDay = d(2025, 6, 10);
    const total = countDaysInWindow(ws, we, [], currentEntry, currentEndDay);
    // June 1 to June 10 inclusive = 10 days
    assert.equal(total, 10);
  });

  it('counts both historical and current trips', () => {
    const ws = d(2025, 1, 1);
    const we = d(2025, 12, 31);
    const trips = [{ entry: d(2025, 2, 1), exit: d(2025, 2, 11) }]; // 11 days
    const currentEntry = d(2025, 6, 1);
    const currentEndDay = d(2025, 6, 10); // 10 days
    const total = countDaysInWindow(ws, we, trips, currentEntry, currentEndDay);
    assert.equal(total, 21);
  });

  it('handles trip completely outside window', () => {
    const ws = d(2025, 6, 1);
    const we = d(2025, 6, 30);
    const trips = [{ entry: d(2025, 1, 1), exit: d(2025, 1, 31) }];
    const total = countDaysInWindow(ws, we, trips, d(2026, 1, 1), d(2025, 12, 31));
    assert.equal(total, 0);
  });

  it('handles multiple historical trips', () => {
    const ws = d(2025, 1, 1);
    const we = d(2025, 12, 31);
    const trips = [
      { entry: d(2025, 2, 1), exit: d(2025, 2, 11) },  // 11 days
      { entry: d(2025, 5, 1), exit: d(2025, 5, 21) },  // 21 days
    ];
    const total = countDaysInWindow(ws, we, trips, d(2026, 1, 1), d(2025, 12, 31));
    assert.equal(total, 32);
  });
});

// ==================== findEarliestFullYearDate ====================
describe('findEarliestFullYearDate', () => {
  it('returns searchStart when no historical trips', () => {
    const start = d(2025, 6, 1);
    const result = findEarliestFullYearDate([], start);
    assert.deepEqual(result, start);
  });

  it('finds correct date with one historical trip', () => {
    // Historical: stayed Jan 1 to Jul 1, 2025 (182 days, departure day included)
    const trips = [{ entry: d(2025, 1, 1), exit: d(2025, 7, 1) }];
    const searchStart = d(2025, 7, 2);
    const result = findEarliestFullYearDate(trips, searchStart);

    // The result should be a date where staying 365 days doesn't violate the rule.
    // The historical trip must fully slide out of any 18-month window during the full-year stay.
    assert.ok(result !== null, 'should find a date');
    assert.ok(result >= searchStart, 'should be on or after search start');

    // Verify: for the found date D, staying D to D+364, check the last day's window
    const stayEnd = addDays(result, 364);
    const windowStart = subtractMonths(stayEnd, 18);
    const totalInWindow = countDaysInWindow(windowStart, stayEnd, trips, result, stayEnd);
    assert.ok(totalInWindow <= 365, `window total ${totalInWindow} should be <= 365`);
  });

  it('returns date beyond visa expiry when history is heavy', () => {
    // Historical: stayed Jan 1 to Jul 1, 2025 (182 days)
    // Current stay: Jul 2, 2025 to Jan 1, 2026 (184 days), pushed as history
    const trips = [
      { entry: d(2025, 1, 1), exit: d(2025, 7, 1) },
      { entry: d(2025, 7, 2), exit: d(2026, 1, 1) },
    ];
    const searchStart = d(2026, 1, 2);
    const visaLastArrival = d(2026, 6, 1);
    const result = findEarliestFullYearDate(trips, searchStart);

    assert.ok(result !== null, 'should find a date');
    // The result should be after the visa last arrival date
    assert.ok(result > visaLastArrival,
      `earliest full year date ${result.toISOString()} should be after visa expiry ${visaLastArrival.toISOString()}`);
  });

  it('finds correct date with multiple historical trips', () => {
    const trips = [
      { entry: d(2024, 6, 1), exit: d(2024, 9, 1) },  // 93 days
      { entry: d(2025, 1, 1), exit: d(2025, 4, 1) },  // 91 days
    ];
    const searchStart = d(2025, 4, 2);
    const result = findEarliestFullYearDate(trips, searchStart);

    assert.ok(result !== null, 'should find a date');

    // Verify the full 365-day stay is valid
    for (let i = 0; i < 365; i++) {
      const day = addDays(result, i);
      const ws = subtractMonths(day, 18);
      const total = countDaysInWindow(ws, day, trips, result, day);
      assert.ok(total <= 365, `Day ${i}: window total ${total} should be <= 365`);
    }
  });
});

// ==================== latest stay date ====================
describe('latest stay date calculation', () => {
  it('treats the shown last valid date as an included stay day', () => {
    const trips = [
      { entry: d(2024, 10, 15), exit: d(2025, 1, 12) },  // 90 days
      { entry: d(2025, 4, 13), exit: d(2025, 9, 21) },   // 162 days
    ];
    const currentEntry = d(2026, 3, 6);
    const maxStayDays = 365;

    let dCursor = cloneDate(currentEntry);
    let lastValidDate = null;

    while (true) {
      const windowStart = subtractMonths(dCursor, 18);
      const totalInWindow = countDaysInWindow(windowStart, dCursor, trips, currentEntry, dCursor);

      if (totalInWindow > maxStayDays) {
        lastValidDate = addDays(dCursor, -1);
        break;
      }

      dCursor = addDays(dCursor, 1);
    }

    assert.deepEqual(lastValidDate, d(2026, 9, 24));

    const totalOnLastValidDay = countDaysInWindow(
      subtractMonths(lastValidDate, 18),
      lastValidDate,
      trips,
      currentEntry,
      lastValidDate,
    );
    assert.equal(totalOnLastValidDay, 365);

    const firstInvalidDay = addDays(lastValidDate, 1);
    const totalOnFirstInvalidDay = countDaysInWindow(
      subtractMonths(firstInvalidDay, 18),
      firstInvalidDay,
      trips,
      currentEntry,
      firstInvalidDay,
    );
    assert.equal(totalOnFirstInvalidDay, 366);
  });
});

// ==================== formatDateCN ====================
describe('formatDateCN', () => {
  it('formats date in Chinese style', () => {
    assert.equal(formatDateCN(d(2025, 3, 5)), '2025 年 03 月 05 日');
  });

  it('pads single-digit months and days', () => {
    assert.equal(formatDateCN(d(2025, 1, 1)), '2025 年 01 月 01 日');
  });
});

// ==================== formatDateEN ====================
describe('formatDateEN', () => {
  it('formats date in English style', () => {
    assert.equal(formatDateEN(d(2025, 3, 5)), '5 March 2025');
  });

  it('formats December correctly', () => {
    assert.equal(formatDateEN(d(2025, 12, 25)), '25 December 2025');
  });
});
