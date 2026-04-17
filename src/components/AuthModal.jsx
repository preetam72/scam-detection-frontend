import React, { useState } from 'react';
import { X, Mail, User, Shield, Loader2 } from 'lucide-react';

export default function AuthModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { name, email } = formData;

    if (!name.trim() || !email.trim()) {
      setError('Both name and email are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    // Simulate authentication processing
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({ name: name.trim(), email: email.trim() });
      onClose();
    }, 1500);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '1.5rem'
    }}>
      <div className="animate-fade-in" style={{
        background: '#FFFFFF',
        width: '100%', maxWidth: '420px',
        borderRadius: '24px',
        padding: '2.5rem',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        <button 
          onClick={onClose} 
          disabled={isLoading}
          style={{
            position: 'absolute', top: '1.5rem', right: '1.5rem',
            background: 'transparent', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer',
            color: 'var(--text-muted)', opacity: isLoading ? 0.5 : 1
          }}
        >
          <X size={24} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            width: '60px', height: '60px', background: '#E6F0FF', 
            borderRadius: '16px', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', margin: '0 auto 1.5rem', color: '#0066FF' 
          }}>
            <Shield size={32} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Identify Yourself
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Enter your details to securely perform this action.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="John Doe" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isLoading}
                style={{ 
                  width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem', 
                  borderRadius: '12px', border: '1px solid var(--border-color)', 
                  outline: 'none', fontSize: '0.95rem',
                  background: isLoading ? '#F9FAFB' : '#FFFFFF'
                }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                placeholder="you@example.com" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isLoading}
                style={{ 
                  width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem', 
                  borderRadius: '12px', border: '1px solid var(--border-color)', 
                  outline: 'none', fontSize: '0.95rem',
                  background: isLoading ? '#F9FAFB' : '#FFFFFF'
                }} 
              />
            </div>
          </div>

          {error && (
            <div style={{ color: '#DC2626', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isLoading} 
            style={{ 
              width: '100%', padding: '1rem', fontSize: '1rem', 
              fontWeight: 700, borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> Verifying...
              </>
            ) : (
              'Continue to Action'
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          By continuing, you agree to our <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Security Protocols</span>.
        </div>
      </div>
    </div>
  );
}
