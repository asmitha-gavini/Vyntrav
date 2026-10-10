import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ArrowRight, Zap, Target, Cpu, CheckCircle2, ShieldCheck,
  Users, Briefcase, Search, Wand2, Star, ArrowUpRight, Check, Play, MessageSquare, Compass
} from 'lucide-react';
import { fetchCreators, draftBriefAI } from '../api';

export function HomePage() {
  const [creators, setCreators] = useState([]);
  const [loadingCreators, setLoadingCreators] = useState(true);

  // AI Brief Showcase Interactive State
  const [demoPrompt, setDemoPrompt] = useState(
    'Launching a sustainable fashion collection for college students on Instagram and TikTok'
  );
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiResult, setAiResult] = useState({
    title: 'EcoStyle Campus Launch Campaign',
    target_audience: 'Gen-Z college students & eco-conscious fashion enthusiasts (Ages 18-24)',
    campaign_goal: 'Drive awareness & engagement for sustainable streetwear through viral Reels & UGC',
    deliverables: '3x Instagram Reels (15s), 2x TikTok UGC Ad Clips, 5x High-Res Photoreal Graphics',
    tools: ['Runway Gen-2', 'Midjourney v6', 'ElevenLabs', 'CapCut'],
    budget: '₹25,000 - ₹50,000'
  });

  useEffect(() => {
    setLoadingCreators(true);
    fetchCreators({ limit: 4 })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCreators(data.slice(0, 4));
        }
        setLoadingCreators(false);
      })
      .catch(() => {
        setLoadingCreators(false);
      });
  }, []);

  const handleSimulateAI = async (e) => {
    e.preventDefault();
    if (!demoPrompt.trim()) return;
    setIsGeneratingAI(true);

    try {
      const res = await draftBriefAI(demoPrompt);
      if (res && res.title) {
        setAiResult({
          title: res.title || 'AI Campaign Brief Draft',
          target_audience: res.target_audience || 'Target consumer segment',
          campaign_goal: res.description || res.campaign_goal || 'Drive campaign awareness',
          deliverables: Array.isArray(res.deliverables) ? res.deliverables.join(', ') : 'Short-form AI video & graphics',
          tools: res.recommended_tools || ['Runway', 'Midjourney'],
          budget: res.suggested_budget_inr ? `₹${res.suggested_budget_inr.toLocaleString('en-IN')}` : '₹25,000 - ₹50,000'
        });
      }
    } catch (err) {
      // Fallback preview
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return '₹25,000';
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/60 text-slate-900 font-sans">

      {/* SECTION 2 — HERO SECTION (Clean Centered Layout) */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center">
        <div className="space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wider uppercase shadow-2xs">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            THE AI CREATOR MARKETPLACE
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Your next great campaign starts with the <span className="text-indigo-600 underline decoration-indigo-200 decoration-4">right creator.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto">
            The right AI creators. The right creative brief. One seamless workflow. Discover specialist AI filmmakers, build production-ready briefs, and manage collaborations from first idea to final delivery.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/creators"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
            >
              Explore Creators
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/briefs/new"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-300 shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              <Zap className="w-4 h-4 text-purple-600" />
              Build a Campaign Brief
            </Link>
          </div>

          {/* Trust Statement */}
          <div className="flex items-center justify-center gap-6 pt-6 text-xs text-slate-500 font-medium border-t border-slate-200/80 max-w-xl mx-auto">
            <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Tool Stacks</span>
            </div>
            <span className="text-slate-300">&bull;</span>
            <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>Transparent Portfolio Matching</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3 — COMPACT TRUST AND CAPABILITY STRIP */}
      <section className="border-y border-slate-200/80 bg-white py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 tracking-tight">26+</div>
            <div className="text-xs text-slate-700 font-bold uppercase tracking-wide">Specialist AI Creators</div>
            <div className="text-[11px] text-slate-500 font-medium">Categorized by tool stacks</div>
          </div>

          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 tracking-tight">100+</div>
            <div className="text-xs text-slate-700 font-bold uppercase tracking-wide">Portfolio Works</div>
            <div className="text-[11px] text-slate-500 font-medium">With preview thumbnails</div>
          </div>

          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 tracking-tight">250+</div>
            <div className="text-xs text-slate-700 font-bold uppercase tracking-wide">AI Tools Directory</div>
            <div className="text-[11px] text-slate-500 font-medium">Across 18 creative disciplines</div>
          </div>

          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">100%</div>
            <div className="text-xs text-slate-700 font-bold uppercase tracking-wide">Verified Pipeline</div>
            <div className="text-[11px] text-slate-500 font-medium">Documented tool processes</div>
          </div>

        </div>
      </section>

      {/* SECTION 4 — CREATOR DISCOVERY PREVIEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Creator Marketplace</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Find talent that fits your creative vision.
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
              Explore specialists by creative discipline, AI tools, skills, and campaign budget requirements.
            </p>
          </div>

          <Link
            to="/creators"
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs shadow-2xs flex items-center gap-2 transition-all shrink-0"
          >
            Browse All Creators
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </Link>
        </div>

        {/* Creator Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loadingCreators
            ? [1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white rounded-3xl p-5 border border-slate-200 animate-pulse h-80 space-y-4">
                  <div className="w-full h-36 bg-slate-200 rounded-2xl" />
                  <div className="h-4 bg-slate-200 rounded w-2/3" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                </div>
              ))
            : creators.map((cr) => (
                <div
                  key={cr.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-indigo-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    
                    {/* Header Image / Thumbnail */}
                    <div className="relative overflow-hidden rounded-2xl bg-slate-100 aspect-4/3 border border-slate-100">
                      <img
                        src={cr.avatar_url || 'https://picsum.photos/seed/default/300'}
                        alt={cr.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold capitalize">
                        {cr.specialization}
                      </span>
                    </div>

                    {/* Creator Info */}
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {cr.name}
                        </h3>
                        {cr.tools_verified && (
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" title="Tools Verified" />
                        )}
                      </div>

                      <div className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                        {cr.headline || cr.specialization}
                      </div>

                      {/* Tool Tags */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {cr.tools && cr.tools.length > 0 ? (
                          cr.tools.slice(0, 3).map((t) => (
                            <span key={t.id || t.name} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                              {t.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">Midjourney, Runway</span>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Footer Rate & Action */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Rate Range</span>
                      <span className="font-bold text-emerald-600">
                        {formatCurrency(cr.rate_min_inr)} - {formatCurrency(cr.rate_max_inr)}
                      </span>
                    </div>

                    <Link
                      to={`/creators/${cr.id}`}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold text-xs border border-indigo-200 transition-colors"
                    >
                      View Profile
                    </Link>
                  </div>

                </div>
              ))}
        </div>

      </section>

      {/* SECTION 5 — AI BRIEF BUILDER SHOWCASE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 text-xs font-bold mb-4 border border-indigo-800/80">
              <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
              AI-ASSISTED BRIEF BUILDER
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-white">
              From rough idea to a campaign-ready brief.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Start with what you want to create. Get a structured draft prefilled with target audience, deliverables, aspect ratios, and recommended tool stacks that you can review and refine.
            </p>
          </div>

          {/* Interactive AI Brief Builder Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Form Column */}
            <div className="lg:col-span-5 bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step 1: Enter Rough Notes</div>
              <textarea
                rows="4"
                value={demoPrompt}
                onChange={(e) => setDemoPrompt(e.target.value)}
                placeholder="Describe your campaign goal, audience, platform..."
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />

              <button
                type="button"
                onClick={handleSimulateAI}
                disabled={isGeneratingAI}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                {isGeneratingAI ? (
                  <span>Generating Structured Draft...</span>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 text-indigo-200" />
                    <span>Build Brief with AI</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-slate-400 text-center font-medium">
                Uses Hugging Face Inference API with rule-based fallback.
              </div>
            </div>

            {/* Output Preview Column */}
            <div className="lg:col-span-7 bg-slate-900/90 p-6 rounded-2xl border border-slate-700 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Step 2: Review Structured Draft</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-bold border border-indigo-800">
                  Editable Preview
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Suggested Title</span>
                  <div className="font-bold text-sm text-white">{aiResult.title}</div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Target Audience & Objectives</span>
                  <div className="text-slate-300 font-medium">{aiResult.target_audience}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Deliverables</span>
                    <div className="text-indigo-300 font-semibold">{aiResult.deliverables}</div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Suggested Budget</span>
                    <div className="text-emerald-400 font-bold">{aiResult.budget}</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">Review and customize before publication</span>
                <Link
                  to="/briefs/new"
                  className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                >
                  <span>Open Full Brief Editor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6 — HOW VYNTRAV WORKS */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Simple 3-Step Workflow</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Vyntrav Works
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Connect campaign requirements with real creator capabilities through a transparent workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4 relative">
            <div className="text-3xl font-black text-indigo-600">01</div>
            <h3 className="text-xl font-bold text-slate-900">Define your campaign</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Brands describe creative goals, target audience, deliverables, budget, and timeline — optionally assisted by the AI brief builder.
            </p>
            <div className="pt-2">
              <span className="inline-block text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                Structured Campaign Briefs
              </span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4 relative">
            <div className="text-3xl font-black text-indigo-600">02</div>
            <h3 className="text-xl font-bold text-slate-900">Discover the right creators</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore portfolios, inspect verified AI tool stacks (Midjourney, Runway, ComfyUI), and evaluate candidate fit using match scores.
            </p>
            <div className="pt-2">
              <span className="inline-block text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
                Search & Filtering
              </span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4 relative">
            <div className="text-3xl font-black text-indigo-600">03</div>
            <h3 className="text-xl font-bold text-slate-900">Collaborate and deliver</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Manage pitch applications, communicate in dedicated project workspaces, and track progress through to final deliverable review.
            </p>
            <div className="pt-2">
              <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                Project Workspace
              </span>
            </div>
          </div>

        </div>

      </section>

      {/* SECTION 7 — CREATOR DISCIPLINES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-white border-y border-slate-200/80">
        
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Specialist Categories</div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            A creative specialist for every kind of idea.
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Click any discipline to explore creators with matching tool stacks and portfolio work.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {[
            { name: 'AI Video Creator', tools: 'Runway, Kling, Veo, Pika' },
            { name: 'AI Graphic Designer', tools: 'Midjourney, Ideogram, Canva' },
            { name: 'AI Script Writer', tools: 'ChatGPT, Claude, Jasper' },
            { name: 'AI Voice Artist', tools: 'ElevenLabs, Murf, PlayHT' },
            { name: 'AI Music Producer', tools: 'Suno, Udio, AIVA' },
            { name: 'AI Influencer Creator', tools: 'HeyGen, Hedra, Synthesia' },
            { name: 'UGC Ad Creator', tools: 'Creatify, Arcads, JoggAI' },
            { name: 'Social Media Manager', tools: 'Buffer, Predis.ai, Metricool' },
            { name: 'AI Repurposing Expert', tools: 'CapCut, Descript, OpusClip' }
          ].map((item) => (
            <Link
              key={item.name}
              to={`/creators?specialization=${encodeURIComponent(item.name)}`}
              className="p-5 rounded-2xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center justify-between">
                  <span>{item.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </div>
                <div className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {item.tools}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </section>

      {/* SECTION 8 — TWO CLEAR AUDIENCES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* For Brands */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                For Brands & Agencies
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Find & Hire Top AI Talent</h3>
              
              <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Discover creators by specialized AI tool stack and skills</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Turn campaign notes into structured briefs using AI</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Compare candidate match scores and shortlist favorites</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Manage applications, messages, and deliverable approvals</span>
                </li>
              </ul>
            </div>

            <Link
              to="/creators"
              className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs text-center shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Find Your Next Creator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* For Creators */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider">
                For AI Content Creators
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Monetize Your AI Production Skills</h3>
              
              <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Build a professional profile showcasing your portfolio & tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Discover relevant brand campaign opportunities & pitches</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Submit pitch applications with estimated timelines & rates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Collaborate directly with brand directors in project workspaces</span>
                </li>
              </ul>
            </div>

            <Link
              to="/briefs"
              className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 rounded-3xl p-10 sm:p-14 text-white text-center border border-indigo-500/20 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Make your next creative collaboration happen.
            </h2>
            
            <p className="text-slate-300 text-sm leading-relaxed">
              Find the right talent or turn your next campaign idea into a clear, actionable brief.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/creators"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                Explore Creators
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/briefs/new"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4 text-purple-600" />
                Create a Brief
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
