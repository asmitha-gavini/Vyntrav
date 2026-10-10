import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Users, Briefcase, PlusCircle, LayoutDashboard, LogOut, LogIn, UserPlus, Zap, ChevronDown, UserCheck, Building2, Compass, Menu, X, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, loginDemo } = useAuth();
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleDemoClick = async (role) => {
    setShowDemoMenu(false);
    setMobileMenuOpen(false);
    try {
      await loginDemo(role);
      navigate('/dashboard');
    } catch (err) {
      console.error('Demo login error:', err);
    }
  };

  const isDemoUser = user && (user.email === 'demo.creator@gencraft.demo' || user.email === 'demo.brand@gencraft.demo' || user.email?.includes('demo'));

  return (
    <>
      {/* Top Banner for Hackathon Evaluator Demo Mode */}
      {isDemoUser && (
        <div className="bg-gradient-to-r from-amber-600 via-indigo-600 to-purple-600 text-white text-xs font-semibold py-2 px-4 shadow-sm z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse shrink-0" />
              <span>
                <strong className="tracking-wide">Evaluator Demo Mode Active:</strong> Logged in as{' '}
                <span className="underline decoration-amber-300 font-extrabold">{user.display_name || user.email}</span> ({user.role === 'creator' ? 'AI Creator' : 'Brand User'})
              </span>
            </div>
            <div className="flex items-center gap-2">
              {user.role === 'creator' ? (
                <button
                  onClick={() => handleDemoClick('brand')}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-xl border border-white/40 font-bold text-[11px] transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <Building2 className="w-3.5 h-3.5 text-indigo-200" />
                  Switch to Demo Brand (Lotus & Loom) ↔️
                </button>
              ) : (
                <button
                  onClick={() => handleDemoClick('creator')}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-xl border border-white/40 font-bold text-[11px] transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <UserCheck className="w-3.5 h-3.5 text-purple-200" />
                  Switch to Demo Creator (Ananya Rao) ↔️
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="Vyntrav"
              className="w-9 h-9 rounded-xl object-contain bg-slate-950 p-1 border border-slate-800 shadow-sm group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="font-extrabold text-xl text-slate-900 tracking-tight">Vyntrav</span>
              <span className="text-[10px] px-1.5 py-0.5 ml-1.5 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 uppercase tracking-wider">AI</span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/creators"
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/creators')
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Find Creators
            </Link>

            <Link
              to="/tools"
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/tools')
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-indigo-600" />
              AI Tools
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-bold border border-slate-200">
                250+
              </span>
            </Link>

            <Link
              to="/briefs"
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/briefs')
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Campaign Briefs
            </Link>

            <a
              href="#how-it-works"
              onClick={(e) => {
                if (location.pathname !== '/') {
                  // If not on homepage, navigate home first
                  return;
                }
                e.preventDefault();
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              How It Works
            </a>

            {user && (
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isActive('/dashboard')
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                My Dashboard
              </Link>
            )}
          </nav>

          {/* Right Section: Auth State / Actions */}
          <div className="flex items-center gap-3">
            
            {user ? (
              <div className="flex items-center gap-3">
                {/* Post Brief CTA (Brand users or general) */}
                {user.role === 'brand' && (
                  <Link
                    to="/briefs/new"
                    className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all hover:scale-105"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Post Brief
                  </Link>
                )}

                {/* User Profile Badge */}
                <div className="flex items-center gap-2.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                  <img
                    src={user.avatar_url || 'https://picsum.photos/seed/user/100'}
                    alt={user.display_name}
                    className="w-7 h-7 rounded-xl object-cover border border-slate-300"
                  />
                  <div className="hidden sm:block text-left pr-1">
                    <div className="text-xs font-bold text-slate-800 line-clamp-1">{user.display_name || user.email}</div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${
                      user.role === 'creator'
                        ? 'bg-purple-100 text-purple-700 border-purple-200'
                        : 'bg-indigo-100 text-indigo-700 border-indigo-200'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  title="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                
                {/* Eye-catching Demo Quick Login Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowDemoMenu(!showDemoMenu)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs transition-all shadow-sm hover:shadow-md animate-pulse hover:animate-none"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
                    <span>⚡ 1-Click Demo Login</span>
                    <ChevronDown className="w-3 h-3 text-amber-100" />
                  </button>

                  {showDemoMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-2.5 z-50 text-slate-800 animate-fade-in">
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 mb-1 flex items-center justify-between">
                        <span>Evaluator Quick Access</span>
                        <span className="bg-amber-200 text-amber-900 text-[9px] px-1 rounded">No Password</span>
                      </div>
                      
                      <button
                        onClick={() => handleDemoClick('creator')}
                        className="w-full p-2.5 rounded-xl hover:bg-purple-50 text-left flex items-center gap-3 transition-all border border-transparent hover:border-purple-200 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shrink-0 shadow-xs">
                          <UserCheck className="w-5 h-5" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-purple-700 flex items-center gap-1">
                            Demo Creator
                            <span className="text-[9px] bg-purple-100 text-purple-700 font-bold px-1 rounded">Creator</span>
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">Ananya Rao (AI Filmmaker)</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleDemoClick('brand')}
                        className="w-full p-2.5 rounded-xl hover:bg-indigo-50 text-left flex items-center gap-3 transition-all border border-transparent hover:border-indigo-200 group mt-1"
                      >
                        <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0 shadow-xs">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 flex items-center gap-1">
                            Demo Brand
                            <span className="text-[9px] bg-indigo-100 text-indigo-700 font-bold px-1 rounded">Brand</span>
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">Lotus & Loom (Brand Manager)</div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Log In
                </Link>

                <Link
                  to="/creators"
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-all hover:scale-105"
                >
                  <Users className="w-3.5 h-3.5" />
                  Find Creators
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Menu Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 py-4 space-y-3 animate-fade-in shadow-xl">
            <Link
              to="/creators"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              <Users className="w-4 h-4 text-indigo-600" />
              Find Creators
            </Link>

            <Link
              to="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              AI Tools Directory (250+)
            </Link>

            <Link
              to="/briefs"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              <Briefcase className="w-4 h-4 text-indigo-600" />
              Campaign Briefs
            </Link>

            <a
              href="#how-it-works"
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              How It Works
            </a>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/briefs/new"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs text-center shadow-sm flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-indigo-400" />
                Build a Campaign Brief
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

