import React from "react";

interface AboutModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AboutModel: React.FC<AboutModal> = ({ isOpen, setIsOpen }) => {
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "modal-container") {
      setIsOpen(false);
    }
  };
  return (
    <div className="">
      {isOpen && (
        <main
          className={"flex items-center align-middle justify-center h-full w-full absolute bg-[#F6F4E8] bg-opacity-40 shadow-2xl z-20 transition-opacity duration-300 ease-in-out"}
          id="modal-container"
          onClick={handleClickOutside}
        >
          <div
            className={"bg-[#FFFBE5] shadow-lg rounded-xl sm:w-[30rem] sm:h-[35rem] sm:px-12 sm:py-8  mx-5 sm:mx-0 py-5 px-4 flex flex-col transform transition-transform duration-300 ease-in-out"}
            onClick={(e) => e.stopPropagation()} 
          >
            <h3 className="text-dark text-2xl font-cooper">
              Step right up to the most thrilling game of chance on the web!
              Welcome to our Spin the Wheel website, where every spin holds the
              promise of exciting prizes and endless fun. Simply give the wheel
              a spin and watch as it whirls with anticipation, landing on your
              prize with a satisfying click.
            </h3>

            <div className="sm:mt-auto mt-5 ml-auto text-2xl font-cooper text-gray">
              <h5>Developed by Arnold</h5>
              <h5>Designed by lekandev</h5>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default AboutModel;
