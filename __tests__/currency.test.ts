import {
  formatCurrency,
  formatCompactCurrency,
  formatIndianNumber,
  formatInternationalNumber,
  rupeesToPaise,
  paiseToRupees,
  parseCurrencyInput,
} from '../src/utils/currency';

describe('Currency Utility Functions', () => {
  describe('rupeesToPaise and paiseToRupees', () => {
    test('converts rupees to paise accurately without floating point glitches', () => {
      expect(rupeesToPaise(100)).toBe(10000);
      expect(rupeesToPaise(19.99)).toBe(1999);
      expect(rupeesToPaise(0.05)).toBe(5);
      expect(rupeesToPaise(0)).toBe(0);
      expect(rupeesToPaise(NaN)).toBe(0);
    });

    test('converts paise to rupees accurately', () => {
      expect(paiseToRupees(10000)).toBe(100);
      expect(paiseToRupees(1999)).toBe(19.99);
      expect(paiseToRupees(50)).toBe(0.5);
      expect(paiseToRupees(0)).toBe(0);
    });
  });

  describe('formatIndianNumber', () => {
    test('formats numbers using Indian grouping (e.g. 1,23,456)', () => {
      expect(formatIndianNumber(1000, false)).toBe('1,000');
      expect(formatIndianNumber(10000, false)).toBe('10,000');
      expect(formatIndianNumber(100000, false)).toBe('1,00,000');
      expect(formatIndianNumber(1234567, false)).toBe('12,34,567');
      expect(formatIndianNumber(10000000, false)).toBe('1,00,00,000');
    });

    test('handles negative values and decimals', () => {
      expect(formatIndianNumber(-150000, false)).toBe('-1,50,000');
      expect(formatIndianNumber(1250.75, true)).toBe('1,250.75');
    });
  });

  describe('formatInternationalNumber', () => {
    test('formats numbers using 3-digit grouping', () => {
      expect(formatInternationalNumber(1000000, false)).toBe('1,000,000');
      expect(formatInternationalNumber(123456, false)).toBe('123,456');
    });
  });

  describe('formatCurrency', () => {
    test('formats INR with symbol and Indian grouping', () => {
      expect(formatCurrency(18542000, 'INR', false)).toBe('₹1,85,420');
      expect(formatCurrency(50000, 'INR', false)).toBe('₹500');
    });

    test('formats USD with dollar symbol', () => {
      expect(formatCurrency(150000, 'USD', false)).toBe('$1,500');
    });

    test('formats EUR with euro symbol', () => {
      expect(formatCurrency(250000, 'EUR', false)).toBe('€2,500');
    });

    test('formats GBP with pound symbol', () => {
      expect(formatCurrency(350000, 'GBP', false)).toBe('£3,500');
    });
  });

  describe('formatCompactCurrency', () => {
    test('formats compact INR values (K, L, Cr)', () => {
      expect(formatCompactCurrency(4500000, 'INR')).toBe('₹45K');
      expect(formatCompactCurrency(15000000, 'INR')).toBe('₹1.5L');
      expect(formatCompactCurrency(2500000000, 'INR')).toBe('₹2.5Cr');
    });

    test('formats compact USD values (K, M)', () => {
      expect(formatCompactCurrency(4500000, 'USD')).toBe('$45K');
      expect(formatCompactCurrency(150000000, 'USD')).toBe('$1.5M');
    });
  });

  describe('parseCurrencyInput', () => {
    test('parses plain and formatted numbers into paise', () => {
      expect(parseCurrencyInput('1500')).toBe(150000);
      expect(parseCurrencyInput('₹ 1,500.50')).toBe(150050);
      expect(parseCurrencyInput('  12,345  ')).toBe(1234500);
      expect(parseCurrencyInput('')).toBe(0);
      expect(parseCurrencyInput('invalid')).toBe(0);
    });
  });
});
