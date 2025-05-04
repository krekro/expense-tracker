"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { ExpenseItem } from "~/services/expense";
import { LoaderCircle } from "lucide-react";

interface ExpenseDonutChartProps {
  data: ExpenseItem[];
}

export function ExpenseDonutChart({ data }: ExpenseDonutChartProps) {
  // Add a check to ensure data is available
  //console.log("ExpenseDonutChart data:", data);
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] animate-pulse w-full flex items-center justify-center">
        <svg className="mr-3 size-10 animate-spin ..." viewBox="0 0 24 24">
          <LoaderCircle />
        </svg>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cornerRadius={4}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            paddingAngle={8}
            dataKey="amount"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
