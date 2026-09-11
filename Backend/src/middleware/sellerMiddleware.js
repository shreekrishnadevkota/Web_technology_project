import User from "../models/User.js";

const sellerMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role !== "seller") {
      return res.status(403).json({
        message: "Only sellers can access this resource",
      });
    }

    next();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Authorization failed",
    });
  }
};

export default sellerMiddleware;