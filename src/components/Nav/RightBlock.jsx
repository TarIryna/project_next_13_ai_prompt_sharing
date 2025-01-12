import * as S from "./styles";
import { useEffect } from "react";
import Link from "next/link";
import LoginButton from "./LoginBtn";
import FavouriteIcon from "@/assets/icons/favourite.svg";
import CartIcon from "@/assets/icons/shopping_cart.svg";
import { getProviders, setProviders } from "next-auth/react";

const RightBlock = () => {
  const onFavourite = () => {};

  return (
    <S.ButtonsWrapper>
      <LoginButton />
      <S.FavouriteImage
        src={FavouriteIcon}
        width="25"
        height="25"
        alt="favourite"
        onClick={onFavourite}
      />
      <Link href="/cart">
        <S.CartImage
          src={CartIcon}
          alt="shopping cart"
          width="25"
          height="25"
        />
      </Link>
    </S.ButtonsWrapper>
  );
};
export default RightBlock;
