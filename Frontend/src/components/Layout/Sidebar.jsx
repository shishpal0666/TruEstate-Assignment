import React from 'react';
import { NavLink } from 'react-router';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-4 border-b">
        <div className="font-bold">#</div>
        <div className="text-sm text-gray-500">#</div>
      </div>
      <nav className="p-4 space-y-2">
        <NavLink to="/" className="block p-2 rounded hover:bg-gray-50">Dashboard</NavLink>
        <div className="text-xs text-gray-400 mt-6">Services</div>
        <NavLink to="/" className="block p-2 rounded hover:bg-gray-50">Pre-active</NavLink>
      </nav>
    </aside>
  );
}
