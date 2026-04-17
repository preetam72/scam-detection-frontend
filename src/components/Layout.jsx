import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Shield, Home, Search, BarChart3, AlertOctagon, BookOpen, Info, Menu, X, User } from 'lucide-react';
import AuthModal from './AuthModal';


export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <nav className="top-navbar panel" style={{ borderRadius: '0', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '0 auto', width: '100%', maxWidth: '1200px', justifyContent: 'space-between' }}>
          
          <div className="navbar-brand">
            <Shield size={28} />
            <span className="logo-text">ScamShield AI</span>
          </div>
          
          <div className="navbar-links hide-on-mobile">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
              <Home size={18} />
              <span>Home</span>
            </NavLink>
            <NavLink to="/scan" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Search size={18} />
              <span>Scanner</span>
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <BarChart3 size={18} />
              <span>Intelligence</span>
            </NavLink>
            <NavLink to="/report" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <AlertOctagon size={18} />
              <span>Report</span>
            </NavLink>
            <NavLink to="/learn" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <BookOpen size={18} />
              <span>Learn</span>
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Info size={18} />
              <span>About</span>
            </NavLink>
          </div>

          <div className="navbar-actions hide-on-mobile">
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.4rem 0.8rem', borderRadius: '30px', border: '1px solid var(--border-color)', background: '#F8F9FA' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#E6F0FF', color: '#0066FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>JS</div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', paddingRight: '0.25rem' }}>John S.</span>
              </div>
            ) : (
              <button onClick={() => setIsAuthModalOpen(true)} className="btn btn-primary" style={{ padding: '0.6rem 1.25rem', borderRadius: '6px' }}>
                Sign In
              </button>
            )}
          </div>

          <div className="hide-on-desktop">
            <button onClick={toggleMenu} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="nav-menu-container hide-on-desktop">
              <div className="navbar-links" style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '1rem', borderTop: 'none', paddingTop: 0 }}>
                <NavLink to="/" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                  <Home size={18} /> <span>Home</span>
                </NavLink>
                <NavLink to="/scan" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <Search size={18} /> <span>Scanner</span>
                </NavLink>
                <NavLink to="/dashboard" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <BarChart3 size={18} /> <span>Intelligence</span>
                </NavLink>
                <NavLink to="/report" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <AlertOctagon size={18} /> <span>Report</span>
                </NavLink>
                <NavLink to="/learn" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <BookOpen size={18} /> <span>Learn</span>
                </NavLink>
                <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <Info size={18} /> <span>About</span>
                </NavLink>
                <div className="navbar-actions" style={{ marginTop: '1rem', width: '100%' }}>
                  {isAuthenticated ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#F8F9FA', justifyContent: 'center' }}>
                      <User size={18} />
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>My Account</span>
                    </div>
                  ) : (
                    <button onClick={() => { closeMenu(); setIsAuthModalOpen(true); }} className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', borderRadius: '6px' }}>
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <section className="animate-fade-in" style={{ width: '100%' }}>
          <Outlet />
        </section>
      </main>

      {/* Global Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)} 
          onSuccess={() => setIsAuthenticated(true)}
        />
      )}

    </div>
  );
}
