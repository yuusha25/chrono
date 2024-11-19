import React, { useState } from "react";

const Profile = () => {
  // State untuk menyimpan data user
  const [userData, setUserData] = useState({
    username: "razky251", // Default value (bisa dari API)
    email: "atuamu44@gmail.com", // Default value (bisa dari API)
    password: "********", // Default value (bisa dari API)
  });

  // Handler untuk update data
  const handleUpdate = (field, value) => {
    // Proses update (bisa kirim ke API)
    console.log(`Update ${field}:`, value);
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  return (
      <div className="max-w-[1034px] mx-auto py-10">
        <h1 className="text-[#365486] text-[39px] font-bold text-center mb-10">Your Profile</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* Gambar dan Form */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-gray-300 w-[178px] h-[171px] flex items-center justify-center">
                178 x 171
              </div>
              <button className="bg-[#1679ab] text-white px-4 py-2 rounded mt-4">Choose File</button>
            </div>
            <div className="flex-1 mt-6 md:mt-0 md:ml-10">
              {/* Username */}
              <div className="mb-6">
                <label className="block text-black text-xl font-bold mb-2">Username</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={userData.username}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, username: e.target.value }))
                    }
                    className="w-full bg-white border border-black p-2 rounded mr-2"
                  />
                  <button
                    className="bg-[#1679ab] text-white px-4 py-2 rounded"
                    onClick={() => handleUpdate("username", userData.username)}
                  >
                    Update
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-black text-xl font-bold mb-2">Email</label>
                <div className="flex items-center">
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full bg-white border border-black p-2 rounded mr-2"
                  />
                  <button
                    className="bg-[#1679ab] text-white px-4 py-2 rounded"
                    onClick={() => handleUpdate("email", userData.email)}
                  >
                    Update
                  </button>
                </div>
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block text-black text-xl font-bold mb-2">Password</label>
                <div className="flex items-center">
                  <input
                    type="password"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, password: e.target.value }))
                    }
                    className="w-full bg-white border border-black p-2 rounded mr-2"
                  />
                  <button
                    className="bg-[#1679ab] text-white px-4 py-2 rounded"
                    onClick={() => handleUpdate("password", userData.password)}
                  >
                    Update
                  </button>
                </div>
              </div>

              <div className="text-black text-xl font-bold">
                Total files upload: <span className="font-normal">30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Profile;
