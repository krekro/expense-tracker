import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useState } from "react";

function MonthSelector() {
  const [select, setSelect] = useState("Select Month");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-gray-50 rounded-3xl text-xs font-mono font-light py-1 px-5 shadow-sm hover:bg-gray-900 hover:text-white hover:cursor-pointer">
        {select}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>2025</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Jan</DropdownMenuItem>
        <DropdownMenuItem>Feb</DropdownMenuItem>
        <DropdownMenuItem>Mar</DropdownMenuItem>
        <DropdownMenuItem>Apr</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { MonthSelector };
