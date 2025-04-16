"use client"

import { Plus } from "lucide-react"
import { useState } from "react"
import { NewTransactionForm } from "./new-transaction-form"


export default function AddTransactionButton() {
    const [showform, setShowform] = useState(false);

    function blurBackground() {
        let blurDiv = document.getElementById("blur-background");
        if (!blurDiv) {
            blurDiv = document.createElement("div");
            blurDiv.id = "blur-background";
            blurDiv.style.position = "fixed";
            blurDiv.style.top = "0";
            blurDiv.style.left = "0";
            blurDiv.style.width = "100%";
            blurDiv.style.height = "100%";
            blurDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            blurDiv.style.backdropFilter = "blur(5px)";
            blurDiv.style.zIndex = "998"; // Ensure it's below the form
            document.body.appendChild(blurDiv);
        }
    }

    function removeBlur() {
        const blurDiv = document.getElementById("blur-background");
        if (blurDiv) {
            document.body.removeChild(blurDiv);
        }
    }

    const handleClick = () => {
        setShowform(!showform);
        if (!showform) {
            blurBackground();
        } else {
            removeBlur();
        }
    };

    return (
        <>
            {showform && (
                <div
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[999]"
                >
                    <NewTransactionForm />
                </div>
            )}
            <button
                onClick={handleClick}
                className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
                aria-label="Add transaction"
            >
                <Plus className="w-6 h-6" />
            </button>
        </>
    );
}