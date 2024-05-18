import TransitionLink from "../../../components/TransitionLink";

export default function Index() {
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
        >
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            className="border-b-[1px] border-b-[#000] outline-none"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="border-b-[1px] border-b-[#000] outline-none"
          />

          <TransitionLink
            href="/admin/dashboard"
            label="Sign In"
            className="uppercase bg-[#FFD700] z-[3] px-4 rounded-lg text-[2rem] mt-[auto] font-bold hover:bg-[#FF0000] hover:text-white"
          />
          <p>
            Don't have an account? {""}
            {/* <TransitionLink
              href="/play"
              label="Create Account"
              className="uppercase text-[#FFD700] text-[1rem] hover:text-[#FF0000]"
            /> */}
          </p>
        </form>
      </div>
    </main>
  );
}
