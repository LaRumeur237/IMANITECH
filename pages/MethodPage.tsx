
import React from 'react';
import { Target, Search, Rocket, BarChart, Settings, Check, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';

const MethodPage: React.FC = () => {
  const steps = [
    {
      title: "Audit Stratégique",
      desc: "Analyse chirurgicale de votre écosystème actuel, benchmark concurrentiel et identification des leviers de croissance immédiats.",
      icon: <Search size={32} />
    },
    {
      title: "Architecture Digitale",
      desc: "Conception sur-mesure de votre tunnel d'acquisition : UX conversion, structure technique et intégration des outils de tracking.",
      icon: <Settings size={32} />
    },
    {
      title: "Acquisition & Lancement",
      desc: "Déploiement des campagnes publicitaires sur les plateformes dominantes au Cameroun avec un ciblage ethnographique précis.",
      icon: <Rocket size={32} />
    },
    {
      title: "Automatisation",
      desc: "Mise en place de systèmes WhatsApp Business intelligents et de CRM pour ne perdre aucun lead qualifié.",
      icon: <Target size={32} />
    },
    {
      title: "Optimisation Continue",
      desc: "Suivi des KPI, A/B testing constant et mise à l'échelle des stratégies les plus rentables pour maximiser votre ROI.",
      icon: <BarChart size={32} />
    }
  ];

  return (
    <div className="bg-brand-cream min-h-screen page-appear">
      <section className="bg-brand-beige py-32 px-4 border-b border-brand-sand relative overflow-hidden animate-in fade-in duration-700">
        <div className="max-w-7xl mx-auto text-center relative z-10">
           <span className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Processus ROI-Focus</span>
           <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-[0.9] text-brand-stone">La Méthode <br /><span className="text-brand-orange">Imani</span>-Tech</h1>
           <p className="text-xl text-brand-stone/60 max-w-2xl mx-auto font-bold">
             Une approche rigoureuse en 5 étapes pour transformer chaque franc investi en résultat mesurable sur le terrain.
           </p>
           <div className="mt-12 animate-bounce">
              <ChevronDown className="mx-auto text-brand-orange" size={32} />
           </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative">
             {/* Vertical Line */}
             <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-brand-sand hidden md:block"></div>
             
             <div className="space-y-24">
                {steps.map((step, idx) => (
                  <div key={idx} className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'} animate-in fade-in zoom-in duration-700`}>
                    {/* Circle on line */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-brand-stone border-4 border-brand-beige z-10 hidden md:block flex items-center justify-center font-black text-white text-xs">
                      {idx + 1}
                    </div>
                    
                    <div className="w-full md:w-1/2 p-4">
                       <div className={`p-10 bg-white rounded-[2.5rem] border border-brand-sand shadow-2xl hover:shadow-brand-orange/5 transition-all duration-500 group ${idx % 2 === 0 ? 'md:mr-16' : 'md:ml-16'}`}>
                          <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mb-8 group-hover:bg-brand-orange group-hover:text-white transition-all">
                            {step.icon}
                          </div>
                          <h3 className="text-2xl font-black text-brand-stone mb-4 uppercase tracking-tight">{step.title}</h3>
                          <p className="text-brand-stone/60 leading-relaxed text-lg font-bold">{step.desc}</p>
                       </div>
                    </div>
                    <div className="w-full md:w-1/2"></div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-stone text-white animate-in fade-in duration-1000">
        <div className="max-w-5xl mx-auto px-6 text-center">
           <h2 className="text-4xl md:text-6xl font-black mb-12 uppercase tracking-tighter">Pourquoi ça fonctionne ?</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {[
                "Analyse comportementale du consommateur camerounais.",
                "Zéro 'Vanity Metrics' : Seul le ROI compte.",
                "Data-Science appliquée à chaque tunnel de vente.",
                "Reporting transparent en temps réel 24/7."
              ].map((t, i) => (
                <div key={i} className="flex items-center space-x-5 bg-white/5 p-8 rounded-3xl border border-white/10 group hover:border-brand-orange transition-all animate-in zoom-in duration-500">
                   <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center shrink-0 shadow-lg shadow-brand-orange/20">
                    <Check className="text-white" size={20} />
                   </div>
                   <span className="font-bold text-lg leading-tight uppercase tracking-tight">{t}</span>
                </div>
              ))}
           </div>
           <div className="mt-20">
             <Link to={AppRoute.Audit} className="bg-brand-orange text-white px-12 py-6 rounded-full font-black text-xl hover:bg-white hover:text-brand-stone transition-all shadow-2xl shadow-brand-orange/20 uppercase tracking-tighter inline-block">
               Tester notre approche
             </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default MethodPage;





