# 🧪 PennyWise QA & Testing Strategy

This document details the test suites, verification procedures, and quality benchmarks implemented in PennyWise.

---

## 1. Test Suite Summary

PennyWise includes **7 Jest test suites containing 39 unit tests**:

| Test Suite | File | Tests | Coverage Scope |
|---|---|---|---|
| **Currency Formatter** | `__tests__/currency.test.ts` | 13 | Indian number system grouping (`1,23,456`), compact abbreviations (K, L, Cr), multi-currency symbols, paise rounding. |
| **Financial Calculations** | `__tests__/calculations.test.ts` | 7 | Inflow, outflow, net cash flow, category breakdowns, savings rate formula, budget status calculations. |
| **Date Utilities** | `__tests__/date.test.ts` | 6 | Date range boundary checks, date header grouping, YYYY-MM key generators. |
| **Validators** | `__tests__/validators.test.ts` | 6 | Required field rules, positive amount validation, duplicate transaction detection algorithm. |
| **Budget Logic** | `__tests__/budget.test.ts` | 3 | Healthy state, warning threshold boundary, exceeded state logic. |
| **Savings Goals** | `__tests__/goals.test.ts` | 2 | Progress percentage calculations and completion state flags. |
| **Component Logic** | `__tests__/components.test.ts` | 3 | React component element instantiation, props validation, and styling structure. |

---

## 2. Running Automated Tests

```bash
# Run all unit tests
npm test

# Run tests with coverage report
npx jest --coverage
```

### Verified Test Run Output:
```text
PASS __tests__/calculations.test.ts
PASS __tests__/currency.test.ts
PASS __tests__/goals.test.ts
PASS __tests__/date.test.ts
PASS __tests__/budget.test.ts
PASS __tests__/validators.test.ts
PASS __tests__/components.test.ts

Test Suites: 7 passed, 7 total
Tests:       39 passed, 39 total
Snapshots:   0 total
Time:        1.2 s
Ran all test suites.
```

---

## 3. TypeScript Typecheck Verification

Strict mode compilation verifies zero type mismatches, missing properties, or invalid imports:

```bash
npm run typecheck
```
**Result**: `tsc --noEmit` exits with **0 errors**.
