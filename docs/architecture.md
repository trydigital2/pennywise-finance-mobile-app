# 🏛️ PennyWise Architecture & Technical Design

This document details the software design, state management, calculation precision, and data flow of the PennyWise personal finance application.

---

## 1. Monetary Unit Precision (Paise Architecture)

A fundamental challenge in financial software is the precision loss caused by IEEE 754 floating-point arithmetic (e.g., `0.1 + 0.2 === 0.30000000000000004`).

**PennyWise avoids floating-point errors completely by representing all monetary values internally as integer paise / cents:**
- `₹1.00 = 100 paise`
- `₹1,85,420.00 = 18542000 paise`
- `₹350.50 = 35050 paise`

All arithmetic operations (additions, subtractions, budget limits, savings deposits) operate strictly on integer integers. Formatter functions (`formatCurrency`, `formatIndianNumber`) convert paise into localized strings only at the rendering boundary.

---

## 2. Unidirectional Data Flow (Redux Toolkit)

The application utilizes Redux Toolkit slices with normalized state management:

```
UI Interaction (Add Expense / Delete Transaction)
      │
      ▼
Action Dispatched (e.g. addTransaction, updateAccountBalance)
      │
      ▼
Redux Slices (transactionSlice, accountSlice, budgetSlice)
      │
      ▼
Pure Calculation Utilities (calculateTotalIncome, calculateBudgetStatus)
      │
      ▼
Subscribed Components Re-render (DashboardScreen, BudgetProgressCard, BalanceCard)
      │
      ▼
AsyncStorage Sync (Background Persistence)
```

### Slice Breakdown:
1. **`accountSlice`**: Tracks liquid accounts (`checking`, `savings`, `cash_wallet`).
2. **`transactionSlice`**: Holds all categorized expense, income, and transfer transactions. Contains active filtering criteria (`type`, `categoryId`, `accountId`, `searchQuery`, `sortBy`).
3. **`budgetSlice`**: Holds monthly spending thresholds and active month view (`YYYY-MM`).
4. **`goalSlice`**: Tracks long-term savings goals and ledger contributions.
5. **`recurringSlice`**: Manages rules for automated bills and deposits.
6. **`notificationSlice`**: In-app notifications with read/unread statuses.
7. **`userSlice`**: User preferences (preferred currency, dark mode, biometrics, onboarding completion).

---

## 3. Account Balance Integrity & Reversion

Whenever a transaction is created, edited, or deleted, account balances are adjusted automatically through atomic Redux actions:

- **Income Added**: Account balance increased (`+amountPaise`).
- **Expense Added**: Account balance decreased (`-amountPaise`).
- **Transaction Deleted**: The original balance change is inverted (if an expense is deleted, the money is credited back to the account).
- **Transaction Edited**: The old amount is reversed, and the updated amount is applied.

---

## 4. Navigation Topology

The application uses React Navigation v7 with a nested Stack and Bottom Tabs structure:

- **Root Stack**:
  - `OnboardingScreen` (Conditional on first launch)
  - `MainTabs` (`AppNavigator`)
  - `TransactionDetailScreen`
  - `AccountsScreen`
  - `AnalyticsScreen`
  - `ReportsScreen`
  - `NotificationsScreen`
  - `RecurringScreen`
- **Main Bottom Tabs**:
  - 🏠 **Dashboard**: High-level financial pulse and quick actions.
  - 💳 **Transactions**: Searchable, filterable ledger grouped by dates.
  - 📊 **Budgets**: Category progress bars and warning states.
  - 🎯 **Goals**: Milestone-based savings targets.
  - 👤 **Profile**: Settings, currency selection, and data reset.
