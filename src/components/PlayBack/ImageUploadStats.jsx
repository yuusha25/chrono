import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ImageUploadStats = ({ images }) => {
  // Group images by date and count uploads with optional filtering
  const processImageData = () => {
    const uploadCounts = {};

    images.forEach((image) => {
      if (image.date) {
        uploadCounts[image.date] = (uploadCounts[image.date] || 0) + 1;
      }
    });

    // Convert to chart-friendly format
    return Object.keys(uploadCounts)
      .map((date) => ({
        date,
        uploads: uploadCounts[date],
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const processHourlyData = () => {
    const hourlyUploads = {};

    images.forEach((image) => {
      if (image.time) {
        const hour = image.time.split(":")[0];
        hourlyUploads[hour] = (hourlyUploads[hour] || 0) + 1;
      }
    });

    // Convert to chart-friendly format
    return Object.keys(hourlyUploads)
      .map((hour) => ({
        hour: `${hour}:00`,
        uploads: hourlyUploads[hour],
      }))
      .sort((a, b) => parseInt(a.hour) - parseInt(b.hour));
  };

  const dailyData = processImageData();
  const hourlyData = processHourlyData();

  return (
    <div className="w-full py-8 px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Charts Container - Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {/* Daily Uploads Chart */}
        <div className="w-full">
          <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-center">
            Daily Uploads
          </h2>
          <ResponsiveContainer width="100%" height={250} className="max-w-full">
            {dailyData.length > 0 ? (
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ fontSize: "12px" }}
                  labelStyle={{ fontSize: "10px" }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line
                  type="monotone"
                  dataKey="uploads"
                  stroke="#365486"
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            ) : (
              <div className="text-center text-gray-500">No daily data</div>
            )}
          </ResponsiveContainer>
        </div>

        {/* Hourly Uploads Chart */}
        <div className="w-full ">
          <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-center">
            Hourly Uploads
          </h2>
          <ResponsiveContainer width="100%" height={250} className="max-w-full">
            {hourlyData.length > 0 ? (
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="hour"
                  tick={{ fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ fontSize: "12px" }}
                  labelStyle={{ fontSize: "10px" }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line
                  type="monotone"
                  dataKey="uploads"
                  stroke="#2a4675"
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            ) : (
              <div className="text-center text-gray-500">No hourly data</div>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Statistics - Responsive Grid */}
      <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-center">
        <div className="bg-[#e0f5ff] p-2 sm:p-4 rounded-lg">
          <h3 className="font-semibold text-base sm:text-lg">Total Images</h3>
          <p className="text-xl sm:text-2xl text-[#365486]">{images.length}</p>
        </div>
        <div className="bg-[#e0f5ff] p-2 sm:p-4 rounded-lg">
          <h3 className="font-semibold text-base sm:text-lg">
            Most Active Day
          </h3>
          <p className="text-xl sm:text-2xl text-[#365486]">
            {dailyData.length > 0
              ? dailyData.reduce((prev, current) =>
                  prev.uploads > current.uploads ? prev : current
                ).date
              : "N/A"}
          </p>
        </div>
        <div className="bg-[#e0f5ff] p-2 sm:p-4 rounded-lg">
          <h3 className="font-semibold text-base sm:text-lg">
            Most Active Hour
          </h3>
          <p className="text-xl sm:text-2xl text-[#365486]">
            {hourlyData.length > 0
              ? hourlyData.reduce((prev, current) =>
                  prev.uploads > current.uploads ? prev : current
                ).hour
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadStats;
