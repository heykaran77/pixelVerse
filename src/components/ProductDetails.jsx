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
    <>
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
                      ? "from-yellow-500 via-amber-400 to-yellow-600"
                      : product.rarity === "Very Rare"
                      ? "from-purple-500 via-indigo-400 to-purple-600"
                      : product.rarity === "Rare"
                      ? "from-blue-500 via-sky-400 to-blue-600"
                      : product.rarity === "Trending"
                      ? "from-orange-500 via-amber-400 to-orange-600"
                      : "from-gray-500 via-slate-400 to-gray-600"
                  } transition-opacity duration-300 group-hover:opacity-20`}
                ></div>

                {/* Animated particles for legendary and very rare items */}
                {(product.rarity === "Legendary" ||
                  product.rarity === "Very Rare") && (
                  <>
                    <div
                      className="absolute h-1 w-1 rounded-full animate-ping top-4 left-4 opacity-75"
                      style={{
                        backgroundColor:
                          product.rarity === "Legendary"
                            ? "#F59E0B"
                            : "#8B5CF6",
                        animationDuration: "1.5s",
                        animationDelay: "0.2s",
                      }}
                    ></div>
                    <div
                      className="absolute h-1 w-1 rounded-full animate-ping bottom-4 right-12 opacity-75"
                      style={{
                        backgroundColor:
                          product.rarity === "Legendary"
                            ? "#F59E0B"
                            : "#8B5CF6",
                        animationDuration: "2s",
                        animationDelay: "0.5s",
                      }}
                    ></div>
                    <div
                      className="absolute h-1 w-1 rounded-full animate-ping top-12 right-4 opacity-75"
                      style={{
                        backgroundColor:
                          product.rarity === "Legendary"
                            ? "#F59E0B"
                            : "#8B5CF6",
                        animationDuration: "1.8s",
                        animationDelay: "0.8s",
                      }}
                    ></div>
                  </>
                )}

                <p className="text-sm text-light-muted dark:text-dark-muted mb-1 font-medium">
                  Rarity
                </p>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full animate-pulse shadow-lg ${
                      product.rarity === "Legendary"
                        ? "bg-yellow-500 shadow-yellow-500/50"
                        : product.rarity === "Very Rare"
                        ? "bg-purple-500 shadow-purple-500/50"
                        : product.rarity === "Rare"
                        ? "bg-blue-500 shadow-blue-500/50"
                        : product.rarity === "Trending"
                        ? "bg-orange-500 shadow-orange-500/50"
                        : "bg-gray-500 shadow-gray-500/50"
                    }`}
                  ></div>
                  <p
                    className={`text-2xl font-bold relative ${
                      product.rarity === "Legendary"
                        ? "bg-gradient-to-r from-yellow-500 via-amber-300 to-yellow-600"
                        : product.rarity === "Very Rare"
                        ? "bg-gradient-to-r from-purple-500 via-indigo-300 to-purple-600"
                        : product.rarity === "Rare"
                        ? "bg-gradient-to-r from-blue-500 via-sky-300 to-blue-600"
                        : product.rarity === "Trending"
                        ? "bg-gradient-to-r from-orange-500 via-amber-300 to-orange-600"
                        : "bg-gradient-to-r from-gray-500 via-slate-300 to-gray-600"
                    } bg-clip-text text-transparent`}
                  >
                    {product.rarity}
                    {product.rarity === "Legendary" && (
                      <span className="absolute -top-1 -right-6 text-yellow-500 text-sm animate-bounce">
                        ★
                      </span>
                    )}
                  </p>
                </div>

                {/* Rarity badge for legendary and very rare items */}
                {(product.rarity === "Legendary" ||
                  product.rarity === "Very Rare") && (
                  <div
                    className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded ${
                      product.rarity === "Legendary"
                        ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/50"
                        : "bg-purple-500/20 text-purple-500 border border-purple-500/50"
                    }`}
                  >
                    {product.rarity === "Legendary" ? "★★★" : "★★"}
                  </div>
                )}

                <div className="absolute -bottom-6 -right-6 w-12 h-12 opacity-10 group-hover:opacity-30 transition-opacity duration-300 transform group-hover:rotate-12 transition-transform">
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
                        allCards.find((card) =>
                          card.tags.includes("pixaWeapon")
                        )?.image
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

      {/* Footer Section */}
      <footer className="bg-[#0c0c0c] dark:bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-4">PixelVerse</h3>
              <p className="text-gray-400">
                Discover, collect, and trade unique pixel art NFTs in our
                vibrant digital marketplace.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://x.com/heykaran77"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/heykaran77"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://github.com/heykaran77"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/heykaran77"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 bi bi-linkedin"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Collections Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Collections</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/pixa-character"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    PixaCharacters
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pixa-weapon"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    PixaWeapons
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pixa-punk"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    PixaPunks
                  </Link>
                </li>
                <li>
                  <Link
                    to="/marketplace"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    All Collections
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Help</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Getting Started
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Discord Community
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for the latest updates and exclusive
                offers.
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                />
                <button className="pixel-borders pixel-borders-primary px-4 py-2 w-full">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 mt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2024 PixelVerse. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ProductDetails;
