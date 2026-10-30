import {
  DebtItem,
  calculateDebtPayoffSchedule,
  compareDebtStrategies,
} from "../src/utils/debtPayoff";

describe("Debt Freedom & Payoff Accelerator Engine", () => {
  const sampleDebts: DebtItem[] = [
    {
      id: "card",
      name: "Credit Card",
      balancePaise: 5000000, // ₹50,000
      annualInterestRate: 36.0, // 36% APR
      minimumPaymentPaise: 250000, // ₹2,500
    },
    {
      id: "loan",
      name: "Personal Loan",
      balancePaise: 10000000, // ₹1,00,000
      annualInterestRate: 12.0, // 12% APR
      minimumPaymentPaise: 300000, // ₹3,000
    },
    {
      id: "appliance",
      name: "Appliance EMI",
      balancePaise: 2000000, // ₹20,000 (lowest balance)
      annualInterestRate: 18.0, // 18% APR
      minimumPaymentPaise: 150000, // ₹1,500
    },
  ];

  describe("calculateDebtPayoffSchedule", () => {
    it("orders payoff by lowest balance first in Snowball strategy", () => {
      const result = calculateDebtPayoffSchedule(sampleDebts, "snowball", 500000);
      expect(result.strategy).toBe("snowball");
      expect(result.totalStartingDebtPaise).toBe(17000000);
      // In snowball, Appliance EMI (₹20k) should be paid off first
      expect(result.payoffOrder[0]).toBe("Appliance EMI");
      expect(result.monthsToDebtFree).toBeGreaterThan(0);
      expect(result.monthsToDebtFree).toBeLessThan(40);
    });

    it("orders payoff by highest APR first in Avalanche strategy", () => {
      const result = calculateDebtPayoffSchedule(sampleDebts, "avalanche", 500000);
      expect(result.strategy).toBe("avalanche");
      // In avalanche, Credit Card (36%) should be paid off first despite larger balance than Appliance
      expect(result.payoffOrder[0]).toBe("Credit Card");
      expect(result.monthsToDebtFree).toBeGreaterThan(0);
    });

    it("handles empty debt array gracefully", () => {
      const result = calculateDebtPayoffSchedule([], "snowball", 0);
      expect(result.totalStartingDebtPaise).toBe(0);
      expect(result.monthsToDebtFree).toBe(0);
      expect(result.payoffOrder).toEqual([]);
    });
  });

  describe("compareDebtStrategies", () => {
    it("confirms Avalanche yields lower total interest paid than Snowball", () => {
      const comparison = compareDebtStrategies(sampleDebts, 500000);

      expect(comparison.avalanche.totalInterestPaidPaise).toBeLessThanOrEqual(
        comparison.snowball.totalInterestPaidPaise
      );
      expect(comparison.interestSavedWithAvalanchePaise).toBeGreaterThanOrEqual(0);
    });

    it("delivers tailored recommendation and actionable rationale", () => {
      const comparison = compareDebtStrategies(sampleDebts, 1000000);
      expect(comparison.recommendationReason).toBeTruthy();
      expect(["snowball", "avalanche"]).toContain(comparison.recommendedStrategy);
    });
  });
});
