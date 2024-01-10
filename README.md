# 💰 PennyWise — Personal Finance & Wealth Tracker

A complete, production-grade personal finance and expense management mobile application built with **React Native**, **TypeScript**, **Expo SDK 58**, **Redux Toolkit**, and **React Navigation v7**.

Designed with a commercial-grade fintech aesthetic (Deep Navy `#0F172A`, Emerald Prosperity `#10B981`, and Crimson alerts `#EF4444`), **PennyWise** gives users complete control over cash-flow, multi-account liquid balances, category-level monthly budgets, visual savings goal tracking, and recurring transaction automation.

---

## 📱 Key Features

- **🏠 Comprehensive Dashboard**:
  - Net liquid assets across checking, savings, and cash wallets.
  - Real-time monthly income vs. expense totals with percentage savings rate.
  - Multi-month Cash Flow bar chart (August, September, October 2026).
  - Category spending breakdown and top outflow merchants.
  - Quick action buttons for logging income & expenses.
- **💳 Multi-Account Management**:
  - Simulated checking account, high-yield savings reserve, and daily cash wallet.
  - Masked account identifiers (`•••• 4892`, `•••• 7319`, `Cash on Hand`).
  - Isolated per-account transaction filters and balance tracking.
- **💸 Transaction Lifecycle**:
  - Full CRUD: Add, edit, delete with automatic account balance reconciliation.
  - Smart search across merchants, notes, and categories.
  - Date-range filtering (This Month, Last Month, Last 3 Months, All Time).
  - Multi-parameter sorting (Date desc/asc, Amount desc/asc).
  - Built-in duplicate transaction warning detection.
- **📊 Smart Category Budgets**:
  - Monthly spending limits across 8 essential categories.
  - Dynamic progress bars with threshold alerts (Warning at 80%, Danger at 100%+).
  - Remaining allowance calculations synced directly with expense logs.
- **🎯 Milestone Savings Goals**:
  - Target amount, target completion date, and real-time progress percentages.
  - Quick-deposit contribution dialog with timestamped ledger notes.
  - Visual goal completion states and badges.
- **🔄 Recurring Rules Automation**:
  - Weekly, monthly, and annual recurring expense/income schedules.
  - Pause/resume toggle and next due date calculators.
- **📈 Financial Statements & Reports**:
  - Monthly P&L performance summaries (Total Inflow, Outflow, Net Savings).
  - Month-over-month comparison (% change against prior month).
  - Simulated CSV statement export.
- **🔔 In-App Notification Center**:
  - Budget threshold warnings, goal milestone alerts, and recurring due reminders.
  - Read/unread status indicators and "Mark All as Read" action.
- **⚙️ Profile & Customization**:
  - Local currency selector with native Indian number formatting (`₹` Lakhs/Crores) as well as international formats (`$`, `€`, `£`).
  - Strict integer paise precision (100 paise = 1 unit) to eliminate floating-point calculation errors.
  - One-tap "Reset to Demo Data" action to easily restore default showcase state.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Core Framework** | React Native `0.88.0` / Expo SDK `~58.0.16` |
| **Language** | TypeScript `~6.0.3` (Strict Mode) |
| **State Management** | Redux Toolkit `^2.13.0` & React-Redux `^9.3.0` |
| **Navigation** | React Navigation v7 (`@react-navigation/bottom-tabs` & `@react-navigation/native-stack`) |
| **Local Persistence**| `@react-native-async-storage/async-storage` `2.2.0` |
| **Vector Icons** | `@expo/vector-icons` (Ionicons) |
| **Charts & Graphics**| `react-native-svg` `15.16.0` |
| **Unit Testing** | Jest `^30.5.2` & `ts-jest` `^29.4.15` (39 Passing Tests) |

---

## 🏛️ Project Architecture

```text
PennyWise/
├── assets/
│   └── images/               # Branded icon.png, splash.png, adaptive-icon.png
├── docs/
│   ├── architecture.md       # Technical architecture & state flow
│   ├── features.md           # Exhaustive feature catalog
│   └── testing.md            # Test matrix and QA checklist
├── src/
│   ├── components/
│   │   ├── common/           # BalanceCard, SummaryCard, TransactionItem, CategoryIcon, etc.
│   │   └── modals/           # AddTransactionModal, AddBudgetModal, AddGoalModal, FilterModal
│   ├── constants/            # COLORS, CATEGORIES, ACCOUNTS, STRINGS, DIMENSIONS
│   ├── data/                 # 118 initial transactions, 3 accounts, 8 budgets, 5 goals
│   ├── navigation/           # AppNavigator (Tabs) & RootNavigator (Stack)
│   ├── screens/              # Dashboard, Transactions, Budgets, Goals, Accounts, Analytics, Reports, Notifications, Recurring, Profile
│   ├── services/             # StorageService (AsyncStorage persistence)
│   ├── store/                # Redux Toolkit store and feature slices
│   ├── theme/                # Design tokens: typography, colors, spacing, radii, shadows
│   ├── types/                # Domain TypeScript interfaces
│   └── utils/                # Financial calculations, Indian currency formatters, date utilities, validators
├── __tests__/                # 7 unit test suites (39 tests)
├── App.tsx                   # Root component with Redux & Navigation Providers
├── app.json                  # Expo application configuration
├── package.json              # Dependencies and scripts
└── tsconfig.json             # TypeScript compiler options
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+` or `v20+` or `v22+`
- npm `v9+` or `v10+`
- iOS Simulator (macOS / Xcode) or Android Emulator (Android Studio) / Expo Go

### Installation
```bash
cd /Users/tdsl/Documents/githubactivity/PennyWise

# Install dependencies (already installed)
npm install
```

### Running Locally
```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run in Web browser
npm run web
```

---

## 🧪 Testing & TypeScript Verification

PennyWise comes with an extensive unit test suite covering financial calculations, Indian and international currency formatters, date grouping, budget thresholds, goal milestone logic, and validator guards:

```bash
# Run all 7 Jest test suites (39 tests)
npm test

# Run TypeScript compilation check (0 errors)
npm run typecheck
```

---

## 🔒 Security & Demo Disclaimer

PennyWise is a **local-first simulation and portfolio showcase application**.
- **No Real Bank Accounts**: All account balances, account numbers (`•••• 4892`), and institutions are simulated.
- **No External Credentials**: No financial credentials, passwords, or payment cards are requested or stored.
- **Local Persistence Only**: All data is stored locally on device using AsyncStorage and never uploaded to any remote server or third-party cloud.
- **Not Financial Advice**: PennyWise is an educational software demonstration and should not be construed as financial or investment advice.

---

## 📄 License
MIT License. © 2026 Kuldeep Kumar.
