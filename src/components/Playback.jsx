import React from "react";

const PlaybackSection = () => {
  return (
    <div className="bg-white shadow rounded-lg p-8">
      <h2 className="text-2xl font-bold text-[#365486] mb-4">Playback</h2>
      <div className="flex items-center justify-center space-x-4 mb-6">
        <button className="bg-[#365486] text-white px-6 py-3 rounded-lg font-semibold text-xl hover:bg-[#2a4675] transition duration-300 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <a href="./Playback.html">Playback</a>
        </button>
      </div>
      <div className="p-4 rounded-lg">
        <p className="italic text-[#8a92a6] text-center">
          Click the button above to view images that have been uploaded
          <br />
          and filtered according to the selected time and channel.
        </p>
      </div>
      <div className="mt-6 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Your uploaded content will appear here</p>
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <button className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition duration-300">
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
        <button className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition duration-300">
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

export default PlaybackSection;
