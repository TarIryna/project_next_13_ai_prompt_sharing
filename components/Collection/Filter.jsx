"use client";
import {
  tabsData,
  views,
  seasons,
  sizes,
  colorsList,
  materialList,
  sortList,
} from "@utils/data";
import { useState } from "react";
import { changeFilterAction } from "@store/actions/products";

const Filter = () => {
  const [season, setSeason] = useState("");
  const [gender, setGender] = useState("");
  const [view, setView] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [sortBy, setSortBy] = useState(null);

  const viewList = views(season, gender);
  const sizesList = sizes();
  const sizesByGender = !gender
    ? sizesList
    : gender === "men"
    ? sizesList.filter((size) => +size > 38)
    : gender === "women"
    ? sizesList.filter((size) => +size > 32 && +size < 44)
    : sizesList.filter((size) => +size < 42);

  const selectSeason = (e) => {
    setSeason(e.target.value);
    setView("");
  };
  const selectGender = (e) => {
    setGender(e.target.value);
    setView("");
  };
  const selectView = (e) => {
    setView(e.target.value);
  };
  const selectSize = (e) => {
    setSize(e.target.value);
  };
  const selectColor = (e) => {
    setColor(e.target.value);
  };
  const selectMaterial = (e) => {
    setMaterial(e.target.value);
  };
  const selectSortBy = (e) => {
    setSortBy(e.target.value);
  };
  const setFilter = () => {
    changeFilterAction({ season, view, size, gender, color, material, sortBy });
  };

  const renderOptions = (array, name) => (
    <select
      id={name}
      className="filter__select"
      onChange={
        name === "season"
          ? selectSeason
          : name === "gender"
          ? selectGender
          : name === "color"
          ? selectColor
          : name === "material"
          ? selectMaterial
          : name === "sortBy"
          ? selectSortBy
          : selectView
      }
    >
      <option value="" key="0">
        {name === "season"
          ? "Сезон"
          : name === "gender"
          ? "Стать"
          : name === "color"
          ? "Колір"
          : name === "material"
          ? "Матеріал верху"
          : name === "sortBy"
          ? "Сортувати за"
          : "Вигляд"}
        :
      </option>
      {array.length > 0 &&
        array.map((item, index) => (
          <option value={item.query} id={item.query} key={item.query}>
            {item.filterName ?? item.name}
          </option>
        ))}
    </select>
  );

  const renderSizes = (sizes) => (
    <select id={size} className="filter__select" onChange={selectSize}>
      <option value="">Розмір:</option>
      {sizes.length > 0 &&
        sizes.map((item) => (
          <option value={item} id={item}>
            {item}
          </option>
        ))}
    </select>
  );

  return (
    <div className="filter__container w-full flex gap-10">
      <div>
        <div style={{ display: "flex", gap: "5px" }}>
          <p>Фільтри: </p>
          {tabsData && renderOptions(tabsData, "gender")}
          {seasons && renderOptions(seasons, "season")}
          {viewList && renderOptions(viewList, "view")}
          {sizesByGender && renderSizes(sizesByGender)}
          {colorsList && renderOptions(colorsList, "color")}
          {materialList && renderOptions(materialList, "material")}
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          {sortList && renderOptions(sortList, "sortBy")}
        </div>
      </div>
      <button onClick={setFilter} className="h-[48px]">
        Шукати
      </button>
    </div>
  );
};

export default Filter;
