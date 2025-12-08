import React from 'react';
import { NavLink } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

export default function Sidebar() {
  const { user, loading } = useAuth();
  const { logout } = useAuth();

  const displayName = loading ? 'Loading...' : user?.name || 'Guest';

  return (
    <aside className="h-full bg-white border-r flex flex-col justify-between">
      <div>
        <div className="p-6 border-b flex items-center gap-3">
          <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center font-bold text-xl">V</div>
          <div>
            <div className="font-bold text-lg">Vault</div>
            <div className="text-xs text-gray-500">{displayName}</div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <NavLink to="/" className="flex items-center gap-3 p-3 rounded text-gray-600 hover:bg-gray-50 hover:text-black">
            <span>⊞</span> Dashboard
          </NavLink>
          <NavLink to="/nexus" className="flex items-center gap-3 p-3 rounded text-gray-600 hover:bg-gray-50 hover:text-black">
            <span>&</span> Nexus
          </NavLink>
          <NavLink to="/intake" className="flex items-center gap-3 p-3 rounded text-gray-600 hover:bg-gray-50 hover:text-black">
            <span>◎</span> Intake
          </NavLink>

          <div className="pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Services</div>
          {['Pre-active', 'Active', 'Blocked', 'Closed'].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 rounded text-gray-600 hover:bg-gray-50 cursor-pointer">
              <span>○</span> {item}
            </div>
          ))}

          <div className="pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Invoices</div>
          <div className="flex items-center gap-3 p-3 rounded text-black font-medium bg-gray-50 cursor-pointer">
            <span>📄</span> Proforma Invoices
          </div>
          <div className="flex items-center gap-3 p-3 rounded text-gray-600 hover:bg-gray-50 cursor-pointer">
            <span>📄</span> Final Invoices
          </div>
        </nav>
      </div>

      <div className="p-4 border-t">
        <button onClick={() => { import('../../services/auth').then(m => m.logout()); window.location.href = '/login'; }} className="w-full p-2 text-left text-red-600 hover:bg-red-50 rounded flex items-center gap-2">
          <span>⎋</span> Logout
        </button>
      </div>
    </aside>
  );
}
