import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  GraduationCap,
  Sparkles,
  Code,
  Layers,
  Rocket,
  ShieldCheck,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const AboutProjectModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="About Project & Technical Documentation" maxWidth="max-w-3xl">
      <div className="space-y-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
        {/* Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">University Class Project Edition</span>
            <h3 className="text-lg font-extrabold mt-0.5">AI Smart Campus Management System</h3>
            <p className="text-[11px] text-blue-100 mt-0.5">Production-Ready • Netlify Ready • Full-Stack Demo Architecture</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
            <GraduationCap className="w-7 h-7" />
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-500" /> Executive Overview
          </h4>
          <p className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
            The <strong>AI Smart Campus Management System</strong> helps educational institutions manage students, faculty, attendance, academics, events, fees, communication and analytics from one centralized platform. It provides role-tailored user interfaces for Administrators, Teachers, Students, and Parents.
          </p>
        </div>

        {/* Technology Stack */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Code className="w-4 h-4 text-indigo-500" /> Technology Stack
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-medium">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800 text-blue-900 dark:text-blue-200">
              <span className="font-bold block text-xs">React 18</span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400">Component Architecture</span>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800 text-purple-900 dark:text-purple-200">
              <span className="font-bold block text-xs">Vite 5</span>
              <span className="text-[10px] text-purple-600 dark:text-purple-400">Blazing Fast Bundler</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
              <span className="font-bold block text-xs">Tailwind CSS v3</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Responsive Glass UI</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800 text-amber-900 dark:text-amber-200">
              <span className="font-bold block text-xs">Recharts</span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400">Data Visualization</span>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-800 text-rose-900 dark:text-rose-200">
              <span className="font-bold block text-xs">Lucide React</span>
              <span className="text-[10px] text-rose-600 dark:text-rose-400">Modern Vector Icons</span>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200">
              <span className="font-bold block text-xs">LocalStorage</span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400">Client-side Persistence</span>
            </div>
          </div>
        </div>

        {/* Future Improvements */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Rocket className="w-4 h-4 text-purple-500" /> Future Technical Roadmap
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            {[
              "Real AI API (OpenAI / Gemini) integration for chatbot",
              "Face recognition AI camera attendance verification",
              "Real-time WebSocket notifications & live chat",
              "PostgreSQL / Supabase cloud database integration",
              "Mobile native application (React Native / Flutter)",
              "Automated SMS & email notification dispatch",
              "Advanced AI predictive student drop-out analytics"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end">
          <Button variant="primary" onClick={onClose}>Close Overview</Button>
        </div>
      </div>
    </Modal>
  );
};
