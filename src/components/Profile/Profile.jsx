import React, { useState, useEffect } from "react";

const Profile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  // Fetch user data when the component mounts
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/api/users/${userId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch user data");
          }
          return res.json();
        })
        .then((data) => {
          setUserData({
            username: data.username || "",
            email: data.email || "",
            password: "", // Don't expose the password
          });
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [userId]);

  // Handle username update
  const handleUpdateUsername = () => {
    if (newUsername !== userData.username) {
      if (userId) {
        fetch(`http://localhost:8080/api/update-username`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, username: newUsername }),
        })
          .then((res) => {
            if (!res.ok) {
              if (res.status === 409) {
                throw new Error("Username is already taken");
              }
              throw new Error("Failed to update username");
            }
            return res.json();
          })
          .then((updatedUser) => {
            setUserData((prev) => ({ ...prev, username: updatedUser.username }));
            setIsEditingUsername(false);
            setMessage("Username updated successfully!");
            setError("");
          })
          .catch((err) => {
            console.error("Error updating username:", err);
            setError(err.message);
            setMessage("");
          });
      }
    }
  };

  return (
    <div className="max-w-[1034px] mx-auto py-10">
      <h1 className="text-[#365486] text-[39px] font-bold text-center mb-10">Your Profile</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 mt-6 md:mt-0 md:ml-10">
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
                    className="bg-[#1679ab] text-white px-4 py-2 rounded"
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
                    className="bg-[#1679ab] text-white px-4 py-2 rounded ml-4"
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

            {/* Email */}
            <div className="mb-6">
              <label className="block text-black text-xl font-bold mb-2">Email</label>
              <div className="text-black text-lg">{userData.email}</div>
            </div>

            {/* Feedback Messages */}
            {message && <p className="text-green-500">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
