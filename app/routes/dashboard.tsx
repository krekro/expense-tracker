import ExpenseCard from "~/components/expense-card"
import TransactionList from "~/components/transaction-list"
import AddTransactionButton from "~/components/add-transaction-button"
import { useState } from "react";


export default function dashboard() {

    return (
        <div>
            <main
                className="container mx-auto p-4 md:p-8"
            >
                <h1 className="text-3xl font-bold mb-6">Expense Tracker</h1>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-2">
                        <ExpenseCard />
                    </div>
                    <div className="lg:col-span-3">
                        <TransactionList />
                    </div>
                </div>
            </main>
            <AddTransactionButton />
        </div>
    );


}