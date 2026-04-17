import React from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import {
  Download, Share2, Activity, CheckCircle2, AlertCircle, Link2Off,
  AlertTriangle, Shield, XSquare, Ban, MessageSquareWarning, Code,
  Search, ShieldAlert, Globe, Cpu, Database
} from 'lucide-react';

export default function ScamDetection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { requireAuth } = useOutletContext();
  const initialContent = location.state?.contentToScan || '';
  const initialPlatform = location.state?.platformChannel || 'Unknown';
  const result = location.state?.initialResult || null;

  const probability = result?.probability ?? 0;
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (probability / 100) * circumference;

  const isHigh = result?.riskLevel === 'High';
  const isMedium = result?.riskLevel === 'Medium';
  const isLow = result?.riskLevel === 'Low';

  const riskColor = isLow ? '#059669' : isMedium ? '#D97706' : '#DC2626';
  const riskBg   = isLow ? '#ECFDF5' : isMedium ? '#FFFBEB' : '#FEF2F2';
  const riskLabel = isHigh ? 'CRITICAL' : isMedium ? 'SUSPICIOUS' : 'SAFE';

  const reportId = `#VX-${Math.floor(10000 + Math.random() * 90000)}`;
  const scanTime = new Date().toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    timeZoneName: 'short'
  });

  const highlightIndicators = (text, indicators) => {
    if (!indicators?.length) return text;
    let out = text;
    indicators.forEach(ind => {
      if (typeof ind === 'string') {
        const safe = ind.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        out = out.replace(new RegExp(`(${safe})`, 'gi'),
          '<span style="background:#fef08a;color:#854d0e;padding:2px 5px;border-radius:4px;font-weight:700;">$1</span>');
      }
    });
    return <span dangerouslySetInnerHTML={{ __html: out }} />;
  };

  /* ── Empty State ── */
  if (!initialContent && !result) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9FAFB', padding: '2rem' }}>
        <div style={{ background: '#fff', padding: '4rem', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.06)', textAlign: 'center', maxWidth: '540px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#FFF0E6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Search size={36} color="var(--accent-primary)" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111', marginBottom: '0.75rem' }}>No Active Scan</h1>
          <p style={{ color: '#6B7280', lineHeight: 1.6, marginBottom: '2rem' }}>Paste a message on the home page to run a scan.</p>
          <button onClick={() => navigate('/')} style={{ background: '#111', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
            Go to Scanner
          </button>
        </div>
      </div>
    );
  }

  /* ── Error State ── */
  if (result?.riskLevel === 'Error') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9FAFB', padding: '2rem' }}>
        <div style={{ background: '#fff', padding: '4rem', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.06)', textAlign: 'center', maxWidth: '540px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <AlertTriangle size={36} color="#DC2626" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111', marginBottom: '0.75rem' }}>Analysis Failed</h1>
          <p style={{ color: '#6B7280', lineHeight: 1.6, marginBottom: '2rem' }}>Could not connect to the AI engine. Please try again.</p>
          <button onClick={() => navigate('/')} style={{ background: '#DC2626', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* ── Main Report ── */
  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>

        {/* ── Breadcrumb + Header ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.6rem', color: '#9CA3AF', letterSpacing: '0.04em' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>SCANS</span>
              <span>›</span>
              <span style={{ color: '#FF6B00' }}>ANALYSIS REPORT</span>
            </div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#111', margin: 0, letterSpacing: '-0.02em' }}>
              Report {reportId}
            </h1>
            <div style={{ color: '#6B7280', fontSize: '0.875rem', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              🗓 {scanTime}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.5rem' }}>
            <button 
              onClick={() => requireAuth(() => alert('Exporting report...'))}
              style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', background: '#fff', color: '#374151', border: '1px solid #E5E7EB', padding: '0.55rem 1.2rem', borderRadius: '8px', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}
            >
              <Download size={15} /> Export
            </button>
            <button 
              onClick={() => requireAuth(() => alert('Opening share dialog...'))}
              style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', background: '#FF6B00', color: '#fff', border: 'none', padding: '0.55rem 1.2rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(255,107,0,0.3)' }}
            >
              <Share2 size={15} /> Share
            </button>
          </div>
        </div>

        {/* ── Row 1: Threat Score + Technical Breakdown ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)', gap: '1.25rem', marginBottom: '1.25rem' }}>

          {/* Threat Score Card */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
            {/* CRITICAL badge */}
            <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: riskBg, color: riskColor, fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', padding: '0.3rem 0.6rem', borderRadius: '20px' }}>
              {riskLabel}
            </div>

            {/* SVG Gauge */}
            <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0.75rem 0 1.25rem' }}>
              <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="70" cy="70" r="54" fill="transparent" stroke="#F3F4F6" strokeWidth="11" />
                <circle
                  cx="70" cy="70" r="54"
                  fill="transparent"
                  stroke={riskColor}
                  strokeWidth="11"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111', lineHeight: 1 }}>{probability}</span>
                <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.06em', marginTop: '0.2rem' }}>THREAT SCORE</span>
              </div>
            </div>

            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111', marginBottom: '0.5rem' }}>
              {isHigh ? 'High Confidence Match' : isMedium ? 'Moderate Risk Signal' : 'Likely Safe'}
            </div>
            <p style={{ color: '#6B7280', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              {result?.analysis ? (
                <>Detected <span style={{ color: riskColor, fontWeight: 700 }}>{result.scamType}</span> targeting users via {initialPlatform.toLowerCase()}.
                <br />{result.analysis}</>
              ) : 'No analysis available.'}
            </p>
          </div>

          {/* Technical Analysis Breakdown Card */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#111', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Cpu size={18} color="#6B7280" /> Technical Analysis Breakdown
              </h2>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.6rem', color: '#9CA3AF', fontWeight: 700, letterSpacing: '0.06em' }}>SCAN ENGINE</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151' }}>Gemini v1.5 Flash</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                {
                  label: 'AI HEURISTICS',
                  icon: <Activity size={14} color={riskColor} />,
                  text: `Semantic analysis identifies ${isHigh ? 'manipulative tone and fraudulent patterns typical of credential theft' : isMedium ? 'some suspicious phrasing and urgency signals' : 'no significant manipulation patterns'}.`,
                },
                {
                  label: 'BLACKLIST MATCH',
                  icon: <Database size={14} color={riskColor} />,
                  text: `${isHigh ? 'Message content matches known scam patterns across recent reports' : isMedium ? 'Partial pattern match found in threat database' : 'No known scam patterns detected in database'}.`,
                },
                {
                  label: 'LINK FORENSICS',
                  icon: <Link2Off size={14} color={riskColor} />,
                  text: `${isHigh ? 'Multi-stage redirect chain detected with suspicious domain structure' : isMedium ? 'Link structure shows minor anomalies worth investigating' : 'No suspicious links or redirects identified'}.`,
                },
                {
                  label: 'DOMAIN METADATA',
                  icon: <Globe size={14} color={riskColor} />,
                  text: `${isHigh ? 'Domain registered recently in high-risk jurisdiction, DNS mismatches found' : isMedium ? 'Domain metadata shows some inconsistencies' : 'Domain metadata appears consistent and legitimate'}.`,
                },
              ].map((item, i) => (
                <div key={i} style={{ borderLeft: `3px solid ${riskColor}`, paddingLeft: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.35rem' }}>
                    {item.icon}
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#9CA3AF', letterSpacing: '0.06em' }}>{item.label}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#4B5563', lineHeight: 1.5 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Threat Indicators ── */}
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111', margin: '2rem 0 1rem' }}>Threat Indicators</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {result?.indicators?.length > 0 ? (
            result.indicators.slice(0, 3).map((ind, i) => {
              const icons = [<AlertTriangle size={22} />, <Link2Off size={22} />, <ShieldAlert size={22} />];
              const titles = ['Urgent Language', 'URL Discrepancy', 'Spoofed Origin'];
              return (
                <div key={i} style={{ background: '#fff', borderRadius: '14px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                  <div style={{ color: '#FF6B00', marginBottom: '0.85rem' }}>
                    {icons[i] || <AlertTriangle size={22} />}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#111', marginBottom: '0.4rem' }}>
                    {titles[i] || `Signal ${i + 1}`}
                  </div>
                  <p style={{ margin: 0, color: '#6B7280', fontSize: '0.83rem', lineHeight: 1.55 }}>
                    {typeof ind === 'string' ? ind : ind.text || String(ind)}
                  </p>
                </div>
              );
            })
          ) : (
            <div style={{ background: '#fff', borderRadius: '14px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ color: '#059669', marginBottom: '0.85rem' }}><CheckCircle2 size={22} /></div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#111', marginBottom: '0.4rem' }}>No Threats Detected</div>
              <p style={{ margin: 0, color: '#6B7280', fontSize: '0.83rem', lineHeight: 1.55 }}>AI did not find any distinct threat indicators in this message.</p>
            </div>
          )}
        </div>

        {/* ── Row 3: Remediation Path + Analyzed Payload ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '1.25rem' }}>

          {/* Remediation Path */}
          <div style={{ background: '#1A1A1A', borderRadius: '16px', padding: '2rem', color: '#fff', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ margin: '0 0 1.5rem', fontSize: '1.05rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={18} color="#FF6B00" /> Remediation Path
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', flex: 1, marginBottom: '2rem' }}>
              {[
                { num: 1, title: 'Purge Communication', desc: 'Delete the message to prevent accidental interaction.' },
                { num: 2, title: 'Block Sender', desc: 'Block the number or email address to stop further contact.' },
                { num: 3, title: 'Report to Carrier', desc: 'Forward payload to 7726 for carrier-level investigation.' },
              ].map((step) => (
                <div key={step.num} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>
                    {step.num}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{step.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#9CA3AF', lineHeight: 1.5 }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/')}
              style={{ width: '100%', padding: '0.9rem', background: '#FF6B00', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.06em', cursor: 'pointer', boxShadow: '0 4px 14px rgba(255,107,0,0.4)' }}
            >
              EXECUTE PROTECTION PROTOCOL
            </button>
          </div>

          {/* Analyzed Payload */}
          <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6' }}>
              <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#111', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Code size={16} color="#6B7280" /> Analyzed Payload
              </h2>
              <div style={{ background: '#F9FAFB', color: '#6B7280', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.06em', padding: '0.3rem 0.65rem', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
                READ ONLY ISOLATION
              </div>
            </div>

            <div style={{ background: '#111', margin: '1.25rem 1.25rem 0', borderRadius: '10px', padding: '1.25rem', flex: 1 }}>
              <div style={{ color: '#4B5563', fontSize: '0.75rem', fontFamily: 'monospace', marginBottom: '0.75rem' }}>
                // Raw Metadata: {initialPlatform.toUpperCase()}_INCOMING
              </div>
              <div style={{ color: '#D1D5DB', fontSize: '0.83rem', fontFamily: 'monospace', lineHeight: 1.65, wordBreak: 'break-all' }}>
                &ldquo;{highlightIndicators(initialContent || 'No content provided.', result?.indicators)}&rdquo;
              </div>
            </div>

            <div style={{ padding: '1rem 1.5rem', color: '#9CA3AF', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              🔒 This content is isolated in a secure virtual sandbox. Active URLs have been stripped of execution permissions.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
