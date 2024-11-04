import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    termsAgreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Form submitted with:", formData);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-10 bg-gray-100 font-poppins">
      <div className="bg-sky-50 rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-semibold text-center">Sign Up</h2>
        <p className="text-gray-400 text-center mt-2 mb-6">
          Create your account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="first-name">
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="last-name">
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-600 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="johndoe@example.com"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-600 mb-1" htmlFor="phone">
              Phone No.
            </label>
            <input
              type="tel"
              id="phone"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="+62 812 3456 7890"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="********"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-600 mb-1"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="********"
                required
              />
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="agree"
              name="termsAgreed"
              checked={formData.termsAgreed}
              onChange={handleChange}
              className="mr-2 border border-gray-300 rounded"
              required
            />
            <label htmlFor="agree" className="text-gray-600 text-sm">
              I agree with the terms of use
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 w-full py-2 bg-[#365486] rounded text-white text-base hover:bg-[#2a4675] focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            Sign up
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400">or sign up with other accounts?</p>
          <Link
            to="#"
            className="mt-4 inline-flex items-center justify-center w-full max-w-[250px] p-3 bg-[#365486] rounded-md text-white text-base font-normal hover:bg-[#2a4675] transition duration-200"
          >
            <img
              src="./src/assets/Gmail.svg"
              alt="Google logo"
              className="w-6 h-6 mr-2"
            />
            Sign up with Google
          </Link>

          <p className="mt-4 text-gray-600">
            Already have an Account?
            <Link to="/signin" className="text-blue-400 ">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:flex justify-center items-center">
        <div className="text-center">
          <img
            src="./src/assets/cctv-logo.svg"
            alt="CCTV"
            className="mx-auto w-56 scale-x-[-1]"
          />
          <h2 className="text-2xl font-semibold mt-6">
            Always monitoring your day
          </h2>
          <p className="text-gray-400 mt-4 text-sm">
            On the shot, you see the main screen with all the rooms, and users
            can control each camera with the help of remote control.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
