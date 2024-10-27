import "@styles/globals.css";

import Nav from "@components/Nav/Nav";
import ProviderNext from "@components/Provider";

export const metadata = {
  title: "Avanti shoes bags",
  description: "взуття сумки ужгород кросівки",
};

const RootLayout = ({ children }) => (
  <html lang="ua">
    <body>
      <link rel="icon" href="/assets/favicon.ico" />
      <ProviderNext>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </ProviderNext>
    </body>
  </html>
);

export default RootLayout;
