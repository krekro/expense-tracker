"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { useState, useEffect } from "react"
import type { Transaction } from "~/types/expense"
import { getColorByCategory } from "~/types/expense"
import { getAPIurl } from "~/types/keys"


export default function TransactionList() {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        console.log("Fetching transaction data...");
        const user_name = "test_user" // Replace with actual user ID
        fetch(`${getAPIurl()}/api/transactions?user_name=${user_name}`, {
            "method": "GET"
        })
            .then((response) => {
                response.json().then((body) => {
                    const data: Transaction[] = body.data.map((item: any) => ({
                        payment_id: item.payment_id,
                        user_name: item.user_name,
                        description: item.description,
                        amount: item.amount,
                        category: item.category,
                        categoryColor: getColorByCategory(item.category),
                        date: new Date(item.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })
                    }))
                    setTransactions(data)
                    console.log("Transactions:", data)
                })
            })
            .catch((error) => {
                console.error("Error fetching transaction data:", error)
            }
            )
            .finally(() => {
                console.log("Transaction data fetch completed")
            }
            )
    }, [])

    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your recent spending activities</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {transactions.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">No transactions found</p>
                    ) : (
                        transactions.map((transaction, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: `${transaction.categoryColor}20` }}
                                    >
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: transaction.categoryColor }} />
                                    </div>
                                    <div>
                                        <p className="font-medium">{transaction.description}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {transaction.category} • {transaction.date}
                                        </p>
                                    </div>
                                </div>
                                <span className="font-semibold">${transaction.amount.toFixed(2)}</span>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}