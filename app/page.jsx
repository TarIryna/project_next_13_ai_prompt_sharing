import Collection from "@components/Collection";
import Tabs from "@components/Tabs";
import ProviderNext from "@components/Provider";

const Home = () => (
  <html>
    <body>
      <ProviderNext>
        <section className="w-full flex-center flex-col">
          <Tabs />
          <Collection />
        </section>
      </ProviderNext>
    </body>
  </html>
);

export default Home;
