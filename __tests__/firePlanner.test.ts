import { calculateFIREReadiness } from '../src/utils/firePlanner';

describe('PennyWise FIRE & Early Retirement Engine', () => {
  it('calculates 4% FIRE number correctly (25x annual expenses)', () => {
    // ₹12,00,000 annual expenses (120000000 paise) -> 25x = ₹3,00,00,000 (3000000000 paise)
    const res = calculateFIREReadiness({
      annualExpensesPaise: 120000000,
      currentNetWorthPaise: 50000000,
      annualSavingsPaise: 60000000,
      safeWithdrawalRatePct: 4.0,
    });

    expect(res.fireTargetNumberPaise).toBe(3000000000);
    expect(res.leanFireNumberPaise).toBe(2250000000); // 75%
    expect(res.fatFireNumberPaise).toBe(4500000000); // 150%
  });

  it('identifies Coast FIRE when portfolio alone compounds to target without added savings', () => {
    // Current portfolio ₹1.5 Cr (1500000000 paise), Target ₹3 Cr in 20 years at ~3.7% real return
    const res = calculateFIREReadiness({
      annualExpensesPaise: 120000000,
      currentNetWorthPaise: 1600000000,
      annualSavingsPaise: 10000000,
      currentAge: 30,
      targetRetirementAge: 50,
      safeWithdrawalRatePct: 4.0,
      expectedReturnRate: 0.11,
      inflationRate: 0.06,
    });

    expect(res.isCoastFIREReached).toBe(true);
    expect(res.tier).toBe('Coast FIRE');
  });

  it('computes years to FIRE and projected retirement age', () => {
    const res = calculateFIREReadiness({
      annualExpensesPaise: 100000000,
      currentNetWorthPaise: 50000000,
      annualSavingsPaise: 80000000,
      currentAge: 28,
    });

    expect(res.estimatedYearsToFIRE).toBeGreaterThan(0);
    expect(res.estimatedYearsToFIRE).toBeLessThan(35);
    expect(res.projectedRetirementAge).toBe(28 + res.estimatedYearsToFIRE);
  });

  it('classifies FIRE Achieved when net worth exceeds target number', () => {
    const res = calculateFIREReadiness({
      annualExpensesPaise: 100000000, // ₹10L/yr -> ₹2.5 Cr target
      currentNetWorthPaise: 3000000000, // ₹3 Cr
      annualSavingsPaise: 0,
    });

    expect(res.fireProgressPct).toBe(100);
    expect(res.tier).toBe('FIRE Achieved');
  });
});
