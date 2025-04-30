export interface ExpenseItem {
  category: string
  amount: number
  color: string
}

export interface Transaction {
  date: string
  description: string
  amount: number
  category: string
  categoryColor: string
}

export function getColorByCategory(category: string): string {
  const colors: { [key: string]: string } = {
    Housing: "#FF6384",
    Food: "#36A2EB",
    Transportation: "#FFCE56",
    Entertainment: "#4BC0C0",
    Utilities: "#9966FF",
    Healthcare: "#FF9F40",
    Other: "#808080",
  }
  return colors[category] || "#000000" // Default color if category not found
}

