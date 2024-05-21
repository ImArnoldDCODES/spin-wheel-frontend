import React, { useState, useRef, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

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
  }, [isOpen]);

  if (!isOpen) return null;

  console.log(title, items);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-md shadow-lg max-w-md w-full"
      >
        <div className="flex">
        <h2 className="text-xl mb-4 w-[fit-content]">Wheel Title</h2>
        <button
          onClick={onClose}
          className="flex ml-auto text-red-500"
        >
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
        </div>
      </div>
    </div>
  );
};

export default CreateModal;