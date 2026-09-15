import CustomOrder from "../models/CustomOrder.js";
import User from "../models/User.js";
import { uploadImageToImageKit } from "../utils/imagekit.js";

// CREATE CUSTOM PRINT REQUEST (customer).
export const createCustomOrder = async (req, res) => {
  try {
    const { sellerId, title, description, material, dimensions } = req.body;
    let { referenceImage } = req.body;

    if (!sellerId || !title || !description) {
      return res.status(400).json({
        message: "sellerId, title and description are required",
      });
    }

    // A seller may be flipped back to "buyer" mode later, but their
    const seller = await User.findById(sellerId);

    if (!seller || !seller.sellerProfile?.completed) {
      return res.status(404).json({ message: "Seller not found" });
    }

    if (!seller.sellerProfile?.customPrintEnabled) {
      return res.status(400).json({
        message: "This seller is not currently accepting custom print orders",
      });
    }

    // Optional reference image / design upload (multipart via multer)
    if (req.file) {
      const uploaded = await uploadImageToImageKit(req.file, "custom-orders");
      referenceImage = uploaded.url;
    }

    const customOrder = await CustomOrder.create({
      customer: req.user.userId,
      seller: sellerId,
      title,
      description,
      material: material || "",
      dimensions: dimensions || "",
      referenceImage: referenceImage || "",
    });

    res.status(201).json({
      message: "Custom print request submitted",
      customOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit custom print request" });
  }
};


// GET MY CUSTOM PRINT REQUESTS (customer)
export const getMyCustomOrders = async (req, res) => {
  try {
    const customOrders = await CustomOrder.find({
      customer: req.user.userId,
    })
      .populate("seller", "name sellerProfile.shopName")
      .sort({ createdAt: -1 });

    res.status(200).json({ customOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch custom print requests" });
  }
};


// GET CUSTOM PRINT REQUESTS RECEIVED (seller)
export const getSellerCustomOrders = async (req, res) => {
  try {
    const customOrders = await CustomOrder.find({
      seller: req.user.userId,
    })
      .populate("customer", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({ customOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch custom print requests" });
  }
};


// SELLER QUOTES A PRICE — FR-08
export const quoteCustomOrder = async (req, res) => {
  try {
    const { quotedPrice, sellerNote } = req.body;

    if (quotedPrice === undefined || Number(quotedPrice) < 0) {
      return res.status(400).json({ message: "A valid quotedPrice is required" });
    }

    const customOrder = await CustomOrder.findById(req.params.id);

    if (!customOrder) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (customOrder.seller.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only quote requests sent to you",
      });
    }

    customOrder.quotedPrice = Number(quotedPrice);
    customOrder.sellerNote = sellerNote || "";
    customOrder.status = "quoted";

    await customOrder.save();

    res.status(200).json({ message: "Quote sent", customOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send quote" });
  }
};


// CUSTOMER ACCEPTS / REJECTS THE QUOTE
export const respondToQuote = async (req, res) => {
  try {
    const { accept } = req.body;

    const customOrder = await CustomOrder.findById(req.params.id);

    if (!customOrder) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (customOrder.customer.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "This is not your request",
      });
    }

    if (customOrder.status !== "quoted") {
      return res.status(400).json({
        message: "This request does not have a pending quote",
      });
    }

    customOrder.status = accept ? "accepted" : "rejected";
    await customOrder.save();

    res.status(200).json({
      message: accept ? "Quote accepted" : "Quote rejected",
      customOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to respond to quote" });
  }
};


// SELLER UPDATES PROGRESS STATUS (in_progress / completed / cancelled)
export const updateCustomOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["in_progress", "completed", "cancelled"];

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const customOrder = await CustomOrder.findById(req.params.id);

    if (!customOrder) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (customOrder.seller.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only update requests sent to you",
      });
    }

    customOrder.status = status;
    await customOrder.save();

    res.status(200).json({ message: "Status updated", customOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update status" });
  }
};
