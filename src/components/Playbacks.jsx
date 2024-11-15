import { useEffect, useState } from "react";

const Playback = () => {
  const [date, setDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [images, setImages] = useState([]);

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/images/user-images?username=${username}`
        );
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (username) {
      fetchImages();
    }
  }, [username]);

  const handleDateChange = (e) => setDate(e.target.value);
  const handleTimeStartChange = (e) => setTimeStart(e.target.value);
  const handleTimeEndChange = (e) => setTimeEnd(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", { date, timeStart, timeEnd });
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
            onChange={handleDateChange}
            className="rounded-md pl-2 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
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
            onChange={handleTimeStartChange}
            className="rounded-md pl-2 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
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
            onChange={handleTimeEndChange}
            className="rounded-md pl-2 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
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
          {images.map((image, index) => (
            <div
              key={index}
              className="bg-white h-auto cursor-pointer flex flex-col items-center justify-center space-y-2 p-2"
              onClick={() => openModal(image)}
            >
              <img
                src={image.url}
                alt="Thumbnail"
                className="h-full w-full object-cover rounded-md"
              />
              <p className="text-sm text-gray-500">
                {image.date} {image.time}
              </p>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && activeImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-4 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.url}
              alt="Large view"
              className="w-full h-auto rounded-md"
            />
            <p className="mt-4 text-center text-gray-700">
              {activeImage.username}
            </p>
            <p className="text-center text-gray-500 mt-2">
              {activeImage.date} {activeImage.time}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playback;
