import React, { useState, useEffect, useRef } from 'react';
import {
  Target, Rocket, Globe, ArrowRight, Zap, CheckCircle, Wifi, Layout,
  HardDrive, Camera, Key, BookOpen, Cpu,
  ShieldCheck, TrendingUp, Info, Phone, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';
import { SERVICES, WHATSAPP_LINK } from '../data';

// ─── Icône map ────────────────────────────────────────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
  'Wifi': <Wifi />, 'Layout': <Layout />, 'HardDrive': <HardDrive />,
  'Camera': <Camera />, 'Key': <Key />, 'BookOpen': <BookOpen />,
  'Phone': <Phone />, 'ShieldCheck': <ShieldCheck />, 'TrendingUp': <TrendingUp />,
  'Shield': <Shield />, 'Rocket': <Rocket />, 'Target': <Target />,
};

// ─── Couleurs par service ─────────────────────────────────────────────────────
const SERVICE_COLORS = [
  '#E87722', '#2563EB', '#0F766E', '#7C3AED',
  '#DC2626', '#D97706', '#DB2777', '#0891B2', '#16A34A',
];

// ─── Contenu approfondi par service (iconName = clé) ─────────────────────────
const SERVICE_DEEP_DATA: Record<string, {
  tagline: string;
  problem: string;
  problemStats: { val: string; label: string }[];
  solution: string;
  steps: { num: string; title: string; desc: string }[];
  results: { val: string; label: string; sub: string }[];
  techDetails: string;
  for: string[];
  faq: { q: string; a: string }[];
  testimonial: { quote: string; author: string; company: string };
  urgency: string;
}> = {
  'Wifi': {
    tagline: 'Un réseau lent, c\'est du chiffre d\'affaires perdu chaque jour.',
    problem: 'Vos équipes perdent jusqu\'à 2h par jour à cause d\'un réseau lent, instable ou mal segmenté. Vos réunions Zoom coupent. Vos transferts de fichiers s\'éternisent. Vos clients attendent. Et vous payez des salaires pour de la productivité volée par une infrastructure défaillante.',
    problemStats: [
      { val: '2h', label: 'Perdues/jour/employé sur réseau défaillant' },
      { val: '67%', label: 'Des PME camerounaises souffrent de pannes réseau mensuelles' },
      { val: '340k', label: 'FCFA perdus/mois sur 10 employés à cause des coupures' },
    ],
    solution: 'Nous concevons et déployons une infrastructure réseau d\'entreprise complète : câblage structuré Cat6/Fibre, WiFi haute densité Ubiquiti, VLAN de segmentation, firewall, VPN multi-sites et tableau de bord de supervision en temps réel. Chaque équipement est dimensionné pour votre charge actuelle et vos 3 prochaines années de croissance.',
    steps: [
      { num: '01', title: 'Audit de l\'existant', desc: 'Analyse de votre infrastructure actuelle, cartographie des points de défaillance et mesure des performances réelles.' },
      { num: '02', title: 'Conception sur mesure', desc: 'Élaboration du plan réseau cible : topologie, équipements, câblage, couverture WiFi et politique de sécurité.' },
      { num: '03', title: 'Déploiement & câblage', desc: 'Installation professionnelle du câblage Cat6/Fibre, baie de brassage, switches, points d\'accès WiFi et firewall.' },
      { num: '04', title: 'Configuration & sécurité', desc: 'Paramétrage des VLANs, QoS, politiques de sécurité, VPN et accès distants sécurisés pour vos équipes.' },
      { num: '05', title: 'Supervision & livraison', desc: 'Mise en place du monitoring 24/7, tests de charge, formation de vos équipes et documentation technique complète.' },
    ],
    results: [
      { val: '99.9%', label: 'Uptime garanti', sub: 'Contractuellement engagé' },
      { val: '-70%', label: 'Pannes réseau', sub: 'Dès le 1er mois' },
      { val: '+35%', label: 'Productivité', sub: 'Mesurée sur 30 jours' },
      { val: '4h', label: 'Intervention max', sub: 'En cas de panne critique' },
    ],
    techDetails: 'Cisco Catalyst & Ubiquiti UniFi pour les équipements actifs. Câblage Cat6A FTP blindé ou Fibre optique selon les distances. pfSense/FortiGate pour le firewall. WireGuard pour les VPN. Grafana + Prometheus pour la supervision.',
    for: ['Bureaux & open-spaces', 'Hôtels & résidences', 'Cliniques & hôpitaux', 'Écoles & universités', 'Entrepôts & industries', 'Administrations publiques'],
    faq: [
      { q: 'Combien de temps dure l\'installation ?', a: 'Entre 2 et 5 jours selon la superficie. Nous travaillons de nuit ou le weekend pour ne pas perturber votre activité.' },
      { q: 'Mon activité sera-t-elle interrompue pendant les travaux ?', a: 'Non. Nous planifions les phases critiques en dehors des heures ouvrables. Un réseau de secours est mis en place si nécessaire.' },
      { q: 'Que se passe-t-il en cas de panne après installation ?', a: 'Notre SLA garantit une intervention sur site en moins de 4h. Un monitoring 24/7 détecte les anomalies avant même que vous ne les ressentez.' },
    ],
    testimonial: { quote: 'Avant Imani-Tech, on perdait 3h par jour à cause du réseau. Maintenant tout est fluide, même avec 40 personnes connectées en même temps.', author: 'Directeur IT', company: 'Groupe Hôtelier, Douala' },
    urgency: 'Chaque jour de retard = argent perdu. Demandez votre audit réseau gratuit aujourd\'hui.',
  },

  'Layout': {
    tagline: 'Un site web qui ne convertit pas est une dépense, pas un investissement.',
    problem: 'Votre site actuel est lent, pas mobile, introuvable sur Google et ne génère aucun prospect. Pendant ce temps, vos concurrents captent vos clients sur le web. En Afrique subsaharienne, 78% des recherches de prestataires se font désormais sur mobile — si vous n\'êtes pas là, vous n\'existez pas.',
    problemStats: [
      { val: '78%', label: 'Des recherches B2B se font sur mobile en Afrique' },
      { val: '3 sec', label: 'Délai max avant qu\'un visiteur quitte votre site' },
      { val: '0', label: 'Prospect généré par un site sans SEO ni conversion' },
    ],
    solution: 'Nous créons des sites web et applications qui travaillent pour vous 24h/24 : design professionnel orienté conversion, vitesse de chargement optimisée, SEO local Cameroun intégré, formulaires de capture de leads, intégration WhatsApp Business et tableau de bord analytics. Votre site devient votre meilleur commercial.',
    steps: [
      { num: '01', title: 'Brief & stratégie digitale', desc: 'Analyse de vos objectifs, de votre cible et de vos concurrents pour définir la stratégie de contenu et de conversion.' },
      { num: '02', title: 'Maquette & design UX/UI', desc: 'Création des maquettes interactives validées avec vous avant tout développement. Design moderne orienté conversion.' },
      { num: '03', title: 'Développement & intégration', desc: 'Développement React/Next.js ou WordPress selon votre besoin. Intégration des contenus, formulaires et outils marketing.' },
      { num: '04', title: 'SEO & optimisation', desc: 'Optimisation technique et sémantique pour Google. Mots-clés locaux Cameroun, vitesse de chargement et accessibilité.' },
      { num: '05', title: 'Lancement & formation', desc: 'Mise en ligne sécurisée, formation de votre équipe à la gestion du contenu et suivi mensuel des performances.' },
    ],
    results: [
      { val: '+180%', label: 'Trafic organique', sub: 'En 6 mois de SEO' },
      { val: '<2s', label: 'Chargement', sub: 'Score PageSpeed 90+' },
      { val: '+65%', label: 'Taux de contact', sub: 'Via formulaires & WhatsApp' },
      { val: '100%', label: 'Mobile-first', sub: 'Responsive tous devices' },
    ],
    techDetails: 'React 18 + Next.js pour les performances et le SEO. Tailwind CSS pour le design. Vercel/Hostinger pour l\'hébergement. Google Analytics 4 + Search Console. WhatsApp Business API pour la capture de leads en temps réel.',
    for: ['PME souhaitant exister sur internet', 'Commerces cherchant des clients en ligne', 'Professions libérales (médecins, avocats, architectes)', 'Startups en phase de lancement', 'Revendeurs cherchant un catalogue en ligne'],
    faq: [
      { q: 'Combien de temps pour créer mon site ?', a: 'Entre 2 et 4 semaines selon la complexité. Vous avez un accès quotidien à l\'avancement via notre espace collaboratif.' },
      { q: 'Je peux modifier le contenu moi-même après ?', a: 'Oui. Nous intégrons une interface d\'administration simple (CMS) et vous formons à son utilisation en 2 heures.' },
      { q: 'Le SEO, ça prend combien de temps pour voir des résultats ?', a: 'Les premières améliorations de positionnement sont visibles dès 6-8 semaines. Les résultats significatifs arrivent à 3-6 mois.' },
    ],
    testimonial: { quote: 'Notre nouveau site a généré 23 demandes de devis en 2 mois. Avant on en avait zéro par an via internet.', author: 'Gérant', company: 'Cabinet Comptable, Yaoundé' },
    urgency: 'Chaque jour sans site performant, vos concurrents prennent vos clients. Lancez votre projet cette semaine.',
  },

  'HardDrive': {
    tagline: 'Vos données sont votre actif le plus précieux — les avez-vous vraiment protégées ?',
    problem: 'Un disque dur qui lâche, un serveur qui surchauffe, une coupure d\'électricité sans onduleur — et c\'est des années de données qui disparaissent en quelques secondes. Au Cameroun, 58% des PME qui perdent leurs données ferment dans les 6 mois suivants. Votre serveur sous le bureau avec un ventilateur bruyant n\'est pas une infrastructure, c\'est une bombe à retardement.',
    problemStats: [
      { val: '58%', label: 'Des PME ferment dans les 6 mois après perte de données' },
      { val: '4.2M', label: 'FCFA : coût moyen d\'une perte de données pour une PME' },
      { val: '0', label: 'Sauvegarde automatique testée dans 7 PME sur 10' },
    ],
    solution: 'Nous déployons des infrastructures serveur professionnelles : serveurs NAS redondants, onduleurs, climatisation adaptée, sauvegardes automatiques quotidiennes sur site ET hors site, accès distant sécurisé et monitoring de température/charge 24/7. Vos données sont indestructibles.',
    steps: [
      { num: '01', title: 'Audit du parc existant', desc: 'Évaluation de vos serveurs actuels, analyse des risques et des points de défaillance potentiels.' },
      { num: '02', title: 'Dimensionnement de la solution', desc: 'Calcul des besoins en stockage, redondance, alimentation et climatisation selon votre activité.' },
      { num: '03', title: 'Installation & câblage', desc: 'Mise en rack professionnel, câblage structuré, onduleurs, climatisation et protection incendie.' },
      { num: '04', title: 'Configuration & sauvegarde', desc: 'Paramétrage RAID, politique de sauvegarde 3-2-1, chiffrement des données sensibles et plan de reprise.' },
      { num: '05', title: 'Monitoring continu', desc: 'Supervision des températures, de la charge, des disques et des sauvegardes avec alertes SMS/email.' },
    ],
    results: [
      { val: '0', label: 'Perte de données', sub: 'Sur toutes nos installations' },
      { val: 'RAID 6', label: 'Redondance minimale', sub: 'Jusqu\'à 2 disques défaillants' },
      { val: '<15min', label: 'RTO restauration', sub: 'Recovery Time Objective' },
      { val: '24/7', label: 'Monitoring actif', sub: 'Alertes instantanées' },
    ],
    techDetails: 'Synology et QNAP pour les NAS. Dell PowerEdge et HP ProLiant pour les serveurs dédiés. APC et Eaton pour les onduleurs. Veeam Backup pour les sauvegardes. iSCSI et NFS pour le stockage réseau partagé.',
    for: ['Cabinets médicaux & cliniques', 'Études notariales & cabinets d\'avocats', 'Comptables & experts-comptables', 'PME avec base de données clients', 'Hôtels & restaurants', 'Agences & studios créatifs'],
    faq: [
      { q: 'Ma sauvegarde actuelle sur clé USB suffit-elle ?', a: 'Non. Une clé USB peut être volée, perdue ou défaillante. Notre solution 3-2-1 garantit 3 copies sur 2 supports différents dont 1 hors site.' },
      { q: 'Que faire si mon serveur tombe en panne un vendredi soir ?', a: 'Notre monitoring détecte la panne avant même que vous la constatiez. Intervention garantie sous 4h, 7j/7.' },
      { q: 'Puis-je accéder à mes données depuis l\'extérieur ?', a: 'Oui. Nous configurons un accès VPN sécurisé et un portail cloud privé accessible depuis n\'importe quel appareil dans le monde.' },
    ],
    testimonial: { quote: 'Notre serveur a crashé un lundi matin. Grâce au monitoring Imani-Tech, ils étaient là à 7h avec le matériel de remplacement. Zéro donnée perdue.', author: 'Directeur Administratif', company: 'Clinique Privée, Bafoussam' },
    urgency: 'Attendez-vous la prochaine panne pour agir ? Un audit de votre infrastructure coûte 0 FCFA.',
  },

  'Camera': {
    tagline: 'Ce que vous ne voyez pas vous coûte déjà de l\'argent.',
    problem: 'Vol à l\'étalage, vol interne, intrusion nocturne, faux accidents — sans vidéosurveillance, vous ne saurez jamais ce qui se passe réellement dans vos locaux. Au Cameroun, 1 commerce sur 3 est victime de vol au moins une fois par an. Et dans 80% des cas, la fraude vient de l\'intérieur. Les caméras ne mentent pas.',
    problemStats: [
      { val: '1/3', label: 'Des commerces camerounais victimes de vol/an' },
      { val: '80%', label: 'Des fraudes impliquent un employé ou collaborateur interne' },
      { val: '-60%', label: 'De réduction des incidents avec un système CCTV visible' },
    ],
    solution: 'Nous installons des systèmes de vidéosurveillance professionnels HD/4K avec vision nocturne, détection de mouvement par intelligence artificielle, accès en temps réel depuis votre smartphone partout dans le monde, enregistrement 30 jours et alertes instantanées. Vous voyez tout, à tout moment.',
    steps: [
      { num: '01', title: 'Audit des zones à surveiller', desc: 'Visite sur site pour identifier les angles morts, points d\'entrée critiques et zones sensibles à couvrir.' },
      { num: '02', title: 'Plan de couverture optimisé', desc: 'Conception du plan de placement des caméras pour une couverture maximale sans zone morte.' },
      { num: '03', title: 'Installation & câblage', desc: 'Pose des caméras, câblage RG59 ou réseau IP, installation du NVR/DVR et configuration du stockage.' },
      { num: '04', title: 'Configuration IA & accès distant', desc: 'Paramétrage des zones de détection, alertes intelligentes et configuration de l\'application mobile sécurisée.' },
      { num: '05', title: 'Formation & livraison', desc: 'Formation de vos responsables à la consultation des enregistrements, export de preuves et gestion des alertes.' },
    ],
    results: [
      { val: '-60%', label: 'Incidents de vol', sub: 'Dès le 1er mois' },
      { val: '4K', label: 'Résolution maximale', sub: 'Vision nocturne incluse' },
      { val: '30j', label: 'Historique vidéo', sub: 'Enregistrement continu' },
      { val: 'IA', label: 'Détection intelligente', sub: 'Zéro fausse alarme' },
    ],
    techDetails: 'Caméras Hikvision 4K et Dahua AI pour les équipements. NVR 8 à 32 canaux selon la taille du site. Application Hik-Connect pour l\'accès mobile. Câblage Cat6 pour les systèmes IP ou RG59 pour l\'analogique. Stockage NAS en option pour les gros volumes.',
    for: ['Boutiques & magasins', 'Supermarchés & grandes surfaces', 'Hôtels & restaurants', 'Entrepôts & dépôts', 'Résidences & villas', 'Bureaux & open-spaces', 'Stations-service'],
    faq: [
      { q: 'Puis-je voir mes caméras depuis Paris ou Dubaï ?', a: 'Oui. L\'application mobile vous donne accès à toutes vos caméras en temps réel depuis n\'importe quel smartphone dans le monde, 24h/24.' },
      { q: 'Que se passe-t-il en cas de coupure d\'électricité ?', a: 'Nous intégrons des onduleurs pour maintenir le système jusqu\'à 4h. En option, batterie de secours 12h pour les sites critiques.' },
      { q: 'Les enregistrements peuvent-ils servir de preuve légale ?', a: 'Oui. Nos systèmes horodatent et certifient chaque enregistrement. Nous vous aidons à exporter les séquences pour dépôt de plainte.' },
    ],
    testimonial: { quote: 'On a identifié et prouvé un vol interne dès la 2ème semaine. L\'installation s\'est rentabilisée en 3 jours.', author: 'Propriétaire', company: 'Supermarché, Douala Akwa' },
    urgency: 'Chaque jour sans caméra est un jour où vous ne savez pas ce qui se passe. Demandez votre devis sous 24h.',
  },

  'Key': {
    tagline: 'Les hackers n\'attendent pas — ils travaillent pendant que vous dormez.',
    problem: 'Votre messagerie professionnelle, vos données clients, votre système de caisse, vos accès bancaires en ligne — tout cela est une cible. Les cyberattaques contre les PME africaines ont augmenté de 400% depuis 2020. Et contrairement à ce que vous pensez, les hackers ne ciblent pas que les grandes entreprises : ils préfèrent les PME, précisément parce qu\'elles n\'ont pas de défenses.',
    problemStats: [
      { val: '400%', label: 'Hausse des cyberattaques sur PME africaines depuis 2020' },
      { val: '67%', label: 'Des PME attaquées ferment dans les 12 mois suivants' },
      { val: '6M', label: 'FCFA : coût moyen d\'une cyberattaque pour une PME' },
    ],
    solution: 'Nous sécurisons votre système d\'information de bout en bout : audit de vulnérabilités, déploiement de solutions EDR/XDR, firewall applicatif, chiffrement des données, formation anti-phishing de vos équipes et surveillance SOC 24/7. Votre entreprise devient une forteresse numérique.',
    steps: [
      { num: '01', title: 'Audit de la surface d\'attaque', desc: 'Cartographie complète de vos actifs exposés, analyse des configurations et identification des failles critiques.' },
      { num: '02', title: 'Plan de remédiation priorisé', desc: 'Rapport détaillé des vulnérabilités avec score CVSS et plan d\'action priorisé par criticité et facilité de correction.' },
      { num: '03', title: 'Déploiement des protections', desc: 'Installation du firewall, EDR sur tous les postes, chiffrement des données sensibles et MFA sur tous les accès.' },
      { num: '04', title: 'Formation de sensibilisation', desc: 'Atelier anti-phishing pour vos équipes, procédures de réponse aux incidents et politique de mots de passe robuste.' },
      { num: '05', title: 'Surveillance continue SOC', desc: 'Monitoring 24/7 de vos systèmes avec détection des comportements anormaux et réponse aux incidents en temps réel.' },
    ],
    results: [
      { val: '-94%', label: 'Risque d\'intrusion', sub: 'Post-déploiement EDR/WAF' },
      { val: '<4min', label: 'Détection incident', sub: 'vs 287 jours en moyenne' },
      { val: '100%', label: 'Chiffrement données', sub: 'Au repos et en transit' },
      { val: '24/7', label: 'Surveillance SOC', sub: 'Alertes instantanées' },
    ],
    techDetails: 'CrowdStrike Falcon ou Microsoft Defender pour l\'EDR. Cloudflare WAF pour la protection web. Wazuh SIEM pour la corrélation d\'événements. Bitwarden pour la gestion des mots de passe. WireGuard VPN pour les accès distants. Formation SANS Institute pour les équipes.',
    for: ['PME traitant des données clients', 'Cabinets médicaux & pharmacies', 'Établissements financiers & microfinance', 'E-commerce & boutiques en ligne', 'Cabinets d\'avocats & notaires', 'Administrations & ONG'],
    faq: [
      { q: 'Mon antivirus basique suffit-il ?', a: 'Non. Les antivirus classiques ne détectent que 40% des menaces modernes. Un EDR analyse les comportements suspects en temps réel et bloque les attaques zero-day.' },
      { q: 'Mon entreprise est trop petite pour être attaquée, non ?', a: 'C\'est exactement ce que pensent 90% des PME attaquées. Les hackers ciblent les petites structures précisément parce qu\'elles ne se protègent pas.' },
      { q: 'Que faire si nous sommes déjà victimes d\'une attaque ?', a: 'Contactez-nous immédiatement. Nous disposons d\'une équipe de réponse aux incidents disponible 24/7 pour contenir l\'attaque et récupérer vos données.' },
    ],
    testimonial: { quote: 'On a reçu une tentative de ransomware un mardi soir. Le système Imani-Tech l\'a bloquée et nous a alertés à 23h17. On a dormi tranquilles.', author: 'DSI', company: 'Société de Microfinance, Douala' },
    urgency: 'Votre prochaine attaque est déjà planifiée. Demandez votre audit de sécurité gratuit maintenant.',
  },

  'BookOpen': {
    tagline: 'La formation IT la plus demandée du marché — directement à Douala.',
    problem: 'Le Cameroun manque de plus de 15 000 techniciens IT qualifiés. Les entreprises peinent à recruter, les salaires explosent et les compétences font défaut. En même temps, des milliers de jeunes cherchent une voie professionnelle solide et rapide. La formation IT est aujourd\'hui la passerelle la plus directe vers l\'emploi et l\'entrepreneuriat numérique.',
    problemStats: [
      { val: '15k+', label: 'Techniciens IT manquants au Cameroun aujourd\'hui' },
      { val: '89%', label: 'De nos diplômés trouvent un emploi en moins de 3 mois' },
      { val: '4x', label: 'Le salaire d\'un technicien IT vs la moyenne nationale' },
    ],
    solution: 'Nos formations IT intensives et pratiques forment des professionnels opérationnels en 4 à 12 semaines : réseaux (CCNA), vidéosurveillance CCTV, développement web fullstack et cybersécurité. 70% de pratique sur équipements réels, formateurs certifiés, attestation reconnue et réseau alumni actif pour l\'insertion.',
    steps: [
      { num: '01', title: 'Évaluation & orientation', desc: 'Test de niveau et entretien individuel pour définir la formation la mieux adaptée à votre profil et objectifs.' },
      { num: '02', title: 'Formation théorique intensive', desc: 'Cours magistraux avec supports visuels, études de cas réels du marché camerounais et quizz de validation.' },
      { num: '03', title: 'Ateliers pratiques sur matériel réel', desc: '70% du temps en atelier : installation, configuration, dépannage sur les équipements professionnels utilisés en entreprise.' },
      { num: '04', title: 'Projet de fin de formation', desc: 'Réalisation d\'un projet complet en conditions réelles : installation d\'une salle réseau, d\'un système CCTV ou d\'un site web.' },
      { num: '05', title: 'Certification & insertion', desc: 'Examen de certification, remise de l\'attestation, mise en relation avec notre réseau d\'entreprises partenaires.' },
    ],
    results: [
      { val: '89%', label: 'Taux d\'emploi', sub: 'Dans les 3 mois post-formation' },
      { val: '70%', label: 'Pratique', sub: 'Sur matériel professionnel réel' },
      { val: '300k', label: 'FCFA/mois min', sub: 'Salaire d\'entrée diplômé' },
      { val: '4-12', label: 'Semaines', sub: 'Pour être opérationnel' },
    ],
    techDetails: 'Salles équipées en routeurs Cisco, switches Catalyst, maquettes réseau complètes, caméras Hikvision/Dahua, NVR, postes de développement sous Linux/Windows. Accès e-learning 6 mois post-formation. Groupe WhatsApp alumni actif.',
    for: ['Étudiants cherchant une insertion rapide', 'Professionnels en reconversion', 'Électriciens souhaitant se spécialiser', 'Entrepreneurs du secteur sécurité', 'Agents IT voulant monter en compétence', 'Demandeurs d\'emploi motivés'],
    faq: [
      { q: 'Faut-il avoir un niveau technique préalable ?', a: 'Non pour la plupart des formations. Nous partons de zéro et avançons progressivement. Un test d\'entrée permet de valider la faisabilité.' },
      { q: 'L\'attestation est-elle reconnue par les employeurs ?', a: 'Oui. Nos attestations sont reconnues par notre réseau de +50 entreprises partenaires. Certaines formations préparent aux certifications Cisco et CompTIA.' },
      { q: 'Proposez-vous des formations en entreprise ?', a: 'Oui. Nous nous déplaçons dans vos locaux pour former vos équipes sur vos propres équipements. Tarifs sur devis.' },
    ],
    testimonial: { quote: 'J\'ai suivi la formation réseau en 6 semaines. Deux mois plus tard j\'avais un CDI à 350 000 FCFA/mois. Meilleur investissement de ma vie.', author: 'Technicien Réseau', company: 'Banque Internationale, Douala' },
    urgency: 'Les places sont limitées à 12 par session. Inscrivez-vous cette semaine pour la prochaine session.',
  },

  'Phone': {
    tagline: 'Votre téléphonie vous coûte une fortune pour une qualité médiocre — ça suffit.',
    problem: 'Les forfaits mobiles professionnels coûtent cher, la qualité audio est mauvaise, vous ne pouvez pas transférer d\'appels entre collègues, votre numéro change quand un employé part et vous n\'avez aucune visibilité sur les communications. La téléphonie IP d\'entreprise résout tout ça — et coûte 10x moins cher que votre solution actuelle.',
    problemStats: [
      { val: '-80%', label: 'Sur vos factures téléphoniques avec la VoIP' },
      { val: '∞', label: 'Lignes simultanées sans ligne fixe supplémentaire' },
      { val: '1 seul', label: 'Numéro d\'entreprise pour toute votre équipe' },
    ],
    solution: 'Nous déployons des solutions de téléphonie IP (VoIP) complètes : IPBX professionnel, téléphones de bureau ou application mobile, numéro unique pour toute l\'entreprise, transfert d\'appels intelligent, messagerie vocale par email, enregistrement des appels et statistiques détaillées.',
    steps: [
      { num: '01', title: 'Audit de vos besoins', desc: 'Analyse de votre volume d\'appels, nombre d\'utilisateurs, sites à connecter et fonctionnalités nécessaires.' },
      { num: '02', title: 'Conception de l\'architecture VoIP', desc: 'Dimensionnement de l\'IPBX, choix des codecs, plan de numérotation interne et externe, règles de routage.' },
      { num: '03', title: 'Installation de l\'IPBX', desc: 'Déploiement du serveur Asterisk/FreePBX, configuration des lignes SIP et intégration à votre réseau existant.' },
      { num: '04', title: 'Configuration des postes', desc: 'Paramétrage des téléphones IP, des applications mobiles et des fonctionnalités avancées (SVI, file d\'attente, musique d\'attente).' },
      { num: '05', title: 'Formation & mise en service', desc: 'Formation de vos équipes, tests de qualité audio et livraison avec documentation complète du système.' },
    ],
    results: [
      { val: '-80%', label: 'Facture télécom', sub: 'Dès le 1er mois' },
      { val: '∞', label: 'Appels simultanés', sub: 'Sans frais supplémentaires' },
      { val: 'HD', label: 'Qualité audio', sub: 'Codec G.722 wideband' },
      { val: 'Multi-sites', label: 'Connexion', sub: 'Toutes vos agences liées' },
    ],
    techDetails: 'Asterisk et FreePBX pour l\'IPBX. Yealink et Grandstream pour les téléphones IP. Zoiper et Linphone pour les applications mobiles. SIP trunking local avec les opérateurs camerounais. QoS réseau pour prioriser la voix.',
    for: ['Entreprises avec plusieurs agences', 'Call centers & service client', 'Hôtels & hôtellerie', 'Cliniques & hôpitaux', 'PME avec équipes terrain', 'Administrations & ONG'],
    faq: [
      { q: 'La qualité des appels VoIP est-elle bonne avec la connexion camerounaise ?', a: 'Oui si bien configurée. Nous optimisons la QoS de votre réseau pour prioriser la voix. La qualité dépasse souvent les appels GSM classiques.' },
      { q: 'Puis-je conserver mon numéro fixe actuel ?', a: 'Oui dans la majorité des cas. Nous gérons le portage de numéro avec votre opérateur actuel sans interruption de service.' },
      { q: 'Mes équipes terrain peuvent-elles aussi utiliser le système ?', a: 'Oui. L\'application mobile transforme n\'importe quel smartphone en poste VoIP professionnel, qu\'ils soient à Douala, Yaoundé ou Bafoussam.' },
    ],
    testimonial: { quote: 'On avait 8 lignes Orange Pro à 25 000 FCFA chacune. Maintenant on a 30 postes VoIP pour 45 000 FCFA/mois total. Et la qualité est bien meilleure.', author: 'DAF', company: 'Société de Négoce, Douala' },
    urgency: 'Calculez vos économies potentielles gratuitement. Audit télécom offert sans engagement.',
  },

  'ShieldCheck': {
    tagline: 'Contrôlez qui entre dans vos locaux — ou attendez le prochain incident.',
    problem: 'Des clés perdues, des badges non restitués, des visiteurs non accompagnés, des accès non contrôlés après les heures de bureau — votre entreprise est ouverte à n\'importe qui sans que vous le sachiez. Le contrôle d\'accès biométrique met fin à cette vulnérabilité en vous donnant une visibilité totale sur qui se trouve dans vos locaux à chaque instant.',
    problemStats: [
      { val: '73%', label: 'Des incidents de sécurité impliquent un accès physique non autorisé' },
      { val: '100%', label: 'De traçabilité des accès avec notre solution biométrique' },
      { val: '-85%', label: 'De pertes internes après installation du contrôle d\'accès' },
    ],
    solution: 'Nous installons des systèmes de contrôle d\'accès biométriques complets : lecteurs d\'empreintes digitales et reconnaissance faciale, badges RFID personnalisés, serrures électromagnétiques, gestion multi-sites centralisée, historique complet des accès et intégration au module de pointage RH.',
    steps: [
      { num: '01', title: 'Audit des zones à contrôler', desc: 'Cartographie de vos locaux, identification des zones critiques et définition des niveaux d\'accès par profil.' },
      { num: '02', title: 'Conception du plan d\'accès', desc: 'Définition des droits d\'accès par zone, horaire et profil. Plan d\'installation des lecteurs et serrures.' },
      { num: '03', title: 'Installation du matériel', desc: 'Pose des lecteurs biométriques, serrures électromagnétiques, câblage et installation du contrôleur central.' },
      { num: '04', title: 'Enregistrement & configuration', desc: 'Enregistrement des empreintes et visages, création des badges, paramétrage des règles d\'accès et horaires.' },
      { num: '05', title: 'Formation & démarrage', desc: 'Formation des administrateurs, tests de sécurité, simulation d\'intrusion et livraison avec tableau de bord en ligne.' },
    ],
    results: [
      { val: '100%', label: 'Traçabilité', sub: 'Chaque accès enregistré' },
      { val: '-85%', label: 'Pertes internes', sub: 'Mesurées chez nos clients' },
      { val: '0', label: 'Clé perdue', sub: 'Badge ou biométrie seulement' },
      { val: 'RH', label: 'Intégration pointage', sub: '40h/mois économisées' },
    ],
    techDetails: 'ZKTeco et Suprema pour les lecteurs biométriques. HID Global pour les badges RFID. Serrures électromagnétiques de 300 à 600 kg de force. Logiciel ZKAccess pour la gestion centralisée. API REST pour l\'intégration aux logiciels RH.',
    for: ['Bureaux & open-spaces', 'Entrepôts & dépôts', 'Cliniques & pharmacies', 'Hôtels & résidences', 'Écoles & universités', 'Datacenters & salles serveurs'],
    faq: [
      { q: 'Que se passe-t-il si le système tombe en panne ?', a: 'Chaque installation inclut un mode de déverrouillage de secours et une batterie tampon 8h. Intervention garantie sous 4h en cas de défaillance.' },
      { q: 'Peut-on gérer plusieurs bâtiments depuis une seule interface ?', a: 'Oui. Le logiciel centralise tous vos sites en un seul tableau de bord, accessible depuis n\'importe quel navigateur web sécurisé.' },
      { q: 'Les données biométriques sont-elles stockées localement ?', a: 'Oui, les empreintes sont stockées localement sur le lecteur sous forme de gabarit chiffré et ne quittent jamais votre site.' },
    ],
    testimonial: { quote: 'Depuis l\'installation, on a économisé 2h par jour sur le pointage RH et éliminé 100% des accès non autorisés après 18h.', author: 'DRH', company: 'Usine Agroalimentaire, Bonabéri' },
    urgency: 'Ne découvrez pas trop tard qui avait accès à quoi. Devis gratuit sous 24h.',
  },

  'TrendingUp': {
    tagline: 'Votre concurrent en ligne prend vos clients — chaque jour que vous attendez.',
    problem: 'Avoir une page Facebook avec 200 likes n\'est pas une stratégie digitale. Vos clients potentiels cherchent vos services sur Google et Instagram, mais ils tombent sur vos concurrents — pas sur vous. En Afrique, le digital croît de 34% par an. Ceux qui n\'investissent pas maintenant auront 10 ans de retard à rattraper dans 3 ans.',
    problemStats: [
      { val: '34%', label: 'Croissance annuelle du marché digital en Afrique subsaharienne' },
      { val: '78%', label: 'Des décisions d\'achat B2B commencent par une recherche Google' },
      { val: '0', label: 'Lead généré par une stratégie digitale inexistante ou mal exécutée' },
    ],
    solution: 'Nous construisons et exécutons votre stratégie digitale 360° : gestion professionnelle de vos réseaux sociaux, création de contenu vidéo et graphique, campagnes Google Ads et Meta Ads ciblées, SEO local Cameroun, email marketing et reporting mensuel complet avec les leads générés.',
    steps: [
      { num: '01', title: 'Audit digital & concurrence', desc: 'Analyse de votre présence actuelle, de vos concurrents et identification des opportunités de croissance immédiate.' },
      { num: '02', title: 'Stratégie de contenu', desc: 'Définition du calendrier éditorial, des thématiques, du tone of voice et des formats adaptés à votre audience camerounaise.' },
      { num: '03', title: 'Création de contenus', desc: 'Production de visuels, vidéos courtes, textes et stories adaptés à chaque plateforme avec votre identité de marque.' },
      { num: '04', title: 'Campagnes publicitaires', desc: 'Lancement et optimisation de campagnes Google Ads et Meta Ads avec ciblage précis et A/B testing continu.' },
      { num: '05', title: 'Analyse & optimisation', desc: 'Rapport mensuel détaillé avec les leads générés, coût par acquisition et recommandations d\'optimisation.' },
    ],
    results: [
      { val: '+320%', label: 'Visibilité organique', sub: 'En 6 mois de SEO' },
      { val: '7x', label: 'ROAS moyen', sub: 'Sur nos campagnes Meta/Google' },
      { val: '-40%', label: 'Coût par lead', sub: 'Après 90 jours d\'optimisation' },
      { val: '+180%', label: 'Engagement', sub: 'Sur les réseaux sociaux' },
    ],
    techDetails: 'Meta Business Suite pour la gestion et les publicités Facebook/Instagram. Google Ads et Analytics 4 pour les campagnes search. Canva Pro et Adobe Premiere pour la création de contenus. Mailchimp pour l\'email marketing. Looker Studio pour les dashboards clients.',
    for: ['PME souhaitant attirer des clients en ligne', 'Commerces avec une cible locale', 'Restaurants & hôtellerie', 'Promoteurs immobiliers', 'Établissements d\'enseignement', 'Professions libérales'],
    faq: [
      { q: 'Combien de temps avant de voir des résultats ?', a: 'Les campagnes payantes génèrent des leads dès la 1ère semaine. Le SEO et l\'organique produisent des résultats significatifs à 3-6 mois.' },
      { q: 'Quel budget publicitaire prévoir ?', a: 'Nous recommandons un minimum de 50 000 FCFA/mois pour les campagnes payantes. Notre expertise permet d\'optimiser chaque franc investi.' },
      { q: 'Comment mesurer le retour sur investissement ?', a: 'Chaque mois vous recevez un rapport avec le nombre de leads, le coût par acquisition, le trafic généré et les conversions — tout est mesurable.' },
    ],
    testimonial: { quote: 'En 4 mois de campagnes Meta Ads avec Imani-Tech, on est passé de 2 à 18 demandes de devis par semaine. Notre agenda est plein 3 semaines à l\'avance.', author: 'PDG', company: 'Agence Immobilière, Douala' },
    urgency: 'Pendant que vous lisez ceci, vos concurrents captent vos clients en ligne. Démarrez votre stratégie digitale cette semaine.',
  },

  'Shield': {
    tagline: 'Votre alarme incendie peut sauver des vies — ou vous coûter votre liberté.',
    problem: 'La réglementation camerounaise impose une installation anti-incendie certifiée dans tout Établissement Recevant du Public. Sans système certifié, vous risquez la fermeture administrative, une amende et surtout votre responsabilité pénale en cas d\'incident. Un incendie non détecté à temps peut détruire en 7 minutes ce que vous avez construit en 20 ans.',
    problemStats: [
      { val: '7 min', label: 'Pour qu\'un incendie devienne incontrôlable sans détection précoce' },
      { val: '8x', label: 'Plus rapide qu\'une détection humaine avec un système certifié' },
      { val: '-30%', label: 'Sur votre prime d\'assurance avec une installation certifiée' },
    ],
    solution: 'Nous installons des systèmes d\'alarme incendie certifiés selon les normes camerounaises et internationales : détecteurs optiques de fumée et thermovélocimétriques, centrale d\'alarme intelligente, sirènes intérieures et extérieures, déclencheurs manuels, signalisation lumineuse d\'évacuation et délivrance du certificat de conformité officiel.',
    steps: [
      { num: '01', title: 'Audit des risques incendie', desc: 'Visite sur site pour identifier les zones à risque, les matériaux inflammables et les scénarios d\'incendie possibles.' },
      { num: '02', title: 'Plan d\'implantation certifié', desc: 'Conception du plan de placement des détecteurs selon les normes NF S 61-950 et les surfaces à couvrir.' },
      { num: '03', title: 'Installation certifiée', desc: 'Pose des détecteurs, centrale d\'alarme, sirènes, déclencheurs manuels et câblage résistant au feu FR-N1X1.' },
      { num: '04', title: 'Test & validation', desc: 'Test complet du système : simulation de fumée, test des sirènes, vérification des temps d\'alarme et des liaisons.' },
      { num: '05', title: 'Formation & certification', desc: 'Formation du personnel aux procédures d\'évacuation et délivrance du certificat de conformité officiel.' },
    ],
    results: [
      { val: '8x', label: 'Détection plus rapide', sub: 'Vs détection humaine' },
      { val: '<30s', label: 'Alarme déclenchée', sub: 'Après détection de fumée' },
      { val: '-30%', label: 'Prime assurance', sub: 'Avec installation certifiée' },
      { val: '100%', label: 'Conformité légale', sub: 'Certificat officiel délivré' },
    ],
    techDetails: 'Détecteurs optiques Hochiki et Apollo certifiés EN 54. Centrale Notifier ou Napco. Câblage résistant au feu FR-N1X1. Batterie secours 72h. Signalisation BAES lumineuse. Liaison optionnelle avec le centre des sapeurs-pompiers.',
    for: ['Hôtels & restaurants', 'Écoles & universités', 'Cliniques & hôpitaux', 'Bureaux & open-spaces', 'Entrepôts & usines', 'Marchés & centres commerciaux', 'Tous ERP au Cameroun'],
    faq: [
      { q: 'Mon bâtiment est ancien — peut-on quand même installer le système ?', a: 'Oui. Nous avons l\'expérience des rénovations en site occupé. Des solutions sans fil existent pour les bâtiments difficiles à câbler.' },
      { q: 'Le certificat de conformité est-il accepté par les assurances ?', a: 'Oui. Notre certificat est établi par un technicien agréé et reconnu par les compagnies d\'assurance et les autorités camerounaises.' },
      { q: 'À quelle fréquence faut-il faire la maintenance ?', a: 'La maintenance est trimestrielle obligatoire selon les normes. Elle est incluse dans notre contrat de maintenance annuel.' },
    ],
    testimonial: { quote: 'L\'inspection de la Mairie nous a donné 30 jours pour installer un système certifié ou fermer. Imani-Tech a tout installé en 5 jours avec le certificat. On a évité la fermeture.', author: 'Gérant', company: 'Hôtel 3 étoiles, Yaoundé Centre' },
    urgency: 'La prochaine inspection peut tomber demain. Mettez-vous en conformité maintenant — devis sous 24h.',
  },

  'Rocket': {
    tagline: 'Le cloud n\'est plus une option — c\'est la fondation de votre compétitivité.',
    problem: 'Vos données critiques sont sur un disque dur local. Votre serveur vous coûte 400 000 FCFA/an de maintenance. Votre équipe ne peut pas travailler à distance. Et si la salle serveur brûle, c\'est l\'entreprise qui brûle avec. Le cloud permet de travailler de partout, de ne jamais perdre de données et de réduire de 60% vos coûts informatiques.',
    problemStats: [
      { val: '-60%', label: 'De coûts IT avec une migration cloud bien exécutée' },
      { val: '99.95%', label: 'SLA de disponibilité garanti sur nos solutions cloud' },
      { val: '0', label: 'Donnée perdue sur toutes nos infrastructures cloud depuis 5 ans' },
    ],
    solution: 'Nous migrons et hébergeons vos applications et données sur le cloud : migration sécurisée, hébergement haute disponibilité, sauvegarde automatique quotidienne, accès sécurisé depuis partout, scalabilité instantanée et support technique dédié. Votre IT devient agile, fiable et économique.',
    steps: [
      { num: '01', title: 'Audit de migration', desc: 'Inventaire de vos applications, bases de données et données. Évaluation de la complexité et des dépendances.' },
      { num: '02', title: 'Architecture cloud cible', desc: 'Conception de l\'infrastructure cloud adaptée : serveurs virtuels, bases de données managées, CDN et sécurité.' },
      { num: '03', title: 'Migration sécurisée', desc: 'Migration progressive et testée de vos données et applications sans interruption de service.' },
      { num: '04', title: 'Sécurisation & sauvegardes', desc: 'Configuration des accès, des politiques de sauvegarde et des procédures de reprise d\'activité.' },
      { num: '05', title: 'Formation & optimisation', desc: 'Formation de vos équipes à l\'environnement cloud et optimisation mensuelle des coûts.' },
    ],
    results: [
      { val: '99.95%', label: 'Disponibilité', sub: 'SLA contractuel garanti' },
      { val: '-60%', label: 'Coûts IT', sub: 'Vs infrastructure locale' },
      { val: 'Partout', label: 'Accès sécurisé', sub: 'Depuis n\'importe quel device' },
      { val: '0', label: 'Perte de données', sub: 'Sauvegarde automatique 3-2-1' },
    ],
    techDetails: 'Microsoft Azure et AWS pour les infrastructures cloud. Docker et Kubernetes pour la conteneurisation. Veeam pour les sauvegardes. Cloudflare pour la sécurité et le CDN. Terraform pour l\'infrastructure as code. VPN WireGuard pour les accès distants.',
    for: ['PME souhaitant moderniser leur SI', 'Entreprises avec équipes distribuées', 'Startups cherchant l\'agilité IT', 'ONG et associations', 'Cabinets professionnels', 'E-commerce en croissance'],
    faq: [
      { q: 'La connexion internet camerounaise est-elle suffisante pour le cloud ?', a: 'Oui pour la majorité des usages. Nous optimisons les accès selon votre bande passante et pouvons mettre en place un cache local si nécessaire.' },
      { q: 'Mes données sont-elles en sécurité sur le cloud ?', a: 'Plus que sur votre serveur local. Les datacenters Azure et AWS ont des certifications ISO 27001, 24h de gardiennage et des systèmes anti-incendie que vous n\'aurez jamais localement.' },
      { q: 'Puis-je revenir à une infrastructure locale si je le souhaite ?', a: 'Oui, vos données restent les vôtres. Nous pouvons à tout moment exporter et rapatrier l\'intégralité de vos données.' },
    ],
    testimonial: { quote: 'On travaille depuis Douala, Yaoundé et Paris sur les mêmes fichiers en temps réel. La productivité a augmenté de 40% et on a économisé 6 millions FCFA sur les serveurs.', author: 'CEO', company: 'Cabinet Conseil International, Douala' },
    urgency: 'Chaque mois sur serveur local = argent perdu et risque inutile. Demandez votre audit de migration gratuit.',
  },
};

// ─── Images Unsplash dédiées par iconName ────────────────────────────────────
// Chaque service a sa propre photo ultra-pertinente
const SERVICE_IMAGES: Record<string, { url: string; label: string; effect: string }> = {
  'Wifi': {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=85&w=900',
    label: 'Infrastructure Réseau',
    effect: 'scan',       // effet scan horizontal
  },
  'Layout': {
    url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=85&w=900',
    label: 'Développement Web',
    effect: 'glitch',     // effet glitch coloré
  },
  'HardDrive': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=85&w=900',
    label: 'Serveurs & Stockage',
    effect: 'pulse',      // pulsation lumineuse
  },
  'Camera': {
    url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=85&w=900',
    label: 'Vidéosurveillance',
    effect: 'cctv',       // effet CCTV avec timestamp
  },
  'Key': {
    url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=85&w=900',
    label: 'Cybersécurité',
    effect: 'matrix',     // pluie de code matrix
  },
  'BookOpen': {
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=85&w=900',
    label: 'Formation IT',
    effect: 'scan',
  },
  'Phone': {
    url: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&q=85&w=900',
    label: 'Téléphonie IP',
    effect: 'wave',       // ondes sonores animées
  },
  'ShieldCheck': {
    url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=85&w=900',
    label: 'Sécurité Physique',
    effect: 'pulse',
  },
  'TrendingUp': {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=85&w=900',
    label: 'Marketing Digital',
    effect: 'glitch',
  },
  'Shield': {
    url: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=85&w=900',
    label: 'Protection Avancée',
    effect: 'matrix',
  },
  'Rocket': {
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=85&w=900',
    label: 'Solutions Cloud',
    effect: 'wave',
  },
  'Target': {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=85&w=900',
    label: 'Stratégie Digitale',
    effect: 'pulse',
  },
};

// ─── Canvas effet CCTV (caméra de surveillance) ───────────────────────────────
const CCTVEffect: React.FC<{ color: string }> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    let t = 0; let animId: number;

    const draw = () => {
      const W = canvas.width, H = canvas.height; t += 0.02;
      ctx.clearRect(0, 0, W, H);

      // Scan line CCTV
      const scanY = ((t * 0.3) % 1) * H;
      const sg = ctx.createLinearGradient(0, scanY - 3, 0, scanY + 3);
      sg.addColorStop(0, 'transparent'); sg.addColorStop(0.5, `${color}cc`); sg.addColorStop(1, 'transparent');
      ctx.fillStyle = sg; ctx.fillRect(0, scanY - 3, W, 6);

      // Grille CCTV
      ctx.strokeStyle = `${color}20`; ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // Timestamp CCTV
      const now = new Date();
      const ts = `REC ● ${now.toLocaleDateString('fr-FR')} ${now.toLocaleTimeString('fr-FR')}`;
      ctx.font = 'bold 11px monospace'; ctx.fillStyle = color; ctx.globalAlpha = 0.9;
      ctx.fillText(ts, 12, H - 14);
      ctx.globalAlpha = 1;

      // Cercle REC clignotant
      if (Math.sin(t * 3) > 0) {
        ctx.beginPath(); ctx.arc(W - 18, H - 18, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ff3333'; ctx.fill();
      }

      // Coins CCTV
      const cs = 18, cl = 24, cw = 2;
      ctx.strokeStyle = color; ctx.lineWidth = cw; ctx.globalAlpha = 0.8;
      [[0,0],[W,0],[0,H],[W,H]].forEach(([cx,cy]) => {
        const sx = cx === 0 ? cs : -cs, sy = cy === 0 ? cs : -cs;
        ctx.beginPath(); ctx.moveTo(cx, cy + sy); ctx.lineTo(cx, cy); ctx.lineTo(cx + sx, cy); ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // Noise léger
      for (let i = 0; i < 30; i++) {
        const nx = Math.random() * W, ny = Math.random() * H;
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.04})`;
        ctx.fillRect(nx, ny, Math.random() * 3, 1);
      }

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [color]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// ─── Canvas effet Matrix (pluie de code) ─────────────────────────────────────
const MatrixEffect: React.FC<{ color: string }> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const cols = Math.floor(W / 14);
    const drops = Array(cols).fill(0).map(() => Math.random() * H / 14);
    const chars = '01アイウエオカキクケコサシスセソタチ∑∆◊⬡⚡';
    let animId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(3,4,15,0.12)'; ctx.fillRect(0, 0, W, H);
      ctx.font = '11px monospace';
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const alpha = Math.random() > 0.95 ? 1 : 0.4;
        ctx.fillStyle = i % 3 === 0 ? `rgba(255,255,255,${alpha * 0.8})` : `${color}${Math.floor(alpha * 180).toString(16).padStart(2,'0')}`;
        ctx.fillText(ch, i * 14, y * 14);
        drops[i] = y > H / 14 && Math.random() > 0.975 ? 0 : y + 0.4;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [color]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// ─── Canvas effet Scan (radar horizontal) ────────────────────────────────────
const ScanEffect: React.FC<{ color: string }> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    let t = 0; let animId: number;
    const draw = () => {
      const W = canvas.width, H = canvas.height; t += 0.018;
      ctx.clearRect(0, 0, W, H);
      // Lignes horizontales
      for (let y = 0; y < H; y += 20) {
        ctx.strokeStyle = `${color}12`; ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      // Scan line principale
      const scanY = ((Math.sin(t) + 1) / 2) * H;
      const sg = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      sg.addColorStop(0, 'transparent'); sg.addColorStop(0.5, `${color}55`); sg.addColorStop(1, 'transparent');
      ctx.fillStyle = sg; ctx.fillRect(0, scanY - 40, W, 80);
      // Scan vertical secondaire
      const scanX = ((Math.sin(t * 0.7 + 1) + 1) / 2) * W;
      const sgx = ctx.createLinearGradient(scanX - 30, 0, scanX + 30, 0);
      sgx.addColorStop(0, 'transparent'); sgx.addColorStop(0.5, `${color}22`); sgx.addColorStop(1, 'transparent');
      ctx.fillStyle = sgx; ctx.fillRect(scanX - 30, 0, 60, H);
      // Points de données
      for (let i = 0; i < 8; i++) {
        const px = (Math.sin(t * 0.5 + i) * 0.4 + 0.5) * W;
        const py = (Math.cos(t * 0.3 + i * 1.3) * 0.4 + 0.5) * H;
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.globalAlpha = 0.6; ctx.fill(); ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.strokeStyle = color; ctx.lineWidth = 0.5; ctx.globalAlpha = 0.2; ctx.stroke(); ctx.globalAlpha = 1;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [color]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// ─── Canvas effet Glitch ─────────────────────────────────────────────────────
const GlitchEffect: React.FC<{ color: string }> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    let t = 0; let animId: number;
    const draw = () => {
      const W = canvas.width, H = canvas.height; t += 0.02;
      ctx.clearRect(0, 0, W, H);
      // Barres glitch
      const glitchIntensity = Math.abs(Math.sin(t * 0.4));
      if (glitchIntensity > 0.7) {
        for (let i = 0; i < 4; i++) {
          const gy = Math.random() * H;
          const gh = Math.random() * 15 + 2;
          const gx = (Math.random() - 0.5) * 20;
          ctx.fillStyle = i % 2 === 0 ? `${color}30` : `rgba(79,195,247,0.15)`;
          ctx.fillRect(gx, gy, W, gh);
        }
      }
      // Lignes circuit
      ctx.strokeStyle = `${color}25`; ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const lx = (i / 6) * W;
        const amp = 20 + i * 5;
        ctx.beginPath();
        for (let x = 0; x < W; x += 4) {
          const y = H / 2 + amp * Math.sin(t * 1.5 + x * 0.02 + i);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.globalAlpha = 0.3; ctx.stroke(); ctx.globalAlpha = 1;
      }
      // Pixels colorés aléatoires
      for (let i = 0; i < 15; i++) {
        ctx.fillStyle = `${color}40`;
        ctx.fillRect(Math.random() * W, Math.random() * H, Math.random() * 8 + 1, 2);
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [color]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// ─── Canvas effet Pulse (battement lumineux) ─────────────────────────────────
const PulseEffect: React.FC<{ color: string }> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    let t = 0; let animId: number;
    const draw = () => {
      const W = canvas.width, H = canvas.height; t += 0.02;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      // Cercles concentriques pulsants
      for (let ring = 0; ring < 5; ring++) {
        const phase = t * 0.8 + ring * 0.6;
        const r = (ring / 5 + ((phase % 1))) * Math.min(W, H) * 0.55;
        const alpha = (1 - (phase % 1)) * 0.2;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = color; ctx.lineWidth = 1; ctx.globalAlpha = alpha; ctx.stroke(); ctx.globalAlpha = 1;
      }
      // Points orbitaux
      for (let p = 0; p < 6; p++) {
        const angle = t * 0.5 + (p / 6) * Math.PI * 2;
        const r = Math.min(W, H) * 0.3;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.globalAlpha = 0.7; ctx.fill(); ctx.globalAlpha = 1;
        // Ligne vers le centre
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py);
        ctx.strokeStyle = color; ctx.lineWidth = 0.5; ctx.globalAlpha = 0.15; ctx.stroke(); ctx.globalAlpha = 1;
      }
      // Centre lumineux
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
      glow.addColorStop(0, `${color}40`); glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow; ctx.fillRect(cx - 40, cy - 40, 80, 80);
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [color]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// ─── Canvas effet Wave (ondes) ───────────────────────────────────────────────
const WaveEffect: React.FC<{ color: string }> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    let t = 0; let animId: number;
    const draw = () => {
      const W = canvas.width, H = canvas.height; t += 0.025;
      ctx.clearRect(0, 0, W, H);
      // Ondes multiples
      for (let wave = 0; wave < 5; wave++) {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 3) {
          const y = H / 2 + Math.sin(x * 0.015 + t * 1.2 + wave * 0.8) * (25 + wave * 8)
                           + Math.sin(x * 0.03 + t * 0.8 + wave) * 12;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color; ctx.lineWidth = 1.2;
        ctx.globalAlpha = (0.5 - wave * 0.08); ctx.stroke(); ctx.globalAlpha = 1;
      }
      // Particules sur les ondes
      for (let p = 0; p < 8; p++) {
        const px = ((t * 0.15 + p * 0.125) % 1) * W;
        const py = H / 2 + Math.sin(px * 0.015 + t * 1.2) * 30;
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.globalAlpha = 0.8; ctx.fill(); ctx.globalAlpha = 1;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [color]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// ─── Composant image dynamique par service ────────────────────────────────────
const ServiceImage: React.FC<{ iconName: string; color: string; title: string }> = ({ iconName, color, title }) => {
  const imgRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const imgData = SERVICE_IMAGES[iconName] || {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=85&w=900',
    label: title, effect: 'scan',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setMouseOffset({ x, y });
  };

  const effectComponent = () => {
    switch (imgData.effect) {
      case 'cctv':   return <CCTVEffect color={color} />;
      case 'matrix': return <MatrixEffect color={color} />;
      case 'scan':   return <ScanEffect color={color} />;
      case 'glitch': return <GlitchEffect color={color} />;
      case 'pulse':  return <PulseEffect color={color} />;
      case 'wave':   return <WaveEffect color={color} />;
      default:       return <ScanEffect color={color} />;
    }
  };

  return (
    <div ref={imgRef}
      className="aspect-[4/3] rounded-[2.5rem] overflow-hidden relative shadow-2xl cursor-crosshair"
      style={{ border: `1px solid ${color}40` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouseOffset({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}>

      {/* Image avec parallaxe souris */}
      <div className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `scale(1.08) translate(${-mouseOffset.x}px, ${-mouseOffset.y}px)`,
        }}>
        <img
          loading="lazy"
          src={imgData.url}
          alt={imgData.label}
          className="w-full h-full object-cover transition-all duration-700"
          style={{
            filter: hovered
              ? `brightness(0.35) saturate(1.4) hue-rotate(0deg)`
              : `brightness(0.25) saturate(1.2)`,
          }}
        />
      </div>

      {/* Overlay dégradé couleur service */}
      <div className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${color}35 0%, transparent 50%, ${color}20 100%)`,
          opacity: hovered ? 1 : 0.6,
        }} />

      {/* Effet canvas dynamique */}
      {effectComponent()}

      {/* Vignette bords */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: `inset 0 0 60px rgba(0,0,0,0.7)` }} />

      {/* Badge effet type */}
      <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: color }} />
        <span className="text-[8px] font-black uppercase tracking-widest text-white font-mono">
          {imgData.effect.toUpperCase()} LIVE
        </span>
      </div>

      {/* Label service */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
        <div className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-white"
          style={{ background: `${color}cc`, backdropFilter: 'blur(8px)' }}>
          {imgData.label}
        </div>
        {/* Indicateur hover */}
        <div className="px-2 py-1 rounded-lg text-[7px] font-black uppercase tracking-widest text-white/85 border border-white/20"
          style={{ backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.4)' }}>
          {hovered ? '◉ ACTIF' : '○ SURVOL'}
        </div>
      </div>

      {/* Shine on hover */}
      {hovered && (
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + mouseOffset.x * 2}% ${50 + mouseOffset.y * 2}%, ${color}20, transparent 60%)`,
          }} />
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// CANVAS SPATIAL HERO
// ═══════════════════════════════════════════════════════════════════════════════
const CosmicCanvas: React.FC<{ accent?: string }> = ({ accent = '#E87722' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const accentRef = useRef(accent);
  useEffect(() => { accentRef.current = accent; }, [accent]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let animId: number; let t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    const STARS = Array.from({ length: 200 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.8 + 0.2,
      phase: Math.random() * Math.PI * 2,
      color: ['#ffffff','#a8d8ff','#ffd4a8','#d4a8ff'][Math.floor(Math.random()*4)],
    }));
    const ORBS = Array.from({ length: 50 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random()-0.5)*0.0002, vy: (Math.random()-0.5)*0.0002,
      r: Math.random()*3+1, hue: Math.random()*360, life: Math.random()*Math.PI*2, lifeSpeed: 0.01+Math.random()*0.015,
    }));
    const METEORS: any[] = [];
    let mTimer = 0;
    const HEXAGONS = Array.from({ length: 8 }, () => ({
      x: Math.random(), y: Math.random(), size: 20+Math.random()*50,
      rot: Math.random()*Math.PI, rotSpeed: (Math.random()-0.5)*0.008,
      opacity: 0.03+Math.random()*0.06, vx: (Math.random()-0.5)*0.0001, vy: (Math.random()-0.5)*0.0001,
    }));
    const drawHex = (cx:number,cy:number,size:number,rot:number) => {
      ctx.beginPath();
      for(let i=0;i<6;i++){const a=rot+(i*Math.PI)/3;const px=cx+size*Math.cos(a);const py=cy+size*Math.sin(a);i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);}
      ctx.closePath();
    };
    const draw = () => {
      const W=canvas.width,H=canvas.height; t+=0.01; mTimer++;
      if(mTimer>80){METEORS.push({x:Math.random(),y:Math.random()*0.4,vx:0.003+Math.random()*0.006,vy:0.002+Math.random()*0.004,life:0,maxLife:40+Math.random()*30,color:['#fff','#E87722','#4FC3F7','#a78bfa'][Math.floor(Math.random()*4)]});mTimer=0;}
      const bg=ctx.createLinearGradient(0,0,W,H);
      bg.addColorStop(0,'#111827');bg.addColorStop(0.4,'#1a2540');bg.addColorStop(1,'#0f1a2e');
      ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
      [{x:0.1,y:0.2,r:0.4,c:'#2d1f60',a:0.6},{x:0.8,y:0.7,r:0.35,c:'#1a3560',a:0.5},{x:0.5,y:0.05,r:0.3,c:'#2d1520',a:0.4},{x:0.92,y:0.15,r:0.25,c:'#0d2535',a:0.55}].forEach(n=>{
        const pulse=1+Math.sin(t*0.25+n.x*8)*0.12;
        const g=ctx.createRadialGradient(n.x*W,n.y*H,0,n.x*W,n.y*H,n.r*W*pulse);
        g.addColorStop(0,n.c+'ee');g.addColorStop(1,'transparent');
        ctx.globalAlpha=n.a;ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1;
      });
      const acc=accentRef.current;
      const gAcc=ctx.createRadialGradient(W*0.5,H*0.3,0,W*0.5,H*0.3,W*0.6);
      gAcc.addColorStop(0,acc+'18');gAcc.addColorStop(1,'transparent');
      ctx.fillStyle=gAcc;ctx.fillRect(0,0,W,H);
      ctx.save();ctx.globalAlpha=0.07;ctx.strokeStyle='#4FC3F7';ctx.lineWidth=0.6;
      const GRID=14;const scroll=(t*0.012)%(1/GRID);
      for(let i=0;i<=GRID;i++){const yr=(i/GRID+scroll)%1;const persp=Math.pow(yr,2.2);const yp=H*0.55+persp*H*0.45;const xs=persp*W*0.85;ctx.beginPath();ctx.moveTo(W/2-xs,yp);ctx.lineTo(W/2+xs,yp);ctx.stroke();}
      for(let i=-GRID/2;i<=GRID/2;i++){ctx.beginPath();ctx.moveTo(W/2+i*(W/GRID)*0.5,H*0.55);ctx.lineTo(W/2+i*W*0.3,H);ctx.stroke();}
      ctx.restore();
      for(let ring=1;ring<=5;ring++){const r=(ring/5)*Math.min(W,H)*0.3;const rot=t*(0.15+ring*0.04)*(ring%2?1:-1);for(let s=0;s<60;s++){const a1=rot+(s/60)*Math.PI*2;const a2=rot+((s+0.7)/60)*Math.PI*2;ctx.beginPath();ctx.arc(W*0.5,H*0.35,r,a1,a2);ctx.strokeStyle=`rgba(79,195,247,${0.025+Math.abs(Math.sin(t*0.5+ring))*0.03})`;ctx.lineWidth=1;ctx.stroke();}}
      HEXAGONS.forEach(h=>{h.x+=h.vx;h.y+=h.vy;h.rot+=h.rotSpeed;if(h.x<-0.1)h.x=1.1;if(h.x>1.1)h.x=-0.1;if(h.y<-0.1)h.y=1.1;if(h.y>1.1)h.y=-0.1;ctx.save();ctx.globalAlpha=h.opacity*(0.7+0.3*Math.sin(t*0.5+h.x*5));ctx.strokeStyle=acc;ctx.lineWidth=0.8;drawHex(h.x*W,h.y*H,h.size,h.rot);ctx.stroke();ctx.restore();});
      STARS.forEach(s=>{const tw=0.3+0.7*Math.abs(Math.sin(t*0.7+s.phase));ctx.beginPath();ctx.arc(s.x*W,s.y*H,s.r,0,Math.PI*2);ctx.fillStyle=s.color;ctx.globalAlpha=0.6*tw;ctx.fill();ctx.globalAlpha=1;if(s.r>1.3){const cross=s.r*6*tw;ctx.strokeStyle=s.color;ctx.lineWidth=0.4;ctx.globalAlpha=0.3*tw;ctx.beginPath();ctx.moveTo(s.x*W-cross,s.y*H);ctx.lineTo(s.x*W+cross,s.y*H);ctx.moveTo(s.x*W,s.y*H-cross);ctx.lineTo(s.x*W,s.y*H+cross);ctx.stroke();ctx.globalAlpha=1;}});
      ORBS.forEach(o=>{o.x+=o.vx;o.y+=o.vy;o.life+=o.lifeSpeed;if(o.x<0)o.x=1;if(o.x>1)o.x=0;if(o.y<0)o.y=1;if(o.y>1)o.y=0;const pulse=0.4+0.6*Math.abs(Math.sin(o.life));const hsl=`hsla(${o.hue},80%,65%,`;const halo=ctx.createRadialGradient(o.x*W,o.y*H,0,o.x*W,o.y*H,o.r*10);halo.addColorStop(0,hsl+`${0.5*pulse})`);halo.addColorStop(1,'transparent');ctx.fillStyle=halo;ctx.beginPath();ctx.arc(o.x*W,o.y*H,o.r*10,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(o.x*W,o.y*H,o.r,0,Math.PI*2);ctx.fillStyle=`hsla(${o.hue},80%,80%,${pulse})`;ctx.fill();});
      for(let i=0;i<ORBS.length;i++){for(let j=i+1;j<ORBS.length;j++){const dx=(ORBS[i].x-ORBS[j].x)*W;const dy=(ORBS[i].y-ORBS[j].y)*H;const dist=Math.sqrt(dx*dx+dy*dy);if(dist<110){ctx.beginPath();ctx.globalAlpha=0.15*(1-dist/110);ctx.strokeStyle='#4FC3F7';ctx.lineWidth=0.4;ctx.moveTo(ORBS[i].x*W,ORBS[i].y*H);ctx.lineTo(ORBS[j].x*W,ORBS[j].y*H);ctx.stroke();ctx.globalAlpha=1;}}}
      for(let m=METEORS.length-1;m>=0;m--){const meteor=METEORS[m];meteor.x+=meteor.vx/W*100;meteor.y+=meteor.vy/H*100;meteor.life++;if(meteor.life>meteor.maxLife||meteor.x>1.2||meteor.y>1.2){METEORS.splice(m,1);continue;}const alpha=(1-meteor.life/meteor.maxLife)*0.8;const tLen=80;const grad=ctx.createLinearGradient((meteor.x-meteor.vx*tLen)*W,(meteor.y-meteor.vy*tLen)*H,meteor.x*W,meteor.y*H);grad.addColorStop(0,'transparent');grad.addColorStop(1,meteor.color);ctx.beginPath();ctx.moveTo((meteor.x-meteor.vx*tLen)*W,(meteor.y-meteor.vy*tLen)*H);ctx.lineTo(meteor.x*W,meteor.y*H);ctx.strokeStyle=grad;ctx.lineWidth=1.5;ctx.globalAlpha=alpha;ctx.stroke();ctx.globalAlpha=1;ctx.beginPath();ctx.arc(meteor.x*W,meteor.y*H,2,0,Math.PI*2);ctx.fillStyle='#fff';ctx.globalAlpha=alpha;ctx.fill();ctx.globalAlpha=1;}
      animId=requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display:'block' }} />;
};

// Hook inView
function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE SECTION
// ═══════════════════════════════════════════════════════════════════════════════
const ServiceSection: React.FC<{
  service: typeof SERVICES[0];
  index: number;
  isReversed?: boolean;
  accentColor: string;
}> = ({ service, index, isReversed, accentColor }) => {
  const { ref, inView } = useInView();
  const [isExpanded, setIsExpanded] = useState(false);
  const icon = iconMap[service.iconName] || <Zap />;

  return (
    <div ref={ref} className="py-8 border-b border-white/20 last:border-0"
      style={{ animation: inView ? `slideReveal 0.8s ${index * 0.06}s both` : 'none' }}>

      <div onClick={() => setIsExpanded(!isExpanded)}
        className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-14 p-8 lg:p-12 rounded-[3rem] cursor-pointer group relative overflow-hidden transition-all duration-500`}
        style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.07)' }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)';
          (e.currentTarget as HTMLElement).style.border = `1px solid ${accentColor}50`;
          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 80px ${accentColor}12`;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)';
          (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.07)';
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}>

        {/* Glow coin */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle, ${accentColor}10, transparent)`, transform: 'translate(30%,-30%)' }} />

        {/* Numéro fantôme */}
        <div className="absolute bottom-3 right-6 text-[90px] font-black leading-none select-none pointer-events-none text-white" style={{ opacity: 0.03 }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Texte */}
        <div className="flex-1 w-full relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-110"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}70)` }}>
              {React.cloneElement(icon as React.ReactElement, { size: 26 })}
            </div>
            <div>
              <div className="text-[8px] font-black uppercase tracking-[0.4em] mb-0.5" style={{ color: accentColor }}>
                Expertise #{String(index + 1).padStart(2, '0')}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white/90">Certifié Imani-Tech</span>
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter leading-none transition-colors duration-300 group-hover:text-brand-orange">
            {service.title}
          </h2>
          <p className="text-sm text-white mb-7 leading-relaxed font-bold max-w-xl">{service.description}</p>

          <div className="flex flex-wrap gap-2 mb-7">
            {service.features.map((f, i) => (
              <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tight text-white/85 border border-white/20"
                style={{ background: 'rgba(255,255,255,0.09)' }}>
                <CheckCircle size={10} style={{ color: accentColor }} /> {f}
              </div>
            ))}
          </div>

          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all" style={{ color: accentColor }}>
            {isExpanded ? <><span>▲</span> Masquer</> : <><Info size={13} /> Dossier technique</>}
          </button>
        </div>

        {/* Image dynamique dédiée */}
        <div className="flex-1 w-full relative z-10">
          <ServiceImage iconName={service.iconName} color={accentColor} title={service.title} />
        </div>
      </div>

      {/* ── Section développée ultra-riche ── */}
      {isExpanded && (() => {
        const deep = SERVICE_DEEP_DATA[service.iconName];
        if (!deep) return null;
        return (
          <div className="mt-4 rounded-[2.5rem] overflow-hidden relative"
            style={{ background: 'rgba(17,24,39,0.98)', border: `1.5px solid ${accentColor}30`, animation: 'expandIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>

            {/* Barre de couleur haut */}
            <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, ${accentColor}80, transparent)` }} />

            {/* ── TAGLINE + URGENCE ── */}
            <div className="px-8 lg:px-14 pt-10 pb-8 border-b border-white/20">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <p className="text-xl lg:text-2xl font-black text-white leading-snug max-w-2xl" style={{ fontStyle: 'italic' }}>
                  "{deep.tagline}"
                </p>
                <div className="shrink-0 px-5 py-3 rounded-2xl text-center" style={{ background: `${accentColor}20`, border: `1px solid ${accentColor}40` }}>
                  <div className="text-[8px] font-black uppercase tracking-widest mb-1" style={{ color: accentColor }}>Urgence d'action</div>
                  <div className="text-[10px] font-bold text-white max-w-[200px]">{deep.urgency}</div>
                </div>
              </div>
            </div>

            <div className="px-8 lg:px-14 py-10 space-y-14">

              {/* ── PROBLÈME + STATS ── */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-7 h-7 rounded-xl flex items-center justify-center text-red-400" style={{ background: 'rgba(220,38,38,0.15)' }}>
                      <span className="text-sm">⚠</span>
                    </div>
                    <h4 className="text-[9px] font-black uppercase tracking-[0.35em] text-red-400/70">Le problème que vous vivez</h4>
                  </div>
                  <p className="text-sm font-bold leading-relaxed text-white/85 border-l-2 border-red-500/30 pl-5">
                    {deep.problem}
                  </p>
                </div>
                <div className="lg:col-span-5 grid grid-cols-3 gap-3">
                  {deep.problemStats.map((s, i) => (
                    <div key={i} className="p-4 rounded-2xl text-center" style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)' }}>
                      <div className="text-xl font-black text-red-400 tracking-tighter leading-none mb-1">{s.val}</div>
                      <div className="text-[8px] font-black uppercase tracking-wide text-white/90 leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── NOTRE SOLUTION ── */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: `${accentColor}20`, color: accentColor }}>
                    <Rocket size={14} />
                  </div>
                  <h4 className="text-[9px] font-black uppercase tracking-[0.35em]" style={{ color: accentColor }}>Notre solution</h4>
                </div>
                <p className="text-sm font-bold leading-relaxed text-white/90 border-l-2 pl-5" style={{ borderColor: accentColor + '50' }}>
                  {deep.solution}
                </p>
              </div>

              {/* ── PROCESSUS EN 5 ÉTAPES ── */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: `${accentColor}20`, color: accentColor }}>
                    <Cpu size={14} />
                  </div>
                  <h4 className="text-[9px] font-black uppercase tracking-[0.35em] text-white">Notre processus étape par étape</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {deep.steps.map((step, i) => (
                    <div key={i} className="p-4 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all"
                      style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.07)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = accentColor + '50'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)'; }}>
                      <div className="text-3xl font-black leading-none mb-3" style={{ color: accentColor + '90' }}>{step.num}</div>
                      <div className="text-[10px] font-black uppercase tracking-tight text-white mb-2">{step.title}</div>
                      <div className="text-[9px] font-bold text-white leading-relaxed">{step.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RÉSULTATS CHIFFRÉS ── */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: `${accentColor}20`, color: accentColor }}>
                    <TrendingUp size={14} />
                  </div>
                  <h4 className="text-[9px] font-black uppercase tracking-[0.35em] text-white">Résultats mesurés chez nos clients</h4>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {deep.results.map((r, i) => (
                    <div key={i} className="p-5 rounded-2xl text-center"
                      style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}30` }}>
                      <div className="text-2xl font-black tracking-tighter leading-none mb-1" style={{ color: accentColor }}>{r.val}</div>
                      <div className="text-[10px] font-black uppercase tracking-tight text-white mb-0.5">{r.label}</div>
                      <div className="text-[8px] font-bold text-white/90">{r.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── POUR QUI + TECHNO ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="text-[8px] font-black uppercase tracking-widest mb-4" style={{ color: accentColor }}>Ce service est fait pour</div>
                  <div className="grid grid-cols-2 gap-2">
                    {deep.for.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle size={10} style={{ color: accentColor }} className="shrink-0" />
                        <span className="text-[9px] font-bold text-white/85">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="text-[8px] font-black uppercase tracking-widest mb-3" style={{ color: accentColor }}>Technologies utilisées</div>
                  <p className="text-[10px] font-bold text-white leading-relaxed mb-4">{deep.techDetails}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Tier-1 Brands', 'Certifié CE', 'Norme ISO', 'Garantie 2 ans', 'Support local'].map(tag => (
                      <span key={tag} className="px-2 py-1 text-[7px] font-black uppercase tracking-wide text-white rounded-lg border border-white/20"
                        style={{ background: 'rgba(255,255,255,0.10)' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── FAQ ── */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: `${accentColor}20`, color: accentColor }}>
                    <Info size={14} />
                  </div>
                  <h4 className="text-[9px] font-black uppercase tracking-[0.35em] text-white">Questions fréquentes</h4>
                </div>
                <div className="space-y-3">
                  {deep.faq.map((item, i) => (
                    <div key={i} className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex items-start gap-3">
                        <span className="text-[10px] font-black shrink-0 mt-0.5" style={{ color: accentColor }}>Q{i + 1}</span>
                        <div>
                          <div className="text-[11px] font-black text-white mb-2">{item.q}</div>
                          <div className="text-[10px] font-bold text-white/80 leading-relaxed">{item.a}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── TÉMOIGNAGE ── */}
              <div className="p-7 rounded-2xl relative overflow-hidden"
                style={{ background: `${accentColor}10`, border: `1px solid ${accentColor}30` }}>
                <div className="absolute top-4 right-6 text-6xl font-black leading-none select-none" style={{ color: accentColor + '15' }}>"</div>
                <p className="text-base font-black text-white italic leading-relaxed mb-4 relative z-10">
                  "{deep.testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black" style={{ background: accentColor }}>
                    {deep.testimonial.author[0]}
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-white">{deep.testimonial.author}</div>
                    <div className="text-[9px] font-bold text-white">{deep.testimonial.company}</div>
                  </div>
                </div>
              </div>

              {/* ── CTA FINAL ── */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/20">
                <Link to={AppRoute.Audit}
                  className="flex-1 text-white py-5 rounded-2xl text-center font-black text-xs uppercase tracking-widest shadow-xl transition-all hover:opacity-80"
                  style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}80)` }}>
                  🎯 Demander un audit gratuit pour ce service
                </Link>
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
                  className="flex-1 py-5 rounded-2xl text-center font-black text-xs uppercase tracking-widest transition-all hover:border-brand-orange/50 text-white"
                  style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  💬 Parler à un expert WhatsApp
                </a>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════════════
const ServicesPage: React.FC = () => {
  const [activeAccent, setActiveAccent] = useState('#E87722');
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.3 });

  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideReveal { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes expandIn { from{opacity:0;transform:scaleY(0.92) translateY(-10px)} to{opacity:1;transform:scaleY(1) translateY(0)} }
        @keyframes heroTitle { from{opacity:0;transform:translateY(50px) skewY(2deg)} to{opacity:1;transform:translateY(0) skewY(0)} }
        @keyframes heroPill { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
        .hero-t { animation: heroTitle 1.1s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
        .hero-p { animation: heroPill 0.8s 0.1s both; }
        .hero-sub { animation: heroPill 0.8s 0.4s both; }
        .hero-cta { animation: heroPill 0.8s 0.6s both; }
        .float-y { animation: floatY 4s ease-in-out infinite; }
        .glow-pulse { animation: glowPulse 2s ease-in-out infinite; }
      `}</style>

      <div className="min-h-screen" style={{ background: '#111827' }}>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-white/20" style={{ minHeight: '100vh' }}>
          <CosmicCanvas accent={activeAccent} />
          {/* Curseur lumineux */}
          <div className="absolute pointer-events-none z-10 transition-all duration-700"
            style={{ left: `${mousePos.x*100}%`, top: `${mousePos.y*100}%`, width:400, height:400, transform:'translate(-50%,-50%)', background:`radial-gradient(circle, ${activeAccent}15, transparent)`, borderRadius:'50%' }} />

          <div className="relative z-20 max-w-7xl mx-auto px-4 pt-36 pb-24">
            <div className="hero-p inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 mb-10">
              <Zap size={11} className="text-brand-orange animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-orange">Référentiel Technique 2025 — Cameroun</span>
            </div>
            <h1 className="hero-t text-6xl sm:text-8xl lg:text-[110px] font-black uppercase tracking-tighter leading-[0.85] text-white mb-8">
              Nos <span className="text-brand-orange">Infrastructures</span><br /><span className="text-white/40">& Expertises.</span>
            </h1>
            <p className="hero-sub text-lg text-white max-w-2xl font-bold leading-relaxed mb-12">
              Cliquez sur chaque service pour accéder au dossier technique complet et comprendre comment nous sécurisons votre croissance.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row gap-4">
              <Link to={AppRoute.Audit} className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest text-white shadow-2xl transition-all hover:opacity-80"
                style={{ background: 'linear-gradient(135deg, #E87722, #E87722aa)' }}>
                <Target size={16} /> Lancer un Audit Global
              </Link>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest text-white border border-white/20 hover:border-brand-orange/50 transition-all"
                style={{ background: 'rgba(255,255,255,0.10)' }}>
                Contacter un Expert →
              </a>
            </div>
            <div className="flex flex-wrap gap-5 mt-14 float-y">
              {[{val:'99.5%',label:'Disponibilité SLA'},{val:'48h',label:'Intervention max'},{val:'5 ans',label:'D\'expertise'},{val:'100%',label:'Certifié local'}].map((s,i)=>(
                <div key={i} className="px-5 py-3 rounded-2xl border border-white/15 glow-pulse" style={{ background:'rgba(255,255,255,0.09)', animationDelay:`${i*0.3}s` }}>
                  <div className="text-xl font-black text-white tracking-tighter">{s.val}</div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-white/90 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-20" style={{ background:'linear-gradient(transparent, #111827)' }} />
        </section>

        {/* ── SERVICES ──────────────────────────────────────────────── */}
        <section className="relative py-16" style={{ background: '#111827' }}>
          <div className="absolute inset-0 opacity-30 pointer-events-none"><CosmicCanvas accent={activeAccent} /></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="space-y-4">
              {SERVICES.map((s, idx) => (
                <div key={s.id} onMouseEnter={() => setActiveAccent(SERVICE_COLORS[idx % SERVICE_COLORS.length])}>
                  <ServiceSection service={s} index={idx} isReversed={idx % 2 !== 0} accentColor={SERVICE_COLORS[idx % SERVICE_COLORS.length]} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GARANTIES ─────────────────────────────────────────────── */}
        <section className="py-20 relative overflow-hidden" style={{ background:'rgba(255,255,255,0.05)', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon:<ShieldCheck size={26}/>, title:'Garantie Matérielle', desc:'Remplacement immédiat sous 48h sur site.', color:'#0F766E' },
                { icon:<Wifi size={26}/>, title:'SLA Disponibilité', desc:'Engagement contractuel 99.5% uptime réseau.', color:'#2563EB' },
                { icon:<Rocket size={26}/>, title:'Évolution Modulaire', desc:'Infrastructures conçues pour grandir avec vous.', color:'#E87722' },
              ].map((g,i)=>(
                <div key={i} className="p-8 rounded-[2.5rem] border border-white/20 text-center group hover:border-white/15 transition-all duration-300"
                  style={{ background:'rgba(255,255,255,0.09)' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.boxShadow=`0 0 40px ${g.color}20`;}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.boxShadow='none';}}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110" style={{ background:`${g.color}20`, color:g.color }}>{g.icon}</div>
                  <h4 className="text-base font-black text-white uppercase tracking-tighter mb-2">{g.title}</h4>
                  <p className="text-xs font-bold text-white/90 leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ─────────────────────────────────────────────── */}
        <section className="py-28 relative overflow-hidden">
          <CosmicCanvas accent="#E87722" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-7xl font-black mb-10 uppercase tracking-tighter leading-none text-white">
              Votre business mérite<br />une <span className="text-brand-orange">Rigueur Technique</span>.
            </h2>
            <Link to={AppRoute.Audit}
              className="inline-flex items-center gap-3 bg-brand-orange text-white px-14 py-6 rounded-full font-black text-lg uppercase tracking-tight hover:opacity-85 transition-all shadow-2xl"
              style={{ boxShadow:'0 0 60px rgba(232,119,34,0.4)' }}>
              Démarrer mon Diagnostic <ArrowRight size={22} />
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-20 pointer-events-none" style={{ background:'linear-gradient(transparent, #111827)' }} />
        </section>
      </div>
    </>
  );
};

export default ServicesPage;
