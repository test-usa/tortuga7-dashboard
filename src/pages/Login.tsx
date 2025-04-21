// src/pages/Login.tsx
import { useState } from 'react';
import { loginAdmin } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginAdmin(email, password);
      localStorage.setItem('accessToken', res.token);
      toast.success('Login successful');
      navigate('/blogs');
    } catch (err) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 z-50">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Admin Login</h2>
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
    </div>
  );
};

export default Login;
