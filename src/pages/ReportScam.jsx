import { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Link as LinkIcon,
  UploadCloud,
  ArrowRight,
  Calendar
} from 'lucide-react';
import { dbService } from '../lib/db';

export default function ReportScam() {
  const [formData, setFormData] = useState({ 
    platform: '', 
    datetime: '',
    priority: 'Medium',
    link: '',
    message: '',
    fullName: '',
    email: '',
    notify: false,
    anonymous: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await dbService.saveUserReport(formData);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 4000);
      setFormData({ 
        platform: '', datetime: '', priority: 'Medium', link: '', 
        message: '', fullName: '', email: '', notify: false, anonymous: false 
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh', paddingBottom: '5rem' }}>
      
      {/* Header Section */}
      <div style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '2.5rem', paddingHorizontal: '1rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#FCECE8', color: '#D64028', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
          <ShieldCheck size={14} /> SECURE SUBMISSION
        </div>
        
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          Expose the <span style={{ color: '#FF6B00' }}>Deception.</span>
        </h1>
        
        <p style={{ color: '#666666', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Your report feeds our AI intelligence network, helping protect millions from similar threats. Every detail counts.
        </p>
      </div>

      {/* Main Content Layout */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2.2fr', gap: '2.5rem', padding: '0 2rem' }}>
        
        {/* LEFT COLUMN: Info Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ background: '#F5F5F5', borderRadius: '16px', padding: '2rem', border: '1px solid #EAEAEA' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1A1A1A', marginBottom: '1.5rem' }}>Why report?</h3>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="#10B981" style={{ marginTop: '0.1rem', fill: 'rgba(16,185,129,0.1)' }} />
                <span style={{ fontSize: '0.9rem', color: '#4A4A4A', lineHeight: 1.5 }}>Real-time analysis by ScamShield AI models.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="#10B981" style={{ marginTop: '0.1rem', fill: 'rgba(16,185,129,0.1)' }} />
                <span style={{ fontSize: '0.9rem', color: '#4A4A4A', lineHeight: 1.5 }}>Global database update for browser protection.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="#10B981" style={{ marginTop: '0.1rem', fill: 'rgba(16,185,129,0.1)' }} />
                <span style={{ fontSize: '0.9rem', color: '#4A4A4A', lineHeight: 1.5 }}>Anonymous contribution to digital safety.</span>
              </li>
            </ul>
          </div>
          
          <div style={{ 
            background: 'linear-gradient(to bottom, #1E293B, #0F172A)', 
            borderRadius: '16px', 
            padding: '1.5rem', 
            height: '140px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'flex-end',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
          }}>
            {/* Fake Abstract Grid Background Graphic */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.3, backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
            
            <div style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 600, position: 'relative', zIndex: 2, lineHeight: 1.4 }}>
              <span style={{ color: '#38BDF8', fontWeight: 800 }}>98.4% Detection accuracy</span> across verified reports.
            </div>
          </div>
          
        </div>

        {/* RIGHT COLUMN: Form Panel */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '3rem', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: '1px solid #F0F0F0' }}>
          
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ display: 'inline-flex', background: '#E6F8ED', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                <CheckCircle2 size={48} color="#10B981" />
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.5rem' }}>Report Submitted Successfully</h2>
              <p style={{ color: '#666666' }}>Thank you for helping us secure the digital landscape.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Row 1 */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#4A4A4A', marginBottom: '0.5rem' }}>
                  Platform Where Scam Occurred <span style={{ color: '#D62828' }}>*</span>
                </label>
                <select 
                  required
                  style={{ width: '100%', padding: '0.9rem 1rem', background: '#F5F5F5', border: '1px solid transparent', borderRadius: '8px', fontSize: '0.95rem', color: '#1A1A1A', outline: 'none', cursor: 'pointer', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                  value={formData.platform}
                  onChange={e => setFormData({...formData, platform: e.target.value})}
                >
                  <option value="" disabled>Select a platform...</option>
                  <option value="SMS">SMS / Text Message</option>
                  <option value="Email">Email</option>
                  <option value="SocialMedia">Social Media</option>
                  <option value="Website">Website</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Row 2: Split */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#4A4A4A', marginBottom: '0.5rem' }}>
                    Date and Time of Occurrence <span style={{ color: '#D62828' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="datetime-local" 
                      required
                      style={{ width: '100%', padding: '0.9rem 1rem', background: '#F5F5F5', border: '1px solid transparent', borderRadius: '8px', fontSize: '0.95rem', color: '#1A1A1A', outline: 'none' }}
                      value={formData.datetime}
                      onChange={e => setFormData({...formData, datetime: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#4A4A4A', marginBottom: '0.5rem' }}>
                    Priority / Impact Level <span style={{ color: '#D62828' }}>*</span>
                  </label>
                  <select 
                    required
                    style={{ width: '100%', padding: '0.9rem 1rem', background: '#F5F5F5', border: '1px solid transparent', borderRadius: '8px', fontSize: '0.95rem', color: '#1A1A1A', outline: 'none', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                    value={formData.priority}
                    onChange={e => setFormData({...formData, priority: e.target.value})}
                  >
                    <option value="Low">Low - Suspicious only</option>
                    <option value="Medium">Medium - Potential financial risk</option>
                    <option value="High">High - Direct attack / identity theft</option>
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#4A4A4A', marginBottom: '0.5rem' }}>Scam URL or Domain</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <LinkIcon size={18} color="#999" style={{ position: 'absolute', left: '1rem' }} />
                  <input 
                    type="url" 
                    placeholder="https://suspicious-site.com"
                    style={{ width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem', background: '#F5F5F5', border: '1px solid transparent', borderRadius: '8px', fontSize: '0.95rem', color: '#1A1A1A', outline: 'none' }}
                    value={formData.link}
                    onChange={e => setFormData({...formData, link: e.target.value})}
                  />
                </div>
                <div style={{ fontSize: '0.65rem', color: '#888', marginTop: '0.4rem', fontWeight: 700, letterSpacing: '0.05em' }}>SAFE-CHECK: DO NOT CLICK THE LINK AFTER PASTING</div>
              </div>

              {/* Row 4 */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#4A4A4A', marginBottom: '0.5rem' }}>
                  Scam Details or Message Content <span style={{ color: '#D62828' }}>*</span>
                </label>
                <textarea 
                  required
                  rows="4"
                  placeholder="Describe the scam or paste the suspicious message text here..."
                  style={{ width: '100%', padding: '1rem', background: '#F5F5F5', border: '1px solid transparent', borderRadius: '8px', fontSize: '0.95rem', color: '#1A1A1A', outline: 'none', resize: 'vertical' }}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              {/* Row 5: File Upload */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#4A4A4A', marginBottom: '0.5rem' }}>Evidence (Screenshots)</label>
                <div style={{ border: '2px dashed #E5E5E5', background: '#FAFAFA', borderRadius: '8px', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}>
                  <UploadCloud size={32} color="#6B5344" style={{ marginBottom: '0.75rem' }} />
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1A1A1A', marginBottom: '0.2rem' }}>Drop screenshots here or click to browse</div>
                  <div style={{ fontSize: '0.75rem', color: '#888' }}>Support JPEG, PNG up to 10MB each</div>
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #EAEAEA', margin: '0.5rem 0' }} />

              {/* Row 6: Contact Info */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#4A4A4A', marginBottom: '1rem', letterSpacing: '0.05em' }}>CONTACT INFORMATION (OPTIONAL)</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#666666', marginBottom: '0.4rem' }}>Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      style={{ width: '100%', padding: '0.8rem 1rem', background: '#F5F5F5', border: 'none', borderRadius: '8px', fontSize: '0.9rem', color: '#1A1A1A', outline: 'none' }}
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#666666', marginBottom: '0.4rem' }}>Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      style={{ width: '100%', padding: '0.8rem 1rem', background: '#F5F5F5', border: 'none', borderRadius: '8px', fontSize: '0.9rem', color: '#1A1A1A', outline: 'none' }}
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={formData.notify}
                      onChange={e => setFormData({...formData, notify: e.target.checked})}
                      style={{ width: '16px', height: '16px', accentColor: '#FF6B00' }} 
                    />
                    <span style={{ fontSize: '0.85rem', color: '#4A4A4A', fontWeight: 500 }}>Notify me of the investigation results</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={formData.anonymous}
                      onChange={e => setFormData({...formData, anonymous: e.target.checked})}
                      style={{ width: '16px', height: '16px', accentColor: '#FF6B00' }} 
                    />
                    <span style={{ fontSize: '0.85rem', color: '#4A4A4A', fontWeight: 500 }}>I wish to remain completely anonymous</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                style={{ 
                  marginTop: '1rem',
                  background: '#FF6B00', 
                  color: '#FFFFFF', 
                  border: 'none', 
                  borderRadius: '8px', 
                  padding: '1.2rem', 
                  fontSize: '1rem', 
                  fontWeight: 700, 
                  cursor: isSubmitting ? 'not-allowed' : 'pointer', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  boxShadow: '0 4px 15px rgba(255,107,0,0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseOver={e => !isSubmitting && (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseOut={e => !isSubmitting && (e.currentTarget.style.transform = 'translateY(0)')}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report for Analysis'} <ArrowRight size={18} />
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#888', fontStyle: 'italic', marginTop: '0.5rem' }}>
                By submitting, you agree to our Security Disclosure policy.
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
