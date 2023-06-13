"use client";

import Collection from "@components/Collection";
import Tabs from "@components/Tabs";

const Category = () => {
  return (
    <section className="w-full flex-center flex-col">
      <Tabs />
      <Collection />
    </section>
  );
};

export default Category;
