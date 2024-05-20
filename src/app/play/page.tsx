"use client";
import { useState } from "react";
import TransitionLink from "../../../components/TransitionLink";
import SpinTheWheel from "../../../components/Wheel";

export default function Index() {
  const [recents, setRecents] = useState<number[]>([]);

  const handleRecent = (prop: number | undefined) => {
    if (prop !== undefined) {
      setRecents((prevArray) => {
        const newData = [...prevArray, prop];
        return newData;
      });
    }
  };

  return (
    <main className="min-h-screen px-24 bg-[#FFA500]">
      <div className="w-[fit-content] flex gap-5 mr-auto pt-[2rem]">
        <TransitionLink
          href="/login"
          label="login"
          className="uppercase bg-[#FFD700] z-[3] px-4 rounded-lg text-[3rem] mt-[auto] font-bold hover:bg-[#FF0000] hover:text-white"
        />
      </div>
      <div className="flex flex-row items-center mt-24 justify-between">
        <div className="max-w-[18rem] bg-[#FF4500] text-white rounded-lg px-5 py-5">
          <h1 style={{ fontFamily: "samurai" }}>
            Step right up to the most thrilling game of chance on the web!
            Welcome to our Spin the Wheel website, where every spin holds the
            promise of exciting prizes and endless fun. Simply give the wheel a
            spin and watch as it whirls with anticipation, landing on your prize
            with a satisfying click.{" "}
          </h1>
        </div>
        <div>
          <SpinTheWheel resData={handleRecent} />
        </div>
        <div className="w-[fit-content] bg-[#FF4500] text-white rounded-lg px-5 py-5">
          <h1
            className="uppercase underline text-[1.2rem]"
            style={{ fontFamily: "wonder" }}
          >
            Recent
          </h1>
          <ul className="" style={{ fontFamily: "samurai" }}>
            {recents.slice(-5)?.map((data: number, index) => (
              <li key={index}>{data} (18s ago)</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
