import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import { Route, Routes } from "react-router";
import OverviewPage from "./pages/OverviewPage";
import Sidebar from "./components/common/Sidebar";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import BlogsPage from "./pages/BlogsPage";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import { useEffect, useState } from "react";
import { isTokenExpired } from "./utils/checkTokenExpiration";
import { useAuth } from "./context/AuthContext";



function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isAuthenticated } = useAuth();

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   if (token && !isTokenExpired(token)) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* BG */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0  opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      {isAuthenticated && <Sidebar />}

      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <OverviewPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <PrivateRoute>
              <BlogsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <PrivateRoute>
              <SalesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <OrdersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <AnalyticsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
