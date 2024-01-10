/**
 * Transaction & Financial Report CSV Export Service
 * Serializes local ledger transactions, categories, and monthly aggregates
 * into standard RFC 4180 compliant CSV format for spreadsheet export.
 */

import { Transaction } from "@/types/transaction";
import { Account } from "@/types/account";
import { Category } from "@/types/category";
import { paiseToRupees } from "@/utils/currency";

export interface CSVExportOptions {
  includeHeaders?: boolean;
}

/**
 * Escapes CSV field values containing commas, double quotes, or newlines.
 */
export function escapeCSVField(field: string | number | boolean | null | undefined): string {
  if (field === null || field === undefined) {
    return "";
  }
  const str = String(field);
  const quote = String.fromCharCode(34);
  const hasSpecial = str.indexOf(",") !== -1 || str.indexOf(quote) !== -1 || str.indexOf(String.fromCharCode(10)) !== -1;
  if (hasSpecial) {
    const doubleQuote = quote + quote;
    const escaped = str.split(quote).join(doubleQuote);
    return quote + escaped + quote;
  }
  return str;
}

/**
 * Converts a list of transactions into a formatted CSV string.
 */
export function exportTransactionsToCSV(
  transactions: Transaction[],
  accounts: Account[] = [],
  categories: Category[] = [],
  options: CSVExportOptions = {}
): string {
  const { includeHeaders = true } = options;

  const accountMap = new Map<string, string>();
  accounts.forEach((acc) => accountMap.set(acc.id, acc.name));

  const categoryMap = new Map<string, string>();
  categories.forEach((cat) => categoryMap.set(cat.id, cat.name));

  const rows: string[] = [];

  if (includeHeaders) {
    rows.push("Transaction ID,Date,Type,Category,Merchant / Title,Account,Amount (INR),Notes,Recurring");
  }

  transactions.forEach((tx) => {
    const formattedDate = tx.date ? tx.date.substring(0, 10) : "";
    const typeLabel = tx.type === "income" ? "Income" : "Expense";
    const categoryName = categoryMap.get(tx.categoryId) || tx.categoryId || "Uncategorized";
    const accountName = accountMap.get(tx.accountId) || tx.accountId || "General";
    const amountRupees = paiseToRupees(tx.amountPaise).toFixed(2);
    const recurringLabel = tx.isRecurring ? "Yes" : "No";

    const row = [
      escapeCSVField(tx.id),
      escapeCSVField(formattedDate),
      escapeCSVField(typeLabel),
      escapeCSVField(categoryName),
      escapeCSVField(tx.title),
      escapeCSVField(accountName),
      escapeCSVField(amountRupees),
      escapeCSVField(tx.notes || ""),
      escapeCSVField(recurringLabel),
    ].join(",");

    rows.push(row);
  });

  return rows.join(String.fromCharCode(10));
}

/**
 * Converts monthly financial summary metrics into an executive CSV report.
 */
export function exportMonthlySummaryToCSV(
  monthLabel: string,
  totalIncomePaise: number,
  totalExpensePaise: number,
  netSavingsPaise: number,
  categorySpending: Array<{ categoryName: string; spentPaise: number; percentage: number }>
): string {
  const rows: string[] = [];

  rows.push("Financial Summary Report - " + monthLabel);
  rows.push("Metric,Amount (INR)");
  rows.push("Total Income," + paiseToRupees(totalIncomePaise).toFixed(2));
  rows.push("Total Expenses," + paiseToRupees(totalExpensePaise).toFixed(2));
  rows.push("Net Savings," + paiseToRupees(netSavingsPaise).toFixed(2));
  rows.push("");
  rows.push("Category Spending Breakdown");
  rows.push("Category,Amount (INR),Share of Total (%)");

  categorySpending.forEach((cat) => {
    rows.push(
      escapeCSVField(cat.categoryName) + "," + paiseToRupees(cat.spentPaise).toFixed(2) + "," + cat.percentage.toFixed(1) + "%"
    );
  });

  return rows.join(String.fromCharCode(10));
}
