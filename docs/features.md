# ✨ PennyWise Feature Catalog

Comprehensive guide to all implemented features in PennyWise.

---

## 1. Dashboard Overview
- **Dynamic Net Worth**: Computes combined balance across all active accounts in real-time.
- **Monthly Income & Expense Cards**: Dynamically filtered to current calendar month.
- **Cash Flow 3-Month Trend**: Native SVG bar chart showing income versus expense side-by-side for the last 3 months.
- **Category Spending Quick Cards**: Displays top 4 expenditure categories with percentages.
- **Quick Logging**: 1-tap modal triggers for adding income or expenses.

---

## 2. Transaction Management
- **Search & Filters**: Real-time multi-term search across titles, merchants, and categories.
- **Date Range Presets**: "This Month", "Last Month", "Last 3 Months", and "All Time".
- **Duplicate Transaction Guard**: Flags transactions entered on the same date with matching merchant and amount.
- **Transaction Details**: Comprehensive drill-down showing merchant, category icon, date, notes, and recurring tags.

---

## 3. Budgets & Thresholds
- **Category-Specific Limits**: Configurable per-category monthly limits.
- **Color-Coded Status**:
  - 🟢 **Healthy (<75%)**: Green progress track.
  - 🟡 **Warning (75%–99%)**: Amber alert indicator ("Nearing Limit").
  - 🔴 **Exceeded (100%+)**: Crimson alert indicator ("Exceeded by ₹X").
- **Real-Time Synchronization**: Instantly recalculates when new transactions are logged.

---

## 4. Savings Goals
- **Milestone Tracking**: Visual progress bars calculated from target and current accumulated balances.
- **Target Dates**: Displays target completion date and days remaining.
- **Contribution Ledger**: Users can record manual deposits into specific goals.
- **Goal Completion**: Triggers celebration badges and completion status once target is achieved.

---

## 5. Recurring Rules
- **Rule Scheduler**: Configurable weekly, monthly, and yearly recurring rules.
- **Active / Paused Status**: Users can pause recurring rules without deleting historical transactions.
- **Next Due Date**: Automatically shows upcoming bills and expected deposits.

---

## 6. Financial Statements & Reporting
- **Monthly P&L**: Net savings rate percentage formula: `((Income - Expense) / Income) * 100`.
- **Month-over-Month Comparison**: Comparative delta analysis against the previous month's expenditure.
- **Simulated CSV Export**: Allows generating portable statement files for personal records.

---

## 7. Preferences & Data Management
- **Multi-Currency Display**: Seamlessly format values in `INR (₹)`, `USD ($)`, `EUR (€)`, or `GBP (£)`.
- **Indian Number Grouping**: Formats large amounts using Indian notation (`1,23,456.78`).
- **Reset to Demo Data**: Instantly clears modified local state and restores the 118 showcase transactions and accounts.
