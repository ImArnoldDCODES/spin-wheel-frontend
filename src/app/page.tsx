"use client";
import TransitionLink from "components/TransitionLink";
import Image from "next/image";
import * as React from "react";
import { MdOutlineQuestionMark } from "react-icons/md";
import SpinTheWheel from "@/components/Wheel";

export default function Home() {
  const [recents, setRecents] = React.useState<number[]>([]);

  const handleRecent = (prop: number | undefined) => {
    if (prop !== undefined) {
      setRecents((prevArray: number[]) => {
        const newData = [...prevArray, prop];
        return newData;
      });
    }
  };

  return (
    <main className="bg-bgcream h-screen px-12 relative flex flex-col border-2 border-[#000]">
      <section className="flex items-center justify-between pt-5 h-fit">
        <div className="flex items-center gap-5">
          <div className="cursor-pointer h-14 w-14 rounded-full bg-cream flex justify-center items-center">
            <MdOutlineQuestionMark size={20} />
          </div>
          <div className="cursor-pointer w-fit py-4 px-10 rounded-full bg-cream text-dark font-cooper">
            <TransitionLink href="/admin/dashboard" label="Dashboard" />
          </div>
        </div>
        <div className="cursor-pointer bg-cream text-gray font-cooper w-fit py-4 px-10 rounded-full">
          <h1>Made by Arnold</h1>
        </div>
      </section>
      <section className="h-full flex flex-col w-[45rem] m-auto items-center">
        <div className="h-fit w-fit mx-auto">
          <SpinTheWheel resData={handleRecent} />
        </div>
        <div className="text-dark flex gap-5 items-center mt-8">
          <button className="cursor-pointer w-fit py-4 px-10 rounded-full bg-cream font-cooper">
            <TransitionLink href="/login" label="Login" />
          </button>
          <button className="cursor-pointer w-fit py-4 px-10 rounded-full bg-yellow font-cooper">
            Recent
          </button>
        </div>
      </section>
    </main>
  );
}
