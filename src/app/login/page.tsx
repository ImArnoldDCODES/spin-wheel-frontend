"use client";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import TransitionLink from "../../../components/TransitionLink";

export default function Index() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be within an AuthProvider");
  }

  const { login } = authContext;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <main className="min-h-screen bg-[#FFA500] flex w-full">
      <div className="w-[50%] h-[full]">
        <h1
          className="text-[3rem] mt-[25%] p-10"
          style={{ fontFamily: "wonder" }}
        >
          Play with Friends <br /> and share prizes with people close to you🎉💖
        </h1>
      </div>
      <div className="w-[50%] h-[full] bg-[#fff] flex flex-col p-10">
        <h1
          className="text-[3rem] font-bold mt-[25%]"
          style={{ fontFamily: "samurai" }}
        >
          Sign In
        </h1>

        <form
          action=""
          className="flex flex-col mt-5 gap-10"
          style={{ fontFamily: "samurai" }}
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            className="border-b-[1px] border-b-[#000] outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="border-b-[1px] border-b-[#000] outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="uppercase bg-[#FFD700] z-[3] px-4 rounded-lg text-[2rem] mt-[auto] font-bold hover:bg-[#FF0000] hover:text-white"
          >
            Sign In
          </button>
          <p>
            Don&apos;t have an account? {' '}
            <TransitionLink
              href="/signup"
              label="Create Account"
              className="uppercase text-[#FFD700] text-[1rem] hover:text-[#FF0000]"
            />
          </p>
        </form>
      </div>
    </main>
  );
}
