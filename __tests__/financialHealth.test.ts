import { calculateFinancialHealth, calculateSpendingVelocity } from "../src/utils/financialHealth";

describe("Financial Health & Velocity Engine", () => {
  describe("calculateFinancialHealth", () => {
    it("grades A+ for strong savings rate, controlled expenses and 6+ months buffer", () => {
      const result = calculateFinancialHealth({
        monthlyIncomePaise: 10000000, // 100,000 INR
        monthlyExpensePaise: 4500000,  // 45,000 INR
        emergencyFundPaise: 35000000,  // 350,000 INR (~7.7 months)
        monthlyBudgetLimitPaise: 5500000, // 55,000 INR
      });

      expect(result.score).toBeGreaterThanOrEqual(90);
      expect(result.grade).toBe("A+");
      expect(result.savingsRatePercent).toBe(55);
      expect(result.emergencyFundMonths).toBeGreaterThan(6);
      expect(result.budgetUtilizationPercent).toBeLessThan(90);
    });

    it("evaluates Grade C when expenses consume high percentage of income", () => {
      const result = calculateFinancialHealth({
        monthlyIncomePaise: 6000000, // 60,000 INR
        monthlyExpensePaise: 5400000, // 54,000 INR (90%)
        emergencyFundPaise: 5000000,  // 50,000 INR (<1 month)
        monthlyBudgetLimitPaise: 5200000,
      });

      expect(["C", "D"]).toContain(result.grade);
      expect(result.savingsRatePercent).toBe(10);
      expect(result.recommendations.length).toBeGreaterThan(0);
    });

    it("gracefully handles missing income data", () => {
      const result = calculateFinancialHealth({
        monthlyIncomePaise: 0,
        monthlyExpensePaise: 2000000,
        emergencyFundPaise: 10000000,
        monthlyBudgetLimitPaise: 3000000,
      });

      expect(result.grade).toBe("C");
      expect(result.statusLabel).toBe("Needs Income Data");
    });
  });

  describe("calculateSpendingVelocity", () => {
    it("computes accurate daily burn rate and projected month end total", () => {
      // 15 days elapsed in 30-day month, spent 30,000 INR, budget 60,000 INR
      const result = calculateSpendingVelocity(3000000, 15, 30, 6000000);

      expect(result.dailyBurnRatePaise).toBe(200000); // 2,000 INR/day
      expect(result.projectedMonthEndPaise).toBe(6000000); // 60,000 INR
      expect(result.safeDailyAllowancePaise).toBe(200000);
      expect(result.isPacingOverBudget).toBe(false);
      expect(result.daysRemaining).toBe(15);
    });

    it("flags pacing over budget when daily burn rate exceeds budget allowance", () => {
      // 10 days elapsed, already spent 40,000 INR with 50,000 INR budget for 30 days
      const result = calculateSpendingVelocity(4000000, 10, 30, 5000000);

      // Burn rate = 4,000/day -> projected 120,000 INR
      expect(result.dailyBurnRatePaise).toBe(400000);
      expect(result.projectedMonthEndPaise).toBe(12000000);
      expect(result.isPacingOverBudget).toBe(true);
      expect(result.projectedVariancePaise).toBeGreaterThan(0);
    });
  });
});
