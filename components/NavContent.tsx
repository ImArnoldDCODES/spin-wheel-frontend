import TransitionLink from "components/TransitionLink";
import Link from "next/link";
import React from "react";
import { MdOutlineQuestionMark } from "react-icons/md";
import AboutModel from "./aboutModel";

const NavContent = () => {
  const [modal, setModal] = React.useState<boolean>(false);

  return (
    <>
      <AboutModel setIsOpen={setModal} isOpen={modal} />
      <section className="flex items-center justify-between pt-5 px-10 h-fit z-[2]">
        <div className="flex items-center gap-5">
          <div
            className="cursor-pointer h-14 w-14 rounded-full bg-cream flex justify-center items-center"
            onClick={() => setModal(true)}
          >
            <MdOutlineQuestionMark size={20} />
          </div>
          <TransitionLink
            href="/admin/dashboard"
            label="Dashboard"
            className="cursor-pointer w-fit py-4 px-10 rounded-full bg-cream text-dark font-cooper"
          />
        </div>
        {/* not showing on dashboard */}
        <Link href={"https://github.com/ImArnoldDCODES"}>
          <div className="cursor-pointer bg-cream text-gray font-cooper w-fit py-4 px-10 rounded-full hidden sm:flex z-10">
            <h1>Made by Arnold</h1>
          </div>
        </Link>
      </section>
    </>
  );
};

export default NavContent;
