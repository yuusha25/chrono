import { useState } from "react";

const Playback = () => {
  const [date, setDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");

  const handleDateChange = (e) => setDate(e.target.value);
  const handleTimeStartChange = (e) => setTimeStart(e.target.value);
  const handleTimeEndChange = (e) => setTimeEnd(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika untuk menangani submit form
    console.log("Form submitted with:", { date, timeStart, timeEnd });
  };

  return (
    <div className="bg-[#f8fbff] font-poppins min-h-screen flex flex-col items-center py-8">
      {/* Form input tanggal dan waktu */}
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

      {/* Konten utama */}
      <div className="flex justify-center items-center h-[320px] md:h-[580px] w-[90%] lg:w-[1100px] bg-[#f0faff] rounded-md shadow-md mb-8">
        <div className="text-black text-[32px] font-extrabold font-['Inter']">
          IMG
        </div>
      </div>
      {/* Informasi waktu img */}
      <div className="w-80 h-[67px] bg-[#365486] rounded-[10px] p-3 text-center mb-5">
        <div className="text-white font-bold">YYYY-MM-DD HH:MM:SS</div>
        <div className="text-white font-bold">Channel x</div>
      </div>

      {/* Tombol navigasi */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => console.log("Back button clicked")}
          className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#365486]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() => console.log("Next button clicked")}
          className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#365486]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Playback;
