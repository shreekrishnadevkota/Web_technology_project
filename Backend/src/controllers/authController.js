import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


// REGISTER

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "buyer",
    });

    res.status(201).json({
      message: "Registration successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Registration failed",
    });
  }
};


// LOGIN

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Store token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Login failed",
    });
  }
};


// LOGOUT

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.status(200).json({
    message: "Logout successful",
  });
};


// GET CURRENT USER

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get user",
    });
  }
};


// SWITCH BUYER / SELLER (one-click toggle)
export const switchRole = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role === "buyer") {
      if (!user.sellerProfile?.completed) {
        return res.status(400).json({
          message: "Please complete the one-time seller registration first",
          needsSellerRegistration: true,
        });
      }

      user.role = "seller";
    } else {
      user.role = "buyer";
    }

    await user.save();

    res.status(200).json({
      message: `You are now a ${user.role}`,
      role: user.role,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to switch role",
    });
  }
};


// ONE-TIME SELLER REGISTRATION
export const becomeSeller = async (req, res) => {
  try {
    const { shopName, bio, customPrintEnabled } = req.body;

    if (!shopName || !shopName.trim()) {
      return res.status(400).json({
        message: "Shop / seller name is required",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.sellerProfile = {
      completed: true,
      shopName: shopName.trim(),
      bio: bio ? bio.trim() : "",
      customPrintEnabled: Boolean(customPrintEnabled),
      registeredAt: user.sellerProfile?.registeredAt || new Date(),
    };
    user.role = "seller";

    await user.save();

    const safeUser = user.toObject();
    delete safeUser.password;

    res.status(200).json({
      message: "Seller registration complete. You are now a seller.",
      user: safeUser,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to complete seller registration",
    });
  }
};


// UPDATE SELLER SETTINGS (e.g. toggle custom print acceptance, FR-07)

export const updateSellerProfile = async (req, res) => {
  try {
    const { shopName, bio, customPrintEnabled } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.sellerProfile?.completed) {
      return res.status(400).json({
        message: "Complete seller registration before updating seller settings",
      });
    }

    if (shopName !== undefined) user.sellerProfile.shopName = shopName.trim();
    if (bio !== undefined) user.sellerProfile.bio = bio.trim();
    if (customPrintEnabled !== undefined) {
      user.sellerProfile.customPrintEnabled = Boolean(customPrintEnabled);
    }

    await user.save();

    const safeUser = user.toObject();
    delete safeUser.password;

    res.status(200).json({
      message: "Seller settings updated",
      user: safeUser,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update seller settings",
    });
  }
};


// LIST SELLERS ACCEPTING CUSTOM PRINT ORDERS
export const getCustomPrintSellers = async (req, res) => {
  try {
    const sellers = await User.find({
      "sellerProfile.completed": true,
      "sellerProfile.customPrintEnabled": true,
    }).select("name sellerProfile.shopName sellerProfile.bio");

    res.status(200).json({ sellers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch sellers" });
  }
};


// EDIT PROFILE

export const updateProfile = async (req, res) => {
  try {
    // Bug fix: the JWT payload only contains "userId", not "_id"
    const userId = req.user.userId;

    const { name, phone, location } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        name,
        phone,
        location,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};
