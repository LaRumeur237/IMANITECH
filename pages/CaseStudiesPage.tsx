
import React, { useState } from 'react';
import { Filter, ArrowUpRight, TrendingUp, CheckCircle, Globe, X, MapPin, Zap, Info, ShieldCheck } from 'lucide-react';
import { CASE_STUDIES, SITE_NAME, WHATSAPP_LINK } from '../data';
import { Link } from 'react-router-dom';
import { AppRoute, CaseStudy } from '../types';

const CaseStudiesPage: React.FC = () => {
  const [filter, setFilter] = useState('Tous');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  
  const industries = ['Tous', 'PME', 'Santé', 'Hôtellerie', 'Logistique', 'Industrie', 'Immobilier', 'Éducation'];
  
  const filteredCases = filter === 'Tous' ? CASE_STUDIES : CASE_STUDIES.filter(c => c.category === filter);

  return (
    <div className="bg-brand-cream min-h-screen pt-24">
      {/* Editorial Hero */}
      <section className="bg-brand-beige py-24 px-4 relative overflow-hidden border-b border-brand-sand">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10 animate-in fade-in duration-700">
          <span className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Preuve par le Résultat</span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-[0.9] text-brand-stone">
            Nos <br className="hidden sm:block" /> <span className="text-brand-orange">Réalisations</span>
          </h1>
          <p className="text-xl text-brand-stone/60 max-w-2xl mx-auto font-bold leading-relaxed">
            Découvrez 10 projets stratégiques où {SITE_NAME} a transformé des défis critiques en succès technologiques mesurables au Cameroun.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-10 border-b border-brand-sand sticky top-[72px] bg-brand-cream/80 backdrop-blur-xl z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-3">
           {industries.map(i => (
             <button 
               key={i} 
               onClick={() => setFilter(i)}
               className={`px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all border-2 ${filter === i ? 'bg-brand-stone text-white border-brand-stone shadow-xl' : 'bg-white text-brand-stone border-brand-sand hover:border-brand-orange'}`}
             >
               {i}
             </button>
           ))}
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {filteredCases.map((c, idx) => (
              <div 
                key={c.id} 
                onClick={() => setSelectedCase(c)}
                className="group cursor-pointer animate-in fade-in slide-in-from-bottom duration-700"
              >
                 <div className="aspect-[16/9] rounded-[3.5rem] overflow-hidden mb-10 shadow-2xl relative border-8 border-white group-hover:border-brand-orange/20 transition-all">
                    <img src={c.imageUrl} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-stone/90 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute top-6 left-6">
                       <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl flex items-center space-x-2 text-brand-stone shadow-lg border border-white/50">
                          <MapPin size={14} className="text-brand-orange" />
                          <span className="text-[10px] font-black uppercase tracking-widest">{c.location}</span>
                       </div>
                    </div>
                    <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                       <div className="bg-brand-orange text-white p-6 rounded-3xl shadow-2xl flex items-center space-x-4 backdrop-blur-md">
                          <TrendingUp size={24} />
                          <div>
                            <span className="text-xl font-black block leading-none">{c.results}</span>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80">Impact Direct</span>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="px-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">{c.category}</span>
                      <div className="h-px bg-brand-sand flex-grow"></div>
                    </div>
                    <h3 className="text-3xl font-black text-brand-stone mb-6 tracking-tighter uppercase leading-tight group-hover:text-brand-orange transition-colors">{c.title}</h3>
                    <p className="text-brand-stone/60 text-lg mb-10 leading-relaxed font-bold">{c.description}</p>
                    <button className="flex items-center text-brand-stone font-black text-[11px] uppercase tracking-widest group-hover:text-brand-orange transition-all border-b-2 border-brand-sand pb-2">
                       Voir le rapport détaillé <Info className="ml-3 group-hover:rotate-12 transition-transform" size={16} />
                    </button>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Modal (Word Office Report Style) */}
      {selectedCase && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-brand-stone/80 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in duration-500 border border-brand-sand">
              {/* Header */}
              <div className="bg-brand-stone p-8 text-white flex justify-between items-center shrink-0">
                 <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center shadow-lg shadow-brand-orange/20">
                       <Zap size={24} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">Rapport d'Expertise Technique</p>
                       <h2 className="text-2xl font-black uppercase tracking-tighter">{selectedCase.title}</h2>
                    </div>
                 </div>
                 <button 
                  onClick={() => setSelectedCase(null)}
                  className="w-12 h-12 bg-white/10 hover:bg-brand-orange rounded-full flex items-center justify-center transition-all"
                 >
                    <X size={24} />
                 </button>
              </div>

              {/* Content - Report Layout */}
              <div className="flex-grow overflow-y-auto p-10 sm:p-16">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Report Column */}
                    <div className="lg:col-span-8 space-y-12">
                       <section>
                          <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-orange mb-6 flex items-center">
                            <span className="w-8 h-px bg-brand-orange mr-4"></span> 01. Challenge Client
                          </h4>
                          <p className="text-xl text-brand-stone font-bold leading-relaxed italic border-l-4 border-brand-sand pl-8">
                            "{selectedCase.challenge}"
                          </p>
                       </section>

                       <section>
                          <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-orange mb-6 flex items-center">
                            <span className="w-8 h-px bg-brand-orange mr-4"></span> 02. Solution Déployée
                          </h4>
                          <p className="text-lg text-brand-stone/70 leading-relaxed font-bold">
                            {selectedCase.solution}
                          </p>
                       </section>

                       <section>
                          <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-orange mb-6 flex items-center">
                            <span className="w-8 h-px bg-brand-orange mr-4"></span> 03. Stack Technologique
                          </h4>
                          <div className="flex flex-wrap gap-3">
                             {selectedCase.techStack.map(tech => (
                               <span key={tech} className="bg-brand-beige border border-brand-sand px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest text-brand-stone">
                                  {tech}
                               </span>
                             ))}
                          </div>
                       </section>
                    </div>

                    {/* Sidebar Stats Column */}
                    <div className="lg:col-span-4 space-y-8">
                       <div className="bg-brand-beige/50 p-8 rounded-3xl border border-brand-sand/50">
                          <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-stone/40 mb-6">Fiche Projet</h5>
                          <div className="space-y-6">
                             <div>
                                <p className="text-[9px] font-black text-brand-orange uppercase mb-1">Localisation</p>
                                <p className="text-sm font-black text-brand-stone uppercase">{selectedCase.location}, Cameroun</p>
                             </div>
                             <div>
                                <p className="text-[9px] font-black text-brand-orange uppercase mb-1">Impact Mesuré</p>
                                <p className="text-sm font-black text-brand-stone uppercase">{selectedCase.results}</p>
                             </div>
                             <div>
                                <p className="text-[9px] font-black text-brand-orange uppercase mb-1">Partenaire</p>
                                <p className="text-sm font-black text-brand-stone uppercase">Imani-Tech Solutions</p>
                             </div>
                          </div>
                       </div>
                       
                       <div className="bg-brand-orange/5 p-8 rounded-3xl border border-brand-orange/20">
                          <div className="flex items-center space-x-3 text-brand-orange mb-4">
                             <ShieldCheck size={20} />
                             <span className="text-[10px] font-black uppercase tracking-widest">Garantie Qualité</span>
                          </div>
                          <p className="text-[11px] font-black text-brand-stone/60 leading-relaxed uppercase">
                            Ce projet a été validé selon les normes internationales de sécurité IT et performance digitale.
                          </p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Footer CTA */}
              <div className="bg-brand-beige p-8 border-t border-brand-sand flex flex-col sm:flex-row items-center justify-between gap-6 shrink-0">
                 <p className="text-xs font-black uppercase tracking-widest text-brand-stone/40">Vous visez un résultat similaire ?</p>
                 <div className="flex space-x-4">
                    <Link to={AppRoute.Audit} onClick={() => setSelectedCase(null)} className="bg-brand-stone text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-brand-orange transition-all">
                       Réservez un Audit
                    </Link>
                    <a href={WHATSAPP_LINK} target="_blank" className="bg-white text-brand-stone border border-brand-sand px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-stone hover:text-white transition-all">
                       Expert WhatsApp
                    </a>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-brand-stone text-white text-center rounded-[4rem] mx-4 sm:mx-8 mb-24 overflow-hidden relative border-y border-brand-orange/20">
        <div className="absolute top-0 left-0 p-20 opacity-10 pointer-events-none">
           <Globe size={300} />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
           <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter leading-tight">Visez le même impact <br /> pour votre business.</h2>
           <p className="text-xl text-brand-sand/40 mb-12 max-w-2xl mx-auto font-bold uppercase tracking-tight">Chaque projet est unique. Chaque succès est planifié.</p>
           <Link to={AppRoute.Audit} className="bg-brand-orange text-white px-12 py-6 rounded-full font-black text-xl hover:bg-white hover:text-brand-stone transition-all shadow-2xl shadow-brand-orange/20 inline-block uppercase tracking-tighter">
             Planifier ma Croissance
           </Link>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;


