import { Transaction } from '../types';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    "id": "tx_001",
    "title": "Tech Salary - August Credit",
    "amountPaise": 17500000,
    "type": "income",
    "categoryId": "cat_salary",
    "accountId": "acc_checking_01",
    "date": "2026-08-01T10:00:00.000Z",
    "merchant": "Infosys Ltd",
    "notes": "Monthly salary deposit",
    "isRecurring": true,
    "tags": [
      "salary",
      "income"
    ]
  },
  {
    "id": "tx_002",
    "title": "Apartment Rent Payment",
    "amountPaise": 3500000,
    "type": "expense",
    "categoryId": "cat_housing",
    "accountId": "acc_checking_01",
    "date": "2026-08-01T12:30:00.000Z",
    "merchant": "Prestige Estates",
    "notes": "August rent",
    "isRecurring": true,
    "tags": [
      "housing",
      "expense"
    ]
  },
  {
    "id": "tx_003",
    "title": "Supermarket Grocery Haul",
    "amountPaise": 485000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_checking_01",
    "date": "2026-08-02T16:45:00.000Z",
    "merchant": "Blinkit",
    "notes": "Weekly staples and fruits",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_004",
    "title": "Fuel Station Petrol Refill",
    "amountPaise": 220000,
    "type": "expense",
    "categoryId": "cat_transport",
    "accountId": "acc_checking_01",
    "date": "2026-08-03T09:15:00.000Z",
    "merchant": "Shell Petrol",
    "notes": "Full tank refill",
    "isRecurring": false,
    "tags": [
      "transport",
      "expense"
    ]
  },
  {
    "id": "tx_005",
    "title": "Dinner with College Friends",
    "amountPaise": 215000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_checking_01",
    "date": "2026-08-04T21:00:00.000Z",
    "merchant": "Toit Brewpub",
    "notes": "Dinner & craft drinks",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_006",
    "title": "High-Speed Fiber Internet",
    "amountPaise": 119900,
    "type": "expense",
    "categoryId": "cat_bills",
    "accountId": "acc_checking_01",
    "date": "2026-08-05T11:00:00.000Z",
    "merchant": "Airtel Xstream",
    "notes": "Broadband 300Mbps",
    "isRecurring": true,
    "tags": [
      "bills",
      "expense"
    ]
  },
  {
    "id": "tx_007",
    "title": "Morning Artisan Coffee",
    "amountPaise": 35000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_wallet_03",
    "date": "2026-08-06T08:30:00.000Z",
    "merchant": "Blue Tokai",
    "notes": "Cold brew and croissant",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_008",
    "title": "Weekend Metro Commute Pass",
    "amountPaise": 40000,
    "type": "expense",
    "categoryId": "cat_transport",
    "accountId": "acc_wallet_03",
    "date": "2026-08-07T18:20:00.000Z",
    "merchant": "Namma Metro",
    "notes": "Smart card top-up",
    "isRecurring": false,
    "tags": [
      "transport",
      "expense"
    ]
  },
  {
    "id": "tx_009",
    "title": "Pharmacy Vitamin Supplements",
    "amountPaise": 85000,
    "type": "expense",
    "categoryId": "cat_healthcare",
    "accountId": "acc_checking_01",
    "date": "2026-08-08T15:10:00.000Z",
    "merchant": "Apollo Pharmacy",
    "notes": "Multivitamins and Omega-3",
    "isRecurring": false,
    "tags": [
      "healthcare",
      "expense"
    ]
  },
  {
    "id": "tx_010",
    "title": "Cult.fit Gym Installment",
    "amountPaise": 180000,
    "type": "expense",
    "categoryId": "cat_healthcare",
    "accountId": "acc_checking_01",
    "date": "2026-08-08T10:00:00.000Z",
    "merchant": "Cult.fit",
    "notes": "Monthly fitness center pass",
    "isRecurring": true,
    "tags": [
      "healthcare",
      "expense"
    ]
  },
  {
    "id": "tx_011",
    "title": "Online Book Purchase",
    "amountPaise": 95000,
    "type": "expense",
    "categoryId": "cat_education",
    "accountId": "acc_checking_01",
    "date": "2026-08-09T14:40:00.000Z",
    "merchant": "Amazon India",
    "notes": "System design & clean code books",
    "isRecurring": false,
    "tags": [
      "education",
      "expense"
    ]
  },
  {
    "id": "tx_012",
    "title": "Freelance UI Design Milestone",
    "amountPaise": 3500000,
    "type": "income",
    "categoryId": "cat_freelance",
    "accountId": "acc_checking_01",
    "date": "2026-08-10T11:30:00.000Z",
    "merchant": "Upwork Escrow",
    "notes": "Fintech mobile dashboard design",
    "isRecurring": false,
    "tags": [
      "freelance",
      "income"
    ]
  },
  {
    "id": "tx_013",
    "title": "Cinema IMAX Movie Tickets",
    "amountPaise": 98000,
    "type": "expense",
    "categoryId": "cat_entertainment",
    "accountId": "acc_checking_01",
    "date": "2026-08-10T19:00:00.000Z",
    "merchant": "BookMyShow",
    "notes": "Weekend movie with popcorn",
    "isRecurring": false,
    "tags": [
      "entertainment",
      "expense"
    ]
  },
  {
    "id": "tx_014",
    "title": "Electricity Power Bill",
    "amountPaise": 345000,
    "type": "expense",
    "categoryId": "cat_bills",
    "accountId": "acc_checking_01",
    "date": "2026-08-11T12:00:00.000Z",
    "merchant": "State Electricity Board",
    "notes": "Monthly power consumption",
    "isRecurring": true,
    "tags": [
      "bills",
      "expense"
    ]
  },
  {
    "id": "tx_015",
    "title": "Spotify Family Plan",
    "amountPaise": 19900,
    "type": "expense",
    "categoryId": "cat_entertainment",
    "accountId": "acc_checking_01",
    "date": "2026-08-12T09:00:00.000Z",
    "merchant": "Spotify India",
    "notes": "Family subscription",
    "isRecurring": true,
    "tags": [
      "entertainment",
      "expense"
    ]
  },
  {
    "id": "tx_016",
    "title": "Casual Dining Lunch",
    "amountPaise": 65000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_checking_01",
    "date": "2026-08-13T13:30:00.000Z",
    "merchant": "Social Cafe",
    "notes": "Lunch meeting",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_017",
    "title": "Uber Prime Airport Ride",
    "amountPaise": 124000,
    "type": "expense",
    "categoryId": "cat_transport",
    "accountId": "acc_checking_01",
    "date": "2026-08-14T07:15:00.000Z",
    "merchant": "Uber India",
    "notes": "Early morning terminal drop",
    "isRecurring": false,
    "tags": [
      "transport",
      "expense"
    ]
  },
  {
    "id": "tx_018",
    "title": "Netflix 4K Subscription",
    "amountPaise": 64900,
    "type": "expense",
    "categoryId": "cat_entertainment",
    "accountId": "acc_checking_01",
    "date": "2026-08-15T09:00:00.000Z",
    "merchant": "Netflix",
    "notes": "Monthly ultra HD plan",
    "isRecurring": true,
    "tags": [
      "entertainment",
      "expense"
    ]
  },
  {
    "id": "tx_019",
    "title": "Formal Cotton Shirts Sale",
    "amountPaise": 289900,
    "type": "expense",
    "categoryId": "cat_shopping",
    "accountId": "acc_checking_01",
    "date": "2026-08-16T17:00:00.000Z",
    "merchant": "Zara Retail",
    "notes": "Office workwear",
    "isRecurring": false,
    "tags": [
      "shopping",
      "expense"
    ]
  },
  {
    "id": "tx_020",
    "title": "Daily Dairy & Eggs",
    "amountPaise": 18000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_wallet_03",
    "date": "2026-08-17T08:00:00.000Z",
    "merchant": "Country Delight",
    "notes": "Farm fresh delivery",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_021",
    "title": "Quarterly Dividend Payout",
    "amountPaise": 420000,
    "type": "income",
    "categoryId": "cat_investments",
    "accountId": "acc_savings_02",
    "date": "2026-08-18T10:00:00.000Z",
    "merchant": "HDFC Mutual Fund",
    "notes": "Quarterly dividend credit",
    "isRecurring": false,
    "tags": [
      "investments",
      "income"
    ]
  },
  {
    "id": "tx_022",
    "title": "Dentist Checkup & Cleaning",
    "amountPaise": 150000,
    "type": "expense",
    "categoryId": "cat_healthcare",
    "accountId": "acc_checking_01",
    "date": "2026-08-19T11:45:00.000Z",
    "merchant": "Clove Dental",
    "notes": "Routine dental care",
    "isRecurring": false,
    "tags": [
      "healthcare",
      "expense"
    ]
  },
  {
    "id": "tx_023",
    "title": "Fast Food Late Night Snack",
    "amountPaise": 42000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_wallet_03",
    "date": "2026-08-20T23:15:00.000Z",
    "merchant": "McDonalds",
    "notes": "Burger and fries",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_024",
    "title": "Home Water Can Delivery",
    "amountPaise": 35000,
    "type": "expense",
    "categoryId": "cat_bills",
    "accountId": "acc_wallet_03",
    "date": "2026-08-21T09:00:00.000Z",
    "merchant": "Local Water Supply",
    "notes": "Packaged drinking water",
    "isRecurring": true,
    "tags": [
      "bills",
      "expense"
    ]
  },
  {
    "id": "tx_025",
    "title": "Mechanical Keyboard Switch Set",
    "amountPaise": 185000,
    "type": "expense",
    "categoryId": "cat_shopping",
    "accountId": "acc_checking_01",
    "date": "2026-08-22T14:30:00.000Z",
    "merchant": "Keychron India",
    "notes": "Key switches for desk setup",
    "isRecurring": false,
    "tags": [
      "shopping",
      "expense"
    ]
  },
  {
    "id": "tx_026",
    "title": "Mobile Prepaid Recharge Plan",
    "amountPaise": 71900,
    "type": "expense",
    "categoryId": "cat_bills",
    "accountId": "acc_checking_01",
    "date": "2026-08-23T16:00:00.000Z",
    "merchant": "Jio Infocomm",
    "notes": "84-day 5G data plan",
    "isRecurring": false,
    "tags": [
      "bills",
      "expense"
    ]
  },
  {
    "id": "tx_027",
    "title": "Auto Rickshaw Commute",
    "amountPaise": 12000,
    "type": "expense",
    "categoryId": "cat_transport",
    "accountId": "acc_wallet_03",
    "date": "2026-08-24T18:45:00.000Z",
    "merchant": "Local Auto",
    "notes": "Office to metro station",
    "isRecurring": false,
    "tags": [
      "transport",
      "expense"
    ]
  },
  {
    "id": "tx_028",
    "title": "Monthly Mutual Fund SIP",
    "amountPaise": 1500000,
    "type": "expense",
    "categoryId": "cat_investments",
    "accountId": "acc_checking_01",
    "date": "2026-08-25T10:00:00.000Z",
    "merchant": "Zerodha Coin",
    "notes": "Nifty 50 Index Fund SIP",
    "isRecurring": true,
    "tags": [
      "investments",
      "expense"
    ]
  },
  {
    "id": "tx_029",
    "title": "Organic Vegetables Market",
    "amountPaise": 62000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_wallet_03",
    "date": "2026-08-26T10:30:00.000Z",
    "merchant": "Farmers Market",
    "notes": "Weekly fresh produce",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_030",
    "title": "Gourmet Ice Cream Treat",
    "amountPaise": 38000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_wallet_03",
    "date": "2026-08-27T20:30:00.000Z",
    "merchant": "Corner House",
    "notes": "Death by Chocolate sundae",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_031",
    "title": "Weekend Car Wash & Detail",
    "amountPaise": 75000,
    "type": "expense",
    "categoryId": "cat_transport",
    "accountId": "acc_wallet_03",
    "date": "2026-08-28T11:00:00.000Z",
    "merchant": "Speed Car Spa",
    "notes": "Interior vacuum & exterior wash",
    "isRecurring": false,
    "tags": [
      "transport",
      "expense"
    ]
  },
  {
    "id": "tx_032",
    "title": "Ergonomic Lumbar Cushion",
    "amountPaise": 129900,
    "type": "expense",
    "categoryId": "cat_shopping",
    "accountId": "acc_checking_01",
    "date": "2026-08-29T15:20:00.000Z",
    "merchant": "Amazon India",
    "notes": "Work from home ergonomics",
    "isRecurring": false,
    "tags": [
      "shopping",
      "expense"
    ]
  },
  {
    "id": "tx_033",
    "title": "Gourmet Dinner Date",
    "amountPaise": 345000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_checking_01",
    "date": "2026-08-30T20:30:00.000Z",
    "merchant": "Olive Beach",
    "notes": "Italian dinner & mocktails",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_034",
    "title": "Cash Withdrawal from ATM",
    "amountPaise": 500000,
    "type": "expense",
    "categoryId": "cat_other_income",
    "accountId": "acc_checking_01",
    "date": "2026-08-31T17:00:00.000Z",
    "merchant": "HDFC ATM",
    "notes": "Monthly petty cash replenishment",
    "isRecurring": false,
    "tags": [
      "other_income",
      "expense"
    ]
  },
  {
    "id": "tx_035",
    "title": "Tech Salary - September Credit",
    "amountPaise": 17500000,
    "type": "income",
    "categoryId": "cat_salary",
    "accountId": "acc_checking_01",
    "date": "2026-09-01T10:00:00.000Z",
    "merchant": "Infosys Ltd",
    "notes": "Monthly salary deposit",
    "isRecurring": true,
    "tags": [
      "salary",
      "income"
    ]
  },
  {
    "id": "tx_036",
    "title": "Apartment Rent Payment",
    "amountPaise": 3500000,
    "type": "expense",
    "categoryId": "cat_housing",
    "accountId": "acc_checking_01",
    "date": "2026-09-01T12:00:00.000Z",
    "merchant": "Prestige Estates",
    "notes": "September rent",
    "isRecurring": true,
    "tags": [
      "housing",
      "expense"
    ]
  },
  {
    "id": "tx_037",
    "title": "Monthly Grocery Stockup",
    "amountPaise": 540000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_checking_01",
    "date": "2026-09-02T15:30:00.000Z",
    "merchant": "D-Mart Ready",
    "notes": "Bulk pulses, oil & rice",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_038",
    "title": "Fuel Station Petrol Refill",
    "amountPaise": 215000,
    "type": "expense",
    "categoryId": "cat_transport",
    "accountId": "acc_checking_01",
    "date": "2026-09-03T08:50:00.000Z",
    "merchant": "Shell Petrol",
    "notes": "Full tank premium petrol",
    "isRecurring": false,
    "tags": [
      "transport",
      "expense"
    ]
  },
  {
    "id": "tx_039",
    "title": "High-Speed Fiber Internet",
    "amountPaise": 119900,
    "type": "expense",
    "categoryId": "cat_bills",
    "accountId": "acc_checking_01",
    "date": "2026-09-05T11:00:00.000Z",
    "merchant": "Airtel Xstream",
    "notes": "Broadband 300Mbps",
    "isRecurring": true,
    "tags": [
      "bills",
      "expense"
    ]
  },
  {
    "id": "tx_040",
    "title": "Morning Coffee & Bagel",
    "amountPaise": 32000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_wallet_03",
    "date": "2026-09-06T09:10:00.000Z",
    "merchant": "Third Wave Coffee",
    "notes": "Espresso and bagel",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_041",
    "title": "Uber Ride to Tech Park",
    "amountPaise": 38000,
    "type": "expense",
    "categoryId": "cat_transport",
    "accountId": "acc_checking_01",
    "date": "2026-09-07T09:40:00.000Z",
    "merchant": "Uber Auto",
    "notes": "Morning commute",
    "isRecurring": false,
    "tags": [
      "transport",
      "expense"
    ]
  },
  {
    "id": "tx_042",
    "title": "Cult.fit Gym Installment",
    "amountPaise": 180000,
    "type": "expense",
    "categoryId": "cat_healthcare",
    "accountId": "acc_checking_01",
    "date": "2026-09-08T10:00:00.000Z",
    "merchant": "Cult.fit",
    "notes": "Monthly fitness center pass",
    "isRecurring": true,
    "tags": [
      "healthcare",
      "expense"
    ]
  },
  {
    "id": "tx_043",
    "title": "Piped Cooking Gas Bill",
    "amountPaise": 95000,
    "type": "expense",
    "categoryId": "cat_bills",
    "accountId": "acc_checking_01",
    "date": "2026-09-09T14:00:00.000Z",
    "merchant": "Adani Gas",
    "notes": "Bimonthly utility bill",
    "isRecurring": false,
    "tags": [
      "bills",
      "expense"
    ]
  },
  {
    "id": "tx_044",
    "title": "Mobile App Architecture Retainer",
    "amountPaise": 3500000,
    "type": "income",
    "categoryId": "cat_freelance",
    "accountId": "acc_checking_01",
    "date": "2026-09-10T12:00:00.000Z",
    "merchant": "Global FinTech Client",
    "notes": "Consulting retainer milestone",
    "isRecurring": true,
    "tags": [
      "freelance",
      "income"
    ]
  },
  {
    "id": "tx_045",
    "title": "Electricity Power Bill",
    "amountPaise": 312000,
    "type": "expense",
    "categoryId": "cat_bills",
    "accountId": "acc_checking_01",
    "date": "2026-09-11T11:30:00.000Z",
    "merchant": "State Electricity Board",
    "notes": "Monthly power consumption",
    "isRecurring": true,
    "tags": [
      "bills",
      "expense"
    ]
  },
  {
    "id": "tx_046",
    "title": "Spotify Family Plan",
    "amountPaise": 19900,
    "type": "expense",
    "categoryId": "cat_entertainment",
    "accountId": "acc_checking_01",
    "date": "2026-09-12T09:00:00.000Z",
    "merchant": "Spotify India",
    "notes": "Family subscription",
    "isRecurring": true,
    "tags": [
      "entertainment",
      "expense"
    ]
  },
  {
    "id": "tx_047",
    "title": "Swiggy Biryani Dinner",
    "amountPaise": 68000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_checking_01",
    "date": "2026-09-13T20:45:00.000Z",
    "merchant": "Meghana Foods",
    "notes": "Special chicken biryani",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_048",
    "title": "Running Shoes for Jogging",
    "amountPaise": 429900,
    "type": "expense",
    "categoryId": "cat_shopping",
    "accountId": "acc_checking_01",
    "date": "2026-09-14T17:30:00.000Z",
    "merchant": "Nike Store",
    "notes": "Pegasus road running shoes",
    "isRecurring": false,
    "tags": [
      "shopping",
      "expense"
    ]
  },
  {
    "id": "tx_049",
    "title": "Netflix 4K Subscription",
    "amountPaise": 64900,
    "type": "expense",
    "categoryId": "cat_entertainment",
    "accountId": "acc_checking_01",
    "date": "2026-09-15T09:00:00.000Z",
    "merchant": "Netflix",
    "notes": "Monthly ultra HD plan",
    "isRecurring": true,
    "tags": [
      "entertainment",
      "expense"
    ]
  },
  {
    "id": "tx_050",
    "title": "Online Course - Advanced TS & Node",
    "amountPaise": 149900,
    "type": "expense",
    "categoryId": "cat_education",
    "accountId": "acc_checking_01",
    "date": "2026-09-16T18:00:00.000Z",
    "merchant": "Frontend Masters",
    "notes": "Annual developer subscription",
    "isRecurring": false,
    "tags": [
      "education",
      "expense"
    ]
  },
  {
    "id": "tx_051",
    "title": "Artisan Sourdough Bakery",
    "amountPaise": 45000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_wallet_03",
    "date": "2026-09-17T11:20:00.000Z",
    "merchant": "Glen's Bakehouse",
    "notes": "Sourdough loaf and red velvet",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_052",
    "title": "Annual Term Insurance Premium",
    "amountPaise": 2450000,
    "type": "expense",
    "categoryId": "cat_healthcare",
    "accountId": "acc_checking_01",
    "date": "2026-09-18T10:15:00.000Z",
    "merchant": "HDFC Life",
    "notes": "Annual protection plan",
    "isRecurring": false,
    "tags": [
      "healthcare",
      "expense"
    ]
  },
  {
    "id": "tx_053",
    "title": "Weekly Fruit Basket",
    "amountPaise": 32000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_wallet_03",
    "date": "2026-09-19T09:30:00.000Z",
    "merchant": "Nature's Basket",
    "notes": "Apples, bananas, and avocados",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_054",
    "title": "Weekend Brunch Buffet",
    "amountPaise": 220000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_checking_01",
    "date": "2026-09-20T12:30:00.000Z",
    "merchant": "JW Marriott",
    "notes": "Sunday brunch with family",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_055",
    "title": "Noise-Cancelling Headphones",
    "amountPaise": 1499000,
    "type": "expense",
    "categoryId": "cat_shopping",
    "accountId": "acc_checking_01",
    "date": "2026-09-21T15:00:00.000Z",
    "merchant": "Sony Center",
    "notes": "WH-1000XM5 headphones",
    "isRecurring": false,
    "tags": [
      "shopping",
      "expense"
    ]
  },
  {
    "id": "tx_056",
    "title": "Auto Fare Office Commute",
    "amountPaise": 14000,
    "type": "expense",
    "categoryId": "cat_transport",
    "accountId": "acc_wallet_03",
    "date": "2026-09-22T19:00:00.000Z",
    "merchant": "Namma Yatri",
    "notes": "Evening auto ride",
    "isRecurring": false,
    "tags": [
      "transport",
      "expense"
    ]
  },
  {
    "id": "tx_057",
    "title": "Interest Credit on Fixed Deposit",
    "amountPaise": 850000,
    "type": "income",
    "categoryId": "cat_investments",
    "accountId": "acc_savings_02",
    "date": "2026-09-23T10:00:00.000Z",
    "merchant": "ICICI Bank",
    "notes": "FD interest credited",
    "isRecurring": false,
    "tags": [
      "investments",
      "income"
    ]
  },
  {
    "id": "tx_058",
    "title": "Blinkit Emergency Household Items",
    "amountPaise": 45000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_checking_01",
    "date": "2026-09-24T21:10:00.000Z",
    "merchant": "Blinkit",
    "notes": "Milk, bread, snack bars",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_059",
    "title": "Monthly Mutual Fund SIP",
    "amountPaise": 1500000,
    "type": "expense",
    "categoryId": "cat_investments",
    "accountId": "acc_checking_01",
    "date": "2026-09-25T10:00:00.000Z",
    "merchant": "Zerodha Coin",
    "notes": "Nifty 50 Index Fund SIP",
    "isRecurring": true,
    "tags": [
      "investments",
      "expense"
    ]
  },
  {
    "id": "tx_060",
    "title": "Housekeeper & Maid Salary",
    "amountPaise": 450000,
    "type": "expense",
    "categoryId": "cat_bills",
    "accountId": "acc_wallet_03",
    "date": "2026-09-26T10:00:00.000Z",
    "merchant": "Home Help",
    "notes": "Monthly home cleaning service",
    "isRecurring": true,
    "tags": [
      "bills",
      "expense"
    ]
  },
  {
    "id": "tx_061",
    "title": "Dry Cleaning & Ironing",
    "amountPaise": 65000,
    "type": "expense",
    "categoryId": "cat_shopping",
    "accountId": "acc_wallet_03",
    "date": "2026-09-27T17:00:00.000Z",
    "merchant": "UClean Laundry",
    "notes": "Suits and blankets",
    "isRecurring": false,
    "tags": [
      "shopping",
      "expense"
    ]
  },
  {
    "id": "tx_062",
    "title": "Team Lunch Celebration",
    "amountPaise": 185000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_checking_01",
    "date": "2026-09-28T13:45:00.000Z",
    "merchant": "Barbeque Nation",
    "notes": "Project release celebration",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_063",
    "title": "Fuel Station Petrol Refill",
    "amountPaise": 225000,
    "type": "expense",
    "categoryId": "cat_transport",
    "accountId": "acc_checking_01",
    "date": "2026-09-29T08:30:00.000Z",
    "merchant": "Indian Oil",
    "notes": "Tank refill",
    "isRecurring": false,
    "tags": [
      "transport",
      "expense"
    ]
  },
  {
    "id": "tx_064",
    "title": "Savings Goal Allocation - Emergency",
    "amountPaise": 2000000,
    "type": "expense",
    "categoryId": "cat_investments",
    "accountId": "acc_checking_01",
    "date": "2026-09-30T14:00:00.000Z",
    "merchant": "Emergency Fund",
    "notes": "Monthly allocation to ICICI reserve",
    "isRecurring": false,
    "tags": [
      "investments",
      "expense"
    ]
  },
  {
    "id": "tx_065",
    "title": "Tech Salary - October Credit",
    "amountPaise": 17500000,
    "type": "income",
    "categoryId": "cat_salary",
    "accountId": "acc_checking_01",
    "date": "2026-10-01T10:00:00.000Z",
    "merchant": "Infosys Ltd",
    "notes": "Monthly salary deposit",
    "isRecurring": true,
    "tags": [
      "salary",
      "income"
    ]
  },
  {
    "id": "tx_066",
    "title": "Apartment Rent Payment",
    "amountPaise": 3500000,
    "type": "expense",
    "categoryId": "cat_housing",
    "accountId": "acc_checking_01",
    "date": "2026-10-01T12:00:00.000Z",
    "merchant": "Prestige Estates",
    "notes": "October rent",
    "isRecurring": true,
    "tags": [
      "housing",
      "expense"
    ]
  },
  {
    "id": "tx_067",
    "title": "Supermarket Grocery Haul",
    "amountPaise": 495000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_checking_01",
    "date": "2026-10-02T16:20:00.000Z",
    "merchant": "Zepto Supermarket",
    "notes": "Household groceries & spices",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_068",
    "title": "Annual Term Insurance Fund Goal",
    "amountPaise": 4500000,
    "type": "expense",
    "categoryId": "cat_healthcare",
    "accountId": "acc_checking_01",
    "date": "2026-10-02T11:00:00.000Z",
    "merchant": "HDFC ERGO",
    "notes": "Insurance goal completion",
    "isRecurring": false,
    "tags": [
      "healthcare",
      "expense"
    ]
  },
  {
    "id": "tx_069",
    "title": "Fuel Station Petrol Refill",
    "amountPaise": 220000,
    "type": "expense",
    "categoryId": "cat_transport",
    "accountId": "acc_checking_01",
    "date": "2026-10-03T09:10:00.000Z",
    "merchant": "Shell Petrol",
    "notes": "Full tank refill",
    "isRecurring": false,
    "tags": [
      "transport",
      "expense"
    ]
  },
  {
    "id": "tx_070",
    "title": "South Indian Breakfast",
    "amountPaise": 24000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_wallet_03",
    "date": "2026-10-04T09:30:00.000Z",
    "merchant": "Vidyarthi Bhavan",
    "notes": "Masala dosa & filter coffee",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_071",
    "title": "High-Speed Fiber Internet",
    "amountPaise": 119900,
    "type": "expense",
    "categoryId": "cat_bills",
    "accountId": "acc_checking_01",
    "date": "2026-10-05T11:00:00.000Z",
    "merchant": "Airtel Xstream",
    "notes": "Broadband 300Mbps",
    "isRecurring": true,
    "tags": [
      "bills",
      "expense"
    ]
  },
  {
    "id": "tx_072",
    "title": "Freelance Mobile Architecture",
    "amountPaise": 4000000,
    "type": "income",
    "categoryId": "cat_freelance",
    "accountId": "acc_checking_01",
    "date": "2026-10-06T14:30:00.000Z",
    "merchant": "Fintech Innovations",
    "notes": "Q4 Architecture milestone",
    "isRecurring": true,
    "tags": [
      "freelance",
      "income"
    ]
  },
  {
    "id": "tx_073",
    "title": "Zomato Italian Pizza Dinner",
    "amountPaise": 92000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_checking_01",
    "date": "2026-10-07T20:15:00.000Z",
    "merchant": "Brik Oven",
    "notes": "Woodfired sourdough pizza",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_074",
    "title": "Cult.fit Gym Installment",
    "amountPaise": 180000,
    "type": "expense",
    "categoryId": "cat_healthcare",
    "accountId": "acc_checking_01",
    "date": "2026-10-08T10:00:00.000Z",
    "merchant": "Cult.fit",
    "notes": "Monthly fitness center pass",
    "isRecurring": true,
    "tags": [
      "healthcare",
      "expense"
    ]
  },
  {
    "id": "tx_075",
    "title": "Pharmacy Cold Medicines",
    "amountPaise": 42000,
    "type": "expense",
    "categoryId": "cat_healthcare",
    "accountId": "acc_wallet_03",
    "date": "2026-10-09T17:40:00.000Z",
    "merchant": "Apollo Pharmacy",
    "notes": "Throat lozenges & paracetamol",
    "isRecurring": false,
    "tags": [
      "healthcare",
      "expense"
    ]
  },
  {
    "id": "tx_076",
    "title": "Electricity Power Bill",
    "amountPaise": 328000,
    "type": "expense",
    "categoryId": "cat_bills",
    "accountId": "acc_checking_01",
    "date": "2026-10-10T11:00:00.000Z",
    "merchant": "State Electricity Board",
    "notes": "Monthly power consumption",
    "isRecurring": true,
    "tags": [
      "bills",
      "expense"
    ]
  },
  {
    "id": "tx_077",
    "title": "Savings Goal - Japan Trip Deposit",
    "amountPaise": 1000000,
    "type": "expense",
    "categoryId": "cat_investments",
    "accountId": "acc_checking_01",
    "date": "2026-10-10T16:00:00.000Z",
    "merchant": "Japan Goal Reserve",
    "notes": "Travel goal contribution",
    "isRecurring": false,
    "tags": [
      "investments",
      "expense"
    ]
  },
  {
    "id": "tx_078",
    "title": "Weekend Movie Tickets & Snacks",
    "amountPaise": 115000,
    "type": "expense",
    "categoryId": "cat_entertainment",
    "accountId": "acc_checking_01",
    "date": "2026-10-11T19:30:00.000Z",
    "merchant": "PVR INOX",
    "notes": "Evening cinema screening",
    "isRecurring": false,
    "tags": [
      "entertainment",
      "expense"
    ]
  },
  {
    "id": "tx_079",
    "title": "Spotify Family Plan",
    "amountPaise": 19900,
    "type": "expense",
    "categoryId": "cat_entertainment",
    "accountId": "acc_checking_01",
    "date": "2026-10-12T09:00:00.000Z",
    "merchant": "Spotify India",
    "notes": "Family subscription",
    "isRecurring": true,
    "tags": [
      "entertainment",
      "expense"
    ]
  },
  {
    "id": "tx_080",
    "title": "Diwali Festival Festive Sweets",
    "amountPaise": 145000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_checking_01",
    "date": "2026-10-13T16:00:00.000Z",
    "merchant": "Anand Sweets",
    "notes": "Assorted kaju katli & dry fruits",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_081",
    "title": "Festival Ethnic Kurta & Jacket",
    "amountPaise": 485000,
    "type": "expense",
    "categoryId": "cat_shopping",
    "accountId": "acc_checking_01",
    "date": "2026-10-14T18:00:00.000Z",
    "merchant": "Fabindia",
    "notes": "Diwali festive celebration outfit",
    "isRecurring": false,
    "tags": [
      "shopping",
      "expense"
    ]
  },
  {
    "id": "tx_082",
    "title": "Netflix 4K Subscription",
    "amountPaise": 64900,
    "type": "expense",
    "categoryId": "cat_entertainment",
    "accountId": "acc_checking_01",
    "date": "2026-10-15T09:00:00.000Z",
    "merchant": "Netflix",
    "notes": "Monthly ultra HD plan",
    "isRecurring": true,
    "tags": [
      "entertainment",
      "expense"
    ]
  },
  {
    "id": "tx_083",
    "title": "MacBook Pro Goal Achieved",
    "amountPaise": 1800000,
    "type": "expense",
    "categoryId": "cat_education",
    "accountId": "acc_savings_02",
    "date": "2026-10-15T15:00:00.000Z",
    "merchant": "Apple Store",
    "notes": "M4 Pro 32GB developer machine",
    "isRecurring": false,
    "tags": [
      "education",
      "expense"
    ]
  },
  {
    "id": "tx_084",
    "title": "Organic Sourdough & Granola",
    "amountPaise": 48000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_wallet_03",
    "date": "2026-10-16T10:15:00.000Z",
    "merchant": "Artisan Bakery",
    "notes": "Weekly breakfast essentials",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_085",
    "title": "Diwali Gift Hampers for Friends",
    "amountPaise": 320000,
    "type": "expense",
    "categoryId": "cat_shopping",
    "accountId": "acc_checking_01",
    "date": "2026-10-17T17:30:00.000Z",
    "merchant": "Amazon India",
    "notes": "Handcrafted copper diyas & nuts",
    "isRecurring": false,
    "tags": [
      "shopping",
      "expense"
    ]
  },
  {
    "id": "tx_086",
    "title": "Uber Ride to Airport Pickup",
    "amountPaise": 89000,
    "type": "expense",
    "categoryId": "cat_transport",
    "accountId": "acc_checking_01",
    "date": "2026-10-18T13:00:00.000Z",
    "merchant": "Uber Premier",
    "notes": "Family airport reception",
    "isRecurring": false,
    "tags": [
      "transport",
      "expense"
    ]
  },
  {
    "id": "tx_087",
    "title": "Dinner at Smoke House Deli",
    "amountPaise": 265000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_checking_01",
    "date": "2026-10-19T20:30:00.000Z",
    "merchant": "Smoke House Deli",
    "notes": "European dinner & mocktails",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_088",
    "title": "Stock Market Capital Gains",
    "amountPaise": 980000,
    "type": "income",
    "categoryId": "cat_investments",
    "accountId": "acc_savings_02",
    "date": "2026-10-20T11:00:00.000Z",
    "merchant": "Zerodha Broking",
    "notes": "Profit booking in tech stock",
    "isRecurring": false,
    "tags": [
      "investments",
      "income"
    ]
  },
  {
    "id": "tx_089",
    "title": "Home Water Can Delivery",
    "amountPaise": 35000,
    "type": "expense",
    "categoryId": "cat_bills",
    "accountId": "acc_wallet_03",
    "date": "2026-10-21T09:30:00.000Z",
    "merchant": "Local Water Supply",
    "notes": "Packaged water cans",
    "isRecurring": true,
    "tags": [
      "bills",
      "expense"
    ]
  },
  {
    "id": "tx_090",
    "title": "Fresh Organic Dairy Delivery",
    "amountPaise": 22000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_wallet_03",
    "date": "2026-10-22T08:00:00.000Z",
    "merchant": "Country Delight",
    "notes": "Buffalo milk & curd delivery",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_091",
    "title": "Morning Latte & Espresso Shot",
    "amountPaise": 34000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_wallet_03",
    "date": "2026-10-22T09:15:00.000Z",
    "merchant": "Starbucks",
    "notes": "Flat white & blueberry muffin",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_092",
    "title": "Consulting Advisory Honorarium",
    "amountPaise": 2500000,
    "type": "income",
    "categoryId": "cat_freelance",
    "accountId": "acc_checking_01",
    "date": "2026-08-05T15:00:00.000Z",
    "merchant": "Tech Accelerator",
    "notes": "Startup mentor session",
    "isRecurring": false,
    "tags": [
      "freelance",
      "income"
    ]
  },
  {
    "id": "tx_093",
    "title": "Dry Fruit Gift Box",
    "amountPaise": 125000,
    "type": "expense",
    "categoryId": "cat_shopping",
    "accountId": "acc_checking_01",
    "date": "2026-08-11T16:00:00.000Z",
    "merchant": "Nutty Gritties",
    "notes": "Premium almonds & walnuts",
    "isRecurring": false,
    "tags": [
      "shopping",
      "expense"
    ]
  },
  {
    "id": "tx_094",
    "title": "Online Cloud Backup Service",
    "amountPaise": 65000,
    "type": "expense",
    "categoryId": "cat_bills",
    "accountId": "acc_checking_01",
    "date": "2026-08-14T11:00:00.000Z",
    "merchant": "Google One",
    "notes": "2TB cloud storage annual",
    "isRecurring": false,
    "tags": [
      "bills",
      "expense"
    ]
  },
  {
    "id": "tx_095",
    "title": "Dental Floss & Mouthwash",
    "amountPaise": 35000,
    "type": "expense",
    "categoryId": "cat_healthcare",
    "accountId": "acc_wallet_03",
    "date": "2026-08-18T18:00:00.000Z",
    "merchant": "Wellness Forever",
    "notes": "Personal hygiene items",
    "isRecurring": false,
    "tags": [
      "healthcare",
      "expense"
    ]
  },
  {
    "id": "tx_096",
    "title": "Car Parking Fee Tech Park",
    "amountPaise": 15000,
    "type": "expense",
    "categoryId": "cat_transport",
    "accountId": "acc_wallet_03",
    "date": "2026-08-20T17:30:00.000Z",
    "merchant": "Ecospace Parking",
    "notes": "Full day parking fee",
    "isRecurring": false,
    "tags": [
      "transport",
      "expense"
    ]
  },
  {
    "id": "tx_097",
    "title": "Artisan Ceramic Coffee Mugs",
    "amountPaise": 85000,
    "type": "expense",
    "categoryId": "cat_shopping",
    "accountId": "acc_checking_01",
    "date": "2026-08-23T14:00:00.000Z",
    "merchant": "Clay Crafts",
    "notes": "Handmade ceramic mugs",
    "isRecurring": false,
    "tags": [
      "shopping",
      "expense"
    ]
  },
  {
    "id": "tx_098",
    "title": "Udemy React Native Masterclass",
    "amountPaise": 49900,
    "type": "expense",
    "categoryId": "cat_education",
    "accountId": "acc_checking_01",
    "date": "2026-08-27T19:00:00.000Z",
    "merchant": "Udemy",
    "notes": "Performance optimization course",
    "isRecurring": false,
    "tags": [
      "education",
      "expense"
    ]
  },
  {
    "id": "tx_099",
    "title": "Local Metro Recharge",
    "amountPaise": 50000,
    "type": "expense",
    "categoryId": "cat_transport",
    "accountId": "acc_wallet_03",
    "date": "2026-08-30T10:00:00.000Z",
    "merchant": "Metro SmartCard",
    "notes": "Card top-up",
    "isRecurring": false,
    "tags": [
      "transport",
      "expense"
    ]
  },
  {
    "id": "tx_100",
    "title": "Cashback Reward Credit",
    "amountPaise": 55000,
    "type": "income",
    "categoryId": "cat_other_income",
    "accountId": "acc_checking_01",
    "date": "2026-09-04T12:00:00.000Z",
    "merchant": "Cred Pay",
    "notes": "Credit card payment cashback",
    "isRecurring": false,
    "tags": [
      "other_income",
      "income"
    ]
  },
  {
    "id": "tx_101",
    "title": "Car Tyre Pressure & Nitrogen",
    "amountPaise": 10000,
    "type": "expense",
    "categoryId": "cat_transport",
    "accountId": "acc_wallet_03",
    "date": "2026-09-08T09:00:00.000Z",
    "merchant": "Tyre Plus",
    "notes": "Nitrogen inflation",
    "isRecurring": false,
    "tags": [
      "transport",
      "expense"
    ]
  },
  {
    "id": "tx_102",
    "title": "Organic Honey & Jaggery",
    "amountPaise": 65000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_wallet_03",
    "date": "2026-09-12T16:00:00.000Z",
    "merchant": "Khadi Gramodyog",
    "notes": "Natural forest honey",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_103",
    "title": "Airport Lounge Entry",
    "amountPaise": 20000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_checking_01",
    "date": "2026-09-15T06:30:00.000Z",
    "merchant": "080 Lounge",
    "notes": "Debit card lounge swipe fee",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_104",
    "title": "Technical Documentation Tool",
    "amountPaise": 120000,
    "type": "expense",
    "categoryId": "cat_education",
    "accountId": "acc_checking_01",
    "date": "2026-09-18T14:00:00.000Z",
    "merchant": "Notion Labs",
    "notes": "Annual team workspace",
    "isRecurring": false,
    "tags": [
      "education",
      "expense"
    ]
  },
  {
    "id": "tx_105",
    "title": "Car Toll Plaza Charges",
    "amountPaise": 18000,
    "type": "expense",
    "categoryId": "cat_transport",
    "accountId": "acc_checking_01",
    "date": "2026-09-21T08:00:00.000Z",
    "merchant": "FASTag Auto Recharge",
    "notes": "Expressway toll debited",
    "isRecurring": false,
    "tags": [
      "transport",
      "expense"
    ]
  },
  {
    "id": "tx_106",
    "title": "Eye Drops & Contact Lens Solution",
    "amountPaise": 48000,
    "type": "expense",
    "categoryId": "cat_healthcare",
    "accountId": "acc_wallet_03",
    "date": "2026-09-24T18:00:00.000Z",
    "merchant": "Lenskart",
    "notes": "Contact lens maintenance",
    "isRecurring": false,
    "tags": [
      "healthcare",
      "expense"
    ]
  },
  {
    "id": "tx_107",
    "title": "Weekend Tennis Court Booking",
    "amountPaise": 80000,
    "type": "expense",
    "categoryId": "cat_entertainment",
    "accountId": "acc_checking_01",
    "date": "2026-09-27T07:00:00.000Z",
    "merchant": "Playo Arena",
    "notes": "Clay court 2 hour slot",
    "isRecurring": false,
    "tags": [
      "entertainment",
      "expense"
    ]
  },
  {
    "id": "tx_108",
    "title": "Mutual Fund Growth Gain",
    "amountPaise": 650000,
    "type": "income",
    "categoryId": "cat_investments",
    "accountId": "acc_savings_02",
    "date": "2026-09-29T10:00:00.000Z",
    "merchant": "SBI Bluechip Fund",
    "notes": "Systematic dividend reinvest",
    "isRecurring": false,
    "tags": [
      "investments",
      "income"
    ]
  },
  {
    "id": "tx_109",
    "title": "Auto Ride Return from Mall",
    "amountPaise": 18000,
    "type": "expense",
    "categoryId": "cat_transport",
    "accountId": "acc_wallet_03",
    "date": "2026-10-03T21:00:00.000Z",
    "merchant": "Local Auto",
    "notes": "Late evening auto fare",
    "isRecurring": false,
    "tags": [
      "transport",
      "expense"
    ]
  },
  {
    "id": "tx_110",
    "title": "Specialty Green Tea Leaves",
    "amountPaise": 55000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_checking_01",
    "date": "2026-10-06T11:00:00.000Z",
    "merchant": "Vahdam Teas",
    "notes": "Darjeeling first flush",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_111",
    "title": "Ergonomic Vertical Mouse",
    "amountPaise": 280000,
    "type": "expense",
    "categoryId": "cat_shopping",
    "accountId": "acc_checking_01",
    "date": "2026-10-08T15:00:00.000Z",
    "merchant": "Logitech India",
    "notes": "MX Master 3S wireless",
    "isRecurring": false,
    "tags": [
      "shopping",
      "expense"
    ]
  },
  {
    "id": "tx_112",
    "title": "Yoga Mat & Resistance Bands",
    "amountPaise": 140000,
    "type": "expense",
    "categoryId": "cat_healthcare",
    "accountId": "acc_checking_01",
    "date": "2026-10-12T17:00:00.000Z",
    "merchant": "Decathlon Sports",
    "notes": "High-density natural rubber mat",
    "isRecurring": false,
    "tags": [
      "healthcare",
      "expense"
    ]
  },
  {
    "id": "tx_113",
    "title": "Online Cloud Server Hosting",
    "amountPaise": 85000,
    "type": "expense",
    "categoryId": "cat_bills",
    "accountId": "acc_checking_01",
    "date": "2026-10-14T10:00:00.000Z",
    "merchant": "DigitalOcean",
    "notes": "Personal portfolio VPS",
    "isRecurring": false,
    "tags": [
      "bills",
      "expense"
    ]
  },
  {
    "id": "tx_114",
    "title": "Family Sweets Delivery",
    "amountPaise": 68000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_wallet_03",
    "date": "2026-10-17T19:00:00.000Z",
    "merchant": "KC Das",
    "notes": "Rasgulla & sandesh box",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  },
  {
    "id": "tx_115",
    "title": "Airport Metro Express Ticket",
    "amountPaise": 11000,
    "type": "expense",
    "categoryId": "cat_transport",
    "accountId": "acc_wallet_03",
    "date": "2026-10-18T11:00:00.000Z",
    "merchant": "Airport Express",
    "notes": "High speed transit line",
    "isRecurring": false,
    "tags": [
      "transport",
      "expense"
    ]
  },
  {
    "id": "tx_116",
    "title": "Audiobook Subscription",
    "amountPaise": 19900,
    "type": "expense",
    "categoryId": "cat_education",
    "accountId": "acc_checking_01",
    "date": "2026-10-19T09:00:00.000Z",
    "merchant": "Audible India",
    "notes": "Monthly audiobook credit",
    "isRecurring": true,
    "tags": [
      "education",
      "expense"
    ]
  },
  {
    "id": "tx_117",
    "title": "Car Wheel Alignment & Balance",
    "amountPaise": 45000,
    "type": "expense",
    "categoryId": "cat_transport",
    "accountId": "acc_wallet_03",
    "date": "2026-10-21T16:00:00.000Z",
    "merchant": "Bosch Service",
    "notes": "Annual maintenance check",
    "isRecurring": false,
    "tags": [
      "transport",
      "expense"
    ]
  },
  {
    "id": "tx_118",
    "title": "Coffee Beans 1kg Pack",
    "amountPaise": 98000,
    "type": "expense",
    "categoryId": "cat_food",
    "accountId": "acc_checking_01",
    "date": "2026-10-22T10:00:00.000Z",
    "merchant": "Devan's Coffee",
    "notes": "South Indian filter blend",
    "isRecurring": false,
    "tags": [
      "food",
      "expense"
    ]
  }
];
