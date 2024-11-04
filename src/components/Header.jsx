import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 px-5 py-5 lg:px-[65px]  flex justify-between items-center transition-all duration-300 font-poppins ${
        isScrolled
          ? "bg-[#e0f5ff96] rounded-lg mt-5 mx-5 lg:mx-10 shadow-md"
          : "bg-[#e0f5ff]"
      }`}
      style={{ zIndex: 10 }}
    >
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <img
          src="./src/assets/logo-fix.svg"
          alt="logo"
          className="h-10 lg:h-12 w-auto max-w-[240px]"
        />
      </div>

      {/* Hamburger Icon */}
      <div className="lg:hidden">
        <button onClick={toggleMenu}>
          <img src="./src/assets/menu.svg" alt="Menu" className="h-6" />
        </button>
      </div>

      {/* Nav - Hidden on Mobile and Tablet */}
      <nav className={`hidden lg:flex items-center space-x-8`}>
        <Link to="/" className="text-[#365486] font-black hover:text-[]">
          Home
        </Link>
        <Link
          to="/playbacks"
          className="text-[#365486] font-medium hover:text-[]"
        >
          playback
        </Link>

        {/* Separator */}
        <img src="./src/assets/pipe.svg" alt="separator" className="h-6" />

        {/* Sign Up Button */}
        <button className="px-[18px] py-2 bg-[#365486] rounded-[10px] flex items-center hover:bg-[#2a4675]">
          <Link to="/Sign-Up" className="text-white font-medium">
            Sign up
          </Link>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-5 bg-[#d7f1ff] rounded-lg p-7 flex flex-col space-y-4 lg:hidden shadow-lg">
          <Link to="/" className="text-[#365486] font-black hover:text-[]">
            Home
          </Link>
          <Link
            to="/playbacks"
            className="text-[#365486] font-medium hover:text-[]"
          >
            playback
          </Link>
          <button className="px-4 py-2 bg-[#365486] rounded-md mt-2">
            <Link to="/Sign-Up" className="text-white font-medium">
              Sign up
            </Link>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
