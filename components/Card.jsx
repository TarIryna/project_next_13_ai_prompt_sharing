"use client";

import { useState } from "react";
import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { usePathname, useRouter } from "next/navigation";

const Card = ({ item }) => {
  return (
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
            src={item.photo}
            alt="user_image"
            width={280}
            height={280}
            className="rounded-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
