import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaHeart, FaShareAlt } from "react-icons/fa";

const ProductDetails = ({ allCards }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [collectionCounts, setCollectionCounts] = useState({
    pixaChar: 0,
    pixaWeapon: 0,
    pixaPunk: 0,
  });

  useEffect(() => {
    // Calculate collection counts
    setCollectionCounts({
      pixaChar: allCards.filter((card) => card.tags.includes("pixaChar"))
        .length,
      pixaWeapon: allCards.filter((card) => card.tags.includes("pixaWeapon"))
        .length,
      pixaPunk: allCards.filter((card) => card.tags.includes("pixaPunk"))
        .length,
    });

    // Find the product based on the ID
    const foundProduct = allCards.find((card) => card.id === parseInt(id));
    setProduct(foundProduct);

    // Set initial bid amount to product price
    if (foundProduct) {
      setBidAmount(parseFloat(foundProduct.price));

      // Find related products (same tag, excluding current product)
      const related = allCards
        .filter(
          (card) =>
            card.id !== parseInt(id) &&
            card.tags.some((tag) => foundProduct.tags.includes(tag))
        )
        .slice(0, 3);
      setRelatedProducts(related);
    }
  }, [id, allCards]);

  // Hide notification after 3 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-16">
        <p>Loading...</p>
      </div>
    );
  }

  const handleBidChange = (e) => {
    const value = parseFloat(e.target.value);
    setBidAmount(value);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowNotification(true);
  };

  return (
    <div className="container mx-auto px-4 pt-32 pb-16">
      {/* Notification Toast */}
      <div
        className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          showNotification
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium text-gray-900 dark:text-white">
              Link copied to clipboard!
            </span>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Image */}
        <div className="featured-card p-6 bg-[#0c0c0c] dark:bg-gray-800">
          <div className="relative aspect-square bg-gray-800 dark:bg-gray-700 overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-contain p-4 image-pixelated ${
                product.rounded ? "rounded-2xl" : ""
              }`}
            />
            {/* Tags Container */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <span
                className={`rarity-pill bg-gradient-to-r ${product.tagColor}`}
              >
                {product.rarity}
              </span>
              {product.tags?.map((tag) => (
                <span
                  key={tag}
                  className={`rarity-pill bg-gradient-to-r ${
                    tag === "pixaChar"
                      ? "from-pink-500/50 to-pink-600/50"
                      : tag === "pixaWeapon"
                      ? "from-amber-500/50 to-amber-600/50"
                      : "from-cyan-500/50 to-cyan-600/50"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-light-text dark:text-dark-text">
                {product.name}
              </h1>
              <p className="text-light-muted dark:text-dark-muted">
                Created by Artist #{product.id}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={toggleFavorite}
                className={`p-3 rounded-full ${
                  isFavorite
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                } transition-colors duration-200`}
              >
                <FaHeart className="w-6 h-6" />
              </button>
              <button
                onClick={handleShare}
                className="p-3 rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <FaShareAlt className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="pixel-borders p-4">
              <p className="text-sm text-light-muted dark:text-dark-muted mb-1">
                Current Price
              </p>
              <p className="text-2xl font-bold text-light-primary dark:text-dark-primary">
                {product.price} ETH
              </p>
            </div>
            <div className="pixel-borders p-4 group hover:scale-[1.02] transition-transform duration-300 cursor-pointer relative overflow-hidden">
              <div
                className={`absolute inset-0 opacity-10 bg-gradient-to-r ${
                  product.rarity === "Legendary"
                    ? "from-yellow-500 to-yellow-600"
                    : product.rarity === "Very Rare"
                    ? "from-purple-500 to-purple-600"
                    : product.rarity === "Rare"
                    ? "from-blue-500 to-blue-600"
                    : product.rarity === "Trending"
                    ? "from-orange-500 to-orange-600"
                    : "from-gray-500 to-gray-600"
                } transition-opacity duration-300 group-hover:opacity-20`}
              ></div>
              <p className="text-sm text-light-muted dark:text-dark-muted mb-1">
                Rarity
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full animate-pulse ${
                    product.rarity === "Legendary"
                      ? "bg-yellow-500"
                      : product.rarity === "Very Rare"
                      ? "bg-purple-500"
                      : product.rarity === "Rare"
                      ? "bg-blue-500"
                      : product.rarity === "Trending"
                      ? "bg-orange-500"
                      : "bg-gray-500"
                  }`}
                ></div>
                <p
                  className={`text-2xl font-bold ${
                    product.rarity === "Legendary"
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                      : product.rarity === "Very Rare"
                      ? "bg-gradient-to-r from-purple-500 to-purple-600"
                      : product.rarity === "Rare"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600"
                      : product.rarity === "Trending"
                      ? "bg-gradient-to-r from-orange-500 to-orange-600"
                      : "bg-gradient-to-r from-gray-500 to-gray-600"
                  } bg-clip-text text-transparent`}
                >
                  {product.rarity}
                </p>
              </div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-full h-full ${
                    product.rarity === "Legendary"
                      ? "text-yellow-500"
                      : product.rarity === "Very Rare"
                      ? "text-purple-500"
                      : product.rarity === "Rare"
                      ? "text-blue-500"
                      : product.rarity === "Trending"
                      ? "text-orange-500"
                      : "text-gray-500"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-1.088.164.75.75 0 0 0-.37.11 1.5 1.5 0 0 0-.747 1.342V19.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-8.134a1.5 1.5 0 0 0-.747-1.342.75.75 0 0 0-.37-.11A3 3 0 0 0 17.25 9.75v-3A5.25 5.25 0 0 0 12 1.5Zm-.75 12.75v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0ZM12 3a3.75 3.75 0 0 0-3.75 3.75v3a1.5 1.5 0 0 0 1.5 1.5h4.5a1.5 1.5 0 0 0 1.5-1.5v-3A3.75 3.75 0 0 0 12 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Bid Section */}
          <div className="pixel-borders p-6">
            <h3 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">
              Place a Bid
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-light-muted dark:text-dark-muted mb-2">
                  Bid Amount (ETH)
                </label>
                <input
                  type="range"
                  min={parseFloat(product.price)}
                  max={parseFloat(product.price) * 2}
                  step="0.1"
                  value={bidAmount}
                  onChange={handleBidChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <p className="text-2xl font-bold mt-2 text-light-primary dark:text-dark-primary">
                  {bidAmount.toFixed(1)} ETH
                </p>
              </div>
              <button className="pixel-borders pixel-borders-primary px-4 py-3 w-full text-lg font-medium">
                Place Bid
              </button>
            </div>
          </div>

          {/* Product Description */}
          <div className="pixel-borders p-6">
            <h3 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">
              Description
            </h3>
            <p className="text-light-muted dark:text-dark-muted">
              A unique {product.tags[0]} from the PixelVerse collection. This
              piece features exceptional pixel art detail and is part of our{" "}
              {product.rarity} tier.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">
            Related{" "}
            {product.tags.includes("pixaChar")
              ? "PixaCharacters"
              : product.tags.includes("pixaWeapon")
              ? "PixaWeapons"
              : "PixaPunks"}
          </h2>
          {product.tags.includes("pixaChar") &&
            collectionCounts.pixaChar > 6 && (
              <Link
                to="/pixa-character"
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
              </Link>
            )}
          {product.tags.includes("pixaWeapon") &&
            collectionCounts.pixaWeapon > 6 && (
              <Link
                to="/pixa-weapon"
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
              </Link>
            )}
          {product.tags.includes("pixaPunk") &&
            collectionCounts.pixaPunk > 6 && (
              <Link
                to="/pixa-punk"
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
              </Link>
            )}
        </div>
        <div className="flex overflow-x-auto pb-6 gap-4 md:gap-6 hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.map((card) => (
            <Link
              to={`/product/${card.id}`}
              key={card.id}
              className="block flex-shrink-0 w-[280px] md:w-auto"
              onClick={() => {
                // Reset scroll position when navigating to a new product
                window.scrollTo(0, 0);
                // Update the product and bid amount when navigating
                setProduct(card);
                setBidAmount(parseFloat(card.price));
              }}
            >
              <div className="featured-card p-6 bg-[#0c0c0c] dark:bg-gray-800">
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
                    {card.tags?.map((tag) => (
                      <span
                        key={tag}
                        className={`rarity-pill bg-gradient-to-r ${
                          tag === "pixaChar"
                            ? "from-pink-500/50 to-pink-600/50"
                            : tag === "pixaWeapon"
                            ? "from-amber-500/50 to-amber-600/50"
                            : "from-cyan-500/50 to-cyan-600/50"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
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

                {/* Buttons Container */}
                <div className="flex flex-col gap-3">
                  <button
                    className="pixel-borders pixel-borders-primary px-4 py-2 w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      setBidAmount(parseFloat(card.price));
                      setProduct(card);
                      window.scrollTo(0, 0);
                    }}
                  >
                    Place Bid
                  </button>
                  <button
                    className="pixel-borders pixel-borders-secondary px-4 py-2 w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo(0, 0);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Explore Collections Section */}
      <div className="mt-32">
        <h2 className="text-3xl font-bold mb-8 text-light-text dark:text-dark-text">
          Explore Collections
        </h2>
        <div className="flex overflow-x-auto pb-6 gap-4 md:gap-6 hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3">
          {/* PixaCharacters Collection */}
          {!product.tags.includes("pixaChar") && (
            <div className="featured-card group cursor-pointer flex-shrink-0 w-[280px] md:w-auto">
              <Link to="/pixa-character" className="block">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                  <img
                    src={
                      allCards.find(
                        (card) =>
                          card.tags.includes("pixaChar") &&
                          ["Legendary", "Very Rare"].includes(card.rarity) &&
                          [
                            "Birdie Spring Blossom",
                            "Corale",
                            "PumpkingPete",
                          ].includes(card.name)
                      )?.image ||
                      allCards.find((card) => card.tags.includes("pixaChar"))
                        ?.image
                    }
                    alt="PixaCharacters Collection"
                    className="w-full h-full object-cover image-pixelated transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      PixaCharacters
                    </h3>
                    <p className="text-white/80 mb-2">
                      Explore unique pixel art characters
                    </p>
                    {collectionCounts.pixaChar > 6 && (
                      <div className="flex items-center gap-2 text-white/90">
                        <span className="text-sm">
                          View all {collectionCounts.pixaChar} items
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* PixaWeapons Collection */}
          {!product.tags.includes("pixaWeapon") && (
            <div className="featured-card group cursor-pointer flex-shrink-0 w-[280px] md:w-auto">
              <Link to="/pixa-weapon" className="block">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                  <img
                    src={
                      allCards.find((card) => card.tags.includes("pixaWeapon"))
                        ?.image
                    }
                    alt="PixaWeapons Collection"
                    className="w-full h-full object-cover image-pixelated transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      PixaWeapons
                    </h3>
                    <p className="text-white/80 mb-2">
                      Discover powerful pixel weapons
                    </p>
                    {collectionCounts.pixaWeapon > 6 && (
                      <div className="flex items-center gap-2 text-white/90">
                        <span className="text-sm">
                          View all {collectionCounts.pixaWeapon} items
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* PixaPunks Collection */}
          {!product.tags.includes("pixaPunk") && (
            <div className="featured-card group cursor-pointer flex-shrink-0 w-[280px] md:w-auto">
              <Link to="/pixa-punk" className="block">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                  <img
                    src={
                      allCards.find((card) => card.tags.includes("pixaPunk"))
                        ?.image
                    }
                    alt="PixaPunks Collection"
                    className="w-full h-full object-cover image-pixelated transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      PixaPunks
                    </h3>
                    <p className="text-white/80 mb-2">
                      Browse cyberpunk-style collectibles
                    </p>
                    {collectionCounts.pixaPunk > 6 && (
                      <div className="flex items-center gap-2 text-white/90">
                        <span className="text-sm">
                          View all {collectionCounts.pixaPunk} items
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Leaderboards Section */}
      <div className="mt-32">
        <h2 className="text-3xl font-bold mb-12 text-light-text dark:text-dark-text">
          Leaderboards
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Collectors Leaderboard */}
          <div className="pixel-borders p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-light-text dark:text-dark-text">
                Top Collectors
              </h3>
              <button className="text-light-primary dark:text-dark-primary hover:opacity-80 transition-opacity text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {[
                { id: 1, name: "Collector #1", items: 42, value: "125.5" },
                { id: 2, name: "Collector #2", items: 38, value: "98.2" },
                { id: 3, name: "Collector #3", items: 35, value: "87.4" },
                { id: 4, name: "Collector #4", items: 31, value: "76.8" },
                { id: 5, name: "Collector #5", items: 28, value: "65.3" },
              ].map((collector, index) => (
                <div
                  key={collector.id}
                  className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === 0
                          ? "bg-yellow-500 text-black"
                          : index === 1
                          ? "bg-gray-300 text-black"
                          : index === 2
                          ? "bg-amber-600 text-black"
                          : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-bold text-light-text dark:text-dark-text">
                        {collector.name}
                      </p>
                      <p className="text-sm text-light-muted dark:text-dark-muted">
                        {collector.items} items
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-light-primary dark:text-dark-primary">
                    {collector.value} ETH
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Arts Leaderboard */}
          <div className="pixel-borders p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-light-text dark:text-dark-text">
                Top Arts
              </h3>
              <button className="text-light-primary dark:text-dark-primary hover:opacity-80 transition-opacity text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  name: "Legendary Dragon",
                  artist: "Artist #12",
                  value: "45.5",
                  image: "/path/to/art1.png",
                },
                {
                  id: 2,
                  name: "Mystic Sword",
                  artist: "Artist #8",
                  value: "38.2",
                  image: "/path/to/art2.png",
                },
                {
                  id: 3,
                  name: "Cyber Punk",
                  artist: "Artist #15",
                  value: "32.4",
                  image: "/path/to/art3.png",
                },
                {
                  id: 4,
                  name: "Golden Armor",
                  artist: "Artist #5",
                  value: "28.8",
                  image: "/path/to/art4.png",
                },
                {
                  id: 5,
                  name: "Crystal Staff",
                  artist: "Artist #20",
                  value: "25.3",
                  image: "/path/to/art5.png",
                },
              ].map((art, index) => (
                <div
                  key={art.id}
                  className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === 0
                          ? "bg-yellow-500 text-black"
                          : index === 1
                          ? "bg-gray-300 text-black"
                          : index === 2
                          ? "bg-amber-600 text-black"
                          : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-bold text-light-text dark:text-dark-text">
                        {art.name}
                      </p>
                      <p className="text-sm text-light-muted dark:text-dark-muted">
                        by {art.artist}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-light-primary dark:text-dark-primary">
                    {art.value} ETH
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
