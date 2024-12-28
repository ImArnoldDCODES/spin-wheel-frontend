"use client";
import NavContent from "@/components/NavContent";
import { AuthContext } from "context/AuthContext";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Image from "next/image";
import axios from "axios";

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

  const handleGoogleSignUp = () => {
    // fetch(
    //   process.env.NODE_ENV === "production"
    //     ? `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`
    //     : "http://localhost:5000/auth/google",
    //   {
    //     method: "GET",
    //     credentials: "include",
    //   }
    // )

    axios
      .get(
        process.env.NODE_ENV === "production"
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google/callback`
          : "http://localhost:5000/auth/google/callback"
      )
      .then((response: { ok: any; json: () => any }) => {
        if (!response.ok) {
          throw new Error("Authentication failed");
        }
        return response.json();
      })
      .then((data: { token: any }) => {
        const token = data.token;
        console.log(token, "make i see");

        // Store the token in localStorage or context
        console.log(token, "lets see");
        sessionStorage.setItem("token", token);

        // Navigate the user to the dashboard
        window.location.href = "/admin/dashboard";
      })
      .catch((err: any) => {
        console.error("Error during authentication:", err);
      });

    // window.location.href =
    //   process.env.NODE_ENV === "production"
    //     ? `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`
    //     : "http://localhost:5000/auth/google";
  };

  return (
    <main className="bg-bgcream h-screen relative flex flex-col">
      <div className="absolute bottom-0 flex justify-between w-full z-[1]">
        <Image
          src={"/pie-1.png"}
          alt="first pie"
          width={200}
          height={200}
          className="rotate-90 hidden sm:block"
        />
        <Image
          src={"/pie-2.png"}
          alt="first pie"
          width={200}
          height={200}
          className="-rotate-90 ml-auto sm:ml-0"
        />
      </div>
      <NavContent />
      <section className="flex flex-col items-center z-[2] px-4">
        <form
          action=""
          className="flex flex-col rounded-xl border-2 border-moondark border-opacity-30 bg-[#E8E5D4] sm:px-10 px-8 py-12 sm:w-fit w-full"
          onSubmit={handleSubmit}
        >
          <input
            type="name"
            name="name"
            id="name"
            placeholder="Name"
            className="outline-none bg-transparent border-b-[1px] border-[#000] border-opacity-25  text-sm h-10 font-medium font-cooper pl-2 text-moondark placeholder:text-[#47474780]"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="outline-none bg-transparent border-b-[1px] border-[#000] border-opacity-25 text-sm h-10 font-medium font-cooper pl-2 text-moondark mt-4 placeholder:text-[#47474780]"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="outline-none bg-transparent border-b-[1px] border-[#000] border-opacity-25 text-sm h-10 font-medium font-cooper pl-2 text-moondark mt-4 placeholder:text-[#47474780]"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Confirm Password"
            className="outline-none bg-transparent border-b-[1px] border-[#000] border-opacity-25 text-sm h-10 font-medium  font-cooper pl-2 text-moondark mt-4 placeholder:text-[#47474780]"
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
            className="bg-[#F6F4E8] text-dark font-cooper w-full mt-10 py-2 px-5 sm:px-16 rounded-full text-lg mx-auto"
            style={{ boxShadow: "inset 0 4px 12px #47474740" }}
            onClick={handleGoogleSignUp}
            disabled={true}
          >
            Sign Up With Google
          </button>
        </form>
        <p className="text-center text-md mt-4 font-cooper w-fit">
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
  );
}
