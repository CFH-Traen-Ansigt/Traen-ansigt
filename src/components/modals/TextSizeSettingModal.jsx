import { useState, useEffect, useRef } from "react";

export default function TextSizeSettingModal({ isModalOpen, setIsModalOpen }) {
  const modalItem = useRef();
  const [textSize, setTextSize] = useState(16); // default size for the bottom text
  const [initialSize, setInitialSize] = useState(16); // store the initial size to detect changes

  // Load saved value
  useEffect(() => {
    const savedSize = localStorage.getItem("textSize");
    if (savedSize) {
      const size = Number(savedSize);
      setTextSize(size);
      setInitialSize(size);
    }
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handler = (event) => {
      if (!modalItem.current) return;
      if (!modalItem.current.contains(event.target)) {
        handleClose();
      }
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsModalOpen]);

  useEffect(() => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 200);
  }, [setIsModalOpen]);

  // When slider is adjusted
  const handleRangeChange = (e) => {
    const value = Number(e.target.value);
    setTextSize(12 + value * 2); // scale text size nicely
    localStorage.setItem("textSize", 12 + value * 2);
  };

  // Function to save to DB
  const saveTextSizeToDB = async (size) => {
    // Replace with your actual DB update logic, e.g., Supabase or fetch API
    try {
      console.log("Saving to DB:", size);
      // await supabase.from("settings").update({ textSize: size }).eq("userId", userId);
    } catch (error) {
      console.error("Failed to save text size to DB", error);
    }
  };

  // Handle modal close
  const handleClose = () => {
    setIsModalOpen(false);
    // Only save to DB if size changed
    if (textSize !== initialSize) {
      saveTextSizeToDB(textSize);
      setInitialSize(textSize); // update initial size to prevent redundant saves
    }
  };

  return (
    <dialog
      className="fixed mt-[6%] bg-white rounded-xl z-10 w-[800px] h-[60vh]"
      open={isModalOpen}
      ref={modalItem}
    >
      <style>{`
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
        }

        input[type="range"]::-webkit-slider-runnable-track {
          height: 15px;
          background: #d48c97;
          border-radius: 999px;
        }

        input[type="range"]::-moz-range-track {
          height: 15px;
          background: #d48c97;
          border-radius: 999px;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 48px;
          width: 48px;
          background: #8b112d;
          border-radius: 50%;
          cursor: pointer;
          margin-top: -16px;
        }

        input[type="range"]::-moz-range-thumb {
          height: 28px;
          width: 28px;
          background: #8b112d;
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
      <div className="absolute left-1/2 transform -translate-x-1/2 w-full px-10 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto">
            <img
              src="/assets/text-icon-filled.svg"
              alt="Text size icon"
              className="w-12 bg-main-color py-4 px-2"
            />
            <h2 className="text-2xl text-primary font-bold pt-4">
              Tekst Størrelse
            </h2>
          </div>
          <img
            onClick={handleClose}
            src="/assets/x-red.svg"
            alt="red x"
            className="w-10 cursor-pointer"
          />
        </div>
        <div className="flex justify-between mt-16 mb-4 px-20">
          <p className="text-2xl text-black font-bold pt-2">Aa</p>
          <p className="text-5xl text-black font-bold">Aa</p>
        </div>
        <div className="flex justify-center w-full">
          <input
            type="range"
            id="text_size"
            min="0"
            max="10"
            className="w-3/4"
            value={(textSize - 12) / 2}
            onChange={handleRangeChange}
          />
        </div>
        <div className="flex justify-center items-center mt-20 gap-4 bg-gray-100 h-32 rounded-md w-3/4 mx-auto">
          <p
            className="text-font-color font-bold"
            style={{ fontSize: `${textSize}px` }}
          >
            Rediger tekst størrelse
          </p>
        </div>
      </div>
    </dialog>
  );
}
