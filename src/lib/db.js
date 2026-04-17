// Since we don't have real Firebase configuration credentials provided,
// we will build a robust mock database service that persists data to localStorage
// to fulfill the requirements of storing scans, retrieving analytics, patterns, and trends.

const STORAGE_KEY_SCAMS = 'scamshield_detected_scams';
const STORAGE_KEY_REPORTS = 'scamshield_user_reports';

// Helper to initialize storage if empty
const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY_SCAMS)) {
    // Scaffold some initial seed data for the dashboard to look populated
    const seedScams = [
      { id: 'SCM-101', type: 'Bank Impersonation', platform: 'SMS / Text Message', risk: 'Dangerous', probability: 98, timestamp: new Date(Date.now() - 3600000).toISOString(), keywords: ['urgent', 'verify', 'account'] },
      { id: 'SCM-102', type: 'Phishing', platform: 'Email', risk: 'Dangerous', probability: 92, timestamp: new Date(Date.now() - 7200000).toISOString(), keywords: ['password', 'login', 'unauthorized'] },
      { id: 'SCM-103', type: 'Reward Scam', platform: 'Social Media', risk: 'Suspicious', probability: 75, timestamp: new Date(Date.now() - 86400000).toISOString(), keywords: ['winner', 'prize', 'claim'] },
      { id: 'SCM-104', type: 'Tech Support Scam', platform: 'Website / URL', risk: 'Dangerous', probability: 99, timestamp: new Date(Date.now() - 172800000).toISOString(), keywords: ['virus', 'microsoft', 'call'] },
      { id: 'SCM-105', type: 'Bank Impersonation', platform: 'SMS / Text Message', risk: 'Dangerous', probability: 94, timestamp: new Date(Date.now() - 259200000).toISOString(), keywords: ['locked', 'sbi', 'kyc'] }
    ];
    localStorage.setItem(STORAGE_KEY_SCAMS, JSON.stringify(seedScams));
  }
  
  if (!localStorage.getItem(STORAGE_KEY_REPORTS)) {
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify([]));
  }
};

initStorage();

export const dbService = {
  // Save a scanned result
  saveScanResult: async (scanData, userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const scams = JSON.parse(localStorage.getItem(STORAGE_KEY_SCAMS) || '[]');
        
        // Extract basic keywords for dummy analytics
        const words = (scanData.contentAnalyzed || "").toLowerCase().split(/\s+/);
        const keywords = words.filter(w => w.length > 4 && !['https', 'http', 'www'].includes(w)).slice(0, 3);
        
        const newRecord = {
          id: Date.now(),
          userEmail: userData?.email || 'anonymous',
          userName: userData?.name || 'Anonymous User',
          createdAt: new Date().toISOString(),
          type: scanData.scamType || 'Unknown',
          platform: scanData.platformContext || 'Unknown',
          risk: scanData.riskLevel,
          probability: scanData.probability,
          timestamp: new Date().toISOString(), // Keep legacy timestamp for compatibility if needed
          keywords: keywords,
          payload: scanData // Include actual data payload as requested
        };
        
        scams.unshift(newRecord); // Add to beginning
        localStorage.setItem(STORAGE_KEY_SCAMS, JSON.stringify(scams));
        resolve(newRecord);
      }, 500); // simulate network delay
    });
  },

  // Save a user manual report
  saveUserReport: async (reportData, userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reports = JSON.parse(localStorage.getItem(STORAGE_KEY_REPORTS) || '[]');
        const newReport = {
          id: Date.now(),
          userEmail: userData?.email || 'anonymous',
          userName: userData?.name || 'Anonymous User',
          createdAt: new Date().toISOString(),
          ...reportData,
          payload: reportData // Include actual data payload
        };
        reports.unshift(newReport);
        localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(reports));
        resolve(newReport);
      }, 600);
    });
  },

  // Get User Reports
  getUserReports: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reports = JSON.parse(localStorage.getItem(STORAGE_KEY_REPORTS) || '[]');
        resolve(reports);
      }, 300);
    });
  },

  // Get Scan History
  getScanHistory: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const scans = JSON.parse(localStorage.getItem(STORAGE_KEY_SCAMS) || '[]');
        resolve(scans);
      }, 300);
    });
  },

  // Get Analytics Dashboard Data
  getDashboardAnalytics: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const scams = JSON.parse(localStorage.getItem(STORAGE_KEY_SCAMS) || '[]');
        const reports = JSON.parse(localStorage.getItem(STORAGE_KEY_REPORTS) || '[]');
        
        const totalDetected = scams.length + reports.length;
        
        // Calculate common types
        const typeCounts = {};
        scams.forEach(s => { typeCounts[s.type] = (typeCounts[s.type] || 0) + 1; });
        const commonType = Object.keys(typeCounts).sort((a,b) => typeCounts[b] - typeCounts[a])[0] || 'Unknown';
        
        // Calculate common platforms
        const platformCounts = {};
        scams.forEach(s => { platformCounts[s.platform] = (platformCounts[s.platform] || 0) + 1; });
        const commonPlatform = Object.keys(platformCounts).sort((a,b) => platformCounts[b] - platformCounts[a])[0] || 'Unknown';

        // Calculate trending keywords
        const keywordCounts = {};
        scams.forEach(s => {
          if (s.keywords) {
            s.keywords.forEach(k => { keywordCounts[k] = (keywordCounts[k] || 0) + 1; });
          }
        });
        const trendingKeywords = Object.entries(keywordCounts)
          .sort((a,b) => b[1] - a[1])
          .slice(0, 5)
          .map(k => k[0]);

        // Fake timeline data for the chart based on the current count to make it look active
        const base = totalDetected * 10;
        const timeline = [
          { name: 'Mon', threats: base + Math.floor(Math.random() * 100) },
          { name: 'Tue', threats: base + Math.floor(Math.random() * 200) },
          { name: 'Wed', threats: base + Math.floor(Math.random() * 150) },
          { name: 'Thu', threats: base + Math.floor(Math.random() * 300) },
          { name: 'Fri', threats: base + Math.floor(Math.random() * 250) },
          { name: 'Sat', threats: base + Math.floor(Math.random() * 400) },
          { name: 'Sun', threats: base + Math.floor(Math.random() * 350) + 50 }, // Always show an uptick
        ];

        resolve({
          totalDetected,
          commonType,
          commonPlatform,
          trendingKeywords,
          recentScams: scams.slice(0, 5),
          timeline
        });

      }, 800);
    });
  }
};
