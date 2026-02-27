import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Globe, ShieldCheck, Star, Layout, Wifi, Shield, Rocket, X, Target, Cpu, Workflow, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppRoute, Package } from '../types';
import { PACKAGES, WHATSAPP_LINK } from '../data';

// ─── 4 nouveaux packages injectés directement ───────────────────────────────
const EXTRA_PACKAGES = [
  // SÉCURITÉ 1
  {
    id: 101,
    category: 'Sécurité',
    title: 'Shield Pentest Pro',
    description: 'Audit de sécurité offensif complet : simulation d\'attaques réelles pour identifier vos vulnérabilités avant que les hackers ne le fassent.',
    price: 'À partir de 850 000 FCFA',
    isPopular: false,
    features: [
      'Test d\'intrusion externe & interne',
      'Scan de vulnérabilités applicatives (OWASP Top 10)',
      'Rapport d\'audit détaillé avec scoring CVSS',
      'Préconisations de remédiation priorisées',
      'Retest post-correction inclus',
      'Certificat d\'audit signé',
    ],
    details: {
      objective:
        'Identifier et exploiter les failles de sécurité de votre infrastructure et de vos applications avant toute attaque réelle, afin de vous permettre de corriger proactivement vos expositions critiques.',
      phases: [
        'Reconnaissance & cartographie de la surface d\'attaque',
        'Scan automatisé et analyse manuelle des vulnérabilités',
        'Exploitation contrôlée des failles identifiées',
        'Rédaction du rapport technique et exécutif',
        'Restitution orale avec l\'équipe technique',
        'Retest des correctifs appliqués',
      ],
      roi: 'Une faille non détectée peut coûter des millions en pertes de données, amendes RGPD et atteinte à la réputation. Un pentest préventif, c\'est 10x moins cher qu\'une réponse à incident.',
      target: 'PME, ETI, startups traitant des données sensibles ou soumises à des obligations de conformité',
      techStack: ['Kali Linux', 'Metasploit', 'Burp Suite', 'Nmap', 'Nessus', 'OWASP ZAP'],
      maintenance: 'Rapport valable 12 mois — retest annuel recommandé pour maintenir la conformité.',
    },
  },

  // SÉCURITÉ 2
  {
    id: 102,
    category: 'Sécurité',
    title: 'Cyber Guardian 360',
    description: 'Protection continue de votre système d\'information : surveillance 24/7, détection des menaces en temps réel et réponse aux incidents.',
    price: 'À partir de 150 000 FCFA / mois',
    isPopular: true,
    features: [
      'Surveillance SOC externalisé 24/7/365',
      'Détection et réponse aux incidents (EDR/XDR)',
      'Firewall applicatif managé (WAF)',
      'Gestion des mises à jour de sécurité',
      'Alertes temps réel et tableau de bord sécurité',
      'Rapport mensuel de posture sécurité',
    ],
    details: {
      objective:
        'Offrir à votre entreprise une couverture sécurité opérationnelle permanente sans avoir à recruter une équipe dédiée, via un SOC externalisé qui surveille, détecte et neutralise les menaces en continu.',
      phases: [
        'Inventaire et cartographie des actifs à protéger',
        'Déploiement des sondes de surveillance et agents EDR',
        'Configuration des règles de détection personnalisées',
        'Mise en place du tableau de bord de sécurité client',
        'Formation de sensibilisation des équipes',
        'Surveillance active et gestion des incidents',
      ],
      roi: 'Les entreprises équipées d\'un SOC réduisent de 74% le temps de détection d\'une intrusion et de 60% le coût moyen d\'un incident de sécurité.',
      target: 'TPE/PME sans équipe sécurité interne, secteurs santé, finance, commerce & administration',
      techStack: ['Microsoft Sentinel', 'CrowdStrike', 'Cloudflare WAF', 'Wazuh', 'PfSense', 'Grafana'],
      maintenance: 'Surveillance continue incluse — rapport mensuel de posture sécurité + réunion trimestrielle.',
    },
  },

  // DIGITAL 1
  {
    id: 103,
    category: 'Digital',
    title: 'Brand Launch Digital',
    description: 'Création et déploiement complet de votre identité de marque en ligne : identité visuelle, réseaux sociaux, contenu et stratégie de lancement.',
    price: 'À partir de 600 000 FCFA',
    isPopular: false,
    features: [
      'Création de l\'identité visuelle (logo, charte graphique)',
      'Setup & optimisation de 3 réseaux sociaux',
      'Stratégie de contenu sur 3 mois',
      'Pack de 30 visuels & templates éditoriaux',
      'Rédaction de la bio & positionnement de marque',
      'Rapport de lancement et métriques J+30',
    ],
    details: {
      objective:
        'Donner à votre marque une présence digitale cohérente, professionnelle et mémorable dès le premier jour, en unifiant identité visuelle, discours de marque et stratégie de contenu sur tous les canaux.',
      phases: [
        'Atelier de positionnement et définition de la cible',
        'Création de l\'identité visuelle et de la charte graphique',
        'Déclinaison sur les templates réseaux sociaux',
        'Setup et optimisation des profils sociaux',
        'Production du pack de contenu de lancement',
        'Publication, monitoring et rapport J+30',
      ],
      roi: 'Une marque cohérente génère jusqu\'à 23% de revenus supplémentaires. Un lancement digital structuré réduit le coût d\'acquisition client de 40% par rapport à un lancement non planifié.',
      target: 'Entrepreneurs, startups, commerçants & PME souhaitant se lancer ou se repositionner sur le digital',
      techStack: ['Figma', 'Canva Pro', 'Meta Business Suite', 'Notion', 'Buffer', 'Google Analytics'],
      maintenance: 'Livraison des assets en haute définition + 30 jours de support post-lancement inclus.',
    },
  },

  // DIGITAL 2
  {
    id: 104,
    category: 'Digital',
    title: 'Growth Ads 360',
    description: 'Gestion complète de vos campagnes publicitaires digitales sur Google et Meta pour maximiser votre retour sur investissement publicitaire.',
    price: 'À partir de 200 000 FCFA / mois',
    isPopular: false,
    features: [
      'Gestion campagnes Google Ads & Meta Ads',
      'Création des visuels et des copies publicitaires',
      'A/B testing continu des annonces',
      'Optimisation hebdomadaire du budget (ROAS)',
      'Retargeting & audiences personnalisées',
      'Rapport de performance bi-mensuel détaillé',
    ],
    details: {
      objective:
        'Maximiser votre retour sur investissement publicitaire (ROAS) en gérant vos campagnes Google et Meta de façon data-driven : ciblage précis, créatifs performants et optimisation continue du budget.',
      phases: [
        'Audit de vos campagnes existantes et définition des KPIs',
        'Recherche des audiences cibles et des mots-clés',
        'Création des créatifs publicitaires (visuels + copies)',
        'Lancement et paramétrage des campagnes',
        'Optimisation hebdomadaire et A/B testing',
        'Reporting bi-mensuel et ajustement stratégique',
      ],
      roi: 'Nos clients enregistrent en moyenne un ROAS de 4x à 7x après 90 jours d\'optimisation, avec une réduction du coût par acquisition (CPA) de 35% dès le 2ème mois.',
      target: 'E-commerce, services B2C & B2B, établissements cherchant à scaler leur acquisition client en ligne',
      techStack: ['Google Ads', 'Meta Ads Manager', 'Google Analytics 4', 'Hotjar', 'Canva Pro', 'Looker Studio'],
      maintenance: 'Optimisation hebdomadaire incluse — reporting bi-mensuel avec recommandations stratégiques.',
    },
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  'Web': <Layout className="text-brand-orange" size={32} />,
  'Infrastructure': <Wifi className="text-brand-orange" size={32} />,
  'Sécurité': <Shield className="text-brand-orange" size={32} />,
  'Digital': <Rocket className="text-brand-orange" size={32} />
};

const PackagesPage: React.FC = () => {
  const [filter, setFilter] = useState('Tous');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const categories = ['Tous', 'Web', 'Infrastructure', 'Sécurité', 'Digital'];

  // On fusionne les packages data.ts + les 4 nouveaux
  const ALL_PACKAGES = [...PACKAGES, ...EXTRA_PACKAGES] as Package[];
  const filteredPackages = filter === 'Tous'
    ? ALL_PACKAGES
    : ALL_PACKAGES.filter(p => p.category === filter);

  const closeModal = () => setSelectedPackage(null);

  return (
    <div className="bg-brand-cream min-h-screen pt-24 page-appear">
      {/* Editorial Hero */}
      <section className="bg-white py-24 px-4 relative overflow-hidden border-b border-brand-sand animate-in fade-in duration-700">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Solutions Prêtes-à-l'Emploi</span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-[0.9] text-brand-stone">
            Nos <span className="text-brand-orange">Packages</span> <br /> Stratégiques
          </h1>
          <p className="text-xl text-brand-stone/60 max-w-2xl mx-auto font-bold leading-relaxed">
            Cliquez sur un package pour découvrir le dossier de solution complet et comprendre l'impact sur votre business.
          </p>
        </div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-orange/5 blur-[120px] rounded-full"></div>
      </section>

      {/* Category Filter */}
      <section className="py-10 border-b border-brand-sand sticky top-[72px] bg-white/80 backdrop-blur-xl z-30 shadow-sm animate-in fade-in duration-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-3">
           {categories.map(c => (
             <button
               key={c}
               onClick={() => setFilter(c)}
               className={`px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all border-2 ${filter === c ? 'bg-brand-stone text-white border-brand-stone shadow-xl' : 'bg-brand-beige text-brand-stone border-brand-sand hover:border-brand-orange'}`}
             >
               {c}
             </button>
           ))}
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedPackage(p)}
                className={`bg-white rounded-[3rem] p-10 border-2 transition-all group flex flex-col relative animate-in zoom-in duration-500 cursor-pointer ${p.isPopular ? 'border-brand-orange shadow-2xl scale-105 z-10' : 'border-brand-sand hover:border-brand-orange shadow-sm hover:shadow-xl'}`}
              >
                {p.isPopular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-orange text-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-xl flex items-center space-x-2">
                    <Star size={12} fill="currentColor" />
                    <span>Recommandé</span>
                  </div>
                )}

                <div className="flex items-center justify-between mb-8">
                   <div className="p-4 bg-brand-beige rounded-2xl border border-brand-sand group-hover:bg-brand-orange group-hover:text-white transition-all">
                      {categoryIcons[p.category]}
                   </div>
                   <span className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40">{p.category}</span>
                </div>

                <h3 className="text-2xl font-black text-brand-stone uppercase tracking-tighter mb-4 leading-tight group-hover:text-brand-orange transition-colors">
                  {p.title}
                </h3>

                <p className="text-brand-stone/60 font-bold text-sm leading-relaxed mb-8">
                  {p.description}
                </p>

                <div className="mb-10 p-6 bg-brand-beige/50 rounded-2xl border border-brand-sand/50">
                   <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-orange block mb-2">Budget d'investissement</span>
                   <div className="text-xl font-black text-brand-stone tracking-tighter">{p.price}</div>
                </div>

                <div className="space-y-4 mb-12 flex-grow">
                   {p.features.slice(0, 4).map((f, i) => (
                     <div key={i} className="flex items-start space-x-3">
                        <CheckCircle2 className="text-brand-orange shrink-0 mt-0.5" size={16} />
                        <span className="text-[11px] font-black uppercase tracking-tight text-brand-stone/80">{f}</span>
                     </div>
                   ))}
                </div>

                <div className="pt-8 border-t border-brand-sand/50">
                   <span className="flex items-center justify-center text-brand-orange font-black text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                      Voir le dossier technique <ChevronRight size={14} className="ml-1" />
                   </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exhaustive Detail Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-brand-stone/90 backdrop-blur-md animate-in fade-in duration-300 overflow-hidden">
           <div className="bg-white w-full max-w-5xl rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in duration-500 border border-brand-sand">
              {/* Header */}
              <div className="bg-brand-stone p-8 sm:p-12 text-white flex justify-between items-center shrink-0 border-b-4 border-brand-orange">
                 <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-brand-orange text-white rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20 shrink-0">
                       {categoryIcons[selectedPackage.category]}
                    </div>
                    <div>
                       <div className="flex items-center space-x-3 mb-1">
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">Proposition de Solution #{selectedPackage.id}</span>
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-white/10 rounded border border-white/5">Standard 237</span>
                       </div>
                       <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-none">{selectedPackage.title}</h2>
                    </div>
                 </div>
                 <button onClick={closeModal} className="w-12 h-12 bg-white/10 hover:bg-brand-orange rounded-full flex items-center justify-center transition-all shadow-xl">
                    <X size={24} />
                 </button>
              </div>

              {/* Scrollable Report Body */}
              <div className="flex-grow overflow-y-auto p-8 sm:p-16 bg-brand-beige/20">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Main Proposal Content */}
                    <div className="lg:col-span-7 space-y-16">
                       <section>
                          <div className="flex items-center space-x-3 mb-6">
                             <Target size={24} className="text-brand-orange" />
                             <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-stone/40">01. Objectif Stratégique</h4>
                          </div>
                          <p className="text-xl text-brand-stone font-bold leading-relaxed border-l-4 border-brand-orange/30 pl-8">
                             {selectedPackage.details?.objective}
                          </p>
                       </section>

                       <section>
                          <div className="flex items-center space-x-3 mb-6">
                             <Workflow size={24} className="text-brand-orange" />
                             <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-stone/40">02. Plan de Déploiement</h4>
                          </div>
                          <div className="space-y-4">
                             {selectedPackage.details?.phases.map((phase, idx) => (
                               <div key={idx} className="flex items-center space-x-6 bg-white p-5 rounded-2xl border border-brand-sand/50 shadow-sm group hover:border-brand-orange transition-all">
                                  <div className="w-8 h-8 rounded-full bg-brand-stone text-white flex items-center justify-center font-black text-[10px] group-hover:bg-brand-orange transition-colors">
                                     {idx + 1}
                                  </div>
                                  <span className="text-[11px] font-black uppercase tracking-tight text-brand-stone/80">{phase}</span>
                               </div>
                             ))}
                          </div>
                       </section>

                       <section>
                          <div className="flex items-center space-x-3 mb-6">
                             <TrendingUp size={24} className="text-brand-orange" />
                             <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-stone/40">03. Impact & ROI</h4>
                          </div>
                          <p className="text-lg text-brand-stone/70 font-bold leading-relaxed italic bg-white p-8 rounded-[2.5rem] border border-brand-sand">
                             "{selectedPackage.details?.roi}"
                          </p>
                       </section>
                    </div>

                    {/* Sidebar Stats & Tech Column */}
                    <div className="lg:col-span-5 space-y-8">
                       <div className="bg-brand-stone p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                          <div className="absolute -top-10 -right-10 opacity-10"><Cpu size={150} /></div>
                          <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange mb-8 text-center">Spécifications du Dossier</h5>

                          <div className="space-y-8">
                             <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-3">Audience Cible</p>
                                <p className="text-sm font-black uppercase tracking-tight text-brand-sand">{selectedPackage.details?.target}</p>
                             </div>
                             <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-4">Stack Technologique</p>
                                <div className="flex flex-wrap gap-2">
                                   {selectedPackage.details?.techStack.map(s => (
                                     <span key={s} className="px-3 py-1.5 bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/5">{s}</span>
                                   ))}
                                </div>
                             </div>
                             <div className="pt-6 border-t border-white/10">
                                <p className="text-[9px] font-black uppercase tracking-widest text-brand-orange mb-2">Support & Maintenance</p>
                                <p className="text-[11px] font-bold text-white/60 uppercase leading-relaxed">{selectedPackage.details?.maintenance}</p>
                             </div>
                          </div>
                       </div>

                       <div className="p-8 border-2 border-dashed border-brand-orange/30 rounded-[2.5rem] bg-brand-orange/5">
                          <div className="flex items-center space-x-3 mb-4 text-brand-orange">
                             <ShieldCheck size={20} />
                             <span className="text-[10px] font-black uppercase tracking-[0.2em]">SLA Imani-Tech</span>
                          </div>
                          <p className="text-[11px] font-bold text-brand-stone/60 leading-relaxed uppercase">
                             Toutes nos prestations sont soumises à une garantie de performance et un audit de fin de chantier certifié.
                          </p>
                       </div>

                       <div className="bg-white p-8 rounded-[2.5rem] border border-brand-sand shadow-inner">
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-stone/40 mb-6">Inclus dans l'offre</h5>
                          <div className="space-y-3">
                             {selectedPackage.features.map((f, i) => (
                               <div key={i} className="flex items-start space-x-3">
                                  <CheckCircle2 size={14} className="text-brand-orange shrink-0 mt-0.5" />
                                  <span className="text-[10px] font-black uppercase text-brand-stone/70">{f}</span>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>

                 </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="p-8 bg-brand-beige border-t border-brand-sand flex flex-col sm:flex-row items-center justify-between gap-6 shrink-0">
                 <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-brand-stone/40 mb-1">Budget Total d'Investissement</div>
                    <div className="text-3xl font-black text-brand-stone tracking-tighter">{selectedPackage.price}</div>
                 </div>
                 <div className="flex space-x-4 w-full sm:w-auto">
                    <Link to={AppRoute.Contact} onClick={closeModal} className="flex-1 sm:flex-none bg-brand-stone text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-brand-orange transition-all text-center">
                       Signer le Contrat
                    </Link>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none bg-brand-orange text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-brand-stone transition-all shadow-xl text-center">
                       WhatsApp Expert
                    </a>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Trust & Guarantee Section */}
      <section className="py-24 bg-brand-stone text-white text-center rounded-[4rem] mx-4 sm:mx-8 mb-24 overflow-hidden relative border-y border-brand-orange/20 animate-in fade-in duration-1000">
        <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
           <Globe size={300} />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
           <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-orange text-[9px] font-black uppercase tracking-[0.2em] mb-8">
              <ShieldCheck size={12} />
              <span>Garantie Intégrale Imani-Tech</span>
           </div>
           <h2 className="text-4xl md:text-6xl font-black mb-10 uppercase tracking-tighter leading-none">Des packages pensés pour <br /> votre <span className="text-brand-orange">Rentabilité</span>.</h2>
           <p className="text-lg text-brand-sand/40 mb-12 font-bold uppercase tracking-wide">Plus qu'une facture, une étape vers votre domination de marché.</p>
           <Link to={AppRoute.Audit} className="bg-brand-orange text-white px-12 py-6 rounded-full font-black text-xl hover:bg-white hover:text-brand-stone transition-all shadow-2xl shadow-brand-orange/30 inline-flex items-center uppercase tracking-tighter">
              Ajuster mon package <ArrowRight className="ml-2" />
           </Link>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;





