import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ImageUploadStats = ({ images }) => {
  // Generate 24-hour data points
  const generate24HourData = () => {
    return Array.from({ length: 24 }, (_, hour) => ({
      hour: `${hour.toString().padStart(2, "0")}:00`,
      uploads: 0,
    }));
  };

  // Process images and apply filters
  const processImageData = (images) => {
    // Create base 24-hour data
    const hourlyData = generate24HourData();

    // Filter and count uploads
    images.forEach((image) => {
      if (image.time) {
        const hour = image.time.split(":")[0].padStart(2, "0");
        const hourEntry = hourlyData.find(
          (entry) => entry.hour === `${hour}:00`
        );
        if (hourEntry) {
          hourEntry.uploads++;
        }
      }
    });

    return hourlyData;
  };

  // Determine the day with most uploads (if applicable)
  const findMostActiveDay = (images) => {
    if (images.length === 0) return null;

    // Group images by date and count
    const dateCounts = images.reduce((acc, image) => {
      if (image.date) {
        acc[image.date] = (acc[image.date] || 0) + 1;
      }
      return acc;
    }, {});

    // Find the date with most uploads
    return Object.entries(dateCounts).reduce((a, b) =>
      b[1] > a[1] ? b : a
    )[0];
  };

  // Process data
  const hourlyData = processImageData(images);

  // Find most active day
  const mostActiveDay = findMostActiveDay(images);

  // Calculate total uploads and max uploads
  const totalUploads = hourlyData.reduce(
    (sum, entry) => sum + entry.uploads,
    0
  );
  const maxUploads = Math.max(...hourlyData.map((entry) => entry.uploads));

  return (
    <div className="w-full py-8 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="w-full p-2">
        <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-center">
          Hourly Uploads {mostActiveDay ? `on ${mostActiveDay}` : ""}
        </h2>
        <ResponsiveContainer width="100%" height={300} className="max-w-full ">
          {images.length > 0 ? (
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 10 }}
                interval="preserveStartEnd"
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 10 }}
                label={{
                  value: "Uploads",
                  angle: -90,
                  position: "outsideLeft",
                }}
              />
              <Tooltip
                contentStyle={{ fontSize: "12px" }}
                labelStyle={{ fontSize: "10px" }}
              />
              <Line
                type="monotone"
                dataKey="uploads"
                stroke="#365486"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          ) : (
            <div className="text-center text-gray-500">
              No upload data available
            </div>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-center mb-6">
        <div className="bg-[#e0f5ff] p-2 sm:p-4 rounded-lg">
          <h3 className="font-semibold text-base sm:text-lg">Total Images</h3>
          <p className="text-xl sm:text-2xl text-[#365486]">{images.length}</p>
        </div>
        <div className="bg-[#e0f5ff] p-2 sm:p-4 rounded-lg">
          <h3 className="font-semibold text-base sm:text-lg">
            Most Active Day
          </h3>
          <p className="text-xl sm:text-2xl text-[#365486]">
            {mostActiveDay || "N/A"}
          </p>
        </div>
        <div className="bg-[#e0f5ff] p-2 sm:p-4 rounded-lg">
          <h3 className="font-semibold text-base sm:text-lg">
            Peak Hour Uploads
          </h3>
          <p className="text-xl sm:text-2xl text-[#365486]">{maxUploads}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadStats;
