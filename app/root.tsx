import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { useState } from "react";
import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light")
  return (
    <html className={theme} lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <nav className="fixed z-50 top-0 left-0 right-0 shadow-md bg-accent">
          <div className="p-4 flex-center justify-between">
            <div>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md ${isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`
                }
              >
                Home
              </NavLink>
              <span className="mx-2 text-gray-500">|</span>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md ${isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`
                }
              >
                Dashboard
              </NavLink>
              <span className="mx-2 text-gray-500">|</span>
              <button
                onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
                className={`relative px-4 py-2.5 w-14 h-8 rounded-full focus:outline-none ${theme === "dark" ? "bg-gray-400" : "bg-gray-800"
                  }`}
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${theme === "dark" ? "translate-x-6" : ""
                    }`}
                ></span>
                <span className="sr-only">Toggle Theme</span>
              </button>
            </div>

          </div>
        </nav>
        <div>{children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <main className="mt-16"><Outlet /></main>
    </>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
