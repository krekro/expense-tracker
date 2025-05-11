import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { getAPIurl } from "~/services/keys";
import type { User } from "~/services/user";
import Dashboard from "./dashboard";
import { getCookie, setCookie } from "~/services/user";
import { LogIn, ChartPie } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setLogin] = useState(false);

  function handleLogin() {
    let userCredentials: User = {
      user_name: username,
      password: password,
    };

    console.log("Logging in with credentials:", userCredentials);
    fetch(`${getAPIurl("prod")}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((body) => {
            setCookie(body.username, "true", body.session_id);
            console.log(`Username = ${getCookie("username")}`);
            setLogin(true);
            window.location.href = "/dashboard";
          });
        } else {
          console.error("Error during login:");
          alert("Please enter correct username or password");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again later.");
      });
  }

  return (
    <div className="flex justify-center py-50">
      <Card className="flex m-10 justify-center w-100 bg-gray-50 hover:bg-muted/50 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700">
        <CardHeader>
          <CardTitle>
            <div className="inline-flex gap-3 justify-center">
              <span className=" font-extrabold">Expense Tracker</span>
              <ChartPie size={17} />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Username"
            className="mb-4 w-full bg-white"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            className="mb-4 w-full bg-white"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="w-full hover:scale-101 hover:bg-gray-700 hover:cursor-pointer"
            onClick={() => {
              if (!username || !password) {
                alert("Please enter both username and password");
                return;
              }
              handleLogin();
              console.log("Login button clicked");
            }}
          >
            <LogIn size={20} />
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
