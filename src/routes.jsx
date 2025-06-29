import { Routes, Route } from "react-router";
import { NotFoundPage } from "@/pages/404";
import { HomePage } from "@/pages/home";
import { MainLayout } from "@/MainLayout";
import { LoginPage } from "./pages/auth/login";
import { SignupPage } from "./pages/auth/signup";
import { CartPage } from "./pages/cart";
import { OrdersPage } from "./pages/orders";
import { ProductDetailsPage } from "./pages/productDetails";
import { ProductsPage } from "./pages/products";

export const AppRoutes = function () {
  return (
    <Routes>
      <Route path="/" element={<MainLayout></MainLayout>}>
        <Route index={true} element={<HomePage />}></Route>
        <Route path="cart" element={<CartPage />}></Route>
        <Route path="orders" element={<OrdersPage />}></Route>
        <Route path="product/:id" element={<ProductDetailsPage />}></Route>
        <Route path="products" element={<ProductsPage />}></Route>
      </Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signup" element={<SignupPage />}></Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
