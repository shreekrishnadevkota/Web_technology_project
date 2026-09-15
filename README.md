# 3D Printed Product Selling Platform

🔗 **Live Demo:** [https://i will host and add here the link ](https://your-project-name.vercel.app)


A full-stack MERN application (MongoDB, Express, React, Node.js) that
lets sellers list 3D printed products and raw materials, and lets
buyers browse, search, add to cart, checkout (Cash on Delivery), and
request fully custom 3D print jobs from sellers who accept them.

This project was built as a semester Web Technology project.

---

## Tech Stack

**Frontend**
- React 18 + TypeScript (Vite)
- Tailwind CSS
- React Router
- Axios

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JWT authentication (HTTP-only cookies)
- bcryptjs (password hashing)
- Multer (file upload handling)
- ImageKit (cloud image storage/CDN)

> **Note:** This build intentionally does **not** integrate any payment
> gateway. Checkout is Cash on Delivery (COD) only.

---

## Features

- **Authentication** — register, login, logout with JWT stored in an
  HTTP-only cookie.
- **One-click role switching** — any user can switch between **Buyer**
  and **Seller** with a single click. The very first time a buyer
  becomes a seller they complete a short one-time seller registration
  form (shop name, bio, whether they accept custom print requests).
  After that, switching back and forth is instant.
- **Seller-only product listings** — only users currently in the
  seller role can create, edit, or delete product listings. Product
  images are uploaded via **Multer** and stored on **ImageKit**.
- **Live product catalog** — Home and Shop pages pull real listings
  from the database (no hardcoded/mock data), showing the seller who
  uploaded each product.
- **Search & category filters** — a working search bar and category
  tiles that filter the shop by keyword/category, backed by a
  MongoDB text index.
- **Cart & Checkout** — buyers add products to a personal cart, adjust
  quantities, and check out with a shipping address and phone number.
  Checkout creates a Cash-on-Delivery order and decrements stock.
- **Order history** — buyers can see all past orders with status
  (pending / processing / shipped / delivered / cancelled) and payment
  status.
- **Custom print requests** — buyers can submit a custom print request
  (with an optional reference image) to any seller who has custom
  printing enabled. The seller can review it from their Profile page
  and send back a price quote.
- **Seller dashboard (Profile page)** — sellers can view, edit, and
  delete their own product listings, and manage incoming custom print
  requests, all from their profile.

---

## Project Structure

```
web_technology_project/
├── Backend/
│   ├── server.js
│   └── src/
│       ├── app.js                 # Express app + route mounting
│       ├── db/db.js                # MongoDB connection
│       ├── models/                 # Mongoose schemas
│       │   ├── User.js
│       │   ├── Product.js
│       │   ├── Cart.js
│       │   ├── Order.js
│       │   └── CustomOrder.js
│       ├── controllers/            # Route handlers / business logic
│       ├── routes/                 # Express routers
│       ├── middleware/             # Auth, seller-only, file upload
│       └── utils/imagekit.js       # ImageKit upload helper
│
└── Frontend/
    └── src/
        ├── pages/                  # Route-level pages (Home, Shop, Cart, ...)
        ├── component/              # Reusable UI components (NavBar, ProductCard, Icons, ...)
        ├── axios/axios.ts          # Axios instance (baseURL, credentials)
        └── types.ts                # Shared TypeScript types
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB connection string (MongoDB Atlas or local)
- An ImageKit account (free tier is fine) for image uploads

### 1. Backend Setup

```bash
cd Backend
npm install
```

Create/update `Backend/.env`:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# ImageKit (replace with your own keys from
# https://imagekit.io/dashboard/developer/api-keys)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

Run the backend:

```bash
npm run dev
```

The API will be available at `http://localhost:3000/api`.

### 2. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## API Overview

| Area | Method & Route | Description |
|---|---|---|
| Auth | `POST /api/auth/register` | Create a new buyer account |
| Auth | `POST /api/auth/login` | Log in |
| Auth | `POST /api/auth/logout` | Log out |
| Auth | `GET /api/auth/me` | Get the logged-in user |
| Auth | `PUT /api/auth/profile` | Update name/phone/location |
| Auth | `PUT /api/auth/switch-role` | One-click buyer ⇄ seller toggle |
| Auth | `POST /api/auth/become-seller` | One-time seller registration |
| Auth | `PUT /api/auth/seller-profile` | Update shop name/bio/custom print setting |
| Auth | `GET /api/auth/custom-print-sellers` | List sellers accepting custom orders |
| Products | `GET /api/products` | Browse/search/filter catalog |
| Products | `GET /api/products/:id` | Product details |
| Products | `GET /api/products/mine` | Seller's own listings |
| Products | `POST /api/products` | Create listing (seller only, multipart) |
| Products | `PUT /api/products/:id` | Edit own listing (seller only) |
| Products | `DELETE /api/products/:id` | Delete own listing (seller only) |
| Cart | `GET /api/cart` | View cart |
| Cart | `POST /api/cart/items` | Add item |
| Cart | `PUT /api/cart/items/:itemId` | Update quantity |
| Cart | `DELETE /api/cart/items/:itemId` | Remove item |
| Orders | `POST /api/orders` | Checkout (Cash on Delivery) |
| Orders | `GET /api/orders/mine` | Buyer's order history |
| Orders | `GET /api/orders/seller` | Seller's incoming orders |
| Orders | `PUT /api/orders/:id/status` | Update order/payment status (seller) |
| Custom Orders | `POST /api/custom-orders` | Submit a custom print request (multipart) |
| Custom Orders | `GET /api/custom-orders/mine` | Requests I've sent |
| Custom Orders | `GET /api/custom-orders/seller` | Requests I've received (seller) |
| Custom Orders | `PUT /api/custom-orders/:id/quote` | Send a price quote (seller) |
| Custom Orders | `PUT /api/custom-orders/:id/respond` | Accept/reject a quote (customer) |
| Custom Orders | `PUT /api/custom-orders/:id/status` | Update progress status (seller) |

---

## Future Improvements

- Online payment gateway integration (eSewa/Khalti) — intentionally
  left out of this build; checkout is COD only for now.
- Product reviews and ratings.
- Real-time order status notifications.
- Seller analytics dashboard.

---

## Author

**Shree Krishna Devkota** <br>
[L.U. Reg.No: LC00021001388] <br>
Web Technology — Semester [3] <br>
[NCMT COLLEGE] <br>
[LINCOLN UNIVERSITY COLLEGE - Affiliated]
