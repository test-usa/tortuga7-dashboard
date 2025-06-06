import {
  BarChart2,
  LetterText,
  LogOut,
  Menu,
  Settings,
  ShoppingBag,
  Handshake,
  Users,
  Receipt,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SIDEBAR_ITEMS = [
  {
    name: "Overview",
    icon: BarChart2,
    color: "#6366f1",
    href: "/",
  },
  { name: "Services", icon: ShoppingBag, color: "#8B5CF6", href: "/services" },
  { name: "Users", icon: Users, color: "#EC4899", href: "/users" },
  { name: "Bookings", icon: Receipt, color: "#10B981", href: "/bookings" },
  {
    name: "Consultation",
    icon: Handshake,
    color: "#FBBF24",
    href: "/consultations",
  },
  { name: "Blogs", icon: LetterText, color: "#F59E0B", href: "/blogs" },
  
  // { name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
  // { name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
  { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
    logout();
  };

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit cursor-pointer"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>

        <motion.div
          onClick={handleLogout}
          className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 cursor-pointer"
        >
          <LogOut size={20} style={{ color: "red", minWidth: "20px" }} />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span
                className="ml-3 whitespace-nowrap font-medium"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2, delay: 0.3 }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-medium"
        >
          Logout
        </button> */}
      </div>
    </motion.div>
  );
};
export default Sidebar;
