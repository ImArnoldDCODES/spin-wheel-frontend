"use client";
import TransitionLink from "components/TransitionLink";
import { AuthContext } from "context/AuthContext";
import { useContext, useState } from "react";
import { MdOutlineQuestionMark } from "react-icons/md";

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
    <main className="bg-bgcream h-screen px-12 pt-5 relative flex flex-col">
      <section className="flex items-center justify-between pt-5 h-fit">
        <div className="flex items-center gap-5">
          <div className="cursor-pointer h-14 w-14 rounded-full bg-cream flex justify-center items-center">
            <MdOutlineQuestionMark size={20} />
          </div>
          <div className="cursor-pointer w-fit py-4 px-10 rounded-full bg-cream text-dark font-cooper">
            <TransitionLink href="/admin/dashboard" label="Dashboard" />
          </div>
        </div>
        <div className="cursor-pointer bg-cream text-gray font-cooper w-fit py-4 px-10 rounded-full">
          <h1>Made by Arnold</h1>
        </div>
      </section>
      <section className="flex flex-col items-center mt-20">
        <form action="" className="flex flex-col">
          <label className="font-semibold font-cooper text-lg">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="autofill:bg-black outline-none border-0 bg-white rounded-full w-[20rem] text-sm h-10 pl-2 mt-2 font-medium"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="font-semibold font-cooper text-lg mt-5">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className=" outline-none border-0 bg-white rounded-full w-[20rem] text-sm h-10 pl-2 mt-2 font-medium"
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="text-center text-md my-5 font-cooper w-fit">
            Don&apos;t have an account?{" "}
            <TransitionLink
              href="/signup"
              label="Create Account"
              className="uppercase text-yellow text-sm hover:text-white hover:bg-yellow px-2 py-2 rounded-full"
            />
          </p>
        </form>
        <div className="cursor-pointer bg-yellow text-dark font-cooper w-fit py-3 px-16 rounded-full text-xl">
          <h1>Login</h1>
        </div>
      </section>
    </main>

    // <main className="min-h-screen bg-[#FFA500] flex flex-col md:flex-row w-full">
    //   <div className="w-full md:w-[50%] lg:h-screen flex items-center">
    //     <h1
    //       className="text-[2rem] md:text-[3rem] mt-[10%] p-10 text-center"
    //       style={{ fontFamily: "wonder" }}
    //     >
    //       Play with Friends <br /> and share prizes with people close to you🎉💖
    //     </h1>
    //   </div>
    //   <div className="w-full md:w-[50%] lg:h-screen bg-[#fff] flex flex-col p-10 gap-y-10">
    //     <h1
    //       className="text-[2rem] md:text-[3rem] font-bold mt-[10%] text-center"
    //       style={{ fontFamily: "samurai" }}
    //     >
    //       Sign In
    //     </h1>

    //     <form
    //       action=""
    //       className="flex flex-col mt-5 gap-10"
    //       style={{ fontFamily: "samurai" }}
    //       onSubmit={handleSubmit}
    //     >
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
    //         Don&apos;t have an account? {' '}
    //         <TransitionLink
    //           href="/signup"
    //           label="Create Account"
    //           className="uppercase text-[#FFD700] text-[1rem] hover:text-[#FF0000]"
    //         />
    //       </p>
    //     </form>
    //   </div>
    // </main>
  );
}
