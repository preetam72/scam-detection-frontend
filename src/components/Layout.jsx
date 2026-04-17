import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Shield, Home, Search, BarChart3, AlertOctagon, BookOpen, Info, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import AuthModal from './AuthModal';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);

  // 1. Restore session on mount with robust error handling
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser && parsedUser.email) {
          setCurrentUser(parsedUser);
        }
      } catch (error) {
        console.error('Failed to parse user session:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // 2. Auth Gatekeeper Function
  const requireAuth = (actionCallback) => {
    if (currentUser) {
      actionCallback();
    } else {
      // Prevent duplicate action triggers if already waiting for login
      if (!pendingAction) {
        setPendingAction(() => actionCallback);
        setIsAuthModalOpen(true);
      }
    }
  };

  // 3. Handle successful authentication
  const handleAuthSuccess = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthModalOpen(false);

    // Resume interrupted action
    if (pendingAction) {
      // Execute in next tick to ensure state updates are processed
      setTimeout(() => {
        pendingAction();
        setPendingAction(null);
      }, 0);
    }
  };

  // 4. Handle modal closure (important edge case)
  const handleCloseModal = () => {
    setIsAuthModalOpen(false);
    setPendingAction(null); // Clear pending action to prevent stale execution later
  };

  // 5. Logout logic
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    setIsMobileMenuOpen(false);
  };

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <nav className="top-navbar panel" style={{ borderRadius: '0', borderLeft: 'none', borderRight: 'none', borderTop: 'none', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '0 auto', width: '100%', maxWidth: '1200px', justifyContent: 'space-between' }}>
          
          <div className="navbar-brand">
            <Shield size={28} />
            <span className="logo-text">ScamShield AI</span>
          </div>
          
          <div className="navbar-links hide-on-mobile">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
              <Home size={18} /> <span>Home</span>
            </NavLink>
            <NavLink to="/scan" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Search size={18} /> <span>Scanner</span>
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <BarChart3 size={18} /> <span>Intelligence</span>
            </NavLink>
            <NavLink to="/report" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <AlertOctagon size={18} /> <span>Report</span>
            </NavLink>
          </div>

          <div className="navbar-actions hide-on-mobile">
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  display: 'flex', alignItems: 'center', gap: '0.75rem', 
                  padding: '0.5rem 1rem', borderRadius: '30px', 
                  background: '#F8F9FA', border: '1px solid var(--border-color)' 
                }}>
                  <div style={{ 
                    width: '32px', height: '32px', borderRadius: '50%', 
                    background: 'var(--accent-primary)', color: '#fff', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    fontWeight: 800, fontSize: '0.85rem' 
                  }}>
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {currentUser.name}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  style={{ 
                    background: 'transparent', border: 'none', 
                    color: '#666', cursor: 'pointer', display: 'flex', 
                    alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' 
                  }}
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)} 
                className="btn btn-primary" 
                style={{ padding: '0.6rem 1.25rem', borderRadius: '8px' }}
              >
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
              <div className="navbar-links" style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '1rem' }}>
                <NavLink to="/" onClick={closeMenu} className="nav-link" end>Home</NavLink>
                <NavLink to="/scan" onClick={closeMenu} className="nav-link">Scanner</NavLink>
                <NavLink to="/dashboard" onClick={closeMenu} className="nav-link">Intelligence</NavLink>
                <NavLink to="/report" onClick={closeMenu} className="nav-link">Report</NavLink>
                
                <div style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                  {currentUser ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
                          {currentUser.name.charAt(0).toUpperCase()}
                        </div>
                        {currentUser.name}
                      </div>
                      <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%' }}>
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => { closeMenu(); setIsAuthModalOpen(true); }} className="btn btn-primary" style={{ width: '100%' }}>
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
          {/* Provide auth context to all children */}
          <Outlet context={{ requireAuth, currentUser }} />
        </section>
      </main>

      {/* Global Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal 
          onClose={handleCloseModal} 
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}
