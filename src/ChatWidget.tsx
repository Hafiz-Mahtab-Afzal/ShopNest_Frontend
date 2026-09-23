import React, { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import axios from 'axios';

// ──────────────────────────────────────────────────
// CONFIG — Backend URL (ShopNest Production / Dev)
// ──────────────────────────────────────────────────
const API = 'http://localhost:5000';
const CHAT_API = `${API}/api/v1/api/chat`;

// TypeScript Interfaces
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface StartResponse {
  success: boolean;
  sessionId: string;
  message: string;
}

interface MessageResponse {
  success: boolean;
  message: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [starting, setStarting] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Input focus handler
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // ── Chat Session Start Karo ──
  const handleOpen = async (): Promise<void> => {
    setIsOpen(true);
    if (hasStarted) return;

    setStarting(true);
    try {
      const { data } = await axios.post<StartResponse>(
        `${CHAT_API}/start`,
        {},
        { withCredentials: true }
      );
      if (data.success) {
        setSessionId(data.sessionId);
        setMessages([{ role: 'assistant', content: data.message }]);
        setHasStarted(true);
      }
    } catch {
      setMessages([
        {
          role: 'assistant',
          content: 'Assalam-o-Alaikum! ShopNest Support mein khush aamdeed 🛍️ Main aapki kya madad kar sakta hun?'
        }
      ]);
      setHasStarted(true);
    } finally {
      setStarting(false);
    }
  };

  // ── Message Bhejo ──
  const sendMessage = async (): Promise<void> => {
    const text = inputText.trim();
    if (!text || loading) return;

    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInputText('');
    setLoading(true);

    try {
      const { data } = await axios.post<MessageResponse>(
        `${CHAT_API}/message`,
        { sessionId, message: text },
        { withCredentials: true }
      );

      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: 'Maafi chahta hun, kuch masla hua. Dobara try karein 🙏' }
        ]);
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Connection error. Thodi der baad dobara try karein.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── DESIGN SPECIFIC FLOATING & GLOWING ANIMATIONS ── */}
      <style>{`
        @keyframes robot-bounce-float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes dynamic-aura-glow {
          0% { transform: scale(0.95); opacity: 0.5; filter: blur(8px); }
          50% { transform: scale(1.12); opacity: 0.8; filter: blur(14px); }
          100% { transform: scale(0.95); opacity: 0.5; filter: blur(8px); }
        }
        @keyframes floor-shadow {
          0% { transform: scale(1); opacity: 0.35; }
          50% { transform: scale(0.8); opacity: 0.15; }
          100% { transform: scale(1); opacity: 0.35; }
        }
        @keyframes eye-blink-cycle {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        .robot-floating-engine {
          animation: robot-bounce-float 3.5s ease-in-out infinite;
        }
        .aura-backlight-glowing {
          animation: dynamic-aura-glow 3.5s ease-in-out infinite;
        }
        .floor-shadow-glow {
          animation: floor-shadow 3.5s ease-in-out infinite;
        }
        .vector-robot-eye {
          transform-origin: center;
          animation: eye-blink-cycle 4.2s infinite;
        }
      `}</style>

      {/* ── FLOATING WIDGET ZONE ── */}
      <div className="fixed bottom-3 right-3 lg:bottom-5 lg:right-5 z-50 flex flex-col items-center origin-bottom-right scale-[0.65] lg:transform-none">
        
        {/* Exact Match Speech Layout Header Box */}
        {!isOpen && (
          <div className="relative mb-3 flex flex-col items-center animate-bounce" style={{ animationDuration: '2.5s' }}>
            <div className="bg-white text-center px-5 py-2.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 backdrop-blur-md">
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mb-0.5">Support service with AI</p>
              <p className="text-xs text-cyan-500 font-extrabold tracking-wide uppercase">CHAT WITH US</p>
            </div>
            {/* Centered Speech Triangle Pointer */}
            <div className="w-3 h-3 bg-white border-r border-b border-slate-100 rotate-45 -mt-1.5 shadow-sm"></div>
          </div>
        )}

        {/* Master Active Toggle Area Container */}
        <button
          onClick={isOpen ? () => setIsOpen(false) : handleOpen}
          className={`relative focus:outline-none transition-transform duration-300 active:scale-95 ${!isOpen ? 'robot-floating-engine' : ''}`}
          style={{ width: '105px', height: '115px' }}
        >
          {/* Dynamic Colors Side Wave Radiating Aura Effect */}
          {!isOpen && (
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-cyan-400/40 via-blue-500/20 to-cyan-400/40 aura-backlight-glowing" style={{ margin: '-10px' }}></div>
          )}

          {isOpen ? (
            /* Dark Fluid Circle Cross Minimizer Icon */
            <div className="w-16 h-16 mx-auto mt-6 rounded-full bg-gradient-to-tr from-slate-800 to-slate-950 text-white shadow-2xl border border-cyan-500/30 flex items-center justify-center transition-transform transform hover:rotate-90">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="3" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </div>
          ) : (
            /* High Definition Replica Vector Render Engine */
            <svg viewBox="0 0 100 110" className="w-full h-full drop-shadow-[0_10px_15px_rgba(6,182,212,0.15)]">
              <defs>
                <linearGradient id="bodyMeshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="65%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
                <linearGradient id="visorGlassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="cyanNeonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>

              {/* Side Mechanic Nodes / Ears */}
              <rect x="14" y="38" width="6" height="16" rx="3" fill="#94a3b8" />
              <rect x="80" y="38" width="6" height="16" rx="3" fill="#94a3b8" />
              <circle cx="17" cy="38" r="1.5" fill="#00f0ff" />
              <circle cx="83" cy="38" r="1.5" fill="#00f0ff" />
              
              {/* Spherical Main Dome Shell */}
              <ellipse cx="50" cy="42" rx="32" ry="27" fill="url(#bodyMeshGrad)" stroke="#e2e8f0" strokeWidth="1" />
              {/* Glossy Core Reflection Highlights */}
              <path d="M28 32 C 35 18, 65 18, 72 32 C 60 26, 40 26, 28 32 Z" fill="#ffffff" opacity="0.6" />
              
              {/* Space Blue Visor Shield */}
              <ellipse cx="50" cy="44" rx="26" ry="19" fill="url(#visorGlassGrad)" stroke="#334155" strokeWidth="0.5" />
              
              {/* Cyan Digital Eye Nodes */}
              <ellipse cx="38" cy="44" rx="3.5" ry="6" fill="#00f0ff" className="vector-robot-eye" />
              <ellipse cx="62" cy="44" rx="3.5" ry="6" fill="#00f0ff" className="vector-robot-eye" />
              
              {/* Dynamic External Side Limbs */}
              <path d="M16 68 C 12 55, 24 50, 28 58 L 22 76 C 20 78, 16 74, 16 68 Z" fill="url(#bodyMeshGrad)" stroke="#cbd5e1" strokeWidth="0.5" />
              <path d="M84 68 C 88 55, 76 50, 72 58 L 78 76 C 80 78, 84 74, 84 68 Z" fill="url(#bodyMeshGrad)" stroke="#cbd5e1" strokeWidth="0.5" />
              <circle cx="25" cy="56" r="3.5" fill="url(#cyanNeonGlow)" />
              <circle cx="75" cy="56" r="3.5" fill="url(#cyanNeonGlow)" />

              {/* Main Body Frame */}
              <path d="M30 65 C 30 55, 70 55, 70 65 L 65 88 C 65 94, 35 94, 35 88 Z" fill="url(#bodyMeshGrad)" stroke="#cbd5e1" strokeWidth="0.5" />
              
              {/* Cyan Chest Plate Arch Ribbon Accent */}
              <path d="M31 72 Q 50 78 69 72" fill="none" stroke="url(#cyanNeonGlow)" strokeWidth="3" strokeLinecap="round" />
              
              {/* Thruster Core Base Emission Node */}
              <ellipse cx="50" cy="94" rx="14" ry="4" fill="url(#cyanNeonGlow)" opacity="0.9" className="blur-[1px]" />
            </svg>
          )}
        </button>

        {/* Real Dynamic Ground Base Shadow Projection */}
        {!isOpen && (
          <div className="w-14 h-2 bg-cyan-500/20 rounded-full blur-md mt-1 scale-x-90 floor-shadow-glow"></div>
        )}
      </div>

      {/* ── SHOPNEST PREMIUM CHAT WINDOW ── */}
      <div
        className={`fixed bottom-28 right-6 z-50 w-80 max-w-[90vw] max-h-[70vh] lg:max-h-none sm:w-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ height: '520px', background: '#0b0f19', border: '1px solid rgba(6, 182, 212, 0.15)' }}
      >
        {/* HEADER */}
        <div
          className="flex items-center gap-3 px-4 py-3 flex-shrink-0 border-b border-cyan-500/10"
          style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}
        >
          {/* Neon Mini Avatar */}
          <div className="w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-lg flex-shrink-0 animate-pulse">
            🤖
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-cyan-400 font-bold text-sm tracking-wide">NestBot — ShopNest AI</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
              <span className="text-slate-400 text-xs">Online — Expert Support Specialist</span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white transition-colors flex-shrink-0 p-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* MESSAGES LAYER */}
        <div 
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e293b transparent' }}
        >
          {/* Server Starting Trigger */}
          {starting && (
            <div className="flex items-center gap-2 justify-center py-8">
              <div className="w-2.5 h-2.5 rounded-full animate-bounce bg-cyan-400" style={{ animationDelay: '0ms' }}/>
              <div className="w-2.5 h-2.5 rounded-full animate-bounce bg-cyan-400" style={{ animationDelay: '150ms' }}/>
              <div className="w-2.5 h-2.5 rounded-full animate-bounce bg-cyan-400" style={{ animationDelay: '300ms' }}/>
            </div>
          )}

          {/* Render Messages Dynamic */}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xs flex-shrink-0 mr-2 mt-0.5">
                  🤖
                </div>
              )}
              <div
                className="max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line"
                style={
                  msg.role === 'user'
                    ? { background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', color: 'white', borderBottomRightRadius: '4px' }
                    : { background: '#1e293b', color: '#f1f5f9', borderBottomLeftRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }
                }
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* AI Typing Animation */}
          {loading && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xs flex-shrink-0 mr-2">
                🤖
              </div>
              <div 
                className="px-4 py-3 rounded-2xl flex items-center gap-1.5"
                style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.05)', borderBottomLeftRadius: '4px' }}
              >
                <span className="w-2 h-2 rounded-full animate-bounce bg-cyan-400" style={{ animationDelay: '0ms' }}/>
                <span className="w-2 h-2 rounded-full animate-bounce bg-cyan-400" style={{ animationDelay: '150ms' }}/>
                <span className="w-2 h-2 rounded-full animate-bounce bg-cyan-400" style={{ animationDelay: '300ms' }}/>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT PANEL */}
        <div 
          className="flex-shrink-0 px-3 py-3 border-t border-cyan-500/10"
          style={{ background: '#0b0f19' }}
        >
          <div className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your order..."
              rows={1}
              disabled={loading || starting}
              className="flex-1 resize-none rounded-xl px-3 py-2.5 text-sm outline-none transition-all disabled:opacity-40"
              style={{
                background: '#141b2d',
                color: '#f8fafc',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                maxHeight: '90px',
                lineHeight: '1.5'
              }}
              onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                const target = e.currentTarget;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 90) + 'px';
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || starting || !inputText.trim()}
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
          <p className="text-center mt-2.5 text-[11px] tracking-wider text-slate-500 uppercase">
            Secured Support Engine • ShopNest 2026
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;