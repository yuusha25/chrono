import React, { useState, useEffect } from "react";

const Profile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: null, // Default untuk memeriksa keberadaan kolom password
  });
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const userId = localStorage.getItem("userId");

  // Fetch user data
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/api/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData({
            username: data.username || "",
            email: data.email || "",
            password: data.password || null, // Periksa keberadaan password
          });
        })
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, [userId]);

  // Handle update username
  const handleUpdateUsername = () => {
    fetch("http://localhost:8080/api/update-username", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        username: newUsername,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update username");
        }
        return res.json();
      })
      .then((updatedUser) => {
        setUserData((prev) => ({ ...prev, username: updatedUser.username }));
        setUsernameMessage("Username updated successfully!");
        setUsernameError("");
        setIsEditingUsername(false);
      })
      .catch((err) => {
        setUsernameError(err.message);
        setUsernameMessage("");
      });
  };

  // Handle update password
  const handleUpdatePassword = () => {
    fetch("http://localhost:8080/api/update-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        currentPassword,
        newPassword,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Current password is incorrect");
          }
          throw new Error("Failed to update password");
        }
        return res.json();
      })
      .then(() => {
        setPasswordMessage("Password updated successfully!");
        setPasswordError("");
        setIsEditingPassword(false);
        setCurrentPassword("");
        setNewPassword("");
      })
      .catch((err) => {
        setPasswordError(err.message);
        setPasswordMessage("");
      });
  };

  return (
    <div className="max-w-[1034px] mx-auto py-10">
      <h1 className="text-[#365486] text-[39px] font-bold text-center mb-10">Your Profile</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* User Info */}
        <div className="mb-6">
          <label className="block text-black text-xl font-bold mb-2">Email</label>
          <div className="text-black text-lg">{userData.email}</div>
        </div>

        {/* Update Username */}
        <div className="mb-6">
          <label className="block text-black text-xl font-bold mb-2">Username</label>
          {isEditingUsername ? (
            <div className="flex items-center">
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full bg-white border border-black p-2 rounded mr-2"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleUpdateUsername}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                onClick={() => setIsEditingUsername(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="text-black text-lg flex items-center">
              <span>{userData.username}</span>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
                onClick={() => {
                  setIsEditingUsername(true);
                  setNewUsername(userData.username);
                }}
              >
                Edit
              </button>
            </div>
          )}
        </div>
        {usernameMessage && <p className="text-green-500">{usernameMessage}</p>}
        {usernameError && <p className="text-red-500">{usernameError}</p>}

        {/* Update Password */}
        {userData.password && ( // Tampilkan hanya jika password ada di database
          <div className="mb-6">
            <label className="block text-black text-xl font-bold mb-2">Change Password</label>
            {isEditingPassword ? (
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border p-2 rounded"
                />
                <div className="flex items-center space-x-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleUpdatePassword}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsEditingPassword(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setIsEditingPassword(true)}
              >
                Change Password
              </button>
            )}
            {passwordMessage && <p className="text-green-500">{passwordMessage}</p>}
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
