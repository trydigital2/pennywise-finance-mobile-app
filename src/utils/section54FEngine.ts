/**
 * Section 54F Capital Gains Exemption Optimizer Engine
 * Calculates proportionate LTCG tax exemption on sale of long-term capital assets
 * (shares, mutual funds, commercial property, gold) when reinvested into a residential house.
 * Uses integer paise precision.
 */

export interface Section54FInputs {
  netConsiderationPaise: number; // Gross sale price minus transfer expenses
  capitalGainPaise: number; // Net consideration minus indexed cost of acquisition
  reinvestmentAmountPaise: number; // Amount invested in purchase/construction of house or CGAS
  ltcgTaxRate?: number; // default 12.5% (Budget 2024 revised rate)
  hasMultipleHouses?: boolean; // Disqualified if owning >1 house on transfer date
}

export interface Section54FSummary {
  eligibleExemptionPaise: number;
  taxableCapitalGainPaise: number;
  taxLiabilityAvoidedPaise: number;
  reinvestmentRatioPercent: number;
  isFullyExempt: boolean;
  isDisqualified: boolean;
  cgasDepositDeadlineMonths: number;
  lockInPeriodYears: number;
  statusNote: string;
}

// Statutory cap under Section 54F (₹10 Crores = 1,000,000,000 paise * 100)
export const SECTION_54F_STATUTORY_CAP_PAISE = 100000000000;

export function calculateSection54FExemption(inputs: Section54FInputs): Section54FSummary {
  const {
    netConsiderationPaise,
    capitalGainPaise,
    reinvestmentAmountPaise,
    ltcgTaxRate = 0.125,
    hasMultipleHouses = false,
  } = inputs;

  if (hasMultipleHouses) {
    return {
      eligibleExemptionPaise: 0,
      taxableCapitalGainPaise: capitalGainPaise,
      taxLiabilityAvoidedPaise: 0,
      reinvestmentRatioPercent: 0,
      isFullyExempt: false,
      isDisqualified: true,
      cgasDepositDeadlineMonths: 0,
      lockInPeriodYears: 3,
      statusNote: 'Disqualified under Sec 54F: Assessee owns more than one residential house.',
    };
  }

  const cappedReinvestment = Math.min(
    reinvestmentAmountPaise,
    SECTION_54F_STATUTORY_CAP_PAISE,
    netConsiderationPaise
  );

  // Proportionate Formula: Capital Gain * (Reinvestment / Net Consideration)
  const ratio = netConsiderationPaise > 0 ? cappedReinvestment / netConsiderationPaise : 0;
  const eligibleExemption = Math.round(capitalGainPaise * Math.min(1.0, ratio));
  const taxableGain = Math.max(0, capitalGainPaise - eligibleExemption);
  const taxAvoided = Math.round(eligibleExemption * ltcgTaxRate);

  const isFullyExempt = cappedReinvestment >= netConsiderationPaise;

  return {
    eligibleExemptionPaise: eligibleExemption,
    taxableCapitalGainPaise: taxableGain,
    taxLiabilityAvoidedPaise: taxAvoided,
    reinvestmentRatioPercent: Math.round(ratio * 100),
    isFullyExempt,
    isDisqualified: false,
    cgasDepositDeadlineMonths: 12, // Due date of filing ITR u/s 139(1)
    lockInPeriodYears: 3, // Lock-in period for newly acquired house
    statusNote: isFullyExempt
      ? '100% Capital Gains sheltered under Section 54F.'
      : `Partial exemption: ${Math.round(ratio * 100)}% of net consideration reinvested.`,
  };
}

