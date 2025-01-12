import { useEffect, useState } from "react";
import Image from "next/image";
import { signIn, useSession, getProviders } from "next-auth/react";
import GoogleIcon from "@/assets/icons/google.svg";
import { GoogleBtn } from "./styles";

const GoogleButton = ({ provider }) => {
  console.log(provider);

  return (
    <GoogleBtn>
      <p>GOOGLE</p>
    </GoogleBtn>
  );
};

export default GoogleButton;
