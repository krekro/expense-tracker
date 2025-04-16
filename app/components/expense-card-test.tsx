import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { ExpenseDonutChart } from "./expense-donut-chart"
//import { expenseData } from "~/data/expense-data"
import { expenseData } from "~/test-data/expense-data-test"
import { useState, useEffect } from "react"
import type { ExpenseItem } from "~/types/expense"

function ExpenseCardTest() {

  const initialState: ExpenseItem[] = []
  // Use state to handle the data
  const [data, setData] = useState<ExpenseItem[]>(initialState)
  const [totalExpense, setTotalExpense] = useState(0)


  // Load data with useEffect to ensure client-side execution
  useEffect(() => {
    console.log("rerendering.....")
    setData(expenseData)
    console.log("Expense data:", expenseData)

    const total = expenseData.reduce((acc, item) => acc + item.amount, 0)
    setTotalExpense(total)
    console.log("Total expense:", total)
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Monthly Expenses</CardTitle>
        <CardDescription>
          Your spending for {new Date().toLocaleString("default", { month: "long" })} {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <ExpenseDonutChart data={data} />
          <div className="mt-4 text-2xl font-bold">${totalExpense.toLocaleString()}</div>
          <div className="grid grid-cols-2 gap-4 mt-6 w-full">
            {data.map((item, index) => (
              <div key={`${item.category}-${index}`} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm">{item.category}</span>
                <span className="text-sm font-medium ml-auto">${item.amount}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            <span>Update</span>
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ExpenseCardTest