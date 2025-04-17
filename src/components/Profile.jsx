import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DiamondSword from "../assets/gifs/Weapons/Diamond Sword.gif";
import AngelAxe from "../assets/gifs/Weapons/Angel Axe.gif";
import NebulaSword from "../assets/gifs/Weapons/Nebula Sword.gif";
import SpellBook from "../assets/gifs/Weapons/Spell Bookl.gif";
import PixaPistol from "../assets/gifs/Weapons/Pixa Pistol.gif";
import PixaGold from "../assets/gifs/Weapons/Pixa Gold.gif";
import PixaDiamond from "../assets/gifs/Weapons/Pixa Diamond.gif";
import CyberBlade from "../assets/gifs/Weapons/3dgifmaker76693.gif";

const Profile = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("collection");
  const [userStats, setUserStats] = useState({
    joined: "May 2023",
    totalValue: "12.45 ETH",
    items: 8,
    rank: 42,
  });

  // Sample user NFT collection
  const [ownedNFTs, setOwnedNFTs] = useState([
    {
      id: 1,
      name: "Diamond Sword",
      image: DiamondSword,
      rarity: "Legendary",
      price: "2.5 ETH",
      collection: "PixaWeapon",
    },
    {
      id: 2,
      name: "Angel Axe",
      image: AngelAxe,
      rarity: "Rare",
      price: "1.8 ETH",
      collection: "PixaWeapon",
    },
    {
      id: 3,
      name: "Nebula Sword",
      image: NebulaSword,
      rarity: "Very Rare",
      price: "2.1 ETH",
      collection: "PixaWeapon",
    },
    {
      id: 4,
      name: "Spell Book",
      image: SpellBook,
      rarity: "Epic",
      price: "1.6 ETH",
      collection: "PixaWeapon",
    },
    {
      id: 5,
      name: "Pixa Pistol",
      image: PixaPistol,
      rarity: "Uncommon",
      price: "0.9 ETH",
      collection: "PixaWeapon",
    },
    {
      id: 6,
      name: "Pixa Gold",
      image: PixaGold,
      rarity: "Common",
      price: "0.5 ETH",
      collection: "PixaWeapon",
    },
    {
      id: 7,
      name: "Pixa Diamond",
      image: PixaDiamond,
      rarity: "Legendary",
      price: "2.3 ETH",
      collection: "PixaWeapon",
    },
    {
      id: 8,
      name: "Cyber Blade",
      image: CyberBlade,
      rarity: "Epic",
      price: "1.85 ETH",
      collection: "PixaWeapon",
    },
  ]);

  // Filter functions
  const [sortOption, setSortOption] = useState("recent");
  const [filterRarity, setFilterRarity] = useState("all");

  // Apply sorting and filtering
  const getDisplayedNFTs = () => {
    let filtered = [...ownedNFTs];

    // Apply rarity filter
    if (filterRarity !== "all") {
      filtered = filtered.filter(
        (nft) => nft.rarity.toLowerCase() === filterRarity.toLowerCase()
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "price-high":
        return filtered.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      case "price-low":
        return filtered.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      case "rarity":
        const rarityOrder = {
          Legendary: 5,
          "Very Rare": 4,
          Epic: 3,
          Rare: 2,
          Uncommon: 1,
          Common: 0,
        };
        return filtered.sort(
          (a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]
        );
      case "recent":
      default:
        return filtered;
    }
  };

  const getRarityClass = (rarity) => {
    switch (rarity.toLowerCase()) {
      case "legendary":
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-500";
      case "very rare":
        return "bg-purple-500/20 text-purple-700 dark:text-purple-500";
      case "epic":
        return "bg-pink-500/20 text-pink-700 dark:text-pink-500";
      case "rare":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-500";
      case "uncommon":
        return "bg-green-500/20 text-green-700 dark:text-green-500";
      case "common":
        return "bg-gray-500/20 text-gray-700 dark:text-gray-500";
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Profile Header */}
      <div className="bg-gray-800 pixel-borders p-8 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 md:w-32 md:h-32 bg-light-primary dark:bg-dark-primary rounded-full flex items-center justify-center text-white text-4xl md:text-5xl font-bold">
            {currentUser?.displayName?.charAt(0).toUpperCase() ||
              currentUser?.email?.charAt(0).toUpperCase() ||
              "U"}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-[#f7ff00] dark:text-dark-text text-center md:text-left">
              {currentUser?.displayName ||
                currentUser?.email?.split("@")[0] ||
                "User"}
            </h1>
            <p className="text-[#f7ff00] dark:text-dark-muted mb-4 text-center md:text-left">
              {currentUser?.email}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <p className="text-light-primary dark:text-dark-primary font-bold text-xl">
                  {userStats.joined}
                </p>
                <p className="text-[#f7ff00] dark:text-dark-muted text-sm">
                  Joined
                </p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <p className="text-light-primary dark:text-dark-primary font-bold text-xl">
                  {userStats.totalValue}
                </p>
                <p className="text-[#f7ff00] dark:text-dark-muted text-sm">
                  Collection Value
                </p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <p className="text-light-primary dark:text-dark-primary font-bold text-xl">
                  {userStats.items}
                </p>
                <p className="text-[#f7ff00] dark:text-dark-muted text-sm">
                  Items
                </p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <p className="text-light-primary dark:text-dark-primary font-bold text-xl">
                  #{userStats.rank}
                </p>
                <p className="text-[#f7ff00] dark:text-dark-muted text-sm">
                  Collector Rank
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Details Card */}
      <div className="bg-gray-800 pixel-borders p-6 rounded-lg mb-8">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Left Side: Bio */}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4 text-[#f7ff00] dark:text-dark-text">
              User Bio
            </h2>
            <p className="text-[#f7ff00] dark:text-dark-muted mb-4">
              Pixel art enthusiast and NFT collector. Always on the lookout for
              unique digital assets and building my collection of rare PixaVerse
              items. Joined the crypto art scene in early 2023 and currently
              focusing on PixaWeapons and PixaCharacters.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 text-sm bg-gray-700 rounded-full text-white dark:text-dark-text">
                PixaWeapon Collector
              </span>
              <span className="px-3 py-1 text-sm bg-gray-700 rounded-full text-white dark:text-dark-text">
                Pixel Artist
              </span>
              <span className="px-3 py-1 text-sm bg-gray-700 rounded-full text-white dark:text-dark-text">
                ETH Trader
              </span>
            </div>
          </div>

          {/* Right Side: Creation Tools */}
          <div className="md:w-1/3 bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-[#f7ff00] dark:text-dark-text">
              Creation Tools
            </h2>
            <div className="space-y-3">
              <Link
                to="/pixabuilder"
                className="flex items-center gap-3 p-3 bg-gray-600 hover:bg-gray-500 transition-colors rounded-lg text-white dark:text-dark-text"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  ></path>
                </svg>
                <span>Open PixaBuilder</span>
              </Link>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-600 hover:bg-gray-500 transition-colors rounded-lg text-white dark:text-dark-text">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Mint New NFT</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-600 hover:bg-gray-500 transition-colors rounded-lg text-white dark:text-dark-text">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
                <span>Share Gallery</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 border-b border-gray-700">
        <button
          className={`px-6 py-3 font-medium text-lg ${
            activeTab === "collection"
              ? "text-light-primary dark:text-dark-primary border-b-2 border-light-primary dark:border-dark-primary"
              : "text-[#0c0c0c] dark:text-dark-muted"
          }`}
          onClick={() => setActiveTab("collection")}
        >
          Collection
        </button>
        <button
          className={`px-6 py-3 font-medium text-lg ${
            activeTab === "activity"
              ? "text-light-primary dark:text-dark-primary border-b-2 border-light-primary dark:border-dark-primary"
              : "text-[#0c0c0c] dark:text-dark-muted"
          }`}
          onClick={() => setActiveTab("activity")}
        >
          Activity
        </button>
        <button
          className={`px-6 py-3 font-medium text-lg ${
            activeTab === "settings"
              ? "text-light-primary dark:text-dark-primary border-b-2 border-light-primary dark:border-dark-primary"
              : "text-[#0c0c0c] dark:text-dark-muted"
          }`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>

      {/* Collection Tab Content */}
      {activeTab === "collection" && (
        <>
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <select
                className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="recent">Recently Added</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="rarity">Rarity</option>
              </select>

              <select
                className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none"
                value={filterRarity}
                onChange={(e) => setFilterRarity(e.target.value)}
              >
                <option value="all">All Rarities</option>
                <option value="legendary">Legendary</option>
                <option value="very rare">Very Rare</option>
                <option value="epic">Epic</option>
                <option value="rare">Rare</option>
                <option value="uncommon">Uncommon</option>
                <option value="common">Common</option>
              </select>
            </div>

            <p className="text-white dark:text-dark-text">
              Showing {getDisplayedNFTs().length} of {ownedNFTs.length} items
            </p>
          </div>

          {/* Section: Featured Artwork */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#f7ff00] dark:text-dark-text mb-6">
              Featured Artwork
            </h2>
            {getDisplayedNFTs().length > 0 && (
              <div className="bg-gray-800 pixel-borders rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 aspect-square bg-black flex items-center justify-center p-4">
                    <img
                      src={getDisplayedNFTs()[0].image}
                      alt={getDisplayedNFTs()[0].name}
                      className="max-h-full max-w-full object-contain image-pixelated"
                    />
                  </div>
                  <div className="md:w-1/2 p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-[#f7ff00] dark:text-dark-text">
                        {getDisplayedNFTs()[0].name}
                      </h3>
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${getRarityClass(
                          getDisplayedNFTs()[0].rarity
                        )}`}
                      >
                        {getDisplayedNFTs()[0].rarity}
                      </span>
                    </div>
                    <p className="text-[#f7ff00] dark:text-dark-muted mb-6">
                      This {getDisplayedNFTs()[0].collection} item is part of
                      your prized collection. Each pixel was meticulously
                      crafted to create this unique digital asset, representing
                      both artistic value and potential investment growth in the
                      PixelVerse ecosystem.
                    </p>
                    <div className="mb-8">
                      <h4 className="text-sm text-[#f7ff00] dark:text-dark-muted mb-2">
                        Collection
                      </h4>
                      <p className="text-light-text dark:text-dark-text font-medium">
                        {getDisplayedNFTs()[0].collection}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <h4 className="text-sm text-[#f7ff00] dark:text-dark-muted mb-2">
                        Current Value
                      </h4>
                      <p className="text-light-primary dark:text-dark-primary text-2xl font-bold">
                        {getDisplayedNFTs()[0].price}
                      </p>
                      <div className="flex gap-3 mt-6">
                        <button className="pixel-borders pixel-borders-primary h-10 px-4 font-bold text-white">
                          List for Sale
                        </button>
                        <button className="pixel-borders h-10 px-4 text-light-text dark:text-dark-text bg-transparent border border-gray-600">
                          Transfer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section: Collection Grid */}
          <div>
            <h2 className="text-2xl font-bold text-[#f7ff00] dark:text-dark-text mb-6">
              All Collectibles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {getDisplayedNFTs().map((nft) => (
                <div
                  key={nft.id}
                  className="bg-gray-800 pixel-borders overflow-hidden rounded-lg transition-transform hover:scale-[1.02]"
                >
                  <div className="relative">
                    <div className="p-3 bg-gray-900 aspect-square flex items-center justify-center">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="max-h-full image-pixelated object-contain"
                      />
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${getRarityClass(
                          nft.rarity
                        )}`}
                      >
                        {nft.rarity}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#f7ff00] dark:text-dark-text mb-1">
                      {nft.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-[#f7ff00] dark:text-dark-muted text-sm">
                        {nft.collection}
                      </p>
                      <p className="text-light-primary dark:text-dark-primary font-bold">
                        {nft.price}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <button className="text-xs py-1 text-center rounded bg-gray-700 hover:bg-gray-600 text-white transition-colors">
                        View Details
                      </button>
                      <button className="text-xs py-1 text-center rounded bg-light-primary hover:bg-light-primary/80 text-white transition-colors">
                        List for Sale
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {getDisplayedNFTs().length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-white dark:text-dark-muted mb-4">
                No items found matching your filters
              </p>
              <button
                onClick={() => {
                  setFilterRarity("all");
                  setSortOption("recent");
                }}
                className="text-light-primary dark:text-dark-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </>
      )}

      {/* Activity Tab Content */}
      {activeTab === "activity" && (
        <div className="bg-gray-800 pixel-borders p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#f7ff00] dark:text-dark-text mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
              <div className="w-12 h-12 bg-light-primary/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-light-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-light-text dark:text-dark-text font-medium">
                  You purchased{" "}
                  <span className="text-light-primary">Diamond Sword</span>
                </p>
                <p className="text-white dark:text-dark-muted text-sm">
                  2 days ago · 2.5 ETH
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-light-text dark:text-dark-text font-medium">
                  Your bid for{" "}
                  <span className="text-light-primary">Angel Axe</span> was
                  accepted
                </p>
                <p className="text-white dark:text-dark-muted text-sm">
                  1 week ago · 1.8 ETH
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-light-text dark:text-dark-text font-medium">
                  You placed a bid for{" "}
                  <span className="text-light-primary">Nebula Sword</span>
                </p>
                <p className="text-white dark:text-dark-muted text-sm">
                  2 weeks ago · 2.0 ETH
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab Content */}
      {activeTab === "settings" && (
        <div className="bg-gray-800 pixel-borders p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#f7ff00] dark:text-dark-text mb-6">
            Account Settings
          </h2>

          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#f7ff00] dark:text-dark-text border-b border-gray-700 pb-2">
                  Personal Information
                </h3>

                <div>
                  <label className="block text-[#f7ff00] dark:text-dark-text mb-2 font-medium">
                    Display Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f7ff00]"
                    defaultValue={
                      currentUser?.displayName ||
                      currentUser?.email?.split("@")[0] ||
                      ""
                    }
                    placeholder="Enter your display name"
                  />
                </div>

                <div>
                  <label className="block text-[#f7ff00] dark:text-dark-text mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f7ff00] cursor-not-allowed opacity-75"
                    defaultValue={currentUser?.email || ""}
                    placeholder="Enter your email"
                    disabled
                  />
                  <p className="text-white dark:text-dark-muted text-sm mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <label className="block text-[#f7ff00] dark:text-dark-text mb-2 font-medium">
                    Bio
                  </label>
                  <textarea
                    className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f7ff00] min-h-[100px]"
                    placeholder="Tell us about yourself"
                    defaultValue="Pixel art enthusiast and NFT collector. Always on the lookout for unique digital assets!"
                  />
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#f7ff00] dark:text-dark-text border-b border-gray-700 pb-2">
                  Preferences & Wallet
                </h3>

                <div>
                  <label className="block text-[#f7ff00] dark:text-dark-text mb-2 font-medium">
                    Ethereum Wallet Address
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f7ff00]"
                    defaultValue="0x4A8b...F3eE"
                    placeholder="Your ETH wallet address"
                  />
                </div>

                <div>
                  <label className="block text-[#f7ff00] dark:text-dark-text mb-2 font-medium">
                    Notification Settings
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="sales-notifications"
                        type="checkbox"
                        className="h-5 w-5 text-light-primary focus:ring-light-primary dark:focus:ring-dark-primary"
                        defaultChecked
                      />
                      <label
                        htmlFor="sales-notifications"
                        className="ml-2 text-[#f7ff00] dark:text-dark-text"
                      >
                        Item sold notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="bid-notifications"
                        type="checkbox"
                        className="h-5 w-5 text-light-primary focus:ring-light-primary"
                        defaultChecked
                      />
                      <label
                        htmlFor="bid-notifications"
                        className="ml-2 text-[#f7ff00] dark:text-dark-text"
                      >
                        Bid activity
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="price-notifications"
                        type="checkbox"
                        className="h-5 w-5 text-light-primary focus:ring-light-primary"
                        defaultChecked
                      />
                      <label
                        htmlFor="price-notifications"
                        className="ml-2 text-[#f7ff00] dark:text-dark-text"
                      >
                        Price change alerts
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="newsletter"
                        type="checkbox"
                        className="h-5 w-5 text-light-primary focus:ring-light-primary"
                      />
                      <label
                        htmlFor="newsletter"
                        className="ml-2 text-[#f7ff00] dark:text-dark-text"
                      >
                        Newsletter
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[#f7ff00] dark:text-dark-text mb-2 font-medium">
                    Display Theme
                  </label>
                  <select
                    className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f7ff00] cursor-pointer"
                    defaultValue="system"
                  >
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                    <option value="system">System Preference</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-6 flex gap-4 justify-end">
              <button
                type="button"
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                className="pixel-borders pixel-borders-[#f7ff00] h-10 px-6 font-bold text-white transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
