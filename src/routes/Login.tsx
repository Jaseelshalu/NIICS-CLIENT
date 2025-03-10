import { useEffect, useState } from "react";
import { Button } from "./../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./../components/ui/card";
import { Input } from "./../components/ui/input";
import { Label } from "./../components/ui/label";
import { AlertCircle } from "lucide-react";
import useCredentialStore from "@/store/credentialStore";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Role } from "@/types/types";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let decodedToken: any = null;

  try {
    if (token) {
      decodedToken = jwtDecode(token);
    }
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login page if token is invalid
  }

  useEffect(() => {
    if (decodedToken?.role === "admin") {
      navigate("/admin");
    } else if (decodedToken?.role === "examCenter") {
      navigate("/exam-center");
    }
  }, [decodedToken, navigate]);

  const { authCredential, errorMessage } = useCredentialStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   const credential = await authCredential(username, password);
    if (!credential) {
      return;
    }else{
      if(credential.role === Role.ADMIN){
        navigate("/admin");
      }else if(credential.role === Role.EXAM_CENTER){
        navigate("/exam-center");
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && (
              <div className="flex items-center text-red-600 space-x-2">
                <AlertCircle size={20} />
                <span className="text-sm">{errorMessage}</span>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
