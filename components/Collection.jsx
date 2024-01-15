"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import SeasonTabs from "./SeasonTabs";
import List from "./CardList";
import SelectList from "./SelectList";

import { tabsData } from "@utils/data";

const Collection = () => {
  const path = usePathname();
  const pathArray = path?.split("/");
  const categoryName = pathArray[1];
  const viewPath = pathArray.length > 2 ? pathArray[2]?.split("-") : null;
  const season = viewPath && viewPath?.length > 0 ? viewPath[0] : null;
  const view = viewPath && viewPath?.length > 1 ? viewPath[1] : null;

  const category = tabsData.find((item) => item.query === categoryName);
  const nameCategory = category?.name;

  const [allProducts, setAllProducts] = useState([]);
  // Search states
  const [filter, setFilter] = useState({
    season: null,
    view: null,
    page: 1,
    perPage: 24,
    query: "",
  });

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchProducts = async () => {
    let url = "/api/product/";
    if (category) {
      url = url.concat(`?category=${category?.query}`);
    }
    if (season) url = url.concat(`&season=${season}`);
    if (view) url = url.concat(`&view=${view}`);
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response?.json();
    setAllProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allProducts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterProducts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterProducts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
        <div className="flex-between"></div>
      </form>
      <h1>{nameCategory}</h1>
      {category && category.query && <SeasonTabs category={category.query} />}
      {/* <SelectList filter={filter} setFilter={setFilter} /> */}

      {searchText ? (
        <List data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <List data={allProducts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Collection;
