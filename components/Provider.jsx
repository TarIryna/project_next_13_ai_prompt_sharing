"use client";
import { SessionProvider } from "next-auth/react";

// ** Store Imports
import { Provider } from "react-redux";
import { store } from "@store";

const ProviderNext = ({ children, session }) => {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </Provider>
  );
};

export default ProviderNext;
