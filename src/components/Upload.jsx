import React, { useState } from "react";

const UploadForm = () => {
  const [fileName, setFileName] = useState("No file chosen");
  const [selectedFile, setSelectedFile] = useState(null);
  const [channel, setChannel] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
    } else {
      setFileName("No file chosen");
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please choose a file to upload.");
      return;
    }

    if (selectedFile.size > 1 * 1024 * 1024 * 1024) {
      // 1GB size limit
      alert("File size exceeds 1GB limit.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("channel", channel);
    formData.append("date", date);
    formData.append("time", time);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message); // Display the server response message
    } catch (error) {
      alert("An error occurred during the upload.");
    }
  };

  return (
    <form
      className="bg-white shadow rounded-lg p-8 mb-8"
      onSubmit={handleSubmit}
    >
      <div className="h-[300px] border-2 border-dashed border-[#365486] rounded-lg p-8 mb-6 bg-[#f0f9ff] text-center flex flex-col justify-center items-center">
        <label htmlFor="image">
          <input
            type="file"
            id="image"
            name="image"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="bg-[#365486] text-white px-4 py-2 rounded-md font-semibold inline-flex items-center hover:bg-[#2a4675]"
            onClick={() => document.getElementById("image").click()}
          >
            <span>Choose File</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </label>

        <p className="mt-2 text-sm text-gray-600">{fileName}</p>
        <p className="mt-2 text-sm text-gray-600">
          Max size file 1GB.
          <a href="./sign-up.html" className="text-[#365486] underline">
            Sign up
          </a>{" "}
          for more
        </p>
        <p className="text-xs text-gray-500 mt-1">
          By proceeding, you agree to our
          <a href="#" className="underline">
            Terms of Use
          </a>
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="channel"
            className="block text-sm font-medium text-gray-700"
          >
            Channel
          </label>
          <input
            type="text"
            id="channel"
            name="channel"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700"
          >
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-[#365486] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#2a4675] transition duration-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UploadForm;
