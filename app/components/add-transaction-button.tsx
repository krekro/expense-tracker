"use client"

import { Plus } from "lucide-react"

export default function AddTransactionButton() {
    const handleClick = () => {
        alert("Add transaction functionality would open a form here")
        // In a real app, this would open a modal or navigate to a form
    }

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
            aria-label="Add transaction"
        >
            <Plus className="w-6 h-6" />
        </button>
    )
}