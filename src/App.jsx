import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import oceanBg from "./assets/gifs/ocean.png";
import mapLandingGif from "./assets/gifs/map_landing 01.gif";
import mapLanding03Gif from "./assets/gifs/map_landing 03.gif";
import mapLanding05Gif from "./assets/gifs/map_landing 05.gif";
import cloudsImg from "./assets/gifs/clouds.png";
import cloudsTopImg from "./assets/gifs/clouds_top.png";
import axelGif from "./assets/gifs/axel.gif";

// Import weapon images
import DiamondSword from "./assets/gifs/Weapons/Diamond Sword.gif";
import AngelAxe from "./assets/gifs/Weapons/Angel Axe.gif";
import NebulaSword from "./assets/gifs/Weapons/Nebula Sword.gif";
import SpellBook from "./assets/gifs/Weapons/Spell Bookl.gif";
import PixaPistol from "./assets/gifs/Weapons/Pixa Pistol.gif";
import PixaGold from "./assets/gifs/Weapons/Pixa Gold.gif";
import PixaDiamond from "./assets/gifs/Weapons/Pixa Diamond.gif";
import CyberBlade from "./assets/gifs/Weapons/3dgifmaker76693.gif";

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
import Bert from "./assets/Characters/Bert.png";
import Betty from "./assets/Characters/Betty.png";
import BirdieSpringBlossom from "./assets/Characters/Birdie_Spring_Blossom.png";
import Blacksmith from "./assets/Characters/Blacksmith.png";
import Corale from "./assets/Characters/Corale.png";
import Cornwell from "./assets/Characters/Cornwell.png";
import Finley from "./assets/Characters/Finley.png";
import Finn from "./assets/Characters/Finn.png";
import Goldtooth from "./assets/Characters/Goldtooth.png";
import Hank from "./assets/Characters/Hank.png";
import Miranda from "./assets/Characters/Miranda.png";
import PumpkingPete from "./assets/Characters/Pumpking_Pete.png";
import Raven from "./assets/Characters/Raven.png";
import Stella from "./assets/Characters/Stella.png";
import Tango from "./assets/Characters/Tango.png";
import Timmy from "./assets/Characters/Timmy.png";
import Tywin from "./assets/Characters/Tywin.png";

// Shuffle and prepare cards data
const allCards = [
  {
    id: 1,
    rarity: "Rare",
    price: "0.5",
    tagColor: "from-blue-500/50 to-blue-600/50",
    image: Garth,
    name: "Garth",
    tags: ["pixaChar"],
  },
  {
    id: 2,
    rarity: "Very Rare",
    price: "1.2",
    tagColor: "from-purple-500/50 to-purple-600/50",
    image: PotionMaster,
    name: "Potion Master",
    tags: ["pixaChar"],
  },
  {
    id: 3,
    rarity: "Trending",
    price: "0.8",
    tagColor: "from-orange-500/50 to-orange-600/50",
    image: Luna,
    name: "Luna",
    tags: ["pixaChar"],
  },
  {
    id: 4,
    rarity: "Common",
    price: "0.3",
    tagColor: "from-gray-500/50 to-gray-600/50",
    image: Grimtooth,
    name: "Grimtooth",
    tags: ["pixaChar"],
  },
  {
    id: 5,
    rarity: "Legendary",
    price: "2.5",
    tagColor: "from-yellow-500/50 to-yellow-600/50",
    image: Grimbly,
    name: "Grimbly",
    tags: ["pixaChar"],
  },
  {
    id: 6,
    rarity: "Rare",
    price: "0.6",
    tagColor: "from-blue-500/50 to-blue-600/50",
    image: Grubnuk,
    name: "Grubnuk",
    tags: ["pixaChar"],
  },
  {
    id: 7,
    rarity: "Trending",
    price: "0.9",
    tagColor: "from-orange-500/50 to-orange-600/50",
    image: Poppy,
    name: "Poppy",
    tags: ["pixaChar"],
  },
  {
    id: 8,
    rarity: "Very Rare",
    price: "1.5",
    tagColor: "from-purple-500/50 to-purple-600/50",
    image: Auctioneer,
    name: "Auctioneer",
    tags: ["pixaChar"],
  },
  {
    id: 9,
    rarity: "Legendary",
    price: "2.8",
    tagColor: "from-yellow-500/50 to-yellow-600/50",
    image: Char1,
    name: "ByteRogue #77",
    rounded: true,
    tags: ["pixaPunk"],
  },
  {
    id: 10,
    rarity: "Very Rare",
    price: "1.3",
    tagColor: "from-purple-500/50 to-purple-600/50",
    image: Char2,
    name: "NeonSnarl",
    rounded: true,
    tags: ["pixaPunk"],
  },
  {
    id: 11,
    rarity: "Trending",
    price: "0.7",
    tagColor: "from-orange-500/50 to-orange-600/50",
    image: Char3,
    name: "Punkzilla VX",
    rounded: true,
    tags: ["pixaPunk"],
  },
  {
    id: 12,
    rarity: "Rare",
    price: "0.55",
    tagColor: "from-blue-500/50 to-blue-600/50",
    image: Char6,
    name: "GlitchFang",
    rounded: true,
    tags: ["pixaPunk"],
  },
  {
    id: 13,
    rarity: "Legendary",
    price: "3.0",
    tagColor: "from-yellow-500/50 to-yellow-600/50",
    image: Char13,
    name: "HexaHooligan",
    rounded: true,
    tags: ["pixaPunk"],
  },
  {
    id: 14,
    rarity: "Common",
    price: "0.25",
    tagColor: "from-gray-500/50 to-gray-600/50",
    image: Char67,
    name: "Z3r0Crust",
    rounded: true,
    tags: ["pixaPunk"],
  },
  {
    id: 15,
    rarity: "Very Rare",
    price: "1.8",
    tagColor: "from-purple-500/50 to-purple-600/50",
    image: Char378,
    name: "Crystal Mage",
    tags: ["pixaPunk"],
  },
  {
    id: 16,
    rarity: "Legendary",
    price: "4.5",
    tagColor: "from-yellow-500/50 to-yellow-600/50",
    image: DiamondSword,
    name: "Diamond Sword",
    tags: ["pixaWeapon"],
  },
  {
    id: 17,
    rarity: "Very Rare",
    price: "2.8",
    tagColor: "from-purple-500/50 to-purple-600/50",
    image: AngelAxe,
    name: "Angel Axe",
    tags: ["pixaWeapon"],
  },
  {
    id: 18,
    rarity: "Legendary",
    price: "5.0",
    tagColor: "from-yellow-500/50 to-yellow-600/50",
    image: NebulaSword,
    name: "Nebula Sword",
    tags: ["pixaWeapon"],
  },
  {
    id: 19,
    rarity: "Very Rare",
    price: "3.2",
    tagColor: "from-purple-500/50 to-purple-600/50",
    image: SpellBook,
    name: "Spell Book",
    tags: ["pixaWeapon"],
  },
  {
    id: 20,
    rarity: "Very Rare",
    price: "1.8",
    tagColor: "from-purple-500/50 to-purple-600/50",
    image: Bert,
    name: "Bert",
    tags: ["pixaChar"],
  },
  {
    id: 21,
    rarity: "Rare",
    price: "0.7",
    tagColor: "from-blue-500/50 to-blue-600/50",
    image: Betty,
    name: "Betty",
    tags: ["pixaChar"],
  },
  {
    id: 22,
    rarity: "Legendary",
    price: "3.5",
    tagColor: "from-yellow-500/50 to-yellow-600/50",
    image: BirdieSpringBlossom,
    name: "Birdie Spring Blossom",
    tags: ["pixaChar"],
  },
  {
    id: 23,
    rarity: "Very Rare",
    price: "2.1",
    tagColor: "from-purple-500/50 to-purple-600/50",
    image: Blacksmith,
    name: "Blacksmith",
    tags: ["pixaChar"],
  },
  {
    id: 24,
    rarity: "Legendary",
    price: "4.2",
    tagColor: "from-yellow-500/50 to-yellow-600/50",
    image: Corale,
    name: "Corale",
    tags: ["pixaChar"],
  },
  {
    id: 25,
    rarity: "Rare",
    price: "0.9",
    tagColor: "from-blue-500/50 to-blue-600/50",
    image: Cornwell,
    name: "Cornwell",
    tags: ["pixaChar"],
  },
  {
    id: 26,
    rarity: "Very Rare",
    price: "1.6",
    tagColor: "from-purple-500/50 to-purple-600/50",
    image: Finley,
    name: "Finley",
    tags: ["pixaChar"],
  },
  {
    id: 27,
    rarity: "Trending",
    price: "1.1",
    tagColor: "from-orange-500/50 to-orange-600/50",
    image: Finn,
    name: "Finn",
    tags: ["pixaChar"],
  },
  {
    id: 28,
    rarity: "Legendary",
    price: "3.8",
    tagColor: "from-yellow-500/50 to-yellow-600/50",
    image: Goldtooth,
    name: "Goldtooth",
    tags: ["pixaChar"],
  },
  {
    id: 29,
    rarity: "Common",
    price: "0.4",
    tagColor: "from-gray-500/50 to-gray-600/50",
    image: Hank,
    name: "Hank",
    tags: ["pixaChar"],
  },
  {
    id: 30,
    rarity: "Very Rare",
    price: "2.3",
    tagColor: "from-purple-500/50 to-purple-600/50",
    image: Miranda,
    name: "Miranda",
    tags: ["pixaChar"],
  },
  {
    id: 31,
    rarity: "Legendary",
    price: "4.7",
    tagColor: "from-yellow-500/50 to-yellow-600/50",
    image: PumpkingPete,
    name: "Pumpking Pete",
    tags: ["pixaChar"],
  },
  {
    id: 32,
    rarity: "Very Rare",
    price: "2.0",
    tagColor: "from-purple-500/50 to-purple-600/50",
    image: Raven,
    name: "Raven",
    tags: ["pixaChar"],
  },
  {
    id: 33,
    rarity: "Trending",
    price: "1.4",
    tagColor: "from-orange-500/50 to-orange-600/50",
    image: Stella,
    name: "Stella",
    tags: ["pixaChar"],
  },
  {
    id: 34,
    rarity: "Rare",
    price: "0.8",
    tagColor: "from-blue-500/50 to-blue-600/50",
    image: Tango,
    name: "Tango",
    tags: ["pixaChar"],
  },
  {
    id: 35,
    rarity: "Common",
    price: "0.3",
    tagColor: "from-gray-500/50 to-gray-600/50",
    image: Timmy,
    name: "Timmy",
    tags: ["pixaChar"],
  },
  {
    id: 36,
    rarity: "Legendary",
    price: "3.9",
    tagColor: "from-yellow-500/50 to-yellow-600/50",
    image: Tywin,
    name: "Tywin",
    tags: ["pixaChar"],
  },
  {
    id: 37,
    rarity: "Very Rare",
    price: "2.4",
    tagColor: "from-purple-500/50 to-purple-600/50",
    image: PixaPistol,
    name: "Pixa Pistol",
    tags: ["pixaWeapon"],
  },
  {
    id: 38,
    rarity: "Legendary",
    price: "4.2",
    tagColor: "from-yellow-500/50 to-yellow-600/50",
    image: PixaGold,
    name: "Pixa Gold",
    tags: ["pixaWeapon"],
  },
  {
    id: 39,
    rarity: "Legendary",
    price: "5.5",
    tagColor: "from-yellow-500/50 to-yellow-600/50",
    image: PixaDiamond,
    name: "Pixa Diamond",
    tags: ["pixaWeapon"],
  },
  {
    id: 40,
    rarity: "Very Rare",
    price: "2.9",
    tagColor: "from-purple-500/50 to-purple-600/50",
    image: CyberBlade,
    name: "Cyber Blade",
    tags: ["pixaWeapon"],
  },
].sort(() => Math.random() - 0.5);

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

const Marketplace = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5 });
  const [selectedRarities, setSelectedRarities] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique rarities from allCards
  const rarities = [...new Set(allCards.map((card) => card.rarity))];

  // Handle rarity toggle
  const toggleRarity = (rarity) => {
    setSelectedRarities((prev) =>
      prev.includes(rarity)
        ? prev.filter((r) => r !== rarity)
        : [...prev, rarity]
    );
  };

  // Filter and sort cards
  const filteredCards = allCards
    .filter((card) => {
      const matchesFilter =
        selectedFilter === "all" ||
        (selectedFilter === "pixaChar" && card.tags.includes("pixaChar")) ||
        (selectedFilter === "pixaWeapon" && card.tags.includes("pixaWeapon")) ||
        (selectedFilter === "pixaPunk" && card.tags.includes("pixaPunk"));

      const matchesSearch =
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.rarity.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPrice =
        parseFloat(card.price) >= priceRange.min &&
        parseFloat(card.price) <= priceRange.max;

      const matchesRarity =
        selectedRarities.length === 0 || selectedRarities.includes(card.rarity);

      return matchesFilter && matchesSearch && matchesPrice && matchesRarity;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "price-low-high":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-high-low":
          return parseFloat(b.price) - parseFloat(a.price);
        case "rarity":
          const rarityOrder = [
            "Common",
            "Rare",
            "Trending",
            "Very Rare",
            "Legendary",
          ];
          return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
        default:
          return 0;
      }
    });

  // Active filters count
  const activeFiltersCount = [
    selectedFilter !== "all",
    selectedRarities.length > 0,
    priceRange.min > 0 || priceRange.max < 5,
    sortOption !== "default",
  ].filter(Boolean).length;

  return (
    <div className="container mx-auto px-4 pt-32 pb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-0 text-light-text dark:text-dark-text">
          Marketplace
        </h1>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-6">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full pixel-borders pixel-borders-primary px-4 py-3 flex justify-between items-center"
        >
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              />
            </svg>
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-light-primary dark:bg-dark-primary text-white rounded-full text-sm">
                {activeFiltersCount}
              </span>
            )}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 transform transition-transform ${
              isFilterOpen ? "rotate-180" : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 mb-8">
        {/* Filters Sidebar */}
        <div
          className={`${
            isFilterOpen ? "block" : "hidden"
          } md:block bg-white dark:bg-[#0c0c0c] p-6 rounded-lg sticky top-24`}
        >
          <h2 className="text-xl font-bold mb-4 text-[#0c0c0c] dark:text-[#f5e6d3]">
            Filters
          </h2>

          {/* Collection Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-[#0c0c0c] dark:text-[#f5e6d3]">
              Collection
            </h3>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-[#0c0c0c] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary cursor-pointer"
            >
              <option value="all">All Items</option>
              <option value="pixaChar">Characters</option>
              <option value="pixaWeapon">Weapons</option>
              <option value="pixaPunk">Punks</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-[#0c0c0c] dark:text-[#f5e6d3]">
              Price Range (ETH)
            </h3>
            <div className="flex gap-4">
              <input
                type="number"
                min="0"
                max={priceRange.max}
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    min: parseFloat(e.target.value),
                  }))
                }
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 text-[#0c0c0c] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                placeholder="Min"
              />
              <input
                type="number"
                min={priceRange.min}
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    max: parseFloat(e.target.value),
                  }))
                }
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 text-[#0c0c0c] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Rarity Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-[#0c0c0c] dark:text-[#f5e6d3]">
              Rarity
            </h3>
            <div className="space-y-2">
              {rarities.map((rarity) => (
                <label
                  key={rarity}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedRarities.includes(rarity)}
                    onChange={() => toggleRarity(rarity)}
                    className="form-checkbox h-4 w-4 text-light-primary dark:text-dark-primary rounded"
                  />
                  <span className="text-[#0c0c0c] dark:text-[#f5e6d3]">
                    {rarity}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={() => {
              setSelectedFilter("all");
              setPriceRange({ min: 0, max: 5 });
              setSelectedRarities([]);
              setSortOption("default");
              setSearchTerm("");
            }}
            className="w-full pixel-borders pixel-borders-secondary px-4 py-2 mt-4"
          >
            Clear Filters
          </button>
        </div>

        {/* Main Content */}
        <div>
          {/* Search and Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary cursor-pointer"
            >
              <option value="default">Sort by</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rarity">Rarity</option>
            </select>
          </div>

          {/* Results Count */}
          <p className="text-light-muted dark:text-dark-muted mb-6">
            Showing {filteredCards.length} items
          </p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((card) => (
              <div
                key={card.id}
                className="featured-card p-6 bg-[#0c0c0c] dark:bg-gray-800"
              >
                <div className="relative aspect-square mb-4 bg-gray-800 dark:bg-gray-700 overflow-hidden rounded-lg image-container">
                  <img
                    src={card.image}
                    alt={card.name}
                    className={`w-full h-full object-contain p-4 image-pixelated ${
                      card.rounded ? "rounded-2xl" : ""
                    }`}
                  />
                  {/* Tags Container */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {/* Rarity Tag */}
                    <span
                      className={`rarity-pill bg-gradient-to-r ${card.tagColor}`}
                    >
                      {card.rarity}
                    </span>
                    {/* Collection Tags */}
                    {card.tags?.includes("pixaChar") && (
                      <span className="rarity-pill bg-gradient-to-r from-pink-500/50 to-pink-600/50">
                        pixaChar
                      </span>
                    )}
                    {card.tags?.includes("pixaWeapon") && (
                      <span className="rarity-pill bg-gradient-to-r from-amber-500/50 to-amber-600/50">
                        pixaWeapon
                      </span>
                    )}
                    {card.tags?.includes("pixaPunk") && (
                      <span className="rarity-pill bg-gradient-to-r from-cyan-500/50 to-cyan-600/50">
                        pixaPunk
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-[#f5f5f5] dark:text-white">
                  {card.name}
                </h3>
                <p className="text-[#f5f5f5]/80 dark:text-gray-300 mb-4">
                  Created by Artist #{card.id}
                </p>

                {/* Price Tag */}
                <p className="text-lg font-bold mb-4 text-light-primary dark:text-dark-primary">
                  {card.price} ETH
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

          {/* No Results Message */}
          {filteredCards.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-light-muted dark:text-dark-muted">
                No items found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [randomizedCards, setRandomizedCards] = useState([]);

  // Function to get random cards from different categories
  const getRandomCards = () => {
    const pixaCharCards = allCards.filter((card) =>
      card.tags.includes("pixaChar")
    );
    const pixaWeaponCards = allCards.filter((card) =>
      card.tags.includes("pixaWeapon")
    );
    const pixaPunkCards = allCards.filter((card) =>
      card.tags.includes("pixaPunk")
    );

    // Get random cards from each category
    const getRandomFromCategory = (cards, count) => {
      const shuffled = [...cards].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    };

    // Get 4 cards from each category (or less if not enough cards)
    const randomChar = getRandomFromCategory(pixaCharCards, 4);
    const randomWeapon = getRandomFromCategory(pixaWeaponCards, 4);
    const randomPunk = getRandomFromCategory(pixaPunkCards, 4);

    // Combine and shuffle all selected cards
    const combined = [...randomChar, ...randomWeapon, ...randomPunk].sort(
      () => Math.random() - 0.5
    );

    return combined;
  };

  // Initialize random cards on mount and when showMore changes
  useEffect(() => {
    setRandomizedCards(getRandomCards());
  }, [showMore]);

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

      {/* Products Section */}
      <section className="relative py-24 bg-[#f5e6d3] dark:bg-[#0c0c0c]">
        {/* Top Cloud Frame */}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 pt-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-4 text-white">
              The Pixa Collxn
            </h2>
          </div>

          {/* Product Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Category 1: Characters */}
            <Link
              to="/pixa-character"
              className="featured-card group cursor-pointer"
            >
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={Garth}
                  alt="Character Collection"
                  className="w-full h-full object-cover image-pixelated transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    PixaCharacters
                  </h3>
                </div>
              </div>
            </Link>

            {/* Category 2: Weapons */}
            <Link
              to="/pixa-weapon"
              className="featured-card group cursor-pointer"
            >
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={axelGif}
                  alt="Weapons Collection"
                  className="w-full h-full object-cover image-pixelated transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    PixaWeapons
                  </h3>
                </div>
              </div>
            </Link>

            {/* Category 3: PixaPunk */}
            <Link
              to="/pixa-punk"
              className="featured-card group cursor-pointer"
            >
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={Char13}
                  alt="PixaPunk Collection"
                  className="w-full h-full object-cover image-pixelated transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    PixaPunk
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h4 className="text-3xl font-bold text-light-primary dark:text-dark-primary mb-2">
                1.2K+
              </h4>
              <p className="text-light-muted dark:text-dark-muted">
                Unique Items
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl font-bold text-light-primary dark:text-dark-primary mb-2">
                3.4K+
              </h4>
              <p className="text-light-muted dark:text-dark-muted">
                Active Users
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl font-bold text-light-primary dark:text-dark-primary mb-2">
                98%
              </h4>
              <p className="text-light-muted dark:text-dark-muted">
                Success Rate
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl font-bold text-light-primary dark:text-dark-primary mb-2">
                240+
              </h4>
              <p className="text-light-muted dark:text-dark-muted">
                Daily Trades
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Cloud Frame */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen pointer-events-none"
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
            The PixaArt Gallery
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
              {[...Array(showMore ? 12 : 6)].map((_, index) => {
                const card = randomizedCards[index];
                return card ? (
                  <div
                    key={card.id}
                    className="featured-card p-6 bg-[#0c0c0c] dark:bg-gray-800"
                  >
                    {/* Image Container with Tags */}
                    <div className="relative aspect-square mb-4 bg-gray-800 dark:bg-gray-700 overflow-hidden rounded-lg image-container">
                      <img
                        src={card.image}
                        alt={card.name}
                        className={`w-full h-full object-contain p-4 image-pixelated ${
                          card.rounded ? "rounded-2xl" : ""
                        }`}
                      />
                      {/* Tags Container */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {/* Rarity Tag */}
                        <span
                          className={`
                          rarity-pill bg-gradient-to-r ${card.tagColor}
                        `}
                        >
                          {card.rarity}
                        </span>
                        {/* Collection Tags */}
                        {card.tags?.includes("pixaChar") && (
                          <span className="rarity-pill bg-gradient-to-r from-pink-500/50 to-pink-600/50">
                            pixaChar
                          </span>
                        )}
                        {card.tags?.includes("pixaWeapon") && (
                          <span className="rarity-pill bg-gradient-to-r from-amber-500/50 to-amber-600/50">
                            pixaWeapon
                          </span>
                        )}
                        {card.tags?.includes("pixaPunk") && (
                          <span className="rarity-pill bg-gradient-to-r from-cyan-500/50 to-cyan-600/50">
                            pixaPunk
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-[#f5f5f5] dark:text-white">
                      {card.name}
                    </h3>
                    <p className="text-[#f5f5f5]/80 dark:text-gray-300 mb-4">
                      Created by Artist #{card.id}
                    </p>

                    {/* Price Tag */}
                    <p className="text-lg font-bold mb-4 text-light-primary dark:text-dark-primary">
                      {card.price} ETH
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
                ) : null;
              })}
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
            {randomizedCards.map((card) => (
              <div
                key={card.id}
                className="featured-card p-6 bg-[#0c0c0c] dark:bg-gray-800 flex-shrink-0 w-[280px] snap-center"
              >
                {/* Image Container with Tags */}
                <div className="relative aspect-square mb-4 bg-gray-800 dark:bg-gray-700 overflow-hidden rounded-lg image-container">
                  <img
                    src={card.image}
                    alt={card.name}
                    className={`w-full h-full object-contain p-4 image-pixelated ${
                      card.rounded ? "rounded-2xl" : ""
                    }`}
                  />
                  {/* Tags Container */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {/* Rarity Tag */}
                    <span
                      className={`
                      rarity-pill bg-gradient-to-r ${card.tagColor}
                    `}
                    >
                      {card.rarity}
                    </span>
                    {/* Collection Tags */}
                    {card.tags?.includes("pixaChar") && (
                      <span className="rarity-pill bg-gradient-to-r from-pink-500/50 to-pink-600/50">
                        pixaChar
                      </span>
                    )}
                    {card.tags?.includes("pixaWeapon") && (
                      <span className="rarity-pill bg-gradient-to-r from-amber-500/50 to-amber-600/50">
                        pixaWeapon
                      </span>
                    )}
                    {card.tags?.includes("pixaPunk") && (
                      <span className="rarity-pill bg-gradient-to-r from-cyan-500/50 to-cyan-600/50">
                        pixaPunk
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-[#f5f5f5] dark:text-white">
                  {card.name}
                </h3>
                <p className="text-[#f5f5f5]/80 dark:text-gray-300 mb-4">
                  Created by Artist #{card.id}
                </p>

                {/* Price Tag */}
                <p className="text-lg font-bold mb-4 text-light-primary dark:text-dark-primary">
                  {card.price} ETH
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

        {/* Bottom Cloud Frame */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen pointer-events-none"
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
      </main>
    </>
  );
};

// Collection page components
const PixaCharacter = () => {
  const [sortOption, setSortOption] = useState("default");
  const characterCards = allCards
    .filter((card) => card.tags.includes("pixaChar"))
    .sort((a, b) => {
      switch (sortOption) {
        case "price-low-high":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-high-low":
          return parseFloat(b.price) - parseFloat(a.price);
        case "rarity":
          const rarityOrder = [
            "Common",
            "Rare",
            "Trending",
            "Very Rare",
            "Legendary",
          ];
          return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto px-4 pt-32 pb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-0 text-light-text dark:text-dark-text">
          PixaCharacter Collection
        </h1>
      </div>

      {/* Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-grow"></div>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary cursor-pointer"
        >
          <option value="default">Sort by</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rarity">Rarity</option>
        </select>
      </div>

      {/* Results Count */}
      <p className="text-light-muted dark:text-dark-muted mb-6">
        Showing {characterCards.length} items
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characterCards.map((card) => (
          <div
            key={card.id}
            className="featured-card p-6 bg-[#0c0c0c] dark:bg-gray-800"
          >
            <div className="relative aspect-square mb-4 bg-gray-800 dark:bg-gray-700 overflow-hidden rounded-lg image-container">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-contain p-4 image-pixelated"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <span
                  className={`rarity-pill bg-gradient-to-r ${card.tagColor}`}
                >
                  {card.rarity}
                </span>
                <span className="rarity-pill bg-gradient-to-r from-pink-500/50 to-pink-600/50">
                  pixaChar
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#f5f5f5] dark:text-white">
              {card.name}
            </h3>
            <p className="text-[#f5f5f5]/80 dark:text-gray-300 mb-4">
              Created by Artist #{card.id}
            </p>
            <p className="text-lg font-bold mb-4 text-light-primary dark:text-dark-primary">
              {card.price} ETH
            </p>
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
    </div>
  );
};

const PixaWeapon = () => {
  const [sortOption, setSortOption] = useState("default");
  const weaponCards = allCards
    .filter((card) => card.tags.includes("pixaWeapon"))
    .sort((a, b) => {
      switch (sortOption) {
        case "price-low-high":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-high-low":
          return parseFloat(b.price) - parseFloat(a.price);
        case "rarity":
          const rarityOrder = [
            "Common",
            "Rare",
            "Trending",
            "Very Rare",
            "Legendary",
          ];
          return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto px-4 pt-32 pb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-0 text-light-text dark:text-dark-text">
          PixaWeapon Collection
        </h1>
      </div>

      {/* Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-grow"></div>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary cursor-pointer"
        >
          <option value="default">Sort by</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rarity">Rarity</option>
        </select>
      </div>

      {/* Results Count */}
      <p className="text-light-muted dark:text-dark-muted mb-6">
        Showing {weaponCards.length} items
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weaponCards.map((card) => (
          <div
            key={card.id}
            className="featured-card p-6 bg-[#0c0c0c] dark:bg-gray-800"
          >
            <div className="relative aspect-square mb-4 bg-gray-800 dark:bg-gray-700 overflow-hidden rounded-lg image-container">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-contain p-4 image-pixelated"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <span
                  className={`rarity-pill bg-gradient-to-r ${card.tagColor}`}
                >
                  {card.rarity}
                </span>
                <span className="rarity-pill bg-gradient-to-r from-amber-500/50 to-amber-600/50">
                  pixaWeapon
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#f5f5f5] dark:text-white">
              {card.name}
            </h3>
            <p className="text-[#f5f5f5]/80 dark:text-gray-300 mb-4">
              Created by Artist #{card.id}
            </p>
            <p className="text-lg font-bold mb-4 text-light-primary dark:text-dark-primary">
              {card.price} ETH
            </p>
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
    </div>
  );
};

const PixaPunk = () => {
  const [sortOption, setSortOption] = useState("default");
  const punkCards = allCards
    .filter((card) => card.tags.includes("pixaPunk"))
    .sort((a, b) => {
      switch (sortOption) {
        case "price-low-high":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-high-low":
          return parseFloat(b.price) - parseFloat(a.price);
        case "rarity":
          const rarityOrder = [
            "Common",
            "Rare",
            "Trending",
            "Very Rare",
            "Legendary",
          ];
          return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto px-4 pt-32 pb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-0 text-light-text dark:text-dark-text">
          PixaPunk Collection
        </h1>
      </div>

      {/* Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-grow"></div>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary cursor-pointer"
        >
          <option value="default">Sort by</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rarity">Rarity</option>
        </select>
      </div>

      {/* Results Count */}
      <p className="text-light-muted dark:text-dark-muted mb-6">
        Showing {punkCards.length} items
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {punkCards.map((card) => (
          <div
            key={card.id}
            className="featured-card p-6 bg-[#0c0c0c] dark:bg-gray-800"
          >
            <div className="relative aspect-square mb-4 bg-gray-800 dark:bg-gray-700 overflow-hidden rounded-lg image-container">
              <img
                src={card.image}
                alt={card.name}
                className={`w-full h-full object-contain p-4 image-pixelated ${
                  card.rounded ? "rounded-2xl" : ""
                }`}
              />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <span
                  className={`rarity-pill bg-gradient-to-r ${card.tagColor}`}
                >
                  {card.rarity}
                </span>
                <span className="rarity-pill bg-gradient-to-r from-cyan-500/50 to-cyan-600/50">
                  pixaPunk
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#f5f5f5] dark:text-white">
              {card.name}
            </h3>
            <p className="text-[#f5f5f5]/80 dark:text-gray-300 mb-4">
              Created by Artist #{card.id}
            </p>
            <p className="text-lg font-bold mb-4 text-light-primary dark:text-dark-primary">
              {card.price} ETH
            </p>
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
    </div>
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
            <Route path="/pixa-character" element={<PixaCharacter />} />
            <Route path="/pixa-weapon" element={<PixaWeapon />} />
            <Route path="/pixa-punk" element={<PixaPunk />} />
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
