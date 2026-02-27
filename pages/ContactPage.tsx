import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, Globe, ChevronRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { WHATSAPP_LINK, WHATSAPP_NUMBER, OFFICIAL_EMAIL } from '../data';

const ContactPage: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      localisation: formData.get('localisation') as string,
      entreprise:   formData.get('entreprise')   as string,
      whatsapp:     formData.get('whatsapp')      as string,
      email:        formData.get('email')         as string,
      budget:       formData.get('budget')        as string,
      message:      formData.get('message')       as string,
    };

    try {
      // Appel vers la fonction serverless (Netlify ou Vercel)
      const res = await fetch('/.netlify/functions/send-email', {
        // Pour Vercel, remplacez par : '/api/send-email'
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        form.reset();
      } else {
        setErrorMsg(data.error || 'Erreur lors de l\'envoi.');
        setStatus('error');
      }
    } catch (err) {
      setErrorMsg('Impossible de contacter le serveur. Vérifiez votre connexion.');
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
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-black text-brand-stone uppercase tracking-tighter mb-4">Message Envoyé !</h2>
                <p className="text-brand-stone/60 font-bold mb-4 max-w-md mx-auto">
                  Votre demande a été transmise à notre équipe. Un consultant vous contactera sous 24h.
                </p>
                <p className="text-brand-stone/40 font-bold text-sm mb-10 max-w-md mx-auto">
                  📬 Confirmation envoyée à <strong className="text-brand-orange">{OFFICIAL_EMAIL}</strong>
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="bg-brand-orange text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-orange/20"
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
                      {errorMsg || 'Une erreur est survenue. Réessayez ou contactez-nous via WhatsApp.'}
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
