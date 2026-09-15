import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Owning seller 
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    // Matches "Product Caption" field in the SellProduct form
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    // Product image stored as a URL or a base64 data URL string.
    image: {
      type: String,
      default: "",
    },

    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },

    // Whether raw material or finished product
    type: {
      type: String,
      enum: ["finished_product", "raw_material"],
      default: "finished_product",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Speed up catalog search/filter
productSchema.index({ name: "text", description: "text", category: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;
