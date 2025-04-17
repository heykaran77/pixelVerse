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
    <div className="container mx-auto px-4 py-8">
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
            <h1 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text text-center md:text-left">
              {currentUser?.displayName ||
                currentUser?.email?.split("@")[0] ||
                "User"}
            </h1>
            <p className="text-light-muted dark:text-dark-muted mb-4 text-center md:text-left">
              {currentUser?.email}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <p className="text-light-primary dark:text-dark-primary font-bold text-xl">
                  {userStats.joined}
                </p>
                <p className="text-light-muted dark:text-dark-muted text-sm">
                  Joined
                </p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <p className="text-light-primary dark:text-dark-primary font-bold text-xl">
                  {userStats.totalValue}
                </p>
                <p className="text-light-muted dark:text-dark-muted text-sm">
                  Collection Value
                </p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <p className="text-light-primary dark:text-dark-primary font-bold text-xl">
                  {userStats.items}
                </p>
                <p className="text-light-muted dark:text-dark-muted text-sm">
                  Items
                </p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <p className="text-light-primary dark:text-dark-primary font-bold text-xl">
                  #{userStats.rank}
                </p>
                <p className="text-light-muted dark:text-dark-muted text-sm">
                  Collector Rank
                </p>
              </div>
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
              : "text-light-muted dark:text-dark-muted"
          }`}
          onClick={() => setActiveTab("collection")}
        >
          Collection
        </button>
        <button
          className={`px-6 py-3 font-medium text-lg ${
            activeTab === "activity"
              ? "text-light-primary dark:text-dark-primary border-b-2 border-light-primary dark:border-dark-primary"
              : "text-light-muted dark:text-dark-muted"
          }`}
          onClick={() => setActiveTab("activity")}
        >
          Activity
        </button>
        <button
          className={`px-6 py-3 font-medium text-lg ${
            activeTab === "settings"
              ? "text-light-primary dark:text-dark-primary border-b-2 border-light-primary dark:border-dark-primary"
              : "text-light-muted dark:text-dark-muted"
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

            <p className="text-light-text dark:text-dark-text">
              Showing {getDisplayedNFTs().length} of {ownedNFTs.length} items
            </p>
          </div>

          {/* NFT Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {getDisplayedNFTs().map((nft) => (
              <Link
                to={`/product/${nft.id}`}
                key={nft.id}
                className="bg-gray-800 pixel-borders overflow-hidden rounded-lg transition-transform hover:scale-[1.02]"
              >
                <div className="p-4 bg-gray-700 aspect-square flex items-center justify-center">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="max-h-full image-pixelated object-contain"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-light-text dark:text-dark-text">
                      {nft.name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${getRarityClass(
                        nft.rarity
                      )}`}
                    >
                      {nft.rarity}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-light-muted dark:text-dark-muted text-sm">
                      {nft.collection}
                    </p>
                    <p className="text-light-primary dark:text-dark-primary font-bold">
                      {nft.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {getDisplayedNFTs().length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-light-muted dark:text-dark-muted mb-4">
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
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
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
                <p className="text-light-muted dark:text-dark-muted text-sm">
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
                <p className="text-light-muted dark:text-dark-muted text-sm">
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
                <p className="text-light-muted dark:text-dark-muted text-sm">
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
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
            Account Settings
          </h2>

          <form className="space-y-6">
            <div>
              <label className="block text-light-text dark:text-dark-text mb-2 font-medium">
                Display Name
              </label>
              <input
                type="text"
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary"
                defaultValue={
                  currentUser?.displayName ||
                  currentUser?.email?.split("@")[0] ||
                  ""
                }
                placeholder="Enter your display name"
              />
            </div>

            <div>
              <label className="block text-light-text dark:text-dark-text mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary"
                defaultValue={currentUser?.email || ""}
                placeholder="Enter your email"
                disabled
              />
              <p className="text-light-muted dark:text-dark-muted text-sm mt-1">
                Email cannot be changed
              </p>
            </div>

            <div>
              <label className="block text-light-text dark:text-dark-text mb-2 font-medium">
                Bio
              </label>
              <textarea
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary min-h-[100px]"
                placeholder="Tell us about yourself"
                defaultValue="Pixel art enthusiast and NFT collector. Always on the lookout for unique digital assets!"
              />
            </div>

            <button
              type="button"
              className="w-full pixel-borders pixel-borders-primary h-12 font-bold text-white transition-colors"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
