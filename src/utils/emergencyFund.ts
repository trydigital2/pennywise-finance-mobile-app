/**
 * Emergency Fund Runway & Financial Fragility Stress Tester
 * Computes bare-bones subsistence runway in months, safety tier,
 * gap to full 3-6 month capitalization, and simulates income shock resilience.
 * All amounts are calculated in exact integer paise.
 */

export type EmergencyFundTier = "Critical Deficit" | "Vulnerable" | "Adequate" | "Fortified";

export interface EmergencyFundInputs {
  liquidSavingsPaise: number;
  monthlyEssentialPaise: number;
  monthlyDiscretionaryPaise?: number;
  targetMonths?: number; // standard recommendation is 6 months
  monthlySavingsContributionPaise?: number;
}

export interface EmergencyFundResult {
  liquidSavingsPaise: number;
  monthlyEssentialPaise: number;
  targetEmergencyFundPaise: number;
  gapToTargetPaise: number;
  percentageFunded: number;
  runwayMonths: number;
  bareBonesRunwayMonths: number;
  tier: EmergencyFundTier;
  monthsToGoal: number;
  shockResilienceRating: "High" | "Moderate" | "Low";
  tacticalAdvice: string;
}

/**
 * Calculates emergency cash runway and stress-tests financial survivability.
 */
export function calculateEmergencyFundRunway(
  inputs: EmergencyFundInputs
): EmergencyFundResult {
  const {
    liquidSavingsPaise,
    monthlyEssentialPaise,
    monthlyDiscretionaryPaise = 0,
    targetMonths = 6,
    monthlySavingsContributionPaise = 0,
  } = inputs;

  const safeSavings = Math.max(0, liquidSavingsPaise);
  const safeEssential = Math.max(1, monthlyEssentialPaise); // avoid division by 0
  const safeDiscretionary = Math.max(0, monthlyDiscretionaryPaise);
  const totalBurn = safeEssential + safeDiscretionary;
  const safeContribution = Math.max(0, monthlySavingsContributionPaise);

  const targetEmergencyFundPaise = safeEssential * targetMonths;
  const gapToTargetPaise = Math.max(0, targetEmergencyFundPaise - safeSavings);

  const percentageFunded = Math.min(
    200,
    Math.round((safeSavings / targetEmergencyFundPaise) * 100)
  );

  // Runway with current standard burn (essentials + discretionary)
  const runwayMonths = totalBurn > 0
    ? Math.round((safeSavings / totalBurn) * 10) / 10
    : 0;

  // Bare-bones runway if all discretionary spending is immediately frozen to zero
  const bareBonesRunwayMonths = Math.round((safeSavings / safeEssential) * 10) / 10;

  let tier: EmergencyFundTier = "Adequate";
  let shockResilienceRating: "High" | "Moderate" | "Low" = "Moderate";
  let tacticalAdvice = "Solid cash buffer. Continue preserving liquid capital in high-yield liquid instruments.";

  if (bareBonesRunwayMonths >= targetMonths) {
    tier = "Fortified";
    shockResilienceRating = "High";
    tacticalAdvice = "Your safety net is fully capitalized. Excess cash flow can now be safely diverted to long-term equity compounding.";
  } else if (bareBonesRunwayMonths >= 3) {
    tier = "Adequate";
    shockResilienceRating = "Moderate";
    tacticalAdvice = "You can weather moderate shocks. Channel 15-20% of monthly surplus until reaching the 6-month safety threshold.";
  } else if (bareBonesRunwayMonths >= 1) {
    tier = "Vulnerable";
    shockResilienceRating = "Low";
    tacticalAdvice = "High fragility to unexpected income disruption. Immediately trim discretionary subscriptions to build a 3-month foundation.";
  } else {
    tier = "Critical Deficit";
    shockResilienceRating = "Low";
    tacticalAdvice = "Urgent: Less than 30 days of subsistence reserves. Prioritize establishing a starter emergency fund before debt prepayments.";
  }

  // Months to reach full goal at current monthly contribution rate
  let monthsToGoal = 0;
  if (gapToTargetPaise > 0 && safeContribution > 0) {
    monthsToGoal = Math.ceil(gapToTargetPaise / safeContribution);
  }

  return {
    liquidSavingsPaise: safeSavings,
    monthlyEssentialPaise: safeEssential,
    targetEmergencyFundPaise,
    gapToTargetPaise,
    percentageFunded,
    runwayMonths,
    bareBonesRunwayMonths,
    tier,
    monthsToGoal,
    shockResilienceRating,
    tacticalAdvice,
  };
}
