import ExpenseCardTest from "~/components/expense-card-test"

export default function dashboard() {
    return (
        <main className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-6">Expense Tracker</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ExpenseCardTest />
            </div>
        </main>
    )
}