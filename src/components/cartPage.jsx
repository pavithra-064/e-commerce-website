import React, { useState } from "react";
import {
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
} from "../utils/cartUtils";
import Navbar from "./navbar";

const CartPage = () => {
  const [cartItems, setCartItems] = useState(getCartItems());

  const handleQuantityChange = (id, quantity) => {
    updateCartItemQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleRemoveItem = (id) => {
    removeCartItem(id);
    setCartItems(getCartItems());
  };

  const discount = 0.1;
  const deliveryCharge = 5;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * 10 * item.quantity,
    0
  );

  const totalPrice = subtotal -  (subtotal*discount) + deliveryCharge;

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row px-20 py-10">
        <div className="w-full md:w-3/4 p-4 border-r border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border-b border-gray-200 py-4"
                >
                  <div className="flex flex-col">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-[6.5rem] h-[6.5rem] object-cover mr-4"
                    />
                    <div className="flex items-center mt-2">
                      <button
                        className="bg-gray-300 px-2 py-[0.2rem] rounded-md ml-1"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="mx-2 w-8 text-center border-2 border-gray-200"
                      />
                      <button
                        className="bg-gray-300 px-2 py-[0.2rem] rounded-md"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">₹{item.price * 10}.00</p>

                    <p className="text-gray-600 mt-1">
                      Total: ₹{(item.price * 10 * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className=" font-semibold uppercase p-2 mt-6 rounded-lg text-sm border border-red-500 hover:bg-red-100 "
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-full md:w-1/4 p-4 border-[1.2px] border-gray-700 min-h-48 absolute right-7">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="border-t border-gray-700 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Price:</span>
              <span className="text-gray-600">₹{subtotal.toFixed(2)}</span>
            </div>
            {subtotal > 0 && (
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Discount:</span>
                <span className="text-green-600">- ₹{discount.toFixed(2)}</span>
              </div>
            )}
            {subtotal > 0 && (
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Delivery Charge:</span>
                <span className="text-gray-600">
                  ₹{deliveryCharge.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-200 pt-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-semibold">
                {subtotal === 0 ? "0.00" : `₹${totalPrice.toFixed(2)}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
