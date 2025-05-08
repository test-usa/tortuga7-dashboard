import { useState } from "react";
import { loginAdmin } from "../api/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginAdmin(email, password);
      if (res?.user?.role !== "ADMIN") {
        toast.error("Provide the valid admin credentials");
      } else {
        localStorage.setItem("accessToken", res.access_token);
        toast.success("Login successful");
        login(res.access_token);
        navigate(from, { replace: true });
      }
    } catch (err) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 z-50 max-w-7xl mx-auto py-6 px-4 lg:px-8 relative">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Admin Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-md mb-4 bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-md mb-4 bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-md font-medium hover:opacity-90 transition"
        >
          Login
        </button>
      </form>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Login;
