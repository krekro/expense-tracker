"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {} from "lucide-react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { getAPIurl } from "~/services/keys";
import { getCookie } from "~/services/user";

export function NewTransactionForm() {
  const [transactionDesc, setTransactionDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requestBody = {
      session_id: getCookie("session_id"),
      payment_id: uuidv4(),
      user_name: getCookie("username"),
      transaction_desc: transactionDesc,
      amount: parseFloat(amount),
      category: category,
      create_date: new Date().toISOString(),
    };
    console.log("Request Body:", requestBody);
    fetch(`${getAPIurl("prod")}/api/create-transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }).then((response) => {
      if (response.ok) {
        console.log("Transaction added successfully");
        setTransactionDesc("");
        setAmount("");
        setCategory("");
        window.location.reload();
      } else {
        console.error("Error adding transaction:", response.statusText);
        alert("Cannot submit null value, please resubmit.");
      }
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mt-6 justify-center lg:grid-cols-4 gap-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg z-50 relative resize-x"
      >
        <button
          type="button"
          onClick={() => window.location.reload()} // Replace with a proper close handler if needed
          className="absolute top-4 right-5 text-gray-500 hover:text-red-700 dark:text-gray-400 dark:hover:text-gray-200 hover: cursor-pointer"
        >
          ✕
        </button>
        <div className="mt-4 relative z-0 lg:col-span-2">
          <input
            type="text"
            name="transaction_desc"
            value={transactionDesc}
            onChange={(e) => setTransactionDesc(e.target.value)}
            className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Description
          </label>
        </div>

        <div className="mt-6 relative z-0 lg:col-span-4">
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Amount
          </label>
        </div>

        <div className="mt-5 relative z-0 lg:col-span-4">
          <Autocomplete
            value={category}
            onChange={(event, newValue) => setCategory(newValue || "")}
            options={[
              "Housing",
              "Food",
              "Transportation",
              "Utilities",
              "Entertainment",
              "Healthcare",
              "Other",
            ]}
            renderInput={(params) => (
              <TextField {...params} label="Category" variant="standard" />
            )}
            className="w-full text-gray-900"
          />
        </div>

        <Button className="mt-8 hover: cursor-pointer" type="submit">
          Add Transaction
        </Button>
      </form>
    </div>
  );
}
