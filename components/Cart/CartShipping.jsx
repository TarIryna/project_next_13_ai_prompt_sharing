import { useEffect, useState } from "react";
import debounce from "debounce";

const CartShipping = () => {
  const [regions, setRegions] = useState(null);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [value, setValue] = useState("");
  const [city, setCity] = useState(null);
  const [adresses, setAddresses] = useState([]);
  const [adress, setAdress] = useState(null);

  const fetchRegions = async (query) => {
    const response = await fetch(
      `/api/shipping/novaposhta/cities?query=${query}`
    );
    const data = await response?.json();
    if (data) setRegions(data.data);
  };

  const fetchAdress = async (id) => {
    const response = await fetch(`/api/shipping/novaposhta/adress?query=${id}`);
    const data = await response?.json();
    if (data) setAddresses(data.data);
  };

  useEffect(() => {
    fetchRegions(value);
  }, []);

  useEffect(() => {
    fetchRegions(value);
  }, [value]);

  useEffect(() => {
    if (!city) return;
    fetchAdress(city.ref);
  }, [city]);

  const renderOptions = (array, name) => (
    <select
      name="cities"
      id="cities"
      className="cart_shipping__select"
      onChange={name === "city" ? selectCity : selectAdress}
    >
      <option value="">
        {name === "city" ? "Виберіть місто" : "Виберіть відділення"}:
      </option>
      {array.length > 0 &&
        array.map((item) => (
          <option value={item.Description} id={item.Ref}>
            {item.Description}
          </option>
        ))}
    </select>
  );

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const selectCity = (e) => {
    setCity({ name: e.target.children[1].value, ref: e.target.children[1].id });
    console.log(e.target.children[1].id);
  };

  const selectAdress = (e) => {
    setAdress({
      name: e.target.children[1].value,
      ref: e.target.children[1].id,
    });
  };

  return (
    <div>
      <h3>Оберіть способи доставки:</h3>
      <h4>Нова пошта</h4>
      <input
        value={value}
        onChange={onChange}
        className="cart_shipping__input"
      />
      {regions && renderOptions(regions, "city")}
      {adresses?.length > 0 && renderOptions(adresses, "adress")}
    </div>
  );
};
export default CartShipping;
