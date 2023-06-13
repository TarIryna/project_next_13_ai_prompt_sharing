"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import { tabsData } from "@utils/data";

const Tabs = () => {
  return (
    <div className="flex">
      {tabsData &&
        tabsData.map((tab) => (
          <Link
            href={tab.link}
            key={tab.name}
            className="flex-column justify-center items-center"
          >
            <span>{tab.name}</span>
            <Image src={tab.image} alt="category" width={150} height={150} />
          </Link>
        ))}
    </div>
  );
};

export default Tabs;
