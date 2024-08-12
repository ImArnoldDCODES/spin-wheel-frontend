import React, { useState, useRef, useEffect } from "react";
import useaxios from "../axios";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [giveawayId, setGiveawayId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await useaxios
        .post("/wheel", { title, items })
        .then((res: { data: { giveawayId: string } }) =>
          setGiveawayId(res.data.giveawayId)
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-md shadow-lg max-w-md w-full"
      >
        <div className="flex">
          <h2 className="text-xl mb-4 w-[fit-content]">Wheel</h2>
          <button onClick={onClose} className="flex ml-auto text-red-500">
            *Close
          </button>
        </div>
        <label className="block mb-2">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full mt-1 p-2 border outline-none rounded-md"
          />
        </label>
        <div className="mb-4">
          <h3 className="text-lg mb-2">Items:</h3>
          {items.map((item, index) => (
            <input
              key={index}
              type="text"
              value={item}
              onChange={(e) => handleChangeItem(index, e.target.value)}
              className="block w-full mt-1 p-2 border rounded-md mb-2"
            />
          ))}
          <button
            onClick={handleAddItem}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Item
          </button>
          <button onClick={handleSubmit}>Submit</button>
          {giveawayId && (
            <h1>
              Copy URL:{" "}
              {process.env.NODE_ENV === "development"
                ? `http://localhost:3000/play?id=${giveawayId}`
                : `https://spin-wheel-frontend.brimble.app/play?id=${giveawayId}`}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateModal;

