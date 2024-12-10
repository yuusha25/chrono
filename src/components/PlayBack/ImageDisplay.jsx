import React from "react";
import ImageThumbnail from "./ImageThumbnail";
import ImageList from "./imageList";

const ImageDisplay = ({ images, error, viewMode, onImageClick }) => {
  return (
    <div className="w-full max-w-7xl bg-[#f0faff] rounded-lg shadow-md mb-8">
      {/* List View */}
      {viewMode === "list" && (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead className="bg-[#365486] text-white sticky top-0 z-10">
              <tr>
                <th className="p-3 text-center border border-gray-300 w-1/3">
                  Image
                </th>
                <th className="p-3 text-center border border-gray-300 w-1/3">
                  Date
                </th>
                <th className="p-3 text-center border border-gray-300 w-1/3">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {images.map((image, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="p-3 border border-gray-300">
                    <ImageList
                      image={image}
                      onClick={() => onImageClick(image)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="p-3 text-center border border-gray-300">
                    {image.date || "N/A"}
                  </td>
                  <td className="p-3 text-center border border-gray-300">
                    {image.time || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="p-4">
          {/* Error and Empty State Handling */}
          {error && (
            <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
              Error: {error}
            </div>
          )}

          {images.length === 0 && !error && (
            <div className="text-center text-gray-500 p-4 bg-gray-50 rounded-lg">
              No images found
            </div>
          )}

          {/* Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex justify-center hover:scale-105 transition-transform duration-300"
              >
                <ImageThumbnail
                  image={image}
                  onClick={() => onImageClick(image)}
                  className="cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
