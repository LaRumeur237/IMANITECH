
import React from 'react';
import { Target, Users, Shield, Award, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';
/*import imanevideo from '../video/IMANI.mp4';*/
import { SITE_NAME } from '../data';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-brand-cream min-h-screen">
       {/* Hero Editorial */}
       <section className="pt-40 pb-24 bg-brand-beige border-b border-brand-sand overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
             <div className="animate-in slide-in-from-left duration-1000">
                <span className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Notre Vision Business</span>
                <h1 className="text-5xl md:text-8xl font-black text-brand-stone mb-10 leading-[0.9] tracking-tighter uppercase">
                   L'Agence Élite pour les <span className="text-brand-orange">Bâtisseurs</span>.
                </h1>
                <p className="text-xl text-brand-stone/60 mb-12 leading-relaxed font-bold">
                   {SITE_NAME} est née d'un constat radical : les entreprises camerounaises méritent des stratégies d'acquisition de classe mondiale adaptées aux réalités du triangle national.
                </p>
                <div className="grid grid-cols-2 gap-12">
                   <div>
                      <h4 className="text-4xl font-black text-brand-orange mb-2 font-mono">10+</h4>
                      <p className="text-brand-stone/40 font-black uppercase tracking-[0.2em] text-[10px]">Villes Actives 237</p>
                   </div>
                   <div>
                      <h4 className="text-4xl font-black text-brand-orange mb-2 font-mono">90%</h4>
                      <p className="text-brand-stone/40 font-black uppercase tracking-[0.2em] text-[10px]">Taux de Rétention</p>
                   </div>
                </div>
             </div>
             <div className="relative animate-in zoom-in duration-1000">
                <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white">
                   <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" alt="L'équipe Imani-Tech" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-12 -left-12 bg-white p-12 rounded-[3rem] shadow-2xl hidden lg:block border border-brand-sand max-w-sm">
                   <div className="text-brand-stone font-bold italic text-lg leading-tight mb-6">"Nous construisons le pont numérique entre votre ambition et vos futurs clients."</div>
                   <div className="font-black text-brand-orange uppercase text-xs tracking-widest">— Leadership Imani-Tech</div>
                </div>
             </div>
          </div>
          <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
            <Award size={400} className="text-brand-stone" />
          </div>
       </section>

       {/* Values Grid */}
       <section className="py-32">
          <div className="max-w-7xl mx-auto px-4">
             <div className="text-center mb-24">
                <h2 className="text-4xl md:text-6xl font-black text-brand-stone uppercase tracking-tighter">Nos Fondations</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { title: "Résultat Pur", icon: <Target />, desc: "Nous détestons les 'vanity metrics'. Seul le chiffre d'affaires généré pour vous compte." },
                  { title: "Impact Local", icon: <Globe />, desc: "Nos stratégies sont ancrées dans la psychologie réelle du consommateur camerounais." },
                  { title: "Vitesse Critique", icon: <Zap />, desc: "Dans le digital, la vitesse est une arme. Nous exécutons avec une précision chirurgicale." }
                ].map((v, i) => (
                  <div key={i} className="bg-white p-12 rounded-[3rem] border border-brand-sand hover:border-brand-orange transition-all group shadow-xl hover:shadow-brand-orange/5">
                     <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mb-8 group-hover:bg-brand-orange group-hover:text-white transition-all shadow-sm">
                        {v.icon}
                     </div>
                     <h3 className="text-2xl font-black text-brand-stone mb-6 uppercase tracking-tight">{v.title}</h3>
                     <p className="text-brand-stone/60 font-bold leading-relaxed">{v.desc}</p>
                  </div>
                ))}
             </div>
          </div>
       </section>

       {/* Final Call */}
      <section className="py-24 bg-brand-orange text-white text-center">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-4xl md:text-7xl font-black mb-10 uppercase tracking-tighter leading-none">
      Prêt à écrire votre <br /> succès avec nous ?
    </h2>

    <video
      className="w-1/2 mx-auto rounded-2xl mb-10 shadow-2xl"
      src='../video/IMANI.mp4'
      autoPlay
      muted
      loop
      playsInline
    />

    <Link
      to={AppRoute.Contact}
      className="bg-brand-stone text-white px-12 py-6 rounded-full font-black text-xl hover:bg-white hover:text-brand-stone transition-all shadow-2xl shadow-brand-stone/20 uppercase tracking-tighter inline-block"
    >
      Démarrer l'Aventure
    </Link>
  </div>
</section>
    </div>
  );
};

export default AboutPage;
