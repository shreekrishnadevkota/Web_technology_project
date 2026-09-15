// Shared types matching the Express/Mongoose backend response shapes.

export interface SellerInfo {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  sellerProfile?: {
    shopName?: string;
    bio?: string;
    customPrintEnabled?: boolean;
  };
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  type: "finished_product" | "raw_material";
  isActive: boolean;
  seller: SellerInfo | string;
  createdAt?: string;
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
}

export interface OrderItem {
  _id: string;
  product: string;
  seller: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  buyer: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  contactPhone: string;
  paymentMethod: "cash_on_delivery";
  paymentStatus: "unpaid" | "paid";
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}

export interface CustomOrder {
  _id: string;
  customer: SellerInfo | string;
  seller: SellerInfo | string;
  title: string;
  description: string;
  material?: string;
  dimensions?: string;
  referenceImage?: string;
  quotedPrice: number | null;
  sellerNote?: string;
  status:
    | "pending"
    | "quoted"
    | "accepted"
    | "rejected"
    | "in_progress"
    | "completed"
    | "cancelled";
  createdAt: string;
}

// Product categories used consistently across SellProduct, Shop, Home,
// CategoryCart and Categories pages.
export const PRODUCT_CATEGORIES = [
  "Home & Decor",
  "Figures & Toys",
  "Office",
  "Accessories",
];

// Helper to read a display-friendly seller name off a populated seller.
export const sellerDisplayName = (
  seller: SellerInfo | string | undefined
): string => {
  if (!seller || typeof seller === "string") return "Unknown Seller";
  return seller.sellerProfile?.shopName || seller.name || "Unknown Seller";
};

// Fallback placeholder image when a product has no image yet.
export const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&q=60";
