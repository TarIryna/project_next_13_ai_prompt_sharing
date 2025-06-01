import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useModal } from "@ebay/nice-modal-react/lib/esm";
import { registerDynamicModal } from "@/helpers/useDynamicModal";
import { MODALS, LOGIN } from "@/constants/constants";
import { AuthButton } from "./styles";
import AuthIcon from "@/assets/icons/auth.svg";
import Link from "next/link";

registerDynamicModal(
  MODALS.AUTHORIZATION,
  import("@/components/modals/AuthModal/AuthModal")
);

const LoginButton = () => {
  const { data: session } = useSession();
  const { show: showAuth } = useModal(MODALS.AUTHORIZATION);

  const onAuth = () => {
    showAuth({ mode: LOGIN });
  };

  return (
    <div>
      {session?.user ? (
        <Link href="/profile">
          <AuthButton
            src={session?.user?.image ?? AuthIcon}
            alt="auth button"
            width="25"
            height="25"
            onClick={signOut}
          />
        </Link>
      ) : (
        <>
          <AuthButton
            alt="auth"
            src={AuthIcon}
            width="30"
            height="30"
            onClick={onAuth}
          />
        </>
      )}
    </div>
  );
};
export default LoginButton;
