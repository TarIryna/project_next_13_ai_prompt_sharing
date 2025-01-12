"use client";
import { SessionProvider } from "next-auth/react";
import NiceModal from "@ebay/nice-modal-react";
import { createContext, useEffect, useState } from "react";

// ** Store Imports
import { Provider } from "react-redux";
import { store } from "@/store";

export const LastGoogleAccountContext = createContext();

const ProviderNext = ({ children, session }) => {
  const [isCallGoogle, setIsCallGoogle] = useState(false);
  const [lastGoogleAccountEmail, setLastGoogleAccountEmail] = useState(null);

  // useEffect(() => {
  //   if (!!userProfile?.email && isCallGoogle) {
  //     localStorage.setItem(GOOGLE_EMAIL, userProfile.email);
  //     setIsCallGoogle(false);
  //     setTimeout(() => {
  //       setLastGoogleAccountEmail(userProfile.email);
  //     }, 1000);
  //   }
  // }, [isCallGoogle]);

  return (
    <Provider store={store}>
      <LastGoogleAccountContext.Provider
        value={{
          lastGoogleAccountEmail,
          handlerWrite: () => {
            setIsCallGoogle(true);
          },
        }}
      >
        <NiceModal.Provider>
          <SessionProvider session={session}>{children}</SessionProvider>
        </NiceModal.Provider>
      </LastGoogleAccountContext.Provider>
    </Provider>
  );
};

export default ProviderNext;
