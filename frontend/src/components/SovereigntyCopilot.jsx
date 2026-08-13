import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Terminal, Sparkles, Shield, AlertCircle, Bot, User } from 'lucide-react';

export default function SovereigntyCopilot({ isOpen, onClose, auditContext = {} }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Sovereignty Copilot initialized. I am grounded in the active telemetry for ${auditContext?.domain || 'the audited entity'}. Ask me any question regarding DPDP Act 2023 compliance, Section 16 cross-border data transfer rules, or software supply-chain hardening.`
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickPrompts = [
    "Why is this site's score flagged under DPDP Section 16?",
    "What legal risks do these third-party trackers introduce?",
    "How can I replace foreign analytics with domestic alternatives?"
  ];

  const handleSend = async (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMsg = { role: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          auditContext
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply || 'Inference error' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Network connection to Sovereign Copilot failed.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-obsidian-900 border-l border-obsidian-700 shadow-2xl flex flex-col backdrop-blur-md">
      {/* Header */}
      <div className="p-4 border-b border-obsidian-700 flex items-center justify-between bg-obsidian-850">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-tactical-amberDim border border-tactical-amber/40 flex items-center justify-center text-tactical-amber">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-slate-100 uppercase tracking-wide">Sovereignty Copilot</h3>
            <p className="text-[10px] font-mono text-slate-400">Context-Grounded DPDP & Supply Chain Intelligence</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-obsidian-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-6 h-6 rounded bg-tactical-amberDim border border-tactical-amber/30 flex-shrink-0 flex items-center justify-center text-tactical-amber mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`p-3 rounded-lg max-w-[85%] whitespace-pre-line leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-tactical-amber text-slate-950 font-semibold'
                  : 'bg-obsidian-850 border border-obsidian-700 text-slate-200 shadow-sm'
              }`}
            >
              {msg.text}
            </div>
            {msg.role === 'user' && (
              <div className="w-6 h-6 rounded bg-obsidian-700 flex-shrink-0 flex items-center justify-center text-slate-300 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-6 h-6 rounded bg-tactical-amberDim border border-tactical-amber/30 flex-shrink-0 flex items-center justify-center text-tactical-amber animate-pulse">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="p-3 rounded-lg bg-obsidian-850 border border-obsidian-700 text-slate-400 italic">
              Synthesizing legal telemetry & statutory findings...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 border-t border-obsidian-800 bg-obsidian-950/60 flex flex-col gap-1.5">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Suggested Queries:</span>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-[10px] font-mono text-slate-300 bg-obsidian-800 hover:bg-obsidian-700 border border-obsidian-700 hover:border-tactical-amber/40 px-2 py-1 rounded text-left transition-all truncate max-w-full"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 border-t border-obsidian-700 bg-obsidian-850 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask about DPDP compliance or data flows..."
          className="flex-1 bg-obsidian-950 border border-obsidian-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-tactical-amber/50"
        />
        <button
          type="submit"
          disabled={isLoading || !inputQuery.trim()}
          className="p-2 rounded-lg bg-tactical-amber text-slate-950 hover:bg-tactical-amber/90 disabled:opacity-50 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
