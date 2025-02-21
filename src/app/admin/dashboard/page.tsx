"use client";
import Table from "components/Table";
import { ProfileContext, ProfileProvider } from "context/ProfileContext";
import CreateModal from "components/CreateModal";
import Navbar from "components/Navbar";
import { useContext, useState, useEffect, Key, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NavContent from "@/components/NavContent";
import Image from "next/image";
import { Suspense } from "react";
import { Winner } from "interface/interface";

interface Giveaway {
  _id: string;
  title: string;
  date: Date;
  winners: { _id: string; name: string; prize: string }[];
  items: string[];
}

export default function Index() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [winnerIndex, setWinnderIndex] = useState<number>(0);
  const headings = ["name", "date", "number of winners"];
  const context = useContext(ProfileContext);
  const router = useRouter();

  if (!context) {
    throw new Error("Profile must be within a ProfileProvider");
  }
  const { profile, profileFunction } = context;

  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token")?.trim();

    if (token) {
      sessionStorage.setItem("token", token);
      router.replace("/admin/dashboard");
    } else {
      console.error("No token found in the query params");
    }
  }, [searchParams, router]);

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
  }, [profile, winnerIndex])

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
            <div className="relative h-full w-full">
              <div className="p-10">
                <div className="mt-12 flex">
                  <h1 className="font-semibold font-cooper text-[2.2rem] text-moondark">
                    {res?.title}
                  </h1>
                  <h3
                    className={res ? "text-md font-cooper bg-cream text-moondark w-fit px-3 h-fit mt-5 ml-2 hover:bg-bgcream hover:text-dark rounded-full cursor-pointer" : "hidden"}
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

    // <main className="flex h-screen w-screen flex-col md:flex-row">
    //   <Navbar />
    //   <div className="w-full md:w-[80%] h-full relative">
    //     <div className="flex">
    //       <CreateModal
    //         isOpen={isModalOpen}
    //         onClose={() => setIsModalOpen(false)}
    //       />
    //     </div>
    //     <div className="flex flex-col lg:flex-row justify-between px-4 md:px-8  align-center items-center my-5">
    //       <h1 className="text-[2rem] md:text-[3rem] text-left">Dashboard</h1>
    //       <h2 className="text-center text-[1.5rem] md:text-[2rem] md:text-right">
    //         Welcome back, <span className="uppercase">{profile?.name}</span>
    //       </h2>
    //     </div>
    //     <div className="ml-0 md:ml-10 flex flex-col md:flex-row gap-5 md:gap-10">
    //       <div className="rounded-lg pl-4 w-full md:w-[12rem] h-[8rem] bg-[#F5F5F5] flex flex-col justify-center items-center lg:items-start">
    //         <h1 className="text-[3.5rem] md:text-[3rem] font-bold">
    //           {profile?.giveaways.length ?? 0}
    //         </h1>
    //         <p className="text-[1rem] md:text-[1.5rem] ml-2">Wheels</p>
    //       </div>
    //       <div
    //         className="rounded-lg flex w-full md:w-[12rem] h-[8rem] bg-[#F5F5F5] cursor-pointer items-center justify-center"
    //         onClick={() => setIsModalOpen(true)}
    //       >
    //         <h1 className="m-auto text-[2.5rem] md:text-[2rem]">Create</h1>
    //       </div>
    //     </div>
    //     <div className="p-4 md:p-10">
    //       <h2 className="text-[1.5rem] md:text-[2rem]">Recents</h2>
    //       {profile?.giveaways.length > 0 ? (
    //         <Table headings={headings} data={profile.giveaways} />
    //       ) : (
    //         <div>No giveaways Available</div>
    //       )}
    //     </div>
    //   </div>
    // </main>
  );
}

const items = [
  { name: "Kola", count: 14 },
  { name: "Coffee", count: 22 },
  { name: "Cappuccino Extra Foam", count: 8 },
  { name: "Tea", count: 32 },
  { name: "Green Tea Matcha", count: 17 },
  { name: "Espresso", count: 42 },
  { name: "Mocha", count: 29 },
  { name: "Hot Chocolate with Whipped Cream", count: 11 },
  { name: "Americano", count: 53 },
  { name: "Latte", count: 36 },
  { name: "Chai", count: 19 },
  { name: "Red Bull", count: 24 },
  { name: "Mineral Water", count: 87 },
  { name: "Cascara", count: 5 },
  { name: "Apple Juice Fresh Pressed", count: 12 },
  { name: "Gatorade", count: 31 },
  { name: "Smoothie", count: 27 },
  { name: "Lemonade", count: 44 },
  { name: "Iced Coffee", count: 39 },
  { name: "Protein Shake", count: 18 },
];
