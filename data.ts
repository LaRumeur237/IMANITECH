
import { Package, CaseStudy } from './types';

export const SITE_NAME = "IMANI-TECH SOLUTIONS";
export const OFFICIAL_EMAIL = "imanitechsolutions237@gmail.com";
export const WHATSAPP_NUMBER = "+237672777657";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`;

export const CAMEROON_CITIES = [
  "Douala", "Yaoundé", "Bafoussam", "Garoua", "Maroua", 
  "Bamenda", "Ngaoundéré", "Bertoua", "Ebolowa", "Buéa", 
  "Kribi", "Limbe", "Dschang", "Foumban"
];

export const DETAILED_KNOWLEDGE_BASE = `
IDENTITÉ : IMANI-TECH SOLUTIONS est l'agence leader au Cameroun en acquisition digitale et infrastructures IT premium pour PME.
LOCALISATION : Siège à Douala, interventions dans tout le triangle national (Yaoundé, Bafoussam, Garoua, etc.).
MARQUES PARTENAIRES : Hikvision, Ubiquiti UniFi, Cisco, Mikrotik, Odoo, Fortinet, Yealink.
`;

export const AGENCY_STATS = {
  revenue: 45200000,
  leads: 842,
  cpa: 1250,
  conversion: 18.4,
  years: 5,
  clients: 150
};

export const PACKAGES: Package[] = [
  {
    id: 'p1',
    title: "Site Professionnel Premium",
    category: 'Web',
    description: "La vitrine d'élite pour les entreprises leaders.",
    price: "800.000 – 1.500.000 FCFA",
    isPopular: true,
    features: [
      "5 à 10 pages optimisées",
      "UX/UI personnalisé & Premium",
      "SEO Local (Douala/Yaoundé)",
      "Intégration WhatsApp Business",
      "Hébergement optimisé 1 an"
    ],
    details: {
      objective: "Positionner votre entreprise comme le leader incontesté de votre secteur au Cameroun grâce à une image de marque irréprochable.",
      target: "Cabinets d'avocats, Cliniques privées, Promoteurs immobiliers.",
      techStack: ["Next.js (React)", "Tailwind CSS", "SEO Local Schema.org"],
      phases: ["Audit", "Design UI/UX", "Développement", "SEO", "Lancement"],
      maintenance: "Support technique 7j/7 pendant 1 an.",
      roi: "Augmentation de la crédibilité et réduction du cycle de vente."
    }
  },
  {
    id: 'p2',
    title: "Site E-commerce Avancé",
    category: 'Web',
    description: "Transformez votre catalogue en machine à vendre.",
    price: "1.500.000 – 3.500.000 FCFA",
    features: [
      "Paiements Mobile Money / Cartes",
      "Gestion automatique des stocks",
      "Dashboard de ventes dédié",
      "Automatisation emails clients",
      "Sécurité SSL & Anti-fraude"
    ],
    details: {
      objective: "Éliminer les frictions de commande et automatiser la réception des paiements au Cameroun.",
      target: "Boutiques de mode, Vente de matériel informatique, Supermarchés locaux.",
      techStack: ["Laravel / PHP", "API CinetPay", "PostgreSQL"],
      phases: ["Analyse", "Setup Tunnel", "Intégration Paiement", "Tests", "Lancement"],
      maintenance: "Maintenance applicative mensuelle incluse.",
      roi: "Récupération des paniers abandonnés (+25%) et gain de temps gestion."
    }
  },
  {
    id: 'p5',
    title: "Infrastructure LAN/Wi-Fi Pro",
    category: 'Infrastructure',
    description: "Déploiement réseau complet pour vos bureaux.",
    price: "1.200.000 – 3.000.000 FCFA",
    features: [
      "Câblage structuré (Cat 6/7)",
      "Installation bornes Wi-Fi Mesh",
      "Configuration Baie de brassage",
      "Segmentation réseau (VLAN)",
      "Support technique Prioritaire"
    ],
    details: {
      objective: "Garantir une connectivité interne ultra-stable capable de supporter les flux vidéo et la VoIP.",
      target: "Agences de logistique, Espaces de coworking, Sièges sociaux.",
      techStack: ["Ubiquiti UniFi", "Câblage Nexans Cat 6A", "Switchs Cisco"],
      phases: ["Audit", "Pose câbles", "Brassage", "Config Logicielle", "Tests"],
      maintenance: "Audit réseau trimestriel.",
      roi: "Zéro temps d'arrêt pour le personnel."
    }
  }
];

export const SERVICES = [
  {
    id: 'reseaux',
    title: "Infrastructures Réseaux & Wi-Fi",
    description: "Conception de réseaux locaux haute performance (LAN/WLAN) pour une continuité de service totale.",
    features: ["Câblage structuré Cat 6/7", "Wi-Fi Mesh Professionnel", "Segmentation VLAN", "Pare-feu & VPN"],
    iconName: 'Wifi',
    details: {
      architecture: "Backbones en fibre optique ou cuivre Cat 6A. Utilisation de VLANs pour isoler les flux critiques.",
      hardware: "Ubiquiti UniFi 6, Switchs Cisco Catalyst, Routeurs MikroTik.",
      impact: "Suppression des lenteurs de transfert de fichiers et Wi-Fi stable pour 100+ utilisateurs."
    }
  },
  {
    id: 'videosurveillance',
    title: "Vidéosurveillance IP Inteligente",
    description: "Protection périmétrique HD avec IA pour une sécurité proactive en temps réel.",
    features: ["Résolution 4K / 8MP", "Analyse d'image IA", "Alerte Mobile Push", "Vision Nuit ColorVu"],
    iconName: 'Camera',
    details: {
      architecture: "Système full IP ONVIF avec détection de franchissement de ligne par IA.",
      hardware: "Caméras Hikvision ColorVu, NVR Seagate SkyHawk AI.",
      impact: "Réduction des pertes inconnues et preuves vidéo irréfutables."
    }
  },
  {
    id: 'dev-web',
    title: "Ingénierie Web & Tunnels de Vente",
    description: "Développement d'outils digitaux orientés conversion massive.",
    features: ["Next.js Framework", "SEO Technique Avancé", "Tunnels de Vente", "APIs Paiement Mobile"],
    iconName: 'Layout',
    details: {
      architecture: "Applications SPA/SSR ultra-rapides optimisées pour le réseau mobile camerounais.",
      hardware: "Hébergement Cloud (AWS, Vercel) avec protection anti-DDoS.",
      impact: "Positionnement dominant sur Google et augmentation directe du chiffre d'affaires."
    }
  },
  {
    id: 'maintenance',
    title: "Maintenance & Infogérance Pro",
    description: "Gestion proactive de votre parc informatique pour prévenir les pannes.",
    features: ["Audit Trimestriel", "Sauvegarde Cloud Sauve", "Antivirus Centralisé", "Assistance 4h"],
    iconName: 'HardDrive',
    details: {
      architecture: "Mise en place d'agents de monitoring 24/7 sur chaque poste de travail.",
      hardware: "Outils de télé-assistance, serveurs de sauvegarde Veeam.",
      impact: "Réduction de 80% des arrêts de production liés à l'informatique."
    }
  },
  {
    id: 'controle-acces',
    title: "Biométrie & Contrôle d'Accès",
    description: "Sécurisation des zones sensibles et automatisation du suivi de présence.",
    features: ["Reconnaissance Faciale", "Pointage RH Automatique", "Serrures Magnétiques", "Badges RFID"],
    iconName: 'Key',
    details: {
      architecture: "Contrôleurs autonomes interconnectés au logiciel RH central.",
      hardware: "Terminaux ZKTeco ProFace X, gâches électriques 300kg.",
      impact: "Élimination de la fraude au pointage et sécurisation des bureaux de direction."
    }
  },
  {
    id: 'voip',
    title: "Téléphonie IP & Standard VoIP",
    description: "Modernisez votre accueil client avec un standard professionnel à coût réduit.",
    features: ["Standard IVR Vocal", "Appels Internes Gratuits", "Enregistrement d'appels", "Softphones Mobiles"],
    iconName: 'Phone',
    details: {
      architecture: "Serveur IP-PBX basé sur Asterisk/3CX utilisant le réseau local existant.",
      hardware: "Téléphones Yealink, Passerelles FXO/GSM Fanvil.",
      impact: "Réduction de 50% de la facture télécom et accueil client haut de gamme."
    }
  },
  {
    id: 'cybersecurite',
    title: "Audit & Cyber-Sécurité",
    description: "Blindez votre infrastructure contre les menaces numériques et intrusions.",
    features: ["Test de pénétration", "Pare-feu de nouvelle gén.", "Audit de vulnérabilité", "VPN Inter-sites"],
    iconName: 'ShieldCheck',
    details: {
      architecture: "Installation de passerelles UTM Fortinet avec inspection profonde.",
      hardware: "Pare-feu Fortinet FortiGate, VPN SSL sécurisé.",
      impact: "Protection des données sensibles et conformité avec les régulations de cybersécurité."
    }
  },
  {
    id: 'digitalisation',
    title: "Digitalisation & ERP (Odoo/CRM)",
    description: "Centralisez votre gestion (Stocks, Ventes, Facturation) dans un outil unique.",
    features: ["Gestion de Stock Cloud", "Facturation Automatisée", "CRM Suivi Prospects", "Dashboards Live"],
    iconName: 'TrendingUp',
    details: {
      architecture: "Déploiement modulaire d'Odoo synchronisé en temps réel.",
      hardware: "Hébergement Cloud sécurisé, terminaux de saisie mobiles.",
      impact: "Suppression du papier et visibilité totale sur la rentabilité en un clic."
    }
  },
  {
    id: 'formation',
    title: "Formation & Transfert IT",
    description: "Montez en compétences vos équipes pour maîtriser les outils digitaux.",
    features: ["Bureautique Pro", "Hygiène Informatique", "Admin Réseau Niveau 1", "E-marketing"],
    iconName: 'BookOpen',
    details: {
      architecture: "Modules pédagogiques basés sur la pratique intensive en entreprise.",
      hardware: "Laboratoires pratiques mobiles, documentation technique personnalisée.",
      impact: "Autonomie de vos collaborateurs et meilleure exploitation des outils IT installés."
    }
  }
];

export const DIGITAL_SERVICES = [
  {
    id: 'acquisition',
    title: "Acquisition Digitale Haute Performance",
    description: "Génération de flux massif de prospects qualifiés via Google Search et Réseaux Sociaux.",
    iconName: 'Target',
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    kpi: "ROAS 4.5x Minimum",
    details: "Nous plaçons votre offre devant ceux qui cherchent activement votre solution.",
    approach: "Utilisation du SEA (Google Ads) et Social Ads (Meta).",
    points: ["Campagnes Google Ads", "Pixel Meta & CAPI", "Suivi des appels", "Reporting ROI"],
    stack: ["Google Ads", "Meta Business Suite", "GTM"]
  },
  {
    id: 'seo-local',
    title: "SEO Local & Référencement Autorité",
    description: "Dominez les résultats Google à Douala et Yaoundé sans payer de publicité.",
    iconName: 'Search',
    imageUrl: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&q=80",
    kpi: "Top 3 Google Garanti",
    details: "Le SEO est votre actif immobilier digital sur le long terme.",
    approach: "Audit technique de 50 points et optimisation sémantique locale.",
    points: ["Google Business Profile", "SEO Technique", "Rédaction Content", "Backlinks"],
    stack: ["SEMrush", "Search Console"]
  },
  {
    id: 'content-strategy',
    title: "Stratégie de Contenu & Reels Viral",
    description: "Créez une identité de marque puissante sur TikTok, Reels et LinkedIn.",
    iconName: 'Rocket',
    imageUrl: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80",
    kpi: "Engagement +300%",
    details: "Nous produisons des contenus qui arrêtent le scroll et renforcent votre autorité.",
    approach: "Storytelling émotionnel couplé à des hooks visuels forts.",
    points: ["Production Reels/TikTok", "Copywriting LinkedIn", "Direction Artistique", "Calendrier Édito"],
    stack: ["Adobe Premiere", "CapCut", "Canva"]
  },
  {
    id: 'crm-automation',
    title: "Email & CRM Marketing Automation",
    description: "Automatisez votre suivi client pour multiplier vos ventes sans effort.",
    iconName: 'Workflow',
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
    kpi: "Ventes +40%",
    details: "Un prospect qui n'est pas relancé est un prospect perdu.",
    approach: "Segmentation et séquences de 'Nurturing' automatisées.",
    points: ["Installation Odoo/Hubspot", "Séquences Automatiques", "Lead Scoring", "Newsletters"],
    stack: ["Odoo CRM", "Brevo", "Make"]
  },
  {
    id: 'copywriting',
    title: "Copywriting & Psychologie de Vente",
    description: "Transformez vos textes en vendeurs silencieux ultra-convaincants.",
    iconName: 'PenTool',
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80",
    kpi: "Taux de Clic +150%",
    details: "Les mots vendent. Nous utilisons la psychologie cognitive pour vos offres.",
    approach: "Application des frameworks AIDA et PAS au contexte local.",
    points: ["Landing Pages Vente", "Scripts Vidéos Pub", "Fiches Produits", "Naming"],
    stack: ["Jasper IA", "Frameworks Psychologiques"]
  },
  {
    id: 'dev-mobile',
    title: "Développement Mobile iOS & Android",
    description: "Offrez à vos clients une expérience premium directement dans leur poche.",
    iconName: 'Smartphone',
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80",
    kpi: "Rétention +60%",
    details: "Au Cameroun, le mobile est le premier écran de consommation.",
    approach: "Développement hybride performant (React Native) avec paiement mobile.",
    points: ["UX Mobile-First", "Push Notifications", "Mode Offline", "Intégration Paiement"],
    stack: ["React Native", "Firebase", "Node.js"]
  },
  {
    id: 'business-intel',
    title: "Business Intelligence & Data Analytics",
    description: "Prenez des décisions basées sur des chiffres réels, pas sur des intuitions.",
    iconName: 'BarChart3',
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
    kpi: "CPA -25%",
    details: "Centralisez vos sources de données pour voir votre rentabilité nette.",
    approach: "Installation de pipelines de données et dashboards Looker Studio.",
    points: ["Dashboard Ventes Live", "Rentabilité Produit", "Tracking E-com", "Audit Performance"],
    stack: ["Looker Studio", "Python", "BigQuery"]
  },
  {
    id: 'cyber-brand',
    title: "E-Réputation & Cyber-Sécurité Marque",
    description: "Protégez votre image de marque contre les attaques et le piratage.",
    iconName: 'ShieldCheck',
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80",
    kpi: "Score Protection 100%",
    details: "Sécurisez vos actifs digitaux (comptes sociaux, sites) contre le piratage.",
    approach: "Veille active et renforcement des accès via MFA et Encryption.",
    points: ["Surveillance 24/7", "Sécurisation Comptes VIP", "Nettoyage Google", "Audit Web"],
    stack: ["Brandwatch", "2FA Security"]
  },
  {
    id: 'consulting-scale',
    title: "Consulting Stratégique & Scaling",
    description: "Accompagnement VIP pour passer de PME à Leader National.",
    iconName: 'Globe',
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80",
    kpi: "CA x3",
    details: "Nous sommes vos partenaires de croissance, pas juste des techniciens.",
    approach: "Sessions intensives de stratégie et optimisation de business model.",
    points: ["Plan de Scaling National", "Audit Économique", "Mentorat Équipes", "Expansion Régionale"],
    stack: ["Lean Startup", "Océan Bleu"]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  { 
    id: '1',
    title: "Wi-Fi Mesh pour Resort Balnéaire", 
    category: "Hôtellerie", 
    location: "Kribi",
    results: "Connectivité 100%", 
    description: "Couverture Wi-Fi totale d'un resort de 2 hectares sans zones mortes.",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80",
    challenge: "Murs épais et vaste superficie empêchant une connexion stable pour les clients.",
    solution: "Déploiement de 18 bornes Ubiquiti UniFi AC Mesh avec contrôleur Cloud.",
    techStack: ["Ubiquiti UniFi", "Fibre Optique Camtel", "VLAN Segmentation"]
  },
  { 
    id: '2',
    title: "Surveillance IP 4K pour Clinique Privée", 
    category: "Santé", 
    location: "Yaoundé",
    results: "Sécurité 24/7", 
    description: "Installation de caméras intelligentes avec détection d'intrusion par IA.",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80",
    challenge: "Vols récurrents de matériel médical et besoin d'un contrôle visuel strict des accès.",
    solution: "Système Hikvision 8MP avec vision ColorVu et alertes mobiles instantanées.",
    techStack: ["Hikvision AcuSense", "NVR RAID 1", "Hik-Connect"]
  },
  { 
    id: '3',
    title: "Tunnel d'Acquisition Immobilière", 
    category: "Immobilier", 
    location: "Yaoundé (Bastos)",
    results: "+45 Leads/Mois", 
    description: "Génération de prospects ultra-qualifiés pour un promoteur via un tunnel de vente persuasif.",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80",
    challenge: "Difficulté à trouver des acheteurs pour des villas de luxe (budget > 150M FCFA).",
    solution: "Ciblage démographique précis (diaspora) et Landing Page optimisée.",
    techStack: ["Meta Ads API", "Next.js", "WhatsApp CRM"]
  },
  { 
    id: '4',
    title: "Refonte LAN & Serveurs Transit", 
    category: "Logistique", 
    location: "Douala (Port)",
    results: "Latence Zéro", 
    description: "Optimisation du réseau pour une agence de transit maritime au Port de Douala.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80",
    challenge: "Lenteurs lors du transfert de documents douaniers lourds et déconnexions serveurs.",
    solution: "Câblage structuré Legrand Cat 6A et configuration d'un switch Core Cisco 10Gbps.",
    techStack: ["Cisco Catalyst", "Câblage Nexans", "UPS APC"]
  },
  { 
    id: '5',
    title: "Biométrie pour Usine Agro-industrielle", 
    category: "Industrie", 
    location: "Douala (Bassa)",
    results: "-30% Fraude RH", 
    description: "Gestion de présence automatisée pour 300 ouvriers sur site industriel.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
    challenge: "Fraude massive au pointage manuel et erreurs de calcul des heures supplémentaires.",
    solution: "Lecteurs faciaux ZKTeco avec logiciel de centralisation des données RH en temps réel.",
    techStack: ["ZKTeco ProFace X", "BioTime 8.0", "Database SQL"]
  },
  { 
    id: '6',
    title: "E-learning pour Complexe Scolaire", 
    category: "Éducation", 
    location: "Bafoussam",
    results: "95% Adoption", 
    description: "Mise en place d'un portail parent/élève et gestion des notes digitalisée.",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80",
    challenge: "Lenteur administrative et manque de communication directe avec les parents d'élèves.",
    solution: "Déploiement d'un ERP scolaire Cloud avec notifications SMS automatiques pour les notes.",
    techStack: ["Laravel", "PostgreSQL", "Gateway SMS local"]
  },
  { 
    id: '7',
    title: "Infrastructure Wi-Fi Centre Commercial", 
    category: "PME", 
    location: "Douala (Akwa)",
    results: "Ventes +20%", 
    description: "Wi-Fi public gratuit avec portail captif marketing pour collecter des emails clients.",
    imageUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80",
    challenge: "Besoin de moderniser l'expérience client et de fidéliser les visiteurs via le digital.",
    solution: "Installation de bornes Ubiquiti UniFi avec Portail Captif personnalisé (Social Login).",
    techStack: ["UniFi Dream Machine", "Omada Portal", "Mailchimp Integration"]
  },
  { 
    id: '8',
    title: "Digitalisation Cabinet Avocats Luxe", 
    category: "PME", 
    location: "Douala (Bonanjo)",
    results: "Image Premium", 
    description: "Création d'un écosystème digital complet (Site, Emails Pro, Cloud sécurisé).",
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80",
    challenge: "Image de marque vieillissante et gestion de dossiers confidentiels sur serveurs non sécurisés.",
    solution: "Site vitrine haut de gamme et migration vers Google Workspace Enterprise pour la sécurité.",
    techStack: ["Next.js", "Google Workspace", "Endpoint Protection"]
  },
  { 
    id: '9',
    title: "Cyber-sécurisation Microfinance", 
    category: "PME", 
    location: "Garoua",
    results: "Zéro Intrusion", 
    description: "Audit et sécurisation du réseau informatique d'une banque régionale.",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
    challenge: "Tentatives répétées de phishing et vulnérabilités critiques détectées dans le réseau.",
    solution: "Pare-feu Fortinet FortiGate avec inspection profonde et formation hygiène IT du personnel.",
    techStack: ["FortiGate NGFW", "VPN SSL", "Audit de pénétration"]
  },
  { 
    id: '10',
    title: "Surveillance Périmétrique Plantation", 
    category: "Industrie", 
    location: "Njombé/Penja",
    results: "Pertes -50%", 
    description: "Vidéosurveillance longue distance pour sécuriser les stocks de récolte.",
    imageUrl: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80",
    challenge: "Vols nocturnes importants sur de vastes surfaces agricoles non éclairées.",
    solution: "Caméras Hikvision PTZ avec technologie DarkFighter et transmission Wi-Fi Point-to-Point.",
    techStack: ["Hikvision PTZ", "Ubiquiti AirFiber", "Solaire Off-grid"]
  },
  { 
    id: '11',
    title: "Gestion Stock Chaîne Pharmacie", 
    category: "Santé", 
    location: "Maroua",
    results: "Inventaire 100% OK", 
    description: "Logiciel de gestion de stock et facturation interconnecté pour 5 officines.",
    imageUrl: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80",
    challenge: "Ruptures de stock imprévues et manque de traçabilité des médicaments sensibles.",
    solution: "Déploiement d'Odoo Inventory avec synchronisation Cloud et lecteurs codes-barres.",
    techStack: ["Odoo", "PostgreSQL", "Terminaux Android"]
  },
  { 
    id: '12',
    title: "Acquisition Agence Voyage VIP", 
    category: "Logistique", 
    location: "Douala",
    results: "+250 Billets/Mois", 
    description: "Stratégie Google Ads et Meta pour capturer les voyageurs d'affaires.",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80",
    challenge: "Dépendance aux agences physiques et baisse du volume de réservations directes.",
    solution: "Campagnes de recherche Google ciblées sur des mots-clés d'intention d'achat immédiate.",
    techStack: ["Google Ads Expert", "Meta CAPI", "WhatsApp Automation"]
  }
];

export const PRICING_OPTIONS = {
  web: [
    { id: 'maint', name: 'Maintenance Annuelle PC', price: 150000 },
    { id: 'net', name: 'Audit Réseau Complet', price: 75000 },
    { id: 'cam', name: 'Pack 4 Caméras HD', price: 350000 },
    { id: 'soft', name: 'App de Gestion Stock', price: 250000 }
  ]
};
