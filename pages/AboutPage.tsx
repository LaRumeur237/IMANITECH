import React from 'react';
import { Target, Users, Shield, Award, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';
import { SITE_NAME } from '../data';

// ─── Illustration technique SVG inline ───────────────────────────────────────
const TechIllustration: React.FC = () => (
  <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white relative bg-brand-stone">
    <svg
      viewBox="0 0 400 500"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
    >
      {/* Grille de fond */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,107,53,0.08)" strokeWidth="0.5"/>
        </pattern>
        <radialGradient id="glow1" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="glow2" cx="80%" cy="70%" r="40%">
          <stop offset="0%" stopColor="#4fc3f7" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
        </radialGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="2"/>
        </filter>
      </defs>

      <rect width="400" height="500" fill="url(#grid)"/>
      <rect width="400" height="500" fill="url(#glow1)"/>
      <rect width="400" height="500" fill="url(#glow2)"/>

      {/* --- Lignes de connexion réseau --- */}
      <g opacity="0.3" stroke="#ff6b35" strokeWidth="1" fill="none">
        <line x1="200" y1="120" x2="100" y2="220">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite"/>
        </line>
        <line x1="200" y1="120" x2="300" y2="220">
          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite"/>
        </line>
        <line x1="100" y1="220" x2="60" y2="330">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite"/>
        </line>
        <line x1="100" y1="220" x2="160" y2="340">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.5s" repeatCount="indefinite"/>
        </line>
        <line x1="300" y1="220" x2="340" y2="330">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3.5s" repeatCount="indefinite"/>
        </line>
        <line x1="300" y1="220" x2="240" y2="340">
          <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite"/>
        </line>
        {/* lignes vers le bas */}
        <line x1="60" y1="330" x2="40" y2="430" opacity="0.4"/>
        <line x1="60" y1="330" x2="100" y2="430" opacity="0.4"/>
        <line x1="160" y1="340" x2="130" y2="430" opacity="0.4"/>
        <line x1="240" y1="340" x2="270" y2="430" opacity="0.4"/>
        <line x1="340" y1="330" x2="310" y2="430" opacity="0.4"/>
        <line x1="340" y1="330" x2="360" y2="430" opacity="0.4"/>
      </g>

      {/* --- Particules voyageuses sur les lignes --- */}
      <circle r="3" fill="#ff6b35" opacity="0.9">
        <animateMotion dur="2s" repeatCount="indefinite">
          <mpath href="#path1"/>
        </animateMotion>
      </circle>
      <path id="path1" d="M 200 120 L 300 220 L 340 330" fill="none"/>

      <circle r="2.5" fill="#4fc3f7" opacity="0.8">
        <animateMotion dur="3s" repeatCount="indefinite">
          <mpath href="#path2"/>
        </animateMotion>
      </circle>
      <path id="path2" d="M 200 120 L 100 220 L 60 330 L 40 430" fill="none"/>

      <circle r="2" fill="#ff6b35" opacity="0.7">
        <animateMotion dur="2.5s" repeatCount="indefinite" begin="1s">
          <mpath href="#path3"/>
        </animateMotion>
      </circle>
      <path id="path3" d="M 200 120 L 300 220 L 240 340 L 270 430" fill="none"/>

      {/* --- Noeud central (Serveur principal) --- */}
      <g transform="translate(200,120)">
        <circle r="36" fill="#ff6b35" opacity="0.15"/>
        <circle r="28" fill="#ff6b35" opacity="0.2"/>
        <rect x="-20" y="-20" width="40" height="40" rx="8" fill="#ff6b35">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
        </rect>
        {/* icône serveur */}
        <rect x="-12" y="-14" width="24" height="7" rx="2" fill="white" opacity="0.9"/>
        <rect x="-12" y="-4" width="24" height="7" rx="2" fill="white" opacity="0.7"/>
        <rect x="-12" y="6" width="24" height="7" rx="2" fill="white" opacity="0.5"/>
        <circle cx="8" cy="-10.5" r="2" fill="#4fc3f7"/>
        <circle cx="8" cy="-0.5" r="2" fill="#4fc3f7">
          <animate attributeName="fill" values="#4fc3f7;#ff6b35;#4fc3f7" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <text x="0" y="52" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" fontWeight="bold" opacity="0.7">SERVEUR PRINCIPAL</text>
      </g>

      {/* --- Noeud Switch L2 gauche --- */}
      <g transform="translate(100,220)">
        <circle r="22" fill="#1a1a2e" stroke="#ff6b35" strokeWidth="1.5"/>
        <rect x="-12" y="-8" width="24" height="16" rx="4" fill="#ff6b35" opacity="0.8"/>
        <rect x="-8" y="-4" width="16" height="3" rx="1" fill="white" opacity="0.8"/>
        <rect x="-8" y="1" width="16" height="3" rx="1" fill="white" opacity="0.5"/>
        <text x="0" y="36" textAnchor="middle" fill="#ff6b35" fontSize="7" fontFamily="monospace" fontWeight="bold">SWITCH L2</text>
      </g>

      {/* --- Noeud Switch L2 droit --- */}
      <g transform="translate(300,220)">
        <circle r="22" fill="#1a1a2e" stroke="#ff6b35" strokeWidth="1.5"/>
        <rect x="-12" y="-8" width="24" height="16" rx="4" fill="#ff6b35" opacity="0.8"/>
        <rect x="-8" y="-4" width="16" height="3" rx="1" fill="white" opacity="0.8"/>
        <rect x="-8" y="1" width="16" height="3" rx="1" fill="white" opacity="0.5"/>
        <text x="0" y="36" textAnchor="middle" fill="#ff6b35" fontSize="7" fontFamily="monospace" fontWeight="bold">SWITCH L2</text>
      </g>

      {/* --- Noeuds terminaux niveau 3 --- */}
      {/* PC 1 */}
      <g transform="translate(60,330)">
        <circle r="16" fill="#0f3460" stroke="#4fc3f7" strokeWidth="1"/>
        <rect x="-8" y="-9" width="16" height="11" rx="2" fill="#4fc3f7" opacity="0.7"/>
        <rect x="-5" y="3" width="10" height="2" rx="1" fill="#4fc3f7" opacity="0.5"/>
        <text x="0" y="28" textAnchor="middle" fill="#4fc3f7" fontSize="6" fontFamily="monospace">PC</text>
      </g>

      {/* Camera */}
      <g transform="translate(160,340)">
        <circle r="16" fill="#0f3460" stroke="#ff6b35" strokeWidth="1">
          <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="0" cy="-2" r="6" fill="none" stroke="#ff6b35" strokeWidth="1.5" opacity="0.8"/>
        <circle cx="0" cy="-2" r="2" fill="#ff6b35" opacity="0.9"/>
        <text x="0" y="28" textAnchor="middle" fill="#ff6b35" fontSize="6" fontFamily="monospace">CAM IP</text>
      </g>

      {/* WiFi */}
      <g transform="translate(240,340)">
        <circle r="16" fill="#0f3460" stroke="#4fc3f7" strokeWidth="1"/>
        <path d="M -8 2 Q 0 -8 8 2" fill="none" stroke="#4fc3f7" strokeWidth="1.5" opacity="0.9"/>
        <path d="M -5 5 Q 0 -2 5 5" fill="none" stroke="#4fc3f7" strokeWidth="1.5" opacity="0.7"/>
        <circle cx="0" cy="7" r="2" fill="#4fc3f7"/>
        <text x="0" y="28" textAnchor="middle" fill="#4fc3f7" fontSize="6" fontFamily="monospace">Wi-Fi AP</text>
      </g>

      {/* Mobile */}
      <g transform="translate(340,330)">
        <circle r="16" fill="#0f3460" stroke="#ff6b35" strokeWidth="1"/>
        <rect x="-5" y="-10" width="10" height="16" rx="2" fill="none" stroke="#ff6b35" strokeWidth="1.5" opacity="0.8"/>
        <circle cx="0" cy="7" r="1.5" fill="#ff6b35" opacity="0.7"/>
        <text x="0" y="28" textAnchor="middle" fill="#ff6b35" fontSize="6" fontFamily="monospace">MOBILE</text>
      </g>

      {/* --- Niveau 4 (endpoints) --- */}
      {[40, 100, 130, 200, 270, 310, 360].map((x, i) => (
        <g key={i} transform={`translate(${x}, 430)`}>
          <circle r="6" fill="#ff6b35" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite"/>
          </circle>
          <circle r="3" fill="#ff6b35" opacity="0.8"/>
        </g>
      ))}

      {/* --- Badge CAMEROUN --- */}
      <g transform="translate(200,470)">
        <rect x="-55" y="-12" width="110" height="22" rx="11" fill="#ff6b35" opacity="0.15" stroke="#ff6b35" strokeWidth="0.5"/>
        <text x="0" y="5" textAnchor="middle" fill="#ff6b35" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="3">📍 CAMEROUN 237</text>
      </g>

      {/* --- Scan line effect --- */}
      <rect width="400" height="2" fill="rgba(255,107,53,0.15)" y="0">
        <animateTransform attributeName="transform" type="translate" from="0,0" to="0,500" dur="4s" repeatCount="indefinite"/>
      </rect>

      {/* --- Labels flottants --- */}
      <g fontFamily="monospace" fontSize="7" fill="#ff6b35" opacity="0.5">
        <text x="12" y="30">192.168.1.0/24</text>
        <text x="260" y="30">VLAN_10 · VLAN_20</text>
        <text x="12" y="490">UPTIME 99% ·</text>
        <text x="280" y="490">LAN/WAN/IP</text>
      </g>
    </svg>
  </div>
);

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

             {/* Illustration technique à la place de l'image vide */}
             <div className="relative animate-in zoom-in duration-1000">
                <TechIllustration />
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





