"use client";
import { FC } from "react";
import Image from "next/image";

export interface iCardItem {
  src: string;
  color: string;
}

interface iCardProps extends iCardItem {
  i: number;
}

const Card: FC<iCardProps> = ({ src, color }) => {
  return (
    <div
      className="h-screen sticky top-0"
      style={{ backgroundColor: color }}
    >
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

interface iCardsParallaxProps {
  items: iCardItem[];
}

export const CardsParallax: FC<iCardsParallaxProps> = ({ items }) => {
  return (
    <div>
      {items.map((item, i) => (
        <Card key={i} {...item} i={i} />
      ))}
    </div>
  );
};
