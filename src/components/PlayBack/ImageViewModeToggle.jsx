import React from "react";
import list from "../../assets/list.png";
import grid from "../../assets/grid.png";

const ImageViewModeToggle = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="items-start w-full max-w-7xl mb-8 overflow-y-auto mx-auto pl-2">
      <button
        onClick={() => onViewModeChange("list")}
        className={`p-2 rounded-md ${
          viewMode === "list" ? "bg-[#2a4675]" : "bg-[#e0e0e0]"
        }`}
      >
        <img src={list} alt="List View" width="30" />
      </button>
      <button
        onClick={() => onViewModeChange("grid")}
        className={`p-2 rounded-md ${
          viewMode === "grid" ? "bg-[#2a4675]" : "bg-[#e0e0e0]"
        }`}
      >
        <img src={grid} alt="Grid View" width="30" />
      </button>
    </div>
  );
};

export default ImageViewModeToggle;
