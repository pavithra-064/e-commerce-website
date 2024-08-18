import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCartItems } from "../utils/cartUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ onSearch }) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const updateCartCount = () => {
    const cartItems = getCartItems();
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartItemCount(totalItems);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <nav className="bg-gray-800 p-4 px-10 flex items-center justify-between">
      <div className="text-white text-xl font-semibold">
        <Link to="/">Profile.fyi</Link>
      </div>
      <div className="relative mx-4 w-[30rem]">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 px-4 rounded-md border border-gray-300"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
      </div>

      <div className="text-white text-xl relative">
        <Link to="/mycart">
          My Cart
          <FontAwesomeIcon icon={faShoppingCart} className="pl-2" />{" "}
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-[0.3rem] py-[0.1rem] text-xs">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
