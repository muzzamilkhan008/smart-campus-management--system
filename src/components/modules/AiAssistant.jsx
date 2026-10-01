import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { demoAIResponses } from '../../data/initialData';
import {
  Sparkles,
  Send,
  Bot,
  User,
  CalendarCheck,
  BookOpen,
  Award,
  Calendar,
  CreditCard,
  BookMarked,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const AiAssistant = () => {
  const { user } = useAuth();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello ${user?.name || 'there'}! I am your Campus AI Assistant powered by Smart Campus Intelligence. How can I help you today?`,
      time: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    { label: "What is my attendance?", key: "attendance", icon: CalendarCheck },
    { label: "What classes do I have today?", key: "classes", icon: BookOpen },
    { label: "When is the next exam?", key: "exam", icon: Award },
    { label: "Show upcoming campus events", key: "events", icon: Calendar },
    { label: "Show my academic performance", key: "performance", icon: Award },
    { label: "Check my tuition fee status", key: "fee", icon: CreditCard }
  ];

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Find response from demo responses
    setTimeout(() => {
      let responseText = demoAIResponses.default;
      const lower = query.toLowerCase();

      if (lower.includes('attendance')) responseText = demoAIResponses.attendance;
      else if (lower.includes('class') || lower.includes('schedule') || lower.includes('today')) responseText = demoAIResponses.classes;
      else if (lower.includes('exam') || lower.includes('midterm')) responseText = demoAIResponses.exam;
      else if (lower.includes('event') || lower.includes('summit')) responseText = demoAIResponses.events;
      else if (lower.includes('performance') || lower.includes('gpa') || lower.includes('grade')) responseText = demoAIResponses.performance;
      else if (lower.includes('fee') || lower.includes('tuition') || lower.includes('payment')) responseText = demoAIResponses.fee;
      else if (lower.includes('book') || lower.includes('library')) responseText = demoAIResponses.library;

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-bold mb-3 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Campus AI Intelligence Engine v3.2
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Campus AI Assistant
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 mt-1">
              Ask natural language questions about your courses, schedules, attendance drops, fees, or library loans.
            </p>
          </div>

          <Badge variant="gradient" size="lg">
            Demo Mode Active
          </Badge>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {suggestedQuestions.map((q, idx) => {
          const Icon = q.icon;
          return (
            <button
              key={idx}
              onClick={() => handleSendMessage(q.label)}
              className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-left hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-md transition-all group"
            >
              <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400 mb-1.5 group-hover:scale-110 transition-transform" />
              <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">{q.label}</p>
            </button>
          );
        })}
      </div>

      {/* Chat Window */}
      <Card className="flex flex-col h-[520px] shadow-xl">
        <CardHeader className="py-3">
          <CardTitle icon={Bot}>Live Interactive Chat Conversation</CardTitle>
          <button
            onClick={() => setMessages([{ id: 1, sender: 'ai', text: `Chat cleared. Ask me another question!`, time: 'Just now' }])}
            className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Clear Chat
          </button>
        </CardHeader>

        {/* Message Stream */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 shadow-sm'
                  : 'bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-md shadow-purple-500/20'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-lg rounded-2xl p-4 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 shadow-xs rounded-tl-none'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className={`text-[10px] mt-2 block font-mono ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400 font-semibold italic animate-pulse">
              <Bot className="w-4 h-4" /> Campus AI Assistant is processing query...
            </div>
          )}
        </CardContent>

        {/* Chat Input Bar */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask Campus AI Assistant anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button type="submit" variant="gradient" icon={Send} size="md">
              Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};
