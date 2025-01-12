import { useEffect, useState } from "react";
import { useUser } from "@/store/selectors";

const CartClientInfo = () => {
  const user = useUser()?.user?.user;
  const userId = user?.id;
  const userName = user?.name;
  const userSurname = user?.surname;
  const userPhone = user?.phone;
  const userViber = user?.isViber;
  const [name, setName] = useState(userName ?? "");
  const [surname, setSurname] = useState(userSurname ?? "");
  const [phone, setPhone] = useState(userPhone ?? "");
  const [isViber, setIsViber] = useState(userViber ?? false);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeSurname = (e) => {
    setSurname(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onChangeViber = (e) => {
    setIsViber(e.target.value);
  };

  const allLinesComplete = name && surname && phone;

  return (
    <div>
      <h3>Заповніть особисті дані:</h3>
      <input
        value={surname}
        onChange={onChangeSurname}
        className="cart_shipping__input"
        placeholder="Прізвище"
        name="surname"
      />
      <input
        value={name}
        onChange={onChangeName}
        className="cart_shipping__input"
        placeholder="Ім'я"
        name="name"
      />
      <label className="cart_shipping__phone_label">
        <input
          value={phone}
          onChange={onChangePhone}
          className="cart_shipping__input phone"
          placeholder="Телефон"
          name="phone"
          type="text"
          id="phone"
          mask="+38(000)000-00-00"
          maxLength={10}
          minLength={10}
        />
        <input value="+38" className="phone_code" type="text" />
      </label>

      <label>
        Якщо хочете, щоб менеджер зв'язався по вайберу, зробіть відмітку
      </label>
      <input
        value={isViber}
        type="checkbox"
        onChange={onChangeViber}
        className="cart_shipping__input"
        name="viber"
      />
    </div>
  );
};
export default CartClientInfo;
