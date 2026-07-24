import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Smartphone, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

// Inline SVGs for brand logos to ensure high quality without external dependencies
const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.488 12.387c-.015-2.695 2.199-4 2.296-4.058-1.25-1.83-3.197-2.079-3.896-2.106-1.657-.168-3.238.977-4.086.977-.847 0-2.148-.957-3.527-.93-1.785.027-3.435.986-4.354 2.593-1.859 3.23-.474 8.01 1.336 10.63.89 1.285 1.94 2.732 3.344 2.677 1.347-.055 1.865-.873 3.39-.873 1.523 0 1.986.873 3.414.846 1.455-.028 2.373-1.325 3.256-2.61.16-.237.316-.48.465-.724-1.411-.586-2.617-2.088-2.638-3.422z" fill="#fff"/>
    <path d="M15.485 5.892c.75-.91 1.258-2.17 1.121-3.412-1.074.043-2.387.714-3.158 1.623-.695.81-1.29 2.092-1.127 3.315 1.196.092 2.414-.616 3.164-1.526z" fill="#fff"/>
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('initial'); // 'initial', 'otp', 'loading', 'success'

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length >= 10) {
      setStep('otp');
    }
  };

  const handleAuth = (e) => {
    e?.preventDefault();
    setStep('loading');
    
    // Simulate network request
    setTimeout(() => {
      setStep('success');
      // Redirect after showing success state
      setTimeout(() => {
        navigate('/learning-hub');
      }, 1000);
    }, 1500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glows */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '20%',
        width: '400px',
        height: '400px',
        background: 'var(--glow-teal)',
        borderRadius: '50%',
        filter: 'blur(120px)',
        opacity: 0.4,
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '20%',
        width: '300px',
        height: '300px',
        background: 'var(--glow-blue)',
        borderRadius: '50%',
        filter: 'blur(120px)',
        opacity: 0.3,
        zIndex: 0
      }} />

      <motion.div 
        className="glass-card"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '3rem 2.5rem',
          position: 'relative',
          zIndex: 1,
          borderTop: '2px solid rgba(0, 240, 255, 0.3)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
            Welcome Back
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Sign in to continue your VLSI journey</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'initial' && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Social Logins */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <button 
                  onClick={handleAuth}
                  className="btn hover-scale" 
                  style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', 
                    width: '100%', padding: '0.875rem', 
                    background: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)', 
                    color: 'var(--text-main)', borderRadius: '8px' 
                  }}
                >
                  <GoogleIcon />
                  Continue with Google
                </button>
                <button 
                  onClick={handleAuth}
                  className="btn hover-scale" 
                  style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', 
                    width: '100%', padding: '0.875rem', 
                    background: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)', 
                    color: 'var(--text-main)', borderRadius: '8px' 
                  }}
                >
                  <AppleIcon />
                  Continue with Apple
                </button>
              </div>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--surface-border)' }} />
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--surface-border)' }} />
              </div>

              {/* Mobile Number Login */}
              <form onSubmit={handleMobileSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    Mobile Number
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Smartphone size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.875rem 1rem 0.875rem 3rem',
                        background: 'rgba(0,0,0,0.2)',
                        border: '1px solid var(--surface-border)',
                        borderRadius: '8px',
                        color: 'var(--text-main)',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--accent-teal)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--surface-border)'}
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={mobileNumber.length < 10}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  Get OTP <ArrowRight size={18} />
                </button>
              </form>
            </motion.div>
          )}

          {step === 'otp' && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Enter the 6-digit code sent to <br/>
                  <strong style={{ color: 'var(--text-main)' }}>{mobileNumber}</strong>
                </p>
                <button 
                  onClick={() => setStep('initial')}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-teal)', fontSize: '0.85rem', marginTop: '0.5rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Change number
                </button>
              </div>

              <form onSubmit={handleAuth}>
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                  <input 
                    type="text" 
                    placeholder="• • • • • •"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      letterSpacing: '0.5rem',
                      padding: '1rem',
                      background: 'rgba(0,0,0,0.2)',
                      border: '1px solid var(--accent-teal)',
                      borderRadius: '8px',
                      color: 'var(--text-main)',
                      fontSize: '1.5rem',
                      outline: 'none',
                      boxShadow: '0 0 15px rgba(0, 240, 255, 0.1)'
                    }}
                  />
                </div>
                <button 
                  type="submit"
                  disabled={otp.length < 6}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.875rem' }}
                >
                  Verify & Sign In
                </button>
              </form>
            </motion.div>
          )}

          {step === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ marginBottom: '1rem' }}
              >
                <Loader2 size={48} color="var(--accent-teal)" />
              </motion.div>
              <p style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>Authenticating...</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Establishing secure session</p>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}
            >
              <CheckCircle2 size={56} color="var(--pcb-green)" style={{ marginBottom: '1rem' }} />
              <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Login Successful</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Redirecting to Learning Hub...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        {step === 'initial' && (
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              By signing in, you agree to our <br/>
              <a href="#/terms" style={{ color: 'var(--accent-teal)', textDecoration: 'none' }}>Terms of Service</a> and <a href="#/privacy" style={{ color: 'var(--accent-teal)', textDecoration: 'none' }}>Privacy Policy</a>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
