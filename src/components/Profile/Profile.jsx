import React, { useState, useEffect } from "react";
import UsernameSection from "./UserUsername";
import EmailSection from "./UserEmail";
import PasswordSection from "./UserPassword";

const Profil = () => {
  // User data state
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: null,
  });

  // Username editing states
  const [usernameState, setUsernameState] = useState({
    isEditing: false,
    newUsername: "",
    message: "",
    error: "",
  });

  // Password editing states
  const [passwordState, setPasswordState] = useState({
    currentPassword: "",
    newPassword: "",
    message: "",
    error: "",
  });

  // Get user ID from local storage
  const userId = localStorage.getItem("userId");

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${userId}`
        );
        const data = await response.json();
        setUserData({
          username: data.username || "",
          email: data.email || "",
          password: data.password || null,
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [userId]);

  // Username update handler
  const handleUpdateUsername = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/update-username",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            username: usernameState.newUsername,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update username");
      }

      const updatedUser = await response.json();
      setUserData((prev) => ({ ...prev, username: updatedUser.username }));
      setUsernameState((prev) => ({
        ...prev,
        message: "Username updated successfully!",
        error: "",
        isEditing: false,
      }));
    } catch (err) {
      setUsernameState((prev) => ({
        ...prev,
        error: err.message,
        message: "",
      }));
    }
  };

  // Password update handler
  const handleUpdatePassword = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/update-password",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            currentPassword: passwordState.currentPassword,
            newPassword: passwordState.newPassword,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Current password is incorrect");
        }
        throw new Error("Failed to update password");
      }

      setPasswordState({
        currentPassword: "",
        newPassword: "",
        message: "Password updated successfully!",
        error: "",
      });
    } catch (err) {
      setPasswordState((prev) => ({
        ...prev,
        error: err.message,
        message: "",
      }));
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const saveChanges = async () => {
    try {
      const response = await fetch(`/api/users/${userData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
        console.error("Error updating user:", response.status);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const formattedPassword = userData.password.replace(/./g, "*");

  return (
    <div className="w-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#365486] font-bold text-center mb-8">
          Your Profile
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8">
          <UsernameSection
            userData={userData}
            usernameState={usernameState}
            setUsernameState={setUsernameState}
            handleUpdateUsername={handleUpdateUsername}
          />

          <EmailSection email={userData.email} />

          <PasswordSection
            passwordState={passwordState}
            setPasswordState={setPasswordState}
            handleUpdatePassword={handleUpdatePassword}
          />
        </div>
      </div>
    </div>
  );
};

export default Profil;
