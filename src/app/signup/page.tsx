"use client";
import NavContent from "@/components/NavContent";
import { AuthContext } from "context/AuthContext";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Image from "next/image";

export default function Index() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be within an AuthProvider");
  }
  const { register } = authContext;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(name, email, password);
  };

  return (
    <main className="bg-bgcream h-screen relative flex flex-col">
      <div className="absolute bottom-0 flex justify-between w-full z-[1]">
        <Image
          src={"/pie-1.png"}
          alt="first pie"
          width={200}
          height={200}
          className="rotate-90"
        />
        <Image
          src={"/pie-2.png"}
          alt="first pie"
          width={200}
          height={200}
          className="-rotate-90"
        />
      </div>
      <NavContent />
      <section className="flex flex-col items-center z-[2]">
        <form
          action=""
          className="flex flex-col rounded-xl border-2 border-moondark border-opacity-30 bg-[#E8E5D4] p-10"
          onSubmit={handleSubmit}
        >
          <input
            type="name"
            name="name"
            id="name"
            placeholder="Name"
            className="outline-none bg-transparent border-b-[1px] border-[#000] border-opacity-25 w-[20rem] text-sm h-10 font-medium font-cooper pl-2 text-moondark placeholder:text-[#47474780]"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="outline-none bg-transparent border-b-[1px] border-[#000] border-opacity-25 w-[20rem] text-sm h-10 font-medium font-cooper pl-2 text-moondark mt-4 placeholder:text-[#47474780]"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="outline-none bg-transparent border-b-[1px] border-[#000] border-opacity-25 w-[20rem] text-sm h-10 font-medium font-cooper pl-2 text-moondark mt-4 placeholder:text-[#47474780]"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Confirm Password"
            className="outline-none bg-transparent border-b-[1px] border-[#000] border-opacity-25 w-[20rem] text-sm h-10 font-medium  font-cooper pl-2 text-moondark mt-4 placeholder:text-[#47474780]"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="cursor-pointer hover:bg-gray bg-moondark text-white font-cooper w-full mt-10 py-2 px-16 rounded-full text-xl mx-auto"
            onClick={(e) => handleSubmit}
          >
            Sign Up
          </button>

          <div className="mt-5 flex align-middle items-center text-center justify-center gap-2">
            <div className="w-32 h-[2px] bg-gradient-to-r from-[#E8E5D4] from-[5%] via-[#474747] via-[100%] to-[#47474700] to-[100%]"></div>
            <h1
              className="text-[#E8E5D4] font-bold text-2xl font-cooper"
              style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)" }}
            >
              Or
            </h1>
            <div className="w-32 h-[2px] bg-gradient-to-l from-[#E8E5D4] from-[5%] via-[#474747] via-[100%] to-[#47474700] to-[100%]"></div>
          </div>

          <button
            className="cursor-pointer bg-[#F6F4E8] text-dark font-cooper w-full mt-10 py-2 px-16 rounded-full text-lg mx-auto"
            style={{ boxShadow: "inset 0 4px 12px #47474740" }}
            // onClick={(e) => handleSubmit}
          >
            Sign Up With Google
          </button>
        </form>
        <p className="text-center text-md my-5 font-cooper w-fit">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-gray text-sm underline cursor-pointer"
          >
            Sign In
          </Link>
        </p>
      </section>
    </main>
    // <main className="min-h-screen bg-[#FFA500] flex flex-col md:flex-row w-full">
    //   <div className="w-full md:w-[50%] lg:h-screen flex items-center justify-center">
    //     <h1
    //       className="text-[2rem] md:text-[3rem] mt-[10%] p-10 text-center"
    //       style={{ fontFamily: "wonder" }}
    //     >
    //       Play with Friends <br /> and share prizes with people close to you🎉💖
    //     </h1>
    //   </div>
    //   <div className="w-full md:w-[50%] lg:h-screen bg-[#fff] flex flex-col p-10 gap-y-20">
    //     <h1
    //       className="text-[2rem] md:text-[3rem] font-bold mt-[10%] text-center"
    //       style={{ fontFamily: "samurai" }}
    //     >
    //       Create Account
    //     </h1>

    //     <form
    //       onSubmit={handleSubmit}
    //       className="flex flex-col mt-5 gap-10"
    //       style={{ fontFamily: "samurai" }}
    //     >
    //       <input
    //         type="text"
    //         name="FullName"
    //         id="FullName"
    //         placeholder="Full Name"
    //         className="border-b-[1px] border-b-[#000] outline-none"
    //         onChange={(e) => setName(e.target.value)}
    //       />
    //       <input
    //         type="email"
    //         name="email"
    //         id="email"
    //         placeholder="Email Address"
    //         className="border-b-[1px] border-b-[#000] outline-none"
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //       <input
    //         type="password"
    //         name="password"
    //         id="password"
    //         placeholder="Password"
    //         className="border-b-[1px] border-b-[#000] outline-none"
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //       <button
    //         type="submit"
    //         className="uppercase bg-[#FFD700] z-[3] px-4 rounded-lg text-[2rem] mt-[auto] font-bold hover:bg-[#FF0000] hover:text-white"
    //       >
    //         Sign In
    //       </button>
    //       <p className="text-center">
    //         Already have an account? {""}
    //         <TransitionLink
    //           href="/login"
    //           label="Sign In"
    //           className="uppercase text-[#FFD700] text-[1rem] hover:text-[#FF0000]"
    //         />
    //       </p>
    //     </form>
    //   </div>
    // </main>
  );
}
