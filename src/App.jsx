import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/index";
import AboutPage from "./pages/About";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import AppLayout from "./layout/AppLayout";
import CookieService from "../src/services/CookieService";
import CartDrawer from "./components/cartDrawer";
import AdminDashboard from "./pages/dashboard";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardProducts from "./pages/dashboard/DashboardProducts";

const App = () => {
  const token = CookieService.get("jwt");



  return (
    <>
      <CartDrawer />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<DashboardProducts />} />
          <Route path="categories" element={<h1>Categories</h1>} />
        </Route>
        <Route path="/login" element={<Login isAuthenticated={token} />} />
      </Routes>
    </>
  );
};

export default App;
