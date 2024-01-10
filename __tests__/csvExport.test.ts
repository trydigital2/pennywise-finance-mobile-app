import { escapeCSVField, exportTransactionsToCSV, exportMonthlySummaryToCSV } from "../src/services/csvExport";
import { Transaction } from "../src/types/transaction";

describe("CSV Export Service", () => {
  describe("escapeCSVField", () => {
    it("escapes fields containing commas with quotes", () => {
      expect(escapeCSVField("Supermarket, Inc.")).toBe(String.fromCharCode(34) + "Supermarket, Inc." + String.fromCharCode(34));
    });

    it("escapes fields containing double quotes with doubled quotes", () => {
      const input = "John " + String.fromCharCode(34) + "The Man" + String.fromCharCode(34) + " Doe";
      const expected = String.fromCharCode(34) + "John " + String.fromCharCode(34, 34) + "The Man" + String.fromCharCode(34, 34) + " Doe" + String.fromCharCode(34);
      expect(escapeCSVField(input)).toBe(expected);
    });

    it("returns plain string when no special characters are present", () => {
      expect(escapeCSVField("Amazon")).toBe("Amazon");
      expect(escapeCSVField(1500)).toBe("1500");
    });

    it("handles null and undefined gracefully", () => {
      expect(escapeCSVField(null)).toBe("");
      expect(escapeCSVField(undefined)).toBe("");
    });
  });

  describe("exportTransactionsToCSV", () => {
    const mockTransactions: Transaction[] = [
      {
        id: "tx-1",
        title: "Grocery Store, Downtown",
        amountPaise: 250000,
        type: "expense",
        categoryId: "food-dining",
        accountId: "acc-checking",
        date: "2026-10-25T14:30:00.000Z",
        notes: "Weekly supplies, fruits & veggies",
        isRecurring: false,
      },
      {
        id: "tx-2",
        title: "Client Retainer",
        amountPaise: 8500000,
        type: "income",
        categoryId: "salary",
        accountId: "acc-savings",
        date: "2026-10-26T10:00:00.000Z",
        notes: "Monthly tech advisory",
        isRecurring: true,
      },
    ];

    it("generates valid CSV rows with header and converted rupee amounts", () => {
      const csv = exportTransactionsToCSV(mockTransactions);
      const lines = csv.split(String.fromCharCode(10));

      expect(lines.length).toBe(3);
      expect(lines[0]).toContain("Transaction ID,Date,Type,Category");
      expect(lines[1]).toContain("Grocery Store, Downtown");
      expect(lines[1]).toContain("2500.00");
      expect(lines[1]).toContain("Weekly supplies, fruits & veggies");
      expect(lines[2]).toContain("Income");
      expect(lines[2]).toContain("85000.00");
      expect(lines[2]).toContain("Yes");
    });

    it("handles empty transactions list returning only header", () => {
      const csv = exportTransactionsToCSV([]);
      expect(csv).toBe("Transaction ID,Date,Type,Category,Merchant / Title,Account,Amount (INR),Notes,Recurring");
    });
  });

  describe("exportMonthlySummaryToCSV", () => {
    it("formats monthly income, expenses, and category shares accurately", () => {
      const csv = exportMonthlySummaryToCSV(
        "October 2026",
        15000000,
        8500000,
        6500000,
        [
          { categoryName: "Housing", spentPaise: 4000000, percentage: 47.1 },
          { categoryName: "Food & Dining", spentPaise: 2500000, percentage: 29.4 },
        ]
      );

      expect(csv).toContain("Financial Summary Report - October 2026");
      expect(csv).toContain("Total Income,150000.00");
      expect(csv).toContain("Total Expenses,85000.00");
      expect(csv).toContain("Net Savings,65000.00");
      expect(csv).toContain("Food & Dining");
      expect(csv).toContain("25000.00,29.4%");
    });
  });
});
