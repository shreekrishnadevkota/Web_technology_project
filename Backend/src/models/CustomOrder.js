import mongoose from "mongoose";

// Custom print order / quote request (FR-05, FR-07, FR-08)
const customOrderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Please give the request a short title"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Please describe what you want printed"],
      trim: true,
    },

    material: {
      type: String,
      trim: true,
      default: "",
    },

    dimensions: {
      type: String,
      trim: true,
      default: "",
    },

    // Optional reference image/design (URL or base64 data URL)
    referenceImage: {
      type: String,
      default: "",
    },

    // Seller-set price for this specific request (FR-08)
    quotedPrice: {
      type: Number,
      default: null,
    },

    sellerNote: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "pending", // waiting for seller to quote
        "quoted", // seller has proposed a price
        "accepted", // customer accepted the quote
        "rejected", // customer rejected the quote
        "in_progress",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const CustomOrder = mongoose.model("CustomOrder", customOrderSchema);

export default CustomOrder;
