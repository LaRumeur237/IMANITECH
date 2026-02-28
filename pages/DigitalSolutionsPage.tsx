
import React, { useState } from 'react';
import { Target, Zap, MessageSquare, Search, BarChart3, Settings, ChevronRight, Phone, Send, ShieldCheck, Globe, X, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';
import { DIGITAL_SERVICES, WHATSAPP_LINK } from '../data';

const iconMap: Record<string, React.ReactNode> = {
  'Target': <Target size={28} />,
  'Zap': <Zap size={28} />,
  'MessageSquare': <MessageSquare size={28} />,
  'Search': <Search size={28} />,
  'BarChart': <BarChart3 size={28} />,
  'Settings': <Settings size={28} />
};

const DigitalSolutionsPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<typeof DIGITAL_SERVICES[0] | null>(null);

  const closeModal = () => setSelectedService(null);

  return (
    <div className="bg-brand-beige min-h-screen page-appear">
      {/* Editorial Hero */}
      <section className="bg-white py-32 px-4 relative overflow-hidden border-b border-brand-sand animate-in fade-in duration-700">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Acquisition & Performance</span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 uppercase tracking-tighter leading-[0.9] text-brand-stone">Solutions <br /><span className="text-brand-orange">Digitales</span></h1>
          <p className="text-xl text-brand-stone/60 max-w-2xl mx-auto font-bold leading-relaxed">
            Cliquez sur nos services pour explorer comment nous bâtissons des moteurs de croissance qui dominent le marché camerounais.
          </p>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-orange/5 blur-[120px] rounded-full"></div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {DIGITAL_SERVICES.map((service, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedService(service)}
                className="bg-white rounded-[3rem] border border-brand-sand hover:border-brand-orange transition-all group flex flex-col shadow-sm hover:shadow-2xl hover:-translate-y-2 duration-500 cursor-pointer overflow-hidden animate-in zoom-in duration-500"
              >
                {/* Illustrative Image */}
                <div className="h-56 relative overflow-hidden">
                   <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                   <div className="absolute top-6 left-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-brand-orange shadow-lg border border-white/50">
                     {iconMap[service.iconName]}
                   </div>
                </div>

                <div className="p-10 pt-4 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-brand-stone uppercase tracking-tighter mb-4 group-hover:text-brand-orange transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-brand-stone/60 font-bold text-sm leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>

                  <div className="mb-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange border-b-2 border-brand-orange/20 pb-1">Explorer la stratégie</span>
                  </div>
                  
                  <div className="space-y-3 pt-6 border-t border-brand-sand/50" onClick={(e) => e.stopPropagation()}>
                    <Link 
                      to={AppRoute.Contact} 
                      className="flex items-center justify-between w-full bg-brand-stone text-white px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-all"
                    >
                      <span>Demander un devis</span>
                      <Send size={14} />
                    </Link>
                    <a 
                      href={WHATSAPP_LINK} 
                      target="_blank" 
                      className="flex items-center justify-between w-full bg-brand-beige text-brand-stone border border-brand-sand px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all"
                    >
                      <span>Parler à un consultant</span>
                      <Phone size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-brand-stone/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl relative overflow-hidden animate-in zoom-in duration-500 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={closeModal}
              className="absolute top-8 right-8 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-brand-stone hover:bg-brand-orange hover:text-white transition-all z-20 shadow-xl border border-white/50"
            >
              <X size={24} />
            </button>

            {/* Modal Image Header */}
            <div className="h-64 relative">
               <img 
                 src={selectedService.imageUrl} 
                 alt={selectedService.title} 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
               <div className="absolute -bottom-8 left-12 w-20 h-20 bg-brand-orange text-white rounded-[2rem] flex items-center justify-center shadow-2xl border-4 border-white">
                 {iconMap[selectedService.iconName]}
               </div>
            </div>

            <div className="p-10 sm:p-16 pt-16">
              <h2 className="text-4xl sm:text-5xl font-black text-brand-stone uppercase tracking-tighter leading-none mb-6">
                {selectedService.title}
              </h2>

              <p className="text-xl text-brand-stone/70 font-bold leading-relaxed mb-10">
                {selectedService.details}
              </p>

              <div className="space-y-6 mb-12">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">Inclus dans la stratégie :</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedService.points?.map((point, i) => (
                    <div key={i} className="flex items-start space-x-3 bg-brand-beige/50 p-4 rounded-2xl border border-brand-sand/50">
                      <CheckCircle2 className="text-brand-orange shrink-0 mt-0.5" size={18} />
                      <span className="text-[11px] font-black uppercase tracking-tight text-brand-stone/80">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-10 border-t border-brand-sand/40">
                <Link 
                  to={AppRoute.Contact} 
                  onClick={closeModal}
                  className="flex-1 bg-brand-stone text-white text-center py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-orange transition-all shadow-xl shadow-brand-stone/20"
                >
                  Démarrer mon projet
                </Link>
                <a 
                  href={WHATSAPP_LINK} 
                  target="_blank" 
                  className="flex-1 bg-brand-orange text-white text-center py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-stone transition-all shadow-xl shadow-brand-orange/20"
                >
                  Besoin d'infos ?
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Proof Section */}
      <section className="py-24 bg-brand-stone text-white overflow-hidden relative border-y border-brand-orange/20 mx-4 sm:mx-8 rounded-[4rem] mb-24 animate-in fade-in duration-1000">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 right-0 p-20"><Globe size={300} /></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
           <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-orange text-[9px] font-black uppercase tracking-[0.2em] mb-8">
              <ShieldCheck size={12} />
              <span>Standard de Qualité Imani</span>
           </div>
           <h2 className="text-4xl md:text-6xl font-black mb-10 uppercase tracking-tighter leading-none">Votre business mérite une <br /> <span className="text-brand-orange">infrastructure d'élite</span>.</h2>
           <p className="text-lg text-brand-sand/40 mb-12 font-bold uppercase tracking-wide">Chaque seconde sans optimisation est un client perdu pour vos concurrents.</p>
           <Link to={AppRoute.Audit} className="bg-brand-orange text-white px-12 py-6 rounded-full font-black text-xl hover:bg-white hover:text-brand-stone transition-all shadow-2xl shadow-brand-orange/30 inline-flex items-center uppercase tracking-tighter">
              Lancer mon Diagnostic <ChevronRight className="ml-2" />
           </Link>
        </div>
      </section>
    </div>
  );
};

export default DigitalSolutionsPage;
