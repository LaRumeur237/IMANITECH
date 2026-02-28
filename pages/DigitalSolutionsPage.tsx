import React, { useState } from 'react';
import { Target, Zap, MessageSquare, Search, BarChart3, Settings, ChevronRight, Phone, Send, ShieldCheck, Globe, X, CheckCircle2, TrendingUp, Cpu, Layout, Workflow, Rocket, PenTool, Smartphone, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';
import { DIGITAL_SERVICES, WHATSAPP_LINK } from '../data';

const iconMap: Record<string, React.ReactNode> = {
  'Target': <Target size={28} />,
  'Zap': <Zap size={28} />,
  'MessageSquare': <MessageSquare size={28} />,
  'Search': <Search size={28} />,
  'BarChart3': <BarChart3 size={28} />,
  'Settings': <Settings size={28} />,
  'Rocket': <Rocket size={28} />,
  'Workflow': <Workflow size={28} />,
  'PenTool': <PenTool size={28} />,
  'Smartphone': <Smartphone size={28} />,
  'ShieldCheck': <ShieldCheck size={28} />,
  'Globe': <Globe size={28} />,
  'Database': <Database size={28} />
};

const DigitalSolutionsPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<any | null>(null);

  const closeModal = () => setSelectedService(null);

  return (
    <div className="bg-brand-beige min-h-screen page-appear">
      {/* Editorial Hero */}
      <section className="bg-white py-32 px-4 relative overflow-hidden border-b border-brand-sand animate-in fade-in duration-700">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Acquisition & Performance Digitale</span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 uppercase tracking-tighter leading-[0.9] text-brand-stone">Expertises <br /><span className="text-brand-orange">Digitales</span></h1>
          <p className="text-xl text-brand-stone/60 max-w-2xl mx-auto font-bold leading-relaxed">
            Moteurs de croissance pour PME leaders. Cliquez sur un dossier pour explorer nos stratégies d'acquisition et de scaling.
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
                <div className="h-64 relative overflow-hidden">
                   <img loading="lazy" 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                   <div className="absolute top-6 left-6 w-14 h-14 bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-center text-brand-orange shadow-lg border border-white/50">
                     {iconMap[service.iconName] || <Zap size={28} />}
                   </div>
                   {service.kpi && (
                     <div className="absolute bottom-6 left-6 bg-brand-orange text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
                       {service.kpi}
                     </div>
                   )}
                </div>

                <div className="p-10 pt-4 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-brand-stone uppercase tracking-tighter mb-4 group-hover:text-brand-orange transition-colors min-h-[64px] flex items-center">
                    {service.title}
                  </h3>
                  
                  <p className="text-brand-stone/60 font-bold text-sm leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>

                  <div className="mb-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange border-b-2 border-brand-orange/20 pb-1 flex items-center">
                      Voir le Blueprint Stratégique <ChevronRight size={14} className="ml-1" />
                    </span>
                  </div>
                  
                  <div className="space-y-3 pt-6 border-t border-brand-sand/50" onClick={(e) => e.stopPropagation()}>
                    <Link 
                      to={AppRoute.Contact} 
                      className="flex items-center justify-between w-full bg-brand-stone text-white px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-all"
                    >
                      <span>Lancer le projet</span>
                      <Send size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal - Blueprint Style */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-brand-stone/80 backdrop-blur-md animate-in fade-in duration-300 overflow-hidden">
          <div className="bg-white w-full max-w-5xl rounded-[3.5rem] shadow-2xl relative overflow-hidden animate-in zoom-in duration-500 max-h-[95vh] flex flex-col border border-brand-sand">
            
            {/* Modal Header */}
            <div className="bg-brand-stone p-8 sm:p-12 text-white flex justify-between items-center shrink-0 border-b-4 border-brand-orange">
               <div className="flex items-center space-x-6">
                 <div className="w-16 h-16 bg-brand-orange text-white rounded-[1.5rem] flex items-center justify-center shadow-xl border-4 border-white/10 shrink-0">
                    {iconMap[selectedService.iconName] || <Zap size={28} />}
                 </div>
                 <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">Dossier de Solution #{selectedService.id.toUpperCase()}</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-none">
                      {selectedService.title}
                    </h2>
                 </div>
               </div>
               <button 
                onClick={closeModal}
                className="w-14 h-14 bg-white/10 hover:bg-brand-orange rounded-full flex items-center justify-center text-white transition-all z-20 shadow-xl"
              >
                <X size={28} />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="flex-grow overflow-y-auto p-8 sm:p-16 bg-brand-beige/20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                {/* Left Column: Strategic Content */}
                <div className="lg:col-span-7 space-y-12">
                   <section>
                      <div className="flex items-center space-x-3 mb-6">
                        <TrendingUp size={24} className="text-brand-orange" />
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-stone/40">Objectif Business</h4>
                      </div>
                      <p className="text-xl text-brand-stone font-bold leading-relaxed border-l-4 border-brand-orange/30 pl-8">
                        {selectedService.details}
                      </p>
                   </section>

                   <section className="bg-white p-8 rounded-[2.5rem] border border-brand-sand shadow-inner">
                      <div className="flex items-center space-x-3 mb-6">
                        <Layout size={24} className="text-brand-orange" />
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-stone/40">Méthodologie</h4>
                      </div>
                      <p className="text-brand-stone/70 font-bold leading-relaxed italic">
                        {selectedService.approach}
                      </p>
                   </section>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {selectedService.points?.map((point: string, i: number) => (
                        <div key={i} className="flex items-start space-x-4 p-5 bg-white border border-brand-sand rounded-2xl group hover:border-brand-orange transition-all">
                          <CheckCircle2 className="text-brand-orange shrink-0 mt-0.5" size={20} />
                          <span className="text-[11px] font-black uppercase tracking-tight text-brand-stone/80">{point}</span>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Right Column: KPIs & Stack */}
                <div className="lg:col-span-5 space-y-8">
                   <div className="bg-brand-stone p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 opacity-10"><Cpu size={150} /></div>
                      <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange mb-8 text-center">Rapport de Performance</h5>
                      <div className="space-y-8">
                         <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2">KPI Ciblé</p>
                            <div className="text-4xl font-black tracking-tighter text-brand-orange">{selectedService.kpi}</div>
                         </div>
                         <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-4">Technologies Clés</p>
                            <div className="flex flex-wrap gap-2">
                               {selectedService.stack?.map((s: string) => (
                                 <span key={s} className="px-3 py-1.5 bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/5">{s}</span>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="p-8 border-2 border-dashed border-brand-orange/20 rounded-[2.5rem] bg-brand-orange/5">
                      <div className="flex items-center space-x-3 mb-4 text-brand-orange">
                         <ShieldCheck size={20} />
                         <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sécurité & Conformité</span>
                      </div>
                      <p className="text-[11px] font-bold text-brand-stone/60 leading-relaxed uppercase">
                        Déploiement certifié conforme aux protocoles de tracking 2024. Audit de confidentialité inclus systématiquement.
                      </p>
                   </div>
                </div>

              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="p-8 bg-brand-beige border-t border-brand-sand flex flex-col sm:flex-row items-center justify-between gap-6 shrink-0">
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-stone/40 mb-1">Délai d'activation estimé</p>
                  <p className="text-lg font-black text-brand-stone">7 à 14 Jours ouvrés</p>
               </div>
               <div className="flex space-x-4 w-full sm:w-auto">
                  <Link to={AppRoute.Audit} onClick={closeModal} className="flex-1 sm:flex-none bg-brand-stone text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-brand-orange transition-all text-center">
                     Réclamer mon Audit
                  </Link>
                  <a href={WHATSAPP_LINK} target="_blank" className="flex-1 sm:flex-none bg-brand-orange text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-brand-stone transition-all shadow-xl text-center">
                     WhatsApp Expert
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
              <span>Standard Élite Imani-Tech</span>
           </div>
           <h2 className="text-4xl md:text-6xl font-black mb-10 uppercase tracking-tighter leading-none">Passez de PME à <br /> <span className="text-brand-orange">Leader National</span>.</h2>
           <p className="text-lg text-brand-sand/40 mb-12 font-bold uppercase tracking-wide">La technologie ne doit pas être un coût, mais votre moteur de croissance.</p>
           <Link to={AppRoute.Audit} className="bg-brand-orange text-white px-12 py-6 rounded-full font-black text-xl hover:bg-white hover:text-brand-stone transition-all shadow-2xl shadow-brand-orange/30 inline-flex items-center uppercase tracking-tighter">
              Démarrer le Scaling <ChevronRight className="ml-2" />
           </Link>
        </div>
      </section>
    </div>
  );
};

export default DigitalSolutionsPage;





