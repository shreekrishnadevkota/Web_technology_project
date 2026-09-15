import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    // Active role. A user can switch between "buyer" and "seller"
    role: {
      type: String,
      enum: ["buyer", "seller"],
      default: "buyer",
    },

    // One-time seller registration data 
    sellerProfile: {
      completed: {
        type: Boolean,
        default: false,
      },
      shopName: {
        type: String,
        trim: true,
        default: "",
      },
      bio: {
        type: String,
        trim: true,
        default: "",
      },
      // sellers can enable/disable acceptance of custom print orders.
      customPrintEnabled: {
        type: Boolean,
        default: false,
      },
      registeredAt: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
