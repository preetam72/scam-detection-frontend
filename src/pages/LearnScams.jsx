import React, { useState } from 'react';
import { 
  Shield, Mail, Phone, Bitcoin, MessageSquare, BrainCircuit, 
  ArrowRight, Clock, Eye, AlertTriangle, PlayCircle
} from 'lucide-react';

export default function LearnScams() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [isLoadingScenario, setIsLoadingScenario] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const loadNewScenario = async () => {
    setIsLoadingScenario(true);
    setSelectedAnswer(null);
    setHasAnswered(false);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/generate-scenario`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setCurrentScenario(data);
    } catch (e) {
      console.error(e);
      // fallback
      setCurrentScenario({
        type: 'SMS',
        content: 'URGENT: Your bank account OTP is 928301 for a payment of $1200. If you did not make this transaction, click to cancel: http://cancel-sbi-trans.com',
        isScam: true,
        scamType: 'OTP Phishing',
        explanation: 'Uses a mock transaction warning to induce panic and redirects to a fraudulent credentials harvester.',
        redFlags: ['Requests cancellation via link', 'Unofficial domains', 'Fake transaction trigger']
      });
    } finally {
      setIsLoadingScenario(false);
    }
  };

  const handleAnswer = (choice) => {
    if (hasAnswered) return;
    setSelectedAnswer(choice);
    setHasAnswered(true);
    const isChoiceScam = choice === 'scam';
    const isCorrect = isChoiceScam === currentScenario.isScam;
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const startQuiz = () => {
    setQuizStarted(true);
    loadNewScenario();
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentScenario(null);
    setScore({ correct: 0, total: 0 });
  };

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh', paddingBottom: '6rem' }}>
      
      {/* 1. Hero Section */}
      <div className="section-padding" style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '3rem', paddingBottom: '4rem' }}>
        <div className="flex-responsive-row" style={{ background: '#FFFFFF', borderRadius: '32px', padding: '5rem 4rem', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid #F0F0F0' }}>
          
          <div style={{ flex: '1', maxWidth: '500px' }}>
            <div style={{ color: '#D62828', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              KNOWLEDGE IS ARMOR
            </div>
            <h1 className="mobile-text-hero" style={{ fontWeight: 800, color: '#1A1A1A', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
              Master the Art of <br />
              <span style={{ color: '#FF6B00' }}>Digital Self-Defense</span>
            </h1>
            <p style={{ color: '#666666', fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              The best defense against modern scams isn't just software—it's intelligence. Explore our curated hub of cybersecurity patterns and stay two steps ahead of threat actors.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button style={{ background: '#FF6B00', color: '#FFFFFF', border: 'none', padding: '1rem 2rem', borderRadius: '30px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(255,107,0,0.3)' }}>
                Explore Guide <ArrowRight size={18} />
              </button>
              <button style={{ background: '#F5F5F5', color: '#1A1A1A', border: 'none', padding: '1rem 2rem', borderRadius: '30px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
                View Statistics
              </button>
            </div>
          </div>

          <div className="hide-on-mobile" style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Massive Peach Target Graphic */}
            <div style={{ position: 'relative', width: '300px', height: '300px', borderRadius: '50%', background: '#FFF3EB', border: '2px dashed #FFCFB3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', width: '220px', height: '220px', borderRadius: '50%', background: '#FFE4D1' }}></div>
              <Shield size={80} color="#FF6B00" style={{ position: 'relative', zIndex: 1, fill: '#FF6B00' }} />
            </div>
          </div>
          
        </div>
      </div>

      {/* 2. Core Threat Domains */}
      <div className="section-padding" style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '5rem' }}>
        <h2 className="mobile-text-h2" style={{ fontWeight: 800, color: '#1A1A1A', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Core Threat Domains</h2>
        <p style={{ color: '#666666', fontSize: '1.05rem', marginBottom: '2.5rem' }}>Detailed analysis of current attack vectors and patterns.</p>

        <div className="grid-responsive-3">
          
          {/* Phishing */}
          <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #F0F0F0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#FFF3EB', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Mail color="#FF6B00" />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '1rem' }}>Phishing</h3>
            <p style={{ color: '#666666', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>
              Deceptive emails designed to steal credentials or sensitive data by mimicking legitimate services.
            </p>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#D62828', letterSpacing: '0.1em', marginBottom: '1rem' }}>RED FLAGS</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ fontSize: '0.85rem', color: '#4A4A4A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '6px', height: '6px', background: '#D62828' }}></div> Urgent/threatening tone</li>
                <li style={{ fontSize: '0.85rem', color: '#4A4A4A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '6px', height: '6px', background: '#D62828' }}></div> Suspicious Sender Domain</li>
                <li style={{ fontSize: '0.85rem', color: '#4A4A4A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '6px', height: '6px', background: '#D62828' }}></div> Generic Salutations</li>
              </ul>
            </div>
            <div style={{ color: '#D62828', fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
              Learn More <ArrowRight size={16} />
            </div>
          </div>

          {/* Vishing */}
          <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #F0F0F0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#FFF3EB', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Phone color="#FF6B00" />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '1rem' }}>Vishing</h3>
            <p style={{ color: '#666666', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>
              Voice phishing via phone calls, often using social engineering to create a false sense of urgency.
            </p>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#D62828', letterSpacing: '0.1em', marginBottom: '1rem' }}>RED FLAGS</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ fontSize: '0.85rem', color: '#4A4A4A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '6px', height: '6px', background: '#D62828' }}></div> Requests for Remote Access</li>
                <li style={{ fontSize: '0.85rem', color: '#4A4A4A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '6px', height: '6px', background: '#D62828' }}></div> Asking for OTP/MFA codes</li>
                <li style={{ fontSize: '0.85rem', color: '#4A4A4A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '6px', height: '6px', background: '#D62828' }}></div> High-pressure tactics</li>
              </ul>
            </div>
            <div style={{ color: '#D62828', fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
              Learn More <ArrowRight size={16} />
            </div>
          </div>

          {/* Crypto Scams */}
          <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #F0F0F0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#FFF3EB', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Bitcoin color="#FF6B00" />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '1rem' }}>Crypto Scams</h3>
            <p style={{ color: '#666666', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>
              Investment fraud promising high returns, "rug pulls," or fake giveaway schemes on social media.
            </p>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#D62828', letterSpacing: '0.1em', marginBottom: '1rem' }}>RED FLAGS</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ fontSize: '0.85rem', color: '#4A4A4A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '6px', height: '6px', background: '#D62828' }}></div> Guaranteed 10x Returns</li>
                <li style={{ fontSize: '0.85rem', color: '#4A4A4A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '6px', height: '6px', background: '#D62828' }}></div> DM from Unknown "Experts"</li>
                <li style={{ fontSize: '0.85rem', color: '#4A4A4A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '6px', height: '6px', background: '#D62828' }}></div> Requests for Seed Phrases</li>
              </ul>
            </div>
            <div style={{ color: '#D62828', fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
              Learn More <ArrowRight size={16} />
            </div>
          </div>

          {/* Smishing */}
          <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #F0F0F0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#FFF3EB', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <MessageSquare color="#FF6B00" />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '1rem' }}>Smishing</h3>
            <p style={{ color: '#666666', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>
              SMS-based phishing attacks involving fake package delivery alerts or bank security warnings.
            </p>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#D62828', letterSpacing: '0.1em', marginBottom: '1rem' }}>RED FLAGS</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ fontSize: '0.85rem', color: '#4A4A4A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '6px', height: '6px', background: '#D62828' }}></div> Shortened Suspicious URLs</li>
                <li style={{ fontSize: '0.85rem', color: '#4A4A4A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '6px', height: '6px', background: '#D62828' }}></div> Fake "Failed Delivery" Texts</li>
                <li style={{ fontSize: '0.85rem', color: '#4A4A4A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '6px', height: '6px', background: '#D62828' }}></div> Origin From 10-digit Numbers</li>
              </ul>
            </div>
            <div style={{ color: '#D62828', fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
              Learn More <ArrowRight size={16} />
            </div>
          </div>

          {/* Social Engineering (Spans 2 columns) */}
          <div className="col-span-mobile-full flex-responsive-split" style={{ gridColumn: 'span 2', background: '#FFFFFF', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #F0F0F0' }}>
            <div style={{ flex: '1', paddingRight: '2rem' }}>
              <div style={{ background: '#FFF3EB', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <BrainCircuit color="#FF6B00" />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '1rem' }}>Social Engineering</h3>
              <p style={{ color: '#666666', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Manipulation techniques that exploit human psychology to gain access to buildings, data, or systems.
              </p>
            </div>

            <div style={{ flex: '1.5', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#666666', letterSpacing: '0.1em', marginBottom: '1rem', textTransform: 'uppercase' }}>TACTICAL RED FLAGS</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ background: '#F8F9FA', padding: '0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', fontWeight: 600, color: '#1A1A1A' }}>
                  <div style={{ background: '#FF6B00', color: '#FFF', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem' }}>1</div> Tailgating attempts
                </div>
                <div style={{ background: '#F8F9FA', padding: '0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', fontWeight: 600, color: '#1A1A1A' }}>
                  <div style={{ background: '#FF6B00', color: '#FFF', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem' }}>2</div> Authority impersonation
                </div>
                <div style={{ background: '#F8F9FA', padding: '0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', fontWeight: 600, color: '#1A1A1A' }}>
                  <div style={{ background: '#FF6B00', color: '#FFF', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem' }}>3</div> Pretexting scenarios
                </div>
                <div style={{ background: '#F8F9FA', padding: '0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', fontWeight: 600, color: '#1A1A1A' }}>
                  <div style={{ background: '#FF6B00', color: '#FFF', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem' }}>4</div> Baiting with "Free" offers
                </div>
              </div>
              <div style={{ color: '#D62828', fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                Deep Dive into Psychology <ArrowRight size={16} />
              </div>
            </div>
            
          </div>

        </div>
      </div>

      {/* 3. Latest Intelligence */}
      <div className="section-padding" style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '5rem' }}>
        <h2 className="mobile-text-h2" style={{ fontWeight: 800, color: '#1A1A1A', marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>Latest Intelligence</h2>

        <div className="flex-responsive-split">
          
          {/* Main Dark Deep Dive Feature */}
          <div style={{ 
            flex: 1,
            background: '#0F172A', 
            borderRadius: '24px', 
            padding: '2.5rem', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-end',
            minHeight: '400px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
          }}>
            {/* Visual background element to replace strict image dependency */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(45deg, #0F172A 40%, #1E3A5F 100%)', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '60%', background: 'linear-gradient(to bottom, rgba(15,23,42,0) 0%, rgba(15,23,42,0.9) 100%)', zIndex: 1 }}></div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ background: '#FF6B00', color: '#FFF', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', padding: '0.3rem 0.6rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem', textTransform: 'uppercase' }}>
                DEEP DIVE
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1rem', lineHeight: 1.2 }}>
                The Rise of AI Voice Cloning in Ransom Scams
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '400px' }}>
                Criminals are now using just 3 seconds of audio to clone voices of loved ones. Learn how to verify identity in seconds.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#64748B', fontSize: '0.8rem', fontWeight: 600 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={14} /> 5 min read</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Eye size={14} /> 12.4K views</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1.2 }}>
            
            {/* Top Wide Text Card */}
            <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #F0F0F0', flex: '1' }}>
              <div style={{ color: '#D62828', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '1rem', textTransform: 'uppercase' }}>NEW THREAT VECTOR</div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.75rem' }}>QR Code Jacking: The 'Quishing' Epidemic</h3>
              <p style={{ color: '#666666', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                How hackers are replacing public QR codes with malicious links to drain digital wallets.
              </p>
              <div style={{ color: '#D62828', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                Read Trend Analysis <ArrowRight size={14} />
              </div>
            </div>

            {/* Bottom Stack: Teal & Grey Info cards */}
            <div className="grid-responsive-2" style={{ flex: '1' }}>
              
              <div style={{ background: '#A7F3D0', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#064E3B', lineHeight: 1.4 }}>5 Quick Tips for Secure Browsing</h3>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857' }}>12.04.2024</div>
              </div>

              <div style={{ background: '#EAEAEA', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#FF6B00', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '1rem' }}>
                    <AlertTriangle size={14} /> ALERT
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1A1A1A', lineHeight: 1.4, marginBottom: '2rem' }}>
                    New Tax Refund Phishing Campaign Detected
                  </h3>
                </div>
                <div style={{ height: '4px', background: '#D1D5DB', borderRadius: '2px', width: '100%', overflow: 'hidden' }}>
                  <div style={{ width: '40%', height: '100%', background: '#FF6B00' }}></div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* 4. Footer CTA Knowledge Assessment */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        <div style={{ 
          background: '#111111', 
          borderRadius: '32px', 
          padding: quizStarted ? '4rem 2rem' : '6rem 2rem', 
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'all 0.3s ease'
        }}>
          {/* Background Dotted subtle pattern */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#FF6B00 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

          {!quizStarted ? (
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
              <div style={{ background: 'rgba(255, 107, 0, 0.1)', color: '#FF6B00', border: '1px solid rgba(255, 107, 0, 0.2)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', textTransform: 'uppercase' }}>
                 <Shield size={14} /> KNOWLEDGE ASSESSMENT
              </div>

              <h2 className="mobile-text-hero" style={{ fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                Are You Unscammable? Put Your Instincts to the Test
              </h2>

              <p style={{ color: '#A3A3A3', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem' }}>
                Take our dynamic AI "Sentinel Quiz" to see how well you can distinguish between a sophisticated attack and a legitimate message.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <button onClick={startQuiz} style={{ background: '#FF6B00', color: '#FFFFFF', border: 'none', padding: '1.2rem 2.5rem', borderRadius: '12px', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 20px rgba(255,107,0,0.4)', transition: 'all 0.2s' }}>
                  Start Quiz Now
                </button>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', marginLeft: '0.5rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#333', border: '2px solid #111', marginLeft: '-10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Shield size={12} color="#888"/></div>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#444', border: '2px solid #111', marginLeft: '-10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Eye size={12} color="#AAA"/></div>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#555', border: '2px solid #111', marginLeft: '-10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PlayCircle size={12} color="#CCC"/></div>
                  </div>
                  <div style={{ color: '#888', fontSize: '0.8rem', fontWeight: 600 }}>
                    People tested today
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '650px', margin: '0 auto', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ background: 'rgba(255, 107, 0, 0.1)', color: '#FF6B00', border: '1px solid rgba(255, 107, 0, 0.2)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em' }}>
                     AI SCAM ARENA
                  </div>
                  {isLoadingScenario && <span style={{ color: '#FF6B00', fontSize: '0.8rem', animation: 'pulse 1s infinite' }}>• Loading...</span>}
                </div>
                <div style={{ color: '#FFF', fontSize: '0.9rem', fontWeight: 700 }}>
                  Score: <span style={{ color: '#FF6B00' }}>{score.correct}/{score.total}</span> ({score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%)
                </div>
              </div>

              {isLoadingScenario ? (
                <div style={{ height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem', color: '#888' }}>
                  <div style={{ width: '40px', height: '40px', border: '4px solid #333', borderTop: '4px solid #FF6B00', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  <p>AI is drafting a realistic test scenario...</p>
                </div>
              ) : currentScenario ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Phone Simulator Display */}
                  <div style={{ background: '#1A1A1A', border: '1px solid #333', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}>
                    <div style={{ background: '#262626', padding: '0.8rem 1.25rem', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF6B00' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#A3A3A3', letterSpacing: '0.05em' }}>
                          INCOMING {currentScenario.type?.toUpperCase()}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#666', fontFamily: 'monospace' }}>SECURE LINE</span>
                    </div>

                    <div style={{ padding: '1.5rem', background: '#0F0F0F' }}>
                      <p style={{ color: '#FFF', fontSize: '1rem', lineHeight: 1.6, margin: 0, fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                        {currentScenario.content}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  {!hasAnswered ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <button 
                        onClick={() => handleAnswer('scam')}
                        style={{ background: '#EF4444', color: '#FFF', border: 'none', padding: '1.1rem', borderRadius: '10px', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'background 0.2s' }}
                      >
                        🚨 REPORT AS SCAM
                      </button>
                      <button 
                        onClick={() => handleAnswer('safe')}
                        style={{ background: '#10B981', color: '#FFF', border: 'none', padding: '1.1rem', borderRadius: '10px', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'background 0.2s' }}
                      >
                        ✅ MARK AS SAFE
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {/* Feedback Panel */}
                      {(() => {
                        const isCorrect = (selectedAnswer === 'scam') === currentScenario.isScam;
                        return (
                          <div style={{ background: isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)', border: `1px solid ${isCorrect ? '#10B981' : '#EF4444'}`, borderRadius: '14px', padding: '1.5rem' }}>
                            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 800, color: isCorrect ? '#10B981' : '#EF4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              {isCorrect ? '✅ CORRECT DECISION' : '❌ INCORRECT DECISION'}
                            </h3>
                            <p style={{ color: '#D4D4D4', fontSize: '0.9rem', lineHeight: 1.5, margin: '0 0 1rem' }}>
                              This message was actually **{currentScenario.isScam ? `a SCAM (${currentScenario.scamType})` : 'SAFE & LEGITIMATE'}**.
                            </p>
                            
                            <p style={{ color: '#A3A3A3', fontSize: '0.85rem', lineHeight: 1.5, margin: '0 0 1rem', fontStyle: 'italic' }}>
                              {currentScenario.explanation}
                            </p>

                            {currentScenario.isScam && currentScenario.redFlags?.length > 0 && (
                              <div>
                                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#EF4444', letterSpacing: '0.06em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Detected Red Flags</div>
                                <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                                  {currentScenario.redFlags.map((flag, idx) => (
                                    <li key={idx} style={{ color: '#D4D4D4', fontSize: '0.82rem', marginBottom: '0.25rem' }}>{flag}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* Navigation buttons */}
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button 
                          onClick={loadNewScenario}
                          style={{ flex: 1, background: '#FF6B00', color: '#FFFFFF', border: 'none', padding: '1.1rem', borderRadius: '10px', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(255,107,0,0.3)' }}
                        >
                          NEXT CHALLENGE ➔
                        </button>
                        <button 
                          onClick={resetQuiz}
                          style={{ background: '#333', color: '#FFF', border: 'none', padding: '1.1rem 1.5rem', borderRadius: '10px', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer' }}
                        >
                          EXIT ARENA
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
