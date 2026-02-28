import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2, ChevronRight, Globe, ShieldCheck, Star, Layout, Wifi,
  Shield, Rocket, X, Target, Cpu, Workflow, TrendingUp, ArrowRight,
  Camera, GraduationCap, Server, Zap, AlertTriangle, Activity,
  Users, Clock, Lock, Flame, Network, Code
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';
import { PACKAGES, WHATSAPP_LINK } from '../data';

// ─── Hook: détecte quand un élément entre dans le viewport ───────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Composant compteur animé (hook au niveau composant, pas dans .map) ───────
const AnimatedNumber: React.FC<{ target: number; suffix?: string; inView: boolean; delay?: number }> = ({
  target, suffix = '', inView, delay = 0
}) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      let startTime: number;
      const step = (ts: number) => {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / 1800, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(ease * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timer);
  }, [inView, target, delay]);
  return <>{count}{suffix}</>;
};

// ─── Tous les packages (anciens + nouveaux) ───────────────────────────────────
// On utilise "any" pour éviter les conflits de types avec l'interface Package existante
const EXTRA_PACKAGES: any[] = [
  // ── SÉCURITÉ ──────────────────────────────────────────────────────────────
  {
    id: 101, category: 'Sécurité', title: 'Shield Pentest Pro', urgency: 'CRITIQUE',
    description: 'Audit offensif complet : simulation d\'attaques réelles pour trouver vos failles avant les hackers.',
    price: 'À partir de 850 000 FCFA', isPopular: false,
    stat: { value: 95, suffix: '%', label: 'des failles sont évitables' },
    features: ['Test intrusion externe & interne','Scan OWASP Top 10','Rapport CVSS détaillé','Remédiation priorisée','Retest post-correction inclus','Certificat d\'audit signé'],
    details: {
      objective: 'Identifier et exploiter chaque faille de votre infrastructure avant toute attaque réelle. Chaque vulnérabilité non traitée est une porte ouverte sur vos données, vos finances et votre réputation — nous la fermons avant que les hackers ne la trouvent.',
      alertMsg: '⚠️ 67% des PME camerounaises subissent une cyberattaque dans les 12 mois suivant leur création. Votre tour viendra si vous n\'agissez pas maintenant.',
      phases: ['Reconnaissance & cartographie d\'attaque','Scan automatisé + analyse manuelle approfondie','Exploitation contrôlée des failles découvertes','Rédaction du rapport technique et exécutif','Restitution orale avec votre équipe technique','Retest de validation des correctifs appliqués'],
      roi: 'Un pentest préventif coûte 10x moins cher qu\'une réponse à incident. Nos clients évitent en moyenne 3 incidents critiques par an, soit des économies de plusieurs millions de FCFA.',
      target: 'PME, ETI, startups traitant des données sensibles ou soumises à la conformité',
      techStack: ['Kali Linux','Metasploit','Burp Suite','Nmap','Nessus','OWASP ZAP'],
      maintenance: 'Rapport valable 12 mois — retest annuel recommandé pour maintenir la conformité.',
    }
  },
  {
    id: 102, category: 'Sécurité', title: 'Cyber Guardian 360', urgency: 'ESSENTIEL',
    description: 'Surveillance SOC 24/7, détection des menaces en temps réel et réponse aux incidents pour votre SI.',
    price: 'À partir de 150 000 FCFA / mois', isPopular: true,
    stat: { value: 74, suffix: '%', label: 'de réduction des intrusions' },
    features: ['SOC externalisé 24/7/365','EDR/XDR déploiement complet','Firewall WAF managé','Mises à jour sécurité automatiques','Alertes temps réel','Rapport mensuel de posture'],
    details: {
      objective: 'Couverture sécurité opérationnelle permanente sans recruter une équipe dédiée. Notre SOC surveille, détecte et neutralise les menaces en continu pour que vous vous concentriez sur votre cœur de métier.',
      alertMsg: '⚠️ Chaque minute sans surveillance active est une fenêtre d\'opportunité pour les cybercriminels. Ils n\'attendent pas les heures ouvrables.',
      phases: ['Inventaire & cartographie de tous vos actifs','Déploiement des sondes et agents EDR','Configuration des règles de détection sur-mesure','Mise en place du tableau de bord sécurité','Formation de sensibilisation de vos équipes','Surveillance active et gestion des incidents 24/7'],
      roi: 'Les entreprises avec SOC réduisent de 74% le temps de détection d\'intrusion et de 60% le coût moyen d\'un incident. ROI visible dès le 1er mois.',
      target: 'TPE/PME sans équipe sécurité interne, secteurs santé, finance, commerce & administration',
      techStack: ['Microsoft Sentinel','CrowdStrike','Cloudflare WAF','Wazuh','PfSense','Grafana'],
      maintenance: 'Surveillance continue incluse — rapport mensuel + réunion trimestrielle de posture sécurité.',
    }
  },

  // ── SÉCURITÉ PHYSIQUE ─────────────────────────────────────────────────────
  {
    id: 201, category: 'Sécurité Physique', title: 'VisionSafe CCTV Pro', urgency: 'URGENT',
    description: 'Vidéosurveillance HD/4K avec accès smartphone, détection IA et enregistrement cloud sécurisé 30 jours.',
    price: 'À partir de 450 000 FCFA', isPopular: true,
    stat: { value: 60, suffix: '%', label: 'réduction des incidents de vol' },
    features: ['Caméras HD/4K intérieur & extérieur','Accès à distance via smartphone','Détection de mouvement par IA','Enregistrement 30 jours cloud/local','Installation & câblage professionnel','Monitoring optionnel 24h/7j','Rapport d\'incident automatique','Garantie matériel 2 ans'],
    details: {
      objective: 'Sécuriser physiquement vos locaux, boutiques, entrepôts et résidences avec un système de vidéosurveillance professionnel à vision nocturne, alertes intelligentes et accès temps réel depuis n\'importe quel smartphone dans le monde.',
      alertMsg: '⚠️ Au Cameroun, 1 commerce sur 3 est victime de vol ou d\'intrusion chaque année. Agissez avant que cela ne vous arrive.',
      phases: ['Audit des points sensibles à surveiller','Conception du plan de câblage et placement caméras','Installation des caméras et du NVR/DVR','Configuration de l\'accès distant sécurisé','Paramétrage détection IA et alertes intelligentes','Formation des responsables à l\'utilisation du système','Test complet du système en conditions réelles','Mise en place du contrat de maintenance'],
      roi: 'Un système CCTV professionnel réduit les incidents de 60%. Nos clients commerçants constatent 80% de réduction des pertes liées au vol interne. L\'installation est amortie en moins de 6 mois.',
      target: 'Commerces, boutiques, hôtels, résidences, entrepôts, bureaux, écoles & cliniques au Cameroun',
      techStack: ['Hikvision 4K','Dahua AI','NVR 16 canaux','Hik-Connect App','Stockage NAS','Cloud sécurisé'],
      maintenance: 'Maintenance trimestrielle : nettoyage objectifs, vérification enregistrements, mise à jour firmware.',
    }
  },
  {
    id: 202, category: 'Sécurité Physique', title: 'AccessControl Elite', urgency: 'SÉCURITÉ',
    description: 'Contrôle d\'accès biométrique et badge RFID : gérez qui entre, où et quand, avec traçabilité 100% en temps réel.',
    price: 'À partir de 380 000 FCFA', isPopular: false,
    stat: { value: 100, suffix: '%', label: 'traçabilité des accès' },
    features: ['Lecteurs biométriques (empreinte + visage)','Badges RFID personnalisés','Gestion multi-sites centralisée','Historique complet des accès','Blocage instantané à distance','Intégration présence & pointage RH','Alertes intrusion temps réel','Rapport d\'activité quotidien automatique'],
    details: {
      objective: 'Maîtriser totalement l\'accès à vos locaux : savoir en temps réel qui entre, quand et où, bloquer instantanément tout accès non autorisé, et générer automatiquement des rapports de présence pour votre service RH. Fini les clés perdues et les intrusions silencieuses.',
      alertMsg: '⚠️ Sans contrôle d\'accès, vous ne savez pas qui se trouve réellement dans vos locaux en ce moment précis. Un employé mécontent, un visiteur non accompagné — les risques sont réels.',
      phases: ['Audit des zones à contrôler et niveaux d\'accès requis','Plan d\'installation des lecteurs et serrures électroniques','Installation des lecteurs biométriques et RFID','Configuration des profils d\'accès par rôle et horaire','Enregistrement des empreintes et création des badges','Formation des administrateurs du système','Tests de sécurité et simulation de scénarios d\'intrusion','Livraison avec tableau de bord en ligne'],
      roi: 'Élimine 100% des accès non autorisés. Réduit les pertes internes de 85%. Le module de pointage automatique économise 40h/mois de travail RH, soit 60 000 FCFA/mois d\'économies directes.',
      target: 'Entreprises, administrations, hôtels, cliniques, entrepôts, écoles et résidences sécurisées',
      techStack: ['ZKTeco Biométrie','HID RFID','Logiciel ZKAccess','API REST','Cloud Azure','Serrures électromagnétiques'],
      maintenance: 'Mise à jour logicielle mensuelle + support téléphonique inclus. Remplacement matériel prioritaire sous 48h.',
    }
  },
  {
    id: 203, category: 'Sécurité Physique', title: 'FireGuard 237', urgency: 'VITAL',
    description: 'Alarmes incendie certifiées normes camerounaises : détection précoce, sirènes automatiques, évacuation guidée.',
    price: 'À partir de 320 000 FCFA', isPopular: false,
    stat: { value: 8, suffix: 'x', label: 'plus rapide qu\'une détection humaine' },
    features: ['Détecteurs fumée & chaleur certifiés','Centrale d\'alarme intelligente','Sirènes intérieure & extérieure','Déclencheurs manuels d\'urgence','Signalisation lumineuse d\'évacuation','Liaison directe pompiers (option)','Test mensuel automatique','Certificat de conformité officiel'],
    details: {
      objective: 'Protéger vos vies et votre patrimoine contre les incendies grâce à une détection précoce certifiée. Nos systèmes détectent la fumée jusqu\'à 3 minutes avant qu\'elle soit visible à l\'œil nu — chaque minute compte pour sauver des vies et limiter les dégâts.',
      alertMsg: '⚠️ La réglementation camerounaise impose une installation anti-incendie dans tout ERP (Établissement Recevant du Public). En cas d\'incident sans système certifié, votre responsabilité civile et pénale est engagée.',
      phases: ['Audit des risques incendie par zone','Plan d\'implantation optimisé des détecteurs','Installation de la centrale d\'alarme et des détecteurs','Câblage et raccordement des sirènes et voyants','Paramétrage des seuils et zones d\'alarme','Test complet et simulation réelle d\'évacuation','Formation du personnel aux procédures d\'urgence','Délivrance du certificat de conformité officiel'],
      roi: 'Un incendie non détecté à temps peut détruire des années de travail. Nos systèmes interviennent 8x plus vite qu\'une détection humaine. Une installation certifiée réduit aussi votre prime d\'assurance de 15 à 30%.',
      target: 'Hôtels, restaurants, bureaux, entrepôts, écoles, cliniques, marchés et tous ERP au Cameroun',
      techStack: ['Détecteurs Hochiki','Centrale Notifier','Sirènes Apollo','Câblage FR-N1X1','Batterie secours 72h','App monitoring mobile'],
      maintenance: 'Test trimestriel obligatoire inclus — remplacement piles & détecteurs, rapport de conformité annuel.',
    }
  },

  // ── DIGITAL ───────────────────────────────────────────────────────────────
  {
    id: 301, category: 'Digital', title: 'Brand Launch Digital', urgency: 'STRATÉGIQUE',
    description: 'Création complète de votre identité de marque en ligne : visuel, réseaux sociaux, contenu et stratégie de lancement.',
    price: 'À partir de 600 000 FCFA', isPopular: false,
    stat: { value: 23, suffix: '%', label: 'de revenus supplémentaires' },
    features: ['Identité visuelle complète (logo + charte)','Setup 3 réseaux sociaux optimisés','Stratégie de contenu 3 mois','30 visuels & templates éditoriaux','Positionnement et bio de marque','Rapport métriques J+30'],
    details: {
      objective: 'Donner à votre marque une présence digitale cohérente, professionnelle et mémorable dès le premier jour. Unifier identité visuelle, discours et stratégie de contenu sur tous les canaux pour un impact immédiat et durable.',
      alertMsg: '⚠️ Sans identité visuelle forte et cohérente, 62% des clients potentiels choisissent instinctivement votre concurrent. La première impression se fait en 7 secondes.',
      phases: ['Atelier de positionnement et définition de la cible','Création de l\'identité visuelle et charte graphique complète','Déclinaison sur les templates réseaux sociaux','Setup et optimisation de vos profils sociaux','Production du pack de contenu de lancement (30 visuels)','Publication, monitoring et rapport complet J+30'],
      roi: 'Une marque cohérente génère jusqu\'à 23% de revenus supplémentaires. Un lancement structuré réduit le coût d\'acquisition client de 40% par rapport à un lancement improvvisé.',
      target: 'Entrepreneurs, startups, commerçants & PME souhaitant se lancer ou se repositionner sur le digital',
      techStack: ['Figma','Canva Pro','Meta Business Suite','Notion','Buffer','Google Analytics 4'],
      maintenance: 'Livraison des assets en haute définition + 30 jours de support post-lancement inclus.',
    }
  },
  {
    id: 302, category: 'Digital', title: 'Growth Ads 360', urgency: 'RENTABLE',
    description: 'Gestion complète de vos campagnes Google & Meta pour maximiser votre ROAS avec un budget maîtrisé.',
    price: 'À partir de 200 000 FCFA / mois', isPopular: false,
    stat: { value: 7, suffix: 'x', label: 'ROAS moyen de nos clients' },
    features: ['Google Ads & Meta Ads gestion complète','Création visuels + copies publicitaires','A/B testing continu des annonces','Optimisation ROAS hebdomadaire','Retargeting & audiences personnalisées','Rapport de performance bi-mensuel'],
    details: {
      objective: 'Maximiser votre ROAS en gérant vos campagnes de façon data-driven : ciblage ultra-précis, créatifs performants et optimisation continue du budget. Chaque franc investi doit travailler pour vous.',
      alertMsg: '⚠️ Sans publicité digitale ciblée, vos concurrents captent vos clients potentiels chaque jour pendant que vous attendez. Le marché digital camerounais croît de 34% par an.',
      phases: ['Audit de vos campagnes existantes et définition des KPIs','Recherche approfondie des audiences cibles et mots-clés','Création des créatifs publicitaires (visuels + copies)','Lancement et paramétrage précis des campagnes','Optimisation hebdomadaire et A/B testing systématique','Reporting bi-mensuel détaillé avec ajustements stratégiques'],
      roi: 'Nos clients enregistrent en moyenne un ROAS de 4x à 7x après 90 jours d\'optimisation. Réduction du CPA de 35% dès le 2ème mois de collaboration.',
      target: 'E-commerce, services B2C & B2B, tout établissement cherchant à scaler son acquisition client',
      techStack: ['Google Ads','Meta Ads Manager','Google Analytics 4','Hotjar','Canva Pro','Looker Studio'],
      maintenance: 'Optimisation hebdomadaire incluse — reporting bi-mensuel avec recommandations stratégiques.',
    }
  },

  // ── FORMATION ─────────────────────────────────────────────────────────────
  {
    id: 401, category: 'Formation', title: 'NetPro Academy — Réseaux', urgency: 'CARRIÈRE',
    description: 'Formation intensive aux métiers des réseaux : installation, configuration, dépannage et administration d\'infrastructures.',
    price: 'À partir de 180 000 FCFA', isPopular: false,
    stat: { value: 89, suffix: '%', label: 'taux d\'insertion professionnelle' },
    features: ['TCP/IP, LAN, WAN, WiFi complet','Configuration routeurs & switches Cisco','Administration réseau Windows/Linux','Câblage RJ45 et fibre optique','Dépannage et diagnostic réseau','Préparation certification CCNA','TP sur maquettes réelles','Attestation de formation reconnue'],
    details: {
      objective: 'Former des techniciens réseau opérationnels immédiatement, capables d\'installer, configurer et maintenir des infrastructures réseau professionnelles. Programme orienté 70% pratique, calibré pour le marché de l\'emploi camerounais et sous-régional.',
      alertMsg: '⚠️ Le Cameroun manque de plus de 15 000 techniciens réseau qualifiés. Cette pénurie fait exploser les salaires — les entreprises paient très bien les bons profils. C\'est votre moment.',
      phases: ['Fondamentaux des réseaux et modèle OSI/TCP-IP','Adressage IP, sous-réseaux et routage','Configuration switches et routeurs Cisco en TP','Déploiement d\'un réseau d\'entreprise complet','Administration à distance et sécurité réseau','Câblage structuré et baie de brassage professionnelle','Diagnostic et dépannage méthodique des pannes','Examen final certifiant et remise d\'attestation'],
      roi: 'Un technicien réseau certifié gagne entre 250 000 et 600 000 FCFA/mois au Cameroun. 89% de nos diplômés trouvent un emploi dans les 3 mois suivant la formation.',
      target: 'Étudiants, techniciens en reconversion, agents IT souhaitant monter en compétence, demandeurs d\'emploi',
      techStack: ['Cisco Packet Tracer','GNS3','Routeurs Cisco 2900','Switches Catalyst','Câblage Cat6','Wireshark'],
      maintenance: 'Accès e-learning 6 mois post-formation + groupe WhatsApp alumni actif pour l\'entraide professionnelle.',
    }
  },
  {
    id: 402, category: 'Formation', title: 'CamTech Academy — CCTV', urgency: 'DEMANDÉ',
    description: 'Devenez technicien vidéosurveillance certifié : installation, configuration et maintenance de systèmes CCTV IP et analogiques.',
    price: 'À partir de 150 000 FCFA', isPopular: false,
    stat: { value: 400, suffix: '%', label: 'croissance de la demande depuis 2022' },
    features: ['Technologie IP & analogique CCTV','Caméras dôme, bullet, PTZ installation','Configuration NVR/DVR et stockage','Câblage coaxial et réseau IP','Accès à distance et app mobile','Maintenance préventive & curative','Plans d\'installation professionnels','Attestation technicien CCTV certifié'],
    details: {
      objective: 'Former des techniciens CCTV autonomes et compétents, capables d\'installer, configurer et maintenir tout système de vidéosurveillance. Le marché camerounais connaît une explosion de la demande en sécurité privée.',
      alertMsg: '⚠️ La demande en techniciens CCTV a explosé de 400% au Cameroun depuis 2022. Les entreprises de sécurité peinent à recruter des profils qualifiés. Cette formation vous met directement sur le marché.',
      phases: ['Introduction aux systèmes CCTV analogiques et IP','Étude des types de caméras et leurs applications','Installation physique, fixation et câblage structuré','Configuration NVR/DVR Hikvision & Dahua en détail','Paramétrage réseau, accès distant et app mobile','Détection IA, zones d\'alerte et programmation horaires','Diagnostic de pannes et maintenance préventive','Projet final : installation complète d\'un site réel'],
      roi: 'Un technicien CCTV indépendant facture entre 50 000 et 200 000 FCFA par installation. Avec 2 chantiers par mois, la formation est rentabilisée dès le premier mois d\'activité.',
      target: 'Électriciens, agents de sécurité, entrepreneurs sécurité, étudiants électronique/informatique',
      techStack: ['Caméras Hikvision 4K','DVR Dahua 8 canaux','Application Hik-Connect','Câblage RG59 & Cat6','Testeur CCTV professionnel','Multimètre numérique'],
      maintenance: 'Support technique WhatsApp 3 mois post-formation + tarifs préférentiels sur le matériel Imani-Tech.',
    }
  },
  {
    id: 403, category: 'Formation', title: 'WebDev Bootcamp 237', urgency: 'POPULAIRE',
    description: 'De zéro à développeur fullstack opérationnel en 3 mois : React, Node.js, bases de données et déploiement cloud.',
    price: 'À partir de 250 000 FCFA', isPopular: true,
    stat: { value: 3, suffix: ' mois', label: 'pour être développeur opérationnel' },
    features: ['HTML5, CSS3, JavaScript ES6+ maîtrisé','React.js & Node.js fullstack','MySQL & MongoDB bases de données','API REST et intégrations tierces','Git & déploiement Vercel/Heroku','Responsive & mobile-first design','3 projets réels dans le portfolio','Certificat de développeur web reconnu'],
    details: {
      objective: 'Transformer des débutants en développeurs web fullstack employables en 3 mois avec un portfolio de projets réels. Formation 100% pratique, orientée marché africain, avec accompagnement à l\'insertion ou au lancement en freelance.',
      alertMsg: '⚠️ Les développeurs web sont les profils les plus recherchés en Afrique subsaharienne. Les entreprises camerounaises importent des développeurs faute de talents locaux. Soyez la solution.',
      phases: ['Fondamentaux HTML/CSS et design responsive moderne','JavaScript ES6+ : logique, DOM, APIs et asynchrone','React.js : composants, hooks, contexte et routing','Node.js & Express : serveur, API REST et authentification JWT','Bases de données MySQL et MongoDB avec ORM','Déploiement cloud, variables d\'environnement et CI/CD','Projet 1 : Site vitrine professionnel complet','Projet 2 : Application CRUD fullstack avec auth','Projet 3 : Plateforme e-commerce fonctionnelle','Préparation CV, portfolio GitHub et entretiens techniques'],
      roi: 'Un développeur web junior gagne entre 300 000 et 700 000 FCFA/mois au Cameroun. En freelance, les projets démarrent à 200 000 FCFA. Notre réseau de partenaires offre des opportunités directes.',
      target: 'Étudiants, professionnels en reconversion, entrepreneurs voulant créer leur app, passionnés d\'informatique',
      techStack: ['VS Code','HTML5/CSS3/Tailwind','JavaScript ES6+','React.js 18','Node.js/Express','MySQL','MongoDB','Git/GitHub'],
      maintenance: 'Accès à vie aux supports de cours + groupe Discord alumni actif + 3 sessions de mentoring individuel.',
    }
  },

  // ── INFRASTRUCTURE ────────────────────────────────────────────────────────
  {
    id: 501, category: 'Infrastructure', title: 'NetBuild Enterprise', urgency: 'STRATÉGIQUE',
    description: 'Déploiement complet d\'infrastructure réseau : câblage structuré, WiFi haute densité, VPN sécurisé et administration centralisée.',
    price: 'À partir de 700 000 FCFA', isPopular: false,
    stat: { value: 99, suffix: '.9%', label: 'uptime garanti contractuellement' },
    features: ['Câblage structuré Cat6/Fibre optique','WiFi entreprise haute densité Ubiquiti/Cisco','VPN sécurisé multi-sites','Dashboard d\'administration centralisé','QoS et priorisation du trafic','VLAN et segmentation réseau avancée','Firewall et filtrage de contenu','Supervision & support inclus 12 mois'],
    details: {
      objective: 'Construire une infrastructure réseau professionnelle, fiable et évolutive qui supporte la croissance de votre entreprise. Un réseau mal conçu coûte en productivité perdue, pannes à répétition et failles de sécurité béantes.',
      alertMsg: '⚠️ Un réseau lent ou instable fait perdre à vos équipes jusqu\'à 2 heures de productivité par jour. Sur 20 employés, c\'est 40h perdues chaque jour — calculez le coût mensuel pour votre entreprise.',
      phases: ['Audit complet de l\'existant et des besoins réseau','Conception de l\'architecture réseau cible','Plan de câblage et installation de la baie de brassage','Déploiement et configuration des équipements actifs','Configuration VLAN, QoS, sécurité et politiques','Installation du WiFi et tests de couverture par zone','Mise en place du VPN et des accès distants sécurisés','Formation des équipes IT internes à l\'administration','Tests de charge, validation et recette finale','Livraison avec documentation technique complète'],
      roi: 'Un réseau professionnel réduit de 70% les temps d\'arrêt liés aux pannes. La productivité de vos équipes augmente de 35%. ROI visible dès le 1er mois.',
      target: 'PME en croissance, bureaux multi-étages, hôtels, écoles, cliniques et administrations au Cameroun',
      techStack: ['Cisco Catalyst','Ubiquiti UniFi','pfSense','Fibre optique','Cat6 FTP blindé','FortiGate Firewall'],
      maintenance: 'Supervision réseau 24/7 incluse 12 mois — intervention sur site sous 4h en cas de panne critique.',
    }
  },
  {
    id: 502, category: 'Infrastructure', title: 'CloudSync Africa', urgency: 'MODERNE',
    description: 'Migration et hébergement cloud sécurisé pour vos données et applications : disponibilité maximale, sauvegarde automatique et accès partout.',
    price: 'À partir de 120 000 FCFA / mois', isPopular: false,
    stat: { value: 99, suffix: '.95%', label: 'SLA de disponibilité garanti' },
    features: ['Migration cloud sécurisée de vos données','Hébergement applications & sites web','Sauvegarde automatique quotidienne','Accès sécurisé depuis partout (VPN)','Scalabilité instantanée selon vos besoins','Monitoring et alertes 24/7','Conformité RGPD et sécurité des données','Support technique dédié'],
    details: {
      objective: 'Libérer votre entreprise des contraintes physiques des serveurs locaux : pannes, coûts de maintenance, risques de perte de données. Le cloud vous offre disponibilité maximale, sauvegarde automatique et accès à vos outils depuis n\'importe où au Cameroun et dans le monde.',
      alertMsg: '⚠️ 58% des PME camerounaises qui subissent une perte totale de données ferment dans les 6 mois. Votre disque dur local n\'est pas une stratégie de sauvegarde.',
      phases: ['Audit de vos applications et données à migrer','Conception de l\'architecture cloud adaptée','Migration sécurisée et testée de vos données','Configuration des accès, rôles et permissions','Mise en place des sauvegardes automatiques','Tests de restauration et de continuité d\'activité','Formation de vos équipes à l\'environnement cloud','Surveillance continue et optimisation des coûts'],
      roi: 'Élimination des coûts de maintenance serveur (en moyenne 400 000 FCFA/an). Réduction des temps d\'arrêt de 85%. Votre équipe accède à ses outils depuis chez elle en cas d\'urgence.',
      target: 'PME, cabinets, associations, administrations et entreprises de services souhaitant moderniser leur SI',
      techStack: ['Microsoft Azure','AWS S3','Cloudflare','Linux Ubuntu Server','Docker','Backup Veeam'],
      maintenance: 'Monitoring continu inclus — rapport mensuel d\'utilisation + optimisation des coûts cloud trimestrielle.',
    }
  },
];

// ─── Configuration visuelle par catégorie ────────────────────────────────────
const CAT_CONFIG: Record<string, { icon: React.ReactNode; color: string; bg: string; border: string }> = {
  'Web':               { icon: <Layout size={26} />,        color: '#E87722', bg: '#FFF5EC', border: '#E87722' },
  'Infrastructure':    { icon: <Server size={26} />,        color: '#2563EB', bg: '#EFF6FF', border: '#2563EB' },
  'Sécurité':          { icon: <Shield size={26} />,        color: '#DC2626', bg: '#FEF2F2', border: '#DC2626' },
  'Sécurité Physique': { icon: <Camera size={26} />,        color: '#0F766E', bg: '#F0FDFA', border: '#0F766E' },
  'Digital':           { icon: <Rocket size={26} />,        color: '#7C3AED', bg: '#F5F3FF', border: '#7C3AED' },
  'Formation':         { icon: <GraduationCap size={26} />, color: '#D97706', bg: '#FFFBEB', border: '#D97706' },
};

const URGENCY_COLORS: Record<string, string> = {
  'CRITIQUE': '#DC2626', 'URGENT': '#EA580C', 'VITAL': '#991B1B',
  'ESSENTIEL': '#2563EB', 'SÉCURITÉ': '#0F766E', 'STRATÉGIQUE': '#7C3AED',
  'RENTABLE': '#16A34A', 'CARRIÈRE': '#D97706', 'DEMANDÉ': '#EA580C',
  'POPULAIRE': '#DB2777', 'MODERNE': '#0891B2',
};

// ─── Composant StatBar (avec AnimatedNumber en sous-composants) ───────────────
const StatBar: React.FC = () => {
  const { ref, inView } = useInView(0.2);
  return (
    <div ref={ref} className="bg-brand-stone py-14">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center text-white">
        {[
          { target: 15, suffix: '+', label: 'Packages disponibles', icon: <Cpu size={22} /> },
          { target: 98, suffix: '%', label: 'Clients satisfaits',   icon: <Star size={22} /> },
          { target: 24, suffix: 'h', label: 'Support disponible',   icon: <Activity size={22} /> },
          { target: 5,  suffix: ' ans', label: 'D\'expertise',      icon: <Users size={22} /> },
        ].map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-2"
            style={{ animation: inView ? `fadeUp 0.6s ${i * 120}ms both` : 'none' }}>
            <div className="text-brand-orange mb-1">{s.icon}</div>
            <div className="text-4xl font-black tracking-tighter">
              <AnimatedNumber target={s.target} suffix={s.suffix} inView={inView} delay={i * 120} />
            </div>
            <div className="text-white/40 text-[10px] font-black uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Carte package ────────────────────────────────────────────────────────────
const PackageCard: React.FC<{ pkg: any; index: number; onOpen: (p: any) => void }> = ({ pkg, index, onOpen }) => {
  const { ref, inView } = useInView(0.05);
  const cfg = CAT_CONFIG[pkg.category] || CAT_CONFIG['Web'];
  const urgencyColor = URGENCY_COLORS[pkg.urgency] || '#6B7280';

  return (
    <div ref={ref} onClick={() => onOpen(pkg)}
      style={{ animation: inView ? `cardReveal 0.65s ${(index % 3) * 80}ms both` : 'none' }}
      className="relative bg-white rounded-[2rem] border-2 border-brand-sand cursor-pointer flex flex-col overflow-hidden group transition-all duration-400 hover:-translate-y-3 hover:shadow-2xl"
      onMouseEnter={e => (e.currentTarget.style.borderColor = cfg.color)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '')}>

      {/* Top accent bar */}
      <div className="h-1 w-full transition-all duration-300" style={{ background: cfg.color }} />

      {/* Popular badge */}
      {pkg.isPopular && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-4 py-1 rounded-full text-white text-[8px] font-black uppercase tracking-widest shadow-lg"
          style={{ background: cfg.color }}>
          <Star size={9} fill="white" /> Recommandé
        </div>
      )}

      {/* Urgency badge */}
      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-white text-[7px] font-black uppercase tracking-wider"
        style={{ background: urgencyColor }}>
        {pkg.urgency}
      </div>

      <div className="p-7 flex flex-col flex-grow">
        {/* Icon + category */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ background: cfg.bg, color: cfg.color }}>
            {cfg.icon}
          </div>
          <span className="text-[8px] font-black uppercase tracking-widest text-brand-stone/25">{pkg.category}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-black text-brand-stone uppercase tracking-tighter mb-2 leading-tight transition-colors duration-300 group-hover:text-brand-orange">
          {pkg.title}
        </h3>

        {/* Description */}
        <p className="text-brand-stone/50 text-xs font-bold leading-relaxed mb-5 flex-grow">
          {pkg.description}
        </p>

        {/* Stat */}
        {pkg.stat && (
          <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ background: cfg.bg }}>
            <span className="text-xl font-black" style={{ color: cfg.color }}>
              {pkg.stat.value}{pkg.stat.suffix}
            </span>
            <span className="text-[9px] font-black uppercase tracking-tight text-brand-stone/40">{pkg.stat.label}</span>
          </div>
        )}

        {/* Price */}
        <div className="mb-5 px-4 py-3 bg-brand-beige/70 rounded-xl border border-brand-sand/40">
          <div className="text-[8px] font-black uppercase tracking-widest text-brand-orange mb-0.5">Investissement</div>
          <div className="text-sm font-black text-brand-stone">{pkg.price}</div>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {pkg.features.slice(0, 3).map((f: string, i: number) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 size={12} className="shrink-0 mt-0.5" style={{ color: cfg.color }} />
              <span className="text-[9px] font-black uppercase tracking-tight text-brand-stone/60">{f}</span>
            </div>
          ))}
          {pkg.features.length > 3 && (
            <div className="text-[8px] font-black uppercase tracking-widest text-brand-stone/25 pl-4">
              +{pkg.features.length - 3} autres inclus
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-brand-sand/40 flex items-center justify-between">
          <span className="text-[8px] font-black uppercase tracking-widest text-brand-stone/25">Voir le dossier</span>
          <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: cfg.color }}>
            Ouvrir <ChevronRight size={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Page principale ──────────────────────────────────────────────────────────
const PackagesPage: React.FC = () => {
  const [filter, setFilter] = useState('Tous');
  const [selectedPkg, setSelectedPkg] = useState<any>(null);

  // Fusion des packages existants + nouveaux, sans conflit de types
  const ALL_PACKAGES: any[] = [...(PACKAGES as any[]), ...EXTRA_PACKAGES];
  const categories = ['Tous', 'Web', 'Infrastructure', 'Sécurité', 'Sécurité Physique', 'Digital', 'Formation'];
  const filtered = filter === 'Tous' ? ALL_PACKAGES : ALL_PACKAGES.filter(p => p.category === filter);

  const cfg = selectedPkg ? (CAT_CONFIG[selectedPkg.category] || CAT_CONFIG['Web']) : null;
  const urgencyColor = selectedPkg ? (URGENCY_COLORS[selectedPkg.urgency] || '#6B7280') : '#6B7280';

  // Fermer le modal avec Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedPkg(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Bloquer le scroll quand modal ouvert
  useEffect(() => {
    document.body.style.overflow = selectedPkg ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedPkg]);

  return (
    <>
      <style>{`
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(36px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroWord {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes shimmer {
          from { background-position: -200% 0; }
          to   { background-position: 200% 0; }
        }
        .hw0 { animation: heroWord 0.9s 0.1s both; }
        .hw1 { animation: heroWord 0.9s 0.25s both; }
        .hw2 { animation: heroWord 0.9s 0.4s both; }
        .hw3 { animation: heroWord 0.9s 0.55s both; }
        .orb1 { animation: floatOrb 6s ease-in-out infinite; }
        .orb2 { animation: floatOrb 8s 2s ease-in-out infinite; }
        .modal-in { animation: modalIn 0.45s cubic-bezier(0.34,1.56,0.64,1) both; }
        .shimmer-btn {
          background: linear-gradient(90deg, #E87722 0%, #FF9500 50%, #E87722 100%);
          background-size: 200% 100%;
          animation: shimmer 2.5s linear infinite;
        }
      `}</style>

      <div className="bg-brand-cream min-h-screen pt-24">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative bg-white border-b border-brand-sand overflow-hidden">
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'linear-gradient(#1a1a1a 1px,transparent 1px),linear-gradient(90deg,#1a1a1a 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
          <div className="absolute top-16 right-16 w-80 h-80 rounded-full opacity-10 orb1"
            style={{ background: 'radial-gradient(circle, #E87722, transparent)' }} />
          <div className="absolute bottom-8 left-8 w-56 h-56 rounded-full opacity-8 orb2"
            style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />

          <div className="max-w-7xl mx-auto px-4 py-20 sm:py-28 relative z-10">
            <div className="hw0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 mb-8">
              <Zap size={11} className="text-brand-orange" />
              <span className="text-[9px] font-black uppercase tracking-[0.35em] text-brand-orange">
                {ALL_PACKAGES.length} Solutions Adaptées au Marché Camerounais
              </span>
            </div>

            <h1 className="hw1 text-5xl sm:text-7xl lg:text-[90px] font-black uppercase tracking-tighter leading-[0.88] text-brand-stone mb-6">
              Nos <span className="text-brand-orange">Packages</span><br />
              <span className="text-brand-stone/15">Stratégiques</span>
            </h1>

            <p className="hw2 text-base sm:text-lg text-brand-stone/45 font-bold leading-relaxed max-w-xl mb-10">
              Chaque package est un dossier complet avec objectifs, plan de déploiement, ROI chiffré et garantie de résultat. Cliquez pour l'ouvrir.
            </p>

            <div className="hw3 flex flex-wrap gap-5">
              {[
                { icon: <Shield size={14} />, t: 'Garantie résultat' },
                { icon: <Clock size={14} />, t: 'Déploiement rapide' },
                { icon: <Users size={14} />, t: 'Équipe locale' },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-brand-stone/35">
                  <span className="text-brand-orange">{b.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">{b.t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-6 right-6 hidden lg:block text-brand-stone/6 font-black text-[120px] leading-none select-none">
            {ALL_PACKAGES.length}
          </div>
        </section>

        {/* ── STATS ───────────────────────────────────────────────────── */}
        <StatBar />

        {/* ── FILTRE ──────────────────────────────────────────────────── */}
        <div className="sticky top-[72px] z-30 bg-white/92 backdrop-blur-xl border-b border-brand-sand shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-2 justify-center">
            {categories.map(c => {
              const count = c === 'Tous' ? ALL_PACKAGES.length : ALL_PACKAGES.filter(p => p.category === c).length;
              const active = filter === c;
              return (
                <button key={c} onClick={() => setFilter(c)}
                  className={`px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest transition-all duration-300 border-2 ${
                    active ? 'text-white border-transparent shadow-lg scale-105' : 'bg-white text-brand-stone/40 border-brand-sand hover:border-brand-orange hover:text-brand-orange'
                  }`}
                  style={active ? { background: '#1a1a2e', borderColor: '#1a1a2e' } : {}}>
                  {c}
                  <span className={`ml-1.5 text-[7px] ${active ? 'text-brand-orange' : 'text-brand-stone/20'}`}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── GRILLE ──────────────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((pkg: any, i: number) => (
                <PackageCard key={pkg.id} pkg={pkg} index={i} onOpen={setSelectedPkg} />
              ))}
            </div>
          </div>
        </section>

        {/* ── BANDE AUDIT ─────────────────────────────────────────────── */}
        <section className="mx-4 sm:mx-8 mb-14 rounded-[2.5rem] overflow-hidden relative" style={{ background: '#1a1a2e' }}>
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, #E87722 0, #E87722 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }} />
          <div className="relative z-10 py-14 px-8 sm:px-14 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <div className="text-white/30 text-[9px] font-black uppercase tracking-[0.4em] mb-3">Vous hésitez entre plusieurs packages ?</div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
                Audit stratégique<br /><span className="text-brand-orange">100% GRATUIT</span>
              </h2>
              <p className="text-white/30 text-xs font-bold mt-3 uppercase tracking-wide">Nous analysons vos besoins et recommandons la solution idéale.</p>
            </div>
            <Link to={AppRoute.Audit}
              className="shimmer-btn shrink-0 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl flex items-center gap-3 hover:opacity-90 transition-opacity">
              <Target size={18} /> Demander mon audit <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* ── SECTION CONFIANCE ───────────────────────────────────────── */}
        <section className="py-20 bg-brand-stone rounded-[3rem] mx-4 sm:mx-8 mb-20 relative overflow-hidden border border-brand-orange/10">
          <div className="absolute -right-16 -top-16 opacity-4"><Globe size={350} /></div>
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-orange text-[8px] font-black uppercase tracking-[0.3em] mb-8">
              <ShieldCheck size={11} /> Garantie Intégrale Imani-Tech
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter leading-tight text-white">
              Des solutions pensées pour<br />votre <span className="text-brand-orange">Rentabilité</span>
            </h2>
            <p className="text-white/25 mb-10 font-bold uppercase tracking-wide text-sm">
              Plus qu'une facture — une étape vers votre croissance.
            </p>
            <Link to={AppRoute.Audit}
              className="bg-brand-orange text-white px-10 py-5 rounded-full font-black text-base hover:bg-white hover:text-brand-stone transition-all shadow-2xl inline-flex items-center gap-3 uppercase tracking-tight">
              Demander mon audit gratuit <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>

      {/* ── MODAL DÉTAIL ────────────────────────────────────────────────── */}
      {selectedPkg && cfg && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md"
          onClick={e => { if (e.target === e.currentTarget) setSelectedPkg(null); }}>
          <div className="modal-in bg-white w-full sm:max-w-5xl max-h-[96vh] sm:rounded-[2.5rem] rounded-t-[2.5rem] shadow-2xl flex flex-col overflow-hidden border-t-4"
            style={{ borderColor: cfg.color }}>

            {/* Header modal */}
            <div className="flex items-start justify-between gap-4 p-6 sm:p-10 shrink-0 border-b border-brand-sand">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ background: cfg.color }}>
                  {cfg.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[8px] font-black uppercase tracking-[0.4em]" style={{ color: cfg.color }}>{selectedPkg.category}</span>
                    <span className="text-[7px] font-black uppercase px-2 py-0.5 text-white rounded-full" style={{ background: urgencyColor }}>{selectedPkg.urgency}</span>
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tighter text-brand-stone leading-tight">{selectedPkg.title}</h2>
                </div>
              </div>
              <button onClick={() => setSelectedPkg(null)}
                className="shrink-0 w-9 h-9 rounded-full border-2 border-brand-sand flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all">
                <X size={16} />
              </button>
            </div>

            {/* Alerte */}
            {selectedPkg.details?.alertMsg && (
              <div className="mx-6 sm:mx-10 mt-5 p-4 rounded-2xl flex items-start gap-3" style={{ background: cfg.bg }}>
                <AlertTriangle size={16} className="shrink-0 mt-0.5" style={{ color: cfg.color }} />
                <p className="text-[10px] font-black uppercase tracking-tight leading-relaxed" style={{ color: cfg.color }}>
                  {selectedPkg.details.alertMsg}
                </p>
              </div>
            )}

            {/* Corps scrollable */}
            <div className="flex-grow overflow-y-auto p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Colonne gauche */}
                <div className="lg:col-span-7 space-y-10">

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Target size={16} style={{ color: cfg.color }} />
                      <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-stone/35">01 — Objectif stratégique</h4>
                    </div>
                    <p className="text-base text-brand-stone font-bold leading-relaxed border-l-4 pl-5" style={{ borderColor: cfg.color }}>
                      {selectedPkg.details?.objective}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Workflow size={16} style={{ color: cfg.color }} />
                      <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-stone/35">02 — Plan de déploiement</h4>
                    </div>
                    <div className="space-y-2.5">
                      {selectedPkg.details?.phases?.map((phase: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 bg-brand-beige/50 p-3.5 rounded-xl border border-brand-sand/30 hover:border-brand-orange/30 transition-colors">
                          <div className="w-6 h-6 rounded-full text-white flex items-center justify-center font-black text-[9px] shrink-0" style={{ background: cfg.color }}>{i + 1}</div>
                          <span className="text-[10px] font-black uppercase tracking-tight text-brand-stone/65">{phase}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp size={16} style={{ color: cfg.color }} />
                      <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-stone/35">03 — Impact & ROI concret</h4>
                    </div>
                    <div className="bg-brand-beige p-6 rounded-2xl border border-brand-sand">
                      <p className="text-sm text-brand-stone/65 font-bold leading-relaxed italic">"{selectedPkg.details?.roi}"</p>
                    </div>
                  </div>
                </div>

                {/* Colonne droite */}
                <div className="lg:col-span-5 space-y-5">

                  {selectedPkg.stat && (
                    <div className="p-7 rounded-2xl text-white" style={{ background: cfg.color }}>
                      <div className="text-4xl font-black tracking-tighter">{selectedPkg.stat.value}{selectedPkg.stat.suffix}</div>
                      <div className="text-white/60 text-[9px] font-black uppercase tracking-widest mt-1">{selectedPkg.stat.label}</div>
                    </div>
                  )}

                  <div className="bg-brand-stone p-7 rounded-2xl text-white">
                    <h5 className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 mb-4">Stack technologique</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPkg.details?.techStack?.map((s: string) => (
                        <span key={s} className="px-2.5 py-1 bg-white/10 rounded-lg text-[8px] font-black uppercase tracking-wide border border-white/5">{s}</span>
                      ))}
                    </div>
                    <div className="mt-5 pt-5 border-t border-white/10 space-y-4">
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-brand-orange mb-1">Cible</p>
                        <p className="text-[10px] font-bold text-white/45 leading-relaxed">{selectedPkg.details?.target}</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-brand-orange mb-1">Maintenance</p>
                        <p className="text-[10px] font-bold text-white/45 leading-relaxed">{selectedPkg.details?.maintenance}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-7 rounded-2xl border border-brand-sand">
                    <h5 className="text-[8px] font-black uppercase tracking-widest text-brand-stone/25 mb-4">Tout ce qui est inclus</h5>
                    <div className="space-y-2.5">
                      {selectedPkg.features?.map((f: string, i: number) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 size={12} className="shrink-0 mt-0.5" style={{ color: cfg.color }} />
                          <span className="text-[9px] font-black uppercase text-brand-stone/55">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl border-2 border-dashed flex items-start gap-3"
                    style={{ borderColor: cfg.color + '40', background: cfg.bg }}>
                    <ShieldCheck size={16} className="shrink-0 mt-0.5" style={{ color: cfg.color }} />
                    <div>
                      <div className="text-[8px] font-black uppercase tracking-widest mb-1" style={{ color: cfg.color }}>Garantie Imani-Tech</div>
                      <p className="text-[9px] font-bold text-brand-stone/45 leading-relaxed">Audit de fin de chantier certifié + garantie de performance sur chaque prestation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer modal */}
            <div className="p-6 sm:p-8 bg-brand-beige border-t border-brand-sand flex flex-col sm:flex-row items-center justify-between gap-5 shrink-0">
              <div>
                <div className="text-[8px] font-black uppercase tracking-widest text-brand-stone/30 mb-1">Investissement total</div>
                <div className="text-2xl sm:text-3xl font-black text-brand-stone tracking-tighter">{selectedPkg.price}</div>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Link to={AppRoute.Audit} onClick={() => setSelectedPkg(null)}
                  className="flex-1 sm:flex-none text-center text-white px-7 py-4 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all shadow-lg hover:opacity-80"
                  style={{ background: '#1a1a2e' }}>
                  Demander un audit
                </Link>
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
                  className="flex-1 sm:flex-none text-center bg-brand-orange text-white px-7 py-4 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-brand-stone transition-all shadow-lg">
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
