import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import timmyGif from "../assets/NPCs/timmy.gif";
import cornwellGif from "../assets/NPCs/cornwell.gif";
import fatChickenGif from "../assets/NPCs/fat_chicken.gif";
import logoGif from "../assets/gifs/logo.gif";

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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
    <nav className="sticky top-0 z-50 before:absolute before:inset-0 before:backdrop-blur-[8px] before:bg-white/10 dark:before:bg-black/10 before:shadow-lg before:[image-rendering:pixelated] relative overflow-hidden">
      {/* Pixelated overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMiIgaGVpZ2h0PSIyIiB2aWV3Qm94PSIwIDAgMiAyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] [background-size:2px_2px] opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="w-12 h-12 overflow-hidden">
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
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-5">
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <Link
              to="/login"
              className="text-lg font-semibold text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors"
            >
              Login
            </Link>
            <PeekingButton
              to="/signup"
              variant="filled"
              className="text-lg font-semibold"
            >
              Sign Up
            </PeekingButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <div className="space-y-1.5">
                <div
                  className={`w-6 h-0.5 bg-light-text dark:bg-dark-text transition-transform duration-300 ${
                    isMenuOpen ? "transform rotate-45 translate-y-2" : ""
                  }`}
                ></div>
                <div
                  className={`w-6 h-0.5 bg-light-text dark:bg-dark-text transition-opacity duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></div>
                <div
                  className={`w-6 h-0.5 bg-light-text dark:bg-dark-text transition-transform duration-300 ${
                    isMenuOpen ? "transform -rotate-45 -translate-y-2" : ""
                  }`}
                ></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`mobile-menu-container md:hidden fixed top-16 left-0 right-0 bg-[#f5f5f5] dark:bg-[#0c0c0c] transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none translate-y-1"
          }`}
        >
          {/* Pixelated overlay for mobile menu */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMiIgaGVpZ2h0PSIyIiB2aWV3Qm94PSIwIDAgMiAyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] [background-size:2px_2px] opacity-50"></div>

          <div className="relative py-6 px-4 space-y-6">
            <Link
              to="/"
              className="block text-lg font-semibold text-light-text dark:text-dark-text hover:text-light-pink dark:hover:text-dark-pink transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/pixabuilder"
              className="block text-lg font-semibold text-light-text dark:text-dark-text hover:text-light-pink dark:hover:text-dark-pink transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              PixaBuilder
            </Link>
            <Link
              to="/marketplace"
              className="block text-lg font-semibold text-light-text dark:text-dark-text hover:text-light-pink dark:hover:text-dark-pink transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
            <div className="pt-6 border-t border-light-border dark:border-dark-border">
              <Link
                to="/login"
                className="block text-lg font-semibold text-light-text dark:text-dark-text hover:text-light-pink dark:hover:text-dark-pink transition-colors mb-6"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block w-full text-center pixel-borders pixel-borders-primary px-6 py-2 text-lg font-semibold mb-6"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
