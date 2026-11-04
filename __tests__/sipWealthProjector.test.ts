import {
  calculateSIPWealthProjection,
  formatPaiseToCompactINR,
} from '../src/utils/sipWealthProjector';

describe('PennyWise SIP Wealth Compounding Projector', () => {
  describe('calculateSIPWealthProjection', () => {
    it('computes 10-year standard SIP growth accurately', () => {
      // 10,000 INR per month = 1,000,000 paise. 12% return for 10 years
      const projection = calculateSIPWealthProjection(1000000, 0.12, 10);

      // Total invested: 10,000 * 120 = 1,200,000 INR (120,000,000 paise)
      expect(projection.totalInvestedPaise).toBe(120000000);
      expect(projection.totalCorpusPaise).toBeGreaterThan(projection.totalInvestedPaise);
      expect(projection.wealthMultiplier).toBeGreaterThan(1.5);
      expect(projection.yearlySnapshots).toHaveLength(10);
    });

    it('models annual step-up SIP with higher terminal corpus', () => {
      const fixedSip = calculateSIPWealthProjection(1000000, 0.12, 10, 0);
      const stepUpSip = calculateSIPWealthProjection(1000000, 0.12, 10, 0.10); // 10% annual step-up

      expect(stepUpSip.totalInvestedPaise).toBeGreaterThan(fixedSip.totalInvestedPaise);
      expect(stepUpSip.totalCorpusPaise).toBeGreaterThan(fixedSip.totalCorpusPaise);
    });

    it('computes inflation-adjusted real purchasing power', () => {
      const projection = calculateSIPWealthProjection(1000000, 0.12, 10, 0, 0.06);

      expect(projection.inflationAdjustedCorpusPaise).toBeLessThan(projection.totalCorpusPaise);
      expect(projection.inflationAdjustedCorpusPaise).toBeGreaterThan(projection.totalInvestedPaise);
    });
  });

  describe('formatPaiseToCompactINR', () => {
    it('formats Crores correctly', () => {
      // 1.5 Crores INR = 15,000,000 INR = 1,500,000,000 paise
      expect(formatPaiseToCompactINR(1500000000)).toBe('₹1.50 Cr');
    });

    it('formats Lakhs correctly', () => {
      // 25 Lakhs INR = 2,500,000 INR = 250,000,000 paise
      expect(formatPaiseToCompactINR(250000000)).toBe('₹25.00 L');
    });

    it('formats thousands correctly', () => {
      // 45,000 INR = 4,500,000 paise
      expect(formatPaiseToCompactINR(4500000)).toBe('₹45,000');
    });
  });
});

