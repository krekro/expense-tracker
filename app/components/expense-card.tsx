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
import { getCookie, handleLogout } from "~/services/user";
import { MonthSelector } from "./ui/month-drop-down";

function ExpenseCard() {
  // Use state to handle the data
  const [data, setData] = useState<ExpenseItem[]>([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const api = getAPIurl("prod");

  function fetchData(api: string) {
    //console.log(`debug expensecard = ${getCookie(" session_id")}`);
    fetch(
      `${api}/api/expenses/?user_name=${getCookie(
        "username"
      )}&session_id=${getCookie("session_id")}`,
      {
        method: "GET",
      }
    ).then((response) => {
      if (response.ok) {
        response.json().then((body) => {
          const cdata: ExpenseItem[] = sortDataByAmount(body.data).map(
            (item: any) => ({
              category: item.Category,
              amount: item.Amount,
              color: getColorByCategory(item.Category),
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
      } else {
        response.json().then((body) => {
          if (body.message == "Invalid Session") {
            handleLogout();
            alert("Invalid Session, please login again");
          }
        });
      }
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
      fetchData(api);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Invalid user session, please login again and retry");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Card className="w-full bg-white dark:bg-gray-900 hover:bg-muted/20 shadow-md">
      <CardHeader>
        <CardTitle>
          <div className="grid grid-cols-3 gap-3">
            <span className="pt-1">Monthly Expenses</span>
            <span className="col-span-1 col-start-3">
              <MonthSelector />
            </span>
          </div>
        </CardTitle>
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
                onClick={() => {
                  window.location.reload();
                }}
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
