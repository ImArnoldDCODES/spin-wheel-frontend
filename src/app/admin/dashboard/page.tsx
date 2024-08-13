"use client";
import Table from "components/Table";
import { ProfileContext } from "context/ProfileContext";
import CreateModal from "components/CreateModal";
import Navbar from "components/Navbar";
import { useContext, useState, useEffect } from "react";

export default function Index() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const headings = ["name", "date", "number of winners"];
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("Profile must be within a ProfileProvider");
  }
  const { profile, profileFunction } = context;

  useEffect(() => {
    profileFunction()
  })

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
            <h1 className="text-[3rem] font-bold">
              {profile?.giveaways.length ?? 0}
            </h1>
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
          {profile?.giveaways.length > 0 ? (
            <Table headings={headings} data={profile.giveaways} />
          ) : (
            <div>No giveaways Available</div>
          )}
        </div>
      </div>
    </main>
  );
}
