import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

//  the logged-in user's cart, populated
const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  return cart;
};

// GET MY CART
export const getCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.userId);
    await cart.populate("items.product");

    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};


// ADD ITEM TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = await getOrCreateCart(req.user.userId);

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({ product: productId, quantity: Number(quantity) });
    }

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
};


// UPDATE CART ITEM QUANTITY
export const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await getOrCreateCart(req.user.userId);
    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    item.quantity = Number(quantity);
    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update cart item" });
  }
};


// REMOVE ITEM FROM CART
export const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await getOrCreateCart(req.user.userId);
    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove cart item" });
  }
};


// CLEAR CART
export const clearCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.userId);
    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};
