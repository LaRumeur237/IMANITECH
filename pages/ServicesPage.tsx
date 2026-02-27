
import React, { useState } from 'react';
import { Target, Search, Rocket, Globe, ArrowRight, Zap, CheckCircle, Wifi, Layout, HardDrive, Camera, Key, BookOpen, ChevronDown, ChevronUp, Cpu, ShieldCheck, TrendingUp, Info, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';
import { SERVICES } from '../data';

const iconMap: Record<string, React.ReactNode> = {
  'Wifi': <Wifi />,
  'Layout': <Layout />,
  'HardDrive': <HardDrive />,
  'Camera': <Camera />,
  'Key': <Key />,
  'BookOpen': <BookOpen />,
  'Phone': <Phone />,
  'ShieldCheck': <ShieldCheck />,
  'TrendingUp': <TrendingUp />
};

const ServiceSection: React.FC<{ 
  service: typeof SERVICES[0];
  isReversed?: boolean;
}> = ({ service, isReversed }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`flex flex-col py-12 border-b border-brand-sand/40 last:border-0 animate-in fade-in duration-700`}>
      {/* Principal Service Header Card */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20 p-8 lg:p-12 rounded-[3.5rem] bg-white border-2 border-transparent hover:border-brand-orange/20 transition-all cursor-pointer group shadow-sm hover:shadow-2xl relative overflow-hidden`}
      >
        {/* Background Accent */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           {React.cloneElement((iconMap[service.iconName] || <Zap />) as React.ReactElement, { size: 280 })}
        </div>

        <div className="flex-1 w-full relative z-10">
          <div className="flex items-center space-x-4 mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-brand-orange/10 rounded-2xl text-brand-orange border border-brand-orange/20 shadow-sm group-hover:bg-brand-orange group-hover:text-white transition-all">
              {React.cloneElement((iconMap[service.iconName] || <Zap />) as React.ReactElement, { size: 32 })}
            </div>
            <div className="flex flex-col">
              <span className="text-brand-orange font-black text-[9px] uppercase tracking-[0.4em]">Expertise #0{SERVICES.indexOf(service) + 1}</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase text-brand-stone/40">Certifié Imani-Tech</span>
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-brand-stone mb-6 uppercase tracking-tighter leading-none group-hover:text-brand-orange transition-colors">
            {service.title}
          </h2>
          
          <p className="text-lg text-brand-stone/60 mb-10 leading-relaxed font-bold max-w-xl">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            {service.features.map((f, i) => (
              <div key={i} className="flex items-center space-x-2 bg-brand-beige border border-brand-sand px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tight text-brand-stone/70">
                <CheckCircle className="text-brand-orange shrink-0" size={14} />
                <span>{f}</span>
              </div>
            ))}
          </div>

          <button 
            className="flex items-center space-x-3 text-brand-orange font-black text-[11px] uppercase tracking-widest border-b-2 border-brand-orange/20 pb-1 group-hover:border-brand-orange transition-all"
          >
            {isExpanded ? <><ChevronUp size={16} /> <span>Masquer les spécifications</span></> : <><Info size={16} /> <span>Explorer les détails techniques</span></>}
          </button>
        </div>

        <div className="flex-1 w-full relative z-10">
          <div className="aspect-[4/3] bg-brand-beige rounded-[3rem] overflow-hidden shadow-inner border border-brand-sand relative group-hover:scale-[1.02] transition-transform duration-700">
             <img src={`https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&seed=${service.id}`} alt={service.title} className="w-full h-full object-cover mix-blend-multiply opacity-80" />
             <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Expanded Technical Report Section */}
      {isExpanded && (
        <div className="mt-8 p-10 lg:p-16 bg-brand-stone rounded-[4rem] text-white shadow-2xl animate-in zoom-in duration-500 border-t-8 border-brand-orange">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Column 1: Architecture */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-brand-orange mb-4">
                <Cpu size={24} />
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">Architecture Technique</h4>
              </div>
              <p className="text-sm font-bold leading-relaxed text-brand-sand/70 border-l-2 border-brand-orange/30 pl-6 py-2">
                {service.details?.architecture}
              </p>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 mt-6">
                 <p className="text-[9px] font-black uppercase tracking-widest text-brand-orange mb-3">Protocoles de sécurité</p>
                 <p className="text-[11px] font-bold opacity-60">Chiffrement AES-256, Tunneling VPN, Segmentation logique des flux réseau.</p>
              </div>
            </div>

            {/* Column 2: Hardware */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-brand-orange mb-4">
                <ShieldCheck size={24} />
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">Matériel & Standards</h4>
              </div>
              <p className="text-sm font-bold leading-relaxed text-brand-sand/70 border-l-2 border-brand-orange/30 pl-6 py-2">
                {service.details?.hardware}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                 {["Tier-1 Brands", "Certifié CE", "Norme ISO", "Garantie 2 ans"].map(tag => (
                   <span key={tag} className="text-[9px] font-black px-3 py-1 bg-white/10 rounded-lg uppercase tracking-tight">{tag}</span>
                 ))}
              </div>
            </div>

            {/* Column 3: Business Impact */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-brand-orange mb-4">
                <TrendingUp size={24} />
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">Impact Business PME</h4>
              </div>
              <p className="text-sm font-bold leading-relaxed text-brand-sand/70 border-l-2 border-brand-orange/30 pl-6 py-2">
                {service.details?.impact}
              </p>
              <Link to={AppRoute.Audit} className="block w-full bg-brand-orange text-white py-5 rounded-2xl text-center font-black text-xs uppercase tracking-widest hover:bg-white hover:text-brand-stone transition-all shadow-xl shadow-brand-orange/20 mt-8">
                 Demander un Audit pour ce service
              </Link>
            </div>

          </div>

          {/* Report Footer */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Cahier des charges conforme aux normes internationales</p>
            <div className="flex space-x-8">
               <span className="text-[10px] font-black uppercase">Intervention 237</span>
               <span className="text-[10px] font-black uppercase">Support H24</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-brand-beige min-h-screen page-appear">
      {/* Editorial Header */}
      <section className="bg-white py-32 px-4 relative overflow-hidden border-b border-brand-sand">
        {/* Background Image Accent */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000" 
            alt="Expertise Technique" 
            className="w-full h-full object-cover opacity-[0.03]"
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10 animate-in fade-in duration-700">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-brand-orange/5 border border-brand-orange/20 text-brand-orange text-[10px] font-black uppercase tracking-[0.4em] mb-10 shadow-sm">
            <Zap size={14} className="animate-pulse" />
            <span>Référentiel Technique 2024</span>
          </div>
          
          <h1 className="text-5xl md:text-9xl font-black mb-10 tracking-tighter uppercase leading-[0.85] text-brand-stone">
            Nos <span className="text-brand-orange">Infrastructures</span> <br /> & Expertises.
          </h1>
          
          <p className="text-2xl text-brand-stone/50 max-w-2xl mx-auto font-bold leading-relaxed mb-12">
            Cliquez sur chaque service pour accéder au dossier technique complet et comprendre comment nous sécurisons votre croissance.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to={AppRoute.Audit} className="bg-brand-stone text-white px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-brand-orange transition-all">Lancer un Audit Global</Link>
            <Link to={AppRoute.Contact} className="bg-white border-2 border-brand-stone text-brand-stone px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-brand-stone hover:text-white transition-all shadow-xl">Contacter un Expert</Link>
          </div>
        </div>
      </section>

      {/* Main Services List */}
      <section className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {SERVICES.map((s, idx) => (
              <ServiceSection key={s.id} service={s} isReversed={idx % 2 !== 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Guarantee */}
      <section className="py-24 bg-white border-y border-brand-sand">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div>
                <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mx-auto mb-6">
                  <ShieldCheck size={32} />
                </div>
                <h4 className="text-xl font-black text-brand-stone uppercase tracking-tighter mb-4">Garantie Matérielle</h4>
                <p className="text-sm font-bold text-brand-stone/50 uppercase leading-relaxed">Remplacement immédiat des composants défectueux sous 48h sur site.</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mx-auto mb-6">
                  <Wifi size={32} />
                </div>
                <h4 className="text-xl font-black text-brand-stone uppercase tracking-tighter mb-4">SLA de Disponibilité</h4>
                <p className="text-sm font-bold text-brand-stone/50 uppercase leading-relaxed">Engagement contractuel sur un taux de disponibilité réseau de 99.5%.</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mx-auto mb-6">
                  <Rocket size={32} />
                </div>
                <h4 className="text-xl font-black text-brand-stone uppercase tracking-tighter mb-4">Evolution Modulaire</h4>
                <p className="text-sm font-bold text-brand-stone/50 uppercase leading-relaxed">Toutes nos infrastructures sont conçues pour évoluer avec votre croissance.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 bg-brand-stone text-white text-center relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Globe size={400} className="absolute -bottom-40 -left-40" />
         </div>
         <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-12 uppercase tracking-tighter leading-none">Votre business mérite <br /> une <span className="text-brand-orange">Rigueur Technique</span>.</h2>
            <Link to={AppRoute.Audit} className="bg-brand-orange text-white px-12 py-6 rounded-full font-black text-xl uppercase tracking-widest hover:bg-white hover:text-brand-stone transition-all shadow-2xl shadow-brand-orange/30 inline-flex items-center">
               Démarrer mon Diagnostic <ArrowRight className="ml-3" />
            </Link>
         </div>
      </section>
    </div>
  );
};

export default ServicesPage;
