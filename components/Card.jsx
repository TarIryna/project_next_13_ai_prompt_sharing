"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
// import { usePathname, useRouter } from "next/navigation";

const Card = ({ item }) => {
  const code = item.Code;
  const { data: session } = useSession();
  const sizes = item.sizes[0]?.split(" ");
  const userId = session?.user?.id ? session.user.id : Math.random();
  const isSale = item.price > 0 && item.price2 > 0;

  const onSizeClick = async (size) => {
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
        console.log("ok");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderSizes = (sizes) => (
    <>
      <div className="sizes-container">
        {sizes &&
          sizes.map((size) => (
            <div
              className="size-block pointer"
              onClick={() => onSizeClick(size)}
              key={`${code}${size}`}
            >
              {size}
            </div>
          ))}
      </div>
    </>
  );

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
              />
            </div>
          </div>
          <div>{sizes && renderSizes(sizes)}</div>
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
