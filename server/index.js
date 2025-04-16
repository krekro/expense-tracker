import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { PassThrough } from 'node:stream';
import { createReadableStreamFromReadable } from '@react-router/node';
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, NavLink, Outlet, isRouteErrorResponse } from 'react-router';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import * as React from 'react';
import { createElement, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Plus } from 'lucide-react';

const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}

const entryServer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: 'Module' }));

function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches(),
    };
    return createElement(Component, props);
  };
}

function withErrorBoundaryProps(ErrorBoundary) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError(),
    };
    return createElement(ErrorBoundary, props);
  };
}

const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  const theme = "light";
  return /* @__PURE__ */ jsxs("html", {
    className: theme,
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx("div", {
        children
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("nav", {
      className: "fixed z-50 top-0 left-0 right-0 shadow-md bg-accent",
      children: /* @__PURE__ */ jsxs("div", {
        className: "p-4 flex-center",
        children: [/* @__PURE__ */ jsx(NavLink, {
          to: "/",
          className: ({
            isActive
          }) => `px-4 py-2 rounded-md ${isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:text-white hover:bg-gray-800"}`,
          children: "Home"
        }), /* @__PURE__ */ jsx("span", {
          className: "mx-2 text-gray-500",
          children: "|"
        }), /* @__PURE__ */ jsx(NavLink, {
          to: "/dashboard",
          className: ({
            isActive
          }) => `px-4 py-2 rounded-md ${isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:text-white hover:bg-gray-800"}`,
          children: "Dashboard"
        })]
      })
    }), /* @__PURE__ */ jsx("main", {
      className: "mt-16",
      children: /* @__PURE__ */ jsx(Outlet, {})
    })]
  });
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});

const route0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: 'Module' }));

const home = withComponentProps(function Home() {
  const navigate = useNavigate();
  return /* @__PURE__ */jsxs("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      fontFamily: "Arial, sans-serif",
      color: "inherit",
      padding: "1rem"
    },
    children: [/* @__PURE__ */jsx("h1", {
      style: {
        fontSize: "3rem",
        marginBottom: "1.5rem",
        color: "inherit",
        fontWeight: "bold",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
      },
      children: "Welcome to Expense Tracker"
    }), /* @__PURE__ */jsx("p", {
      style: {
        fontSize: "1.2rem",
        textAlign: "center",
        maxWidth: "600px",
        lineHeight: "1.8",
        color: "inherit",
        marginBottom: "2rem"
      },
      children: "Track your expenses effortlessly and stay on top of your finances."
    }), /* @__PURE__ */jsx("button", {
      style: {
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "var(--primary-color, #007bff)",
        color: "white",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s, box-shadow 0.2s"
      },
      onMouseEnter: e => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.15)";
      },
      onMouseLeave: e => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      },
      onClick: () => {
        navigate("/signup");
      },
      children: "Get Started"
    })]
  });
});

const route1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: 'Module' }));

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("rounded-lg border bg-card text-card-foreground shadow-sm", className), ...props }));
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("h3", { ref, className: cn("text-2xl font-semibold leading-none tracking-tight", className), ...props })
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";

function ExpenseDonutChart({ data }) {
  console.log("ExpenseDonutChart data:", data);
  if (!data || data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "h-[300px] w-full flex items-center justify-center", children: "No expense data available" });
  }
  return /* @__PURE__ */ jsx("div", { className: "h-[300px] w-full", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
    /* @__PURE__ */ jsx(Pie, { data, cornerRadius: 4, cx: "50%", cy: "50%", innerRadius: 80, outerRadius: 100, paddingAngle: 8, dataKey: "amount", children: data.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: entry.color }, `cell-${index}`)) }),
    /* @__PURE__ */ jsx(Tooltip, {})
  ] }) }) });
}

function getColorByCategory(category) {
  const colors = {
    Housing: "#FF6384",
    Food: "#36A2EB",
    Transportation: "#FFCE56",
    Entertainment: "#4BC0C0",
    Utilities: "#9966FF",
    Healthcare: "#FF9F40"
  };
  return colors[category] || "#000000";
}

function ExpenseCard() {
  const [data, setData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  function fetchData() {
    fetch("http://localhost:4000/api/expenses", { method: "GET" }).then((response) => {
      response.json().then((body) => {
        console.log("json data: ", body);
        const cdata = sortDataByAmount(body.data).map((item) => ({
          category: item.category,
          amount: item.amount,
          color: getColorByCategory(item.category)
        }));
        setData(cdata);
        console.log("Expense data:", cdata);
        const total = cdata.reduce((acc, item) => acc + item.amount, 0);
        setTotalExpense(total);
        console.log("Total expense:", total);
      });
    });
  }
  function sortDataByAmount(data2) {
    return data2.sort((a, b) => b.amount - a.amount);
  }
  useEffect(() => {
    console.log("fetching data.....");
    setIsLoading(true);
    try {
      fetchData();
      console.log("Data fetched successfully");
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return /* @__PURE__ */ jsxs(Card, { className: "w-full", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Monthly Expenses" }),
      /* @__PURE__ */ jsxs(CardDescription, { children: [
        "Your spending for ",
        (/* @__PURE__ */ new Date()).toLocaleString("default", { month: "long" }),
        " ",
        (/* @__PURE__ */ new Date()).getFullYear()
      ] })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center", children: isLoading ? /* @__PURE__ */ jsx("div", { children: "Loading..." }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(ExpenseDonutChart, { data }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 text-2xl font-bold", children: [
        "$",
        totalExpense.toLocaleString()
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 mt-6 w-full", children: sortDataByAmount(data).map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: item.color } }),
        /* @__PURE__ */ jsx("span", { className: "text-sm", children: item.category }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium ml-auto", children: [
          "$",
          item.amount
        ] })
      ] }, `${item.category}-${index}`)) }),
      /* @__PURE__ */ jsx("button", { onClick: fetchData, style: { cursor: "pointer" }, className: "mt-10 bg-black text-white px-4 py-2 rounded hover:bg-gray-100 hover:text-black", children: /* @__PURE__ */ jsx("span", { children: "Update" }) })
    ] }) }) })
  ] });
}

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    console.log("Fetching transaction data...");
    fetch("http://localhost:4000/api/transactions", { method: "GET" }).then((response) => {
      response.json().then((body) => {
        console.log("Transaction data:", body);
        const data = body.data.map((item) => ({
          description: item.description,
          amount: item.amount,
          category: item.category,
          categoryColor: getColorByCategory(item.category),
          date: new Date(item.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          })
        }));
        setTransactions(data);
        console.log("Transactions:", data);
      });
    }).catch(
      (error) => {
        console.error("Error fetching transaction data:", error);
      }
    ).finally(
      () => {
        console.log("Transaction data fetch completed");
      }
    );
  }, []);
  return /* @__PURE__ */ jsxs(Card, { className: "w-full h-full", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Recent Transactions" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Your recent spending activities" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: transactions.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground py-4", children: "No transactions found" }) : transactions.map((transaction, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-10 h-10 rounded-full flex items-center justify-center",
                style: { backgroundColor: `${transaction.categoryColor}20` },
                children: /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: transaction.categoryColor } })
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: transaction.description }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                transaction.category,
                " • ",
                transaction.date
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
            "$",
            transaction.amount.toFixed(2)
          ] })
        ]
      },
      index
    )) }) })
  ] });
}

const Button = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      className: cn(
        "inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      ),
      ...props
    }
  )
);
Button.displayName = "Button";

function NewTransactionForm() {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("form", { className: "mt-4 justify-center lg:grid-cols-4 gap-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-50", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative z-0 lg:col-span-2", children: [
      /* @__PURE__ */ jsx("input", { type: "number", name: "amount", className: "block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer", placeholder: " " }),
      /* @__PURE__ */ jsx("label", { className: "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto", children: "Amount" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 relative z-0 lg:col-span-2", children: [
      /* @__PURE__ */ jsx("input", { type: "text", name: "category", className: "block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer", placeholder: " " }),
      /* @__PURE__ */ jsx("label", { className: "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto", children: "Category" })
    ] }),
    /* @__PURE__ */ jsx(Button, { className: "mt-4", type: "submit", children: "Add Transaction" })
  ] }) });
}

function AddTransactionButton() {
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
      blurDiv.style.zIndex = "998";
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    showform && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[999]",
        children: /* @__PURE__ */ jsx(NewTransactionForm, {})
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleClick,
        className: "fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors",
        "aria-label": "Add transaction",
        children: /* @__PURE__ */ jsx(Plus, { className: "w-6 h-6" })
      }
    )
  ] });
}

const dashboard = withComponentProps(function dashboard() {
  return /* @__PURE__ */jsxs("div", {
    children: [/* @__PURE__ */jsxs("main", {
      className: "container mx-auto p-4 md:p-8",
      children: [/* @__PURE__ */jsx("h1", {
        className: "text-3xl font-bold mb-6",
        children: "Expense Tracker"
      }), /* @__PURE__ */jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-5 gap-6",
        children: [/* @__PURE__ */jsx("div", {
          className: "lg:col-span-2",
          children: /* @__PURE__ */jsx(ExpenseCard, {})
        }), /* @__PURE__ */jsx("div", {
          className: "lg:col-span-3",
          children: /* @__PURE__ */jsx(TransactionList, {})
        })]
      })]
    }), /* @__PURE__ */jsx(AddTransactionButton, {})]
  });
});

const route2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: dashboard
}, Symbol.toStringTag, { value: 'Module' }));

const expenseData = [
  {
    category: "Housing",
    amount: 1200,
    color: "#FF6384"
  },
  {
    category: "Food",
    amount: 450,
    color: "#36A2EB"
  },
  {
    category: "Transportation",
    amount: 500,
    color: "#FFCE56"
  },
  {
    category: "Entertainment",
    amount: 150,
    color: "#4BC0C0"
  },
  {
    category: "Utilities",
    amount: 180,
    color: "#9966FF"
  },
  {
    category: "Healthcare",
    amount: 120,
    color: "#FF9F40"
  }
];

function ExpenseCardTest() {
  const initialState = [];
  const [data, setData] = useState(initialState);
  const [totalExpense, setTotalExpense] = useState(0);
  useEffect(() => {
    console.log("rerendering.....");
    setData(expenseData);
    console.log("Expense data:", expenseData);
    const total = expenseData.reduce((acc, item) => acc + item.amount, 0);
    setTotalExpense(total);
    console.log("Total expense:", total);
  }, []);
  return /* @__PURE__ */ jsxs(Card, { className: "w-full", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Monthly Expenses" }),
      /* @__PURE__ */ jsxs(CardDescription, { children: [
        "Your spending for ",
        (/* @__PURE__ */ new Date()).toLocaleString("default", { month: "long" }),
        " ",
        (/* @__PURE__ */ new Date()).getFullYear()
      ] })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx(ExpenseDonutChart, { data }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 text-2xl font-bold", children: [
        "$",
        totalExpense.toLocaleString()
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 mt-6 w-full", children: data.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: item.color } }),
        /* @__PURE__ */ jsx("span", { className: "text-sm", children: item.category }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium ml-auto", children: [
          "$",
          item.amount
        ] })
      ] }, `${item.category}-${index}`)) }),
      /* @__PURE__ */ jsx("button", { className: "mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800", children: /* @__PURE__ */ jsx("span", { children: "Update" }) })
    ] }) })
  ] });
}

const dashboardTest = withComponentProps(function dashboard() {
  return /* @__PURE__ */jsxs("main", {
    className: "container mx-auto p-4 md:p-8",
    children: [/* @__PURE__ */jsx("h1", {
      className: "text-3xl font-bold mb-6",
      children: "Expense Tracker"
    }), /* @__PURE__ */jsx("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
      children: /* @__PURE__ */jsx(ExpenseCardTest, {})
    })]
  });
});

const route3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: dashboardTest
}, Symbol.toStringTag, { value: 'Module' }));

const serverManifest = {'entry':{'module':'/assets/entry.client-CtDA0URg.js','imports':['/assets/chunk-KNED5TY2-DCK5ySxO.js'],'css':[]},'routes':{'root':{'id':'root','parentId':undefined,'path':'','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':true,'module':'/assets/root-1y5Btmr5.js','imports':['/assets/chunk-KNED5TY2-DCK5ySxO.js','/assets/with-props-C8mF_sJX.js'],'css':['/assets/root-IlihfSrB.css'],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/home':{'id':'routes/home','parentId':'root','path':undefined,'index':true,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/home-DbOm5YsK.js','imports':['/assets/with-props-C8mF_sJX.js','/assets/chunk-KNED5TY2-DCK5ySxO.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/dashboard':{'id':'routes/dashboard','parentId':'root','path':'/dashboard','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/dashboard-HnkN5eto.js','imports':['/assets/with-props-C8mF_sJX.js','/assets/chunk-KNED5TY2-DCK5ySxO.js','/assets/expense-donut-chart-BkiyRFgL.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/dashboard-test':{'id':'routes/dashboard-test','parentId':'root','path':'/test','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/dashboard-test-D1q6EFyA.js','imports':['/assets/with-props-C8mF_sJX.js','/assets/chunk-KNED5TY2-DCK5ySxO.js','/assets/expense-donut-chart-BkiyRFgL.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined}},'url':'/assets/manifest-1fba57f5.js','version':'1fba57f5','sri':undefined};

const assetsBuildDirectory = "build/client";
      const basename = "/";
      const future = {"unstable_middleware":false,"unstable_optimizeDeps":false,"unstable_splitRouteModules":false,"unstable_subResourceIntegrity":false,"unstable_viteEnvironmentApi":false};
      const ssr = true;
      const isSpaMode = false;
      const prerender = [];
      const publicPath = "/";
      const entry = { module: entryServer };
      const routes = {
        "root": {
          id: "root",
          parentId: undefined,
          path: "",
          index: undefined,
          caseSensitive: undefined,
          module: route0
        },
  "routes/home": {
          id: "routes/home",
          parentId: "root",
          path: undefined,
          index: true,
          caseSensitive: undefined,
          module: route1
        },
  "routes/dashboard": {
          id: "routes/dashboard",
          parentId: "root",
          path: "/dashboard",
          index: undefined,
          caseSensitive: undefined,
          module: route2
        },
  "routes/dashboard-test": {
          id: "routes/dashboard-test",
          parentId: "root",
          path: "/test",
          index: undefined,
          caseSensitive: undefined,
          module: route3
        }
      };

export { serverManifest as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routes, ssr };
