"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ExpenseDonutChart } from "./ui/expense-donut-chart";
import { useState, useEffect } from "react";
import type { ExpenseItem } from "~/services/expense";
import { getColorByCategory } from "~/services/expense";
import { getAPIurl } from "~/services/keys";

function ExpenseCard() {
  // Use state to handle the data
  const [data, setData] = useState<ExpenseItem[]>([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function fetchData() {
    const user_name = "test_user";
    fetch(`${getAPIurl()}/api/expenses/?user_name=${user_name}`, {
      method: "GET",
    }).then((response) => {
      response.json().then((body) => {
        const cdata: ExpenseItem[] = sortDataByAmount(body.data).map(
          (item: any) => ({
            category: item.category,
            amount: item.amount,
            color: getColorByCategory(item.category),
          })
        );
        setData(cdata);
        console.log("Expense data:", cdata);
        const total = cdata.reduce(
          (acc: number, item: ExpenseItem) => acc + item.amount,
          0
        );
        setTotalExpense(total);
        console.log("Total expense:", total);
      });
    });
  }

  function sortDataByAmount(data: ExpenseItem[]) {
    return data.sort((a, b) => b.amount - a.amount);
  }

  // Load data with useEffect to ensure client-side execution
  useEffect(() => {
    console.log("fetching data.....");
    setIsLoading(true);
    try {
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Monthly Expenses</CardTitle>
        <CardDescription>
          Your spending for{" "}
          {new Date().toLocaleString("default", { month: "long" })}{" "}
          {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <ExpenseDonutChart data={data} />
              <div className="mt-4 text-2xl font-bold">
                ${totalExpense.toLocaleString()}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                {sortDataByAmount(data).map((item, index) => (
                  <div
                    key={`${item.category}-${index}`}
                    className="flex items-center gap-2"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.category}</span>
                    <span className="text-sm font-medium ml-auto">
                      ${item.amount}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={fetchData}
                style={{ cursor: "pointer" }}
                className="mt-10 bg-black text-white px-4 py-2 rounded hover:bg-gray-100 hover:text-black"
              >
                <span>Update</span>
              </button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ExpenseCard;
