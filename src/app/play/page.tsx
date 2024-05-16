"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";

export default function Index() {
  const image = useRef<HTMLImageElement>(null);
  const [totatlRotation, useTotalRotation] = useState(0);

  const handleClick = () => {
    const randomStop = Math.random();
    const rotation = 360 * 5 + 360 * randomStop + totatlRotation;
    useTotalRotation(rotation);
    if (image.current) {
      image.current.style.transition = "transform 5s ease-out";
      image.current.style.transform = `rotate(${rotation}deg)`;
    }
    console.log(image.current?.style);
  };

  return (
    <main className="min-h-screen px-24 bg-[#FFA500]">
      <div className="w-[fit-content] flex gap-5 ml-auto pt-[2rem]">
        <Image
          src="/spinner-black.png"
          alt="spinner"
          width={100}
          height={100}
        />
        <Image src="/spinner-red.png" alt="spinner" width={100} height={100} />
        <Image
          src="/spinner-multicolor.png"
          alt="spinner"
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-row items-center mt-24 justify-between">
        <div className="max-w-[18rem] bg-[#FF4500] text-white rounded-lg px-5 py-5">
          <h1
            className="uppercase underline text-[1.2rem]"
            style={{ fontFamily: "wonder" }}
          >
            Multi-Color
          </h1>
          <h3 style={{ fontFamily: "samurai" }}>
            Spin the Wheel of Colors and let fate decide your palette! Watch as
            hues dance and merge, creating a vibrant symphony of shades. Where
            will the wheel stop? Embrace the unexpected and infuse your world
            with a kaleidoscope of possibilities
          </h3>
        </div>
        <div className="relative">
          <Image
            src="/spinner-multicolor.png"
            alt="spinner"
            width={100}
            height={100}
            className="w-[20rem]"
            ref={image}
          />
          <h3
            className="absolute top-[42%] left-[40%] transform-translate-1/2-1/2 bg-[#FFD700] text-center h-[4rem] w-[4rem] rounded-full uppercase bold cursor-pointer"
            style={{ lineHeight: "4rem", fontFamily: "samurai" }}
            onClick={handleClick}
          >
            spin
          </h3>
        </div>
        <div className="w-[fit-content] bg-[#FF4500] text-white rounded-lg px-5 py-5">
          <h1
            className="uppercase underline text-[1.2rem]"
            style={{ fontFamily: "wonder" }}
          >
            Recent
          </h1>
          <ul className="" style={{ fontFamily: "samurai" }}>
            <li>5 (19s ago)</li>
            <li>3 (14s ago)</li>
            <li>8 (10s ago)</li>
            <li>1 (5s ago)</li>
            <li>9 (2s ago)</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
