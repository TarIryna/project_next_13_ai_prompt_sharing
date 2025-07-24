"use client";

import Image from "next/image";
import { changeProductIdAction } from "@/store/actions/product";
import { useRouter } from "next/navigation";
import Sizes from "../Product/Sizes";
import * as S from "./styles";

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
        <S.CardWrapper>
          <S.Title>{name}</S.Title>
          <S.ImageWrapper>
            <Image
              src={image}
              alt="user_image"
              fill
              onClick={() => handleClick(item._id)}
            />
          </S.ImageWrapper>
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
        </S.CardWrapper>
      )}
    </>
  );
};

export default Card;
