import { useEffect, useState } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";
import LoginForm from "../../LoginForm/LoginForm";
import GoogleButton from "../GoogleButton/GoogleButton";

const Login = () => {
  return (
    <>
      <LoginForm />
      <GoogleButton />
    </>
  );
};

export default Login;
