import React, { useState, useEffect, useRef } from 'react';
import {
  Target, Rocket, Globe, ArrowRight, Zap, CheckCircle, Wifi, Layout,
  HardDrive, Camera, Key, BookOpen, Cpu,
  ShieldCheck, TrendingUp, Info, Phone, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';
import { SERVICES, WHATSAPP_LINK } from '../data';

// ─── Icône map ────────────────────────────────────────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
  'Wifi': <Wifi />, 'Layout': <Layout />, 'HardDrive': <HardDrive />,
  'Camera': <Camera />, 'Key': <Key />, 'BookOpen': <BookOpen />,
  'Phone': <Phone />, 'ShieldCheck': <ShieldCheck />, 'TrendingUp': <TrendingUp />,
  'Shield': <Shield />, 'Rocket': <Rocket />, 'Target': <Target />,
};

// ─── Couleurs par service ─────────────────────────────────────────────────────
const SERVICE_COLORS = [
  '#E87722', '#2563EB', '#0F766E', '#7C3AED',
  '#DC2626', '#D97706', '#DB2777', '#0891B2', '#16A34A',
];

// ─── Images Unsplash dédiées par iconName ────────────────────────────────────
// Chaque service a sa propre photo ultra-pertinente
const SERVICE_IMAGES: Record<string, { url: string; label: string; effect: string }> = {
  'Wifi': {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=85&w=900',
    label: 'Infrastructure Réseau',
    effect: 'scan',       // effet scan horizontal
  },
  'Layout': {
    url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=85&w=900',
    label: 'Développement Web',
    effect: 'glitch',     // effet glitch coloré
  },
  'HardDrive': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=85&w=900',
    label: 'Serveurs & Stockage',
    effect: 'pulse',      // pulsation lumineuse
  },
  'Camera': {
    url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=85&w=900',
    label: 'Vidéosurveillance',
    effect: 'cctv',       // effet CCTV avec timestamp
  },
  'Key': {
    url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=85&w=900',
    label: 'Cybersécurité',
    effect: 'matrix',     // pluie de code matrix
  },
  'BookOpen': {
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=85&w=900',
    label: 'Formation IT',
    effect: 'scan',
  },
  'Phone': {
    url: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&q=85&w=900',
    label: 'Téléphonie IP',
    effect: 'wave',       // ondes sonores animées
  },
  'ShieldCheck': {
    url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=85&w=900',
    label: 'Sécurité Physique',
    effect: 'pulse',
  },
  'TrendingUp': {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=85&w=900',
    label: 'Marketing Digital',
    effect: 'glitch',
  },
  'Shield': {
    url: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=85&w=900',
    label: 'Protection Avancée',
    effect: 'matrix',
  },
  'Rocket': {
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=85&w=900',
    label: 'Solutions Cloud',
    effect: 'wave',
  },
  'Target': {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=85&w=900',
    label: 'Stratégie Digitale',
    effect: 'pulse',
  },
};

// ─── Canvas effet CCTV (caméra de surveillance) ───────────────────────────────
const CCTVEffect: React.FC<{ color: string }> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    let t = 0; let animId: number;

    const draw = () => {
      const W = canvas.width, H = canvas.height; t += 0.02;
      ctx.clearRect(0, 0, W, H);

      // Scan line CCTV
      const scanY = ((t * 0.3) % 1) * H;
      const sg = ctx.createLinearGradient(0, scanY - 3, 0, scanY + 3);
      sg.addColorStop(0, 'transparent'); sg.addColorStop(0.5, `${color}cc`); sg.addColorStop(1, 'transparent');
      ctx.fillStyle = sg; ctx.fillRect(0, scanY - 3, W, 6);

      // Grille CCTV
      ctx.strokeStyle = `${color}20`; ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // Timestamp CCTV
      const now = new Date();
      const ts = `REC ● ${now.toLocaleDateString('fr-FR')} ${now.toLocaleTimeString('fr-FR')}`;
      ctx.font = 'bold 11px monospace'; ctx.fillStyle = color; ctx.globalAlpha = 0.9;
      ctx.fillText(ts, 12, H - 14);
      ctx.globalAlpha = 1;

      // Cercle REC clignotant
      if (Math.sin(t * 3) > 0) {
        ctx.beginPath(); ctx.arc(W - 18, H - 18, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ff3333'; ctx.fill();
      }

      // Coins CCTV
      const cs = 18, cl = 24, cw = 2;
      ctx.strokeStyle = color; ctx.lineWidth = cw; ctx.globalAlpha = 0.8;
      [[0,0],[W,0],[0,H],[W,H]].forEach(([cx,cy]) => {
        const sx = cx === 0 ? cs : -cs, sy = cy === 0 ? cs : -cs;
        ctx.beginPath(); ctx.moveTo(cx, cy + sy); ctx.lineTo(cx, cy); ctx.lineTo(cx + sx, cy); ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // Noise léger
      for (let i = 0; i < 30; i++) {
        const nx = Math.random() * W, ny = Math.random() * H;
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.04})`;
        ctx.fillRect(nx, ny, Math.random() * 3, 1);
      }

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [color]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// ─── Canvas effet Matrix (pluie de code) ─────────────────────────────────────
const MatrixEffect: React.FC<{ color: string }> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const cols = Math.floor(W / 14);
    const drops = Array(cols).fill(0).map(() => Math.random() * H / 14);
    const chars = '01アイウエオカキクケコサシスセソタチ∑∆◊⬡⚡';
    let animId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(3,4,15,0.12)'; ctx.fillRect(0, 0, W, H);
      ctx.font = '11px monospace';
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const alpha = Math.random() > 0.95 ? 1 : 0.4;
        ctx.fillStyle = i % 3 === 0 ? `rgba(255,255,255,${alpha * 0.8})` : `${color}${Math.floor(alpha * 180).toString(16).padStart(2,'0')}`;
        ctx.fillText(ch, i * 14, y * 14);
        drops[i] = y > H / 14 && Math.random() > 0.975 ? 0 : y + 0.4;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [color]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// ─── Canvas effet Scan (radar horizontal) ────────────────────────────────────
const ScanEffect: React.FC<{ color: string }> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    let t = 0; let animId: number;
    const draw = () => {
      const W = canvas.width, H = canvas.height; t += 0.018;
      ctx.clearRect(0, 0, W, H);
      // Lignes horizontales
      for (let y = 0; y < H; y += 20) {
        ctx.strokeStyle = `${color}12`; ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      // Scan line principale
      const scanY = ((Math.sin(t) + 1) / 2) * H;
      const sg = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      sg.addColorStop(0, 'transparent'); sg.addColorStop(0.5, `${color}55`); sg.addColorStop(1, 'transparent');
      ctx.fillStyle = sg; ctx.fillRect(0, scanY - 40, W, 80);
      // Scan vertical secondaire
      const scanX = ((Math.sin(t * 0.7 + 1) + 1) / 2) * W;
      const sgx = ctx.createLinearGradient(scanX - 30, 0, scanX + 30, 0);
      sgx.addColorStop(0, 'transparent'); sgx.addColorStop(0.5, `${color}22`); sgx.addColorStop(1, 'transparent');
      ctx.fillStyle = sgx; ctx.fillRect(scanX - 30, 0, 60, H);
      // Points de données
      for (let i = 0; i < 8; i++) {
        const px = (Math.sin(t * 0.5 + i) * 0.4 + 0.5) * W;
        const py = (Math.cos(t * 0.3 + i * 1.3) * 0.4 + 0.5) * H;
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.globalAlpha = 0.6; ctx.fill(); ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.strokeStyle = color; ctx.lineWidth = 0.5; ctx.globalAlpha = 0.2; ctx.stroke(); ctx.globalAlpha = 1;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [color]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// ─── Canvas effet Glitch ─────────────────────────────────────────────────────
const GlitchEffect: React.FC<{ color: string }> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    let t = 0; let animId: number;
    const draw = () => {
      const W = canvas.width, H = canvas.height; t += 0.02;
      ctx.clearRect(0, 0, W, H);
      // Barres glitch
      const glitchIntensity = Math.abs(Math.sin(t * 0.4));
      if (glitchIntensity > 0.7) {
        for (let i = 0; i < 4; i++) {
          const gy = Math.random() * H;
          const gh = Math.random() * 15 + 2;
          const gx = (Math.random() - 0.5) * 20;
          ctx.fillStyle = i % 2 === 0 ? `${color}30` : `rgba(79,195,247,0.15)`;
          ctx.fillRect(gx, gy, W, gh);
        }
      }
      // Lignes circuit
      ctx.strokeStyle = `${color}25`; ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const lx = (i / 6) * W;
        const amp = 20 + i * 5;
        ctx.beginPath();
        for (let x = 0; x < W; x += 4) {
          const y = H / 2 + amp * Math.sin(t * 1.5 + x * 0.02 + i);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.globalAlpha = 0.3; ctx.stroke(); ctx.globalAlpha = 1;
      }
      // Pixels colorés aléatoires
      for (let i = 0; i < 15; i++) {
        ctx.fillStyle = `${color}40`;
        ctx.fillRect(Math.random() * W, Math.random() * H, Math.random() * 8 + 1, 2);
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [color]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// ─── Canvas effet Pulse (battement lumineux) ─────────────────────────────────
const PulseEffect: React.FC<{ color: string }> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    let t = 0; let animId: number;
    const draw = () => {
      const W = canvas.width, H = canvas.height; t += 0.02;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      // Cercles concentriques pulsants
      for (let ring = 0; ring < 5; ring++) {
        const phase = t * 0.8 + ring * 0.6;
        const r = (ring / 5 + ((phase % 1))) * Math.min(W, H) * 0.55;
        const alpha = (1 - (phase % 1)) * 0.2;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = color; ctx.lineWidth = 1; ctx.globalAlpha = alpha; ctx.stroke(); ctx.globalAlpha = 1;
      }
      // Points orbitaux
      for (let p = 0; p < 6; p++) {
        const angle = t * 0.5 + (p / 6) * Math.PI * 2;
        const r = Math.min(W, H) * 0.3;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.globalAlpha = 0.7; ctx.fill(); ctx.globalAlpha = 1;
        // Ligne vers le centre
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py);
        ctx.strokeStyle = color; ctx.lineWidth = 0.5; ctx.globalAlpha = 0.15; ctx.stroke(); ctx.globalAlpha = 1;
      }
      // Centre lumineux
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
      glow.addColorStop(0, `${color}40`); glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow; ctx.fillRect(cx - 40, cy - 40, 80, 80);
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [color]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// ─── Canvas effet Wave (ondes) ───────────────────────────────────────────────
const WaveEffect: React.FC<{ color: string }> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    let t = 0; let animId: number;
    const draw = () => {
      const W = canvas.width, H = canvas.height; t += 0.025;
      ctx.clearRect(0, 0, W, H);
      // Ondes multiples
      for (let wave = 0; wave < 5; wave++) {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 3) {
          const y = H / 2 + Math.sin(x * 0.015 + t * 1.2 + wave * 0.8) * (25 + wave * 8)
                           + Math.sin(x * 0.03 + t * 0.8 + wave) * 12;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color; ctx.lineWidth = 1.2;
        ctx.globalAlpha = (0.5 - wave * 0.08); ctx.stroke(); ctx.globalAlpha = 1;
      }
      // Particules sur les ondes
      for (let p = 0; p < 8; p++) {
        const px = ((t * 0.15 + p * 0.125) % 1) * W;
        const py = H / 2 + Math.sin(px * 0.015 + t * 1.2) * 30;
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.globalAlpha = 0.8; ctx.fill(); ctx.globalAlpha = 1;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [color]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// ─── Composant image dynamique par service ────────────────────────────────────
const ServiceImage: React.FC<{ iconName: string; color: string; title: string }> = ({ iconName, color, title }) => {
  const imgRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const imgData = SERVICE_IMAGES[iconName] || {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=85&w=900',
    label: title, effect: 'scan',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setMouseOffset({ x, y });
  };

  const effectComponent = () => {
    switch (imgData.effect) {
      case 'cctv':   return <CCTVEffect color={color} />;
      case 'matrix': return <MatrixEffect color={color} />;
      case 'scan':   return <ScanEffect color={color} />;
      case 'glitch': return <GlitchEffect color={color} />;
      case 'pulse':  return <PulseEffect color={color} />;
      case 'wave':   return <WaveEffect color={color} />;
      default:       return <ScanEffect color={color} />;
    }
  };

  return (
    <div ref={imgRef}
      className="aspect-[4/3] rounded-[2.5rem] overflow-hidden relative shadow-2xl cursor-crosshair"
      style={{ border: `1px solid ${color}40` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouseOffset({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}>

      {/* Image avec parallaxe souris */}
      <div className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `scale(1.08) translate(${-mouseOffset.x}px, ${-mouseOffset.y}px)`,
        }}>
        <img
          loading="lazy"
          src={imgData.url}
          alt={imgData.label}
          className="w-full h-full object-cover transition-all duration-700"
          style={{
            filter: hovered
              ? `brightness(0.35) saturate(1.4) hue-rotate(0deg)`
              : `brightness(0.25) saturate(1.2)`,
          }}
        />
      </div>

      {/* Overlay dégradé couleur service */}
      <div className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${color}35 0%, transparent 50%, ${color}20 100%)`,
          opacity: hovered ? 1 : 0.6,
        }} />

      {/* Effet canvas dynamique */}
      {effectComponent()}

      {/* Vignette bords */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: `inset 0 0 60px rgba(0,0,0,0.7)` }} />

      {/* Badge effet type */}
      <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: color }} />
        <span className="text-[8px] font-black uppercase tracking-widest text-white/70 font-mono">
          {imgData.effect.toUpperCase()} LIVE
        </span>
      </div>

      {/* Label service */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
        <div className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-white"
          style={{ background: `${color}cc`, backdropFilter: 'blur(8px)' }}>
          {imgData.label}
        </div>
        {/* Indicateur hover */}
        <div className="px-2 py-1 rounded-lg text-[7px] font-black uppercase tracking-widest text-white/50 border border-white/10"
          style={{ backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.4)' }}>
          {hovered ? '◉ ACTIF' : '○ SURVOL'}
        </div>
      </div>

      {/* Shine on hover */}
      {hovered && (
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + mouseOffset.x * 2}% ${50 + mouseOffset.y * 2}%, ${color}20, transparent 60%)`,
          }} />
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// CANVAS SPATIAL HERO
// ═══════════════════════════════════════════════════════════════════════════════
const CosmicCanvas: React.FC<{ accent?: string }> = ({ accent = '#E87722' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const accentRef = useRef(accent);
  useEffect(() => { accentRef.current = accent; }, [accent]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let animId: number; let t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    const STARS = Array.from({ length: 200 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.8 + 0.2,
      phase: Math.random() * Math.PI * 2,
      color: ['#ffffff','#a8d8ff','#ffd4a8','#d4a8ff'][Math.floor(Math.random()*4)],
    }));
    const ORBS = Array.from({ length: 50 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random()-0.5)*0.0002, vy: (Math.random()-0.5)*0.0002,
      r: Math.random()*3+1, hue: Math.random()*360, life: Math.random()*Math.PI*2, lifeSpeed: 0.01+Math.random()*0.015,
    }));
    const METEORS: any[] = [];
    let mTimer = 0;
    const HEXAGONS = Array.from({ length: 8 }, () => ({
      x: Math.random(), y: Math.random(), size: 20+Math.random()*50,
      rot: Math.random()*Math.PI, rotSpeed: (Math.random()-0.5)*0.008,
      opacity: 0.03+Math.random()*0.06, vx: (Math.random()-0.5)*0.0001, vy: (Math.random()-0.5)*0.0001,
    }));
    const drawHex = (cx:number,cy:number,size:number,rot:number) => {
      ctx.beginPath();
      for(let i=0;i<6;i++){const a=rot+(i*Math.PI)/3;const px=cx+size*Math.cos(a);const py=cy+size*Math.sin(a);i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);}
      ctx.closePath();
    };
    const draw = () => {
      const W=canvas.width,H=canvas.height; t+=0.01; mTimer++;
      if(mTimer>80){METEORS.push({x:Math.random(),y:Math.random()*0.4,vx:0.003+Math.random()*0.006,vy:0.002+Math.random()*0.004,life:0,maxLife:40+Math.random()*30,color:['#fff','#E87722','#4FC3F7','#a78bfa'][Math.floor(Math.random()*4)]});mTimer=0;}
      const bg=ctx.createLinearGradient(0,0,W,H);
      bg.addColorStop(0,'#03040f');bg.addColorStop(0.4,'#070b20');bg.addColorStop(1,'#040810');
      ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
      [{x:0.1,y:0.2,r:0.4,c:'#1a0a40',a:0.6},{x:0.8,y:0.7,r:0.35,c:'#0a2040',a:0.5},{x:0.5,y:0.05,r:0.3,c:'#1a0808',a:0.4},{x:0.92,y:0.15,r:0.25,c:'#001520',a:0.55}].forEach(n=>{
        const pulse=1+Math.sin(t*0.25+n.x*8)*0.12;
        const g=ctx.createRadialGradient(n.x*W,n.y*H,0,n.x*W,n.y*H,n.r*W*pulse);
        g.addColorStop(0,n.c+'ee');g.addColorStop(1,'transparent');
        ctx.globalAlpha=n.a;ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1;
      });
      const acc=accentRef.current;
      const gAcc=ctx.createRadialGradient(W*0.5,H*0.3,0,W*0.5,H*0.3,W*0.6);
      gAcc.addColorStop(0,acc+'18');gAcc.addColorStop(1,'transparent');
      ctx.fillStyle=gAcc;ctx.fillRect(0,0,W,H);
      ctx.save();ctx.globalAlpha=0.07;ctx.strokeStyle='#4FC3F7';ctx.lineWidth=0.6;
      const GRID=14;const scroll=(t*0.012)%(1/GRID);
      for(let i=0;i<=GRID;i++){const yr=(i/GRID+scroll)%1;const persp=Math.pow(yr,2.2);const yp=H*0.55+persp*H*0.45;const xs=persp*W*0.85;ctx.beginPath();ctx.moveTo(W/2-xs,yp);ctx.lineTo(W/2+xs,yp);ctx.stroke();}
      for(let i=-GRID/2;i<=GRID/2;i++){ctx.beginPath();ctx.moveTo(W/2+i*(W/GRID)*0.5,H*0.55);ctx.lineTo(W/2+i*W*0.3,H);ctx.stroke();}
      ctx.restore();
      for(let ring=1;ring<=5;ring++){const r=(ring/5)*Math.min(W,H)*0.3;const rot=t*(0.15+ring*0.04)*(ring%2?1:-1);for(let s=0;s<60;s++){const a1=rot+(s/60)*Math.PI*2;const a2=rot+((s+0.7)/60)*Math.PI*2;ctx.beginPath();ctx.arc(W*0.5,H*0.35,r,a1,a2);ctx.strokeStyle=`rgba(79,195,247,${0.025+Math.abs(Math.sin(t*0.5+ring))*0.03})`;ctx.lineWidth=1;ctx.stroke();}}
      HEXAGONS.forEach(h=>{h.x+=h.vx;h.y+=h.vy;h.rot+=h.rotSpeed;if(h.x<-0.1)h.x=1.1;if(h.x>1.1)h.x=-0.1;if(h.y<-0.1)h.y=1.1;if(h.y>1.1)h.y=-0.1;ctx.save();ctx.globalAlpha=h.opacity*(0.7+0.3*Math.sin(t*0.5+h.x*5));ctx.strokeStyle=acc;ctx.lineWidth=0.8;drawHex(h.x*W,h.y*H,h.size,h.rot);ctx.stroke();ctx.restore();});
      STARS.forEach(s=>{const tw=0.3+0.7*Math.abs(Math.sin(t*0.7+s.phase));ctx.beginPath();ctx.arc(s.x*W,s.y*H,s.r,0,Math.PI*2);ctx.fillStyle=s.color;ctx.globalAlpha=0.6*tw;ctx.fill();ctx.globalAlpha=1;if(s.r>1.3){const cross=s.r*6*tw;ctx.strokeStyle=s.color;ctx.lineWidth=0.4;ctx.globalAlpha=0.3*tw;ctx.beginPath();ctx.moveTo(s.x*W-cross,s.y*H);ctx.lineTo(s.x*W+cross,s.y*H);ctx.moveTo(s.x*W,s.y*H-cross);ctx.lineTo(s.x*W,s.y*H+cross);ctx.stroke();ctx.globalAlpha=1;}});
      ORBS.forEach(o=>{o.x+=o.vx;o.y+=o.vy;o.life+=o.lifeSpeed;if(o.x<0)o.x=1;if(o.x>1)o.x=0;if(o.y<0)o.y=1;if(o.y>1)o.y=0;const pulse=0.4+0.6*Math.abs(Math.sin(o.life));const hsl=`hsla(${o.hue},80%,65%,`;const halo=ctx.createRadialGradient(o.x*W,o.y*H,0,o.x*W,o.y*H,o.r*10);halo.addColorStop(0,hsl+`${0.5*pulse})`);halo.addColorStop(1,'transparent');ctx.fillStyle=halo;ctx.beginPath();ctx.arc(o.x*W,o.y*H,o.r*10,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(o.x*W,o.y*H,o.r,0,Math.PI*2);ctx.fillStyle=`hsla(${o.hue},80%,80%,${pulse})`;ctx.fill();});
      for(let i=0;i<ORBS.length;i++){for(let j=i+1;j<ORBS.length;j++){const dx=(ORBS[i].x-ORBS[j].x)*W;const dy=(ORBS[i].y-ORBS[j].y)*H;const dist=Math.sqrt(dx*dx+dy*dy);if(dist<110){ctx.beginPath();ctx.globalAlpha=0.15*(1-dist/110);ctx.strokeStyle='#4FC3F7';ctx.lineWidth=0.4;ctx.moveTo(ORBS[i].x*W,ORBS[i].y*H);ctx.lineTo(ORBS[j].x*W,ORBS[j].y*H);ctx.stroke();ctx.globalAlpha=1;}}}
      for(let m=METEORS.length-1;m>=0;m--){const meteor=METEORS[m];meteor.x+=meteor.vx/W*100;meteor.y+=meteor.vy/H*100;meteor.life++;if(meteor.life>meteor.maxLife||meteor.x>1.2||meteor.y>1.2){METEORS.splice(m,1);continue;}const alpha=(1-meteor.life/meteor.maxLife)*0.8;const tLen=80;const grad=ctx.createLinearGradient((meteor.x-meteor.vx*tLen)*W,(meteor.y-meteor.vy*tLen)*H,meteor.x*W,meteor.y*H);grad.addColorStop(0,'transparent');grad.addColorStop(1,meteor.color);ctx.beginPath();ctx.moveTo((meteor.x-meteor.vx*tLen)*W,(meteor.y-meteor.vy*tLen)*H);ctx.lineTo(meteor.x*W,meteor.y*H);ctx.strokeStyle=grad;ctx.lineWidth=1.5;ctx.globalAlpha=alpha;ctx.stroke();ctx.globalAlpha=1;ctx.beginPath();ctx.arc(meteor.x*W,meteor.y*H,2,0,Math.PI*2);ctx.fillStyle='#fff';ctx.globalAlpha=alpha;ctx.fill();ctx.globalAlpha=1;}
      animId=requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display:'block' }} />;
};

// Hook inView
function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE SECTION
// ═══════════════════════════════════════════════════════════════════════════════
const ServiceSection: React.FC<{
  service: typeof SERVICES[0];
  index: number;
  isReversed?: boolean;
  accentColor: string;
}> = ({ service, index, isReversed, accentColor }) => {
  const { ref, inView } = useInView();
  const [isExpanded, setIsExpanded] = useState(false);
  const icon = iconMap[service.iconName] || <Zap />;

  return (
    <div ref={ref} className="py-8 border-b border-white/5 last:border-0"
      style={{ animation: inView ? `slideReveal 0.8s ${index * 0.06}s both` : 'none' }}>

      <div onClick={() => setIsExpanded(!isExpanded)}
        className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-14 p-8 lg:p-12 rounded-[3rem] cursor-pointer group relative overflow-hidden transition-all duration-500`}
        style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.07)' }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
          (e.currentTarget as HTMLElement).style.border = `1px solid ${accentColor}50`;
          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 80px ${accentColor}12`;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.035)';
          (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.07)';
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}>

        {/* Glow coin */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle, ${accentColor}10, transparent)`, transform: 'translate(30%,-30%)' }} />

        {/* Numéro fantôme */}
        <div className="absolute bottom-3 right-6 text-[90px] font-black leading-none select-none pointer-events-none text-white" style={{ opacity: 0.03 }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Texte */}
        <div className="flex-1 w-full relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-110"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}70)` }}>
              {React.cloneElement(icon as React.ReactElement, { size: 26 })}
            </div>
            <div>
              <div className="text-[8px] font-black uppercase tracking-[0.4em] mb-0.5" style={{ color: accentColor }}>
                Expertise #{String(index + 1).padStart(2, '0')}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Certifié Imani-Tech</span>
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter leading-none transition-colors duration-300 group-hover:text-brand-orange">
            {service.title}
          </h2>
          <p className="text-sm text-white/40 mb-7 leading-relaxed font-bold max-w-xl">{service.description}</p>

          <div className="flex flex-wrap gap-2 mb-7">
            {service.features.map((f, i) => (
              <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tight text-white/55 border border-white/10"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                <CheckCircle size={10} style={{ color: accentColor }} /> {f}
              </div>
            ))}
          </div>

          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all" style={{ color: accentColor }}>
            {isExpanded ? <><span>▲</span> Masquer</> : <><Info size={13} /> Dossier technique</>}
          </button>
        </div>

        {/* Image dynamique dédiée */}
        <div className="flex-1 w-full relative z-10">
          <ServiceImage iconName={service.iconName} color={accentColor} title={service.title} />
        </div>
      </div>

      {/* Section développée */}
      {isExpanded && (
        <div className="mt-5 p-8 lg:p-12 rounded-[2.5rem] relative overflow-hidden"
          style={{ background: 'rgba(8,10,28,0.97)', border: `2px solid ${accentColor}35`, animation: 'expandIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both' }}>
          <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
            {[
              { icon: <Cpu size={15} />, title: 'Architecture Technique', content: service.details?.architecture },
              { icon: <ShieldCheck size={15} />, title: 'Matériel & Standards', content: service.details?.hardware },
              { icon: <TrendingUp size={15} />, title: 'Impact Business PME', content: service.details?.impact },
            ].map((col, i) => (
              <div key={i}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: `${accentColor}20`, color: accentColor }}>{col.icon}</div>
                  <h4 className="text-[8px] font-black uppercase tracking-[0.3em] text-white/35">{col.title}</h4>
                </div>
                <p className="text-xs font-bold leading-relaxed text-white/45 border-l-2 pl-4 py-2 mb-5" style={{ borderColor: accentColor + '50' }}>{col.content}</p>
                {i === 2 && (
                  <Link to={AppRoute.Audit}
                    className="block w-full text-white py-4 rounded-2xl text-center font-black text-[9px] uppercase tracking-widest shadow-xl transition-all hover:opacity-80 mt-4"
                    style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}70)` }}>
                    Audit gratuit pour ce service →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════════════
const ServicesPage: React.FC = () => {
  const [activeAccent, setActiveAccent] = useState('#E87722');
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.3 });

  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideReveal { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes expandIn { from{opacity:0;transform:scaleY(0.92) translateY(-10px)} to{opacity:1;transform:scaleY(1) translateY(0)} }
        @keyframes heroTitle { from{opacity:0;transform:translateY(50px) skewY(2deg)} to{opacity:1;transform:translateY(0) skewY(0)} }
        @keyframes heroPill { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
        .hero-t { animation: heroTitle 1.1s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
        .hero-p { animation: heroPill 0.8s 0.1s both; }
        .hero-sub { animation: heroPill 0.8s 0.4s both; }
        .hero-cta { animation: heroPill 0.8s 0.6s both; }
        .float-y { animation: floatY 4s ease-in-out infinite; }
        .glow-pulse { animation: glowPulse 2s ease-in-out infinite; }
      `}</style>

      <div className="min-h-screen" style={{ background: '#03040f' }}>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-white/5" style={{ minHeight: '100vh' }}>
          <CosmicCanvas accent={activeAccent} />
          {/* Curseur lumineux */}
          <div className="absolute pointer-events-none z-10 transition-all duration-700"
            style={{ left: `${mousePos.x*100}%`, top: `${mousePos.y*100}%`, width:400, height:400, transform:'translate(-50%,-50%)', background:`radial-gradient(circle, ${activeAccent}15, transparent)`, borderRadius:'50%' }} />

          <div className="relative z-20 max-w-7xl mx-auto px-4 pt-36 pb-24">
            <div className="hero-p inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 mb-10">
              <Zap size={11} className="text-brand-orange animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-orange">Référentiel Technique 2025 — Cameroun</span>
            </div>
            <h1 className="hero-t text-6xl sm:text-8xl lg:text-[110px] font-black uppercase tracking-tighter leading-[0.85] text-white mb-8">
              Nos <span className="text-brand-orange">Infrastructures</span><br /><span className="text-white/10">& Expertises.</span>
            </h1>
            <p className="hero-sub text-lg text-white/35 max-w-2xl font-bold leading-relaxed mb-12">
              Cliquez sur chaque service pour accéder au dossier technique complet et comprendre comment nous sécurisons votre croissance.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row gap-4">
              <Link to={AppRoute.Audit} className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest text-white shadow-2xl transition-all hover:opacity-80"
                style={{ background: 'linear-gradient(135deg, #E87722, #E87722aa)' }}>
                <Target size={16} /> Lancer un Audit Global
              </Link>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest text-white border border-white/10 hover:border-brand-orange/50 transition-all"
                style={{ background: 'rgba(255,255,255,0.05)' }}>
                Contacter un Expert →
              </a>
            </div>
            <div className="flex flex-wrap gap-5 mt-14 float-y">
              {[{val:'99.5%',label:'Disponibilité SLA'},{val:'48h',label:'Intervention max'},{val:'5 ans',label:'D\'expertise'},{val:'100%',label:'Certifié local'}].map((s,i)=>(
                <div key={i} className="px-5 py-3 rounded-2xl border border-white/8 glow-pulse" style={{ background:'rgba(255,255,255,0.04)', animationDelay:`${i*0.3}s` }}>
                  <div className="text-xl font-black text-white tracking-tighter">{s.val}</div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-white/30 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-20" style={{ background:'linear-gradient(transparent, #03040f)' }} />
        </section>

        {/* ── SERVICES ──────────────────────────────────────────────── */}
        <section className="relative py-16" style={{ background: '#03040f' }}>
          <div className="absolute inset-0 opacity-30 pointer-events-none"><CosmicCanvas accent={activeAccent} /></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="space-y-4">
              {SERVICES.map((s, idx) => (
                <div key={s.id} onMouseEnter={() => setActiveAccent(SERVICE_COLORS[idx % SERVICE_COLORS.length])}>
                  <ServiceSection service={s} index={idx} isReversed={idx % 2 !== 0} accentColor={SERVICE_COLORS[idx % SERVICE_COLORS.length]} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GARANTIES ─────────────────────────────────────────────── */}
        <section className="py-20 relative overflow-hidden" style={{ background:'rgba(255,255,255,0.02)', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon:<ShieldCheck size={26}/>, title:'Garantie Matérielle', desc:'Remplacement immédiat sous 48h sur site.', color:'#0F766E' },
                { icon:<Wifi size={26}/>, title:'SLA Disponibilité', desc:'Engagement contractuel 99.5% uptime réseau.', color:'#2563EB' },
                { icon:<Rocket size={26}/>, title:'Évolution Modulaire', desc:'Infrastructures conçues pour grandir avec vous.', color:'#E87722' },
              ].map((g,i)=>(
                <div key={i} className="p-8 rounded-[2.5rem] border border-white/5 text-center group hover:border-white/15 transition-all duration-300"
                  style={{ background:'rgba(255,255,255,0.03)' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.boxShadow=`0 0 40px ${g.color}20`;}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.boxShadow='none';}}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110" style={{ background:`${g.color}20`, color:g.color }}>{g.icon}</div>
                  <h4 className="text-base font-black text-white uppercase tracking-tighter mb-2">{g.title}</h4>
                  <p className="text-xs font-bold text-white/30 leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ─────────────────────────────────────────────── */}
        <section className="py-28 relative overflow-hidden">
          <CosmicCanvas accent="#E87722" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-7xl font-black mb-10 uppercase tracking-tighter leading-none text-white">
              Votre business mérite<br />une <span className="text-brand-orange">Rigueur Technique</span>.
            </h2>
            <Link to={AppRoute.Audit}
              className="inline-flex items-center gap-3 bg-brand-orange text-white px-14 py-6 rounded-full font-black text-lg uppercase tracking-tight hover:opacity-85 transition-all shadow-2xl"
              style={{ boxShadow:'0 0 60px rgba(232,119,34,0.4)' }}>
              Démarrer mon Diagnostic <ArrowRight size={22} />
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-20 pointer-events-none" style={{ background:'linear-gradient(transparent, #03040f)' }} />
        </section>
      </div>
    </>
  );
};

export default ServicesPage;
