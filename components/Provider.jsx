"use client";

import { SessionProvider } from "next-auth/react";

const ProviderNext = ({ children, session }) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default ProviderNext;
