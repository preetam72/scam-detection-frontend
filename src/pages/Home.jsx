import { useState } from 'react';
import { Shield, Search, Lock, Zap, Clock, AlertTriangle, ShieldCheck, Play, ArrowRight, Activity, Mail, MessageSquare, Globe, Hash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../lib/db';

export default function Home() {
  const [activeTab, setActiveTab] = useState('SMS');
  const [scanContent, setScanContent] = useState('');
  const navigate = useNavigate();

  const [isScanning, setIsScanning] = useState(false);

 const handleScan = async (e) => {
  e.preventDefault();

  if (!scanContent.trim() || isScanning) return;

  setIsScanning(true);

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/scan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: scanContent }),
    });

    const data = await response.json(); // ✅ always parse

    const resultText = data.result || "";

    const probabilityMatch = resultText.match(/Scam Probability:\s*(\d+)%/i);
    const riskMatch = resultText.match(/Risk Level:\s*(Low|Medium|High)/i);
    const typeMatch = resultText.match(/Scam Type:\s*(.*)/i);
    const explanationMatch = resultText.match(/Explanation:\s*(.*)/i);

    const indicatorsMatch = resultText.match(/Indicators:\s*([\s\S]*)/i);

    let indicators = [];
    if (indicatorsMatch && indicatorsMatch[1]) {
      indicators = indicatorsMatch[1]
        .split("\n")
        .map((line) => line.replace(/^-\s*/, "").trim())
        .filter((line) => line.length > 0);
    }

    const parsedResult = {
      probability: probabilityMatch ? parseInt(probabilityMatch[1]) : 50,
      riskLevel: riskMatch ? riskMatch[1] : "Medium",
      scamType: typeMatch ? typeMatch[1].trim() : "Unknown",
      analysis: explanationMatch ? explanationMatch[1].trim() : "Fallback analysis",
      indicators,
      recommendations: [],
    };

    await dbService.saveScanResult({
      contentAnalyzed: scanContent,
      ...parsedResult,
    });

    navigate("/scan", {
      state: {
        contentToScan: scanContent,
        platformChannel: activeTab,
        initialResult: parsedResult,
      },
    });
  } catch (error) {
    console.error("Frontend Error:", error);

    navigate("/scan", {
      state: {
        contentToScan: scanContent,
        platformChannel: activeTab,
        initialResult: {
          probability: 0,
          riskLevel: "Error",
          analysis: "⚠️ System failed. Try again.",
          indicators: [],
        },
      },
    });
  } finally {
    setIsScanning(false);
  }
};

  const handleSampleTest = (sampleText) => {
    setScanContent(sampleText);
  };

  const threatFeed = [
    { time: '2 mins ago', platform: 'Email', message: 'Netflix subscription suspended', status: 'Dangerous' },
    { time: '5 mins ago', platform: 'Website', message: 'Fake bank login link', status: 'Suspicious' },
    { time: '12 mins ago', platform: 'SMS', message: 'Delivery scam SMS (Action required)', status: 'Dangerous' },
    { time: '18 mins ago', platform: 'Social Media', message: 'Crypto giveaway double return scheme', status: 'Suspicious' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', paddingBottom: '0' }}>
      
      {/* 1. Hero Section */}
      <section style={{ textAlign: 'center', margin: '4rem auto', maxWidth: '800px', padding: '0 1rem' }}>
        <div className="badge animate-fade-in" style={{
            background: 'var(--status-safe-bg)',
            color: 'var(--status-safe)',
            marginBottom: '1.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '20px'
         }}>
          <Shield size={14} /> AI-POWERED SECURITY
        </div>
        
        <h1 className="animate-fade-in" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--text-main)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
            animationDelay: '0.1s'
        }}>
          Detect Scams in <span style={{ color: 'var(--accent-primary)' }}>Seconds</span> with AI
        </h1>
        
        <p className="animate-fade-in" style={{
            fontSize: '1.2rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            maxWidth: '650px',
            margin: '0 auto',
            animationDelay: '0.2s'
        }}>
          Analyze messages, emails, and links instantly using AI-powered threat detection. Stay one step ahead of digital deception.
        </p>
      </section>

      {/* 2. Main Content Section (Responsive Grid) */}
      <section className="animate-fade-in section-padding grid-responsive-dynamic" style={{ 
          maxWidth: '1200px', 
          width: '100%', 
          margin: '0 auto 6rem',
          animationDelay: '0.3s'
      }}>
        
        {/* LEFT SIDE: Scanner Card */}
        <div className="panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
            {['SMS', 'Email', 'Website', 'Social Media'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '1rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: activeTab === tab ? 'var(--accent-primary)' : 'var(--text-muted)',
                  borderBottom: activeTab === tab ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  cursor: 'pointer',
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab === 'SMS' && <MessageSquare size={16} />}
                {tab === 'Email' && <Mail size={16} />}
                {tab === 'Website' && <Globe size={16} />}
                {tab === 'Social Media' && <Hash size={16} />}
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleScan} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <textarea
              className="input-field"
              placeholder="Paste your suspicious message, email content, or URL here..."
              rows={6}
              value={scanContent}
              onChange={(e) => setScanContent(e.target.value)}
              style={{ 
                resize: 'none', 
                marginBottom: '1.5rem', 
                flex: 1, 
                fontSize: '1.1rem',
                padding: '1.25rem',
                border: '2px solid var(--border-color)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
              }}
            />
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Lock size={14} /> No data stored</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><ShieldCheck size={14} /> Privacy protected</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Zap size={14} /> Real-time analysis</span>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', fontWeight: 700, borderRadius: '8px', opacity: isScanning ? 0.7 : 1, transition: 'all 0.3s ease' }} disabled={isScanning}>
              {isScanning ? (
                <>🔍 Analyzing message...</>
              ) : (
                <><Search size={20} /> SCAN FOR SCAMS</>
              )}
            </button>
          </form>

          <div style={{ marginTop: '2rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.75rem' }}>Sample Test Scenarios</p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button type="button" onClick={() => handleSampleTest('URGENT: Your Bank Account has been locked. Click here to verify your identity: http://bank-secure-auth.com')} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', borderRadius: '20px' }} disabled={isScanning}>
                <Play size={14} /> Try Bank Scam
              </button>
              <button type="button" onClick={() => handleSampleTest('URGENT: Your OTP for transaction of $500 is 123456. Do not share. If you did not request this, click here to cancel: http://secure-cancel.com')} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', borderRadius: '20px' }} disabled={isScanning}>
                <Play size={14} /> Try OTP Scam
              </button>
              <button type="button" onClick={() => handleSampleTest('USPS: Your package delivery failed due to unpaid shipping fee of $1.99. Pay here: http://usps-tracking-failed.com')} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', borderRadius: '20px' }} disabled={isScanning}>
                <Play size={14} /> Try Delivery Scam
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE: Threat Feed Card */}
        <div className="panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>Live Global Threat Feed</h2>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Activity size={14} /> REAL-TIME AI MONITORING
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            {threatFeed.map((item, index) => (
              <div key={index} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', background: '#FFFFFF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <Clock size={14} /> {item.time} &bull; {item.platform}
                  </div>
                  <span className={`badge ${item.status === 'Dangerous' ? 'badge-dangerous' : 'badge-warning'}`}>
                    {item.status === 'Dangerous' ? <AlertTriangle size={12} /> : <Shield size={12} />}
                    {item.status}
                  </span>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 500 }}>
                  "{item.message}"
                </p>
              </div>
            ))}
          </div>

          <button onClick={() => navigate('/dashboard')} className="btn btn-outline" style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}>
            Explore Intelligence Hub <ArrowRight size={16} />
          </button>
        </div>

      </section>

      {/* 4. Feature Banner Section */}
      <section className="animate-fade-in" style={{ 
          width: '100%', 
          background: 'linear-gradient(135deg, #1A1A1A, #3A1A05)', 
          padding: '5rem 1.5rem', 
          color: '#FFFFFF',
          textAlign: 'center',
          animationDelay: '0.4s'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0em' }}>
            The Future of Digital Safety
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#E0E0E0', lineHeight: 1.6 }}>
            Our neural network is trained on 500 million verified scam messages to protect you in real-time.
          </p>
        </div>
      </section>

      {/* 5. Footer */}
      <footer style={{ width: '100%', borderTop: '1px solid var(--border-color)', padding: '2rem', background: '#FFFFFF' }}>
        <div className="section-padding" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontWeight: 600, flexWrap: 'wrap', justifyContent: 'center' }}>
             <Shield size={20} color="var(--accent-primary)" /> ScamShield AI <span style={{ fontWeight: 400, color: 'var(--text-muted)', marginLeft: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>© 2026 Protecting digital citizens.</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#" style={{ hover: { color: 'var(--accent-primary)' } }}>Privacy Policy</a>
            <a href="#" style={{ hover: { color: 'var(--accent-primary)' } }}>Terms of Service</a>
            <a href="#" style={{ hover: { color: 'var(--accent-primary)' } }}>Security Disclosure</a>
            <a href="#" style={{ hover: { color: 'var(--accent-primary)' } }}>Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
