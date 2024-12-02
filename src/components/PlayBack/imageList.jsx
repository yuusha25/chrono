const ImageList = ({ image, onClick }) => {
    return (
        <div
            className=" cursor-pointer flex flex-col items-center space-y-2 p-2 rounded-lg"
            onClick={onClick}
        >
            <div className="justify-center">
                <div className="flex items-center">
                    <img
                        src={image.url}
                        alt="Thumbnail"
                        className="h-20 w-60 rounded-lg object-cover object-center"
                    />

                </div>
            </div>
        </div>
    );
};

export default ImageList;
