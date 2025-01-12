import { useEffect, useState } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";
import LoginForm from "../../LoginForm/LoginForm";
import GoogleButton from "../GoogleButton/GoogleButton";

const Login = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      if (!!res) setProviders(res);
    })();
  }, []);

  return (
    <>
      <h1>Login Form</h1>
      <>
        <LoginForm provider={providers?.credentials} />
        <GoogleButton provider={providers?.google} />
      </>
    </>
  );
};

export default Login;
