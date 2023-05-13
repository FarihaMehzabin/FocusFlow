import React from "react";
import { useRouter } from "next/router";
import SignupForm from "../components/SignupForm";

export default function Signup() {
  const router = useRouter();

  function handleSignup() {
    router.push("/login");
  }

  return (
    <div>
      <h1>Signup</h1>
      <SignupForm onSignup={handleSignup} />
    </div>
  );
}
