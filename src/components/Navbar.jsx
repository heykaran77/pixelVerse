import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import timmyGif from "../assets/NPCs/timmy.gif";
import cornwellGif from "../assets/NPCs/cornwell.gif";
import fatChickenGif from "../assets/NPCs/fat_chicken.gif";
import logoGif from "../assets/Pixel Verse logo.gif";
import { useAuth } from "../context/AuthContext";

const npcs = [timmyGif, cornwellGif, fatChickenGif];

const PeekingButton = ({ to, children, variant = "text", className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [randomNpc] = useState(
    () => npcs[Math.floor(Math.random() * npcs.length)]
  );

  const baseStyles = {
    text: "font-medium text-light-text dark:text-dark-text hover:text-light-pink dark:hover:text-dark-pink transition-colors",
    filled: "pixel-borders pixel-borders-primary px-6 py-2",
  };

  const Component = to ? Link : "button";
  const componentProps = to ? { to } : {};

  return (
    <div className="relative group">
      <img
        src={randomNpc}
        alt="Peeking NPC"
        className={`
          hidden md:block
          absolute left-1/2 -translate-x-1/2 w-6 h-6 image-pixelated z-0
          transition-all duration-300 ease-out
          ${
            isHovered
              ? "-top-6 opacity-100 scale-100"
              : "top-1/2 opacity-0 scale-50"
          }
        `}
      />
      <Component
        {...componentProps}
        className={`relative z-10 ${baseStyles[variant]} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </Component>
    </div>
  );
};

const NavLink = ({ to, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const randomNpc = npcs[Math.floor(Math.random() * npcs.length)];

  return (
    <div className="relative group">
      <Link
        to={to}
        className="font-medium text-light-text dark:text-dark-text hover:text-light-pink dark:hover:text-dark-pink transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </Link>
      {isHovered && (
        <img
          src={randomNpc}
          alt="NPC"
          className="hidden md:block absolute -top-6 left-1/2 transform -translate-x-1/2 w-6 h-6 image-pixelated rotate-180"
        />
      )}
    </div>
  );
};

const DropdownMenu = ({ children, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300); // 300ms delay before closing
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative group" ref={dropdownRef}>
      <div
        className="flex items-center cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        <svg
          className={`ml-1 h-4 w-4 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Desktop Dropdown */}
      <div
        className={`hidden md:block absolute z-[150] mt-2 w-48 rounded-lg shadow-lg py-1 bg-white dark:bg-[#1a1a1a] transform transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{ top: "100%" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-light-text dark:text-dark-text hover:text-light-pink dark:hover:text-dark-pink transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) {
        return stored === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".mobile-menu-container")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Close mobile menu when window is resized to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate("/");
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownItems = [
    { label: "PixaCharacter", path: "/pixa-character" },
    { label: "PixaWeapon", path: "/pixa-weapon" },
    { label: "PixaPunk", path: "/pixa-punk" },
  ];

  return (
    <nav className="fixed top-0 z-[100] w-full before:absolute before:inset-0 before:backdrop-blur-[8px] before:bg-white/10 dark:before:bg-black/10 before:shadow-lg before:[image-rendering:pixelated]">
      {/* Pixelated overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMiIgaGVpZ2h0PSIyIiB2aWV3Qm94PSIwIDAgMiAyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] [background-size:2px_2px] opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="w-16 h-16 overflow-hidden">
              <img
                src={logoGif}
                alt="PixelVerse Logo"
                className="w-full h-full object-contain image-pixelated"
              />
            </div>
            <Link
              to="/"
              className="ml-3 text-2xl font-bold text-light-text dark:text-dark-text hover:text-light-pink dark:hover:text-dark-pink transition-colors"
            >
              PixelVerse
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-4">
            <div className="flex items-center space-x-10">
              <NavLink to="/">
                <span className="text-lg font-semibold">Home</span>
              </NavLink>
              <NavLink to="/pixabuilder">
                <span className="text-lg font-semibold">PixaBuilder</span>
              </NavLink>
              <NavLink to="/marketplace">
                <span className="text-lg font-semibold">Marketplace</span>
              </NavLink>
              <DropdownMenu items={dropdownItems}>
                <span className="text-lg font-semibold text-light-text dark:text-dark-text hover:text-light-pink dark:hover:text-dark-pink transition-colors">
                  Pixa Collxn
                </span>
              </DropdownMenu>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center">
            {/* Dark Mode Toggle */}
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

            {/* Profile / Auth */}
            {currentUser ? (
              <div className="relative ml-4" ref={profileDropdownRef}>
                <button
                  className="flex items-center space-x-2 text-light-text dark:text-dark-text hover:text-light-pink dark:hover:text-dark-pink transition-colors"
                  onClick={toggleProfileDropdown}
                >
                  <div className="w-8 h-8 bg-light-primary dark:bg-dark-primary rounded-full flex items-center justify-center text-white">
                    {currentUser.displayName
                      ? currentUser.displayName.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <span className="hidden md:block font-medium">
                    {currentUser.displayName || "User"}
                  </span>
                  <svg
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isProfileOpen ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                <div
                  className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-1 z-[150] transition-all duration-200 ${
                    isProfileOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4">
                <Link
                  to="/login"
                  className="hidden md:inline-block text-light-text dark:text-dark-text hover:text-light-pink dark:hover:text-dark-pink transition-colors"
                >
                  Login
                </Link>
                <PeekingButton
                  to="/signup"
                  variant="filled"
                  className="hidden md:inline-block"
                >
                  Sign Up
                </PeekingButton>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="flex md:hidden ml-3">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-light-text dark:text-dark-text hover:text-light-pink dark:hover:text-dark-pink transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu-container md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800 px-4 py-5">
          <div className="flex flex-col space-y-5">
            <Link
              to="/"
              className="text-lg font-medium text-light-text dark:text-dark-text"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/pixabuilder"
              className="text-lg font-medium text-light-text dark:text-dark-text"
              onClick={() => setIsMenuOpen(false)}
            >
              PixaBuilder
            </Link>
            <Link
              to="/marketplace"
              className="text-lg font-medium text-light-text dark:text-dark-text"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>

            {/* Mobile Collections Dropdown */}
            <div className="py-2">
              <p className="text-lg font-medium text-light-text dark:text-dark-text mb-2">
                Pixa Collections
              </p>
              <div className="pl-4 flex flex-col space-y-2">
                {dropdownItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="text-light-text dark:text-dark-text"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Auth Mobile */}
            {currentUser ? (
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-light-primary dark:bg-dark-primary rounded-full flex items-center justify-center text-white">
                    {currentUser.displayName
                      ? currentUser.displayName.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <span className="ml-2 font-medium text-light-text dark:text-dark-text">
                    {currentUser.displayName || currentUser.email}
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-red-500 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex flex-col space-y-3">
                <Link
                  to="/login"
                  className="text-lg font-medium text-light-text dark:text-dark-text"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="pixel-borders pixel-borders-primary px-6 py-2 inline-block text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
