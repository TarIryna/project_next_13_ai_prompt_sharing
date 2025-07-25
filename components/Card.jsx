"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useSession } from "next-auth/react";
// import { usePathname, useRouter } from "next/navigation";

const Card = ({ item }) => {
  const code = item.Code;
  const { data: session } = useSession();
  const sizes = item.sizes[0]?.split(" ");

  const onSizeClick = async (size) => {
    try {
      const response = await fetch("/api/order/new", {
        method: "POST",
        body: JSON.stringify({
          productId: item._id,
          userId: session?.user.id,
          size,
          quantity: 1,
          status: "new",
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
              className="size-block"
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
        <div className="product_card mb-4">
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {item.name}
            </h3>
            <p className="font-inter text-sm text-gray-500">{item.price} грн</p>
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
        </div>
      )}
    </>
  );
};

export default Card;
