
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Target, Zap, Globe, Wifi, Layout, HardDrive, Camera, Key, BookOpen, ShieldCheck, HeartHandshake, CheckCircle2, PlayCircle, MonitorPlay, Cpu } from 'lucide-react';
import { AppRoute } from '../types';
import { AGENCY_STATS, WHATSAPP_LINK, SERVICES } from '../data';

const iconMap: Record<string, React.ReactNode> = {
  'Wifi': <Wifi size={28} />,
  'Layout': <Layout size={28} />,
  'HardDrive': <HardDrive size={28} />,
  'Camera': <Camera size={28} />,
  'Key': <Key size={28} />,
  'BookOpen': <BookOpen size={28} />
};

const Home: React.FC = () => {
  const [stats, setStats] = useState(AGENCY_STATS);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        revenue: prev.revenue + Math.floor(Math.random() * 5000),
        leads: prev.leads + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden bg-brand-beige page-appear">
      {/* Hero Section with VERY VISIBLE IT Background Image */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 px-4 overflow-hidden">
        {/* Enhanced Background IT Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=2000" 
            alt="Infrastructure Serveurs Informatique" 
            className="w-full h-full object-cover scale-110 animate-pulse-slow opacity-40 brightness-90 contrast-110"
          />
          {/* Refined Overlay for professional balance */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-beige/95 via-brand-beige/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-beige via-transparent to-transparent"></div>
          
          {/* Tech Blobs */}
          <div className="absolute top-0 right-0 w-full h-full bg-brand-orange/5 mix-blend-multiply pointer-events-none"></div>
          <div className="absolute top-20 right-0 w-1/2 h-1/2 bg-brand-orange/15 blur-[140px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-brand-stone text-white text-[10px] font-black uppercase tracking-[0.25em] mb-8 shadow-2xl border border-brand-orange/30">
              <span className="w-2 h-2 bg-brand-orange rounded-full animate-ping"></span>
              <span>Expertise Technique & Digitalisation Premium</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.85] mb-8 uppercase tracking-tighter text-brand-stone drop-shadow-sm">
              Sécurisez <br /> <span className="text-brand-orange">Boostez</span> <br /> & Digitalisez.
            </h1>
            <p className="text-xl text-brand-stone/80 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-bold bg-white/30 backdrop-blur-sm p-4 rounded-2xl border border-white/50 inline-block">
              Imani-Tech Solutions : L'élite du réseau informatique, de la vidéosurveillance intelligente et du développement web sur-mesure au Cameroun.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to={AppRoute.Audit} className="bg-brand-stone text-white px-10 py-5 rounded-full font-black text-sm flex items-center group shadow-2xl hover:bg-brand-orange transition-all w-full sm:w-auto justify-center uppercase tracking-[0.1em]">
                Réserver un Audit Gratuit
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={WHATSAPP_LINK} target="_blank" className="bg-white border-2 border-brand-stone text-brand-stone px-10 py-5 rounded-full font-black text-sm hover:bg-brand-stone hover:text-white transition-all w-full sm:w-auto justify-center flex items-center uppercase tracking-[0.1em] shadow-lg">
                WhatsApp Expert
              </a>
            </div>
          </div>

          <div className="hidden lg:block animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="bg-white/90 backdrop-blur-xl p-12 rounded-[4rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] relative overflow-hidden border border-brand-sand">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                 <ShieldCheck size={250} className="text-brand-orange" />
              </div>
              <div className="space-y-12 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-brand-stone/40 uppercase font-black tracking-[0.4em] mb-2">Impact Technologique</div>
                    <div className="text-5xl font-black text-brand-stone tracking-tighter flex items-baseline">
                      +150 <span className="text-sm font-black text-brand-orange ml-3 uppercase tracking-widest">PME Leaders</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-brand-orange text-white rounded-2xl flex items-center justify-center shadow-xl shadow-brand-orange/20 border-2 border-white">
                    <HeartHandshake size={32} />
                  </div>
                </div>
                
                <div className="bg-brand-beige p-8 rounded-[2.5rem] border border-brand-sand/50 shadow-inner">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-orange shadow-md border border-brand-sand">
                        <CheckCircle2 size={24} />
                      </div>
                      <div>
                        <div className="text-[9px] text-brand-stone/40 uppercase font-black tracking-widest">Disponibilité Services</div>
                        <div className="text-md font-black text-brand-stone uppercase tracking-tight">Système Critique 24/7</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-500 text-white px-4 py-1.5 rounded-full shadow-lg shadow-green-500/20">
                       <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                       <span className="text-[10px] font-black uppercase tracking-widest">Live</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-brand-sand/50 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-orange w-[98.5%] rounded-full shadow-[0_0_15px_rgba(255,95,0,0.5)]"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                   <div className="p-1 group border-l-4 border-brand-sand hover:border-brand-orange pl-6 transition-all">
                      <div className="text-[9px] text-brand-stone/40 uppercase font-black tracking-widest mb-1">Performance</div>
                      <div className="text-2xl font-black text-brand-stone tracking-tighter">Réactivité <br /> Immédiate</div>
                   </div>
                   <div className="p-1 group border-l-4 border-brand-sand hover:border-brand-orange pl-6 transition-all">
                      <div className="text-[9px] text-brand-stone/40 uppercase font-black tracking-widest mb-1">Confidentialité</div>
                      <div className="text-2xl font-black text-brand-stone tracking-tighter">Protection <br /> Intégrale</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOS PRESTATIONS Section */}
      <section className="py-24 bg-white border-y border-brand-sand animate-in fade-in duration-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Notre Expertise Technique</span>
            <h2 className="text-4xl md:text-6xl font-black text-brand-stone uppercase tracking-tighter mb-4">Nos <span className="text-brand-orange">Prestations</span></h2>
            <p className="text-brand-stone/50 font-black uppercase text-xs tracking-widest">Des solutions robustes pour la performance de votre business.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <div key={index} className="bg-brand-beige/20 p-10 rounded-[2.5rem] border border-brand-sand hover:border-brand-orange transition-all group hover:bg-white hover:shadow-2xl flex flex-col items-start animate-in zoom-in duration-500">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-orange mb-8 shadow-sm group-hover:bg-brand-orange group-hover:text-white transition-all transform group-hover:scale-110">
                  {iconMap[service.iconName] || <Zap size={28} />}
                </div>
                <h3 className="text-2xl font-black text-brand-stone uppercase tracking-tight mb-4 group-hover:text-brand-orange transition-colors">
                  <span className="text-brand-orange/20 mr-2">{index + 1}.</span>
                  {service.title}
                </h3>
                <p className="text-brand-stone/60 text-sm leading-relaxed font-bold mb-8">
                  {service.description}
                </p>
                <div className="mt-auto flex items-center text-brand-orange font-black text-[10px] uppercase tracking-widest border-t border-brand-sand w-full pt-6">
                  <Link to={AppRoute.Services} className="flex items-center hover:translate-x-2 transition-transform">
                    Détails Techniques <ChevronRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW VIDEO SHOWCASE SECTION */}
      <section className="py-32 bg-brand-stone relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <Cpu size={600} className="absolute -top-40 -left-40 text-brand-orange" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Text Side */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-[9px] font-black uppercase tracking-[0.3em] mb-8">
                <PlayCircle size={14} />
                <span>Showcase Technologique</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                Imani-Tech <br /> <span className="text-brand-orange">En Action</span>.
              </h2>
              <p className="text-lg text-brand-sand/60 font-bold leading-relaxed mb-10 max-w-md mx-auto lg:mx-0">
                Plongez au cœur de notre expertise. Découvrez comment nous transformons les infrastructures des leaders au Cameroun à travers cette présentation complète.
              </p>
              
              <div className="space-y-6 mb-10">
                {[
                  { label: "Durée", val: "Presentation Complète (Max 1h)" },
                  { label: "Qualité", val: "Ultra HD 4K Streaming" },
                  { label: "Focus", val: "Réseau, Sécurité & Digitalisation" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4 border-l-2 border-brand-orange/30 pl-6 py-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-orange w-16">{item.label}</span>
                    <span className="text-sm font-black text-white uppercase tracking-tight">{item.val}</span>
                  </div>
                ))}
              </div>

              <Link to={AppRoute.Audit} className="bg-white text-brand-stone px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all shadow-2xl inline-flex items-center">
                Discuter de votre projet <ChevronRight className="ml-2" size={16} />
              </Link>
            </div>

            {/* Video Player Side */}
            <div className="lg:col-span-7">
              <div className="relative group">
                {/* Visual Frame */}
                <div className="absolute -inset-4 bg-brand-orange/20 rounded-[3rem] blur-2xl group-hover:bg-brand-orange/30 transition-all duration-700"></div>
                
                <div className="relative bg-black rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-15px_rgba(0,0,0,0.6)] border-4 border-white/10 aspect-video">
                  {/* Iframe Placeholder - Remplacez 'VIDEO_ID' par votre lien YouTube ou Vimeo */}
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0&modestbranding=1" 
                    title="Présentation Imani-Tech Solutions"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Status Overlays */}
                <div className="absolute -top-6 -right-6 bg-brand-orange text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border-2 border-brand-stone animate-bounce">
                  <MonitorPlay size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Démonstration Live</span>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white text-brand-stone px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border-2 border-brand-orange">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Contenu Exclusif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Results */}
      <section className="py-24 bg-brand-stone text-white relative border-y border-brand-orange/20">
        <div className="max-w-7xl mx-auto px-4 animate-in fade-in duration-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { title: "Installation Pro", desc: "Matériel certifié et pose conforme aux normes de sécurité.", icon: <ShieldCheck /> },
              { title: "Reach National", desc: "Expertise sur les 10 régions du triangle national.", icon: <Globe /> },
              { title: "Support H24", desc: "Équipe technique réactive pour toutes vos urgences IT.", icon: <Zap /> },
              { title: "Ciblage Local", desc: "Solutions dimensionnées pour le climat et le réseau CMR.", icon: <Target /> },
            ].map((item, idx) => (
              <div key={idx} className="group">
                <div className="w-12 h-12 bg-brand-orange text-white rounded-xl flex items-center justify-center mb-6 shadow-xl shadow-brand-orange/20 group-hover:scale-110 transition-transform">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-3 text-white">{item.title}</h3>
                <p className="text-brand-sand/60 text-xs leading-relaxed font-bold uppercase tracking-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 text-center relative overflow-hidden bg-brand-white border-t border-brand-sand animate-in zoom-in duration-700">
         <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-black leading-[1] mb-10 uppercase tracking-tighter text-brand-stone">
              Prêt à blinder votre <br /> <span className="text-brand-orange">Infrastructure</span> ?
            </h2>
            <Link to={AppRoute.Audit} className="bg-brand-orange text-white px-12 py-6 rounded-full font-black text-xl uppercase tracking-widest hover:bg-brand-stone transition-all shadow-2xl shadow-brand-orange/30 inline-flex items-center">
              Réservez un Audit <ChevronRight className="ml-2" />
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Home;
