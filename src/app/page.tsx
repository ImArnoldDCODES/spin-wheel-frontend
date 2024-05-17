import Image from "next/image";
import TransitionLink from "../../components/TransitionLink";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-[#FFA500]">
      <svg viewBox="0 0 500 110" className="z-[1] mt-[-7rem] hidden lg:block">
        <path
          fill="transparent"
          id="curve"
          d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"
        />
        <text width="300" fill="#fff">
          <textPath
            xlinkHref="#curve"
            startOffset="50%"
            textAnchor="middle"
            className="uppercase text-[3rem] font-bold"
            style={{ fontFamily: "wonder" }}
          >
            Spin-The-Wheel
          </textPath>
        </text>
      </svg>
      <svg
        viewBox="0 0 500 200"
        className="z-[1] block lg:hidden w-[22rem] md:w-[40rem]"
      >
        <path
          fill="transparent"
          id="curve"
          d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"
        />
        <text width="300" fill="#fff">
          <textPath
            xlinkHref="#curve"
            startOffset="50%"
            textAnchor="middle"
            className="uppercase text-[4.3rem] font-bold"
            style={{ fontFamily: "wonder" }}
          >
            Spin-The-Wheel
          </textPath>
        </text>
      </svg>
      <Image
        src="/wheel.png"
        alt="wheel"
        width={100}
        height={100}
        unoptimized
        priority
        style={{ maxWidth: "none" }}
        className="h-[30rem] w-[30rem] mt-[-5rem] z-[2] md:w-[30rem] md:h-[30rem] lg:mt-[-8rem]"
      />
      <TransitionLink
        href="/play"
        label="play"
        className="uppercase bg-[#FFD700] z-[3] px-4 rounded-lg text-[3rem] mt-[auto] font-bold hover:bg-[#FF0000] hover:text-white"
      />
      <Image
        src="/leaf-vector.png"
        alt="wheel"
        width={100}
        height={100}
        unoptimized
        className="right-0 top-0 md:w-[20rem] z-[1] absolute"
      />
    </main>
  );
}
