import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-950 text-slate-400 text-xs py-14 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Col 1: Brand & Bio */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Vyntrav"
              className="w-8 h-8 rounded-lg object-contain bg-slate-900 p-1 border border-slate-800"
            />
            <span className="font-extrabold text-lg text-white tracking-tight">Vyntrav</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-bold border border-indigo-800/60 uppercase">AI</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            The professional creator marketplace connecting brands with specialist AI filmmakers, animators, prompt engineers, and generative artists.
          </p>
          <div className="text-[11px] text-slate-500 pt-2 font-medium">
            Built for byteXL HacXLerate 2026 &bull; Challenge 2 by Kampus.VC
          </div>
        </div>

        {/* Col 2: For Brands */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">For Brands</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/creators" className="hover:text-white transition-colors">Find AI Creators</Link>
            </li>
            <li>
              <Link to="/briefs/new" className="hover:text-white transition-colors">Build AI Brief</Link>
            </li>
            <li>
              <Link to="/briefs" className="hover:text-white transition-colors">Campaign Briefs</Link>
            </li>
            <li>
              <Link to="/shortlisted" className="hover:text-white transition-colors">Saved Shortlists</Link>
            </li>
          </ul>
        </div>

        {/* Col 3: For Creators */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">For Creators</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/briefs" className="hover:text-white transition-colors">Discover Opportunities</Link>
            </li>
            <li>
              <Link to="/creator/onboarding" className="hover:text-white transition-colors">Creator Profile</Link>
            </li>
            <li>
              <Link to="/tools" className="hover:text-white transition-colors">AI Tools Directory (250+)</Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-white transition-colors">Project Workspaces</Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Platform & Account */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Account & Demo</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard" className="hover:text-white transition-colors">My Dashboard</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition-colors">Login / Sign Up</Link>
            </li>
            <li>
              <Link to="/login?demo=creator" className="hover:text-white transition-colors">Creator Demo Account</Link>
            </li>
            <li>
              <Link to="/login?demo=brand" className="hover:text-white transition-colors">Brand Demo Account</Link>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-10 mt-10 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>&copy; 2026 Vyntrav AI Content Creator Marketplace. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <span className="hover:text-slate-400">Strictly Enforced Verification</span>
          <span>&bull;</span>
          <span className="hover:text-slate-400">No Hardcoded Scores</span>
          <span>&bull;</span>
          <span className="hover:text-slate-400">Deterministic Database Matching</span>
        </div>
      </div>
    </footer>
  );
}
