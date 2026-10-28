import { calculate50_30_20_Budget, projectCompoundGrowth } from "../src/utils/savingsOptimizer";

describe("50/30/20 Budget Optimization & Compound Growth", () => {
  describe("calculate50_30_20_Budget", () => {
    it("evaluates Optimized allocation when exact percentages match 50/30/20", () => {
      const result = calculate50_30_20_Budget({
        monthlyIncomePaise: 10000000, // 100,000 INR
        actualNeedsPaise: 5000000,    // 50,000 INR (50%)
        actualWantsPaise: 3000000,    // 30,000 INR (30%)
        actualSavingsPaise: 2000000,  // 20,000 INR (20%)
      });

      expect(result.allocationHealth).toBe("Optimized");
      expect(result.needs.actualPercent).toBe(50);
      expect(result.wants.actualPercent).toBe(30);
      expect(result.savings.actualPercent).toBe(20);
      expect(result.needs.isBalanced).toBe(true);
      expect(result.wants.isBalanced).toBe(true);
      expect(result.savings.isBalanced).toBe(true);
    });

    it("detects Wants Heavy when discretionary spending exceeds 35%", () => {
      const result = calculate50_30_20_Budget({
        monthlyIncomePaise: 10000000,
        actualNeedsPaise: 4500000,
        actualWantsPaise: 4200000, // 42%
        actualSavingsPaise: 1300000,
      });

      expect(result.allocationHealth).toBe("Wants Heavy");
      expect(result.wants.isBalanced).toBe(false);
      expect(result.optimizationTips[0]).toContain("Discretionary spending");
    });

    it("detects High Saver when savings rate reaches 30%+", () => {
      const result = calculate50_30_20_Budget({
        monthlyIncomePaise: 10000000,
        actualNeedsPaise: 4000000,
        actualWantsPaise: 2500000,
        actualSavingsPaise: 3500000, // 35%
      });

      expect(result.allocationHealth).toBe("High Saver");
      expect(result.savings.actualPercent).toBe(35);
    });
  });

  describe("projectCompoundGrowth", () => {
    it("calculates 3-year compound savings trajectory accurately", () => {
      // 10,000 INR monthly at 12% annual return
      const projections = projectCompoundGrowth(1000000, 12, 3, 0);

      expect(projections.length).toBe(3);
      expect(projections[0].year).toBe(1);
      expect(projections[0].totalContributedPaise).toBe(12000000); // 120,000 INR
      expect(projections[0].totalValuePaise).toBeGreaterThan(12000000);
      expect(projections[2].year).toBe(3);
      expect(projections[2].interestEarnedPaise).toBeGreaterThan(0);
    });
  });
});
