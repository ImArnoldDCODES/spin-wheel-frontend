import React from "react";
import TransitionLink from "./TransitionLink";

export default function Navbar() {
  return (
    <main className="flex flex-col w-[20%] h-[full] bg-[#FFA500]">
      <ul className="flex flex-col gap-10 mt-20">
        <li className="bg-[#F5F5DC] py-1 px-2 ml-2 rounded-l cursor-pointer">
          <TransitionLink
            href="/admin/dashboard"
            label="Dashboard"
            className="text-[1rem]"
          />
        </li>
        <li className="bg-[#F5F5DC] py-1 px-2 ml-2 rounded-l cursor-pointer">
          <TransitionLink
            href="/admin/create"
            label="Create"
            className="text-[1rem]"
          />
        </li>
      </ul>
      <h5 className="text-white mt-auto ml-auto mb-[1rem] mr-[1rem] cursor-pointer">
        Logout
      </h5>
    </main>
  );
}
