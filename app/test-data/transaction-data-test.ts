import type { Transaction } from "~/types/expense"


// Helper function to get a formatted date string for the past n days
const getDateString = (daysAgo: number) => {
    const date = new Date()
    date.setDate(date.getDate() - daysAgo)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export const transactionData: Transaction[] = [
    {
        date: getDateString(0),
        description: "Grocery Shopping",
        amount: 78.45,
        category: "Food",
        categoryColor: "#36A2EB",
    },
    {
        date: getDateString(1),
        description: "Electric Bill",
        amount: 95.2,
        category: "Utilities",
        categoryColor: "#9966FF",
    },
    {
        date: getDateString(2),
        description: "Netflix Subscription",
        amount: 15.99,
        category: "Entertainment",
        categoryColor: "#4BC0C0",
    },
    {
        date: getDateString(3),
        description: "Gas Station",
        amount: 45.67,
        category: "Transportation",
        categoryColor: "#FFCE56",
    },
    {
        date: getDateString(4),
        description: "Rent Payment",
        amount: 1200.0,
        category: "Housing",
        categoryColor: "#FF6384",
    },
    {
        date: getDateString(5),
        description: "Pharmacy",
        amount: 32.5,
        category: "Healthcare",
        categoryColor: "#FF9F40",
    },
    {
        date: getDateString(6),
        description: "Restaurant Dinner",
        amount: 65.3,
        category: "Food",
        categoryColor: "#36A2EB",
    },
    {
        date: getDateString(7),
        description: "Mobile Phone Bill",
        amount: 55.0,
        category: "Utilities",
        categoryColor: "#9966FF",
    },
]