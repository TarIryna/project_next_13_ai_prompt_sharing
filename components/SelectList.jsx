import Select from "./Select";
import { tabsData, seasons, views } from "@utils/data";

const SelectList = ({ filter, setFilter }) => {
  const handleChange = (e) => {
    console.log(e.targer);
  };
  const arrayViews = views();

  return (
    <div className="select-list">
      <Select
        name="category"
        array={tabsData}
        active={filter.category}
        title="Для кого"
      />
      <Select
        name="season"
        array={seasons}
        active={filter.season}
        title="Сезон"
      />
      <Select
        name="view"
        array={arrayViews}
        active={filter.view}
        title="Вигляд"
      />
    </div>
  );
};

export default SelectList;
