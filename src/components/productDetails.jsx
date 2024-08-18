import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../utils/cartUtils";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "../components/navbar"; 

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

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setIsLoading] = useState(true); 

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setIsLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen font-semibold text-xl">
          Loading...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen font-semibold text-xl">
        Product not found
      </div>
    );
  }

  const imageUrls = parseImages(product.images);
  const mainImage = imageUrls[0];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-10 md:px-20 py-10 flex flex-col">
        <Link to="/" className="text-gray-700 flex items-center mb-6">
          <FaArrowLeft className="mr-2" />
          All Products
        </Link>
        <div className="flex flex-col md:flex-row">
          <div className="w-[10rem] md:w-[30rem] pr-10">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-1/2 md:pl-10 pt-10">
            <h1 className="text-xl md:text-3xl font-bold mb-4">
              {product.title}
            </h1>
            <p className="text-gray-600 mb-4">
              ₹{parseInt(product.price) * 10}.00
            </p>
            <p className="text-gray-700 mb-8">{product.description}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
