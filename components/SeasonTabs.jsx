"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { seasons } from "@utils/data";

const SeasonTabs = ({ category }) => {
  return (
    <div className="flex">
      {seasons &&
        seasons.map((tab) => (
          <Link
            href={`/${category}/${tab.link}`}
            key={tab.link}
            className="flex-column justify-center items-center season-tabs"
          >
            <span>{tab.name}</span>
          </Link>
        ))}
    </div>
  );
};

export default SeasonTabs;
