import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { login } from '../../services/auth';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Admin@123');
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const data = await login(email, password);
      setUser(data.user);
      navigate('/');
    } catch (e) {
      setErr(e?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-6">Sign in</h2>
        <div className="bg-blue-50 text-blue-700 text-sm p-3 rounded mb-4">
          Default credentials pre-filled. Feel free to use them or enter your own.
        </div>
        {err && <div className="text-red-600 mb-3">{err}</div>}
        <label className="block mb-2">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mb-4" />
        <label className="block mb-2">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mb-4" />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Login</button>

        <div className="mt-4 text-center text-sm">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </div>
      </form>
    </div>
  );
}
