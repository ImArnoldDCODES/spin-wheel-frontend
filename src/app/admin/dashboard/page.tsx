"use client";
import NavContent from "@/components/NavContent";
import TokenHandler from "@/components/searchParam";
import CreateModal from "components/CreateModal";
import { ProfileContext } from "context/ProfileContext";
import { Winner } from "interface/interface";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense, useContext, useEffect, useMemo, useState } from "react";

export default function Index() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [winnerIndex, setWinnderIndex] = useState<number>(0);
  const context = useContext(ProfileContext);
  const router = useRouter();

  if (!context) {
    throw new Error("Profile must be within a ProfileProvider");
  }
  const { profile, profileFunction } = context;

  useEffect(() => {
    profileFunction();

    if (!profile) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 2000);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, router]);

  const handleDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${String(
      date.getFullYear()
    ).slice(-2)}`;

    return formattedDate;
  };

  const res = useMemo(() => {
    return profile?.giveaways[winnerIndex];
  }, [profile, winnerIndex]);

  const [copy, setCopy] = useState("Copy Link");
  const copytoClipboard = () => {
    navigator.clipboard.writeText(
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/?id=${res.giveawayId}`
        : `https://spin-wheel-frontend.brimble.app/?id=${res.giveawayId}`
    );
    setCopy("Copied!");

    setTimeout(() => setCopy("Copy Link"), 2000);
  };

  return (
    <Suspense>
      <TokenHandler />
      <CreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <main className="bg-bgcream h-screen relative">
        <section className="absolute w-full h-full">
          <NavContent />
        </section>
        <section className="w-full h-full flex flex-col lg:flex-row">
          <div className="lg:w-1/2 w-full sm:px-12 px-5 min-h-full">
            <div className="bg-desktopcream mt-24 sm:h-[40%] h-[30%] rounded-2xl relative">
              <Image
                src="/pie-3.png"
                alt="thridpie"
                width={100}
                height={100}
                className="h-full sm:w-[15rem] w-[40%] z-[1] absolute right-0 rounded-2xl"
              />
              <div className="flex flex-col pl-5 py-5 justify-between items-start align-top h-full w-2/3 z-[2] relative">
                <h1 className="font-semibold font-cooper text-[2.2rem] text-moondark">
                  Welcome, {profile?.name.split(" ")}
                </h1>
                <button
                  className="bg-cream rounded-3xl sm:h-12 sm:w-[12rem] h-10 w-[10rem] text-lg sm:text-2xl font-semibold font-cooper text-moondark"
                  onClick={() => setIsModalOpen(true)}
                >
                  Create Wheel
                </button>
              </div>
            </div>
            <div className="sm:h-[40%] h-[55%] mt-4 overflow-y-auto relative custom-scrollbar bg-transparent">
              <ul>
                {profile?.giveaways.map((data: any, index: number) => (
                  <li
                    key={data.winners._id}
                    onClick={() => setWinnderIndex(index)}
                    className="bg-desktopcream hover:bg-cream flex text-center items-center justify-between px-6 sm:h-10 h-14 rounded-md font-cooper cursor-pointer mb-3 w-full"
                  >
                    <h2 className="text-moondark text-start hover:cursor-pointer w-[40%]">
                      {data.title}
                    </h2>
                    <h6 className="text-moondark text-opacity-50 w-[20%]">
                      {handleDate(data.date)}
                    </h6>
                    <h4 className="text-moondark text-opacity-50 w-[20%]">
                      {data.winners?.[0]?.name}
                    </h4>
                    <Image
                      src="/expand.png"
                      alt="expand"
                      width={100}
                      height={100}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <section className="w-1/2 bg-desktopcream">
            <div className="w-full h-[12%]"></div>
            <div className="relative h-[88%] w-full">
              <div className="px-10">
                <div className="flex">
                  <h1 className="font-semibold font-cooper text-[2.2rem] text-moondark">
                    {res?.title}
                  </h1>
                  <h3
                    className={
                      res
                        ? "text-md font-cooper bg-cream text-moondark w-fit px-3 h-fit mt-5 ml-2 hover:bg-bgcream hover:text-dark rounded-full cursor-pointer"
                        : "hidden"
                    }
                    onClick={copytoClipboard}
                  >
                    {copy}
                  </h3>
                </div>
                <section className="mt-5 flex flex-wrap gap-3">
                  {res?.winners.map((data: Winner) => (
                    <div
                      key={data._id}
                      className="w-fit h-fit px-5 rounded-full flex bg-cream font-century space-x-3"
                    >
                      <h4>{data.name}</h4>
                      <p>{data.prize}</p>
                    </div>
                  ))}
                </section>
              </div>
              <Image
                src={"/pie-2.png"}
                alt="left-pie"
                width={200}
                height={100}
                className="absolute bottom-0 left-0"
              />
              <div className="absolute bottom-5 right-10 space-x-3">
                <button
                  className="bg-cream text-xl font-cooper text-moondark py-4 px-8 rounded-full"
                  disabled={winnerIndex <= 0 ? true : false}
                  onClick={(prev) => setWinnderIndex((prev) => prev - 1)}
                >
                  Previous
                </button>
                <button
                  className="bg-cream text-xl font-cooper text-moondark py-4 px-8 rounded-full"
                  onClick={(prev) => setWinnderIndex((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </section>
        </section>
      </main>
    </Suspense>
  );
}
