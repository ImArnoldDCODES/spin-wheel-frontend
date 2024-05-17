import React from "react";
import Navbar from "../../../../components/Navbar";

export default function Index() {
  return (
    <main className="flex min-h-screen">
      <Navbar />
      <div className="w-[80%] h-[full]">
        <h1 className="text-[3rem] m-10">Create</h1>
      </div>
    </main>
  );
}
