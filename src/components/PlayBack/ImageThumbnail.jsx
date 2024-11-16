const ImageThumbnail = ({ image, onClick }) => {
  return (
    <div
      className="bg-white h-auto cursor-pointer flex flex-col items-center justify-center space-y-2 p-2"
      onClick={onClick}
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
  );
};

export default ImageThumbnail;
