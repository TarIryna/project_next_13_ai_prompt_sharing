import { useState } from "react";
import { showToast } from "react-next-toast";
import { useUser } from "@store/selectors";

const Sizes = ({ sizes, item }) => {
  const [size, setSize] = useState("");
  const userId = useUser()?.user?.id;

  const onButtonClick = async () => {
    try {
      const response = await fetch("/api/order/new", {
        method: "POST",
        body: JSON.stringify({
          productId: item._id,
          userId,
          size,
          quantity: 1,
          status: "new",
          image: item.image1,
          price: item.price2 ?? item.price,
        }),
      });

      if (response.ok) {
        showToast.success("Товар додано у кошик!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="sizes-container">
        {sizes &&
          sizes.map((el) => (
            <div
              style={{
                border: `${el === size ? "3px solid black" : "1px solid grey"}`,
              }}
              className="size-block pointer"
              onClick={() => setSize(el)}
              key={`${item.code}${el}`}
            >
              {el}
            </div>
          ))}
      </div>
      {size && <button onClick={() => onButtonClick()}>Додати в кошик</button>}
    </div>
  );
};
export default Sizes;
