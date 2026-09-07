import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./component/NavBar";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Footer from "./component/Footer";
import Auth from "./pages/Auth";
import SellProduct from "./pages/SellProduct";
import Orders from "./pages/Orders";
import CustomPrint from "./pages/CustomPrint";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* Navbar will appear on every page */}
        <NavBar />

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/shop" element={<Shop />} />

          <Route path="/categories" element={<Categories />} />

          <Route path="/about" element={<About />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/auth" element={<Auth/>}/>

          <Route path="/ProductList" element={<SellProduct/>}/>

          <Route path="/order" element={<Orders/>}/>

          <Route path="/customPrint" element={<CustomPrint/>}/>
          
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </>
  );
}

export default App;
