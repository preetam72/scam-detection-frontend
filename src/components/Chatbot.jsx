import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X, Send, ShieldAlert } from 'lucide-react';
import './Chatbot.css';

export default function Chatbot() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Welcome to ScamShield AI Safety Center! 🛡️ I am your dedicated safety assistant. Ask me anything about identifying scams, safe browsing practices, or paste a suspicious message to scan for threats.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  
  // Track active scan context
  const [activeScan, setActiveScan] = useState(null);
  
  // Suggestion chips
  const [suggestionChips, setSuggestionChips] = useState([
    'Is this SMS a scam?',
    'What is a phishing attack?',
    'How do I report a fraud?',
    'Tips to stay safe online'
  ]);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat when messages update or chat is opened
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Turn off unread notification badge once chat is opened
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
    }
  }, [isOpen]);

  // Listen to path changes to load scan report context dynamically
  useEffect(() => {
    if (location.pathname === '/scan' && location.state?.initialResult) {
      const scanResult = location.state;
      setActiveScan(scanResult);
      
      // Check if last message was already about this scan report to avoid duplication
      const lastMsg = messages[messages.length - 1];
      const scannerWelcomeText = `🔍 **I see you are viewing a scan report (Threat Score: ${scanResult.initialResult.probability}%)**`;
      
      if (!lastMsg || !lastMsg.content.includes(scannerWelcomeText)) {
        const welcomeScanMsg = {
          id: Date.now(),
          role: 'assistant',
          content: `${scannerWelcomeText}\n\nI have loaded this report details. Let me know if you would like me to explain why this was flagged as **${scanResult.initialResult.riskLevel} Risk** or advise on what security actions to take next.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, welcomeScanMsg]);
        setHasUnread(true); // Alert/pulse the user that the chatbot is context-aware
      }

      setSuggestionChips([
        'Explain this scan report',
        'What should I do next?',
        'Is this type of scam common?',
        'How can I identify similar scams?'
      ]);
    } else {
      setActiveScan(null);
      setSuggestionChips([
        'Is this SMS a scam?',
        'What is a phishing attack?',
        'How do I report a fraud?',
        'Tips to stay safe online'
      ]);
    }
  }, [location]);

  const handleSend = async (messageText) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Create a temporary message placeholder for the streaming bot response
    const botMsgId = Date.now() + 1;
    const botPlaceholderMsg = {
      id: botMsgId,
      role: 'assistant',
      content: '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, botPlaceholderMsg]);

    try {
      // Map messages history to backend schema
      const history = messages
        .slice(-10)
        .map((msg) => ({
          role: msg.role,
          content: msg.content
        }));

      // Setup body parameters including scan context if on /scan page
      const requestBody = {
        message: textToSend,
        history,
        scanContext: activeScan ? {
          content: activeScan.contentToScan,
          result: activeScan.initialResult
        } : null
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/chat-stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to get streaming response');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;
      let streamedText = '';

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: !done });

        // SSE response formats data as "data: { ... }\n\n"
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            if (dataStr === '[DONE]') {
              break;
            }
            try {
              const dataJson = JSON.parse(dataStr);
              if (dataJson.text) {
                streamedText += dataJson.text;
                // Update the chatbot message text in real time
                setMessages((prev) => 
                  prev.map((msg) => 
                    msg.id === botMsgId ? { ...msg, content: streamedText } : msg
                  )
                );
              } else if (dataJson.error) {
                streamedText = `⚠️ ${dataJson.error}`;
                setMessages((prev) => 
                  prev.map((msg) => 
                    msg.id === botMsgId ? { ...msg, content: streamedText } : msg
                  )
                );
              }
            } catch (err) {
              // Fragment line, skip to parse next tick
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat stream error:', error);
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === botMsgId 
            ? { ...msg, content: '⚠️ Sorry, I could not connect to the ScamShield intelligence server. Please check your internet connection or try again shortly.' } 
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Premium formatting function for bullet points, strong tags, and URLs
  const formatMessageText = (text) => {
    if (!text) return '';

    // Escape HTML to prevent XSS
    let escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    // Parse bold text (**text**)
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Parse URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    escaped = escaped.replace(urlRegex, (url) => {
      const cleanUrl = url.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]$/, '');
      return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer">${cleanUrl}</a>`;
    });

    // Parse bullet points
    const lines = escaped.split('\n');
    let html = '';
    let inList = false;

    for (let line of lines) {
      const trimmed = line.trim();
      const listMatch = trimmed.match(/^[-*+]\s+(.*)$/);

      if (listMatch) {
        if (!inList) {
          html += '<ul>';
          inList = true;
        }
        html += `<li>${listMatch[1]}</li>`;
      } else {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        if (trimmed) {
          html += `<p>${trimmed}</p>`;
        }
      }
    }
    if (inList) {
      html += '</ul>';
    }

    return html;
  };

  return (
    <div className="chatbot-container">
      {/* Floating Action Button */}
      <button 
        className={`chatbot-trigger ${isOpen ? 'chatbot-trigger-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with ScamShield Assistant"
        aria-label="Toggle chat window"
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
        {hasUnread && !isOpen && <span className="chatbot-badge" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <ShieldAlert size={20} />
              </div>
              <div className="chatbot-title-container">
                <span className="chatbot-title">ScamShield Advisor</span>
                <span className="chatbot-status">
                  <span className="chatbot-status-dot" />
                  AI Agent • Active
                </span>
              </div>
            </div>
            <button 
              className="chatbot-close-btn" 
              onClick={() => setIsOpen(false)}
              aria-label="Close chat window"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`chatbot-message-wrapper ${msg.role}`}
              >
                <div 
                  className="chatbot-message"
                  dangerouslySetInnerHTML={{ __html: formatMessageText(msg.content) }}
                />
                <span className="chatbot-timestamp">{msg.time}</span>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.content === '' && (
              <div className="chatbot-message-wrapper assistant">
                <div className="chatbot-message">
                  <div className="typing-indicator">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="chatbot-suggestions-container">
            <span className="chatbot-suggestions-label">Frequently Asked Questions:</span>
            <div className="chatbot-suggestions">
              {suggestionChips.map((chipText, index) => (
                <button
                  key={index}
                  className="chatbot-suggestion-chip"
                  onClick={() => handleSend(chipText)}
                  disabled={isLoading}
                >
                  {chipText}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Input Area */}
          <div className="chatbot-input-area">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Ask a question or paste message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
            <button
              className="chatbot-send-btn"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
