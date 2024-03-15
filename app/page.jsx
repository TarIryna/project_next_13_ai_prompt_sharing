import Collection from "@components/Collection";
import Tabs from "@components/Tabs";
import ProviderNext from "@components/Provider";

const Home = () => (
  <ProviderNext>
    <section className="w-full flex-center flex-col">
      <Tabs />
      <Collection />
    </section>
  </ProviderNext>
);

export default Home;
