import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../services/auth';

export default function Sidebar() {
  const { user, loading } = useAuth();
  const displayName = loading ? 'Loading...' : user?.name || 'Guest';
  const displayEmail = user?.email || 'admin@truestate.com';
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [servicesOpen, setServicesOpen] = useState(false);
  const [invoicesOpen, setInvoicesOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  const navItemClass = "flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium text-sm";
  const activeNavItemClass = "flex items-center gap-3 px-3 py-2.5 text-gray-900 font-semibold bg-white shadow-sm border border-gray-100 rounded-lg transition-all duration-200 text-sm";
  const groupCardClass = "bg-white/50 p-2 rounded-xl mb-4";
  const groupHeaderClass = "flex items-center justify-between px-3 py-2.5 text-gray-600 font-semibold text-sm cursor-pointer hover:bg-gray-100/50 rounded-lg transition-colors";

  return (
    <aside className="h-full bg-[#F9F8F6] flex flex-col p-6 overflow-y-auto font-sans">

      <div className="relative mb-6">
        <div
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="bg-white p-3 rounded-xl border shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-gray-900 leading-tight">Vault</div>
              <div className="text-sm text-gray-500 leading-tight">{displayName}</div>
            </div>
          </div>
          <div className="text-gray-400">
            <svg className={`w-5 h-5 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>

        {showUserMenu && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-lg z-20 overflow-hidden min-w-[200px]">
            <div className="p-4 border-b bg-gray-50">
              <div className="font-semibold text-gray-900">{displayName}</div>
              <div className="text-sm text-gray-500">{displayEmail}</div>
            </div>

            <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Sign out
            </button>
          </div>
        )}
      </div>

      <div className="mb-4 space-y-1 px-1">
        <NavLink to="/" className={({ isActive }) => isActive ? activeNavItemClass : navItemClass}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          Dashboard
        </NavLink>
        <NavLink to="/nexus" className={({ isActive }) => isActive ? activeNavItemClass : navItemClass}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          Nexus
        </NavLink>
        <NavLink to="/intake" className={({ isActive }) => isActive ? activeNavItemClass : navItemClass}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Intake
        </NavLink>
      </div>

      <div className={groupCardClass}>
        <div
          onClick={() => setServicesOpen(!servicesOpen)}
          className={groupHeaderClass}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            Services
          </div>
          <svg className={`w-4 h-4 text-gray-400 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>

        {servicesOpen && (
          <div className="space-y-1 mt-1 pl-2 pb-2">
            <div className={navItemClass + " cursor-pointer"}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Pre-active
            </div>
            <div className={navItemClass + " cursor-pointer"}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
              Active
            </div>
            <div className={navItemClass + " cursor-pointer"}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Blocked
            </div>
            <div className={navItemClass + " cursor-pointer"}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Closed
            </div>
          </div>
        )}
      </div>

      <div className={groupCardClass}>
        <div
          onClick={() => setInvoicesOpen(!invoicesOpen)}
          className={groupHeaderClass}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Invoices
          </div>
          <svg className={`w-4 h-4 text-gray-400 transition-transform ${invoicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>

        {invoicesOpen && (
          <div className="space-y-1 mt-1 pl-2 pb-2">
            <div className={navItemClass + " cursor-pointer"}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Proforma Invoices
            </div>
            <div className={navItemClass + " cursor-pointer"}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Final Invoices
            </div>
          </div>
        )}
      </div>

    </aside>
  );
}
