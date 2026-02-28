import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2, ChevronRight, Globe, ShieldCheck, Star, Layout, Wifi,
  Shield, Rocket, X, Target, Cpu, Workflow, TrendingUp, ArrowRight,
  Camera, Lock, Flame, GraduationCap, Network, Code, Server,
  Zap, Eye, Bell, BookOpen, AlertTriangle, Activity, Users, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppRoute, Package } from '../types';
import { PACKAGES, WHATSAPP_LINK } from '../data';

// ─── Animated Counter Hook ───────────────────────────────────────────────────
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ─── Intersection Observer Hook ──────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── ALL PACKAGES ─────────────────────────────────────────────────────────────
const ALL_NEW_PACKAGES = [
  // EXISTING EXTRA PACKAGES
  {
    id: 101, category: 'Sécurité', title: 'Shield Pentest Pro',
    description: 'Audit offensif complet : simulation d\'attaques réelles pour identifier vos vulnérabilités avant les hackers.',
    price: 'À partir de 850 000 FCFA', isPopular: false, urgency: 'Critique',
    stat: { value: '95%', label: 'failles détectées évitables' },
    features: ['Test d\'intrusion externe & interne','Scan OWASP Top 10','Rapport CVSS détaillé','Remédiation priorisée','Retest post-correction','Certificat d\'audit signé'],
    details: {
      objective: 'Identifier et exploiter les failles de sécurité de votre infrastructure avant toute attaque réelle. Chaque vulnérabilité non traitée est une porte ouverte sur vos données, vos finances et votre réputation.',
      phases: ['Reconnaissance & cartographie d\'attaque','Scan automatisé + analyse manuelle','Exploitation contrôlée des failles','Rapport technique et exécutif','Restitution orale avec l\'équipe','Retest des correctifs appliqués'],
      roi: 'Une faille non détectée peut coûter des millions en pertes de données et amendes. Un pentest préventif coûte 10x moins qu\'une réponse à incident. Nos clients évitent en moyenne 3 incidents critiques par an.',
      target: 'PME, ETI, startups traitant des données sensibles ou soumises à des obligations de conformité',
      techStack: ['Kali Linux','Metasploit','Burp Suite','Nmap','Nessus','OWASP ZAP'],
      maintenance: 'Rapport valable 12 mois — retest annuel recommandé pour maintenir la conformité.',
      alertMsg: '67% des PME camerounaises sont victimes d\'une cyberattaque dans les 12 mois suivant leur création.',
    }
  },
  {
    id: 102, category: 'Sécurité', title: 'Cyber Guardian 360',
    description: 'Protection continue 24/7 de votre système : surveillance SOC externalisé, détection des menaces en temps réel.',
    price: 'À partir de 150 000 FCFA / mois', isPopular: true, urgency: 'Essentiel',
    stat: { value: '74%', label: 'réduction des intrusions' },
    features: ['SOC externalisé 24/7/365','EDR/XDR déploiement','Firewall WAF managé','Mises à jour sécurité','Alertes temps réel','Rapport mensuel posture'],
    details: {
      objective: 'Couverture sécurité permanente sans recruter une équipe dédiée. Notre SOC surveille, détecte et neutralise les menaces en continu pour que vous puissiez vous concentrer sur votre cœur de métier.',
      phases: ['Inventaire & cartographie des actifs','Déploiement sondes + agents EDR','Configuration règles de détection','Dashboard sécurité client','Formation sensibilisation équipes','Surveillance active + gestion incidents'],
      roi: 'Les entreprises équipées d\'un SOC réduisent de 74% le temps de détection d\'intrusion et de 60% le coût moyen d\'un incident. Le retour sur investissement est visible dès le 1er mois.',
      target: 'TPE/PME sans équipe sécurité interne, secteurs santé, finance, commerce & administration',
      techStack: ['Microsoft Sentinel','CrowdStrike','Cloudflare WAF','Wazuh','PfSense','Grafana'],
      maintenance: 'Surveillance continue incluse — rapport mensuel + réunion trimestrielle de posture.',
      alertMsg: 'Chaque minute sans surveillance est une opportunité pour les cybercriminels.',
    }
  },
  {
    id: 103, category: 'Digital', title: 'Brand Launch Digital',
    description: 'Création complète de votre identité de marque en ligne : identité visuelle, réseaux sociaux, stratégie de lancement.',
    price: 'À partir de 600 000 FCFA', isPopular: false, urgency: 'Stratégique',
    stat: { value: '23%', label: 'revenus supplémentaires' },
    features: ['Identité visuelle + charte graphique','Setup 3 réseaux sociaux','Stratégie contenu 3 mois','30 visuels & templates','Bio & positionnement marque','Rapport lancement J+30'],
    details: {
      objective: 'Donner à votre marque une présence digitale cohérente, professionnelle et mémorable dès le premier jour, en unifiant identité visuelle, discours et stratégie sur tous les canaux.',
      phases: ['Atelier positionnement & cible','Création identité visuelle + charte','Déclinaison templates réseaux','Setup & optimisation profils','Production pack contenu lancement','Publication, monitoring, rapport J+30'],
      roi: 'Une marque cohérente génère jusqu\'à 23% de revenus supplémentaires. Un lancement structuré réduit le coût d\'acquisition client de 40% vs un lancement non planifié.',
      target: 'Entrepreneurs, startups, commerçants & PME souhaitant se lancer ou se repositionner',
      techStack: ['Figma','Canva Pro','Meta Business Suite','Notion','Buffer','Google Analytics'],
      maintenance: 'Assets en haute définition + 30 jours support post-lancement inclus.',
      alertMsg: 'Sans identité visuelle forte, 62% des clients choisissent votre concurrent.',
    }
  },
  {
    id: 104, category: 'Digital', title: 'Growth Ads 360',
    description: 'Gestion complète de vos campagnes publicitaires Google et Meta pour maximiser votre retour sur investissement.',
    price: 'À partir de 200 000 FCFA / mois', isPopular: false, urgency: 'Rentable',
    stat: { value: '7x', label: 'ROAS moyen clients' },
    features: ['Google Ads & Meta Ads gestion','Visuels + copies publicitaires','A/B testing continu','Optimisation ROAS hebdo','Retargeting audiences','Rapport bi-mensuel détaillé'],
    details: {
      objective: 'Maximiser votre ROAS en gérant vos campagnes Google et Meta de façon data-driven : ciblage précis, créatifs performants et optimisation continue du budget pour chaque franc dépensé.',
      phases: ['Audit campagnes + définition KPIs','Recherche audiences & mots-clés','Création créatifs (visuels + copies)','Lancement et paramétrage','Optimisation hebdo + A/B testing','Reporting bi-mensuel + stratégie'],
      roi: 'Nos clients enregistrent en moyenne un ROAS de 4x à 7x après 90 jours. Réduction du CPA de 35% dès le 2ème mois de collaboration.',
      target: 'E-commerce, services B2C & B2B, établissements cherchant à scaler leur acquisition',
      techStack: ['Google Ads','Meta Ads Manager','Google Analytics 4','Hotjar','Canva Pro','Looker Studio'],
      maintenance: 'Optimisation hebdomadaire — reporting bi-mensuel avec recommandations stratégiques.',
      alertMsg: 'Sans pub ciblée, vos concurrents captent vos clients potentiels chaque jour.',
    }
  },

  // ─── 7 NOUVEAUX PACKAGES CAMEROUN ──────────────────────────────────────────

  // 1. VIDÉOSURVEILLANCE
  {
    id: 201, category: 'Sécurité Physique', title: 'VisionSafe CCTV Pro',
    description: 'Installation et supervision de systèmes de vidéosurveillance HD/4K avec accès à distance, détection IA et enregistrement cloud sécurisé.',
    price: 'À partir de 450 000 FCFA', isPopular: true, urgency: 'URGENT',
    stat: { value: '60%', label: 'réduction des incidents' },
    features: [
      'Caméras HD/4K intérieur & extérieur','Accès à distance via smartphone','Détection de mouvement par IA','Enregistrement 30 jours cloud/local',
      'Installation & câblage professionnel','Monitoring optionnel 24h/7j','Rapport d\'incident automatique','Garantie matériel 2 ans'
    ],
    details: {
      objective: 'Sécuriser physiquement vos locaux, boutiques, entrepôts et résidences grâce à un système de vidéosurveillance professionnel avec vision nocturne, alertes intelligentes et accès distant en temps réel depuis n\'importe quel smartphone.',
      phases: [
        'Audit des points sensibles à surveiller','Conception du plan de câblage et placement caméras',
        'Installation des caméras et du NVR/DVR','Configuration de l\'accès distant sécurisé',
        'Paramétrage détection IA et alertes','Formation des responsables à l\'utilisation',
        'Test complet du système et réception','Mise en place du contrat de maintenance'
      ],
      roi: 'Un système CCTV réduit les incidents de vol et d\'intrusion de 60%. Nos clients commerçants constatent une réduction de 80% des pertes liées au vol interne. Le coût d\'installation est amorti en moins de 6 mois.',
      target: 'Commerces, boutiques, hôtels, résidences, entrepôts, bureaux, écoles & établissements de santé au Cameroun',
      techStack: ['Hikvision 4K','Dahua AI','NVR 16 canaux','Application Hik-Connect','Stockage NAS','Cloud sécurisé'],
      maintenance: 'Contrat de maintenance trimestrielle disponible — nettoyage objectifs, vérification enregistrements, mise à jour firmware.',
      alertMsg: 'Au Cameroun, 1 commerce sur 3 est victime de vol ou d\'intrusion chaque année. Agissez avant que cela arrive.',
    }
  },

  // 2. CONTRÔLE D'ACCÈS
  {
    id: 202, category: 'Sécurité Physique', title: 'AccessControl Elite',
    description: 'Système de contrôle d\'accès biométrique et par badge : gérez qui entre où et quand, avec traçabilité complète en temps réel.',
    price: 'À partir de 380 000 FCFA', isPopular: false, urgency: 'Sécurité',
    stat: { value: '100%', label: 'traçabilité des accès' },
    features: [
      'Lecteurs biométriques (empreinte + visage)','Badges RFID personnalisés','Gestion multi-sites centralisée',
      'Historique complet des accès','Blocage instantané à distance','Intégration présence & pointage',
      'Alertes intrusion temps réel','Rapport d\'activité quotidien'
    ],
    details: {
      objective: 'Maîtriser totalement l\'accès à vos locaux : savoir qui entre, quand et où, bloquer instantanément tout accès non autorisé, et générer automatiquement des rapports de présence pour votre RH. Fini les clés perdues, les accès non contrôlés et les intrusions silencieuses.',
      phases: [
        'Audit des zones à contrôler et niveaux d\'accès','Plan d\'installation des lecteurs et serrures',
        'Installation des lecteurs biométriques/RFID','Configuration des profils d\'accès par rôle',
        'Enregistrement des empreintes et badges','Formation des administrateurs du système',
        'Tests de sécurité et scénarios d\'intrusion','Livraison avec tableau de bord en ligne'
      ],
      roi: 'Le contrôle d\'accès élimine 100% des accès non autorisés et réduit les pertes liées aux intrusions internes de 85%. Le module de pointage automatique fait économiser en moyenne 40h/mois de travail RH.',
      target: 'Entreprises, administrations, hôtels, cliniques, entrepôts, écoles et résidences sécurisées au Cameroun',
      techStack: ['ZKTeco Biométrie','HID RFID','Logiciel ZKAccess','API REST','Cloud Azure','Serrures électromagnétiques'],
      maintenance: 'Mise à jour logicielle mensuelle + support technique téléphonique inclus. Remplacement matériel prioritaire sous 48h.',
      alertMsg: 'Sans contrôle d\'accès, vous ne savez pas qui est réellement dans vos locaux en ce moment.',
    }
  },

  // 3. ALARMES INCENDIE
  {
    id: 203, category: 'Sécurité Physique', title: 'FireGuard 237',
    description: 'Installation de systèmes d\'alarme incendie certifiés : détection précoce, sirènes automatiques et conformité aux normes de sécurité.',
    price: 'À partir de 320 000 FCFA', isPopular: false, urgency: 'VITAL',
    stat: { value: '3min', label: 'délai détection-alerte' },
    features: [
      'Détecteurs fumée & chaleur certifiés','Centrale d\'alarme intelligente','Sirènes intérieure & extérieure',
      'Déclencheurs manuels d\'urgence','Signalisation lumineuse d\'évacuation','Liaison directe pompiers (option)',
      'Test mensuel automatique','Certificat de conformité normes'
    ],
    details: {
      objective: 'Protéger vos vies et votre patrimoine contre les incendies grâce à un système de détection précoce certifié. Chaque minute gagnée avant l\'alerte peut sauver des vies. Nos systèmes détectent la fumée jusqu\'à 3 minutes avant qu\'elle soit visible à l\'œil nu.',
      phases: [
        'Audit des risques incendie par zone','Plan d\'implantation des détecteurs',
        'Installation de la centrale et détecteurs','Câblage et raccordement des sirènes',
        'Paramétrage des seuils d\'alarme','Test complet et simulation d\'évacuation',
        'Formation du personnel aux procédures','Délivrance du certificat de conformité'
      ],
      roi: 'Un incendie non détecté à temps peut détruire des années de travail en quelques minutes. Nos systèmes permettent d\'intervenir 8x plus rapidement qu\'une détection humaine. Une installation certifiée est également exigée par les assureurs et les autorités camerounaises.',
      target: 'Hôtels, restaurants, bureaux, entrepôts, écoles, cliniques, marchés et bâtiments recevant du public au Cameroun',
      techStack: ['Détecteurs Hochiki','Centrale Notifier','Sirènes Apollo','Câblage FR-N1X1','Batterie secours 72h','App monitoring'],
      maintenance: 'Test trimestriel obligatoire inclus — remplacement des piles et détecteurs, rapport de conformité annuel.',
      alertMsg: 'La réglementation camerounaise impose une installation anti-incendie dans tout établissement recevant du public. Êtes-vous en conformité ?',
    }
  },

  // 4. FORMATION RÉSEAUX
  {
    id: 204, category: 'Formation', title: 'NetPro Academy — Réseaux',
    description: 'Formation intensive aux métiers des réseaux informatiques : installation, configuration, dépannage et administration d\'infrastructures réseau.',
    price: 'À partir de 180 000 FCFA', isPopular: false, urgency: 'Carrière',
    stat: { value: '89%', label: 'taux d\'insertion pro' },
    features: [
      'Cours TCP/IP, LAN, WAN, WiFi','Configuration routeurs & switches Cisco',
      'Administration réseau Windows/Linux','Câblage RJ45 et fibre optique',
      'Dépannage et diagnostic réseau','Préparation certification CCNA',
      'Travaux pratiques sur maquettes réelles','Attestation de formation reconnue'
    ],
    details: {
      objective: 'Former des techniciens réseau opérationnels immédiatement, capables d\'installer, configurer et maintenir des infrastructures réseau en entreprise. Programme orienté 70% pratique, conçu pour le marché de l\'emploi camerounais et sous-régional.',
      phases: [
        'Fondamentaux des réseaux et modèle OSI','Adressage IP et sous-réseaux',
        'Configuration switches et routeurs Cisco','Mise en place d\'un réseau d\'entreprise',
        'Administration à distance et sécurité réseau','Câblage structuré et baie de brassage',
        'Diagnostic et dépannage des pannes','Examen final et délivrance attestation'
      ],
      roi: 'Un technicien réseau certifié au Cameroun gagne entre 250 000 et 600 000 FCFA/mois. 89% de nos diplômés trouvent un emploi dans les 3 mois. Le marché manque de 15 000 techniciens réseau qualifiés en Afrique centrale.',
      target: 'Étudiants, techniciens en reconversion, agents IT en poste souhaitant monter en compétence, demandeurs d\'emploi',
      techStack: ['Cisco Packet Tracer','GNS3','Routeurs Cisco 2900','Switches Catalyst','Câblage Cat6','Wireshark'],
      maintenance: 'Accès à l\'espace e-learning 6 mois post-formation + groupe WhatsApp alumni actif.',
      alertMsg: 'Le Cameroun manque cruellement de techniciens réseau qualifiés. Cette formation vous propulse en tête du marché de l\'emploi.',
    }
  },

  // 5. FORMATION VIDÉOSURVEILLANCE
  {
    id: 205, category: 'Formation', title: 'CamTech Academy — CCTV',
    description: 'Formation professionnelle à l\'installation et à la maintenance des systèmes de vidéosurveillance : devenez technicien CCTV certifié.',
    price: 'À partir de 150 000 FCFA', isPopular: false, urgency: 'Demandé',
    stat: { value: '+400%', label: 'demande marché Cameroun' },
    features: [
      'Technologie IP & analogique CCTV','Installation caméras dôme, bullet, PTZ',
      'Configuration NVR/DVR et stockage','Câblage coaxial et réseau IP',
      'Paramétrage accès à distance','Maintenance préventive & curative',
      'Lecture des plans d\'installation','Attestation technicien CCTV certifié'
    ],
    details: {
      objective: 'Former des techniciens CCTV autonomes capables d\'installer, configurer et maintenir tout type de système de vidéosurveillance. Le marché camerounais connaît une explosion de la demande en sécurité privée — cette formation vous positionne sur un secteur ultra-porteur.',
      phases: [
        'Introduction aux systèmes CCTV analogiques et IP','Types de caméras et leurs applications',
        'Installation physique et câblage structuré','Configuration NVR/DVR Hikvision & Dahua',
        'Paramétrage réseaux et accès à distance','Détection IA et configuration alertes',
        'Maintenance et diagnostic de pannes','Projet final : installation complète d\'un site'
      ],
      roi: 'Un technicien CCTV indépendant au Cameroun facture entre 50 000 et 200 000 FCFA par installation. Avec 2 installations par mois, la formation est rentabilisée dès le premier mois d\'activité.',
      target: 'Techniciens électriciens, agents de sécurité, entrepreneurs en sécurité, étudiants en électronique',
      techStack: ['Caméras Hikvision 4K','DVR Dahua 8 canaux','Application Hik-Connect','Câblage RG59','Testeur CCTV','Multimètre'],
      maintenance: 'Support technique WhatsApp 3 mois post-formation + tarifs préférentiels sur le matériel.',
      alertMsg: 'La demande en techniciens CCTV a explosé de 400% au Cameroun depuis 2022. Ne ratez pas cette opportunité.',
    }
  },

  // 6. FORMATION DÉVELOPPEMENT WEB
  {
    id: 206, category: 'Formation', title: 'WebDev Bootcamp 237',
    description: 'Bootcamp intensif en développement web fullstack : de zéro à développeur opérationnel en 3 mois avec des projets réels.',
    price: 'À partir de 250 000 FCFA', isPopular: true, urgency: 'Populaire',
    stat: { value: '3 mois', label: 'pour être opérationnel' },
    features: [
      'HTML5, CSS3, JavaScript ES6+','React.js & Node.js fullstack',
      'Base de données MySQL & MongoDB','API REST et intégrations',
      'Git & déploiement sur Vercel/Heroku','Responsive design & mobile-first',
      '3 projets réels dans le portfolio','Certificat de développeur web'
    ],
    details: {
      objective: 'Transformer des débutants en développeurs web fullstack employables en 3 mois, avec un portfolio de projets réels. Formation 100% pratique, orientée marché camerounais et africain, avec accompagnement à l\'insertion professionnelle ou au lancement en freelance.',
      phases: [
        'Fondamentaux HTML/CSS et design responsive','JavaScript ES6+ et logique de programmation',
        'React.js : composants, hooks, état, routing','Node.js & Express : API REST et authentification',
        'Base de données MySQL et MongoDB','Déploiement cloud et CI/CD basique',
        'Projet 1 : Site vitrine professionnel','Projet 2 : Application CRUD fullstack',
        'Projet 3 : Plateforme e-commerce complète','Préparation CV, entretiens et portfolio'
      ],
      roi: 'Un développeur web junior au Cameroun gagne entre 300 000 et 700 000 FCFA/mois. En freelance, les projets démarrent à 200 000 FCFA. Notre réseau d\'entreprises partenaires offre des opportunités directes à nos diplômés.',
      target: 'Étudiants, professionnels en reconversion, entrepreneurs souhaitant créer leur propre application, passionnés d\'informatique',
      techStack: ['VS Code','HTML5/CSS3','JavaScript ES6+','React.js','Node.js','MySQL','MongoDB','Git/GitHub'],
      maintenance: 'Accès à vie aux supports de cours + groupe Discord alumni actif + 3 sessions de mentoring post-formation.',
      alertMsg: 'Les développeurs web sont les professionnels les plus recherchés en Afrique. En 3 mois, transformez votre vie.',
    }
  },

  // 7. RÉSEAU D'ENTREPRISE
  {
    id: 207, category: 'Infrastructure', title: 'NetBuild Enterprise',
    description: 'Déploiement complet d\'infrastructure réseau d\'entreprise : câblage structuré, WiFi haute densité, VPN et administration centralisée.',
    price: 'À partir de 700 000 FCFA', isPopular: false, urgency: 'Stratégique',
    stat: { value: '99.9%', label: 'uptime garanti' },
    features: [
      'Câblage structuré Cat6/Fibre optique','WiFi entreprise haute densité (Ubiquiti/Cisco)',
      'VPN sécurisé multi-sites','Administration centralisée (dashboard)',
      'QoS et priorisation du trafic','VLAN et segmentation réseau',
      'Firewall et filtrage de contenu','Support & supervision inclus 12 mois'
    ],
    details: {
      objective: 'Construire une infrastructure réseau professionnelle, fiable et sécurisée qui supporte la croissance de votre entreprise. Un réseau mal conçu coûte en productivité perdue, pannes à répétition et failles de sécurité. Nos déploiements garantissent 99,9% d\'uptime.',
      phases: [
        'Audit de l\'existant et des besoins réseau','Conception de l\'architecture réseau',
        'Plan de câblage et installation baie de brassage','Déploiement des équipements actifs',
        'Configuration VLAN, QoS et sécurité','Installation du WiFi et tests de couverture',
        'Mise en place VPN et accès distants','Formation des équipes IT internes',
        'Tests de charge et validation finale','Livraison avec documentation complète'
      ],
      roi: 'Un réseau professionnel réduit de 70% les temps d\'arrêt liés aux pannes réseau. La productivité de vos équipes augmente de 35% avec un réseau fiable et rapide. Le ROI est visible dès le 1er mois via la réduction des interventions d\'urgence.',
      target: 'PME en croissance, bureaux multi-étages, hôtels, écoles, cliniques, administrations et entrepôts au Cameroun',
      techStack: ['Cisco Catalyst','Ubiquiti UniFi','pfSense','Fibre optique','Cat6 FTP','FortiGate'],
      maintenance: 'Supervision réseau 24/7 incluse 12 mois — intervention sur site sous 4h en cas de panne critique.',
      alertMsg: 'Un réseau lent ou instable fait perdre à votre équipe jusqu\'à 2h de productivité par jour. Calculez vos pertes.',
    }
  },
];

const categoryConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  'Web':               { icon: <Layout size={28} />,       color: '#E87722', bg: '#FFF5EC' },
  'Infrastructure':    { icon: <Wifi size={28} />,         color: '#2563EB', bg: '#EFF6FF' },
  'Sécurité':          { icon: <Shield size={28} />,       color: '#DC2626', bg: '#FEF2F2' },
  'Digital':           { icon: <Rocket size={28} />,       color: '#7C3AED', bg: '#F5F3FF' },
  'Sécurité Physique': { icon: <Camera size={28} />,       color: '#0F766E', bg: '#F0FDFA' },
  'Formation':         { icon: <GraduationCap size={28} />, color: '#D97706', bg: '#FFFBEB' },
};

const urgencyColors: Record<string, string> = {
  'Critique': 'bg-red-600', 'URGENT': 'bg-red-500', 'VITAL': 'bg-red-700',
  'Essentiel': 'bg-blue-600', 'Sécurité': 'bg-teal-600',
  'Stratégique': 'bg-purple-600', 'Rentable': 'bg-green-600',
  'Carrière': 'bg-amber-600', 'Demandé': 'bg-orange-500',
  'Populaire': 'bg-pink-600',
};

// ─── STAT COUNTER COMPONENT ──────────────────────────────────────────────────
const StatsBar: React.FC = () => {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className="py-16 bg-brand-stone overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
        {[
          { val: 11, suffix: '', label: 'Packages disponibles', icon: <Cpu size={24} /> },
          { val: 98, suffix: '%', label: 'Clients satisfaits', icon: <Star size={24} /> },
          { val: 24, suffix: 'h/7', label: 'Support actif', icon: <Activity size={24} /> },
          { val: 5, suffix: ' ans', label: 'D\'expertise terrain', icon: <Users size={24} /> },
        ].map((s, i) => {
          const c = useCounter(s.val, 2000, inView);
          return (
            <div key={i} className="flex flex-col items-center gap-3"
              style={{ animation: inView ? `fadeSlideUp 0.6s ${i * 0.15}s both` : 'none' }}>
              <div className="text-brand-orange">{s.icon}</div>
              <div className="text-4xl font-black tracking-tighter text-white">
                {c}{s.suffix}
              </div>
              <div className="text-brand-sand/60 text-xs font-black uppercase tracking-widest">{s.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── PACKAGE CARD ─────────────────────────────────────────────────────────────
const PackageCard: React.FC<{ p: any; idx: number; onClick: () => void }> = ({ p, idx, onClick }) => {
  const { ref, inView } = useInView(0.05);
  const cfg = categoryConfig[p.category] || { icon: <Server size={28} />, color: '#E87722', bg: '#FFF5EC' };

  return (
    <div ref={ref} onClick={onClick}
      style={{
        animation: inView ? `cardReveal 0.7s ${(idx % 3) * 0.1}s both` : 'none',
        borderColor: p.isPopular ? cfg.color : undefined,
      }}
      className={`relative bg-white rounded-[2.5rem] border-2 transition-all duration-500 cursor-pointer group flex flex-col overflow-hidden
        ${p.isPopular ? 'border-[currentColor] shadow-2xl' : 'border-brand-sand hover:border-brand-orange/50 shadow-md hover:shadow-2xl'}
        hover:-translate-y-2`}>

      {/* Popular badge */}
      {p.isPopular && (
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-brand-orange text-white px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-xl">
            <Star size={10} fill="white" /> Recommandé
          </div>
        </div>
      )}

      {/* Urgency ribbon */}
      <div className={`absolute top-6 right-6 ${urgencyColors[p.urgency] || 'bg-brand-stone'} text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full`}>
        {p.urgency}
      </div>

      {/* Colored top bar */}
      <div className="h-1.5 w-full" style={{ background: cfg.color }} />

      <div className="p-8 flex flex-col flex-grow">
        {/* Icon + category */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ background: cfg.bg, color: cfg.color }}>
            {cfg.icon}
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-brand-stone/30">{p.category}</span>
        </div>

        <h3 className="text-xl font-black text-brand-stone uppercase tracking-tighter mb-3 leading-tight group-hover:text-brand-orange transition-colors duration-300">
          {p.title}
        </h3>

        <p className="text-brand-stone/55 text-[13px] font-bold leading-relaxed mb-6 flex-grow">
          {p.description}
        </p>

        {/* Stat highlight */}
        <div className="flex items-center gap-4 mb-6 p-4 rounded-2xl" style={{ background: cfg.bg }}>
          <div className="text-2xl font-black" style={{ color: cfg.color }}>{p.stat.value}</div>
          <div className="text-[10px] font-black uppercase tracking-tight text-brand-stone/50">{p.stat.label}</div>
        </div>

        {/* Price */}
        <div className="mb-6 px-5 py-4 bg-brand-beige/60 rounded-2xl border border-brand-sand/40">
          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-orange mb-1">Investissement</div>
          <div className="text-base font-black text-brand-stone tracking-tighter">{p.price}</div>
        </div>

        {/* Features preview */}
        <div className="space-y-2.5 mb-8">
          {p.features.slice(0, 3).map((f: string, i: number) => (
            <div key={i} className="flex items-start gap-2.5">
              <CheckCircle2 className="shrink-0 mt-0.5" size={14} style={{ color: cfg.color }} />
              <span className="text-[10px] font-black uppercase tracking-tight text-brand-stone/70">{f}</span>
            </div>
          ))}
          {p.features.length > 3 && (
            <div className="text-[9px] font-black uppercase tracking-widest text-brand-stone/30 pl-5">
              +{p.features.length - 3} autres inclus...
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="pt-6 border-t border-brand-sand/40 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-stone/30">Dossier complet</span>
          <div className="flex items-center gap-1 font-black text-[10px] uppercase tracking-widest transition-all duration-300 group-hover:translate-x-1"
            style={{ color: cfg.color }}>
            Voir <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const PackagesPage: React.FC = () => {
  const [filter, setFilter] = useState('Tous');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => { setTimeout(() => setHeroVisible(true), 100); }, []);

  const categories = ['Tous', 'Web', 'Infrastructure', 'Sécurité', 'Sécurité Physique', 'Digital', 'Formation'];
  const ALL_PACKAGES = [...PACKAGES, ...ALL_NEW_PACKAGES];
  const filteredPackages = filter === 'Tous' ? ALL_PACKAGES : ALL_PACKAGES.filter((p: any) => p.category === filter);

  const closeModal = () => setSelectedPackage(null);
  const cfg = selectedPackage ? (categoryConfig[selectedPackage.category] || { icon: <Server size={28} />, color: '#E87722', bg: '#FFF5EC' }) : null;

  return (
    <>
      <style>{`
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes scanline {
          from { top: -100%; }
          to   { top: 200%; }
        }
        .hero-word { display: inline-block; }
        ${categories.map((_, i) => `.hero-delay-${i} { animation: heroIn 0.8s ${0.1 + i * 0.08}s both; }`).join('\n')}
        .package-card-hover { transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease; }
        .modal-enter { animation: cardReveal 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .floating { animation: float 4s ease-in-out infinite; }
        .pulse-ring::after {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid currentColor;
          animation: pulse-ring 2s ease-out infinite;
        }
      `}</style>

      <div className="bg-brand-cream min-h-screen pt-24">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="relative bg-white overflow-hidden border-b border-brand-sand">
          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

          {/* Floating orbs */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-brand-orange/8 rounded-full blur-[80px] floating" />
          <div className="absolute bottom-0 left-10 w-48 h-48 bg-blue-500/5 rounded-full blur-[60px] floating" style={{ animationDelay: '2s' }} />

          <div className="max-w-7xl mx-auto px-4 py-24 sm:py-32 relative z-10">
            <div className="max-w-4xl">
              <div className={`hero-delay-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 mb-8`}>
                <Zap size={12} className="text-brand-orange" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">11 Solutions Prêtes à Déployer</span>
              </div>

              <h1 className={`hero-delay-1 text-6xl sm:text-8xl lg:text-[100px] font-black uppercase tracking-tighter leading-[0.88] text-brand-stone mb-8`}>
                Nos <span className="text-brand-orange relative">Packages<span className="absolute -bottom-1 left-0 w-full h-1 bg-brand-orange/30 rounded" /></span><br />
                <span className="text-brand-stone/20">Stratégiques</span>
              </h1>

              <p className={`hero-delay-2 text-lg sm:text-xl text-brand-stone/50 font-bold leading-relaxed max-w-2xl mb-12`}>
                Chaque package est un dossier de solution complet, pensé pour le marché camerounais. Cliquez pour découvrir l'impact réel sur votre activité.
              </p>

              <div className={`hero-delay-3 flex flex-wrap gap-6`}>
                {[
                  { icon: <Shield size={16} />, label: 'Garantie de résultat' },
                  { icon: <Clock size={16} />, label: 'Déploiement rapide' },
                  { icon: <Users size={16} />, label: 'Support local' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-brand-stone/40">
                    <span className="text-brand-orange">{b.icon}</span>
                    <span className="text-[11px] font-black uppercase tracking-widest">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Package count badge */}
          <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-1 text-brand-stone/10">
            <div className="text-[80px] font-black leading-none">11</div>
            <div className="text-[10px] font-black uppercase tracking-widest">packages</div>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────────────────── */}
        <StatsBar />

        {/* ── FILTER BAR ───────────────────────────────────────────────── */}
        <div className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-xl border-b border-brand-sand shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap gap-2 justify-center">
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                className={`px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300 border-2 ${
                  filter === c
                    ? 'bg-brand-stone text-white border-brand-stone shadow-lg scale-105'
                    : 'bg-white text-brand-stone/50 border-brand-sand hover:border-brand-orange hover:text-brand-orange'
                }`}>
                {c}
                <span className={`ml-2 text-[8px] ${filter === c ? 'text-brand-orange' : 'text-brand-stone/20'}`}>
                  ({filter === c && c === 'Tous' ? ALL_PACKAGES.length : ALL_PACKAGES.filter((p: any) => p.category === c).length || (c === 'Tous' ? ALL_PACKAGES.length : 0)})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── PACKAGES GRID ─────────────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((p: any, idx: number) => (
                <PackageCard key={p.id} p={p} idx={idx} onClick={() => setSelectedPackage(p)} />
              ))}
            </div>
          </div>
        </section>

        {/* ── AUDIT CTA BAND ────────────────────────────────────────────── */}
        <section className="mx-4 sm:mx-8 mb-16 rounded-[3rem] overflow-hidden bg-brand-orange relative">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%)', backgroundSize: '20px 20px' }} />
          <div className="relative z-10 py-16 px-8 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <div className="text-white/60 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Vous hésitez entre plusieurs packages ?</div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
                Obtenez votre audit<br />personnalisé <span className="text-white/40">GRATUIT</span>
              </h2>
            </div>
            <Link to={AppRoute.Audit}
              className="shrink-0 bg-white text-brand-orange px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-brand-stone hover:text-white transition-all duration-300 shadow-2xl flex items-center gap-3">
              <Target size={20} /> Audit gratuit <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* ── TRUST SECTION ─────────────────────────────────────────────── */}
        <section className="py-24 bg-brand-stone text-white text-center rounded-[4rem] mx-4 sm:mx-8 mb-24 relative overflow-hidden border border-brand-orange/10">
          <div className="absolute -top-20 -right-20 opacity-5"><Globe size={400} /></div>
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-orange text-[9px] font-black uppercase tracking-[0.3em] mb-8">
              <ShieldCheck size={12} /> Garantie Intégrale Imani-Tech
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter leading-none">
              Des packages pensés pour<br />votre <span className="text-brand-orange">Rentabilité</span>.
            </h2>
            <p className="text-brand-sand/40 mb-12 font-bold uppercase tracking-wide text-sm">
              Plus qu'une facture — une étape vers votre domination du marché.
            </p>
            <Link to={AppRoute.Audit}
              className="bg-brand-orange text-white px-12 py-6 rounded-full font-black text-lg hover:bg-white hover:text-brand-stone transition-all shadow-2xl shadow-brand-orange/30 inline-flex items-center gap-3 uppercase tracking-tighter">
              Demander mon audit <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </div>

      {/* ── DETAIL MODAL ──────────────────────────────────────────────────── */}
      {selectedPackage && cfg && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-brand-stone/95 backdrop-blur-lg"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="modal-enter bg-white w-full sm:max-w-6xl rounded-t-[3rem] sm:rounded-[3rem] shadow-2xl flex flex-col max-h-[95vh] border-t-4"
            style={{ borderColor: cfg.color }}>

            {/* Modal Header */}
            <div className="p-6 sm:p-10 flex items-start justify-between gap-6 shrink-0 border-b border-brand-sand">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-white shadow-xl shrink-0"
                  style={{ background: cfg.color }}>
                  {cfg.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: cfg.color }}>
                      {selectedPackage.category}
                    </span>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 text-white rounded ${urgencyColors[selectedPackage.urgency]}`}>
                      {selectedPackage.urgency}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter text-brand-stone leading-tight">
                    {selectedPackage.title}
                  </h2>
                </div>
              </div>
              <button onClick={closeModal}
                className="shrink-0 w-10 h-10 rounded-full border-2 border-brand-sand flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all">
                <X size={18} />
              </button>
            </div>

            {/* Alert Banner */}
            {selectedPackage.details?.alertMsg && (
              <div className="mx-6 sm:mx-10 mt-6 p-4 rounded-2xl flex items-start gap-3"
                style={{ background: cfg.bg }}>
                <AlertTriangle size={18} className="shrink-0 mt-0.5" style={{ color: cfg.color }} />
                <p className="text-[11px] font-black uppercase tracking-tight" style={{ color: cfg.color }}>
                  {selectedPackage.details.alertMsg}
                </p>
              </div>
            )}

            {/* Scrollable Body */}
            <div className="flex-grow overflow-y-auto p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Left Column */}
                <div className="lg:col-span-7 space-y-12">

                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <Target size={20} style={{ color: cfg.color }} />
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-stone/40">01 — Objectif stratégique</h4>
                    </div>
                    <p className="text-lg text-brand-stone font-bold leading-relaxed border-l-4 pl-6"
                      style={{ borderColor: cfg.color }}>
                      {selectedPackage.details?.objective}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <Workflow size={20} style={{ color: cfg.color }} />
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-stone/40">02 — Plan de déploiement</h4>
                    </div>
                    <div className="space-y-3">
                      {selectedPackage.details?.phases.map((phase: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-4 bg-brand-beige/40 p-4 rounded-2xl border border-brand-sand/30 group hover:border-brand-orange/30 transition-all">
                          <div className="w-7 h-7 rounded-full text-white flex items-center justify-center font-black text-[10px] shrink-0 transition-colors"
                            style={{ background: cfg.color }}>
                            {idx + 1}
                          </div>
                          <span className="text-[11px] font-black uppercase tracking-tight text-brand-stone/70">{phase}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <TrendingUp size={20} style={{ color: cfg.color }} />
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-stone/40">03 — Impact & ROI concret</h4>
                    </div>
                    <div className="bg-brand-beige p-8 rounded-[2rem] border border-brand-sand">
                      <p className="text-base text-brand-stone/70 font-bold leading-relaxed italic">
                        "{selectedPackage.details?.roi}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-5 space-y-6">

                  {/* Stat highlight */}
                  <div className="p-8 rounded-[2rem] text-white relative overflow-hidden"
                    style={{ background: cfg.color }}>
                    <div className="text-5xl font-black tracking-tighter mb-1">{selectedPackage.stat.value}</div>
                    <div className="text-white/70 text-[11px] font-black uppercase tracking-widest">{selectedPackage.stat.label}</div>
                  </div>

                  {/* Tech Stack */}
                  <div className="bg-brand-stone p-8 rounded-[2rem] text-white">
                    <h5 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-4">Technologies</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedPackage.details?.techStack.map((s: string) => (
                        <span key={s} className="px-3 py-1.5 bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-wider border border-white/5">{s}</span>
                      ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <p className="text-[9px] font-black uppercase tracking-widest text-brand-orange mb-2">Cible</p>
                      <p className="text-[11px] font-bold text-white/50 leading-relaxed">{selectedPackage.details?.target}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-[9px] font-black uppercase tracking-widest text-brand-orange mb-2">Maintenance</p>
                      <p className="text-[11px] font-bold text-white/50 leading-relaxed">{selectedPackage.details?.maintenance}</p>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="bg-white p-8 rounded-[2rem] border border-brand-sand">
                    <h5 className="text-[9px] font-black uppercase tracking-widest text-brand-stone/30 mb-5">Tout ce qui est inclus</h5>
                    <div className="space-y-3">
                      {selectedPackage.features.map((f: string, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: cfg.color }} />
                          <span className="text-[10px] font-black uppercase text-brand-stone/60">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SLA */}
                  <div className="p-6 rounded-[2rem] border-2 border-dashed flex items-start gap-3"
                    style={{ borderColor: cfg.color + '40', background: cfg.bg }}>
                    <ShieldCheck size={18} style={{ color: cfg.color }} className="shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: cfg.color }}>Garantie Imani-Tech</div>
                      <p className="text-[10px] font-bold text-brand-stone/50 leading-relaxed uppercase">
                        Audit de fin de chantier certifié + garantie de performance incluse sur chaque prestation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 sm:p-8 bg-brand-beige border-t border-brand-sand flex flex-col sm:flex-row items-center justify-between gap-5 shrink-0">
              <div>
                <div className="text-[9px] font-black uppercase tracking-widest text-brand-stone/30 mb-1">Investissement total</div>
                <div className="text-2xl sm:text-3xl font-black text-brand-stone tracking-tighter">{selectedPackage.price}</div>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Link to={AppRoute.Audit} onClick={closeModal}
                  className="flex-1 sm:flex-none text-center bg-brand-stone text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-all shadow-lg">
                  Demander un audit
                </Link>
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
                  className="flex-1 sm:flex-none text-center bg-brand-orange text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-stone transition-all shadow-lg">
                  WhatsApp Expert
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PackagesPage;
