import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

// PLACE ORDER (checkout)
export const placeOrder = async (req, res) => {
  try {
    const { shippingAddress, contactPhone } = req.body;

    if (!shippingAddress || !contactPhone) {
      return res.status(400).json({
        message: "Shipping address and contact phone are required",
      });
    }

    const cart = await Cart.findOne({ user: req.user.userId }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of cart.items) {
      const product = item.product;

      if (!product || !product.isActive) {
        return res.status(400).json({
          message: `Product "${product?.name || "unknown"}" is no longer available`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for "${product.name}"`,
        });
      }

      orderItems.push({
        product: product._id,
        seller: product.seller,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
      });

      totalAmount += product.price * item.quantity;

      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      buyer: req.user.userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      contactPhone,
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully (Cash on Delivery)",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to place order" });
  }
};


// GET MY ORDERS (buyer)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};


// GET ORDERS FOR THE LOGGED-IN SELLER
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      "items.seller": req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};


// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const sellsInThisOrder = order.items.some(
      (item) => item.seller.toString() === req.user.userId
    );

    if (!sellsInThisOrder) {
      return res.status(403).json({
        message: "You do not have items in this order",
      });
    }

    const allowedStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (status) {
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      order.status = status;
    }

    if (paymentStatus) {
      if (!["unpaid", "paid"].includes(paymentStatus)) {
        return res.status(400).json({ message: "Invalid payment status value" });
      }
      order.paymentStatus = paymentStatus;
    }

    await order.save();

    res.status(200).json({ message: "Order updated", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update order" });
  }
};
