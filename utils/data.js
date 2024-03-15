export const tabsData = [
  {
    name: "Для жінок",
    link: "/women",
    image: "/assets/images/women.jpg",
    query: "women",
    menu: "Жінки",
  },
  {
    name: "Для чоловіків",
    link: "/men",
    image: "/assets/images/men.jpg",
    query: "men",
    menu: "Чоловіки",
  },
  {
    name: "Для дівчат",
    link: "/girls",
    image: "/assets/images/girls.jpg",
    query: "girls",
    menu: "Дівчата",
  },
  {
    name: "Для хлопчиків",
    link: "/boys",
    image: "/assets/images/boys.jpg",
    query: "boys",
    menu: "Хлопці",
  },
];

export const menuData = {
  Жінки: {
    "Зимове взуття": {
      "Кросівки зимові": "/women/winter-sneakers",
      "Черевики на каблуках": "/women/winter-heels",
      "Черевики на низькому": "/women/winter-boots",
      Угги: "/women/winter-uggs",
      Чоботи: "/women/winter-high",
      Ботфорти: "/women/winter-botforts",
    },
    "Літнє взуття": {
      "Босоніжки  і шльопанці на каблуках": "/women/summer-heels",
      Санділії: "/women/summer-sandals",
      "Шльопанці на низькому": "/women/summer-flats",
      "Пляжне взуття": "/women/summer-beach",
    },
    "Весна-осінь": {
      "Лофери, мокасини, сліпони": "/women/autumn-lofers",
      "Кросівки і кеди": "/women/autumn-sneakers",
      "Туфлі на каблуках": "/women/autumn-heels",
      "Туфлі закриті на шнурках": "/women/autumn-shoes",
    },
    "Демісезонне взуття": {
      "Черевики на каблуках": "/women/demi-heels",
      "Черевики на низькому": "/women/demi-boots",
      Чоботи: "women/demi-high",
    },
  },
  Чоловіки: {
    "Зимове взуття": {
      "Черевики класичні": "/men/winter-classic",
      "Черевики спортивні": "/men/winter-boots",
      Угги: "/men/winter-uggs",
    },
    "Літнє взуття": {
      Санділії: "/men/summer-sandals",
      Шльопанці: "/men/summer-flats",
      "Пляжне взуття": "/men/summer-beach",
    },
    "Весна-осінь": {
      "Лофери, мокасини, сліпони": "/men/autumn-lofers",
      "Кросівки і кеди": "/men/autumn-sneakers",
      "Туфлі класичні": "/men/autumn-shoes",
      "Туфлі комфорт": "/men/autumn-comfort",
    },
    "Демісезонне взуття": {
      "Черевики класичні": "/men/demi-classic",
      "Черевики спортивні": "/men/demi-boots",
    },
  },
  Дівчата: {
    "Зимове взуття": {
      "Черевики класичні": "/girls/winter-classic",
      "Черевики спортивні": "/girls/winter-boots",
      Угги: "/girls/winter-uggs",
    },
    "Літнє взуття": {
      Санділії: "/girls/summer-sandals",
      Шльопанці: "/girls/summer-flats",
      "Пляжне взуття": "/girls/summer-beach",
    },
    "Весна-осінь": {
      "Лофери, мокасини, сліпони": "/girls/autumn-lofers",
      "Кросівки і кеди": "/girls/autumn-sneakers",
      Туфлі: "/girls/autumn-shoes",
    },
    "Демісезонне взуття": {
      "Черевики класичні": "/girls/demi-classic",
      "Черевики спортивні": "/girls/demi-boots",
    },
  },
  Хлопці: {
    "Зимове взуття": {
      Черевики: "/boys/winter-boots",
      Угги: "/boys/winter-uggs",
    },
    "Літнє взуття": {
      Санділії: "/boys/summer-sandals",
      "Пляжне взуття": "/boys/summer-beach",
    },
    "Весна-осінь": {
      "Кросівки і кеди": "/boys/autumn-sneakers",
      Туфлі: "/boys/autumn-shoes",
    },
    "Демісезонне взуття": { Черевики: "/boys/demi-boots" },
  },
};

export const seasons = [
  { link: "winter", name: "Зимове взуття", query: "winter" },
  { link: "summer", name: "Літнє взуття", query: "summer" },
  { link: "autumn", name: "Весна-осінь", query: "autumn" },
  { link: "demi", name: "Демісезонне взуття", query: "demi" },
];

const getNameView = (string) => {
  const array = string.split("-");
  const result = array[array.length - 1];
  return result;
};

const makeUnique = (array) => {
  const newArray = [];
  array.map((item) => {
    if (newArray.find((newItem) => newItem.query === item.query)) return;
    else newArray.push(item);
  });
};

export const views = (season, category) => {
  let data = [];
  const filterByCategory = category
    ? tabsData.find((item) => item.query === category).menu
    : null;
  const filterBySeason = season
    ? seasons.find((item) => item.link === season).name
    : null;
  if (filterByCategory && filterBySeason) {
    const elements = menuData[filterByCategory][filterBySeason];
    for (let i in elements) {
      data.push({
        name: i,
        query: getNameView(menuData[filterByCategory][filterBySeason][i]),
      });
    }
  }
  if (filterByCategory && !filterBySeason) {
    const elementsOfCategory = menuData[filterByCategory];
    for (let i in elementsOfCategory) {
      const elements = menuData[filterByCategory][i];
      for (let j in elements) {
        data.push({
          name: j,
          query: getNameView(menuData[filterByCategory][i][j]),
        });
      }
    }
  }
  if (!filterByCategory && filterBySeason) {
    for (let item in menuData) {
      const elementsOfSeason = menuData[item][filterBySeason];
      for (let i in elementsOfSeason) {
        data.push({
          name: i,
          query: getNameView(menuData[item][filterBySeason][i]),
        });
      }
    }
  }
  if (!filterByCategory && !filterBySeason) {
    for (let item in menuData) {
      const elementsOfCategory = menuData[item];
      for (let i in elementsOfCategory) {
        const elementsOfSeason = menuData[item][i];
        for (let j in elementsOfSeason) {
          data.push({ name: j, query: getNameView(menuData[item][i][j]) });
        }
      }
    }
  }
  return makeUnique(data);
};
