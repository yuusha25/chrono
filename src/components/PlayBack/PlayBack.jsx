import { useState } from "react";
import { useFetchImages } from "../../hooks/useFetchImages";
import ImageThumbnail from "./ImageThumbnail";
import ImageModal from "./ImageModal";

const Playback = () => {
  const [date, setDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");

  const [filters, setFilters] = useState({}); // Default filter kosong
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const username = localStorage.getItem("username");

  const { images, error } = useFetchImages(username, filters);

  const handleSubmit = (e) => {
    e.preventDefault();

    setFilters({
      date,
      starttime: timeStart,
      endtime: timeEnd,
    });

    console.log("Filters applied:", { date, timeStart, timeEnd });
  };

  const openModal = (image) => {
    setActiveImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveImage(null);
  };

  return (
    <div className="bg-[#f8fbff] font-poppins min-h-screen flex flex-col items-center py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex flex-col px-6 md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8"
      >
        <div className="flex items-center space-x-2">
          <label htmlFor="date" className="text-black mr-3">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-md pl-2 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="timeStart" className="text-black mr-3">
            Time Start
          </label>
          <input
            type="time"
            id="timeStart"
            name="timeStart"
            value={timeStart}
            onChange={(e) => setTimeStart(e.target.value)}
            className="rounded-md pl-2 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="timeEnd" className="text-black mr-3">
            Time End
          </label>
          <input
            type="time"
            id="timeEnd"
            name="timeEnd"
            value={timeEnd}
            onChange={(e) => setTimeEnd(e.target.value)}
            className="rounded-md pl-2 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-[#365486] text-white font-bold rounded-md px-4 py-2 hover:bg-[#2a4675] transition duration-300"
        >
          Submit
        </button>
      </form>

      <div className="h-[320px] md:h-[580px] w-[90%] lg:w-[1100px] bg-[#f0faff] rounded-md shadow-md mb-8 overflow-y-auto">
        <div className="m-4 grid md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-3">
          {error && <p className="text-red-500">Error: {error}</p>}
          {images.map((image, index) => (
            <ImageThumbnail
              key={index}
              image={image}
              onClick={() => openModal(image)}
            />
          ))}
        </div>
      </div>

      {isModalOpen && activeImage && (
        <ImageModal image={activeImage} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Playback;
