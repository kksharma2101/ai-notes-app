"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/hooks/useSupabase";

interface AuthFormProps {
  type: "login" | "signup";
}
export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const isLogin = type === "login";
  const supabaseClient = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        // Handle login error
        console.error("Login failed:", error);
      } else {
        router.push("/notes");
      }
    } else {
      const { error } = await supabaseClient.auth.signUp({ email, password });
      if (error) {
        // Handle signup error
        console.error("Signup failed:", error);
      } else {
        alert("pls!, Verify your email")
        router.push("/notes");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Google sign-in error:", error);
    } else {
      router.push("/notes");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 border rounded-md shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4">
        {isLogin ? "Login" : "Sign Up"}
      </h2>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Password
        </label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        {isLogin ? "Login" : "Sign Up"}
      </Button>
      <div className="mt-4">
        <Button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign In with Google
        </Button>
      </div>
      <p className="mt-4 text-center text-gray-500 text-xs">
        {isLogin ? (
          <>
            Don&apos;t have an account?
            <Link href="/auth/signup" className="text-blue-500">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            Already have an account?
            <Link href="/auth/login" className="text-blue-500">
              Login
            </Link>
          </>
        )}
      </p>
    </form>
  );
};

