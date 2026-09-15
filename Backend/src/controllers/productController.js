import Product from "../models/Product.js";
import { uploadImageToImageKit } from "../utils/imagekit.js";

// CREATE PRODUCT (seller only)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, type } = req.body;
    let { image } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message: "Name, description, price and category are required",
      });
    }

    if (Number(price) < 0) {
      return res.status(400).json({
        message: "Price cannot be negative",
      });
    }

    // If an image file was uploaded
    if (req.file) {
      const uploaded = await uploadImageToImageKit(req.file, "products");
      image = uploaded.url;
    }

    const product = await Product.create({
      seller: req.user.userId,
      name,
      description,
      price,
      category,
      image: image || "",
      stock: stock !== undefined ? stock : 0,
      type: type || "finished_product",
    });

    res.status(201).json({
      message: "Product listed successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create product",
    });
  }
};


// GET PRODUCTS 
export const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      type,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = { isActive: true };

    if (search) {
      filter.$text = { $search: search };
    }

    if (category) {
      filter.category = category;
    }

    if (type) {
      filter.type = type;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sortOption = { createdAt: -1 };
    if (sort === "price_asc") sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };
    if (sort === "newest") sortOption = { createdAt: -1 };

    const pageNum = Math.max(Number(page), 1);
    const limitNum = Math.min(Math.max(Number(limit), 1), 100);

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("seller", "name sellerProfile.shopName")
        .sort(sortOption)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Product.countDocuments(filter),
    ]);

    res.status(200).json({
      products,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum) || 1,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};


// GET SINGLE PRODUCT (public)
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name sellerProfile.shopName sellerProfile.customPrintEnabled"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};


// GET MY PRODUCTS (seller only) — for the seller dashboard
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch your products" });
  }
};


// UPDATE PRODUCT (seller only, and only their own product)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only edit your own products",
      });
    }

    const { name, description, price, category, image, stock, type, isActive } =
      req.body;

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (image !== undefined) product.image = image;

    // Replace the image if a new file was uploaded
    if (req.file) {
      const uploaded = await uploadImageToImageKit(req.file, "products");
      product.image = uploaded.url;
    }

    if (stock !== undefined) product.stock = stock;
    if (type !== undefined) product.type = type;
    if (isActive !== undefined) product.isActive = isActive;

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update product" });
  }
};


// DELETE PRODUCT (seller only, and only their own product)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only delete your own products",
      });
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};
