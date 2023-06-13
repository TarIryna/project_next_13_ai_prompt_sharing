"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import Card from "./Card";

import { tabsData } from "@utils/data";

const List = ({ data }) => {
  return (
    <div className="cards-list">
      {data && data.map((item) => <Card item={item} key={item.code} />)}
    </div>
  );
};

const Collection = () => {
  const path = usePathname();
  const category = tabsData.find((item) => item.link === path);
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
    if (filter.season) url = url.concat(`&season=${filter.season}`);
    const response = await fetch(url);
    const data = await response.json();
    setAllProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // useEffect(() => {
  //   fetchProducts();
  // }, [path, filter]);

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
      {/* All Prompts */}
      {searchText ? (
        <List data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <List data={allProducts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Collection;
