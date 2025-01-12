import "@/styles/globals.css";

// import dynamic from "next/dynamic";
// import { useParams, useSearchParams } from "next/navigation";
// import { useRouter } from "next/router";
// import { createContext, useEffect, useState } from "react";

import Nav from "@/components/Nav/Nav";
import ProviderNext from "@/components/Provider";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "Avanti shoes bags",
  description: "взуття сумки ужгород кросівки",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="ua">
      <ProviderNext>
        <body>
          <link rel="icon" href="@/assets/favicon.ico" />
          <ProviderNext>
            <div className="main">
              <div className="gradient" />
            </div>

            <main className="app">
              <Nav />
              {children}
              <Footer />
            </main>
          </ProviderNext>
        </body>
      </ProviderNext>
    </html>
  );
};

export default RootLayout;
