"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import data from "./data.json";
import { ColorData } from "../../../interface/interface";

export default function Index() {
  const image = useRef<HTMLImageElement>(null);
  const [totalRotation, setTotalRotation] = useState<number>(0);
  const [spinnerChanger, setSpinnerChanger] = useState<string>("red");
  const [running, setRunning] = useState<boolean>(false);
  const [newJson, setNewJson] = useState<ColorData[]>([]);

  const handleClick = () => {
    if (!running) {
      setRunning(true);
      const randomStop = Math.random();
      const rotation = 360 * 5 + 360 * randomStop + totalRotation;
      setTotalRotation(rotation);

      if (image.current) {
        image.current.style.transition = "transform 5s ease-out";
        image.current.style.transform = `rotate(${rotation}deg)`;
      }

      setTimeout(() => {
        setRunning(false);
      }, 2000);
    }
  };

  const handleChange = (color: string) => {
    if (!running) {
      setSpinnerChanger(color);
    }
  };

  useEffect(() => {
    const filteredData = data.filter((res) => res.color === spinnerChanger);
    setNewJson(filteredData);
  }, [spinnerChanger]);

  return (
    <main className="min-h-screen px-24 bg-[#FFA500]">
      <div className="w-[fit-content] flex gap-5 ml-auto pt-[2rem]">
        <Image
          src="/spinner-black.png"
          alt="spinner"
          width={100}
          height={100}
          onClick={() => handleChange("black")}
          className="cursor-pointer"
        />
        <Image
          src="/spinner-red.png"
          alt="spinner"
          width={100}
          height={100}
          onClick={() => handleChange("red")}
          className="cursor-pointer"
        />
        <Image
          src="/spinner-multicolor.png"
          alt="spinner"
          width={100}
          height={100}
          onClick={() => handleChange("multicolor")}
          className="cursor-pointer"
        />
      </div>
      <div className="flex flex-row items-center mt-24 justify-between">
        <div className="max-w-[18rem] bg-[#FF4500] text-white rounded-lg px-5 py-5">
          {newJson?.map((res) => (
            <>
              <h1
                className="uppercase underline text-[1.2rem]"
                style={{ fontFamily: "wonder" }}
              >
                {res.color}
              </h1>
              <h3 style={{ fontFamily: "samurai" }}>{res.text}</h3>
            </>
          ))}
        </div>
        <div className="relative">
          <Image src={"/Arrow.png"} alt="arrow" width={100} height={100} className="absolute top-[44%] left-[-20%] z-[2]"/>
          <Image
            src={`/spinner-${spinnerChanger}.png`}
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
