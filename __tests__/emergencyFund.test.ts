import { calculateEmergencyFundRunway } from "../src/utils/emergencyFund";

describe("Emergency Fund Runway & Fragility Stress Tester", () => {
  it("computes accurate runway and Fortified tier for 6+ months of reserves", () => {
    const result = calculateEmergencyFundRunway({
      liquidSavingsPaise: 30000000, // ₹3,00,000
      monthlyEssentialPaise: 4000000, // ₹40,000
      monthlyDiscretionaryPaise: 1000000, // ₹10,000
      targetMonths: 6,
    });

    // 3,00,000 / 40,000 = 7.5 months bare-bones
    expect(result.bareBonesRunwayMonths).toBe(7.5);
    // 3,00,000 / 50,000 = 6.0 months standard
    expect(result.runwayMonths).toBe(6.0);
    expect(result.targetEmergencyFundPaise).toBe(24000000); // 40k * 6 = 2.4L
    expect(result.gapToTargetPaise).toBe(0);
    expect(result.percentageFunded).toBe(125); // 3L / 2.4L = 125%
    expect(result.tier).toBe("Fortified");
    expect(result.shockResilienceRating).toBe("High");
  });

  it("identifies Vulnerable tier and calculates exact months to reach target", () => {
    const result = calculateEmergencyFundRunway({
      liquidSavingsPaise: 8000000, // ₹80,000
      monthlyEssentialPaise: 4000000, // ₹40,000
      monthlyDiscretionaryPaise: 1000000,
      targetMonths: 6,
      monthlySavingsContributionPaise: 2000000, // ₹20,000/mo savings
    });

    // 80k / 40k = 2 months
    expect(result.bareBonesRunwayMonths).toBe(2.0);
    expect(result.tier).toBe("Vulnerable");
    expect(result.targetEmergencyFundPaise).toBe(24000000); // ₹2,40,000
    expect(result.gapToTargetPaise).toBe(16000000); // ₹1,60,000 gap
    // 160k / 20k = 8 months to goal
    expect(result.monthsToGoal).toBe(8);
  });

  it("flags Critical Deficit for less than 1 month of subsistence reserves", () => {
    const result = calculateEmergencyFundRunway({
      liquidSavingsPaise: 1500000, // ₹15,000
      monthlyEssentialPaise: 5000000, // ₹50,000
      targetMonths: 6,
    });

    expect(result.bareBonesRunwayMonths).toBe(0.3);
    expect(result.tier).toBe("Critical Deficit");
    expect(result.shockResilienceRating).toBe("Low");
  });

  it("handles zero savings gracefully without NaN or negative values", () => {
    const result = calculateEmergencyFundRunway({
      liquidSavingsPaise: 0,
      monthlyEssentialPaise: 3000000,
      targetMonths: 6,
    });

    expect(result.bareBonesRunwayMonths).toBe(0);
    expect(result.runwayMonths).toBe(0);
    expect(result.percentageFunded).toBe(0);
    expect(result.tier).toBe("Critical Deficit");
  });
});
