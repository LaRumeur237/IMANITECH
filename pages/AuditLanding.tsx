import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle, ShieldCheck, Zap, ArrowRight, Loader2,
  Calendar, Globe, Mail, AlertCircle
} from 'lucide-react';
import { generateAuditSummary } from '../services/geminiService';
import { SITE_NAME, WHATSAPP_LINK, OFFICIAL_EMAIL } from '../data';

const AuditLanding: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState<string | null>(null);
  const [error,   setError]   = useState<string>('');
  const [form,    setForm]    = useState({
    name: '', company: '', email: '', phone: '', objective: '',
  });

  const WHATSAPP_AUDIT_NUMBER = '237672777657';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ── 1. Générer le résumé IA ──────────────────────────────────────────────
      const feedback = await generateAuditSummary({
        company: `${form.name} — ${form.company}`,
        needs:   [form.objective],
      });

      setResult(feedback);

      // ── 2. Ouvrir WhatsApp avec les données du formulaire pré-remplies ───────
      const message = ` *DEMANDE D'AUDIT TECHNIQUE — IMANI-TECH*

━━━━━━━━━━━━━━━━━━━━━━
 *Nom :* ${form.name}
 *Structure :* ${form.company}
━━━━━━━━━━━━━━━━━━━━━━

 *Email :* ${form.email}
 *WhatsApp :* ${form.phone}

━━━━━━━━━━━━━━━━━━━━━━
 *Défi / Objectif :*
${form.objective}

━━━━━━━━━━━━━━━━━━━━━━
_Envoyé depuis le formulaire d'audit imani-tech.cm_`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_AUDIT_NUMBER}?text=${encodedMessage}`;

      // Ouvre WhatsApp dans un nouvel onglet
      window.open(whatsappUrl, '_blank');

    } catch (err) {
      console.error(err);
      setError('Une erreur est survenue. Réessayez ou contactez-nous directement.');
    } finally {
      setLoading(false);
    }
  };

  // ── Écran résultat ──────────────────────────────────────────────────────────
  if (result) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center py-20 px-4 page-appear">
        <div className="max-w-2xl w-full bg-white p-10 sm:p-16 rounded-[3rem] shadow-2xl animate-in zoom-in duration-500 border border-brand-sand relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-orange/5 blur-3xl rounded-full"/>

          <div className="text-center mb-10 relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-orange text-white rounded-2xl mb-8 shadow-2xl shadow-brand-orange/20">
              <ShieldCheck size={40}/>
            </div>
            <h1 className="text-4xl font-black text-brand-stone uppercase tracking-tighter leading-none">
              Diagnostic <br/><span className="text-brand-orange">Enregistré !</span>
            </h1>
          </div>

          <div className="mb-8 bg-brand-beige p-6 rounded-2xl border border-brand-sand/50 flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-orange shadow-sm border border-brand-sand shrink-0">
              <Mail size={20}/>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-stone/40">Notification Experts</p>
              <p className="text-xs font-bold text-brand-stone">
                Copie transmise à <strong className="text-brand-orange">{OFFICIAL_EMAIL}</strong>
              </p>
            </div>
          </div>

          <div className="bg-brand-orange/5 border-l-8 border-brand-orange p-8 mb-10 rounded-r-[2rem] relative z-10">
            <h3 className="font-black text-brand-orange mb-4 flex items-center text-xs uppercase tracking-[0.2em]">
              <Zap size={16} className="mr-2"/> Note Stratégique IA
            </h3>
            <p className="text-brand-stone text-base sm:text-lg leading-relaxed font-bold">{result}</p>
          </div>

          <div className="text-center relative z-10">
            <p className="text-brand-stone/40 mb-10 font-black uppercase text-xs tracking-widest">
              Session expert confirmée pour le <span className="text-brand-stone">{form.phone}</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="inline-flex items-center justify-center bg-brand-stone text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-brand-orange transition-all shadow-xl shadow-brand-stone/20">
                Retour au site <ArrowRight size={14} className="ml-2"/>
              </Link>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center bg-green-500 text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-green-500/10">
                Besoin d'aide ?
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Formulaire ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-brand-cream text-brand-stone font-inter page-appear">

      <nav className="p-8 border-b border-brand-sand bg-brand-beige sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center font-black text-white text-xl group-hover:bg-brand-stone transition-colors shadow-md">I</div>
            <span className="text-xl font-black tracking-tighter uppercase">
              IMANI-TECH <span className="text-brand-orange">SOLUTIONS</span>
            </span>
          </Link>
          <div className="hidden sm:flex items-center space-x-2 text-[10px] font-black uppercase text-brand-stone/40 tracking-[0.2em]">
            <Globe size={14} className="text-brand-orange"/>
            <span>Consultation Élite 237</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">

        <div className="text-center lg:text-left animate-in fade-in duration-700">
          <div className="inline-block px-4 py-1.5 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] font-black rounded-full mb-10 uppercase tracking-[0.2em] shadow-sm">
            Expertise Nationale Certifiée
          </div>
          <h1 className="text-5xl sm:text-7xl font-black mb-10 leading-[0.9] uppercase tracking-tighter text-brand-stone">
            Libérez votre <br/><span className="text-brand-orange">Potentiel</span> <br/>de Croissance
          </h1>
          <p className="text-xl sm:text-2xl text-brand-stone/70 mb-12 leading-tight font-bold">
            Identifiez les barrières qui bloquent vos ventes et obtenez un plan d'action d'élite.
          </p>
          <div className="space-y-8 text-left max-w-lg mx-auto lg:mx-0">
            {[
              'Audit approfondi de votre écosystème digital.',
              'Benchmark concurrentiel spécifique au Cameroun.',
              "Plan d'action prioritaire sous 30 jours.",
              'Analyse de rentabilité et objectifs ROI.',
            ].map((text, i) => (
              <div key={i} className="flex items-start space-x-5 group">
                <div className="shrink-0 mt-1">
                  <CheckCircle className="text-brand-orange group-hover:scale-110 transition-transform" size={28}/>
                </div>
                <p className="text-lg text-brand-stone font-black uppercase tracking-tight leading-tight">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-10 sm:p-16 rounded-[3rem] shadow-2xl border border-brand-sand relative overflow-hidden animate-in zoom-in duration-700">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-orange/5 blur-[100px] rounded-full"/>

          <h2 className="text-3xl font-black mb-12 text-center uppercase tracking-tighter flex items-center justify-center text-brand-stone">
            <Calendar className="mr-4 text-brand-orange" size={28}/> Session de Diagnostic
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-stone/40 ml-1">Nom Complet</label>
              <input required type="text" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Marc Atangana"
                className="w-full bg-brand-cream border border-brand-sand p-5 rounded-xl focus:border-brand-orange focus:bg-white focus:outline-none text-sm font-bold transition-all placeholder:text-brand-stone/30"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-stone/40 ml-1">Structure & Localisation</label>
              <input required type="text" value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })}
                placeholder="Ex: Crystal Akwa Sarl — Yaoundé"
                className="w-full bg-brand-cream border border-brand-sand p-5 rounded-xl focus:border-brand-orange focus:bg-white focus:outline-none text-sm font-bold transition-all placeholder:text-brand-stone/30"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-stone/40 ml-1">Email Pro</label>
                <input required type="email" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="contact@domain.cm"
                  className="w-full bg-brand-cream border border-brand-sand p-5 rounded-xl focus:border-brand-orange focus:bg-white focus:outline-none text-sm font-bold transition-all placeholder:text-brand-stone/30"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-stone/40 ml-1">WhatsApp</label>
                <input required type="tel" value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="+237 6..."
                  className="w-full bg-brand-cream border border-brand-sand p-5 rounded-xl focus:border-brand-orange focus:bg-white focus:outline-none text-sm font-bold transition-all placeholder:text-brand-stone/30"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-stone/40 ml-1">Quel est votre défi majeur ?</label>
              <textarea required value={form.objective}
                onChange={e => setForm({ ...form, objective: e.target.value })}
                rows={3} placeholder="Expliquez-nous brièvement vos attentes..."
                className="w-full bg-brand-cream border border-brand-sand p-5 rounded-xl focus:border-brand-orange focus:bg-white focus:outline-none text-sm font-bold resize-none transition-all placeholder:text-brand-stone/30"
              />
            </div>

            {error && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl p-4">
                <AlertCircle size={16} className="text-red-500 shrink-0"/>
                <p className="text-red-600 text-xs font-bold">{error}</p>
              </div>
            )}

            <button disabled={loading} type="submit"
              className="w-full bg-brand-orange hover:bg-brand-stone text-white py-6 rounded-xl font-black text-xl transition-all shadow-xl shadow-brand-orange/30 flex items-center justify-center disabled:opacity-50 mt-4 uppercase tracking-tighter"
            >
              {loading
                ? <><Loader2 className="animate-spin mr-3" size={22}/> Analyse en cours...</>
                : 'Réclamer mon Audit National'
              }
            </button>

            <div className="flex items-center justify-center space-x-2 text-[9px] font-black uppercase tracking-[0.2em] text-brand-stone/30">
              <ShieldCheck size={12} className="text-brand-orange"/>
              <span>Envoi sécurisé via Resend · imanitechsolutions237@gmail.com</span>
            </div>
          </form>
        </div>
      </div>

      <div className="py-12 border-t border-brand-sand text-center text-brand-stone/30 text-[10px] font-black uppercase tracking-[0.3em] bg-brand-beige">
        {SITE_NAME} | LEADERSHIP DIGITAL NATIONAL
      </div>
    </div>
  );
};

export default AuditLanding;

