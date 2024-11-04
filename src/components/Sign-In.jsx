import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-10 bg-gray-100 font-poppins">
      {/* CCTV Info */}
      <div className="hidden md:flex flex-col items-center justify-center text-center">
        <img
          src="./src/assets/cctv-logo.svg"
          alt="CCTV Logo"
          className="w-64 h-64 mb-6"
        />
        <h2 className="text-gray-800 text-2xl font-semibold leading-normal">
          Always monitoring your day
        </h2>
        <p className="text-neutral-400 text-sm font-medium mt-2">
          On the shot, you see the main screen with all the rooms, and users can
          control each camera with the help of remote control.
        </p>
      </div>

      {/* Sign In Form */}
      <div className="w-full max-w-md bg-sky-50 rounded-3xl p-8 shadow-lg mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold">Sign In</h1>
          <p className="text-gray-400">Sign in to stay connected.</p>
        </div>

        {/* Input Form */}
        <form className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-400 text-base">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@example.com"
              className="w-full px-4 py-2 mt-1 bg-white rounded border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-400 text-base">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="w-full px-4 py-2 mt-1 bg-white rounded border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center space-x-2 text-gray-400">
              <input type="checkbox" className="form-checkbox h-4 w-4 shadow" />
              <span>Remember me?</span>
            </label>
            <a href="#" className="text-stone-900 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-[#365486] rounded text-white text-base hover:bg-[#2a4675] transition duration-200"
          >
            Sign in
          </button>
        </form>

        {/* Other Sign-In Options */}
        <div className="text-center mt-6">
          <p className="text-slate-800 mb-4">or sign in with other accounts?</p>

          {/* Sign Up With Google Button */}
          <a
            href="#"
            className="mt-4 inline-flex items-center justify-center w-full max-w-[250px] p-3 bg-[#365486] rounded-md text-white text-base font-normal hover:bg-[#2a4675] transition duration-200"
          >
            <img
              src="./src/assets/Gmail.svg"
              alt="Google logo"
              className="w-6 h-6 mr-2"
            />
            Sign in with Google
          </a>

          <p className="mt-4">
            Don’t have an account?
            <Link to="/signup" className="text-blue-400 hover:underline">
              Click here to sign up.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
