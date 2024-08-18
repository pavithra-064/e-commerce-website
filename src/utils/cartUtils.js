export const getCartItems = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const updateCartItemQuantity = (id, quantity) => {
  const cart = getCartItems();
  const updatedCart = cart.map((item) =>
    item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
  );
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const removeCartItem = (id) => {
  const cart = getCartItems();
  const updatedCart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const addToCart = (product) => {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProductIndex = cartItems.findIndex(
    (item) => item.id === product.id
  );
  if (existingProductIndex !== -1) {
    cartItems[existingProductIndex].quantity += 1;
  } else {
    product.quantity = 1;
    cartItems.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cartItems));
  const cartUpdatedEvent = new Event("cartUpdated");
  window.dispatchEvent(cartUpdatedEvent);
  alert("Item added to cart");
};
