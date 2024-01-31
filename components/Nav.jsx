"use client";

import Link from "next/link";
import Image from "next/image";
import Menu from "./Menu";

// import { Dropdown } from "@styles/styles";
import { useEffect, useState, useRef } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [menuDropdown, setMenuDropdown] = useState(false);

  const anchorRef = useRef(null);

  const handleToggle = () => {
    setMenuDropdown((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setMenuDropdown(false);
  };

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex-between w-full mb-2 pt-3">
      <div className="relative menu_button">
        <Image
          src="/assets/icons/menu.svg"
          width={50}
          height={50}
          alt="menu"
          onClick={handleToggle}
          ref={anchorRef}
        />
        <Menu
          open={menuDropdown}
          menuRef={anchorRef.current}
          handleClose={handleClose}
        />
      </div>
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/icons/logo_black.svg"
          alt="logo"
          width={150}
          height={100}
          className="object-contain"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <button type="button" onClick={signOut} className="outline_btn">
              Вийти
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
            <Link href="/cart">
              <Image
                src="/assets/icons/shoppingCart.svg"
                width={37}
                height={37}
                alt="cart"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
            <Link href="/cart">
              <Image
                src="/assets/icons/shoppingCart.svg"
                width={37}
                height={37}
                alt="cart"
              />
            </Link>
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile/orders"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Мої замовлення
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
            <Link href="/cart">
              <Image
                src="/assets/icons/shoppingCart.svg"
                width={37}
                height={37}
                alt="cart"
              />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
