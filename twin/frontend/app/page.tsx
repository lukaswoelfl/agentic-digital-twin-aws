import Twin from '@/components/twin';
import { Sparkles, Cpu, Shield, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px] pointer-events-none" />
      
      {/* Header / Nav */}
      <header className="border-b border-slate-900 bg-slate-950/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white tracking-wider text-sm">
              LW
            </div>
            <span className="font-semibold text-slate-200 tracking-tight text-sm sm:text-base">Lukas Wölfl</span>
          </div>
          <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-400">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors">Github</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors">LinkedIn</a>
          </div>
        </div>
      </header>

      {/* Main Grid Section */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-6 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left column: Info & Highlights */}
        <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-medium self-center lg:self-start w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Platform Engineering</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 leading-tight">
            Building AI systems that <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">deliver real value</span>.
          </h1>
          
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Data & AI Engineer currently transitioning into AI platform engineering. Focused on combining robust Python pipelines, LLMs, and AWS Cloud architectures to build production-ready systems that don&apos;t end up in a drawer.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:border-slate-800 transition-all">
              <Cpu className="w-5 h-5 text-cyan-400 mb-2.5" />
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Agentic Systems</h4>
              <p className="text-xs text-slate-400 mt-1">PydanticAI & advanced RAG agentic workflows.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:border-slate-800 transition-all">
              <Shield className="w-5 h-5 text-indigo-400 mb-2.5" />
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">AWS Solutions</h4>
              <p className="text-xs text-slate-400 mt-1">Solutions Architect Associate certified structures.</p>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Digital Twin Interface */}
        <div className="lg:col-span-7 h-[580px] sm:h-[620px] w-full flex flex-col">
          <Twin />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500 bg-slate-950/40 relative z-10">
        <p>© 2026 Lukas Wölfl. All rights reserved. • Week 2: Digital Twin Local Demo</p>
      </footer>
    </main>
  );
}
