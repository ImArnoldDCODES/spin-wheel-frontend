"use client";
import NavContent from "@/components/NavContent";
import SpinTheWheel from "@/components/Wheel";
import TransitionLink from "components/TransitionLink";
import * as React from "react";

export default function Home() {
  const [recents, setRecents] = React.useState<number[]>([]);
  const [modal, setModal] = React.useState<boolean>(false)

  const handleRecent = (prop: number | undefined) => {
    if (prop !== undefined) {
      setRecents((prevArray: number[]) => {
        const newData = [...prevArray, prop];
        return newData;
      });
    }
  };

  return (
    <main className="h-screen relative">
      <main className="bg-[url('/background.jpeg')] bg-center bg-no-repeat bg-cover h-screen flex flex-col">
        <NavContent />
        <section className="h-full flex flex-col w-screen sm:w-[45rem] m-auto items-center">
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
    </main>
  );
}
