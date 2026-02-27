import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, Send, Bot, Loader2, Linkedin, Facebook, Instagram, ShieldCheck, CheckCircle2, ArrowUpRight, Home, Info, Wrench, Sparkles, Trophy, Package, CalendarCheck, Mail } from 'lucide-react';
import { AppRoute } from '../types';
import { chatWithAssistant } from '../services/geminiService';
import { SITE_NAME, CAMEROON_CITIES, WHATSAPP_LINK, WHATSAPP_NUMBER } from '../data';

// ─── CSS Animations injected globally ───────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById('layout-animations')) return;
  const style = document.createElement('style');
  style.id = 'layout-animations';
  style.textContent = `
    @keyframes slideInDown {
      from { transform: translateY(-120%); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    @keyframes slideInUp {
      from { transform: translateY(120%); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    @keyframes fadeSlideRight {
      from { transform: translateX(-24px); opacity: 0; }
      to   { transform: translateX(0);     opacity: 1; }
    }
    @keyframes fadeSlideLeft {
      from { transform: translateX(24px); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }
    @keyframes charReveal {
      from { transform: translateY(110%) rotateX(-30deg); opacity: 0; }
      to   { transform: translateY(0)    rotateX(0deg);   opacity: 1; }
    }
    @keyframes glowPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,53,0); }
      50%       { box-shadow: 0 0 20px 4px rgba(255,107,53,0.35); }
    }
    @keyframes tickerScroll {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes underlineGrow {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    @keyframes wordFade {
      0%   { opacity: 0; transform: translateY(8px); filter: blur(4px); }
      100% { opacity: 1; transform: translateY(0);   filter: blur(0); }
    }
    @keyframes mobileMenuSlide {
      from { transform: translateX(100%); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }
    @keyframes backdropFade {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes dotBounce {
      0%, 80%, 100% { transform: translateY(0); }
      40%            { transform: translateY(-6px); }
    }
    @keyframes floatUp {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-6px); }
    }
    @keyframes shimmer {
      from { background-position: -200% center; }
      to   { background-position:  200% center; }
    }
    @keyframes ripple {
      from { transform: scale(0); opacity: 0.4; }
      to   { transform: scale(3); opacity: 0; }
    }
    @keyframes tabBarIn {
      from { transform: translateY(100%); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    @keyframes activeTabPop {
      0%   { transform: translateY(0) scale(1); }
      50%  { transform: translateY(-4px) scale(1.12); }
      100% { transform: translateY(-2px) scale(1); }
    }

    .animate-slide-down     { animation: slideInDown 0.5s cubic-bezier(0.22,1,0.36,1) both; }
    .animate-slide-up       { animation: slideInUp  0.5s cubic-bezier(0.22,1,0.36,1) both; }
    .animate-fade-right     { animation: fadeSlideRight 0.45s cubic-bezier(0.22,1,0.36,1) both; }
    .animate-glow-pulse     { animation: glowPulse 2.5s ease-in-out infinite; }
    .animate-float          { animation: floatUp 3s ease-in-out infinite; }
    .animate-word-fade      { animation: wordFade 0.5s ease both; }
    .animate-tab-bar-in     { animation: tabBarIn 0.5s cubic-bezier(0.22,1,0.36,1) both; }

    .ticker-track { animation: tickerScroll 28s linear infinite; }
    .ticker-track:hover { animation-play-state: paused; }

    .nav-link-underline::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      width: 100%; height: 2px;
      background: currentColor;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
    }
    .nav-link-underline:hover::after,
    .nav-link-underline.active::after { transform: scaleX(1); }

    .shimmer-text {
      background: linear-gradient(90deg, #1a1a2e 0%, #ff6b35 40%, #1a1a2e 60%, #ff6b35 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }

    .cta-btn {
      position: relative;
      overflow: hidden;
    }
    .cta-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(255,255,255,0.15);
      transform: translateX(-100%) skewX(-15deg);
      transition: transform 0.4s ease;
    }
    .cta-btn:hover::before { transform: translateX(120%) skewX(-15deg); }

    .dot-1 { animation: dotBounce 1.2s ease-in-out 0s   infinite; }
    .dot-2 { animation: dotBounce 1.2s ease-in-out 0.2s infinite; }
    .dot-3 { animation: dotBounce 1.2s ease-in-out 0.4s infinite; }

    /* Mobile ripple effect on tap */
    .tap-ripple {
      position: relative;
      overflow: hidden;
    }
    .tap-ripple::after {
      content: '';
      position: absolute;
      inset: 50%;
      background: rgba(255,107,53,0.3);
      border-radius: 50%;
      transform: scale(0);
    }
    .tap-ripple:active::after {
      animation: ripple 0.4s ease-out forwards;
    }

    /* Mobile menu slide-in from right */
    .mobile-menu-panel {
      animation: mobileMenuSlide 0.38s cubic-bezier(0.22,1,0.36,1) both;
    }
    .mobile-menu-backdrop {
      animation: backdropFade 0.3s ease both;
    }

    /* Bottom tab bar active pop */
    .tab-active-pop {
      animation: activeTabPop 0.4s cubic-bezier(0.22,1,0.36,1) both;
    }
  `;
  document.head.appendChild(style);
};

// ─── Animated Word Cycler ────────────────────────────────────────────────────
const WordCycler: React.FC<{ words: string[]; className?: string }> = ({ words, className = '' }) => {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % words.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(timer);
  }, [words]);

  return (
    <span
      className={`${className} inline-block transition-all duration-300`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) rotateX(0deg)' : 'translateY(-8px) rotateX(-20deg)',
        filter: visible ? 'blur(0)' : 'blur(4px)',
      }}
    >
      {words[idx]}
    </span>
  );
};

// ─── Ticker Banner ───────────────────────────────────────────────────────────
const TickerBanner: React.FC = () => {
  const items = [
    '✦ Infrastructure Réseau LAN/Wi-Fi',
    '✦ Vidéosurveillance IP',
    '✦ Solutions Web & Mobile',
    '✦ Audit de Sécurité',
    '✦ Maintenance Informatique',
    '✦ Couverture Nationale Cameroun',
    '✦ Expertise IA & Digitalisation',
  ];
  const repeated = [...items, ...items];

  return (
    <div className="bg-brand-stone overflow-hidden py-2 border-b border-white/5">
      <div className="ticker-track flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="text-[9px] font-black uppercase tracking-[0.35em] text-white/60 mr-12 hover:text-brand-orange transition-colors cursor-default">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── FormattedResponse ───────────────────────────────────────────────────────
const FormattedResponse: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  return (
    <div className="space-y-3">
      {lines.map((line, i) => {
        if (/^\d+\./.test(line) || /^[A-Z\s]{5,}:/.test(line)) {
          return (
            <h4 key={i} className="text-brand-orange font-black text-[11px] uppercase tracking-[0.15em] mt-4 mb-2 border-b border-brand-orange/10 pb-1">
              {line}
            </h4>
          );
        }
        if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
          return (
            <div key={i} className="flex items-start space-x-2 ml-2">
              <div className="w-1.5 h-1.5 bg-brand-orange rounded-full mt-1.5 shrink-0"></div>
              <span className="text-[13px] font-bold text-brand-stone/80">{line.replace(/^[-•]\s*/, '')}</span>
            </div>
          );
        }
        if (line.trim() === '') return <div key={i} className="h-2"></div>;
        return (
          <p key={i} className="text-[13px] font-bold text-brand-stone/80 leading-relaxed">{line}</p>
        );
      })}
    </div>
  );
};

// ─── Navbar ──────────────────────────────────────────────────────────────────
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    injectStyles();
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { name: 'À Propos',        path: AppRoute.About,           icon: <Info size={18} /> },
    { name: 'Services',        path: AppRoute.Services,         icon: <Wrench size={18} /> },
    { name: 'Autres Services', path: AppRoute.DigitalSolutions, icon: <Sparkles size={18} />, isBadge: true },
    { name: 'Réalisations',    path: AppRoute.CaseStudies,      icon: <Trophy size={18} /> },
    { name: 'Nos Packages',    path: AppRoute.Packages,         icon: <Package size={18} /> },
    { name: 'Réserver un Audit', path: AppRoute.Audit,          icon: <CalendarCheck size={18} />, isCTA: true },
    { name: 'Contact',         path: AppRoute.Contact,          icon: <Mail size={18} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed w-full z-50">
      <TickerBanner />

      <nav className={`w-full transition-all duration-500 bg-white border-b ${
        scrolled ? 'shadow-xl border-brand-sand/30' : 'border-transparent shadow-sm'
      }`}>
        <div className="w-full px-4 sm:px-6 lg:pl-6 xl:pl-10 lg:pr-8">
          <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">

            {/* ── Logo ── */}
            <Link
              to={AppRoute.Home}
              className="flex items-center gap-3 group shrink-0"
              style={{ animation: mounted ? 'fadeSlideRight 0.6s ease both' : 'none' }}
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0">
                <img
                  src="/images/logoIT.jpeg"
                  alt="Logo"
                  className="w-full h-full object-contain rounded-xl shadow-md group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-orange rounded-xl flex items-center justify-center font-black text-white text-xl -z-10">I</div>
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm sm:text-base lg:text-xl font-black text-brand-stone tracking-tighter uppercase leading-none flex items-baseline gap-1 flex-wrap">
                  <span style={{ animation: mounted ? 'slideInDown 0.5s 0.1s cubic-bezier(0.22,1,0.36,1) both' : 'none' }}>
                    IMANI-TECH
                  </span>
                  <span className="text-brand-orange" style={{ animation: mounted ? 'slideInUp 0.5s 0.25s cubic-bezier(0.22,1,0.36,1) both' : 'none' }}>
                    SOLUTIONS
                  </span>
                </span>
                <span className="hidden sm:flex text-[8px] font-extrabold uppercase tracking-[0.3em] mt-0.5 text-brand-stone/40 h-4 items-center">
                  <WordCycler words={['Expertise Digitale Premium', 'Réseau & Infrastructure', 'Sécurité Avancée', 'Solutions IA Cameroun']} />
                </span>
              </div>
            </Link>

            {/* ── Separator logo / nav ── */}
            <div className="hidden lg:flex items-center self-stretch py-5 shrink-0">
              <div className="relative flex flex-col items-center justify-center gap-1 w-px self-stretch">
                {/* Gradient line */}
                <div className="flex-1 w-px bg-gradient-to-b from-transparent via-brand-sand to-transparent" />
                {/* Orange diamond ornament */}
                <div
                  className="w-2 h-2 bg-brand-orange rotate-45 shrink-0 shadow-sm"
                  style={{ boxShadow: '0 0 6px 1px rgba(255,107,53,0.4)' }}
                />
                <div className="flex-1 w-px bg-gradient-to-b from-transparent via-brand-sand to-transparent" />
              </div>
            </div>

            {/* ── Desktop links ── */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link, i) => {
                if (link.isCTA) {
                  return (
                    <Link key={link.path} to={link.path}
                      className="cta-btn bg-brand-orange text-white px-5 py-3 rounded-full font-black text-[10px] hover:bg-brand-stone transition-all duration-300 shadow-lg shadow-brand-orange/25 uppercase tracking-[0.2em] flex items-center gap-2 animate-glow-pulse"
                      style={{ animationDelay: `${i * 0.06}s` }}
                    >
                      {link.name}
                      <ArrowUpRight size={12} />
                    </Link>
                  );
                }
                return (
                  <Link key={link.path} to={link.path}
                    className={`nav-link-underline relative text-[10px] xl:text-[11px] font-extrabold uppercase tracking-[0.12em] transition-all duration-300 hover:text-brand-orange flex items-center h-24 ${
                      isActive(link.path) ? 'text-brand-orange active' : 'text-brand-stone/80'
                    } ${link.isBadge ? 'bg-brand-orange/5 px-3 py-2 rounded-lg text-brand-orange hover:bg-brand-orange hover:text-white border border-brand-orange/10 h-auto' : ''}`}
                    style={{ animation: mounted ? `fadeSlideRight 0.4s ${0.05 * i + 0.2}s both` : 'none' }}
                  >
                    {link.name}
                    {isActive(link.path) && !link.isBadge && (
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-orange rounded-full origin-left"
                        style={{ animation: 'underlineGrow 0.4s ease both' }} />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ── Mobile right zone ── */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Quick CTA on mobile */}
              <Link to={AppRoute.Audit}
                className="tap-ripple hidden xs:flex sm:flex items-center gap-1.5 bg-brand-orange text-white px-3 py-2 rounded-full font-black text-[10px] uppercase tracking-wider shadow-md shadow-brand-orange/20 active:scale-95 transition-transform"
              >
                <CalendarCheck size={12} />
                <span className="hidden sm:inline">Audit</span>
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={isOpen}
                className={`tap-ripple relative w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 ${
                  isOpen
                    ? 'bg-brand-orange text-white'
                    : 'bg-brand-beige/80 text-brand-stone border border-brand-sand active:bg-brand-sand'
                }`}
              >
                {/* Animated bars → X */}
                <span className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${
                  isOpen ? 'w-5 bg-white rotate-45 translate-y-[8px]' : 'w-5 bg-brand-stone'
                }`} />
                <span className={`block h-0.5 rounded-full transition-all duration-300 ${
                  isOpen ? 'w-0 opacity-0' : 'w-4 bg-brand-stone'
                }`} />
                <span className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${
                  isOpen ? 'w-5 bg-white -rotate-45 -translate-y-[8px]' : 'w-5 bg-brand-stone'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile slide-in panel ── */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="mobile-menu-backdrop lg:hidden fixed inset-0 bg-brand-stone/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Side panel */}
            <div className="mobile-menu-panel lg:hidden fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 flex flex-col shadow-[−20px_0_60px_rgba(0,0,0,0.15)]">
              
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-brand-sand/40">
                <div>
                  <p className="font-black text-sm text-brand-stone uppercase tracking-widest">Menu</p>
                  <p className="text-[9px] font-bold text-brand-stone/30 uppercase tracking-[0.3em] mt-0.5">Imani-Tech Solutions</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="tap-ripple w-10 h-10 rounded-xl bg-brand-beige flex items-center justify-center text-brand-stone hover:bg-brand-orange hover:text-white transition-all active:scale-90"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {navLinks.map((link, i) => {
                  const active = isActive(link.path);
                  if (link.isCTA) {
                    return (
                      <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                        className="tap-ripple cta-btn flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-brand-orange text-white font-black text-sm uppercase tracking-wide shadow-lg shadow-brand-orange/20 mt-3 active:scale-[0.98] transition-transform"
                        style={{ animation: `fadeSlideLeft 0.3s ${i * 0.04}s both` }}
                      >
                        <div className="flex items-center gap-3">
                          {link.icon}
                          <span>{link.name}</span>
                        </div>
                        <ArrowUpRight size={18} />
                      </Link>
                    );
                  }
                  return (
                    <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                      className={`tap-ripple flex items-center justify-between w-full px-4 py-3.5 rounded-xl font-black text-sm transition-all active:scale-[0.98] ${
                        active
                          ? 'bg-brand-orange/10 text-brand-orange border border-brand-orange/20'
                          : link.isBadge
                            ? 'bg-gradient-to-r from-brand-orange/5 to-transparent text-brand-orange border border-brand-orange/10'
                            : 'text-brand-stone/75 hover:bg-brand-beige/80'
                      }`}
                      style={{ animation: `fadeSlideLeft 0.3s ${i * 0.04}s both` }}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                          active
                            ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/30'
                            : 'bg-brand-beige/60 text-brand-stone/50'
                        }`}>
                          {link.icon}
                        </span>
                        <div>
                          <span className="block text-[13px] font-black uppercase tracking-wide leading-tight">{link.name}</span>
                          {active && <span className="text-[9px] text-brand-orange/60 font-bold uppercase tracking-widest">Page actuelle</span>}
                        </div>
                      </div>
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-all ${
                        active ? 'bg-brand-orange text-white' : 'bg-brand-sand/40 text-brand-stone/20'
                      }`}>
                        <ArrowUpRight size={11} />
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Panel footer */}
              <div className="px-4 pb-6 pt-4 border-t border-brand-sand/30 space-y-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="tap-ripple flex items-center gap-3 w-full bg-[#25D366] text-white px-5 py-3.5 rounded-xl font-black text-sm shadow-lg shadow-green-500/20 active:scale-[0.98] transition-transform"
                  style={{ animation: 'slideInUp 0.4s 0.25s both' }}
                >
                  <MessageSquare size={18} />
                  <span className="uppercase tracking-wider">WhatsApp Direct</span>
                  <span className="ml-auto text-xs opacity-70 font-bold">{WHATSAPP_NUMBER}</span>
                </a>
                <p className="text-center text-[8px] font-black uppercase tracking-[0.35em] text-brand-stone/20">
                  Douala, Cameroun • {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

// ─── Mobile Bottom Tab Bar ────────────────────────────────────────────────────
const MobileTabBar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const tabs = [
    { icon: <Home size={20} />,          label: 'Accueil',  path: AppRoute.Home },
    { icon: <Wrench size={20} />,         label: 'Services', path: AppRoute.Services },
    { icon: <CalendarCheck size={22} />,  label: 'Audit',    path: AppRoute.Audit, primary: true },
    { icon: <Package size={20} />,        label: 'Packages', path: AppRoute.Packages },
    { icon: <Mail size={20} />,           label: 'Contact',  path: AppRoute.Contact },
  ];

  return (
    <nav className="animate-tab-bar-in lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-brand-sand/30 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      <div className="flex items-end justify-around px-2 pb-safe pt-2" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`tap-ripple flex flex-col items-center gap-1 transition-all ${
                tab.primary ? '-mt-5' : ''
              }`}
            >
              {tab.primary ? (
                <span className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all active:scale-90 ${
                  active
                    ? 'bg-brand-stone text-white shadow-brand-stone/30 tab-active-pop'
                    : 'bg-brand-orange text-white shadow-brand-orange/30 animate-glow-pulse'
                }`}>
                  {tab.icon}
                </span>
              ) : (
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90 ${
                  active ? 'bg-brand-orange/10 text-brand-orange tab-active-pop' : 'text-brand-stone/40'
                }`}>
                  {tab.icon}
                </span>
              )}
              <span className={`text-[9px] font-black uppercase tracking-wider transition-colors ${
                active ? 'text-brand-orange' : 'text-brand-stone/30'
              } ${tab.primary ? 'mt-1' : ''}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

// ─── Footer ──────────────────────────────────────────────────────────────────
const AnimatedCounter: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
      <p className="text-2xl sm:text-3xl font-black text-brand-orange" style={{ background: 'linear-gradient(90deg, #ff6b35, #ff9a6c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {value}
      </p>
      <p className="text-[9px] font-extrabold uppercase tracking-widest text-brand-stone/40 mt-1">{label}</p>
    </div>
  );
};

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (footerRef.current) obs.observe(footerRef.current);
    return () => obs.disconnect();
  }, []);

  const cols = [{ delay: '0s' }, { delay: '0.1s' }, { delay: '0.2s' }, { delay: '0.3s' }];

  return (
    /* Extra bottom padding on mobile for the tab bar */
    <footer ref={footerRef} className="bg-brand-white text-brand-stone pt-16 sm:pt-24 pb-28 lg:pb-12 border-t border-brand-sand overflow-hidden">

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 bg-brand-beige/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-brand-sand/30">
          <AnimatedCounter value="200+"  label="Clients Satisfaits" />
          <AnimatedCounter value="8 Ans" label="D'Expérience" />
          <AnimatedCounter value="12"    label="Villes Couvertes" />
          <AnimatedCounter value="99%"   label="Uptime Garanti" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 mb-16 sm:mb-20">
        {/* Brand col */}
        <div className="space-y-6 sm:space-y-8" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.7s ${cols[0].delay} ease` }}>
          <Link to={AppRoute.Home} className="text-xl font-black tracking-tighter uppercase inline-block group">
            <span className="group-hover:text-brand-orange transition-colors duration-300">IMANI-TECH </span>
            <span className="text-brand-orange">SOLUTIONS</span>
          </Link>
          <p className="text-brand-stone/60 text-sm leading-relaxed max-w-xs font-bold">
            Partenaire stratégique des PME leaders au Cameroun. Acquisition digitale, Infrastructures IT et Sécurité avancée.
          </p>
          <div className="flex space-x-4">
            {[Linkedin, Facebook, Instagram].map((Icon, i) => (
              <a key={i} href="#"
                className="w-10 h-10 rounded-xl bg-brand-beige flex items-center justify-center text-brand-stone hover:bg-brand-orange hover:text-white transition-all shadow-sm hover:scale-110 hover:-rotate-6 active:scale-95"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Expertises */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.7s ${cols[1].delay} ease` }}>
          <h4 className="font-black mb-6 sm:mb-8 text-[11px] uppercase tracking-[0.3em] text-brand-orange">Nos Expertises</h4>
          <ul className="space-y-4 sm:space-y-5">
            {[
              { n: 'Packages Croissance', p: AppRoute.Packages },
              { n: 'Réseaux LAN / Wi-Fi', p: AppRoute.Services },
              { n: 'Vidéosurveillance IP', p: AppRoute.Services },
              { n: 'Solutions Web & App',  p: AppRoute.Services },
            ].map((item, i) => (
              <li key={item.n}>
                <Link to={item.p}
                  className="text-brand-stone/70 hover:text-brand-orange transition-colors text-xs font-black uppercase tracking-tight flex items-center gap-2 group active:scale-95"
                  style={{ animation: visible ? `fadeSlideRight 0.4s ${0.15 + i * 0.07}s both` : 'none' }}
                >
                  <span className="w-0 group-hover:w-4 h-px bg-brand-orange transition-all duration-300 overflow-hidden"></span>
                  {item.n}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cities */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.7s ${cols[2].delay} ease` }}>
          <h4 className="font-black mb-6 sm:mb-8 text-[11px] uppercase tracking-[0.3em] text-brand-orange">Couverture Cameroun</h4>
          <ul className="grid grid-cols-2 gap-2.5 text-brand-stone/60 text-[10px] font-extrabold uppercase tracking-widest">
            {CAMEROON_CITIES.slice(0, 10).map((city, i) => (
              <li key={city} className="flex items-center space-x-2 hover:text-brand-orange transition-colors cursor-default"
                style={{ animation: visible ? `fadeSlideRight 0.35s ${0.2 + i * 0.04}s both` : 'none' }}
              >
                <div className="w-1 h-1 bg-brand-orange/40 rounded-full shrink-0"></div>
                <span>{city}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.7s ${cols[3].delay} ease` }}>
          <h4 className="font-black mb-6 sm:mb-8 text-[11px] uppercase tracking-[0.3em] text-brand-orange">Assistance Directe</h4>
          <div className="space-y-4 sm:space-y-6">
            <a href={`tel:${WHATSAPP_NUMBER}`}
              className="flex items-center space-x-4 text-brand-stone hover:text-brand-orange transition-colors font-black text-sm uppercase tracking-tighter group active:scale-95"
            >
              <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange group-hover:scale-110 group-hover:bg-brand-orange group-hover:text-white transition-all">
                <Phone size={16} />
              </div>
              <span>{WHATSAPP_NUMBER}</span>
            </a>
            <Link to={AppRoute.Audit}
              className="tap-ripple cta-btn flex w-full bg-brand-stone text-white text-center py-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all hover:bg-brand-orange shadow-xl shadow-brand-stone/10 items-center justify-center gap-2 active:scale-[0.98]"
            >
              Réservez un Audit
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 border-t border-brand-sand pt-8 sm:pt-10 flex flex-col md:flex-row justify-between items-center text-brand-stone/30 text-[9px] font-black uppercase tracking-[0.4em] gap-4 md:gap-0">
        <p className="hover:text-brand-stone/60 transition-colors cursor-default text-center md:text-left">
          &copy; {new Date().getFullYear()} {SITE_NAME} | Douala, Cameroun
        </p>
        <div className="flex space-x-6 sm:space-x-8">
          {['Confidentialité', 'Expertise IA'].map(t => (
            <a key={t} href="#" className="hover:text-brand-orange transition-colors relative group">
              {t}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-orange group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

// ─── AI Assistant ─────────────────────────────────────────────────────────────
const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    { role: 'bot', text: `Bonjour. Je suis l'expert technique de ${SITE_NAME}.\n\nComment puis-je vous accompagner aujourd'hui dans votre projet d'infrastructure ou de digitalisation au Cameroun ?` },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);
    const response = await chatWithAssistant(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setIsTyping(false);
  };

  return (
    /* On mobile, pushed above the tab bar */
    <div className="fixed bottom-24 lg:bottom-8 right-4 sm:right-8 z-[60] flex flex-col items-end">
      {isOpen && (
        <div
          className="w-[calc(100vw-2rem)] sm:w-[380px] max-h-[70vh] sm:max-h-none sm:h-[600px] bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] flex flex-col mb-4 overflow-hidden border border-brand-sand/50"
          style={{ animation: 'slideInUp 0.45s cubic-bezier(0.22,1,0.36,1) both' }}
        >
          {/* Header */}
          <div className="bg-brand-stone p-5 sm:p-6 text-white flex justify-between items-center shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 20% 50%, #ff6b35 0%, transparent 60%)', animation: 'floatUp 4s ease-in-out infinite' }} />
            <div className="flex items-center space-x-3 sm:space-x-4 relative z-10">
              <div className="relative animate-float">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-orange rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-orange/20">
                  <Bot size={20} />
                </div>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-brand-stone rounded-full"></span>
              </div>
              <div>
                <p className="font-black text-[11px] uppercase tracking-[0.1em]">Expert Technique IA</p>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-50 flex items-center gap-1">
                  Cameroun • Actif
                  <span className="flex gap-0.5">
                    <span className="w-1 h-1 bg-green-400 rounded-full dot-1 inline-block"></span>
                    <span className="w-1 h-1 bg-green-400 rounded-full dot-2 inline-block"></span>
                    <span className="w-1 h-1 bg-green-400 rounded-full dot-3 inline-block"></span>
                  </span>
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}
              className="tap-ripple w-9 h-9 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all hover:rotate-90 duration-300 relative z-10 active:scale-90"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow p-4 sm:p-6 overflow-y-auto space-y-6 sm:space-y-8 bg-brand-beige/20 scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                style={{ animation: `${m.role === 'user' ? 'slideInUp' : 'fadeSlideRight'} 0.4s ease both` }}
              >
                {m.role === 'bot' && (
                  <div className="flex items-center space-x-2 mb-2 ml-1">
                    <ShieldCheck size={11} className="text-brand-orange" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40">Rapport Technique</span>
                  </div>
                )}
                <div className={`max-w-[92%] p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-sm border ${
                  m.role === 'user'
                    ? 'bg-brand-stone text-white rounded-tr-none border-brand-stone shadow-xl shadow-brand-stone/10'
                    : 'bg-white text-brand-stone rounded-tl-none border-brand-sand/40'
                }`}>
                  {m.role === 'bot' ? <FormattedResponse text={m.text} /> : <p className="text-[13px] font-bold leading-relaxed">{m.text}</p>}
                </div>
                {m.role === 'bot' && (
                  <div className="mt-3 ml-1 flex items-center space-x-2 opacity-30">
                    <CheckCircle2 size={10} className="text-brand-orange" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Validé par Imani-Tech Solutions</span>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start" style={{ animation: 'fadeSlideRight 0.3s ease both' }}>
                <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-sm border border-brand-sand/40 flex items-center space-x-3">
                  <Loader2 className="animate-spin text-brand-orange" size={15} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-stone/40">Analyse en cours</span>
                  <span className="flex gap-0.5">
                    <span className="w-1.5 h-1.5 bg-brand-orange/60 rounded-full dot-1 inline-block"></span>
                    <span className="w-1.5 h-1.5 bg-brand-orange/60 rounded-full dot-2 inline-block"></span>
                    <span className="w-1.5 h-1.5 bg-brand-orange/60 rounded-full dot-3 inline-block"></span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 sm:p-6 bg-white border-t border-brand-sand/30 shrink-0">
            <div className="flex items-center space-x-2 sm:space-x-3 bg-brand-beige/40 p-2 rounded-xl sm:rounded-2xl border border-brand-sand/20 focus-within:border-brand-orange transition-all focus-within:shadow-[0_0_0_3px_rgba(255,107,53,0.12)]">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Votre question technique..."
                className="flex-grow bg-transparent p-2 sm:p-3 text-xs font-bold text-brand-stone placeholder:text-brand-stone/30 focus:outline-none"
              />
              <button onClick={handleSend}
                className="tap-ripple bg-brand-orange text-white w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-brand-stone transition-all shadow-lg shadow-brand-orange/20 hover:scale-110 active:scale-90 duration-300"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Launcher buttons */}
      <div className="flex flex-col space-y-3">
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
          className="tap-ripple w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] text-white rounded-xl sm:rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 hover:-rotate-6 transition-all border-4 border-white group relative active:scale-95"
          style={{ width: '3.25rem', height: '3.25rem' }}
        >
          <MessageSquare size={24} />
          <span className="absolute right-full mr-3 bg-brand-stone text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
            WhatsApp Direct
          </span>
        </a>
        <button onClick={() => setIsOpen(!isOpen)}
          className={`tap-ripple rounded-xl sm:rounded-2xl shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center border-4 border-white group relative ${
            isOpen ? 'bg-white text-brand-orange' : 'bg-brand-stone text-white animate-glow-pulse'
          }`}
          style={{ width: '3.25rem', height: '3.25rem' }}
        >
          <span key={String(isOpen)} style={{ animation: 'charReveal 0.3s ease both', display: 'block' }}>
            {isOpen ? <X size={24} /> : <Bot size={24} />}
          </span>
          {!isOpen && (
            <span className="absolute right-full mr-3 bg-brand-stone text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
              Expert IA
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

// ─── Layout ───────────────────────────────────────────────────────────────────
const Layout: React.FC = () => {
  useEffect(() => { injectStyles(); }, []);

  return (
    <div className="flex flex-col min-h-screen relative font-inter bg-brand-beige">
      <Navbar />
      {/* Extra bottom padding on mobile to clear the tab bar */}
      <main className="flex-grow pt-[104px] sm:pt-[116px] lg:pt-[116px] pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileTabBar />
      <AIAssistant />
    </div>
  );
};

export default Layout;





