import React, { useState, useEffect } from "react";

const Profile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [editFields, setEditFields] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/users/me");
        if (response.ok) {
          const user = await response.json();
          setUserData(user);
          setEditFields({
            username: user.username,
            password: user.password,
          });
        } else {
          console.error("Error fetching user data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Fungsi untuk menangani upload gambar
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openEditModal = () => {
    setEditFields({
      username: userData.username,
      password: userData.password,
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const saveChanges = async () => {
    try {
      const response = await fetch(`/api/users/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: editFields.username,
          password: editFields.password,
        }),
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser.user);
        closeEditModal();
        setIsUpdated(true);
        setTimeout(() => {
          setIsUpdated(false);
        }, 3000);
      } else {
        console.error('Error updating user:', response.status);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const formattedPassword = userData.password.replace(/./g, "*");

  return (
    <div className="max-w-[1034px] mx-auto py-10">
      <h1 className="text-[#365486] text-[39px] font-bold text-center mb-10">
        Your Profile
      </h1>

      {/* Konten Utama */}
      <div className="bg-white shadow-lg rounded-lg p-6 relative">
        <div className="flex flex-col md:flex-row items-center">
          {/* Gambar Profil */}
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-gray-300 w-[178px] h-[171px] flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                "178 x 171"
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="bg-[#1679ab] text-white px-4 py-2 rounded mt-4 cursor-pointer"
            >
              Choose File
            </label>
          </div>

          {/* Informasi Profil */}
          <div className="flex-1 mt-6 md:mt-0 md:ml-10">
            <div className="mb-6">
              <label className="block text-black text-xl font-bold mb-2">
                Username
              </label>
              <span>{userData.username}</span>
            </div>

            <div className="mb-6">
              <label className="block text-black text-xl font-bold mb-2">
                Email
              </label>
              <span>{userData.email}</span>
            </div>

            <div className="mb-6">
              <label className="block text-black text-xl font-bold mb-2">
                Password
              </label>
              <span>{formattedPassword}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Edit di luar konten utama */}
      <div className="text-right mt-4">
        <button
          className="bg-[#1679ab] text-white px-6 py-2 rounded"
          onClick={openEditModal}
        >
          Edit
        </button>
      </div>

      {/* Modal Popup */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[400px]">
            <h2 className="text-[#365486] text-[24px] font-bold mb-4">
              Edit Profile
            </h2>

            <div className="mb-4">
              <label className="block text-black text-lg font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                value={editFields.username}
                onChange={(e) =>
                  setEditFields((prev) => ({ ...prev, username: e.target.value }))
                }
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-black text-lg font-bold mb-2">
                Password
              </label>
              <div className="flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  value={editFields.password}
                  onChange={(e) =>
                    setEditFields((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <button
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="ml-2 bg-gray-300 px-3 py-2 rounded"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={closeEditModal}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="bg-[#1679ab] text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up Konfirmasi */}
      {isUpdated && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded shadow-lg">
          Data has been updated successfully!
        </div>
      )}
    </div>
  );
};

export default Profile;