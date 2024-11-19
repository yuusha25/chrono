import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Handle efek scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Ambil username dari localStorage
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        // Hapus username dari localStorage dan perbarui state
        localStorage.removeItem("username");
        setUsername(null);

        // Tutup dropdown dan arahkan ke halaman Home
        setDropdownOpen(false);
        navigate("/");
      } else {
        console.error("Logout gagal");
      }
    } catch (error) {
      console.error("Error saat logout:", error);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 px-5 py-5 lg:px-[65px] flex justify-between items-center transition-all duration-300 font-poppins ${
        isScrolled
          ? "bg-[#e0f5ff96] rounded-lg mt-5 mx-5 lg:mx-10 shadow-md"
          : "bg-[#e0f5ff]"
      }`}
      style={{ zIndex: 10 }}
    >
      <div className="flex items-center space-x-8">
        <img
          src="./src/assets/logo-fix.svg"
          alt="logo"
          className="h-10 lg:h-12 w-auto max-w-[240px]"
        />
      </div>

      {/* Desktop Menu */}
      <nav className="hidden lg:flex items-center space-x-8">
        <Link to="/" className="text-[#365486] font-black hover:text-[]">
          Home
        </Link>
        <Link
          to="/playbacks"
          className="text-[#365486] font-medium hover:text-[]"
        >
          Playback
        </Link>

        <img src="./src/assets/pipe.svg" alt="separator" className="h-6" />

        {username ? (
          <div className="flex">
            <button type="button" onClick={toggleDropdown}>
              <span className="text-[#365486] font-medium flex items-center">
                <img
                  src="src/assets/account.svg"
                  width="16px"
                  className="mr-1"
                  alt="Account Icon"
                />
                {username}
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-7 w-32 bg-[#e0f5ff] border border-gray-200 rounded shadow-lg">
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
                >
                  <Link to="/Profile" className="text-[#365486] font-medium">
                    Profile
                  </Link>
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="px-[18px] py-2 bg-[#365486] rounded-[10px] flex items-center hover:bg-[#2a4675]">
            <Link to="/SignUp" className="text-white font-medium">
              Sign up
            </Link>
          </button>
        )}
      </nav>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <button onClick={toggleMenu} className="text-[#365486]">
          {isMenuOpen ? "Close" : "Menu"}
        </button>

        {isMenuOpen && (
          <div className="absolute top-16 right-5 bg-[#d7f1ff] rounded-lg p-7 flex flex-col space-y-4 lg:hidden shadow-lg">
            <Link to="/" className="text-[#365486] font-black hover:text-[]">
              Home
            </Link>
            <Link
              to="/playbacks"
              className="text-[#365486] font-medium hover:text-[]"
            >
              Playback
            </Link>
            {username ? (
              <span className="text-[#365486] font-medium">{username}</span>
            ) : (
              <button className="px-4 py-2 bg-[#365486] rounded-md mt-2">
                <Link to="/SignUp" className="text-white font-medium">
                  Sign up
                </Link>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
