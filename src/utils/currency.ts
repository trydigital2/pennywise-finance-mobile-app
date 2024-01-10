import { CurrencyCode } from '../types';

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

/**
 * Convert Rupees/Dollars to Paise/Cents (integer)
 */
export function rupeesToPaise(rupees: number): number {
  if (isNaN(rupees) || !isFinite(rupees)) return 0;
  return Math.round(rupees * 100);
}

/**
 * Convert Paise/Cents (integer) to Rupees/Dollars
 */
export function paiseToRupees(paise: number): number {
  if (isNaN(paise) || !isFinite(paise)) return 0;
  return paise / 100;
}

/**
 * Indian numbering system formatter (e.g. 1,23,456.78)
 */
export function formatIndianNumber(num: number, showDecimals: boolean = true): string {
  const isNegative = num < 0;
  const absNum = Math.abs(num);
  const parts = absNum.toFixed(2).split('.');
  let integerPart = parts[0];
  const decimalPart = parts[1];

  // Indian formatting: last 3 digits, then groups of 2
  if (integerPart.length > 3) {
    const lastThree = integerPart.substring(integerPart.length - 3);
    const otherNumbers = integerPart.substring(0, integerPart.length - 3);
    const formattedOther = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    integerPart = formattedOther + ',' + lastThree;
  }

  const result = showDecimals && decimalPart !== '00' 
    ? `${integerPart}.${decimalPart}` 
    : integerPart;

  return isNegative ? `-${result}` : result;
}

/**
 * Standard international numbering system formatter (e.g. 123,456.78)
 */
export function formatInternationalNumber(num: number, showDecimals: boolean = true): string {
  const isNegative = num < 0;
  const absNum = Math.abs(num);
  const parts = absNum.toFixed(2).split('.');
  let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const decimalPart = parts[1];

  const result = showDecimals && decimalPart !== '00' 
    ? `${integerPart}.${decimalPart}` 
    : integerPart;

  return isNegative ? `-${result}` : result;
}

/**
 * Formats integer paise into a localized currency string with proper symbol
 */
export function formatCurrency(
  amountPaise: number,
  currencyCode: CurrencyCode = 'INR',
  showDecimals: boolean = false
): string {
  const symbol = CURRENCY_SYMBOLS[currencyCode] || '₹';
  const units = paiseToRupees(amountPaise);

  if (currencyCode === 'INR') {
    return `${symbol}${formatIndianNumber(units, showDecimals)}`;
  } else {
    return `${symbol}${formatInternationalNumber(units, showDecimals)}`;
  }
}

/**
 * Helper to strip trailing .0 from compact numbers
 */
function stripTrailingZero(val: number): string {
  return val.toFixed(1).replace(/\.0$/, '');
}

/**
 * Compact currency for charts and cards (e.g., ₹1.5L, ₹45K, $50K)
 */
export function formatCompactCurrency(
  amountPaise: number,
  currencyCode: CurrencyCode = 'INR'
): string {
  const symbol = CURRENCY_SYMBOLS[currencyCode] || '₹';
  const units = Math.abs(paiseToRupees(amountPaise));
  const isNegative = amountPaise < 0;
  const prefix = isNegative ? '-' : '';

  if (currencyCode === 'INR') {
    if (units >= 10000000) {
      return `${prefix}${symbol}${stripTrailingZero(units / 10000000)}Cr`;
    }
    if (units >= 100000) {
      return `${prefix}${symbol}${stripTrailingZero(units / 100000)}L`;
    }
    if (units >= 1000) {
      return `${prefix}${symbol}${stripTrailingZero(units / 1000)}K`;
    }
    return `${prefix}${symbol}${Math.round(units)}`;
  }

  // Western compact (K, M, B)
  if (units >= 1000000000) {
    return `${prefix}${symbol}${stripTrailingZero(units / 1000000000)}B`;
  }
  if (units >= 1000000) {
    return `${prefix}${symbol}${stripTrailingZero(units / 1000000)}M`;
  }
  if (units >= 1000) {
    return `${prefix}${symbol}${stripTrailingZero(units / 1000)}K`;
  }
  return `${prefix}${symbol}${Math.round(units)}`;
}

/**
 * Parses user input string (e.g. "1,500.50" or "4500") into integer paise
 */
export function parseCurrencyInput(input: string): number {
  if (!input) return 0;
  // Remove currency symbols, commas, and whitespace
  const sanitized = input.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(sanitized);
  if (isNaN(parsed) || parsed < 0) return 0;
  return rupeesToPaise(parsed);
}
