import {
  formatDisplayDate,
  formatRelativeOrDate,
  formatMonthYear,
  getCurrentMonthKey,
  isDateInRange,
  groupTransactionsByDate,
} from '../src/utils/date';

describe('Date Utilities', () => {
  test('formatDisplayDate formats ISO date cleanly', () => {
    expect(formatDisplayDate('2026-10-22T10:00:00.000Z')).toContain('22');
    expect(formatDisplayDate('2026-10-22T10:00:00.000Z')).toContain('Oct');
    expect(formatDisplayDate('2026-10-22T10:00:00.000Z')).toContain('2026');
  });

  test('formatMonthYear formats YYYY-MM correctly', () => {
    expect(formatMonthYear('2026-10')).toBe('October 2026');
    expect(formatMonthYear('2026-01')).toBe('January 2026');
  });

  test('getCurrentMonthKey returns a valid YYYY-MM format', () => {
    const key = getCurrentMonthKey();
    expect(key).toMatch(/^\d{4}-\d{2}$/);
  });

  test('isDateInRange checks boundaries correctly', () => {
    expect(isDateInRange('2026-10-15T10:00:00.000Z', '2026-10-01', '2026-10-31')).toBe(true);
    expect(isDateInRange('2026-09-30T10:00:00.000Z', '2026-10-01', '2026-10-31')).toBe(false);
    expect(isDateInRange('2026-11-01T10:00:00.000Z', '2026-10-01', '2026-10-31')).toBe(false);
  });

  test('groupTransactionsByDate groups items by date key', () => {
    const items = [
      { id: '1', date: '2026-10-22T10:00:00.000Z' },
      { id: '2', date: '2026-10-22T14:00:00.000Z' },
      { id: '3', date: '2026-10-21T09:00:00.000Z' },
    ];
    const grouped = groupTransactionsByDate(items);
    expect(grouped['2026-10-22']).toHaveLength(2);
    expect(grouped['2026-10-21']).toHaveLength(1);
  });
});
