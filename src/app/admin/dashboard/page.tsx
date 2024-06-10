"use client";
import CreateModal from "components/CreateModal";
import Navbar from "components/Navbar";
import { User, Giveaway } from "interface/interface";
import { useEffect, useState } from "react";
import Table from "@/components/Table";
import useaxios from "../../../../axios";

export default function Index() {
  const [profile, setProfile] = useState<User | null>(null);
  const [giveList, setGivelist] = useState<Giveaway[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const headings = ["name", "date", "number of winners"];

  const sessionToken = sessionStorage.getItem("token");

  useEffect(() => {
    useaxios
      .get("/profile", {
        headers: { Authorization: `Bearer ${sessionToken}` },
      })
      .then((response: { data: { user: User } }) => {
        setProfile(response.data.user);
        setGivelist(response.data.user.giveaways);
      })
      .catch((error: any) => {
        console.error("Error fetching profile", error);
      });
  }, [sessionToken]);

  return (
    <main className="flex h-screen w-screen border-2 border-[#000]">
      <Navbar />
      <div className="w-[80%] h-[full] relative">
        <div className="flex">
          <CreateModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
        <div className="flex items-center justify-between my-5 px-8">
          <h1 className="text-[3rem] text-center">Dashboard</h1>
          <h2 className="text-center">
            Welcome back, <span className="uppercase">{profile?.name}</span>
          </h2>
        </div>
        <div className="ml-10 flex gap-10">
          <div className="rounded-lg pl-4 w-[12rem] h-[8rem] bg-[#F5F5F5] flex flex-col">
            <h1 className="text-[3rem] font-bold">{giveList.length}</h1>
            <p className="text-[1.5rem] ml-2">Wheels</p>
          </div>
          <div
            className="rounded-lg flex w-[12rem] h-[8rem] bg-[#F5F5F5] cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <h1 className="m-auto text-[2rem]">Create</h1>
          </div>
          <div className="rounded-lg w-[12rem] h-[8rem] bg-[#F5F5F5]"></div>
        </div>
        <div className="p-10">
          <h2 className="text-[2rem]">Recents</h2>
          <Table headings={headings} data={giveList} />
        </div>
      </div>
    </main>
  );
}
