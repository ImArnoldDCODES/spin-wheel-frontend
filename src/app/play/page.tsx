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
        console.log(newData, "res");
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
          {/* <Image src={"/Arrow.png"} alt="arrow" width={100} height={100} className="absolute top-[44%] left-[-20%] z-[2]"/>
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
          </h3> */}
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
