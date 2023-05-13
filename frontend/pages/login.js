import React from "react";
import { useRouter } from "next/router";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const router = useRouter();

  function handleLogin() {
    router.push("/");
  }

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}
