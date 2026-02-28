import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle, ShieldCheck, Zap, ArrowRight, Loader2,
  Globe, Mail, AlertCircle, Target, Activity, Users, Clock
} from 'lucide-react';
import { generateAuditSummary } from '../services/geminiService';
import { SITE_NAME, WHATSAPP_LINK, OFFICIAL_EMAIL } from '../data';

// ═══════════════════════════════════════════════════════════════
// CANVAS COSMIQUE — même style que ServicesPage
// ═══════════════════════════════════════════════════════════════
const CosmicBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let animId: number; let t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    const STARS = Array.from({ length: 180 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.7 + 0.2,
      phase: Math.random() * Math.PI * 2,
      color: ['#ffffff','#a8d8ff','#ffd4a8','#d4a8ff'][Math.floor(Math.random() * 4)],
    }));
    const ORBS = Array.from({ length: 45 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00017,
      vy: (Math.random() - 0.5) * 0.00017,
      r: Math.random() * 2.8 + 1,
      hue: Math.random() * 360,
      life: Math.random() * Math.PI * 2,
      lifeSpeed: 0.011 + Math.random() * 0.013,
    }));
    const METEORS: any[] = []; let mTimer = 0;
    const HEXS = Array.from({ length: 7 }, () => ({
      x: Math.random(), y: Math.random(), size: 22 + Math.random() * 48,
      rot: Math.random() * Math.PI, rotSpeed: (Math.random() - 0.5) * 0.007,
      opacity: 0.04 + Math.random() * 0.05,
      vx: (Math.random() - 0.5) * 0.00009, vy: (Math.random() - 0.5) * 0.00009,
    }));
    const drawHex = (cx: number, cy: number, sz: number, rot: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = rot + (i * Math.PI) / 3;
        i === 0 ? ctx.moveTo(cx + sz * Math.cos(a), cy + sz * Math.sin(a))
                : ctx.lineTo(cx + sz * Math.cos(a), cy + sz * Math.sin(a));
      }
      ctx.closePath();
    };

    const draw = () => {
      const W = canvas.width, H = canvas.height; t += 0.011; mTimer++;
      if (mTimer > 85) {
        METEORS.push({ x: Math.random() * 0.65, y: Math.random() * 0.35, vx: 0.004 + Math.random() * 0.005, vy: 0.002 + Math.random() * 0.003, life: 0, maxLife: 44 + Math.random() * 28, color: ['#fff','#E87722','#60a5fa','#a78bfa'][Math.floor(Math.random() * 4)] });
        mTimer = 0;
      }

      // Fond bleu nuit doux
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, '#0d1520'); bg.addColorStop(0.45, '#111d35'); bg.addColorStop(1, '#0a1525');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      // Nébuleuses
      [{ x: .12, y: .18, r: .42, c: '#2d1f60', a: .5 }, { x: .82, y: .68, r: .32, c: '#1a3560', a: .44 }, { x: .5, y: .02, r: .28, c: '#2d1520', a: .38 }, { x: .88, y: .12, r: .22, c: '#0d2535', a: .5 }, { x: .3, y: .88, r: .26, c: '#1a1a50', a: .4 }].forEach(n => {
        const p = 1 + Math.sin(t * 0.25 + n.x * 8) * 0.11;
        const g = ctx.createRadialGradient(n.x * W, n.y * H, 0, n.x * W, n.y * H, n.r * W * p);
        g.addColorStop(0, n.c + 'dd'); g.addColorStop(1, 'transparent');
        ctx.globalAlpha = n.a; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1;
      });

      // Accent orange subtil centré
      const acc = ctx.createRadialGradient(W * .5, H * .38, 0, W * .5, H * .38, W * .52);
      acc.addColorStop(0, 'rgba(232,119,34,0.09)'); acc.addColorStop(1, 'transparent');
      ctx.fillStyle = acc; ctx.fillRect(0, 0, W, H);

      // Grille perspective
      ctx.save(); ctx.globalAlpha = 0.055; ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 0.5;
      const G = 13; const sc = (t * 0.011) % (1 / G);
      for (let i = 0; i <= G; i++) { const yr = (i / G + sc) % 1; const pv = Math.pow(yr, 2.3); const yp = H * .58 + pv * H * .42; const xs = pv * W * .88; ctx.beginPath(); ctx.moveTo(W / 2 - xs, yp); ctx.lineTo(W / 2 + xs, yp); ctx.stroke(); }
      for (let i = -G / 2; i <= G / 2; i++) { ctx.beginPath(); ctx.moveTo(W / 2 + i * (W / G) * .44, H * .58); ctx.lineTo(W / 2 + i * W * .31, H); ctx.stroke(); }
      ctx.restore();

      // Vortex
      for (let ring = 1; ring <= 4; ring++) { const r = (ring / 4) * Math.min(W, H) * .28; const rot = t * (.14 + ring * .04) * (ring % 2 ? 1 : -1); for (let s = 0; s < 55; s++) { const a1 = rot + (s / 55) * Math.PI * 2; const a2 = rot + ((s + .65) / 55) * Math.PI * 2; ctx.beginPath(); ctx.arc(W * .5, H * .34, r, a1, a2); ctx.strokeStyle = `rgba(79,195,247,${.022 + Math.abs(Math.sin(t * .5 + ring)) * .025})`; ctx.lineWidth = 1; ctx.stroke(); } }

      // Hexagones
      HEXS.forEach(h => {
        h.x += h.vx; h.y += h.vy; h.rot += h.rotSpeed;
        if (h.x < -.1) h.x = 1.1; if (h.x > 1.1) h.x = -.1;
        if (h.y < -.1) h.y = 1.1; if (h.y > 1.1) h.y = -.1;
        ctx.save(); ctx.globalAlpha = h.opacity * (.7 + .3 * Math.sin(t * .5 + h.x * 5));
        ctx.strokeStyle = '#E87722'; ctx.lineWidth = .7;
        drawHex(h.x * W, h.y * H, h.size, h.rot); ctx.stroke(); ctx.restore();
      });

      // Étoiles
      STARS.forEach(s => {
        const tw = .3 + .7 * Math.abs(Math.sin(t * .7 + s.phase));
        ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color; ctx.globalAlpha = .55 * tw; ctx.fill(); ctx.globalAlpha = 1;
        if (s.r > 1.2) { const cr = s.r * 5.5 * tw; ctx.strokeStyle = s.color; ctx.lineWidth = .35; ctx.globalAlpha = .22 * tw; ctx.beginPath(); ctx.moveTo(s.x * W - cr, s.y * H); ctx.lineTo(s.x * W + cr, s.y * H); ctx.moveTo(s.x * W, s.y * H - cr); ctx.lineTo(s.x * W, s.y * H + cr); ctx.stroke(); ctx.globalAlpha = 1; }
      });

      // Orbes
      ORBS.forEach(o => {
        o.x += o.vx; o.y += o.vy; o.life += o.lifeSpeed;
        if (o.x < 0) o.x = 1; if (o.x > 1) o.x = 0; if (o.y < 0) o.y = 1; if (o.y > 1) o.y = 0;
        const p = .4 + .6 * Math.abs(Math.sin(o.life));
        const h = ctx.createRadialGradient(o.x * W, o.y * H, 0, o.x * W, o.y * H, o.r * 9);
        h.addColorStop(0, `hsla(${o.hue},72%,65%,${.45 * p})`); h.addColorStop(1, 'transparent');
        ctx.fillStyle = h; ctx.beginPath(); ctx.arc(o.x * W, o.y * H, o.r * 9, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(o.x * W, o.y * H, o.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${o.hue},72%,78%,${p})`; ctx.fill();
      });
      for (let i = 0; i < ORBS.length; i++) for (let j = i + 1; j < ORBS.length; j++) {
        const dx = (ORBS[i].x - ORBS[j].x) * W, dy = (ORBS[i].y - ORBS[j].y) * H;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 105) { ctx.beginPath(); ctx.globalAlpha = .12 * (1 - d / 105); ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = .38; ctx.moveTo(ORBS[i].x * W, ORBS[i].y * H); ctx.lineTo(ORBS[j].x * W, ORBS[j].y * H); ctx.stroke(); ctx.globalAlpha = 1; }
      }

      // Météorites
      for (let m = METEORS.length - 1; m >= 0; m--) {
        const mt = METEORS[m]; mt.x += mt.vx; mt.y += mt.vy; mt.life++;
        if (mt.life > mt.maxLife || mt.x > 1.2) { METEORS.splice(m, 1); continue; }
        const al = (1 - mt.life / mt.maxLife) * .78;
        const mg = ctx.createLinearGradient((mt.x - mt.vx * 72) * W, (mt.y - mt.vy * 72) * H, mt.x * W, mt.y * H);
        mg.addColorStop(0, 'transparent'); mg.addColorStop(1, mt.color);
        ctx.beginPath(); ctx.moveTo((mt.x - mt.vx * 72) * W, (mt.y - mt.vy * 72) * H); ctx.lineTo(mt.x * W, mt.y * H);
        ctx.strokeStyle = mg; ctx.lineWidth = 1.6; ctx.globalAlpha = al; ctx.stroke(); ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.arc(mt.x * W, mt.y * H, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.globalAlpha = al; ctx.fill(); ctx.globalAlpha = 1;
      }

      // Scan line
      const scanY = ((t * .032) % 1) * H;
      const sg = ctx.createLinearGradient(0, scanY - 70, 0, scanY + 70);
      sg.addColorStop(0, 'transparent'); sg.addColorStop(.5, 'rgba(232,119,34,0.05)'); sg.addColorStop(1, 'transparent');
      ctx.fillStyle = sg; ctx.fillRect(0, scanY - 70, W, 140);

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: 'block' }} />;
};

// ═══════════════════════════════════════════════════════════════
// MARQUEE HORIZONTAL
// ═══════════════════════════════════════════════════════════════
const Marquee: React.FC<{
  items: string[];
  speed?: number;
  reverse?: boolean;
  variant?: 'default' | 'orange' | 'subtle';
}> = ({ items, speed = 35, reverse = false, variant = 'default' }) => {
  // Triple pour un défilement parfaitement infini
  const content = [...items, ...items, ...items];
  const animName = reverse ? 'marqueeRev' : 'marqueeScroll';
  return (
    <div className="overflow-hidden whitespace-nowrap select-none">
      <div className="inline-flex items-center gap-0"
        style={{ animation: `${animName} ${speed}s linear infinite`, willChange: 'transform' }}>
        {content.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-4">
            <span className={`text-[10px] font-black uppercase tracking-[0.35em] ${
              variant === 'orange' ? (i % (items.length) === 0 ? 'text-brand-orange' : 'text-white/60')
              : variant === 'subtle' ? 'text-white/35'
              : 'text-white/55'
            }`}>{item}</span>
            <span className={`text-xs ${variant === 'orange' ? 'text-brand-orange/50' : 'text-white/20'}`}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MOT TOURNANT (ticker vertical)
// ═══════════════════════════════════════════════════════════════
const RotatingWord: React.FC<{ words: string[] }> = ({ words }) => {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const iv = setInterval(() => {
      setShow(false);
      setTimeout(() => { setIdx(i => (i + 1) % words.length); setShow(true); }, 380);
    }, 2600);
    return () => clearInterval(iv);
  }, [words.length]);
  return (
    <span className="text-brand-orange inline-block"
      style={{ transition: 'opacity 0.38s ease, transform 0.38s ease', opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(14px)' }}>
      {words[idx]}
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════
// COMPTEUR ANIMÉ
// ═══════════════════════════════════════════════════════════════
const CountUp: React.FC<{ to: number; suffix: string }> = ({ to, suffix }) => {
  const [val, setVal] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let start: number;
      const tick = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1600, 1);
        setVal(Math.floor((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.disconnect();
    }, { threshold: 0.5 });
    if (spanRef.current) obs.observe(spanRef.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={spanRef}>{val}{suffix}</span>;
};

// ═══════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ═══════════════════════════════════════════════════════════════
const AuditLanding: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', objective: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const WHATSAPP_AUDIT_NUMBER = '237672777657';

  useEffect(() => {
    const h = (e: MouseEvent) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const feedback = await generateAuditSummary({ company: `${form.name} — ${form.company}`, needs: [form.objective] });
      setResult(feedback);
      const message = ` *DEMANDE D'AUDIT TECHNIQUE — IMANI-TECH*\n\n━━━━━━━━━━━━━━━━━━━━━━\n *Nom :* ${form.name}\n *Structure :* ${form.company}\n━━━━━━━━━━━━━━━━━━━━━━\n *Email :* ${form.email}\n *WhatsApp :* ${form.phone}\n━━━━━━━━━━━━━━━━━━━━━━\n *Défi / Objectif :*\n${form.objective}\n━━━━━━━━━━━━━━━━━━━━━━\n_Envoyé depuis le formulaire d'audit imani-tech.cm_`;
      window.open(`https://wa.me/${WHATSAPP_AUDIT_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    } catch {
      setError('Une erreur est survenue. Réessayez ou contactez-nous directement.');
    } finally {
      setLoading(false);
    }
  };

  // ── Données marquees ────────────────────────────────────────
  const row1 = ['Audit Stratégique', 'Infrastructure Réseau', 'Cybersécurité', 'Vidéosurveillance 4K', 'Développement Web', 'Formation IT', 'Contrôle d\'Accès', 'Téléphonie IP', 'Cloud & Serveurs'];
  const row2 = ['Certifié 237', 'Déploiement 48h', 'Support 24/7', 'Garantie Résultat', 'ROI Mesuré', 'Expertise Locale', 'PME & Entreprises', 'SLA 99.5%', 'Intervention Rapide'];
  const row3 = ['Douala', 'Yaoundé', 'Bafoussam', 'Buea', 'Limbé', 'Kribi', 'Bertoua', 'Ngaoundéré', 'Garoua', 'Maroua', 'Édéa', 'Nkongsamba'];
  const rotating = ['Potentiel', 'Réseau', 'Sécurité', 'Digital', 'Performance'];

  // ── Champ de formulaire réutilisable ────────────────────────
  const Field = ({ id, label, type = 'text', placeholder, rows }: { id: keyof typeof form; label: string; type?: string; placeholder: string; rows?: number }) => {
    const isFocused = focused === id;
    const commonStyle: React.CSSProperties = {
      background: isFocused ? 'rgba(232,119,34,0.07)' : 'rgba(255,255,255,0.05)',
      border: `1.5px solid ${isFocused ? '#E87722' : 'rgba(255,255,255,0.12)'}`,
      color: '#f1f5f9',
      borderRadius: '14px',
      width: '100%',
      padding: '16px 18px',
      fontSize: '14px',
      fontWeight: 700,
      transition: 'all 0.25s ease',
      outline: 'none',
      resize: 'none' as const,
    };
    return (
      <div>
        <label className="block text-[9px] font-black uppercase tracking-[0.35em] mb-2 transition-colors duration-200"
          style={{ color: isFocused ? '#E87722' : 'rgba(255,255,255,0.45)' }}>
          {label}
        </label>
        {rows ? (
          <textarea rows={rows} required value={form[id]} placeholder={placeholder}
            onFocus={() => setFocused(id)} onBlur={() => setFocused(null)}
            onChange={e => setForm({ ...form, [id]: e.target.value })}
            style={commonStyle} />
        ) : (
          <input required type={type} value={form[id]} placeholder={placeholder}
            onFocus={() => setFocused(id)} onBlur={() => setFocused(null)}
            onChange={e => setForm({ ...form, [id]: e.target.value })}
            style={commonStyle} />
        )}
      </div>
    );
  };

  // ════════════════════════════════════════════════════════════
  // ÉCRAN RÉSULTAT
  // ════════════════════════════════════════════════════════════
  if (result) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{ background: '#0d1520' }}>
        <CosmicBg />
        {/* Curseur lumineux */}
        <div className="fixed pointer-events-none z-10"
          style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, width: 320, height: 320, transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(232,119,34,0.09), transparent)', borderRadius: '50%', transition: 'left .5s ease, top .5s ease' }} />

        <div className="relative z-20 flex items-center justify-center min-h-screen py-20 px-4">
          <div className="max-w-2xl w-full" style={{ animation: 'popIn .6s cubic-bezier(.34,1.56,.64,1) both' }}>
            <style>{`@keyframes popIn { from{opacity:0;transform:scale(.9) translateY(28px)} to{opacity:1;transform:scale(1) translateY(0)} }`}</style>

            <div className="rounded-[2.8rem] overflow-hidden" style={{ background: 'rgba(16,22,42,0.97)', border: '1.5px solid rgba(232,119,34,0.4)', boxShadow: '0 0 80px rgba(232,119,34,0.12)' }}>
              <div className="h-1" style={{ background: 'linear-gradient(90deg, transparent, #E87722, #60a5fa, #E87722, transparent)' }} />

              <div className="p-10 sm:p-14">
                {/* Header */}
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl shrink-0"
                    style={{ background: 'linear-gradient(135deg, #E87722, #c25f10)' }}>
                    <ShieldCheck size={30} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[8px] font-black uppercase tracking-[0.4em] text-brand-orange mb-1">Diagnostic Enregistré</div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter leading-tight">
                      Audit <span className="text-brand-orange">Lancé !</span>
                    </h1>
                  </div>
                </div>

                {/* Email notif */}
                <div className="flex items-center gap-4 p-5 rounded-2xl mb-8"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(232,119,34,0.18)', color: '#E87722' }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/50 mb-0.5">Notification Experts</p>
                    <p className="text-sm font-bold text-white">Copie transmise à <span className="text-brand-orange">{OFFICIAL_EMAIL}</span></p>
                  </div>
                </div>

                {/* Note IA */}
                <div className="p-7 sm:p-9 rounded-2xl mb-10 relative overflow-hidden"
                  style={{ background: 'rgba(232,119,34,0.08)', border: '1.5px solid rgba(232,119,34,0.38)' }}>
                  <div className="absolute top-3 right-5 text-6xl font-black select-none leading-none" style={{ color: 'rgba(232,119,34,0.12)' }}>"</div>
                  <div className="flex items-center gap-2 mb-4">
                    <Zap size={13} className="text-brand-orange" />
                    <span className="text-[8px] font-black uppercase tracking-[0.35em] text-brand-orange">Analyse Stratégique IA</span>
                  </div>
                  <p className="text-base text-white font-semibold leading-relaxed relative z-10">{result}</p>
                </div>

                <p className="text-center text-sm font-bold text-white/55 mb-8 uppercase tracking-widest">
                  Session expert confirmée pour <span className="text-white">{form.phone}</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/" className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-white transition-all hover:opacity-80"
                    style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.16)' }}>
                    <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} /> Retour au site
                  </Link>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-white transition-all hover:opacity-80"
                    style={{ background: '#16a34a' }}>
                    💬 Besoin d'aide ?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════
  // FORMULAIRE PRINCIPAL
  // ════════════════════════════════════════════════════════════
  return (
    <>
      <style>{`
        @keyframes marqueeScroll { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
        @keyframes marqueeRev    { from{transform:translateX(-33.333%)} to{transform:translateX(0)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideL  { from{opacity:0;transform:translateX(-36px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideR  { from{opacity:0;transform:translateX(36px)} to{opacity:1;transform:translateX(0)} }
        @keyframes cardGlow { 0%,100%{box-shadow:0 0 40px rgba(232,119,34,0.12)} 50%{box-shadow:0 0 80px rgba(232,119,34,0.28)} }
        @keyframes scanAnim { from{top:-4%} to{top:104%} }
        @keyframes badgePulse { 0%,100%{opacity:.7} 50%{opacity:1} }
        .anim-slideL { animation: slideL 1s .15s both; }
        .anim-slideR { animation: slideR 1s .25s both; }
        .card-glow   { animation: cardGlow 3.5s ease-in-out infinite; }
        .scan-bar    { animation: scanAnim 5s linear infinite; position:absolute; left:0; width:100%; height:1.5px; background:linear-gradient(90deg,transparent,rgba(232,119,34,0.5),transparent); pointer-events:none; z-index:5; }
        input,textarea { font-family: inherit; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.28); }
      `}</style>

      <div className="min-h-screen relative overflow-x-hidden" style={{ background: '#0d1520' }}>
        <CosmicBg />

        {/* Curseur lumineux */}
        <div className="fixed pointer-events-none" style={{ zIndex: 5, left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, width: 280, height: 280, transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(232,119,34,0.07), transparent)', borderRadius: '50%', transition: 'left .55s ease, top .55s ease' }} />

        {/* ── NAVBAR ─────────────────────────────────────────────── */}
        <nav className="relative z-30 sticky top-0"
          style={{ background: 'rgba(10,16,30,0.88)', backdropFilter: 'blur(22px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-lg transition-transform group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #E87722, #c25f10)' }}>I</div>
              <span className="font-black tracking-tighter uppercase text-white text-lg leading-none">
                IMANI-TECH <span className="text-brand-orange">SOLUTIONS</span>
              </span>
            </Link>
            <div className="hidden sm:flex items-center gap-2" style={{ animation: 'badgePulse 2.5s ease-in-out infinite' }}>
              <Globe size={11} className="text-brand-orange" />
              <span className="text-[9px] font-black uppercase tracking-[0.35em] text-white/45">Consultation Élite 237</span>
            </div>
          </div>
        </nav>

        {/* ── MARQUEE #1 — services ───────────────────────────────── */}
        <div className="relative z-20 py-3 border-b" style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.07)' }}>
          <Marquee items={row1} speed={32} variant="orange" />
        </div>

        {/* ── HERO + FORM ─────────────────────────────────────────── */}
        <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 lg:pt-24 lg:pb-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── GAUCHE : pitch ─────────────────────────────────────── */}
          <div className="anim-slideL">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border"
              style={{ background: 'rgba(232,119,34,0.1)', borderColor: 'rgba(232,119,34,0.32)', animation: 'fadeUp .8s .1s both' }}>
              <Zap size={10} className="text-brand-orange animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-orange">Expertise Nationale Certifiée</span>
            </div>

            {/* Titre avec mot tournant */}
            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-black uppercase tracking-tighter leading-[0.87] text-white mb-8"
              style={{ animation: 'fadeUp .9s .2s both' }}>
              Libérez votre<br />
              <RotatingWord words={rotating} /><br />
              <span style={{ color: 'rgba(255,255,255,0.22)' }}>de Croissance</span>
            </h1>

            {/* Sous-titre */}
            <p className="text-base sm:text-lg text-white/70 mb-10 font-semibold leading-relaxed max-w-lg"
              style={{ animation: 'fadeUp .9s .35s both' }}>
              Identifiez les barrières qui bloquent vos ventes et obtenez un plan d'action d'élite calibré pour le marché camerounais.
            </p>

            {/* Checklist */}
            <div className="space-y-4 mb-12">
              {[
                { icon: <Target size={15} />, text: 'Audit approfondi de votre écosystème digital.' },
                { icon: <Globe size={15} />, text: 'Benchmark concurrentiel spécifique au Cameroun.' },
                { icon: <Activity size={15} />, text: "Plan d'action prioritaire sous 30 jours." },
                { icon: <CheckCircle size={15} />, text: 'Analyse de rentabilité et objectifs ROI chiffrés.' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4" style={{ animation: `fadeUp .7s ${.45 + i * .1}s both` }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(232,119,34,0.15)', color: '#E87722' }}>{item.icon}</div>
                  <span className="text-sm font-bold text-white/85 uppercase tracking-tight">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3" style={{ animation: 'fadeUp .8s .85s both' }}>
              {[
                { to: 98, suffix: '%', label: 'Clients satisfaits', icon: <CheckCircle size={13} /> },
                { to: 5, suffix: 'ans', label: "D'expertise", icon: <Clock size={13} /> },
                { to: 200, suffix: '+', label: 'Projets livrés', icon: <Users size={13} /> },
              ].map((s, i) => (
                <div key={i} className="p-4 rounded-2xl text-center transition-all hover:-translate-y-1 duration-300 cursor-default"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="mb-1.5 flex justify-center text-brand-orange">{s.icon}</div>
                  <div className="text-xl font-black text-white tracking-tighter leading-none">
                    <CountUp to={s.to} suffix={s.suffix} />
                  </div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-white/45 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── DROITE : formulaire ─────────────────────────────────── */}
          <div className="anim-slideR">
            <div className="card-glow rounded-[2.6rem] overflow-hidden relative"
              style={{ background: 'rgba(15,22,40,0.97)', border: '1.5px solid rgba(232,119,34,0.32)', backdropFilter: 'blur(24px)' }}>
              {/* Barre de couleur haut */}
              <div className="h-1" style={{ background: 'linear-gradient(90deg, transparent, #E87722, #60a5fa, #E87722, transparent)' }} />
              {/* Scan line animée */}
              <div className="scan-bar" />

              <div className="p-8 sm:p-12 relative z-10">
                {/* Header carte */}
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xl"
                    style={{ background: 'linear-gradient(135deg, #E87722, #c25f10)' }}>
                    <ShieldCheck size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[8px] font-black uppercase tracking-[0.4em] text-brand-orange mb-0.5">Gratuit & Sans Engagement</div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none">Session de Diagnostic</h2>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <Field id="name" label="Nom Complet" placeholder="Ex: Marc Atangana" />
                  <Field id="company" label="Structure & Localisation" placeholder="Ex: Crystal Akwa Sarl — Yaoundé" />

                  <div className="grid grid-cols-2 gap-4">
                    <Field id="email" label="Email Pro" type="email" placeholder="contact@domain.cm" />
                    <Field id="phone" label="WhatsApp" type="tel" placeholder="+237 6..." />
                  </div>

                  <Field id="objective" label="Votre défi majeur" placeholder="Expliquez-nous brièvement vos attentes..." rows={3} />

                  {error && (
                    <div className="flex items-center gap-3 p-4 rounded-2xl"
                      style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                      <AlertCircle size={14} style={{ color: '#f87171' }} className="shrink-0" />
                      <p className="text-xs font-bold" style={{ color: '#fca5a5' }}>{error}</p>
                    </div>
                  )}

                  <button disabled={loading} type="submit"
                    className="w-full py-5 rounded-2xl font-black text-lg text-white uppercase tracking-tight transition-all flex items-center justify-center gap-3 mt-2 disabled:opacity-50"
                    style={{ background: loading ? 'rgba(232,119,34,0.5)' : 'linear-gradient(135deg, #E87722, #c25f10)', boxShadow: '0 0 50px rgba(232,119,34,0.28)' }}
                    onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.opacity = '.88'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}>
                    {loading
                      ? <><Loader2 className="animate-spin" size={20} /> Analyse en cours...</>
                      : <><Target size={18} /> Réclamer mon Audit National</>}
                  </button>

                  <div className="flex items-center justify-center gap-2">
                    <ShieldCheck size={10} className="text-brand-orange shrink-0" />
                    <span className="text-[8px] font-black uppercase tracking-[0.25em] text-white/35">
                      Envoi sécurisé · imanitechsolutions237@gmail.com
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE #2 — garanties ──────────────────────────────── */}
        <div className="relative z-20 py-3 border-y my-2" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}>
          <Marquee items={row2} speed={42} reverse variant="default" />
        </div>

        {/* ── SECTION CONFIANCE ────────────────────────────────────── */}
        <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: <ShieldCheck size={20} />, title: 'Certifié & Garanti', desc: 'Toutes prestations certifiées avec SLA contractuel', color: '#0F766E' },
              { icon: <Zap size={20} />, title: 'Intervention Rapide', desc: 'Réponse sous 4h, déploiement sous 48h', color: '#E87722' },
              { icon: <Globe size={20} />, title: 'Couverture Nationale', desc: '10 villes couvertes au Cameroun', color: '#2563EB' },
              { icon: <Activity size={20} />, title: 'Support 24/7', desc: 'Équipe disponible nuits et weekends', color: '#7C3AED' },
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{ background: 'rgba(255,255,255,0.045)', borderColor: 'rgba(255,255,255,0.1)', animation: `fadeUp .7s ${.1 + i * .12}s both` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${c.color}20`, color: c.color }}>{c.icon}</div>
                <div className="text-xs font-black text-white uppercase tracking-tight mb-1.5">{c.title}</div>
                <div className="text-[9px] font-semibold leading-relaxed" style={{ color: 'rgba(255,255,255,0.48)' }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── MARQUEE #3 — villes ─────────────────────────────────── */}
        <div className="relative z-20 py-3 border-t" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}>
          <Marquee items={row3} speed={22} variant="subtle" />
        </div>

        {/* ── FOOTER ──────────────────────────────────────────────── */}
        <footer className="relative z-20 py-7 border-t text-center" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <p className="text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: 'rgba(255,255,255,0.22)' }}>
            {SITE_NAME} — Leadership Digital National
          </p>
        </footer>
      </div>
    </>
  );
};

export default AuditLanding;
