import React from 'react';
import { 
  ShieldCheck, Network, Cpu, ArrowRight, Lock, 
  Download, FileText, CheckCircle2, User
} from 'lucide-react';

export default function AboutProject() {
  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
      
      {/* 1. Hero Section */}
      <div className="flex-responsive-row section-padding" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', paddingTop: '4rem', paddingBottom: '5rem' }}>
        
        <div style={{ flex: '1', paddingRight: '2rem' }}>
          <div style={{ background: '#FFEFE5', color: '#FF6B00', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', display: 'inline-block', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
            OUR PURPOSE
          </div>
          <h1 className="mobile-text-hero" style={{ fontWeight: 800, color: '#1A1A1A', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            The Mission to <br/>Secure Every <br/>Connection
          </h1>
          <p style={{ color: '#666666', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            In an era of sophisticated digital deception, we are building the definitive defense layer for the human side of the internet.
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FFF3EB', border: '2px solid #FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={18} color="#FF6B00" /></div>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E6E6E6', border: '2px solid #FFF', marginLeft: '-15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={18} color="#666" /></div>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#D1D5DB', border: '2px solid #FFF', marginLeft: '-15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={18} color="#444" /></div>
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1A1A1A' }}>50+ Vigilant Curators</div>
              <div style={{ fontSize: '0.75rem', color: '#888' }}>Protecting millions daily</div>
            </div>
          </div>
        </div>

        <div style={{ flex: '1.2', position: 'relative' }}>
          {/* Main Dark Image Container */}
          <div style={{ background: '#111', borderRadius: '24px', overflow: 'hidden', height: '400px', width: '100%', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(45deg, #0F172A 10%, #38BDF8 100%)', opacity: 0.6 }}></div>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '10px 10px', opacity: 0.2 }}></div>
          </div>
          
          {/* Floating White Card */}
          <div style={{ position: 'absolute', bottom: '-20px', left: '-30px', background: '#FFFFFF', borderRadius: '16px', padding: '1.5rem 2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', zIndex: 10 }}>
            <div style={{ color: '#D62828', fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}>99.9%</div>
            <div style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.2rem' }}>Detection Accuracy</div>
            <div style={{ color: '#888', fontSize: '0.65rem' }}>Powered by our proprietary Neural Vigilance™<br/>engine.</div>
          </div>
        </div>
      </div>

      {/* 2. Our Story Section */}
      <div style={{ background: '#FFFFFF', padding: '6rem 0' }}>
        <div className="flex-responsive-row section-padding" style={{ maxWidth: '1200px', margin: '0 auto', alignItems: 'flex-start' }}>
          <div style={{ width: '200px', flexShrink: 0 }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Our Story</h2>
            <div style={{ borderBottom: '3px solid #D62828', width: '40px' }}></div>
          </div>
          <div style={{ flex: 1 }}>
            <h3 className="mobile-text-h2" style={{ fontWeight: 600, color: '#1A1A1A', lineHeight: 1.4, marginBottom: '2.5rem', maxWidth: '800px' }}>
              ScamShield AI was born from a simple realization: the tools used by scammers were evolving faster than the tools built to stop them.
            </h3>
            <div className="grid-responsive-2">
              <p style={{ color: '#666666', fontSize: '1rem', lineHeight: 1.7 }}>
                Founded in 2022 by a collective of cybersecurity veterans and neural network researchers, we set out to create a proactive defense mechanism. We noticed that while firewall and antivirus software protected machines, there was a massive vulnerability in human-to-human digital interaction.
              </p>
              <p style={{ color: '#666666', fontSize: '1rem', lineHeight: 1.7 }}>
                Our team's commitment goes beyond code. We believe digital safety is a fundamental right. Every line of our AI is trained to recognize the psychological triggers and technical patterns of fraud before they reach your screen, ensuring a curated, safe experience for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Our Technology Section */}
      <div style={{ background: '#F8F9FA', padding: '6rem 0' }}>
        <div className="section-padding" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="mobile-text-h1" style={{ fontWeight: 800, color: '#1A1A1A', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Our Technology</h2>
            <p style={{ color: '#666666', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Precision engineering meets editorial clarity. We treat security data as high-end visual content.
            </p>
          </div>

          <div className="grid-responsive-3" style={{ marginBottom: '1.5rem' }}>
            
            <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #F0F0F0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: '#FFF3EB', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Cpu color="#FF6B00" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '1rem' }}>Neural Vigilance™</h3>
              <p style={{ color: '#666666', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2.5rem', flex: 1 }}>
                Our core engine analyzes over 1.2 billion patterns daily. Using deep learning, it identifies 'synthetically malicious' behavior that traditional signature-based systems miss.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid #F0F0F0' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#888', letterSpacing: '0.05em' }}>REAL-TIME PROCESSING</span>
                <span style={{ background: '#FFF3EB', color: '#FF6B00', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.05em' }}>ACTIVE</span>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #F0F0F0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: '#FFF3EB', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Network color="#FF6B00" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '1rem' }}>Global Intelligence</h3>
              <p style={{ color: '#666666', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2.5rem', flex: 1 }}>
                A distributed network of threat sensors across 140 countries, providing localized intelligence for global protection.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #F0F0F0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: '#FFF3EB', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <ShieldCheck color="#D62828" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '1rem' }}>Zero-Day Shield</h3>
              <p style={{ color: '#666666', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2.5rem', flex: 1 }}>
                Predictive modeling that identifies emerging scam tactics within seconds of their first appearance in the wild.
              </p>
            </div>

          </div>

          <div style={{ background: '#111', borderRadius: '24px', overflow: 'hidden', height: '240px', width: '100%', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(90deg, rgba(255,107,0,0.1) 0%, transparent 100%), linear-gradient(0deg, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.4) 100%)', zIndex: 0 }}></div>
            
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '2.5rem', width: '400px', marginLeft: '3rem', position: 'relative', zIndex: 1, boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.75rem' }}>Curated Threat Intelligence</h3>
              <p style={{ color: '#666666', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                We don't just alert you; we provide clarity. Our dashboard translates complex cryptographic threats into actionable editorial insights.
              </p>
              <div style={{ color: '#D62828', fontSize: '0.85rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                Explore the API <ArrowRight size={14} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Trust & Transparency */}
      <div style={{ background: '#FFFFFF', padding: '6rem 0' }}>
        <div className="flex-responsive-row section-padding" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ flex: '1', paddingRight: '2rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Trust & Transparency</h2>
            <p style={{ color: '#666666', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '450px' }}>
              Trust is our most valuable asset. Unlike many security firms, we operate on a principle of radical transparency. We believe you shouldn't have to sacrifice privacy to achieve security.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ background: '#A7F3D0', padding: '0.6rem', borderRadius: '50%', color: '#064E3B', marginTop: '0.1rem' }}>
                  <Lock size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1A1A1A', marginBottom: '0.3rem' }}>Non-Storage Mandate</h4>
                  <p style={{ color: '#666666', fontSize: '0.85rem', lineHeight: 1.5 }}>We never store your personal identifiers. Meta-data is anonymized and purged every 24 hours.</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ background: '#A7F3D0', padding: '0.6rem', borderRadius: '50%', color: '#064E3B', marginTop: '0.1rem' }}>
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1A1A1A', marginBottom: '0.3rem' }}>End-to-End Encryption</h4>
                  <p style={{ color: '#666666', fontSize: '0.85rem', lineHeight: 1.5 }}>All communication between your device and our scanner is encrypted using military-grade RSA-2048.</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ flex: '1' }}>
            <div style={{ background: '#F8F9FA', borderRadius: '24px', padding: '3rem', border: '1px solid #F0F0F0' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '2rem' }}>Security Disclosures</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1A1A1A' }}>2023 Transparency Report</span>
                  <Download size={18} color="#666666" />
                </div>
                <div style={{ background: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1A1A1A' }}>SOC 2 Type II Certification</span>
                  <ShieldCheck size={18} color="#6B5344" />
                </div>
                <div style={{ background: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1A1A1A' }}>Data Processing Agreement</span>
                  <FileText size={18} color="#6B5344" />
                </div>
              </div>

              <p style={{ color: '#888', fontSize: '0.75rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                *All independent audits are conducted by accredited third-party firms. We publish our bug bounty results annually to maintain public accountability.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 5. Footer CTA (Join the Mission) */}
      <div style={{ background: '#1C1C1C', padding: '5rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Join the Mission</h2>
          <p style={{ color: '#A3A3A3', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Help us build a safer digital future. Whether you're a security researcher, a concerned citizen, or looking for your next career move, there's a place for you.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
            <button style={{ background: '#FF6B00', color: '#FFFFFF', border: 'none', padding: '1rem 2.5rem', borderRadius: '30px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(255,107,0,0.3)', transition: 'transform 0.2s' }}>
              Report a Threat
            </button>
            <button style={{ background: 'transparent', color: '#FFFFFF', border: '1px solid #444', padding: '1rem 2.5rem', borderRadius: '30px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#333'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
              View Careers
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
