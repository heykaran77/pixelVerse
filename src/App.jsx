import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import oceanBg from "./assets/gifs/ocean.png";
import mapLandingGif from "./assets/gifs/map_landing 01.gif";

// Import character images
import Garth from "./assets/Characters/Garth.png";
import PotionMaster from "./assets/Characters/Potion_Master.png";
import Luna from "./assets/Characters/Luna.png";
import Grimtooth from "./assets/Characters/Grimtooth.png";
import Grimbly from "./assets/Characters/Grimbly.png";
import Grubnuk from "./assets/Characters/Grubnuk.png";
import Poppy from "./assets/Characters/Poppy.png";
import Auctioneer from "./assets/Characters/Auctioneer.png";

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

const Home = () => (
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-[#f5e6d3] dark:text-white">
              Welcome to PixelVerse
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-snug text-[#f5e6d3] dark:text-gray-300">
              Discover and collect unique pixel art NFTs
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="pixel-borders pixel-borders-primary px-8 py-3 text-lg font-medium">
                Start Creating
              </button>
              <button className="pixel-borders pixel-borders-secondary px-8 py-3 text-lg font-medium">
                Explore Gallery
              </button>
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
    </header>

    {/* Guide Section - Full Width */}
    <section className="relative overflow-hidden mb-24">
      {/* Ocean Background */}
      <div
        className="absolute left-0 right-0 w-full z-0"
        style={{
          backgroundImage: `url(${oceanBg})`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          opacity: 1,
          height: "120%",
          top: "-10%",
        }}
      />

      <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white relative z-10">
        Your Journey into PixelVerse
      </h2>

      {/* Timeline Container */}
      <div className="relative z-10 py-8">
        {/* Desktop Timeline (Horizontal) */}
        <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between relative" style={{ gap: "5vw" }}>
            {/* Custom Zig-zag Path */}
            <svg
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full"
              height="100"
              style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))" }}
            >
              <path
                d="M0,50 L25%,20 L50%,80 L75%,20 L100%,80"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="text-light-primary dark:text-dark-primary"
              />
            </svg>

            {[
              {
                title: "Connect & Explore",
                description:
                  "Sign up and connect your wallet to start exploring unique pixel art collections.",
              },
              {
                title: "Create & Customize",
                description:
                  "Use our PixaBuilder to create and customize your own pixel art masterpieces.",
              },
              {
                title: "Collect & Trade",
                description:
                  "Build your collection by trading with other artists and collectors in the marketplace.",
              },
              {
                title: "Earn & Grow",
                description:
                  "Earn rewards, unlock achievements, and grow your presence in the community.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="flex-1"
                style={{
                  transform: `translateY(${
                    index % 2 === 0 ? "-30px" : "30px"
                  })`,
                  transition: "transform 0.3s ease-in-out",
                  minWidth: "200px",
                  maxWidth: "300px",
                }}
              >
                {/* Content Pill */}
                <div className="relative group h-full">
                  <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-2xl" />
                  <div className="relative p-4">
                    {/* GIF placeholder */}
                    <div className="w-16 h-16 mx-auto mb-3">
                      {/* <img src={item.gif} alt={item.title} className="w-full h-full object-contain" /> */}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-light-text dark:text-dark-text">
                      {item.title}
                    </h3>
                    <p className="text-light-text/80 dark:text-dark-text/80 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline (Vertical) */}
        <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative space-y-12">
            {/* Vertical Zig-zag Line */}
            <svg
              className="absolute left-4 top-0 h-full w-8"
              preserveAspectRatio="none"
            >
              <path
                d="M16,0 L8,100 L24,200 L8,300 L24,400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="text-light-primary dark:text-dark-primary"
              />
            </svg>

            {[
              {
                title: "Connect & Explore",
                description:
                  "Sign up and connect your wallet to start exploring unique pixel art collections.",
              },
              {
                title: "Create & Customize",
                description:
                  "Use our PixaBuilder to create and customize your own pixel art masterpieces.",
              },
              {
                title: "Collect & Trade",
                description:
                  "Build your collection by trading with other artists and collectors in the marketplace.",
              },
              {
                title: "Earn & Grow",
                description:
                  "Earn rewards, unlock achievements, and grow your presence in the community.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="relative pl-12"
                style={{
                  transform: `translateX(${index % 2 === 0 ? "0" : "20px"})`,
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                {/* Content Pill */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-2xl" />
                  <div className="relative p-4">
                    {/* GIF placeholder */}
                    <div className="w-16 h-16 mb-3">
                      {/* <img src={item.gif} alt={item.title} className="w-full h-full object-contain" /> */}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-light-text dark:text-dark-text">
                      {item.title}
                    </h3>
                    <p className="text-light-text/80 dark:text-dark-text/80 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Main Content */}
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          The Legendary Collection
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
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
          ].map((item) => (
            <div
              key={item.id}
              className="featured-card p-6 bg-[#0c0c0c] dark:bg-gray-800"
            >
              {/* Image Container with Rarity Tag */}
              <div className="relative aspect-square mb-4 bg-gray-800 dark:bg-gray-700 overflow-hidden rounded-lg image-container">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain p-4 image-pixelated"
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

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0c0c0c]">
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
