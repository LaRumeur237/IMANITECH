import React, { useState, useEffect, useRef } from 'react';
import {
  Target, Rocket, Globe, ArrowRight, Zap, CheckCircle, Wifi, Layout,
  HardDrive, Camera, Key, BookOpen, ChevronDown, ChevronUp, Cpu,
  ShieldCheck, TrendingUp, Info, Phone, Shield, X
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

// ═══════════════════════════════════════════════════════════════════════════════
// CANVAS SPATIAL ULTRA-VIVANT
// ═══════════════════════════════════════════════════════════════════════════════
const CosmicCanvas: React.FC<{ accent?: string }> = ({ accent = '#E87722' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const accentRef = useRef(accent);
  useEffect(() => { accentRef.current = accent; }, [accent]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Étoiles
    const STARS = Array.from({ length: 220 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.8 + 0.2,
      speed: Math.random() * 0.0001 + 0.00003,
      phase: Math.random() * Math.PI * 2,
      color: ['#ffffff', '#a8d8ff', '#ffd4a8', '#d4a8ff'][Math.floor(Math.random() * 4)],
    }));

    // ── Particules orbitales
    const ORBS = Array.from({ length: 55 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0002,
      vy: (Math.random() - 0.5) * 0.0002,
      r: Math.random() * 3 + 1,
      hue: Math.random() * 360,
      life: Math.random() * Math.PI * 2,
      lifeSpeed: 0.008 + Math.random() * 0.015,
    }));

    // ── Météorites (traînées)
    const METEORS: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string }[] = [];
    const spawnMeteor = () => {
      METEORS.push({
        x: Math.random(), y: Math.random() * 0.4,
        vx: 0.003 + Math.random() * 0.006,
        vy: 0.002 + Math.random() * 0.004,
        life: 0, maxLife: 40 + Math.random() * 30,
        color: ['#ffffff', '#E87722', '#4FC3F7', '#a78bfa'][Math.floor(Math.random() * 4)],
      });
    };
    let meteorTimer = 0;

    // ── Vortex central
    const VORTEX_RINGS = 5;

    // ── Hexagones flottants (style circuit)
    const HEXAGONS = Array.from({ length: 8 }, () => ({
      x: Math.random(), y: Math.random(),
      size: 20 + Math.random() * 50,
      rot: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      opacity: 0.03 + Math.random() * 0.06,
      vx: (Math.random() - 0.5) * 0.0001,
      vy: (Math.random() - 0.5) * 0.0001,
    }));

    const drawHex = (cx: number, cy: number, size: number, rot: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = rot + (i * Math.PI) / 3;
        const px = cx + size * Math.cos(angle);
        const py = cy + size * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      t += 0.01;
      meteorTimer++;
      if (meteorTimer > 80) { spawnMeteor(); meteorTimer = 0; }

      // ── Fond dégradé profond
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, '#03040f');
      bg.addColorStop(0.4, '#070b20');
      bg.addColorStop(1, '#040810');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── Nébuleuses pulsantes
      const nebulae = [
        { x: 0.1,  y: 0.2,  r: 0.4, c: '#1a0a40', a: 0.6 },
        { x: 0.8,  y: 0.7,  r: 0.35, c: '#0a2040', a: 0.5 },
        { x: 0.5,  y: 0.05, r: 0.3, c: '#1a0808', a: 0.4 },
        { x: 0.92, y: 0.15, r: 0.25, c: '#001520', a: 0.55 },
        { x: 0.3,  y: 0.85, r: 0.28, c: '#0a0a30', a: 0.45 },
      ];
      nebulae.forEach(n => {
        const pulse = 1 + Math.sin(t * 0.25 + n.x * 8) * 0.12;
        const g = ctx.createRadialGradient(n.x*W, n.y*H, 0, n.x*W, n.y*H, n.r*W*pulse);
        g.addColorStop(0, n.c + 'ee'); g.addColorStop(1, 'transparent');
        ctx.globalAlpha = n.a; ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1;
      });

      // ── Accent lumineux (couleur du service actif)
      const acc = accentRef.current;
      const gAcc = ctx.createRadialGradient(W*0.5, H*0.3, 0, W*0.5, H*0.3, W*0.6);
      gAcc.addColorStop(0, acc + '18'); gAcc.addColorStop(1, 'transparent');
      ctx.fillStyle = gAcc; ctx.fillRect(0, 0, W, H);

      // ── Grille perspective animée
      ctx.save(); ctx.globalAlpha = 0.07; ctx.strokeStyle = '#4FC3F7'; ctx.lineWidth = 0.6;
      const GRID = 14;
      const scroll = (t * 0.012) % (1 / GRID);
      for (let i = 0; i <= GRID; i++) {
        const yr = (i / GRID + scroll) % 1;
        const persp = Math.pow(yr, 2.2);
        const yp = H * 0.55 + persp * H * 0.45;
        const xs = persp * W * 0.85;
        ctx.beginPath(); ctx.moveTo(W/2 - xs, yp); ctx.lineTo(W/2 + xs, yp); ctx.stroke();
      }
      for (let i = -GRID/2; i <= GRID/2; i++) {
        ctx.beginPath();
        ctx.moveTo(W/2 + i*(W/GRID)*0.5, H*0.55);
        ctx.lineTo(W/2 + i*W*0.3, H);
        ctx.stroke();
      }
      ctx.restore();

      // ── Vortex central tournant
      ctx.save();
      for (let ring = 1; ring <= VORTEX_RINGS; ring++) {
        const r = (ring / VORTEX_RINGS) * Math.min(W, H) * 0.3;
        const rot = t * (0.15 + ring * 0.04) * (ring % 2 ? 1 : -1);
        const seg = 60;
        for (let s = 0; s < seg; s++) {
          const a1 = rot + (s / seg) * Math.PI * 2;
          const a2 = rot + ((s + 0.7) / seg) * Math.PI * 2;
          const alpha = 0.025 + Math.abs(Math.sin(t * 0.5 + ring)) * 0.03;
          ctx.beginPath();
          ctx.arc(W * 0.5, H * 0.35, r, a1, a2);
          ctx.strokeStyle = `rgba(79,195,247,${alpha})`;
          ctx.lineWidth = 1; ctx.stroke();
        }
      }
      ctx.restore();

      // ── Hexagones circuit
      HEXAGONS.forEach(h => {
        h.x += h.vx; h.y += h.vy; h.rot += h.rotSpeed;
        if (h.x < -0.1) h.x = 1.1; if (h.x > 1.1) h.x = -0.1;
        if (h.y < -0.1) h.y = 1.1; if (h.y > 1.1) h.y = -0.1;
        ctx.save();
        ctx.globalAlpha = h.opacity * (0.7 + 0.3 * Math.sin(t * 0.5 + h.x * 5));
        ctx.strokeStyle = acc; ctx.lineWidth = 0.8;
        drawHex(h.x * W, h.y * H, h.size, h.rot); ctx.stroke();
        ctx.restore();
      });

      // ── Étoiles scintillantes
      STARS.forEach(s => {
        const tw = 0.3 + 0.7 * Math.abs(Math.sin(t * 0.7 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color; ctx.globalAlpha = 0.6 * tw; ctx.fill(); ctx.globalAlpha = 1;
        if (s.r > 1.3) {
          const cross = s.r * 6 * tw;
          ctx.strokeStyle = s.color; ctx.lineWidth = 0.4; ctx.globalAlpha = 0.3 * tw;
          ctx.beginPath();
          ctx.moveTo(s.x*W - cross, s.y*H); ctx.lineTo(s.x*W + cross, s.y*H);
          ctx.moveTo(s.x*W, s.y*H - cross); ctx.lineTo(s.x*W, s.y*H + cross);
          ctx.stroke(); ctx.globalAlpha = 1;
        }
      });

      // ── Orbes colorées flottantes + connexions
      ORBS.forEach(o => {
        o.x += o.vx; o.y += o.vy; o.life += o.lifeSpeed;
        if (o.x < 0) o.x = 1; if (o.x > 1) o.x = 0;
        if (o.y < 0) o.y = 1; if (o.y > 1) o.y = 0;
        const pulse = 0.4 + 0.6 * Math.abs(Math.sin(o.life));
        const hsl = `hsla(${o.hue},80%,65%,`;
        const halo = ctx.createRadialGradient(o.x*W, o.y*H, 0, o.x*W, o.y*H, o.r * 10);
        halo.addColorStop(0, hsl + `${0.5 * pulse})`);
        halo.addColorStop(1, 'transparent');
        ctx.fillStyle = halo;
        ctx.beginPath(); ctx.arc(o.x*W, o.y*H, o.r*10, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(o.x*W, o.y*H, o.r, 0, Math.PI*2);
        ctx.fillStyle = `hsla(${o.hue},80%,80%,${pulse})`; ctx.fill();
      });

      // Connexions entre orbes proches
      for (let i = 0; i < ORBS.length; i++) {
        for (let j = i+1; j < ORBS.length; j++) {
          const dx = (ORBS[i].x - ORBS[j].x) * W;
          const dy = (ORBS[i].y - ORBS[j].y) * H;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.globalAlpha = 0.15 * (1 - dist/110);
            ctx.strokeStyle = '#4FC3F7'; ctx.lineWidth = 0.4;
            ctx.moveTo(ORBS[i].x*W, ORBS[i].y*H);
            ctx.lineTo(ORBS[j].x*W, ORBS[j].y*H);
            ctx.stroke(); ctx.globalAlpha = 1;
          }
        }
      }

      // ── Météorites avec traîné
      for (let m = METEORS.length - 1; m >= 0; m--) {
        const meteor = METEORS[m];
        meteor.x += meteor.vx / W * 100;
        meteor.y += meteor.vy / H * 100;
        meteor.life++;
        if (meteor.life > meteor.maxLife || meteor.x > 1.2 || meteor.y > 1.2) {
          METEORS.splice(m, 1); continue;
        }
        const alpha = (1 - meteor.life / meteor.maxLife) * 0.8;
        const tailLen = 80;
        const grad = ctx.createLinearGradient(
          (meteor.x - meteor.vx * tailLen) * W, (meteor.y - meteor.vy * tailLen) * H,
          meteor.x * W, meteor.y * H
        );
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, meteor.color);
        ctx.beginPath();
        ctx.moveTo((meteor.x - meteor.vx * tailLen) * W, (meteor.y - meteor.vy * tailLen) * H);
        ctx.lineTo(meteor.x * W, meteor.y * H);
        ctx.strokeStyle = grad; ctx.lineWidth = 1.5; ctx.globalAlpha = alpha;
        ctx.stroke(); ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.arc(meteor.x * W, meteor.y * H, 2, 0, Math.PI*2);
        ctx.fillStyle = '#ffffff'; ctx.globalAlpha = alpha; ctx.fill(); ctx.globalAlpha = 1;
      }

      // ── Scan line pulsante
      const scanY = ((t * 0.035) % 1) * H;
      const sg = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 80);
      sg.addColorStop(0, 'transparent');
      sg.addColorStop(0.5, `${acc}08`);
      sg.addColorStop(1, 'transparent');
      ctx.fillStyle = sg; ctx.fillRect(0, scanY - 80, W, 160);

      // ── Data streams (lignes verticales qui descendent)
      for (let d = 0; d < 6; d++) {
        const dx = (d / 6 + 0.08) * W;
        const dy = ((t * 0.04 + d * 0.17) % 1) * H;
        const dg = ctx.createLinearGradient(0, dy - 60, 0, dy + 60);
        dg.addColorStop(0, 'transparent');
        dg.addColorStop(0.5, `${acc}12`);
        dg.addColorStop(1, 'transparent');
        ctx.fillStyle = dg; ctx.fillRect(dx - 0.5, dy - 60, 1, 120);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: 'block' }} />;
};

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
    <div ref={ref} className="py-10 border-b border-white/5 last:border-0"
      style={{ animation: inView ? `slideReveal 0.8s ${index * 0.08}s both` : 'none' }}>

      {/* Carte principale */}
      <div onClick={() => setIsExpanded(!isExpanded)}
        className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16 p-8 lg:p-12 rounded-[3rem] cursor-pointer group relative overflow-hidden transition-all duration-500`}
        style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(255,255,255,0.07)` }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.background = `rgba(255,255,255,0.07)`;
          (e.currentTarget as HTMLElement).style.border = `1px solid ${accentColor}40`;
          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 60px ${accentColor}15`;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
          (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.07)';
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}>

        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-0"
          style={{ background: `radial-gradient(circle, ${accentColor}12, transparent)`, transform: 'translate(30%, -30%)' }} />

        {/* Numéro fantôme */}
        <div className="absolute bottom-4 right-8 text-[100px] font-black leading-none select-none pointer-events-none opacity-[0.04] text-white">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Contenu texte */}
        <div className="flex-1 w-full relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 shadow-lg"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}80)` }}>
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

          <h2 className="text-3xl md:text-5xl font-black text-white mb-5 uppercase tracking-tighter leading-none transition-colors duration-300 group-hover:text-brand-orange">
            {service.title}
          </h2>

          <p className="text-base text-white/45 mb-8 leading-relaxed font-bold max-w-xl">
            {service.description}
          </p>

          {/* Features pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {service.features.map((f, i) => (
              <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tight text-white/60 border border-white/10 transition-all hover:border-white/30"
                style={{ background: 'rgba(255,255,255,0.05)' }}>
                <CheckCircle size={11} style={{ color: accentColor }} />
                {f}
              </div>
            ))}
          </div>

          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all"
            style={{ color: accentColor }}>
            {isExpanded
              ? <><ChevronUp size={14} /> Masquer les détails</>
              : <><Info size={14} /> Explorer le dossier technique</>}
          </button>
        </div>

        {/* Image */}
        <div className="flex-1 w-full relative z-10">
          <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-700 shadow-2xl"
            style={{ border: `1px solid ${accentColor}30` }}>
            <img loading="lazy"
              src={`https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&seed=${service.id}`}
              alt={service.title}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.4) saturate(1.2)' }}
            />
            {/* Overlay coloré */}
            <div className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, ${accentColor}30, transparent 60%)` }} />
            {/* Scan effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-full h-0.5 opacity-30 animate-scan" style={{ background: accentColor }} />
            </div>
            {/* Label */}
            <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-white"
              style={{ background: `${accentColor}cc` }}>
              {service.title}
            </div>
          </div>
        </div>
      </div>

      {/* Section développée */}
      {isExpanded && (
        <div className="mt-6 p-8 lg:p-14 rounded-[3rem] relative overflow-hidden"
          style={{ background: 'rgba(10,12,30,0.95)', border: `2px solid ${accentColor}40`, animation: 'expandIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both' }}>

          {/* Accent glow */}
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${accentColor}10, transparent)` }} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">

            {/* Architecture */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${accentColor}20` }}>
                  <Cpu size={16} style={{ color: accentColor }} />
                </div>
                <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Architecture Technique</h4>
              </div>
              <p className="text-sm font-bold leading-relaxed text-white/50 border-l-2 pl-5 py-2 mb-5" style={{ borderColor: accentColor + '60' }}>
                {service.details?.architecture}
              </p>
              <div className="p-5 rounded-2xl space-y-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[8px] font-black uppercase tracking-widest mb-2" style={{ color: accentColor }}>Protocoles de sécurité</p>
                <p className="text-[10px] font-bold text-white/40 leading-relaxed">Chiffrement AES-256, VPN tunneling, segmentation logique des flux réseau et authentification multi-facteurs.</p>
              </div>
            </div>

            {/* Matériel */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${accentColor}20` }}>
                  <ShieldCheck size={16} style={{ color: accentColor }} />
                </div>
                <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Matériel & Standards</h4>
              </div>
              <p className="text-sm font-bold leading-relaxed text-white/50 border-l-2 pl-5 py-2 mb-5" style={{ borderColor: accentColor + '60' }}>
                {service.details?.hardware}
              </p>
              <div className="flex flex-wrap gap-2">
                {['Tier-1 Brands', 'Certifié CE', 'Norme ISO', 'Garantie 2 ans'].map(tag => (
                  <span key={tag} className="text-[8px] font-black px-3 py-1.5 rounded-xl uppercase tracking-tight text-white/60 border border-white/10"
                    style={{ background: 'rgba(255,255,255,0.05)' }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Impact */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${accentColor}20` }}>
                  <TrendingUp size={16} style={{ color: accentColor }} />
                </div>
                <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Impact Business PME</h4>
              </div>
              <p className="text-sm font-bold leading-relaxed text-white/50 border-l-2 pl-5 py-2 mb-6" style={{ borderColor: accentColor + '60' }}>
                {service.details?.impact}
              </p>
              <Link to={AppRoute.Audit}
                className="block w-full text-white py-4 rounded-2xl text-center font-black text-[9px] uppercase tracking-widest shadow-xl transition-all hover:opacity-80"
                style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}80)` }}>
                Audit gratuit pour ce service →
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-30">
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white">Cahier des charges conforme aux normes internationales</p>
            <div className="flex gap-8">
              <span className="text-[8px] font-black uppercase text-white">Intervention 237</span>
              <span className="text-[8px] font-black uppercase text-white">Support H24</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
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
// PAGE PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════════════
const ServicesPage: React.FC = () => {
  const [activeAccent, setActiveAccent] = useState('#E87722');
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.3 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideReveal {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes expandIn {
          from { opacity: 0; transform: scaleY(0.92) translateY(-10px); }
          to   { opacity: 1; transform: scaleY(1) translateY(0); }
        }
        @keyframes heroTitle {
          from { opacity: 0; transform: translateY(50px) skewY(2deg); }
          to   { opacity: 1; transform: translateY(0) skewY(0); }
        }
        @keyframes heroPill {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scan {
          from { top: -5%; }
          to   { top: 105%; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
        .hero-t { animation: heroTitle 1.1s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
        .hero-p { animation: heroPill 0.8s 0.1s both; }
        .hero-sub { animation: heroPill 0.8s 0.4s both; }
        .hero-cta { animation: heroPill 0.8s 0.6s both; }
        .animate-scan { animation: scan 3s linear infinite; position: absolute; left: 0; width: 100%; }
        .float-y { animation: floatY 4s ease-in-out infinite; }
        .glow-pulse { animation: glowPulse 2s ease-in-out infinite; }
      `}</style>

      <div className="min-h-screen" style={{ background: '#03040f' }}>

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-white/5" style={{ minHeight: '100vh' }}>
          <CosmicCanvas accent={activeAccent} />

          {/* Curseur lumineux qui suit la souris */}
          <div className="absolute pointer-events-none z-10 transition-all duration-700"
            style={{
              left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`,
              width: 400, height: 400,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, ${activeAccent}15, transparent)`,
              borderRadius: '50%',
            }} />

          <div className="relative z-20 max-w-7xl mx-auto px-4 pt-36 pb-24">

            <div className="hero-p inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 mb-10">
              <Zap size={11} className="text-brand-orange animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-orange">Référentiel Technique 2025 — Cameroun</span>
            </div>

            <h1 className="hero-t text-6xl sm:text-8xl lg:text-[110px] font-black uppercase tracking-tighter leading-[0.85] text-white mb-8">
              Nos <span className="text-brand-orange">Infrastructures</span><br />
              <span className="text-white/10">& Expertises.</span>
            </h1>

            <p className="hero-sub text-lg sm:text-xl text-white/35 max-w-2xl font-bold leading-relaxed mb-12">
              Cliquez sur chaque service pour accéder au dossier technique complet et comprendre comment nous sécurisons votre croissance.
            </p>

            <div className="hero-cta flex flex-col sm:flex-row gap-4">
              <Link to={AppRoute.Audit}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest text-white shadow-2xl transition-all hover:opacity-80"
                style={{ background: 'linear-gradient(135deg, #E87722, #E87722aa)' }}>
                <Target size={16} /> Lancer un Audit Global
              </Link>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest text-white border border-white/10 hover:border-brand-orange/50 transition-all"
                style={{ background: 'rgba(255,255,255,0.05)' }}>
                Contacter un Expert →
              </a>
            </div>

            {/* Stats flottantes */}
            <div className="flex flex-wrap gap-6 mt-16 float-y">
              {[
                { val: '99.5%', label: 'Disponibilité SLA' },
                { val: '48h', label: 'Intervention max' },
                { val: '5 ans', label: 'D\'expertise terrain' },
                { val: '100%', label: 'Certifié local' },
              ].map((s, i) => (
                <div key={i} className="px-5 py-3 rounded-2xl border border-white/8 glow-pulse"
                  style={{ background: 'rgba(255,255,255,0.04)', animationDelay: `${i * 0.3}s` }}>
                  <div className="text-xl font-black text-white tracking-tighter">{s.val}</div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-white/30 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient bas */}
          <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-20"
            style={{ background: 'linear-gradient(transparent, #03040f)' }} />
        </section>

        {/* ── LISTE DES SERVICES ────────────────────────────────────────── */}
        <section className="relative py-20" style={{ background: '#03040f' }}>
          {/* Fond subtil qui continue */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <CosmicCanvas accent={activeAccent} />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="space-y-6">
              {SERVICES.map((s, idx) => (
                <div key={s.id} onMouseEnter={() => setActiveAccent(SERVICE_COLORS[idx % SERVICE_COLORS.length])}>
                  <ServiceSection
                    service={s}
                    index={idx}
                    isReversed={idx % 2 !== 0}
                    accentColor={SERVICE_COLORS[idx % SERVICE_COLORS.length]}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GARANTIES ────────────────────────────────────────────────── */}
        <section className="py-24 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <ShieldCheck size={28} />, title: 'Garantie Matérielle', desc: 'Remplacement immédiat des composants défectueux sous 48h sur site.', color: '#0F766E' },
                { icon: <Wifi size={28} />, title: 'SLA de Disponibilité', desc: 'Engagement contractuel sur un taux de disponibilité réseau de 99.5%.', color: '#2563EB' },
                { icon: <Rocket size={28} />, title: 'Évolution Modulaire', desc: 'Toutes nos infrastructures sont conçues pour évoluer avec votre croissance.', color: '#E87722' },
              ].map((g, i) => (
                <div key={i} className="p-8 rounded-[2.5rem] border border-white/6 text-center group hover:border-white/15 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${g.color}20`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 transition-transform group-hover:scale-110"
                    style={{ background: `${g.color}20`, color: g.color }}>
                    {g.icon}
                  </div>
                  <h4 className="text-lg font-black text-white uppercase tracking-tighter mb-3">{g.title}</h4>
                  <p className="text-xs font-bold text-white/35 leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ─────────────────────────────────────────────────── */}
        <section className="py-32 relative overflow-hidden">
          <CosmicCanvas accent="#E87722" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/15 border border-brand-orange/25 text-brand-orange text-[9px] font-black uppercase tracking-[0.3em] mb-10">
              <ShieldCheck size={11} /> Expertise certifiée — Imani-Tech
            </div>
            <h2 className="text-4xl md:text-7xl font-black mb-10 uppercase tracking-tighter leading-none text-white">
              Votre business mérite<br />une <span className="text-brand-orange">Rigueur Technique</span>.
            </h2>
            <p className="text-white/30 mb-12 font-bold text-sm uppercase tracking-wide">
              Diagnostic complet, recommandations personnalisées, zéro engagement.
            </p>
            <Link to={AppRoute.Audit}
              className="inline-flex items-center gap-3 bg-brand-orange text-white px-14 py-6 rounded-full font-black text-lg uppercase tracking-tight hover:opacity-85 transition-all shadow-2xl"
              style={{ boxShadow: '0 0 60px rgba(232,119,34,0.4)' }}>
              Démarrer mon Diagnostic <ArrowRight size={22} />
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-20 pointer-events-none" style={{ background: 'linear-gradient(transparent, #03040f)' }} />
        </section>
      </div>
    </>
  );
};

export default ServicesPage;
