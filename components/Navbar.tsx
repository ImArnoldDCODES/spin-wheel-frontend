import React from "react";
import TransitionLink from "./TransitionLink";

export default function Navbar() {
  return (
    <main className="flex flex-col h-[full] w-[20%] bg-[#FFA500]" 
    >
      <div className="py-5 flex flex-col gap-5 align-center justify-center h-full w-full relative">
        <TransitionLink
          href="/admin/dashboard"
          label="Dashboard"
          className="w-[80%] bg-[#fff] text-[1rem] hover:text-[#FF0000]"
        />
        <TransitionLink
          href="/admin/create"
          label="Creare"
          className="w-[80%] bg-[#fff] text-[1rem] hover:text-[#FF0000]"
        />

      </div>
    </main>
  );
}
