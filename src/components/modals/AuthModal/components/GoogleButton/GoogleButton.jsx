import { useEffect, useState } from "react";
import Image from "next/image";
import { signIn, useSession, getProviders } from "next-auth/react";
import GoogleIcon from "@/assets/icons/google.svg";
import { GoogleBtn } from "./styles";

const GoogleButton = () => {
  const onGoogleLogin = async () => {
    const result = await signIn("google");

    if (!result?.error) {
      router.push("/dashboard");
    } else {
      alert("Ошибка: " + result.error);
    }
  };

  return (
    <GoogleBtn onClick={onGoogleLogin}>
      <p>Логін через аккаунт</p>
      <Image src={GoogleIcon} alt="google login" width="100" height="30" />
    </GoogleBtn>
  );
};

export default GoogleButton;
