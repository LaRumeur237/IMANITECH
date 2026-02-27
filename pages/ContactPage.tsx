import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Send, Globe, ChevronRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { WHATSAPP_LINK, WHATSAPP_NUMBER, OFFICIAL_EMAIL } from '../data';

const WHATSAPP_CONTACT_NUMBER = '237672777657';

const ContactPage: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const localisation = formData.get('localisation') as string;
    const entreprise   = formData.get('entreprise')   as string;
    const whatsapp     = formData.get('whatsapp')      as string;
    const email        = formData.get('email')         as string;
    const budget       = formData.get('budget')        as string;
    const message      = formData.get('message')       as string;

    try {
      // ── Construction du message WhatsApp formaté ────────────────────────────
      const waMessage = ` *NOUVELLE DEMANDE DE CONSULTATION — IMANI-TECH*

━━━━━━━━━━━━━━━━━━━━━━
 *Entreprise :* ${entreprise}
 *Localisation :* ${localisation}
━━━━━━━━━━━━━━━━━━━━━━

 *WhatsApp :* ${whatsapp}
 *Email :* ${email}
 *Budget :* ${budget || 'Non précisé'}

━━━━━━━━━━━━━━━━━━━━━━
 *Détails du projet :*
${message}

━━━━━━━━━━━━━━━━━━━━━━
_Envoyé depuis le formulaire contact imani-tech.cm_`;

      const encodedMsg = encodeURIComponent(waMessage);
      const whatsappUrl = `https://wa.me/${WHATSAPP_CONTACT_NUMBER}?text=${encodedMsg}`;

      // Ouvre WhatsApp dans un nouvel onglet
      window.open(whatsappUrl, '_blank');

      setStatus('success');
      form.reset();

    } catch (err) {
      console.error(err);
      setErrorMsg('Une erreur est survenue. Contactez-nous directement via WhatsApp.');
      setStatus('error');
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen page-appear">
      <section className="py-32 bg-brand-beige border-b border-brand-sand text-center px-4">
        <div className="max-w-4xl mx-auto">
          <span className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Partenariat & Consultation</span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-[0.9] text-brand-stone">
            Parlez à un <br /><span className="text-brand-orange">Consultant</span>
          </h1>
          <p className="text-xl text-brand-stone/60 max-w-2xl mx-auto font-bold">
            Basés à Douala, nous opérons dans tout le triangle national pour transformer votre vision en réalité digitale.
          </p>
        </div>
      </section>

      <section className="py-24 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Formulaire ── */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] shadow-2xl p-8 md:p-16 border border-brand-sand animate-in fade-in duration-700">

            {status === 'success' ? (
              <div className="py-20 text-center animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <CheckCircle size={44}/>
                </div>
                <h2 className="text-3xl font-black text-brand-stone uppercase tracking-tighter mb-4">Message Envoyé !</h2>
                <p className="text-brand-stone/60 font-bold mb-3 max-w-md mx-auto">
                  Votre demande a été transmise via WhatsApp. Un consultant vous répondra sous 24h.
                </p>
                <p className="text-brand-stone/40 font-bold text-sm mb-10 max-w-md mx-auto">
                  📲 Si WhatsApp ne s'est pas ouvert,{' '}
                  <a
                    href={`https://wa.me/${WHATSAPP_CONTACT_NUMBER}`}
                    target="_blank" rel="noreferrer"
                    className="text-brand-orange underline"
                  >
                    cliquez ici
                  </a>
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="bg-brand-orange text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-orange/20 hover:bg-brand-stone transition-all"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-8">

                {/* Localisation & Entreprise */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-brand-stone/40 uppercase tracking-[0.2em] ml-1">Localisation de l'entreprise</label>
                    <input
                      required name="localisation" type="text"
                      className="w-full bg-brand-cream border border-brand-sand p-5 rounded-2xl focus:border-brand-orange focus:bg-white focus:outline-none font-bold text-brand-stone transition-all placeholder:text-brand-stone/20"
                      placeholder="Douala, Yaoundé, Garoua..."
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-brand-stone/40 uppercase tracking-[0.2em] ml-1">Nom de la structure</label>
                    <input
                      required name="entreprise" type="text"
                      className="w-full bg-brand-cream border border-brand-sand p-5 rounded-2xl focus:border-brand-orange focus:bg-white focus:outline-none font-bold text-brand-stone transition-all placeholder:text-brand-stone/20"
                      placeholder="Ex: Crystal Akwa Sarl"
                    />
                  </div>
                </div>

                {/* WhatsApp & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-brand-stone/40 uppercase tracking-[0.2em] ml-1">Numéro WhatsApp</label>
                    <input
                      required name="whatsapp" type="tel"
                      className="w-full bg-brand-cream border border-brand-sand p-5 rounded-2xl focus:border-brand-orange focus:bg-white focus:outline-none font-bold text-brand-stone transition-all placeholder:text-brand-stone/20"
                      placeholder="+237 6..."
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-brand-stone/40 uppercase tracking-[0.2em] ml-1">Email Professionnel</label>
                    <input
                      required name="email" type="email"
                      className="w-full bg-brand-cream border border-brand-sand p-5 rounded-2xl focus:border-brand-orange focus:bg-white focus:outline-none font-bold text-brand-stone transition-all placeholder:text-brand-stone/20"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-brand-stone/40 uppercase tracking-[0.2em] ml-1">Enveloppe Budgétaire</label>
                  <select
                    name="budget"
                    className="w-full bg-brand-cream border border-brand-sand p-5 rounded-2xl focus:border-brand-orange focus:bg-white focus:outline-none font-bold text-brand-stone transition-all appearance-none"
                  >
                    <option>Sélectionnez un budget...</option>
                    <option>800.000 - 1.5M FCFA</option>
                    <option>1.5M - 3.5M FCFA</option>
                    <option>3.5M - 7M FCFA</option>
                    <option>Plus de 7M FCFA</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-brand-stone/40 uppercase tracking-[0.2em] ml-1">Détails stratégiques du projet</label>
                  <textarea
                    required name="message" rows={5}
                    className="w-full bg-brand-cream border border-brand-sand p-5 rounded-2xl focus:border-brand-orange focus:bg-white focus:outline-none font-bold text-brand-stone transition-all resize-none placeholder:text-brand-stone/20"
                    placeholder="Décrivez vos objectifs de croissance..."
                  />
                </div>

                {/* Erreur */}
                {status === 'error' && (
                  <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl p-4">
                    <AlertCircle size={18} className="text-red-500 shrink-0"/>
                    <p className="text-red-600 text-xs font-bold uppercase tracking-tight">
                      {errorMsg}
                    </p>
                  </div>
                )}

                {/* Submit */}
                <button
                  disabled={status === 'loading'}
                  type="submit"
                  className="bg-brand-stone text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-brand-orange transition-all flex items-center justify-center w-full md:w-auto shadow-2xl shadow-brand-stone/10 uppercase tracking-tighter disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading'
                    ? <><Loader2 className="animate-spin mr-3" size={20}/> Envoi en cours...</>
                    : <>Envoyer ma demande <Send className="ml-3" size={20}/></>
                  }
                </button>

                {/* Sécurité */}
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-brand-stone/25">
                  <MessageSquare size={11} className="text-green-500"/>
                  <span>Envoi direct sur WhatsApp · +237 672 777 657</span>
                </div>

              </form>
            )}
          </div>

          {/* ── Sidebar contact ── */}
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="bg-white rounded-[3rem] shadow-xl p-12 border border-brand-sand">
              <h3 className="text-2xl font-black text-brand-stone mb-10 uppercase tracking-tight">Reach National</h3>
              <div className="space-y-8">
                {[
                  { icon: <Globe size={28}/>,  title: 'Cameroun Entier', desc: 'Intervention présentielle ou distancielle 237.' },
                  { icon: <Phone size={28}/>,  title: 'Ligne Directe',   desc: WHATSAPP_NUMBER },
                  { icon: <Mail size={28}/>,   title: 'Email Officiel',  desc: OFFICIAL_EMAIL },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-black text-brand-stone uppercase text-sm tracking-tight mb-1">{item.title}</p>
                      <p className="text-brand-stone/60 font-bold text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-orange text-white rounded-[3rem] shadow-2xl p-12 flex flex-col items-center text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full group-hover:bg-white/20 transition-all"/>
              <MessageSquare size={64} className="mb-8"/>
              <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Support Elite</h3>
              <p className="mb-10 font-bold opacity-90 uppercase tracking-tight text-sm">Réponse instantanée par nos consultants sur WhatsApp.</p>
              <a
                href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
                className="w-full bg-brand-stone text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-brand-stone transition-all flex items-center justify-center shadow-2xl shadow-brand-stone/20"
              >
                Ouvrir WhatsApp <ChevronRight className="ml-2" size={14}/>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;