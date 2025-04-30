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
import { useState } from "react";
import { oauthSignIn } from "~/services/oauth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    // Perform login logic here
    oauthSignIn();
  }

  return (
    <div className="flex justify-center py-50">
      <Card className="flex m-10 justify-center w-100 bg-gray-50 hover:bg-white transition-colors dark:bg-gray-800 dark:hover:bg-gray-700">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Username"
            className="mb-4 w-full"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            className="mb-4 w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={() => {
              if (!username || !password) {
                alert("Please enter both username and password");
                return;
              }
              handleLogin();
              console.log("Login button clicked");
            }}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
