import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../utils/cartUtils";

const parseImages = (images) => {
  try {
    if (typeof images === "string") {
      const cleanedImages = images
        .replace(/^\["/, "")
        .replace(/"]$/, "")
        .replace(/\\/g, "")
        .split('","');
      return cleanedImages.filter((url) => url.startsWith("http"));
    }
    if (Array.isArray(images)) {
      return images.filter((url) => url.startsWith("http"));
    }
    return [];
  } catch (e) {
    console.error("Error parsing images:", e);
    return [];
  }
};

const ProductCard = ({ product }) => {
  const imageUrls = parseImages(product.images);
  if (imageUrls.length === 0) {
    return null;
  }

  const mainImage = imageUrls[0];

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border-2 border-neutral-100">
      <Link to={`/product/${product.id}`}>
        <img
          src={mainImage}
          alt={product.title}
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <div className="flex justify-between">
          <p className="text-gray-600 mt-2">
            ₹{parseInt(product.price) * 10}.00
          </p>
          <div className="mt-2">
            <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
              {product.category?.name || "No Category"}
            </span>
          </div>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
