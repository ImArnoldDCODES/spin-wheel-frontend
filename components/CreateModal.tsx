import React, { useState, useRef, useEffect } from "react";
import useaxios from "../axios";
import { RxCross2 } from "react-icons/rx";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [copy, setCopy] = useState("Copy link");
  const [toggle, setToggle] = useState(false);
  const [giveawayId, setGiveawayId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await useaxios
        .post("/wheel", { title, items })
        .then(
          (res: { data: { giveawayId: string } }) =>
            setGiveawayId(res.data.giveawayId),
          setToggle(true)
        );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddItem = () => {
    setItems([...items, ""]);
  };

  const handleChangeItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const copytoClipboard = () => {
    navigator.clipboard.writeText(
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/?id=${giveawayId}`
        : `https://roulettee.vercel.app/?id=${giveawayId}`
    );
    setCopy("Copied!");
    setTimeout(() => {
      setCopy("Copy Link");
      setToggle(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-cream p-6 rounded-xl shadow-lg max-w-md w-full"
      >
        <div
          className={
            toggle
              ? "w-full h-full text-center text-2xl font-cooper cursor-pointer"
              : "hidden"
          }
          onClick={copytoClipboard}
        >
          <h1 className="bg-gray w-fit m-auto py-4 px-4 rounded-full">
            {copy}
          </h1>
        </div>
        {!toggle && (
          <section>
            <input
              type="text"
              value={title}
              placeholder="Wheel Name"
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full mt-1 p-2 outline-none rounded-2xl bg-bgcream font-semibold shadow font-cooper"
            />
            <div className="my-4 gap-5 flex flex-col">
              {items.map((item, index) => {
                return (
                  <div className="relative" key={index}>
                    <input
                      type="text"
                      value={item}
                      placeholder="New Item"
                      onChange={(e) => handleChangeItem(index, e.target.value)}
                      className="block w-full mt-1 p-2 outline-none rounded-2xl bg-bgcream font-semibold shadow font-mono"
                    />
                    <div
                      className={
                        index > 0
                          ? `absolute top-4 right-3 cursor-pointer`
                          : "hidden"
                      }
                    >
                      <RxCross2
                        size={16}
                        onClick={() =>
                          setItems(items.filter((_, idx) => idx !== index))
                        }
                      />
                    </div>
                  </div>
                );
              })}
              <button
                onClick={handleAddItem}
                className="font-cooper px-4 py-2 bg-blue-500 text-white rounded-full"
              >
                Add Item
              </button>
              <button
                onClick={handleSubmit}
                className="bg-moondark text-white mt-3 py-2 px-2 rounded-full text-xl font-semibold font-cooper"
                disabled={items.length > 1 ? false : true}
              >
                Create Wheel
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CreateModal;
