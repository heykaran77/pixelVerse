import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import oceanBg from "./assets/gifs/ocean.png";
import mapLandingGif from "./assets/gifs/map_landing 01.gif";
import mapLanding03Gif from "./assets/gifs/map_landing 03.gif";
import mapLanding05Gif from "./assets/gifs/map_landing 05.gif";
import cloudsImg from "./assets/gifs/clouds.png";
import cloudsTopImg from "./assets/gifs/clouds_top.png";

// Import character images
import Garth from "./assets/Characters/Garth.png";
import PotionMaster from "./assets/Characters/Potion_Master.png";
import Luna from "./assets/Characters/Luna.png";
import Grimtooth from "./assets/Characters/Grimtooth.png";
import Grimbly from "./assets/Characters/Grimbly.png";
import Grubnuk from "./assets/Characters/Grubnuk.png";
import Poppy from "./assets/Characters/Poppy.png";
import Auctioneer from "./assets/Characters/Auctioneer.png";
import Char1 from "./assets/Characters/1.png";
import Char2 from "./assets/Characters/2.png";
import Char3 from "./assets/Characters/3.png";
import Char6 from "./assets/Characters/6.png";
import Char13 from "./assets/Characters/13.gif";
import Char67 from "./assets/Characters/67.png";
import Char378 from "./assets/Characters/378.png";

// Placeholder components for routes
const Gallery = () => (
  <div className="container mx-auto px-4 pt-20">
    <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">
      Gallery
    </h1>
  </div>
);

const Create = () => (
  <div className="container mx-auto px-4 pt-20">
    <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">
      Create
    </h1>
  </div>
);

const Marketplace = () => (
  <div className="container mx-auto px-4 pt-20">
    <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">
      Marketplace
    </h1>
  </div>
);

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // Shuffle and prepare cards data
  const allCards = [
    {
      id: 1,
      rarity: "Rare",
      price: "0.5",
      tagColor: "from-blue-500/50 to-blue-600/50",
      image: Garth,
      name: "Garth",
    },
    {
      id: 2,
      rarity: "Very Rare",
      price: "1.2",
      tagColor: "from-purple-500/50 to-purple-600/50",
      image: PotionMaster,
      name: "Potion Master",
    },
    {
      id: 3,
      rarity: "Trending",
      price: "0.8",
      tagColor: "from-orange-500/50 to-orange-600/50",
      image: Luna,
      name: "Luna",
    },
    {
      id: 4,
      rarity: "Common",
      price: "0.3",
      tagColor: "from-gray-500/50 to-gray-600/50",
      image: Grimtooth,
      name: "Grimtooth",
    },
    {
      id: 5,
      rarity: "Legendary",
      price: "2.5",
      tagColor: "from-yellow-500/50 to-yellow-600/50",
      image: Grimbly,
      name: "Grimbly",
    },
    {
      id: 6,
      rarity: "Rare",
      price: "0.6",
      tagColor: "from-blue-500/50 to-blue-600/50",
      image: Grubnuk,
      name: "Grubnuk",
    },
    {
      id: 7,
      rarity: "Trending",
      price: "0.9",
      tagColor: "from-orange-500/50 to-orange-600/50",
      image: Poppy,
      name: "Poppy",
    },
    {
      id: 8,
      rarity: "Very Rare",
      price: "1.5",
      tagColor: "from-purple-500/50 to-purple-600/50",
      image: Auctioneer,
      name: "Auctioneer",
    },
    {
      id: 9,
      rarity: "Legendary",
      price: "2.8",
      tagColor: "from-yellow-500/50 to-yellow-600/50",
      image: Char1,
      name: "ByteRogue #77",
      rounded: true,
    },
    {
      id: 10,
      rarity: "Very Rare",
      price: "1.3",
      tagColor: "from-purple-500/50 to-purple-600/50",
      image: Char2,
      name: "NeonSnarl",
      rounded: true,
    },
    {
      id: 11,
      rarity: "Trending",
      price: "0.7",
      tagColor: "from-orange-500/50 to-orange-600/50",
      image: Char3,
      name: "Punkzilla VX",
      rounded: true,
    },
    {
      id: 12,
      rarity: "Rare",
      price: "0.55",
      tagColor: "from-blue-500/50 to-blue-600/50",
      image: Char6,
      name: "GlitchFang",
      rounded: true,
    },
    {
      id: 13,
      rarity: "Legendary",
      price: "3.0",
      tagColor: "from-yellow-500/50 to-yellow-600/50",
      image: Char13,
      name: "HexaHooligan",
      rounded: true,
    },
    {
      id: 14,
      rarity: "Common",
      price: "0.25",
      tagColor: "from-gray-500/50 to-gray-600/50",
      image: Char67,
      name: "Z3r0Crust",
      rounded: true,
    },
    {
      id: 15,
      rarity: "Very Rare",
      price: "1.8",
      tagColor: "from-purple-500/50 to-purple-600/50",
      image: Char378,
      name: "Crystal Mage",
    },
  ].sort(() => Math.random() - 0.5);

  return (
    <>
      {/* Hero Section */}
      <header
        className="relative pt-0 pb-24 px-6 lg:px-8"
        style={{
          backgroundImage: `url(${oceanBg})`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          imageRendering: "pixelated",
          imageRendering: "-moz-crisp-edges",
          imageRendering: "crisp-edges",
          marginTop: "-80px",
          paddingTop: "120px",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-[#f5e6d3] dark:text-white py-6 md:py-0">
                Welcome to PixelVerse
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-snug text-[#f5e6d3] dark:text-gray-300">
                Discover and collect unique pixel art NFTs
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/pixabuilder"
                  className="pixel-borders pixel-borders-primary px-8 py-3 text-lg font-medium inline-flex items-center gap-2"
                >
                  <span className="image-pixelated">🛠️</span>
                  Pixa Builder
                </Link>
                <Link
                  to="/marketplace"
                  className="pixel-borders pixel-borders-secondary px-8 py-3 text-lg font-medium"
                >
                  Market Place
                </Link>
              </div>
            </div>

            {/* GIF Container */}
            <div className="flex justify-center items-center mt-8 lg:mt-0">
              <img
                src={mapLandingGif}
                alt="Pixel Map Animation"
                className="w-full max-w-[300px] lg:max-w-[500px] h-auto image-pixelated"
              />
            </div>
          </div>
        </div>

        {/* Bottom Cloud Frame */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <img
            src={cloudsTopImg}
            alt="Bottom Cloud Frame"
            className="w-full"
            style={{
              imageRendering: "pixelated",
            }}
          />
        </div>
      </header>

      {/* Guide Section - Full Width */}
      <section className="relative w-full h-[100vh] overflow-hidden">
        {/* Ocean Background - Desktop Only */}
        <div
          className="absolute inset-0 w-full h-full hidden lg:block"
          style={{
            backgroundImage: `url(${oceanBg})`,
            backgroundRepeat: "repeat",
            backgroundSize: "256px 256px",
            opacity: 1,
          }}
        />

        {/* Mobile Background */}
        <div className="absolute inset-0 w-full h-full lg:hidden">
          <img
            src={mapLanding05Gif}
            alt="Mobile Background"
            className="w-full h-full object-cover"
            style={{
              imageRendering: "pixelated",
            }}
          />
        </div>

        {/* Left Side Map GIF - Desktop Only */}
        <div className="hidden lg:block absolute left-0 h-full z-20">
          <img
            src={mapLanding03Gif}
            alt="Map Animation"
            className="h-full w-auto"
            style={{
              imageRendering: "pixelated",
            }}
          />
        </div>

        {/* Map Timeline Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Desktop Map Timeline */}
          <div className="hidden lg:block w-full h-full">
            <div className="relative w-full h-full max-w-[1000px] mx-auto flex items-center">
              {/* Map Path */}
              <svg
                className="absolute inset-0 w-full h-[300px] my-auto"
                preserveAspectRatio="none"
                viewBox="0 0 900 300"
              >
                {/* Main Path */}
                <path
                  d="M100,150 C200,150 250,100 350,100 C450,100 500,200 600,200 C700,200 750,100 800,100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray="8 8"
                  className="text-light-primary dark:text-dark-primary"
                />
                {/* Path Dots */}
                <circle
                  cx="100"
                  cy="150"
                  r="6"
                  className="fill-light-primary dark:fill-dark-primary"
                />
                <circle
                  cx="350"
                  cy="100"
                  r="6"
                  className="fill-light-primary dark:fill-dark-primary"
                />
                <circle
                  cx="600"
                  cy="200"
                  r="6"
                  className="fill-light-primary dark:fill-dark-primary"
                />
                <circle
                  cx="800"
                  cy="100"
                  r="6"
                  className="fill-light-primary dark:fill-dark-primary"
                />
              </svg>

              {/* Timeline Points */}
              <div className="absolute inset-0 flex items-center">
                <div className="relative w-full h-[300px]">
                  {[
                    { title: "Connect & Explore", x: "11%", y: "50%" },
                    { title: "Create & Customize", x: "39%", y: "33%" },
                    { title: "Collect & Trade", x: "67%", y: "66%" },
                    { title: "Earn & Grow", x: "89%", y: "33%" },
                  ].map((item, index) => (
                    <div
                      key={item.title}
                      className="absolute z-20"
                      style={{
                        left: item.x,
                        top: item.y,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div
                        className={`timeline-pill p-4 text-center ${
                          index % 2 === 0 ? "float-up" : "float-down"
                        }`}
                      >
                        <h3 className="text-lg font-bold text-light-text dark:text-dark-text whitespace-nowrap">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Map Timeline */}
          <div className="lg:hidden w-full h-full">
            <div className="relative h-full flex items-center justify-center px-4">
              {/* Mobile Map Path */}
              <svg
                className="absolute h-[80%] w-32 top-1/2 -translate-y-1/2"
                style={{ left: "50%", transform: "translateX(-50%)" }}
                preserveAspectRatio="none"
                viewBox="0 0 100 600"
              >
                {/* Main Path - Setting opacity to 0 */}
                <path
                  d="M50,50 C60,100 40,150 50,200 C60,250 40,300 50,350 C60,400 40,450 50,500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray="8 8"
                  className="text-light-primary dark:text-dark-primary opacity-0"
                />
                {/* Path Dots */}
                <circle
                  cx="50"
                  cy="50"
                  r="6"
                  className="fill-light-primary dark:fill-dark-primary opacity-0"
                />
                <circle
                  cx="50"
                  cy="200"
                  r="6"
                  className="fill-light-primary dark:fill-dark-primary opacity-0"
                />
                <circle
                  cx="50"
                  cy="350"
                  r="6"
                  className="fill-light-primary dark:fill-dark-primary opacity-0"
                />
                <circle
                  cx="50"
                  cy="500"
                  r="6"
                  className="fill-light-primary dark:fill-dark-primary opacity-0"
                />
              </svg>

              {/* Mobile Timeline Points */}
              <div className="relative w-full h-[80%]">
                {[
                  { title: "Connect & Explore", y: "20%", align: "left" },
                  { title: "Create & Customize", y: "40%", align: "right" },
                  { title: "Collect & Trade", y: "60%", align: "left" },
                  { title: "Earn & Grow", y: "80%", align: "right" },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className="absolute z-20"
                    style={{
                      top: item.y,
                      left: item.align === "left" ? "30%" : "70%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div
                      className={`timeline-pill p-4 text-center ${
                        index % 2 === 0 ? "float-up" : "float-down"
                      }`}
                    >
                      <h3 className="text-lg font-bold text-light-text dark:text-dark-text whitespace-nowrap">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cloud Overlay - Between section and navbar */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 40 }}
        >
          {/* Mobile cloud */}
          <div className="lg:hidden absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="relative h-full flex items-center">
              <img
                src={cloudsImg}
                alt="Cloud Frame Mobile"
                style={{
                  height: "100%",
                  width: "auto",
                  maxWidth: "none",
                  imageRendering: "pixelated",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          {/* Desktop cloud */}
          <div className="hidden lg:block w-full h-full">
            <img
              src={cloudsImg}
              alt="Cloud Frame Desktop"
              className="absolute top-0 left-0 w-full h-full"
              style={{
                objectFit: "fill",
                imageRendering: "pixelated",
              }}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-48 relative">
        {/* Cloud Top Frame */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-screen pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <img
            src={cloudsTopImg}
            alt="Cloud Frame"
            className="w-full"
            style={{
              imageRendering: "pixelated",
              transform: "rotate(180deg)",
            }}
          />
        </div>

        <section className="mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold mb-8 text-gray-900 dark:text-white">
            The PixaArt Collection
          </h2>

          {/* View More Link - Mobile Only */}
          <div className="lg:hidden flex justify-end mb-6">
            <a
              href="/marketplace"
              className="flex items-center gap-2 text-light-primary dark:text-dark-primary hover:opacity-80 transition-opacity"
            >
              <span className="text-lg font-medium">View All</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </div>

          {/* Cards Grid - Desktop */}
          <div className="hidden lg:flex flex-col">
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {[...Array(showMore ? 12 : 6)].map((_, index) => (
                <div
                  key={allCards[index].id}
                  className="featured-card p-6 bg-[#0c0c0c] dark:bg-gray-800"
                >
                  {/* Image Container with Tags */}
                  <div className="relative aspect-square mb-4 bg-gray-800 dark:bg-gray-700 overflow-hidden rounded-lg image-container">
                    <img
                      src={allCards[index].image}
                      alt={allCards[index].name}
                      className={`w-full h-full object-contain p-4 image-pixelated ${
                        allCards[index].rounded ? "rounded-2xl" : ""
                      }`}
                    />
                    {/* Rarity Tag */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`
                        rarity-pill bg-gradient-to-r ${allCards[index].tagColor}
                      `}
                      >
                        {allCards[index].rarity}
                      </span>
                    </div>
                    {/* Pixel Art Tag */}
                    <div className="absolute bottom-3 right-3">
                      <span className="rarity-pill bg-gradient-to-r from-indigo-500/30 to-indigo-600/30 text-sm">
                        pixel art
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-[#f5f5f5] dark:text-white">
                    {allCards[index].name}
                  </h3>
                  <p className="text-[#f5f5f5]/80 dark:text-gray-300 mb-4">
                    Created by Artist #{allCards[index].id}
                  </p>

                  {/* Price Tag */}
                  <p className="text-lg font-bold mb-4 text-light-primary dark:text-dark-primary">
                    {allCards[index].price} ETH
                  </p>

                  {/* Buttons Container */}
                  <div className="flex flex-col gap-3">
                    <button className="pixel-borders pixel-borders-primary px-4 py-2 w-full">
                      Place Bid
                    </button>
                    <button className="pixel-borders pixel-borders-secondary px-4 py-2 w-full">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-12 gap-4">
              <button
                onClick={() => setShowMore(!showMore)}
                className="pixel-borders pixel-borders-primary px-8 py-3 text-lg font-medium"
              >
                {showMore ? "View Less" : "View More"}
              </button>
              {showMore && (
                <a
                  href="/marketplace"
                  className="pixel-borders pixel-borders-secondary px-8 py-3 text-lg font-medium inline-flex items-center gap-2"
                >
                  Marketplace
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 transform -rotate-45"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Cards Grid - Mobile */}
          <div className="lg:hidden flex overflow-x-auto pb-6 gap-4 md:gap-6 hide-scrollbar snap-x snap-mandatory">
            {allCards.map((item) => (
              <div
                key={item.id}
                className="featured-card p-6 bg-[#0c0c0c] dark:bg-gray-800 flex-shrink-0 w-[280px] snap-center"
              >
                {/* Image Container with Tags */}
                <div className="relative aspect-square mb-4 bg-gray-800 dark:bg-gray-700 overflow-hidden rounded-lg image-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`w-full h-full object-contain p-4 image-pixelated ${
                      item.rounded ? "rounded-2xl" : ""
                    }`}
                  />
                  {/* Rarity Tag */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`
                    rarity-pill bg-gradient-to-r ${item.tagColor}
                  `}
                    >
                      {item.rarity}
                    </span>
                  </div>
                  {/* Pixel Art Tag */}
                  <div className="absolute bottom-3 right-3">
                    <span className="rarity-pill bg-gradient-to-r from-indigo-500/30 to-indigo-600/30 text-sm">
                      pixel art
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-[#f5f5f5] dark:text-white">
                  {item.name}
                </h3>
                <p className="text-[#f5f5f5]/80 dark:text-gray-300 mb-4">
                  Created by Artist #{item.id}
                </p>

                {/* Price Tag */}
                <p className="text-lg font-bold mb-4 text-light-primary dark:text-dark-primary">
                  {item.price} ETH
                </p>

                {/* Buttons Container */}
                <div className="flex flex-col gap-3">
                  <button className="pixel-borders pixel-borders-primary px-4 py-2 w-full">
                    Place Bid
                  </button>
                  <button className="pixel-borders pixel-borders-secondary px-4 py-2 w-full">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen bg-light-bg dark:bg-[#0c0c0c] overflow-x-hidden">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/create" element={<Create />} />
            <Route path="/marketplace" element={<Marketplace />} />
          </Routes>

          {/* Footer */}
          <footer className="site-footer">
            <div className="container mx-auto px-4 text-center">
              <p className="text-sm">© 2024 PixelVerse. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
