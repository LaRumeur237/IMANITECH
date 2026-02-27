import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, Target, Zap, Globe, Wifi, Layout, HardDrive,
  Camera, Key, BookOpen, ShieldCheck, HeartHandshake, CheckCircle2,
  PlayCircle, MonitorPlay, Cpu, ArrowUpRight, Terminal, Lock, Signal, Award
} from 'lucide-react';
import { AppRoute } from '../types';
import { AGENCY_STATS, WHATSAPP_LINK, SERVICES } from '../data';

// ─── Inject global keyframes ────────────────────────────────────────────────
const injectHomeStyles = () => {
  if (document.getElementById('home-styles')) return;
  const s = document.createElement('style');
  s.id = 'home-styles';
  s.textContent = `
    @keyframes glitch1 {
      0%,100%{ clip-path:inset(0 0 96% 0); transform:translateX(0); }
      20%{ clip-path:inset(40% 0 50% 0); transform:translateX(-4px); }
      40%{ clip-path:inset(70% 0 10% 0); transform:translateX(4px); }
      60%{ clip-path:inset(20% 0 75% 0); transform:translateX(-2px); }
      80%{ clip-path:inset(85% 0 2% 0);  transform:translateX(3px); }
    }
    @keyframes glitch2 {
      0%,100%{ clip-path:inset(97% 0 0 0); transform:translateX(0); }
      20%{ clip-path:inset(50% 0 40% 0); transform:translateX(4px); }
      40%{ clip-path:inset(10% 0 75% 0); transform:translateX(-4px); }
      60%{ clip-path:inset(75% 0 15% 0); transform:translateX(2px); }
      80%{ clip-path:inset(2% 0 90% 0);  transform:translateX(-3px); }
    }
    @keyframes scanline {
      0%  { transform: translateY(-100%); }
      100%{ transform: translateY(100vh); }
    }
    @keyframes bgSlide {
      0%   { opacity:0; transform:scale(1.08); }
      8%   { opacity:1; transform:scale(1.04); }
      30%  { opacity:1; transform:scale(1); }
      38%  { opacity:0; transform:scale(0.97); }
      100% { opacity:0; transform:scale(0.97); }
    }
    @keyframes floatY {
      0%,100%{ transform:translateY(0px) rotate(0deg); }
      50%    { transform:translateY(-18px) rotate(2deg); }
    }
    @keyframes matrixRain {
      0%  { transform: translateY(-100%); opacity:1; }
      80% { opacity:0.6; }
      100%{ transform: translateY(100vh); opacity:0; }
    }
    @keyframes typewriter {
      from{ width:0; }
      to  { width:100%; }
    }
    @keyframes blink {
      0%,100%{ border-color: transparent; }
      50%    { border-color: #ff6b35; }
    }
    @keyframes pulseRing {
      0%  { transform:scale(0.8); opacity:0.8; }
      100%{ transform:scale(2.4); opacity:0; }
    }
    @keyframes slideInStagger {
      from{ opacity:0; transform:translateY(40px) skewY(2deg); }
      to  { opacity:1; transform:translateY(0)    skewY(0); }
    }
    @keyframes counterUp {
      from{ transform:translateY(100%); opacity:0; }
      to  { transform:translateY(0);    opacity:1; }
    }
    @keyframes shimmerBar {
      from{ background-position: -200% center; }
      to  { background-position:  200% center; }
    }
    @keyframes rotateSlow {
      from{ transform:rotate(0deg); }
      to  { transform:rotate(360deg); }
    }
    @keyframes neonFlicker {
      0%,19%,21%,23%,25%,54%,56%,100%{ text-shadow: 0 0 8px #ff6b35, 0 0 20px #ff6b35, 0 0 40px #ff6b35; }
      20%,22%,24%,55%{ text-shadow: none; }
    }
    @keyframes hexPulse {
      0%,100%{ opacity:0.04; transform:scale(1); }
      50%    { opacity:0.12; transform:scale(1.05); }
    }
    @keyframes dataStream {
      0%  { transform:translateY(-100%); opacity:0.6; }
      100%{ transform:translateY(100%);  opacity:0; }
    }
    @keyframes waveMove {
      0%  { d: path("M0,60 C150,90 350,30 500,60 L500,120 L0,120 Z"); }
      50% { d: path("M0,80 C100,50 400,100 500,70 L500,120 L0,120 Z"); }
      100%{ d: path("M0,60 C150,90 350,30 500,60 L500,120 L0,120 Z"); }
    }

    .glitch-wrapper { position:relative; display:inline-block; }
    .glitch-wrapper::before,
    .glitch-wrapper::after {
      content: attr(data-text);
      position: absolute; top:0; left:0;
      width:100%; color:#ff6b35;
      font-weight:900;
    }
    .glitch-wrapper::before {
      animation: glitch1 4s infinite linear;
      text-shadow: -2px 0 #4fc3f7;
      opacity: 0.7;
    }
    .glitch-wrapper::after {
      animation: glitch2 4s infinite linear;
      text-shadow: 2px 0 #ff6b35;
      opacity: 0.7;
    }

    .scanline-effect::after {
      content:'';
      position:absolute; top:0; left:0; right:0;
      height:3px;
      background: linear-gradient(transparent, rgba(255,107,53,0.4), transparent);
      animation: scanline 3s linear infinite;
      pointer-events:none;
      z-index:20;
    }

    .bg-slide { animation: bgSlide 15s ease-in-out infinite; }
    .bg-slide-2 { animation: bgSlide 15s ease-in-out 5s infinite; }
    .bg-slide-3 { animation: bgSlide 15s ease-in-out 10s infinite; }

    .float-card { animation: floatY 5s ease-in-out infinite; }
    .float-card-2 { animation: floatY 7s ease-in-out 1s infinite; }

    .shimmer-bar {
      background: linear-gradient(90deg, #ff6b35 0%, #ff9a6c 40%, #ff6b35 60%, #ff9a6c 100%);
      background-size: 200% auto;
      animation: shimmerBar 2s linear infinite;
    }

    .neon-text { animation: neonFlicker 5s infinite; color: #ff6b35; }
    .hex-bg    { animation: hexPulse 4s ease-in-out infinite; }
    .rotate-slow { animation: rotateSlow 20s linear infinite; }

    .stagger-1 { animation: slideInStagger 0.8s 0.1s both ease-out; }
    .stagger-2 { animation: slideInStagger 0.8s 0.25s both ease-out; }
    .stagger-3 { animation: slideInStagger 0.8s 0.4s both ease-out; }
    .stagger-4 { animation: slideInStagger 0.8s 0.55s both ease-out; }

    .typewriter-text {
      overflow:hidden;
      white-space:nowrap;
      border-right: 2px solid #ff6b35;
      animation: typewriter 2s steps(30,end) 0.5s both, blink 0.75s step-end infinite;
      width:0;
    }

    .pulse-ring::before {
      content:'';
      position:absolute; inset:-8px;
      border:2px solid #ff6b35;
      border-radius:9999px;
      animation: pulseRing 1.8s ease-out infinite;
    }
    .pulse-ring::after {
      content:'';
      position:absolute; inset:-16px;
      border:1px solid rgba(255,107,53,0.3);
      border-radius:9999px;
      animation: pulseRing 1.8s ease-out 0.4s infinite;
    }

    .card-3d {
      transform-style: preserve-3d;
      transition: transform 0.5s ease;
    }
    .card-3d:hover { transform: perspective(800px) rotateY(-5deg) rotateX(3deg) translateZ(10px); }

    .data-stream-char {
      position:absolute;
      font-family:monospace;
      font-size:12px;
      color:#ff6b35;
      animation: dataStream 4s linear infinite;
      opacity:0;
    }

    :root { --brand-orange:#ff6b35; --brand-stone:#1a1a2e; }
  `;
  document.head.appendChild(s);
};

// ─── Canvas Particles Network ────────────────────────────────────────────────
const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface P { x:number; y:number; vx:number; vy:number; r:number; pulse:number; }
    const N = 60;
    const particles: P[] = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2.5 + 1,
      pulse: Math.random() * Math.PI * 2,
    }));

    let mouse = { x: -1000, y: -1000 };
    canvas.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.pulse += 0.02;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // mouse repulsion
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) { p.vx += dx / dist * 0.3; p.vy += dy / dist * 0.3; }

        const pulse = Math.sin(p.pulse) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (0.8 + pulse * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,107,53,${0.4 + pulse * 0.4})`;
        ctx.fill();

        // glow
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(255,107,53,${0.15 * pulse})`);
        g.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // Lines between nearby particles
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - d / 130) * 0.35;
            ctx.strokeStyle = `rgba(255,107,53,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Mouse connections
      particles.forEach(p => {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 180) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255,107,53,${(1 - d/180) * 0.6})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}/>;
};

// ─── Matrix Rain ─────────────────────────────────────────────────────────────
const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(1);
    const chars = 'アイウエオカキクケコ01サシスセソタチツテトナニヌネノ'.split('');

    const draw = () => {
      ctx.fillStyle = 'rgba(10,10,20,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255,107,53,0.6)';
      ctx.font = '14px monospace';

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-20" style={{ zIndex: 0 }}/>;
};

// ─── Animated Counter ────────────────────────────────────────────────────────
const Counter: React.FC<{ to: number; suffix?: string; duration?: number }> = ({ to, suffix = '', duration = 2000 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const progress = Math.min((Date.now() - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setVal(Math.floor(ease * to));
          if (progress < 1) requestAnimationFrame(tick);
        };
        tick();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
};

// ─── Background Slideshow ────────────────────────────────────────────────────
const BG_IMAGES = [
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?auto=format&fit=crop&q=80&w=2000',
];

const BackgroundSlideshow: React.FC = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % BG_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {BG_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-all duration-[2000ms] ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            transform: i === current ? 'scale(1.04)' : 'scale(1.1)',
          }}
        >
          <img src={src} alt="" className="w-full h-full object-cover"/>
        </div>
      ))}
      {/* layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14]/98 via-[#0a0a14]/80 to-[#0a0a14]/40" style={{ zIndex:2 }}/>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14]/90 via-transparent to-transparent" style={{ zIndex:2 }}/>
      <div className="absolute inset-0" style={{
        zIndex:2,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
      }}/>
    </div>
  );
};

// ─── Floating Tech Badge ─────────────────────────────────────────────────────
const TechBadge: React.FC<{ icon: React.ReactNode; label: string; value: string; delay?: string; className?: string }> = ({
  icon, label, value, delay = '0s', className = ''
}) => (
  <div
    className={`absolute bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-4 shadow-2xl ${className}`}
    style={{ animation: `floatY 5s ${delay} ease-in-out infinite` }}
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-[#ff6b35] rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg">
        {icon}
      </div>
      <div>
        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40">{label}</p>
        <p className="text-sm font-black text-white uppercase tracking-tight">{value}</p>
      </div>
    </div>
  </div>
);

// ─── Service Card ─────────────────────────────────────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
  Wifi: <Wifi size={26}/>, Layout: <Layout size={26}/>, HardDrive: <HardDrive size={26}/>,
  Camera: <Camera size={26}/>, Key: <Key size={26}/>, BookOpen: <BookOpen size={26}/>
};

const serviceImages = [
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=60&w=600',
  'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=60&w=600',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=60&w=600',
  'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=60&w=600',
  'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=60&w=600',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=60&w=600',
];

// ─── Main Component ──────────────────────────────────────────────────────────
const Home: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const words = ['Sécurisez', 'Boostez', 'Digitalisez', 'Connectez'];

  useEffect(() => {
    injectHomeStyles();
    const t = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => { setWordIndex(i => (i + 1) % words.length); setWordVisible(true); }, 400);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="overflow-hidden bg-[#0a0a14]">

      {/* ══════════════════════════════════════════════════════
          HERO — full immersive dark with particles + slideshow
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden scanline-effect">
        {/* BG layers */}
        <BackgroundSlideshow />
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          <MatrixRain />
        </div>
        <div className="absolute inset-0" style={{ zIndex: 4 }}>
          <ParticleCanvas />
        </div>

        {/* Hex grid decoration */}
        <div className="absolute inset-0 pointer-events-none hex-bg" style={{ zIndex: 3, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66z' fill='none' stroke='rgba(255,107,53,0.07)' stroke-width='1'/%3E%3Cpath d='M28 100L0 84V50l28-16 28 16v34L28 100z' fill='none' stroke='rgba(255,107,53,0.07)' stroke-width='1'/%3E%3C/svg%3E\")" }}/>

        {/* rotating ring */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none" style={{ zIndex: 3 }}>
          <div className="rotate-slow w-full h-full rounded-full border border-[#ff6b35]/10"/>
          <div className="absolute inset-8 rotate-slow w-full h-full rounded-full border border-[#ff6b35]/06" style={{ animationDirection: 'reverse' }}/>
          <div className="absolute inset-16 rotate-slow w-full h-full rounded-full border-2 border-[#ff6b35]/08"/>
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 relative grid grid-cols-1 lg:grid-cols-2 gap-20 items-center" style={{ zIndex: 10 }}>

          {/* Left — copy */}
          <div>
            {/* Live badge */}
            <div className="stagger-1 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/30 mb-8">
              <div className="relative w-2.5 h-2.5 pulse-ring">
                <div className="w-full h-full bg-[#ff6b35] rounded-full"/>
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.35em] text-[#ff6b35]">Expertise Digitale Premium · Cameroun 237</span>
            </div>

            {/* Headline with glitch */}
            <div className="stagger-2 mb-6">
              <div
                className="glitch-wrapper text-6xl sm:text-7xl lg:text-[90px] font-black leading-[0.85] uppercase tracking-tighter text-white"
                data-text={words[wordIndex]}
                style={{
                  opacity: wordVisible ? 1 : 0,
                  transform: wordVisible ? 'translateY(0)' : 'translateY(-20px)',
                  filter: wordVisible ? 'blur(0)' : 'blur(8px)',
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  color: '#ff6b35',
                }}
              >
                {words[wordIndex]}
              </div>
              <div className="text-6xl sm:text-7xl lg:text-[90px] font-black leading-[0.85] uppercase tracking-tighter text-white mt-1">
                Votre Avenir
              </div>
              <div className="text-6xl sm:text-7xl lg:text-[90px] font-black leading-[0.85] uppercase tracking-tighter" style={{ color: '#ff6b35', WebkitTextStroke: '1px rgba(255,107,53,0.3)' }}>
                Digital.
              </div>
            </div>

            {/* Typewriter sub */}
            <div className="stagger-3 mb-10 max-w-lg">
              <p className="typewriter-text text-sm font-mono text-[#ff6b35] uppercase tracking-widest">
                &gt; Réseau · Vidéosurveillance · Web · Sécurité
              </p>
              <p className="text-base text-white/60 font-bold leading-relaxed mt-4">
                Imani-Tech transforme les PME camerounaises en leaders digitaux — infrastructure de classe mondiale, déployée localement.
              </p>
            </div>

            {/* CTAs */}
            <div className="stagger-4 flex flex-col sm:flex-row gap-4">
              <Link to={AppRoute.Audit} className="group relative overflow-hidden bg-[#ff6b35] text-white px-8 py-5 rounded-full font-black text-sm uppercase tracking-[0.15em] flex items-center gap-3 shadow-[0_0_40px_rgba(255,107,53,0.4)] hover:shadow-[0_0_60px_rgba(255,107,53,0.6)] transition-all duration-300">
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-[-15deg] group-hover:translate-x-[120%] transition-transform duration-500"/>
                Audit Gratuit
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
              </Link>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="group px-8 py-5 rounded-full font-black text-sm uppercase tracking-[0.15em] flex items-center gap-3 border-2 border-white/20 text-white hover:border-[#ff6b35] hover:bg-[#ff6b35]/10 transition-all duration-300">
                <Signal size={16} className="text-[#ff6b35]"/>
                WhatsApp Expert
              </a>
            </div>

            {/* Mini stats */}
            <div className="mt-12 flex gap-10 pt-8 border-t border-white/10">
              {[
                { n: '200+', l: 'Clients' },
                { n: '99%',  l: 'Uptime' },
                { n: '12',   l: 'Villes' },
              ].map(s => (
                <div key={s.l}>
                  <p className="text-2xl font-black text-[#ff6b35] neon-text">{s.n}</p>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating dashboard card */}
          <div className="hidden lg:flex flex-col gap-6 relative">
            {/* Floating badges */}
            <TechBadge icon={<Wifi size={18}/>}      label="Réseau LAN/Wi-Fi"    value="Certifié Pro"   delay="0s"   className="top-0 right-0 z-20"/>
            <TechBadge icon={<Camera size={18}/>}    label="Vidéosurveillance IP" value="4K · IA Active" delay="1.2s" className="bottom-20 left-0 z-20"/>
            <TechBadge icon={<Lock size={18}/>}      label="Cybersécurité"        value="ISO 27001"      delay="2.5s" className="top-32 left-8 z-20"/>

            {/* Main dashboard card */}
            <div className="card-3d bg-[#0d1117]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden mt-16">
              {/* card top bar */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full"/>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"/>
                <div className="w-3 h-3 bg-green-500 rounded-full"/>
                <div className="ml-4 flex-1 bg-white/5 rounded-full h-6 flex items-center px-3">
                  <Terminal size={10} className="text-[#ff6b35] mr-2"/>
                  <span className="text-[9px] font-mono text-white/30">imani-tech.cm/dashboard</span>
                </div>
              </div>

              {/* "Live" status */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-1">Statut Infrastructure</p>
                  <p className="text-2xl font-black text-white">Opérationnel <span className="text-[#ff6b35]">✓</span></p>
                </div>
                <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/40 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full" style={{ animation: 'pulseRing 1.5s ease-out infinite' }}/>
                  <span className="text-[9px] font-black uppercase tracking-widest text-green-400">LIVE 24/7</span>
                </div>
              </div>

              {/* Bar charts */}
              <div className="space-y-4 mb-8">
                {[
                  { label: 'Réseau Uptime',        pct: 99, col: '#ff6b35' },
                  { label: 'Caméras Actives',      pct: 87, col: '#4fc3f7' },
                  { label: 'Sécurité Score',        pct: 95, col: '#a3e635' },
                  { label: 'Satisfaction Client',   pct: 98, col: '#ff6b35' },
                ].map(b => (
                  <div key={b.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{b.label}</span>
                      <span className="text-[9px] font-black text-white">{b.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-[2s] ease-out"
                        style={{ width: `${b.pct}%`, background: b.col, boxShadow: `0 0 12px ${b.col}` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Metrics row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { v: '+150', l: 'PME' },
                  { v: '8 ans', l: 'Expérience' },
                  { v: '12', l: 'Villes' },
                ].map(m => (
                  <div key={m.l} className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                    <p className="text-lg font-black text-[#ff6b35]">{m.v}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/30">{m.l}</p>
                  </div>
                ))}
              </div>

              {/* card bottom glow */}
              <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(255,107,53,0.06), transparent)' }}/>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ zIndex: 10 }}>
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20">Scroll</span>
          <div className="w-5 h-9 border border-white/20 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-[#ff6b35] rounded-full" style={{ animation: 'floatY 1.5s ease-in-out infinite' }}/>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SERVICES — dark grid with image hover backgrounds
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#0d1117] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,107,53,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(79,195,247,0.03) 0%, transparent 60%)" }}/>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-[#ff6b35] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Notre Expertise Technique</span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
              Nos <span className="text-[#ff6b35]">Prestations</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-[2rem] border border-white/8 cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)' }}
              >
                {/* background image on hover */}
                <div className="absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-30">
                  <img src={serviceImages[i % serviceImages.length]} alt="" className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent"/>
                </div>

                <div className="relative z-10 p-8">
                  <div className="w-14 h-14 bg-[#ff6b35]/10 rounded-2xl flex items-center justify-center text-[#ff6b35] mb-6 group-hover:bg-[#ff6b35] group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,107,53,0.4)]">
                    {iconMap[service.iconName] || <Zap size={26}/>}
                  </div>
                  <div className="text-[9px] font-black text-[#ff6b35]/60 uppercase tracking-[0.3em] mb-2">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3 group-hover:text-[#ff6b35] transition-colors">{service.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-bold mb-6">{service.description}</p>
                  <Link to={AppRoute.Services} className="flex items-center gap-2 text-[#ff6b35] text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    Voir détails <ArrowUpRight size={12}/>
                  </Link>
                </div>

                {/* bottom accent line */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-[#ff6b35] w-0 group-hover:w-full transition-all duration-500"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS — animated counters on dark bg with video bg
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0a0a14]/92"/>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,107,53,0.02) 2px, rgba(255,107,53,0.02) 4px)" }}/>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { n: 200, s: '+', l: 'Clients Satisfaits', icon: <HeartHandshake size={24}/> },
              { n: 8,   s: ' Ans', l: "D'Expérience",   icon: <Award size={24}/> },
              { n: 12,  s: '',  l: 'Villes Couvertes',   icon: <Globe size={24}/> },
              { n: 99,  s: '%', l: 'Uptime Garanti',     icon: <Zap size={24}/> },
            ].map((st, i) => (
              <div key={i} className="group">
                <div className="w-14 h-14 bg-[#ff6b35]/10 rounded-2xl flex items-center justify-center text-[#ff6b35] mx-auto mb-4 group-hover:bg-[#ff6b35] group-hover:text-white transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(255,107,53,0.4)]">
                  {st.icon}
                </div>
                <p className="text-5xl font-black text-[#ff6b35] font-mono">
                  <Counter to={st.n} suffix={st.s}/>
                </p>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mt-2">{st.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VIDEO SHOWCASE — cinematic dark section
      ══════════════════════════════════════════════════════ */}
      <section className="py-32 bg-[#0d1117] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Cpu size={700} className="absolute -top-60 -left-60 text-[#ff6b35] opacity-[0.02]"/>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/30 mb-8">
                <PlayCircle size={14} className="text-[#ff6b35]"/>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#ff6b35]">Showcase Technologique</span>
              </div>
              <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                Imani-Tech <br/><span className="text-[#ff6b35]">En Action</span>.
              </h2>
              <p className="text-base text-white/40 font-bold leading-relaxed mb-10">
                Plongez au cœur de notre expertise. Découvrez comment nous transformons les infrastructures des PME leaders au Cameroun.
              </p>
              {[
                { l: 'Durée',    v: 'Présentation Complète' },
                { l: 'Qualité',  v: 'Ultra HD 4K Streaming' },
                { l: 'Focus',    v: 'Réseau · Sécurité · Digital' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 border-l-2 border-[#ff6b35]/30 pl-5 py-2 mb-4">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#ff6b35] w-14">{item.l}</span>
                  <span className="text-sm font-black text-white uppercase tracking-tight">{item.v}</span>
                </div>
              ))}
              <Link to={AppRoute.Audit} className="mt-4 inline-flex items-center gap-3 bg-white text-[#0d1117] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#ff6b35] hover:text-white transition-all shadow-2xl">
                Démarrer le Projet <ChevronRight size={16}/>
              </Link>
            </div>

            <div className="lg:col-span-7 relative group">
              <div className="absolute -inset-4 bg-[#ff6b35]/10 rounded-[3rem] blur-3xl group-hover:bg-[#ff6b35]/20 transition-all duration-700"/>
              <div className="relative bg-black rounded-[2rem] overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.9)] border-2 border-white/10 aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0&modestbranding=1"
                  title="Présentation Imani-Tech Solutions"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="absolute -top-5 -right-5 bg-[#ff6b35] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-[#0d1117]" style={{ animation: 'floatY 3s ease-in-out infinite' }}>
                <MonitorPlay size={16}/>
                <span className="text-[9px] font-black uppercase tracking-widest">Démo Live</span>
              </div>
              <div className="absolute -bottom-5 -left-5 bg-[#0d1117] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-[#ff6b35]" style={{ animation: 'floatY 4s ease-in-out 1s infinite' }}>
                <div className="w-2 h-2 bg-green-400 rounded-full" style={{ animation: 'pulseRing 1.5s ease-out infinite' }}/>
                <span className="text-[9px] font-black uppercase tracking-widest">Contenu Exclusif</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TRUST — animated pillars on image bg
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?auto=format&fit=crop&q=80&w=2000" alt="" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-[#0a0a14]/90"/>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { title: 'Installation Pro',  desc: 'Matériel certifié, pose conforme normes sécurité.', icon: <ShieldCheck size={22}/> },
            { title: 'Reach National',    desc: 'Expertise sur les 10 régions du triangle national.', icon: <Globe size={22}/> },
            { title: 'Support H24',       desc: 'Équipe technique réactive pour toutes urgences IT.',  icon: <Zap size={22}/> },
            { title: 'Ciblage Local',     desc: 'Solutions dimensionnées pour le réseau CMR.',         icon: <Target size={22}/> },
          ].map((item, i) => (
            <div key={i} className="group border border-white/8 rounded-[2rem] p-8 hover:border-[#ff6b35]/40 hover:bg-[#ff6b35]/5 transition-all duration-300" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-12 h-12 bg-[#ff6b35]/10 text-[#ff6b35] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#ff6b35] group-hover:text-white transition-all group-hover:shadow-[0_0_20px_rgba(255,107,53,0.4)]">
                {item.icon}
              </div>
              <h3 className="text-base font-black text-white uppercase tracking-tight mb-3">{item.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed font-bold">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA FINAL — dramatic full-bleed
      ══════════════════════════════════════════════════════ */}
      <section className="py-40 text-center relative overflow-hidden bg-[#0a0a14]">
        {/* animated radial burst */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[1, 2, 3, 4].map(r => (
            <div key={r} className="absolute rounded-full border border-[#ff6b35]/10" style={{ width: r * 300, height: r * 300, animation: `pulseRing ${2 + r * 0.5}s ease-out ${r * 0.3}s infinite` }}/>
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(255,107,53,0.08) 0%, transparent 70%)' }}/>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#ff6b35] mb-6">— Passez à l'Action —</p>
          <h2 className="text-5xl md:text-8xl font-black leading-[0.85] mb-12 uppercase tracking-tighter text-white">
            Blinder Votre <br/><span className="text-[#ff6b35] neon-text">Infrastructure</span> <br/>Commence Ici.
          </h2>
          <Link
            to={AppRoute.Audit}
            className="group relative inline-flex items-center gap-4 bg-[#ff6b35] text-white px-14 py-7 rounded-full font-black text-lg uppercase tracking-widest hover:bg-white hover:text-[#0a0a14] transition-all duration-500 shadow-[0_0_60px_rgba(255,107,53,0.5)] hover:shadow-[0_0_80px_rgba(255,107,53,0.3)] overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-[-15deg] group-hover:translate-x-[120%] transition-transform duration-700"/>
            Réservez un Audit Gratuit
            <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
