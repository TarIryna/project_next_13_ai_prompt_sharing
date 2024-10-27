"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { changeProductIdAction } from "@store/actions/product";
import { useRouter } from "next/navigation";
import Sizes from "@components/Product/Sizes";

const Card = ({ item }) => {
  const router = useRouter();
  const code = item.Code;
  const { data: session } = useSession();
  const sizes = item.sizes?.split(" ");
  const userId = session?.id ? session.id : Math.random();
  const isSale = item.price > 0 && item.price2 > 0;

  const handleClick = (id) => {
    changeProductIdAction(id);
    router.push(`product/${id}`);
  };

  return (
    <>
      {item && item.image1 && item.price && (
        <div className="product_card mb-4 flex-column justify-between">
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900 capitalize">
              {item.name}
            </h3>
          </div>
          <div className="flex justify-between items-start gap-5">
            <div className="flex-1 flex justify-center items-center gap-3 cursor-pointer">
              <Image
                src={item.image1}
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
            <div className="flex-center">
              <span className="red-price mr-5">{item.price2} грн.</span>
              <span className="current-price">{item.price} грн.</span>
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
