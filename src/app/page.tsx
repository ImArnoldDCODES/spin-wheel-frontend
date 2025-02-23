"use client";
import NavContent from "@/components/NavContent";
import SpinTheWheel from "@/components/Wheel";
import Link from "next/link";
import * as React from "react";

export default function Home() {
  const [recents, setRecents] = React.useState<number[]>([]);
  const [modal, setModal] = React.useState<boolean>(false);

  const handleRecent = (prop: number | undefined) => {
    if (prop !== undefined) {
      setRecents((prevArray: number[]) => {
        const newData = [prop, ...prevArray];
        return newData;
      });
    }
  };

  return (
    <React.Suspense>
      <main className="h-screen relative">
        <main className="bg-[url('/background.jpeg')] bg-center bg-no-repeat bg-cover h-screen flex flex-col">
          <NavContent />
          <section className="h-full flex flex-col w-screen sm:w-[45rem] m-auto items-center">
            <div className="h-fit w-fit mx-auto">
              <SpinTheWheel resData={handleRecent} />
            </div>
            <div className="text-dark flex gap-5 items-center mt-8">
              <Link href={"/login"}>
                <button className="cursor-pointer w-fit py-4 px-10 rounded-full bg-cream font-cooper">
                  Login
                </button>
              </Link>
              <button
                className="cursor-pointer w-fit py-4 px-10 rounded-full bg-yellow font-cooper"
                onClick={() => setModal(!modal)}
              >
                Recent
              </button>
            </div>
          </section>
          {modal && (
            <div className="w-80 h-80 bg-gray-50 rounded-tl-xl shadow-xl absolute bottom-0 right-0 p-4">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 font-cooper">
                Recent
              </h2>
              <div className="overflow-y-auto h-[calc(100%-4rem)]">
                <ul className="space-y-2">
                  {recents.map((number, index) => (
                    <li
                      key={index}
                      className="p-3 bg-white rounded-lg shadow-sm text-gray-700 font-cooper"
                    >
                      {number}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </main>
      </main>
    </React.Suspense>
  );
}
