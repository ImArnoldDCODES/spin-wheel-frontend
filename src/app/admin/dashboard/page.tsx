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
    <main className="flex h-screen w-screen flex-col md:flex-row">
      <Navbar />
      <div className="w-full md:w-[80%] h-full relative">
        <div className="flex">
          <CreateModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-between px-4 md:px-8  align-center items-center my-5">
          <h1 className="text-[2rem] md:text-[3rem] text-left">Dashboard</h1>
          <h2 className="text-center text-[1.5rem] md:text-[2rem] md:text-right">
            Welcome back, <span className="uppercase">{profile?.name}</span>
          </h2>
        </div>
        <div className="ml-0 md:ml-10 flex flex-col md:flex-row gap-5 md:gap-10">
          <div className="rounded-lg pl-4 w-full md:w-[12rem] h-[8rem] bg-[#F5F5F5] flex flex-col justify-center items-center lg:items-start">
            <h1 className="text-[3.5rem] md:text-[3rem] font-bold">
              {profile?.giveaways.length ?? 0}
            </h1>
            <p className="text-[1rem] md:text-[1.5rem] ml-2">Wheels</p>
          </div>
          <div
            className="rounded-lg flex w-full md:w-[12rem] h-[8rem] bg-[#F5F5F5] cursor-pointer items-center justify-center"
            onClick={() => setIsModalOpen(true)}
          >
            <h1 className="m-auto text-[2.5rem] md:text-[2rem]">Create</h1>
          </div>
        </div>
        <div className="p-4 md:p-10">
          <h2 className="text-[1.5rem] md:text-[2rem]">Recents</h2>
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
