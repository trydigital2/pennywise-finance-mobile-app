/**
 * Formats ISO string into human readable date: e.g. "22 Oct, 2026"
 */
export function formatDisplayDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`;
  } catch {
    return dateStr;
  }
}

/**
 * Formats ISO string into relative or short day: e.g. "Today", "Yesterday", "20 Oct"
 */
export function formatRelativeOrDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const now = new Date();
    
    // Normalize to dates
    const isToday = d.toDateString() === now.toDateString();
    
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = d.toDateString() === yesterday.toDateString();

    if (isToday) return 'Today';
    if (isYesterday) return 'Yesterday';

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate()} ${months[d.getMonth()]}`;
  } catch {
    return dateStr;
  }
}

/**
 * Formats YYYY-MM into Month Year: e.g. "2026-10" -> "October 2026"
 */
export function formatMonthYear(monthKey: string): string {
  try {
    const [year, month] = monthKey.split('-').map(Number);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${monthNames[month - 1]} ${year}`;
  } catch {
    return monthKey;
  }
}

/**
 * Returns current month key in format "YYYY-MM"
 */
export function getCurrentMonthKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

/**
 * Check if a date string falls within [startDate, endDate]
 */
export function isDateInRange(dateStr: string, startDate?: string, endDate?: string): boolean {
  if (!startDate && !endDate) return true;
  
  const target = new Date(dateStr).getTime();
  if (isNaN(target)) return false;

  if (startDate) {
    const start = new Date(startDate).setHours(0, 0, 0, 0);
    if (target < start) return false;
  }

  if (endDate) {
    const end = new Date(endDate).setHours(23, 59, 59, 999);
    if (target > end) return false;
  }

  return true;
}

/**
 * Groups transactions by date header (e.g. "2026-10-22")
 */
export function groupTransactionsByDate<T extends { date: string }>(items: T[]): Record<string, T[]> {
  const groups: Record<string, T[]> = {};
  
  for (const item of items) {
    const dateKey = item.date.split('T')[0];
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(item);
  }

  return groups;
}
