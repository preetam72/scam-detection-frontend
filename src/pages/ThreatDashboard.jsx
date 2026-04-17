import { useState, useEffect } from 'react';
import { Network, Activity, Users, ShieldAlert, ShieldCheck, Mail, MessageSquare, Phone, Globe, ShoppingCart, Plus, ArrowUpRight, TrendingUp, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dbService } from '../lib/db';

export default function ThreatDashboard() {
  const [liveFeed, setLiveFeed] = useState([]);
  const [reportedScams, setReportedScams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const analytics = await dbService.getDashboardAnalytics();
      
      // Map global feed format
      setLiveFeed(analytics.recentScams.map(s => ({
        id: s.id,
        platform: s.platform === 'Unknown' ? 'Email' : s.platform, // fallback
        title: s.type, // use type as title
        risk: s.risk === 'High' ? 'Critical' : s.risk === 'Low' ? 'Low Risk' : s.risk
      })));

      const userRpts = await dbService.getUserReports();
      const userScns = await dbService.getScanHistory();

      const combined = [
        ...userRpts.map(r => ({
          id: r.id,
          timestamp: r.timestamp,
          date: new Date(r.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          type: r.platform === 'SMS' ? 'SMS Phishing' : 'General Fraud',
          status: 'Under Review'
        })),
        ...userScns.map(s => ({
          id: s.id,
          timestamp: s.timestamp,
          date: new Date(s.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          type: s.type,
          status: s.risk === 'High' ? 'Resolved' : s.risk === 'Medium' ? 'Medium' : 'Confirmed'
        }))
      ];

      // Sort recent first
      combined.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
      setReportedScams(combined.slice(0, 10));
    };
    fetchData();
  }, []);

  const getRiskColor = (status) => {
    if (status.includes('Critical') || status.includes('High') || status.includes('Dangerous') || status === 'Confirmed') return 'var(--status-danger)';
    if (status.includes('Suspicious') || status.includes('Medium') || status === 'Under Review') return 'var(--status-warning)';
    return 'var(--status-safe)';
  };

  const getPlatformIcon = (platform) => {
    switch(platform) {
      case 'Email': return <Mail size={16} />;
      case 'SMS': return <MessageSquare size={16} />;
      case 'Voice': return <Phone size={16} />;
      case 'Social Media': return <Globe size={16} />;
      default: return <ShoppingCart size={16} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', paddingBottom: '0' }}>
      
      <div style={{ width: '100%', maxWidth: '1200px', padding: '0 2rem', margin: '4rem auto 6rem' }}>
        
        {/* 2. Page Header */}
        <header style={{ marginBottom: '3rem' }}>
          <h1 className="animate-fade-in" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Intelligence Dashboard
          </h1>
          <p className="animate-fade-in" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', animationDelay: '0.1s' }}>
            Real-time surveillance of the global threat landscape.
          </p>
        </header>

        {/* 3. Stats Cards Section */}
        <section className="animate-fade-in grid-responsive-dynamic" style={{ marginBottom: '2.5rem', animationDelay: '0.2s' }}>
          <div className="panel" style={{ padding: '2rem' }}>
            <div style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Scams Detected</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1 }}>1.2M+</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--status-safe)', fontSize: '0.85rem', fontWeight: 600 }}>
              <ArrowUpRight size={16} /> +12% from last month
            </div>
          </div>

          <div className="panel" style={{ padding: '2rem' }}>
            <div style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Active Threats</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1 }}>4,821</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--status-danger)', fontSize: '0.85rem', fontWeight: 600 }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--status-danger)', borderRadius: '50%' }}></div> High
            </div>
          </div>

          <div className="panel" style={{ padding: '2rem' }}>
            <div style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Users Protected</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1 }}>850k</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--status-safe)', fontSize: '0.85rem', fontWeight: 600 }}>
              <ShieldCheck size={16} /> Verified
            </div>
          </div>
        </section>

        {/* 4. Middle Section */}
        <section className="animate-fade-in flex-responsive-split" style={{ marginBottom: '2.5rem', animationDelay: '0.3s' }}>
          
          {/* LEFT: Trending Scams */}
          <div className="panel" style={{ padding: '2rem', flex: 1.5 }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={20} color="var(--accent-primary)" /> Trending Scams
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { title: 'Fake Bank Authorization SMS', desc: 'Alerts asking to verify unauthorized access.', status: 'Suspicious', icon: <MessageSquare size={18} /> },
                { title: 'Urgent Tax Refund Phishing', desc: 'Email linking to credential harvesting domains.', status: 'Dangerous', icon: <Mail size={18} /> },
                { title: 'Missed Parcel Notification', desc: 'Resolved malicious infrastructure routing.', status: 'Safe', icon: <Globe size={18} /> },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', background: '#FFFFFF' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'var(--bg-card)', padding: '0.75rem', borderRadius: '8px', color: 'var(--text-muted)' }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.2rem' }}>{item.title}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                    </div>
                  </div>
                  <span className={`badge ${item.status === 'Dangerous' ? 'badge-dangerous' : item.status === 'Suspicious' ? 'badge-warning' : 'badge-safe'}`} style={{ padding: '0.4rem 0.8rem', borderRadius: '20px' }}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Threat Keywords */}
          <div className="panel" style={{ padding: '2rem', flex: 1 }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Search size={20} color="var(--accent-primary)" /> Threat Keywords
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {['unusual activity', 'overdue invoice', 'unauthorized login', 'crypto mining', 'urgent update', 'verify identity', 'gift card', 'shipping cost'].map((kw, i) => (
                <span key={i} style={{ background: '#FFFFFF', border: '1px solid var(--border-color)', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-main)' }}>
                  {kw}
                </span>
              ))}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px' }}>
              These keywords are appearing frequently in scam communications in the last 24 hours.
            </p>
          </div>
        </section>

        {/* 5. Recent Activity Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <header style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Recent Activity</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Monitoring global trends and your contributions.</p>
          </header>

          <div className="flex-responsive-split">
            
            {/* LEFT: Global Threat Intelligence Feed */}
            <div className="panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Network size={18} color="var(--accent-primary)" /> Global Threat Intelligence
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--status-safe)', background: 'var(--status-safe-bg)', padding: '0.3rem 0.6rem', borderRadius: '4px', letterSpacing: '0.05em' }}>
                  <Activity size={12} /> LIVE FEED
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {liveFeed.map(feed => (
                  <div key={feed.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ color: 'var(--text-muted)' }}>{getPlatformIcon(feed.platform)}</div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.2rem', fontSize: '0.95rem' }}>{feed.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{feed.platform}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: getRiskColor(feed.risk), background: `rgba(${feed.risk === 'Critical' ? '239, 68, 68' : feed.risk === 'Medium' ? '245, 158, 11' : '239, 68, 68'}, 0.1)`, padding: '0.3rem 0.6rem', borderRadius: '4px' }}>
                      {feed.risk}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: My Reported Scams Table */}
            <div className="panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldAlert size={18} color="var(--accent-primary)" /> My Reported Scams
              </h3>
              
              <div className="table-responsive-wrapper" style={{ flex: 1 }}>
                <table style={{ width: '100%', minWidth: '400px', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '1rem 0.5rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.85rem' }}>Date</th>
                      <th style={{ padding: '1rem 0.5rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.85rem' }}>Type</th>
                      <th style={{ padding: '1rem 0.5rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.85rem' }}>Status</th>
                      <th style={{ padding: '1rem 0.5rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.85rem' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportedScams.map((report, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '1rem 0.5rem', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500 }}>{report.date}</td>
                        <td style={{ padding: '1rem 0.5rem', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500 }}>{report.type}</td>
                        <td style={{ padding: '1rem 0.5rem' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: getRiskColor(report.status) }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: getRiskColor(report.status) }}></div> {report.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 0.5rem' }}>
                          <Link to="/report" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-primary)', textDecoration: 'none' }}>View Details</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                <Link to="/report" className="btn btn-outline" style={{ width: '100%', padding: '1rem', justifyContent: 'center' }}>
                  Report a New Scam <Plus size={18} />
                </Link>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* 6. Footer (Global style) */}
      <footer style={{ width: '100%', borderTop: '1px solid var(--border-color)', padding: '2rem', background: '#FFFFFF' }}>
        <div className="section-padding" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontWeight: 600, flexWrap: 'wrap', justifyContent: 'center' }}>
             <ShieldAlert size={20} color="var(--accent-primary)" style={{ display: 'none' }}/> {/* Dummy space */ }
             <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Network size={20} color="var(--accent-primary)"/> ScamShield AI</span> 
             <span style={{ fontWeight: 400, color: 'var(--text-muted)', marginLeft: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>© 2026 Protecting digital citizens.</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="#" style={{ textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="#" style={{ textDecoration: 'none' }}>Terms of Service</Link>
            <Link to="#" style={{ textDecoration: 'none' }}>Security Disclosure</Link>
            <Link to="#" style={{ textDecoration: 'none' }}>Contact</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
