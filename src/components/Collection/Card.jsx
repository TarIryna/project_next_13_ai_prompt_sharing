"use client";

import Image from "next/image";
import { changeProductIdAction } from "@/store/actions/product";
import { useRouter } from "next/navigation";
import Sizes from "../Product/Sizes";

const Card = ({ item }) => {
  const router = useRouter();
  const sizes = item.sizes?.split(" ");
  const isSale = item.price > 0 && item.price2 > 0;
  const name = item.name.slice(0, 1).toUpperCase() + item.name.slice(1);
  const image = item.small_iamge ?? item.image1;

  const handleClick = (id) => {
    changeProductIdAction(id);
    router.push(`product/${id}`);
  };

  return (
    <>
      {item && item.image1 && item.price && (
        <div className="product_card mb-4 flex-column justify-between">
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900 capitalize text-center">
              {name}
            </h3>
          </div>
          <div className="flex justify-between items-start gap-5">
            <div className="flex-1 flex justify-center items-center gap-3 cursor-pointer">
              <Image
                src={image}
                alt="user_image"
                width={280}
                height={280}
                className="object-contain card-image"
                onClick={() => handleClick(item._id)}
              />
            </div>
          </div>
          <div>{sizes?.length > 0 && <Sizes sizes={sizes} item={item} />}</div>
          {isSale ? (
            <div className="flex-center gap-2">
              <span className="current-price">{item.price2} грн.</span>
              <span className="red-price mr-5">{item.price} грн.</span>
            </div>
          ) : (
            <div className="flex-center">
              <span className="current-price">{item.price} грн.</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Card;
