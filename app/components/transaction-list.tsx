"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useState, useEffect } from "react";
import type { Transaction } from "~/services/expense";
import { getColorByCategory } from "~/services/expense";
import { getAPIurl } from "~/services/keys";
import { getCookie } from "~/services/user";
import { Trash2, SquarePen, LoaderCircle } from "lucide-react";
import type { UUIDTypes } from "uuid";

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isProcessing, setProcessing] = useState(false);
  const [Target, setTarget] = useState(0);

  function handleDelete(payment_id: UUIDTypes) {
    const qeuryParams =
      `user_name=${getCookie("username")}` +
      `&session_id=${getCookie("session_id")}` +
      `&payment_id=${payment_id}`;
    fetch(`${getAPIurl("prod")}/api/delete-transaction?${qeuryParams}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        window.location.reload();
      } else {
        alert("Internal server error, please try again.");
        window.location.reload();
      }
    });
  }

  function fetchData(api: string) {
    fetch(
      `${api}/api/transactions?user_name=${getCookie(
        "username"
      )}&session_id=${getCookie("session_id")}`,
      {
        method: "GET",
      }
    )
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
            }),
          }));
          setTransactions(data);
          console.log("Transactions:", data);
        });
      })
      .catch((error) => {
        console.error("Error fetching transaction data:", error);
      })
      .finally(() => {
        console.log("Transaction data fetch completed");
      });
  }

  useEffect(() => {
    console.log("Fetching transaction data...");
    const api = getAPIurl("prod");
    fetchData(api);
  }, []);

  return (
    <Card className="w-full h-full bg-white dark:bg-gray-900 hover:bg-muted/20 shadow-md">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your recent spending activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="flex items-center animate-pulse justify-between p-3 border rounded-lg hover:scale-101 hover:bg-muted/100 transition-colors shadow-sm">
              <svg
                className="mr-3 size-10 animate-spin stroke-black"
                viewBox="0 0 24 24"
              >
                <LoaderCircle />
              </svg>
              <p className="text-left animate-pulse text-muted-foreground py-4">
                No transactions found
              </p>
            </div>
          ) : (
            transactions.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:scale-101 hover:bg-muted/100 transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: `${transaction.categoryColor}20`,
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: transaction.categoryColor }}
                    />
                  </div>
                  <div>
                    <p className="lg:w-90 w-30 font-medium truncate ">
                      {transaction.description}
                    </p>
                    <p className="lg:w-90 w-30 lg:text-sm text-xs text-muted-foreground text-wrap">
                      {transaction.category} • {transaction.date}
                    </p>
                  </div>
                </div>
                <span className="lg:w-50 text-sm lg:text-base text-right font-semibold lg:truncate">
                  ${transaction.amount.toFixed(2)}
                </span>
                <span>
                  {isProcessing && Target == index ? (
                    <LoaderCircle className="size-4 animate-spin stroke-red-700" />
                  ) : (
                    <Trash2
                      onClick={() => {
                        setProcessing(true);
                        setTarget(index);
                        handleDelete(transaction.payment_id);
                      }}
                      className="hover:stroke-red-500 hover: cursor-pointer"
                      width={15}
                    />
                  )}
                  <SquarePen
                    className="hover:stroke-blue-600 hover: cursor-pointer"
                    width={15}
                  />
                </span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
