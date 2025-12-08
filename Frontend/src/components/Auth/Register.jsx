import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { register } from '../../services/auth';
import { useAuth } from '../../hooks/useAuth';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr(null);
        try {
            const data = await register({ name, email, password });
            setUser(data.user);
            navigate('/');
        } catch (e) {
            setErr(e?.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={onSubmit} className="w-full max-w-md bg-white p-8 rounded shadow">
                <h2 className="text-2xl font-semibold mb-6">Create an Account</h2>
                {err && <div className="text-red-600 mb-3">{err}</div>}

                <label className="block mb-2">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded mb-4" required />

                <label className="block mb-2">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mb-4" required />

                <label className="block mb-2">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mb-4" required />

                <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Register</button>

                <div className="mt-4 text-center text-sm">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
                </div>
            </form>
        </div>
    );
}
