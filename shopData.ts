// ─── SHOP DATA — IMANI-TECH BOUTIQUE ─────────────────────────────────────────
// 150 produits détaillés avec caractéristiques techniques complètes

export const WHATSAPP_ORDER_NUMBER = '237600000000';
export const ORANGE_MONEY_NUMBER = '237655000000';
export const MTN_MOMO_NUMBER = '237677000000';

export const PARTNERS = [
  'HP', 'Dell', 'Lenovo', 'Epson', 'Canon', 'Samsung', 'Logitech', 'TP-Link',
  'Cisco', 'Microsoft', 'Apple', 'Asus', 'Acer', 'Hikvision', 'Dahua', 'Brother'
];

export interface ShopProduct {
  id: string;
  ref: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  stock: number;
  badge?: 'Nouveau' | 'Bestseller' | 'Promo' | 'Stock limité';
  tags: string[];
}

export interface ShopCategory {
  id: string;
  name: string;
  icon: string;
  products: ShopProduct[];
}

export const SHOP_CATEGORIES: ShopCategory[] = [

  // ─── 1. ORDINATEURS PORTABLES ──────────────────────────────────────────────
  {
    id: 'laptops',
    name: 'Ordinateurs Portables',
    icon: '💻',
    products: [
      {
        id: 'lap-001',
        ref: 'IT-LAP-001',
        name: 'HP ProBook 450 G10 — Core i7 13e Gén',
        brand: 'HP',
        price: 685000,
        oldPrice: 750000,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600',
        description: `Ordinateur portable professionnel conçu pour les entreprises exigeantes. Équipé du processeur Intel Core i7-1355U de 13e génération (jusqu'à 5,0 GHz), 16 Go RAM DDR4, SSD NVMe 512 Go. Écran Full HD 15,6" antireflet IPS avec 300 nits de luminosité. Batterie 56 Wh (jusqu'à 12h d'autonomie). Clavier rétroéclairé résistant aux déversements (MIL-STD-810H). Connectique complète : 2× USB-A 3.2, 1× USB-C (PowerDelivery), HDMI 2.0, RJ-45 Gigabit, lecteur SD. Idéal pour bureautique avancée, comptabilité, gestion de projets. Garantie constructeur 1 an + support Imani-Tech 6 mois.`,
        rating: 4.8,
        reviews: 124,
        stock: 8,
        badge: 'Bestseller',
        tags: ['laptop', 'hp', 'professionnel', 'core i7', 'bureautique', 'entreprise']
      },
      {
        id: 'lap-002',
        ref: 'IT-LAP-002',
        name: 'Dell Latitude 5540 — i5 13e Gén, 16 Go',
        brand: 'Dell',
        price: 595000,
        image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600',
        description: `Ultrabook professionnel Dell Latitude 5540 avec processeur Intel Core i5-1345U (12 cœurs, jusqu'à 4,7 GHz), 16 Go DDR4 3200 MHz, SSD PCIe NVMe 256 Go. Écran FHD 15,6" IPS antireflet, certifié Eyesafe. Batterie 54 Wh avec charge rapide ExpressCharge (80% en 1h). TPM 2.0, chiffrement matériel, lecteur d'empreintes digitales intégré. Compatible Dell ProDeploy et Unified Workspace. Connectique Thunderbolt 4, Wi-Fi 6E, Bluetooth 5.3. Poids : 1,78 kg. Idéal gestion d'entreprise, télétravail sécurisé, déplacements fréquents. Garantie 3 ans ProSupport incluse.`,
        rating: 4.7,
        reviews: 89,
        stock: 6,
        badge: 'Nouveau',
        tags: ['dell', 'latitude', 'professionnel', 'sécurité', 'ultrabook', 'i5']
      },
      {
        id: 'lap-003',
        ref: 'IT-LAP-003',
        name: 'Lenovo ThinkPad E15 Gen 4 — Ryzen 5',
        brand: 'Lenovo',
        price: 520000,
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600',
        description: `ThinkPad E15 Gen 4 avec AMD Ryzen 5 5625U (6 cœurs/12 threads, 4,3 GHz), 16 Go RAM, SSD 512 Go. Écran IPS 15,6" FHD avec 300 nits. Clavier ThinkPad légendaire, résistant aux chocs (MIL-STD 810G). Trackpad précis avec 3 boutons TrackPoint. Ports : USB 3.2 Gen1, USB-C, HDMI, RJ-45. Wi-Fi 6, Bluetooth 5.1. Batterie 45 Wh, jusqu'à 9h. Finition aluminium brossé. Testé contre poussière, humidité, vibrations. Parfait pour étudiants avancés, PME, comptables. Garantie 2 ans Lenovo On-Site.`,
        rating: 4.6,
        reviews: 156,
        stock: 12,
        badge: 'Bestseller',
        tags: ['lenovo', 'thinkpad', 'ryzen', 'étudiant', 'pme', 'solide']
      },
      {
        id: 'lap-004',
        ref: 'IT-LAP-004',
        name: 'Asus VivoBook 15 — i3 12e Gén, 8 Go',
        brand: 'Asus',
        price: 345000,
        oldPrice: 390000,
        image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600',
        description: `Asus VivoBook 15 X1502Z avec Intel Core i3-1215U (6 cœurs), 8 Go DDR4, SSD 256 Go NVMe. Écran OLED FHD 15,6" VESA DisplayHDR 600, 100% DCI-P3 — couleurs exceptionnelles pour le prix. Finition blush gold, châssis en aluminium. Chargeur USB-C 65W. Wi-Fi 6, Bluetooth 5.0. Lecteur empreintes. Haut-parleurs Harman Kardon certifiés. 1,7 kg. Idéal : étudiants, créateurs de contenu débutants, usage quotidien. Rapport qualité-prix imbattable sur le marché camerounais. Garantie 1 an Asus.`,
        rating: 4.5,
        reviews: 203,
        stock: 15,
        badge: 'Promo',
        tags: ['asus', 'vivobook', 'étudiant', 'budget', 'oled', 'i3']
      },
      {
        id: 'lap-005',
        ref: 'IT-LAP-005',
        name: 'HP EliteBook 840 G9 — i7 vPro, 32 Go',
        brand: 'HP',
        price: 895000,
        image: 'https://images.unsplash.com/photo-1484788984921-03950022c38b?w=600',
        description: `Flagship professionnel HP EliteBook 840 G9 avec Intel Core i7-1265U vPro (10 cœurs, 4,8 GHz), 32 Go LPDDR5, SSD 1 To NVMe. Écran Sure View Reflect (filtre anti-espion intégré), FHD IPS 400 nits. Caméra IR Windows Hello, micro à annulation de bruit. HP Wolf Security intégré (BIOS-level protection, Sure Start). Thunderbolt 4×2, USB-A 3.2×2, HDMI 2.0, jack audio, lecteur SmartCard. LTE Cat 16 optionnel. Poids : 1,36 kg. Conception ultra-premium pour DSI, directeurs, consultants voyageant fréquemment. Garantie HP Care Pack 3 ans incluse.`,
        rating: 4.9,
        reviews: 47,
        stock: 4,
        badge: 'Stock limité',
        tags: ['hp', 'elitebook', 'vpro', 'sécurité', 'premium', 'direction']
      },
      {
        id: 'lap-006',
        ref: 'IT-LAP-006',
        name: 'Acer Aspire 5 — i5 12e Gén, 512 Go',
        brand: 'Acer',
        price: 445000,
        oldPrice: 480000,
        image: 'https://images.unsplash.com/photo-1526657782461-9fe13402a841?w=600',
        description: `Acer Aspire 5 A515-57 avec Intel Core i5-1235U (10 cœurs), 8 Go RAM (extensible 32 Go), SSD 512 Go NVMe. Écran FHD IPS 15,6" 100% sRGB. Batterie 74 Wh, jusqu'à 11h. Refroidissement Acer CoolBoost (ventilateur dual-fan). Wi-Fi 6, HDMI 2.0, USB-C Gen 2, Ethernet Gigabit. Haut-parleurs stéréo DTS Audio. Clavier avec pavé numérique, rétroéclairé. Lecteur empreintes. Compatible Microsoft 365. Idéal : usage polyvalent, comptabilité, études supérieures, petite entreprise. Excellent équilibre performance/prix. Garantie 2 ans Acer.`,
        rating: 4.4,
        reviews: 178,
        stock: 20,
        tags: ['acer', 'aspire', 'polyvalent', 'i5', 'bureau', 'études']
      },
      {
        id: 'lap-007',
        ref: 'IT-LAP-007',
        name: 'Dell Inspiron 15 3000 — Celeron, 4 Go',
        brand: 'Dell',
        price: 245000,
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600',
        description: `Dell Inspiron 15 3511 avec Intel Celeron N4020 (2 cœurs, 2,8 GHz), 4 Go DDR4, HDD 1 To + cache SSD 32 Go. Écran 15,6" HD (1366×768) antireflet. Parfait ordinateur d'entrée de gamme pour les tâches essentielles : navigation web, email, traitement de texte, Excel basique. Windows 11 Home préinstallé. USB 3.0×2, USB-C, HDMI, lecteur SD. Wi-Fi 802.11ac, Bluetooth 5.0. Batterie 41 Wh. 1,83 kg. Recommandé pour : administration publique, secrétariat, apprentissage scolaire, premier PC familial. Garantie Dell 1 an.`,
        rating: 4.0,
        reviews: 312,
        stock: 25,
        tags: ['dell', 'inspiron', 'entrée de gamme', 'celeron', 'famille', 'bureau']
      },
      {
        id: 'lap-008',
        ref: 'IT-LAP-008',
        name: 'Lenovo IdeaPad Gaming 3 — RTX 3050',
        brand: 'Lenovo',
        price: 720000,
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600',
        description: `PC gaming Lenovo IdeaPad Gaming 3 avec AMD Ryzen 5 6600H (6 cœurs/12T, 4,5 GHz), GPU NVIDIA RTX 3050 4 Go GDDR6, 16 Go DDR5, SSD 512 Go NVMe Gen4. Écran FHD 15,6" IPS 120 Hz antireflet. Système de refroidissement optimisé avec 2 ventilateurs + 4 conduits thermiques. Clavier gaming rétroéclairé. Wi-Fi 6, Ethernet 2.5G, USB-A 3.2×3, USB-C 3.2, HDMI 2.1. Batterie 45 Wh, chargeur 135W rapide. Parfait pour gaming (AAA à 60fps), montage vidéo, design graphique, ingénierie. Garantie 2 ans Lenovo.`,
        rating: 4.6,
        reviews: 94,
        stock: 7,
        badge: 'Nouveau',
        tags: ['lenovo', 'gaming', 'rtx 3050', 'ryzen', 'jeux vidéo', 'montage']
      },
    ]
  },

  // ─── 2. ORDINATEURS DE BUREAU ──────────────────────────────────────────────
  {
    id: 'desktops',
    name: 'Ordinateurs de Bureau',
    icon: '🖥️',
    products: [
      {
        id: 'desk-001',
        ref: 'IT-DSK-001',
        name: 'HP ProDesk 400 G9 SFF — i5 12e Gén',
        brand: 'HP',
        price: 485000,
        image: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=600',
        description: `Mini PC professionnel HP ProDesk 400 G9 Small Form Factor. Processeur Intel Core i5-12500 (6 cœurs/12T, jusqu'à 4,6 GHz), 8 Go DDR4 3200 MHz (extensible 64 Go), SSD 256 Go NVMe. Certifié HP Sure Start (protection BIOS), HP Sure Recover. Ports : DisplayPort 1.4×2, USB-A 3.2×4, USB-C 10Gbps, PS/2, RJ-45 Intel I219V. Consommation 180W TDP. Compatible 4 moniteurs simultanément. Idéal bureaux partagés, caisses enregistreuses, postes administratifs. Dimensions compactes 34×34×9 cm. Windows 11 Pro. Garantie HP 3 ans.`,
        rating: 4.7,
        reviews: 67,
        stock: 10,
        badge: 'Bestseller',
        tags: ['hp', 'proDesk', 'bureau', 'compact', 'professionnel', 'windows 11']
      },
      {
        id: 'desk-002',
        ref: 'IT-DSK-002',
        name: 'Dell OptiPlex 3000 MFF — i3 12e Gén',
        brand: 'Dell',
        price: 385000,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
        description: `PC tout-en-un compact Dell OptiPlex 3000 Micro Form Factor. Intel Core i3-12100 (4 cœurs/8T, 4,3 GHz), 8 Go DDR4, SSD 256 Go. Ultra-compact (18×18×3,6 cm) — se fixe derrière l'écran (VESA). Consommation 65W seulement. Ports : HDMI 2.0, DisplayPort 2.0, USB 3.2 Gen2×4, USB-C, RJ-45 gigabit. Connectivité Wi-Fi 6+Bluetooth 5.2 optionnelle. Ventilateur quasi silencieux (22 dB). Idéal open-space, guichets, salle de classe, digital signage. Gestion à distance Dell BIOS. Garantie Dell Basic 3 ans.`,
        rating: 4.5,
        reviews: 43,
        stock: 14,
        tags: ['dell', 'optiplex', 'micro', 'compact', 'open space', 'économique']
      },
      {
        id: 'desk-003',
        ref: 'IT-DSK-003',
        name: 'Lenovo ThinkCentre M70q Tiny — i5',
        brand: 'Lenovo',
        price: 445000,
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600',
        description: `Lenovo ThinkCentre M70q Gen 3 Tiny avec Intel Core i5-12400T (6 cœurs, 4,2 GHz), 16 Go DDR4, SSD 512 Go NVMe. Format ultra-compact (179×183×37 mm) avec fixation VESA incluse. 3× DisplayPort 1.4 (supporte 3 moniteurs 4K simultanément). USB-A 3.2×4, USB-C, Ethernet Intel I219-V. Module TPM 2.0, chiffrement Intel AMT. Consommation 35W idle. Wi-Fi 6E intégré. Certificat ENERGY STAR, EPEAT Gold. Applications : salle de conférence, finance, architecture réseau. Windows 11 Pro. Garantie Lenovo Premier 3 ans.`,
        rating: 4.8,
        reviews: 38,
        stock: 8,
        badge: 'Nouveau',
        tags: ['lenovo', 'thinkcentre', 'tiny', 'triple écran', 'énergie', 'entreprise']
      },
      {
        id: 'desk-004',
        ref: 'IT-DSK-004',
        name: 'PC Tour Custom — Ryzen 7, RTX 4060',
        brand: 'Imani-Tech',
        price: 895000,
        image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600',
        description: `Station de travail/gaming assemblée par Imani-Tech. Configuration : AMD Ryzen 7 7700X (8 cœurs/16T, 5,4 GHz), GPU NVIDIA RTX 4060 8 Go GDDR6, 32 Go DDR5 6000 MHz, SSD M.2 NVMe 1 To + HDD 2 To. Refroidissement liquide 240mm AIO. Alimentation 750W 80+ Gold modulaire. Boîtier Fractal Torrent avec airflow optimisé. Ports : HDMI 2.1, DP 1.4, USB-C 3.2, USB-A×6. Assemblage professionnel testé 72h. Idéal : montage vidéo 4K, design 3D, gaming ultra, développement logiciel. Garantie pièces 2 ans + main d'œuvre Imani-Tech 1 an.`,
        rating: 4.9,
        reviews: 29,
        stock: 3,
        badge: 'Stock limité',
        tags: ['custom', 'gaming', 'montage 4k', 'rtx 4060', 'ryzen 7', 'station travail']
      },
      {
        id: 'desk-005',
        ref: 'IT-DSK-005',
        name: 'All-in-One HP 24" — i5, Tactile',
        brand: 'HP',
        price: 650000,
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600',
        description: `HP All-in-One 24-dp1060 avec écran tactile FHD 23,8" IPS. Processeur Intel Core i5-1135G7 (4 cœurs, 4,2 GHz), 16 Go DDR4, SSD 512 Go. Caméra IR 5 MP Windows Hello, micro dual-beam. Haut-parleurs Bang & Olufsen 3W×2. Wi-Fi 6, Bluetooth 5.0, USB-A 3.2×4, USB-C, HDMI-in (pour utilisation comme moniteur externe). Alimentation intégrée — zéro câble apparent. Design pour réception d'entreprise, accueil hôpital, showroom, point de vente premium. 5,15 kg. Windows 11 Home. Garantie HP 2 ans.`,
        rating: 4.6,
        reviews: 52,
        stock: 6,
        tags: ['hp', 'all-in-one', 'tactile', 'accueil', 'point de vente', 'tout en un']
      },
      {
        id: 'desk-006',
        ref: 'IT-DSK-006',
        name: 'Dell Precision 3660 Tower — Workstation',
        brand: 'Dell',
        price: 1250000,
        image: 'https://images.unsplash.com/photo-1627863100134-5f787ce80baf?w=600',
        description: `Station de travail professionnelle Dell Precision 3660 certifiée ISV. Intel Core i9-12900K (16 cœurs/24T, 5,2 GHz), 64 Go ECC DDR5, SSD 2 To NVMe RAID, GPU NVIDIA RTX A2000 12 Go GDDR6. Support mémoire ECC pour calculs critiques. Slots PCIe 5.0×2. Alimentation 525W 90% efficacité. Certifié Autodesk, Solidworks, Ansys, CATIA. Idéal : ingénierie CAO/CAM, simulation FEA, rendu architectural, BIM Revit, analyse de données massives. Garantie Dell ProSupport 5 ans NBD.`,
        rating: 4.9,
        reviews: 18,
        stock: 2,
        badge: 'Stock limité',
        tags: ['dell', 'precision', 'workstation', 'cao', 'ingénierie', 'ecc', 'i9']
      },
    ]
  },

  // ─── 3. IMPRIMANTES & SCANNERS ─────────────────────────────────────────────
  {
    id: 'printers',
    name: 'Imprimantes & Scanners',
    icon: '🖨️',
    products: [
      {
        id: 'prt-001',
        ref: 'IT-PRT-001',
        name: 'Epson EcoTank L3250 — WiFi, Couleur',
        brand: 'Epson',
        price: 185000,
        oldPrice: 210000,
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600',
        description: `Imprimante multifonction à réservoir d'encre Epson EcoTank L3250. Impression, copie, scan. Vitesse : 10 ppm couleur / 33 ppm N&B. Résolution 5760×1440 dpi. Connexion Wi-Fi Direct + USB. Compatibilité iOS AirPrint, Android, Windows. Réservoirs XL inclus : 8100 pages N&B / 6500 pages couleur (coût/page < 0,5 FCFA). Remplissage sans cartouches — économique sur le long terme. Scanner plat 1200 dpi. Idéal PME, écoles, pharmacies, agences de voyage. Retour sur investissement dès 3 mois. Garantie Epson 2 ans.`,
        rating: 4.8,
        reviews: 287,
        stock: 22,
        badge: 'Bestseller',
        tags: ['epson', 'ecotank', 'wifi', 'multifonction', 'économique', 'pme']
      },
      {
        id: 'prt-002',
        ref: 'IT-PRT-002',
        name: 'HP LaserJet Pro M404dn — Réseau',
        brand: 'HP',
        price: 265000,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
        description: `Imprimante laser monochrome professionnelle HP LaserJet Pro M404dn. Vitesse : 38 ppm. Résolution 1200×1200 dpi. Recto-verso automatique. Réseau Ethernet Gigabit intégré + USB 2.0. Bac 250 feuilles extensible. Processeur 1,2 GHz, 256 Mo RAM. HP JetIntelligence : cartouches sécurisées anti-contrefaçon. Compatible HP Smart app. Cycle mensuel max 80 000 pages. Idéal : cabinets comptables, avocats, administrations, services RH. Premier coût impression laser N&B du marché. Garantie HP 1 an + extension disponible.`,
        rating: 4.7,
        reviews: 143,
        stock: 11,
        tags: ['hp', 'laserjet', 'laser', 'réseau', 'recto-verso', 'professionnel']
      },
      {
        id: 'prt-003',
        ref: 'IT-PRT-003',
        name: 'Canon PIXMA G3470 — WiFi, 3en1',
        brand: 'Canon',
        price: 175000,
        oldPrice: 195000,
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600',
        description: `Canon PIXMA G3470 MegaTank — imprimante 3-en-1 jet d'encre rechargeable. Impression + Copie + Scan. 11 ipm couleur, 7,7 ipm N&B. Résolution scan 600×1200 dpi. Wi-Fi + USB. Application Canon PRINT Inkjet/SELPHY compatible. Réservoirs intégrés : 6000 pages couleur / 6000 N&B. Qualité photo sur papier Canon jusqu'à A4. Alimentation manuelle pour enveloppes/étiquettes. Parfait : agences communication, écoles privées, associations. Prix cartouche équivalent: néant — remplissage flacon direct. Garantie 1 an Canon Cameroun.`,
        rating: 4.6,
        reviews: 198,
        stock: 18,
        badge: 'Promo',
        tags: ['canon', 'pixma', 'megatank', 'wifi', '3en1', 'rechargeable']
      },
      {
        id: 'prt-004',
        ref: 'IT-PRT-004',
        name: 'Brother HL-L2350DW — Laser WiFi',
        brand: 'Brother',
        price: 195000,
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600',
        description: `Imprimante laser compacte Brother HL-L2350DW pour PME et bureaux à domicile. 32 ppm N&B, recto-verso auto, Wi-Fi + Ethernet + USB. Résolution 2400×600 dpi. Bac 250 feuilles. Impression mobile iOS/Android via AirPrint, Mopria, Brother iPrint&Scan. Toner TN-2420 haute capacité 3000 pages. Temps de sortie première page < 8,5s. Consommation veille : 0,9W. Certifié Energy Star. Parfait remplacement des imprimantes en fin de vie dans les bureaux. Installation réseau guidée par assistant. Garantie Brother 2 ans.`,
        rating: 4.5,
        reviews: 112,
        stock: 16,
        tags: ['brother', 'laser', 'wifi', 'compact', 'recto verso', 'toner']
      },
      {
        id: 'prt-005',
        ref: 'IT-PRT-005',
        name: 'Epson WorkForce WF-7840 — A3 WiFi',
        brand: 'Epson',
        price: 320000,
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600',
        description: `Imprimante multifonction jet d'encre Epson WorkForce WF-7840 format A3+. Impression/Copie/Scan/Fax. Vitesse 18 ipm couleur A4. Scanner A3 1200 dpi avec chargeur automatique 35 feuilles. Bac 500 feuilles (2 bacs). Wi-Fi Dual-Band, Ethernet, USB, NFC. Ecrans tactile 4,3" couleur. Cartouches XL jusqu'à 2400 pages. Recto-verso auto A3. Idéal : cabinets d'architectes, agences pub, imprimeries légères, services techniques qui impriment plans et affiches. Garantie Epson 2 ans.`,
        rating: 4.7,
        reviews: 56,
        stock: 5,
        badge: 'Nouveau',
        tags: ['epson', 'workforce', 'a3', 'multifonction', 'architecte', 'grand format']
      },
      {
        id: 'prt-006',
        ref: 'IT-PRT-006',
        name: 'HP ScanJet Pro 3600 f1 — Scanner A4',
        brand: 'HP',
        price: 185000,
        image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=600',
        description: `Scanner à plat et document HP ScanJet Pro 3600 f1 avec chargeur automatique 50 feuilles (recto-verso). Résolution optique 1200 dpi, numérique 4800 dpi. Vitesse : 25 ppm/50 ipm (recto/verso simultané). Logiciel HP Scan inclus pour archivage PDF searchable, envoi email, cloud (OneDrive, Dropbox). USB 3.0. Détection automatique couleur. Compatible TWAIN/ISIS pour logiciels de GED (DocuWare, Alfresco). Idéal dématérialisation administrative, cabinets médicaux, banques, notaires. Garantie HP 1 an.`,
        rating: 4.6,
        reviews: 74,
        stock: 9,
        tags: ['hp', 'scanner', 'chargeur automatique', 'archivage', 'ged', 'recto-verso']
      },
      {
        id: 'prt-007',
        ref: 'IT-PRT-007',
        name: 'Canon imageCLASS MF264dw II — Laser',
        brand: 'Canon',
        price: 235000,
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600',
        description: `Imprimante multifonction laser monochrome Canon imageCLASS MF264dw II. 30 ppm, recto-verso auto. Copie 1:1 et réduction/agrandissement. Scanner 600×600 dpi vers PDF/JPEG. Wi-Fi + USB + Ethernet. Écran tactile 5". Envoi par email depuis le scanner sans PC. Bac 250 + feuille manuelle. Toner CRG-067 : 1350 pages standard / CRG-067H : 2350 pages. Conforme ENERGY STAR. Parfait pour : cabinets médicaux, officines, petits bureaux multiusage. Canon Mobile Printing compatible. Garantie Canon 2 ans.`,
        rating: 4.5,
        reviews: 89,
        stock: 13,
        tags: ['canon', 'imageclass', 'laser', 'multifonction', 'wifi', 'scan email']
      },
    ]
  },

  // ─── 4. ÉCRANS & MONITEURS ─────────────────────────────────────────────────
  {
    id: 'monitors',
    name: 'Écrans & Moniteurs',
    icon: '🖥',
    products: [
      {
        id: 'mon-001',
        ref: 'IT-MON-001',
        name: 'Dell UltraSharp U2422H — 24" IPS 4K',
        brand: 'Dell',
        price: 295000,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600',
        description: `Moniteur professionnel Dell UltraSharp U2422H 23,8" IPS. Résolution FHD 2560×1440 (QHD) 60 Hz. Couverture couleur 99% sRGB, 99% Rec. 709. Delta E < 2 (calibration usine). Réglable : hauteur 150mm, inclinaison, pivotement 90°, rotation. Ports : HDMI 1.4, DP 1.4, USB-C 65W (charge laptop), USB-A 3.2×4 Hub. VESA 100×100. Mode confort yeux : ComfortView Plus certifié TÜV. Luminosité 350 nits, contraste 1000:1. Idéal : graphisme, développement, DAF, architectes. Garantie Dell 3 ans Premium Panel.`,
        rating: 4.9,
        reviews: 134,
        stock: 9,
        badge: 'Bestseller',
        tags: ['dell', 'ultrasharp', 'qhd', 'ips', 'graphisme', 'usb-c', 'professionnel']
      },
      {
        id: 'mon-002',
        ref: 'IT-MON-002',
        name: 'HP V24i G5 — 24" FHD IPS, Anti-reflet',
        brand: 'HP',
        price: 145000,
        oldPrice: 165000,
        image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600',
        description: `Moniteur HP V24i G5 Full HD 23,8" IPS. Résolution 1920×1080, 75 Hz. Dalle IPS : angle de vision 178°/178°, sans distorsion couleur. Luminosité 250 nits, contraste 1000:1. Anti-reflet, faible rayonnement bleu (certifié). Ports : HDMI, VGA, audio 3,5mm. VESA 100×100. Cadre ultra-fin 3 côtés — idéal configuration multi-écrans. AMD FreeSync (anti-tearing gaming léger). Profil d'affichage Low Blue Light. Recommandé : bureautique quotidienne, call centers, enseignement. Garantie HP 3 ans.`,
        rating: 4.6,
        reviews: 221,
        stock: 28,
        badge: 'Promo',
        tags: ['hp', 'moniteur', 'full hd', 'ips', 'bureau', 'économique', 'freesync']
      },
      {
        id: 'mon-003',
        ref: 'IT-MON-003',
        name: 'Samsung 27" Curved — 1000R, 165 Hz',
        brand: 'Samsung',
        price: 245000,
        image: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=600',
        description: `Écran gaming Samsung C27G55T 27" VA Curved 1000R. Résolution QHD 2560×1440, 165 Hz, temps réponse 1ms MPRT. Courbure immersive 1000R = rayon de courbure de l'œil humain. SAMSUNG QLED : 125% sRGB, HDR10. AMD FreeSync Premium certifié. Luminosité 250 nits, contraste 3000:1 (VA). Pied réglable en hauteur et inclinaison. Ports : HDMI 2.0, DisplayPort 1.2. Game Mode : noir de nuit amélioré. Idéal : gaming FPS/RPG, design graphique, montage vidéo. Garantie Samsung 3 ans.`,
        rating: 4.7,
        reviews: 87,
        stock: 11,
        badge: 'Nouveau',
        tags: ['samsung', 'gaming', 'curved', '165hz', 'qhd', 'freesync']
      },
      {
        id: 'mon-004',
        ref: 'IT-MON-004',
        name: 'LG 34" UltraWide — 21:9, IPS 100 Hz',
        brand: 'LG',
        price: 385000,
        image: 'https://images.unsplash.com/photo-1616763355603-9755a640a287?w=600',
        description: `Moniteur LG 34WP550-B UltraWide 34" IPS 21:9. Résolution WFHD 2560×1080, 100 Hz. Dalle IPS : 99% sRGB, angle 178°. AMD FreeSync. Ports : HDMI×2, DP, USB-C 65W. Haut-parleurs stéréo 7W×2 intégrés. Split Screen 2.0 (divise l'écran en 2-4 zones). Mode Readerbook. Équivalent à 2×17" côte à côte — productivité +40%. Idéal : multi-tâches avancé, trading, développeurs, montage timeline vidéo. Pied réglable en hauteur. VESA 75×75. Garantie LG 3 ans.`,
        rating: 4.8,
        reviews: 62,
        stock: 7,
        tags: ['lg', 'ultrawide', '21:9', 'productivité', 'multiécran', 'usb-c']
      },
      {
        id: 'mon-005',
        ref: 'IT-MON-005',
        name: 'Asus ProArt 27" 4K — Calibré usine',
        brand: 'Asus',
        price: 495000,
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600',
        description: `Moniteur professionnel ASUS ProArt PA278QV 27" IPS 4K UHD (3840×2160), 60 Hz. Calibré en usine Delta E < 2. Couverture : 100% sRGB, 100% Rec.709, 75% DCI-P3. Luminosité 350 nits, contraste 1200:1. Pied ProArt : hauteur 150mm, pivotement, rotation portrait. USB Hub 3.0×4 + USB-C. Filtre anti-lumière bleue TÜV Rheinland. Compatible X-Rite i1Display calibrator. Certifié Calman Verified, PANTONE Validated. Indispensable pour : retouche photo pro, pré-presse, colorimétrie, studio vidéo. Garantie Asus 3 ans.`,
        rating: 4.9,
        reviews: 41,
        stock: 4,
        badge: 'Stock limité',
        tags: ['asus', 'proart', '4k', 'calibré', 'photo', 'colorimétrie', 'créatif']
      },
    ]
  },

  // ─── 5. RÉSEAUX & WIFI ─────────────────────────────────────────────────────
  {
    id: 'networking',
    name: 'Réseaux & WiFi',
    icon: '🌐',
    products: [
      {
        id: 'net-001',
        ref: 'IT-NET-001',
        name: 'TP-Link Archer AX73 — WiFi 6, AX5400',
        brand: 'TP-Link',
        price: 125000,
        oldPrice: 145000,
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600',
        description: `Routeur WiFi 6 TP-Link Archer AX73 dual-band AX5400 (5400 Mbps). 2,4 GHz : 574 Mbps / 5 GHz : 4804 Mbps. Technologie OFDMA + MU-MIMO 4×4 : jusqu'à 4× plus efficace que WiFi 5. 6 antennes haute gain 5 dBi. Couverture 250 m². Jusqu'à 50 appareils simultanés sans dégradation. Ports : WAN Gigabit, LAN×4 Gigabit, USB 3.0 partage NAS. HomeCare Pro : antivirus réseau, contrôle parental avancé, QoS intelligent. Facile à configurer via app Tether. Idéal : maison connectée, PME, hôtels, restaurants avec IoT. Garantie TP-Link 2 ans.`,
        rating: 4.7,
        reviews: 198,
        stock: 17,
        badge: 'Bestseller',
        tags: ['tp-link', 'wifi 6', 'routeur', 'ax5400', 'réseau', 'maison connectée']
      },
      {
        id: 'net-002',
        ref: 'IT-NET-002',
        name: 'Cisco SG350-10 — Switch 10 Ports Géré',
        brand: 'Cisco',
        price: 195000,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
        description: `Switch manageable Cisco SG350-10 Small Business. 8 ports Gigabit + 2 combo SFP/Gigabit. Management via interface web, SNMP v1/2/3, CLI SSH/Telnet. VLAN 802.1Q (jusqu'à 256), QoS priorité voix/vidéo, Spanning Tree RSTP/MSTP. Protection : 802.1x, Storm Control, Port Security, DHCP Snooping, Dynamic ARP Inspection. Rackable 1U. Consommation 16,7W. Idéal : infrastructure PME, réseaux multiservices VoIP, surveillance CCTV segmentée. Configuration par assistant simplifié. Garantie Cisco Limited Lifetime.`,
        rating: 4.8,
        reviews: 56,
        stock: 8,
        badge: 'Nouveau',
        tags: ['cisco', 'switch', 'manageable', 'vlan', 'entreprise', 'voip']
      },
      {
        id: 'net-003',
        ref: 'IT-NET-003',
        name: 'TP-Link TL-SF1024D — Switch 24 Ports',
        brand: 'TP-Link',
        price: 65000,
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600',
        description: `Switch non-manageable TP-Link TL-SF1024D 24 ports Fast Ethernet 10/100 Mbps. Plug-and-play — aucune configuration requise. Boîtier rack 1U métal robuste. Switching Fabric 4,8 Gbps. MAC Address Table 4K entrées. Store-and-Forward. Auto-négociation MDI/MDIX. Jumbo Frame jusqu'à 1518 octets. Consommation < 8,8W. LEDs de statut par port. Solution économique pour connecter jusqu'à 24 postes en réseau filaire. Idéal : écoles, PME débutantes, laboratoires. Garantie TP-Link 3 ans.`,
        rating: 4.5,
        reviews: 143,
        stock: 25,
        tags: ['tp-link', 'switch', '24 ports', 'économique', 'école', 'plug and play']
      },
      {
        id: 'net-004',
        ref: 'IT-NET-004',
        name: 'Ubiquiti UniFi AP AC Pro — WiFi Pro',
        brand: 'Ubiquiti',
        price: 145000,
        image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=600',
        description: `Point d'accès professionnel Ubiquiti UniFi UAP-AC-PRO. Double bande AC1750 (450+1300 Mbps). 3×3 MIMO. Porté intérieure 120 m², extérieure 183 m². PoE 802.3af/at intégré (aucune alimentation séparée). Isolation VLAN multi-SSID jusqu'à 8 réseaux. Gestion centralisée UniFi Controller (gratuit). LED de statut. IP55 résistant à l'humidité. Idéal : hôtels, restaurants, bureaux multi-étages, hôpitaux. Supporte 200+ clients simultanés. Montage plafond/mur inclus. Garantie Ubiquiti 2 ans.`,
        rating: 4.9,
        reviews: 78,
        stock: 11,
        tags: ['ubiquiti', 'unifi', 'access point', 'poe', 'hôtel', 'entreprise', 'ac1750']
      },
      {
        id: 'net-005',
        ref: 'IT-NET-005',
        name: 'Modem 4G LTE — Huawei B315 Router',
        brand: 'Huawei',
        price: 85000,
        oldPrice: 99000,
        image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=600',
        description: `Routeur LTE Huawei B315s 4G. Catégorie LTE Cat.4 (150 Mbps DL / 50 Mbps UL). Wi-Fi 802.11b/g/n 2,4 GHz (32 utilisateurs). Ports : LAN×4 RJ-45, RJ-11 téléphonie fixe, USB. Slot SIM carte standard. Antenne externe 2× SMA (signal boostable). Compatible Orange Cameroun, MTN Cameroun. Interface web + app HiLink Android/iOS. Parfait : bureaux en zones sans ADSL, maisons isolées, télétravail rural. Alimentation 12V 1A. Garantie 1 an + support Imani-Tech.`,
        rating: 4.4,
        reviews: 234,
        stock: 19,
        badge: 'Promo',
        tags: ['huawei', '4g', 'lte', 'routeur', 'orange', 'mtn', 'télétravail']
      },
      {
        id: 'net-006',
        ref: 'IT-NET-006',
        name: 'Câblage Cat6 FTP — Kit 100m + Accessoires',
        brand: 'Legrand',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
        description: `Kit câblage réseau professionnel Legrand Cat6 FTP. Contenu : bobine câble blindé Cat6 FTP 100m (10 Gbps à 250 MHz), 50 connecteurs RJ-45 blindés, 50 embouts de protection, outil de sertissage ratchet, testeur réseau 8 LED, guide de câblage. Câble en cuivre pur 4 paires torsadées, gaine LSZH (sans halogène). Certification TIA-568C.2, ISO/IEC 11801. Résistance à la coupe et traction 200N. Couleur gris. Adapté pour : infrastructure bureau, réseau CCTV, télécoms. Idéal technicien réseaux. Garantie matériau 10 ans.`,
        rating: 4.6,
        reviews: 89,
        stock: 30,
        tags: ['legrand', 'câblage', 'cat6', 'réseau', 'infrastructure', 'kit']
      },
      {
        id: 'net-007',
        ref: 'IT-NET-007',
        name: 'Firewall pfSense Netgate 2100 — UTM',
        brand: 'Netgate',
        price: 285000,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
        description: `Appliance firewall Netgate 2100 basé sur pfSense Plus. Processeur ARM Cortex-A53 1,5 GHz, 1 Go RAM, eMMC 8 Go. 4 ports Gigabit + 1 SFP. Débit firewall 700 Mbps, VPN IPsec 200 Mbps. Fonctions : Firewall stateful, NAT, DHCP, DNS Resolver, VPN (IPsec/OpenVPN/WireGuard), IDS/IPS Suricata, Proxy Squid, Captive Portal. Idéal : sécurisation réseau PME, hotspot contrôlé, infrastructure critique. Configuration via interface web intuitive. Support pfSense Plus inclus 1 an. Garantie 1 an hardware.`,
        rating: 4.8,
        reviews: 32,
        stock: 5,
        tags: ['netgate', 'pfsense', 'firewall', 'vpn', 'sécurité réseau', 'utm']
      },
    ]
  },

  // ─── 6. SÉCURITÉ & VIDÉOSURVEILLANCE ──────────────────────────────────────
  {
    id: 'security',
    name: 'Sécurité & CCTV',
    icon: '📷',
    products: [
      {
        id: 'sec-001',
        ref: 'IT-SEC-001',
        name: 'Hikvision DS-2CD2147G2 — 4MP AcuSense',
        brand: 'Hikvision',
        price: 95000,
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600',
        description: `Caméra IP Hikvision DS-2CD2147G2-LU 4MP AcuSense Full-Color. Capteur 1/2.7" CMOS progressif 2688×1520 px. Technologie AcuSense : détection IA humain/véhicule, 0 fausse alarme végétation/animaux. Vision nocturne couleur 60m (projecteur LED blanc). IP67, IK10 anti-vandalisme. PoE 802.3af. H.265+. Audio intégré (alarme sonore activable à distance). Interface RJ-45, IR cut automatique. Angle H 101°. Compatible Hikvision iVMS-4200, NVR DS-7600. Idéal : entrées bâtiment, parkings, magasins. Garantie Hikvision 2 ans.`,
        rating: 4.8,
        reviews: 167,
        stock: 21,
        badge: 'Bestseller',
        tags: ['hikvision', 'ip', '4mp', 'acusense', 'poe', 'nuit couleur', 'ia']
      },
      {
        id: 'sec-002',
        ref: 'IT-SEC-002',
        name: 'NVR Hikvision 8 canaux — 4K, 2 To',
        brand: 'Hikvision',
        price: 215000,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
        description: `Enregistreur vidéo réseau Hikvision DS-7608NXI-I2/S 8 canaux 4K. Intelligence artificielle : détection intrusion, franchissement ligne, comptage personnes. Résolution : 8× 8MP simultané. 2 To HDD WD Purple inclus (extensible 2× SATA). Affichage 4K HDMI. Deep Learning : moins de fausses alarmes. Ports : 8× POE switch intégré, HDMI, VGA, USB, SATA. Accès distant Hik-Connect. Stockage 30 jours × 4 caméras 4MP. Compatible toutes caméras Hikvision H.265. Support installation Imani-Tech disponible. Garantie 2 ans.`,
        rating: 4.9,
        reviews: 78,
        stock: 9,
        tags: ['hikvision', 'nvr', '8 canaux', '4k', 'poe', 'ia', 'hdd inclus']
      },
      {
        id: 'sec-003',
        ref: 'IT-SEC-003',
        name: 'Dahua IPC-HDW3849H — 8MP Eyeball',
        brand: 'Dahua',
        price: 85000,
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600',
        description: `Caméra dôme IP Dahua IPC-HDW3849H 8MP (4K) Smart Dual Light. Résolution 3840×2160 px. Double technologie : LED IR 30m (nuit N&B) + LED blanc 30m (nuit couleur). IA embarquée : détection visage, intrusion, franchissement, comptage. IP67, IK10. H.265+, Codec Smart : économie bande passante 70%. PoE 802.3af. Compression SMD Plus : élimine 97% fausses alarmes. Interface RJ-45, entrée/sortie audio. Compatible DMSS, NVR Dahua et ONVIF. Idéal surveillance entreprise, résidence. Garantie Dahua 2 ans.`,
        rating: 4.7,
        reviews: 94,
        stock: 15,
        badge: 'Nouveau',
        tags: ['dahua', '8mp', '4k', 'dual light', 'ia', 'poe', 'dôme']
      },
      {
        id: 'sec-004',
        ref: 'IT-SEC-004',
        name: 'Contrôle d\'Accès ZKTeco SF100 — Empreinte',
        brand: 'ZKTeco',
        price: 125000,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
        description: `Terminal de contrôle d'accès biométrique ZKTeco SF100. Capacité : 3000 empreintes, 100 000 logs. Lecteur empreinte CMOS optique 500 dpi (0,1s reconnaissance). Mode : empreinte + code PIN ou carte Mifare 13.56 MHz. Sortie relais pour électroaimant/électroserrure. Wiegand 26/34 bits. RS-485, TCP/IP RJ-45. Écran TFT couleur 2,8". Buzzer + LED état. Alimentation 12V DC. Logiciel ZKAccess gratuit (gestion département, plages horaires, rapport présence). Idéal : bureaux, usines, résidences, entrepôts. Garantie ZKTeco 1 an.`,
        rating: 4.6,
        reviews: 112,
        stock: 13,
        tags: ['zkteco', 'biométrique', 'empreinte', 'contrôle accès', 'présence', 'sécurité']
      },
      {
        id: 'sec-005',
        ref: 'IT-SEC-005',
        name: 'Alarme GSM Paradox MG5050+ — Pro',
        brand: 'Paradox',
        price: 185000,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
        description: `Centrale d'alarme hybride Paradox MG5050+ avec module GSM intégré. 50 zones programmables (câblées + sans fil). SMS d'alerte instantané sur 8 numéros. Mémorisation 512 événements. Clavier touchscreen K10V inclus. Batterie tampon 7 Ah incluse. Sirène intégrée + sortie sirène externe. Compatible détecteurs PIR, IRM, bris vitre, fumée, gaz. Logiciel BabyWare pour configuration. Application InTouch (supervision mobile). Résistant aux tentatives de sabotage. Idéal résidence, magasin, entrepôt. Installation par techniciens Imani-Tech. Garantie 2 ans.`,
        rating: 4.7,
        reviews: 58,
        stock: 7,
        tags: ['paradox', 'alarme', 'gsm', 'sms', 'anti-intrusion', 'résidence']
      },
      {
        id: 'sec-006',
        ref: 'IT-SEC-006',
        name: 'Caméra Solaire 4G — Sans câble, 3MP',
        brand: 'Reolink',
        price: 115000,
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600',
        description: `Caméra de surveillance solaire 4G Reolink Go PT. Résolution 3MP (2304×1296). Panneau solaire 4W inclus — autonomie illimitée. Carte SIM 4G/3G (compatible Orange/MTN). PTZ motorisé : rotation H 355°, V 90°. Détection IA humain/animal. Vision nocturne IR 10m. Alerte push/email. Stockage : cloud ou carte SD 256 Go. IP65. Idéal : chantier, plantation, ferme, maison secondaire, zone sans électricité. App Reolink iOS/Android. Aucun câble électrique nécessaire. Garantie 2 ans.`,
        rating: 4.5,
        reviews: 76,
        stock: 12,
        badge: 'Nouveau',
        tags: ['reolink', 'solaire', '4g', 'sans câble', 'plantation', 'ptz', 'chantier']
      },
    ]
  },

  // ─── 7. ONDULEURS & ÉNERGIE ────────────────────────────────────────────────
  {
    id: 'ups',
    name: 'Onduleurs & Énergie',
    icon: '⚡',
    products: [
      {
        id: 'ups-001',
        ref: 'IT-UPS-001',
        name: 'APC Back-UPS 1500VA — Parafoudre Pro',
        brand: 'APC',
        price: 145000,
        image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600',
        description: `Onduleur APC Back-UPS BX1500MI 1500 VA / 900 W. Autonomie : 14 min à mi-charge (450W), 4 min à pleine charge. 8 prises protégées (6 avec batterie + 2 parafoudre). Protection contre surtensions, coupures, micro-coupures fréquentes au Cameroun. Ports USB pour communication avec PC (arrêt automatique). Logiciel PowerChute Personal Edition inclus. Batterie RBC17 remplaçable à chaud. Indicateur LED charge batterie. Alarme sonore. Idéal : PC bureau, écran 24", box internet, point de vente. Poids 7,2 kg. Garantie APC 2 ans.`,
        rating: 4.8,
        reviews: 312,
        stock: 24,
        badge: 'Bestseller',
        tags: ['apc', 'onduleur', '1500va', 'batterie', 'coupure', 'bureau', 'protection']
      },
      {
        id: 'ups-002',
        ref: 'IT-UPS-002',
        name: 'APC Smart-UPS SRT 3000VA — Online',
        brand: 'APC',
        price: 685000,
        image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600',
        description: `Onduleur ligne interactive double-conversion APC Smart-UPS SRT3000RMXLI 3000 VA / 2700 W. Technologie online double conversion : protection absolue contre toute perturbation réseau (Cameroun réseau instable). Autonomie : 6 min à pleine charge, 12 min à mi-charge. Écran LCD tactile. 9 prises IEC. Ports RS-232, USB, carte réseau SNMP (gestion à distance). Batterie gel VRLA. Compatible UPS Network Management Card. Certifié pour salles serveurs, équipements télécom, NAS, équipement médical critique. Garantie APC 3 ans + échange avancé.`,
        rating: 4.9,
        reviews: 43,
        stock: 5,
        badge: 'Stock limité',
        tags: ['apc', 'smart-ups', 'online', '3000va', 'serveur', 'double conversion', 'snmp']
      },
      {
        id: 'ups-003',
        ref: 'IT-UPS-003',
        name: 'Eaton 5E 1100 USB — Compact 660W',
        brand: 'Eaton',
        price: 85000,
        oldPrice: 98000,
        image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600',
        description: `Onduleur Eaton 5E 1100 USB 1100 VA / 660 W. Ligne interactive avec régulation de tension automatique (AVR). 6 prises IEC8 + 2 prises avec batterie + 4 avec parafoudre. USB pour communication avec Eaton Intelligent Power Protector. Autonomie : 10 min à 330W. Indicateurs LED : charge, défaut batterie, surcharge. Forme verticalε compacte. Solution idéale pour : poste bureautique simple, caisse enregistreuse, terminal de paiement. Format compact (310×100×142 mm). Batterie remplaçable par l'utilisateur. Garantie Eaton 3 ans.`,
        rating: 4.5,
        reviews: 187,
        stock: 31,
        badge: 'Promo',
        tags: ['eaton', 'onduleur', '1100va', 'compact', 'avr', 'caisse', 'bureau']
      },
      {
        id: 'ups-004',
        ref: 'IT-UPS-004',
        name: 'Onduleur Solar Hybrid 5kVA — MPPT',
        brand: 'Victron',
        price: 895000,
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600',
        description: `Onduleur solaire hybride Victron MultiPlus-II 5000 VA. Chargeur MPPT 450V/100A intégré. Connexion panneaux solaires jusqu'à 5500 Wp. Batterie Lithium LiFePO4 ou Pb 24/48V. Mode transfert <20ms. Monitoring VictronConnect Bluetooth + VRM Portal (web). Fonctions : zéro injection réseau, assistant ESS, équilibrage de charge. Rendement >96%. Entrée AC: 230V±50V. Idéal : maisons, PME avec charges critiques, hôtels avec pannes fréquentes. Réduction facture électrique -70%. Garantie Victron 5 ans.`,
        rating: 4.9,
        reviews: 28,
        stock: 3,
        badge: 'Stock limité',
        tags: ['victron', 'solaire', 'hybride', 'mppt', 'lithium', 'autonomie', 'énergie solaire']
      },
      {
        id: 'ups-005',
        ref: 'IT-UPS-005',
        name: 'Régulateur 5kVA — Stabilisateur AVR',
        brand: 'Rexon',
        price: 55000,
        image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600',
        description: `Régulateur de tension automatique Rexon 5000 VA / 4000 W. Plage tension entrée : 110-260V CA. Tension sortie : 220V ±3%. Temps de réponse correction < 0,3s. 4 prises standard + 2 spour forte charge. Mécanisme servo-moteur silencieux. Indicateur digital tension entrée/sortie. Protection : surtension, sous-tension, court-circuit, démarrage retardé. Convient : climatiseurs, réfrigérateurs, pompes, télévision, systèmes son. Fonctionnement silencieux adapté habitation. Certification CE, RoHS. Garantie 1 an.`,
        rating: 4.3,
        reviews: 267,
        stock: 38,
        tags: ['stabilisateur', 'avr', '5kva', 'tension', 'protection', 'climatiseur']
      },
    ]
  },

  // ─── 8. PÉRIPHÉRIQUES ─────────────────────────────────────────────────────
  {
    id: 'peripherals',
    name: 'Périphériques',
    icon: '⌨️',
    products: [
      {
        id: 'per-001',
        ref: 'IT-PER-001',
        name: 'Logitech MX Keys S — Clavier Premium',
        brand: 'Logitech',
        price: 75000,
        oldPrice: 88000,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600',
        description: `Clavier sans fil Logitech MX Keys S avec touches "Perfect Stroke" concaves, rétroéclairage adaptatif LED (s'allume à l'approche des mains). Connexion Bluetooth Low Energy ou récepteur USB Logi Bolt. Multi-appareils : bascule entre 3 ordinateurs/tablettes en 1 touche. Autonomie 10 jours avec rétroéclairage, 5 mois sans. Touches personnalisables via Logi Options+. Frappe silencieuse, course 1,8mm. Recharge USB-C. Disposition AZERTY FR. Poids 810g (stabilité bureau). Idéal : rédaction, comptabilité, programmation. Garantie Logitech 2 ans.`,
        rating: 4.9,
        reviews: 234,
        stock: 16,
        badge: 'Bestseller',
        tags: ['logitech', 'clavier', 'sans fil', 'bluetooth', 'multi-appareils', 'premium']
      },
      {
        id: 'per-002',
        ref: 'IT-PER-002',
        name: 'Logitech MX Master 3S — Souris Pro',
        brand: 'Logitech',
        price: 68000,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600',
        description: `Souris sans fil Logitech MX Master 3S. Capteur laser 8000 dpi, précision sur toutes surfaces dont verre. Molette MagSpeed électromagnétique : 1 rotation = défile 1000 lignes (ultra-rapide). 7 boutons programmables. Ergonomie droitier premium, repose-pouce. Multi-appareils 3 appareils Bolt/BT. Autonomie 70 jours. Recharge USB-C. Clic 90% plus silencieux vs MX Master 2. Personnalisation via Logi Options+. Poids 141g. Idéal : travail intensif multi-fenêtres, design, vidéo, développement. Garantie Logitech 2 ans.`,
        rating: 4.9,
        reviews: 189,
        stock: 14,
        tags: ['logitech', 'souris', 'sans fil', 'ergonomique', 'pro', 'programmable']
      },
      {
        id: 'per-003',
        ref: 'IT-PER-003',
        name: 'Webcam Logitech C920 HD Pro — 1080p',
        brand: 'Logitech',
        price: 55000,
        image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600',
        description: `Webcam Logitech C920 HD Pro. Résolution vidéo : 1080p Full HD à 30 fps. Angle de vue 78°. Dual microphone stéréo avec réduction bruit (jusqu'à 90 cm). Mise au point auto rapide. Compatibilité : Teams, Zoom, Google Meet, OBS, Skype. Connexion USB-A. Pas de driver — plug & play. Fixation écran/trépied universelle. Verre d'objectif Carl Zeiss. Correction automatique lumière (fonctionnel dans obscurité partielle). Idéal : télétravail, réunion visio, streaming, enseignement en ligne. Garantie Logitech 2 ans.`,
        rating: 4.8,
        reviews: 312,
        stock: 22,
        badge: 'Bestseller',
        tags: ['logitech', 'webcam', '1080p', 'zoom', 'teams', 'télétravail', 'streaming']
      },
      {
        id: 'per-004',
        ref: 'IT-PER-004',
        name: 'Casque Jabra Evolve2 85 — ANC Pro',
        brand: 'Jabra',
        price: 185000,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
        description: `Casque professionnel Jabra Evolve2 85 avec réduction de bruit active ANC avancée (suppression bruit open-space). 8 microphones (6 pour voix, 2 ANC). Certifié Microsoft Teams + compatible toutes plateformes. Bluetooth 5.0 multipoints (2 appareils simultanés). Autonomie 37h avec ANC. Batterie USB-C rapide (15 min = 8h). Haut-parleurs 40mm avec son Hi-Fi Dolby. Mode concentrationMax : bulle sonore absolue. Perche microphone flexible. Idéal : call center, consultant, open-space, télétravail. Garantie Jabra 2 ans.`,
        rating: 4.8,
        reviews: 76,
        stock: 8,
        badge: 'Nouveau',
        tags: ['jabra', 'casque', 'anc', 'bluetooth', 'teams', 'call center', 'télétravail']
      },
      {
        id: 'per-005',
        ref: 'IT-PER-005',
        name: 'Disque Dur Externe 2 To — WD Elements',
        brand: 'WD',
        price: 42000,
        oldPrice: 52000,
        image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=600',
        description: `Disque dur externe WD Elements Portable 2 To. Connectique USB 3.0 (compatible USB 2.0). Vitesse de transfert jusqu'à 480 Mbps USB 3.0. Format 2,5" ultra-portable, sans alimentation externe. Compatible Windows, Mac OS X (reformatage nécessaire Mac). Logiciel WD Discovery pour sauvegarde automatique. Chiffrement matériel optionnel. Coque ABS résistante chocs légers. Idéal : sauvegarde données critique, transport projets, stockage vidéo 4K (stocke ~400 films HD). Poids 93g. Garantie WD 3 ans.`,
        rating: 4.7,
        reviews: 445,
        stock: 35,
        badge: 'Promo',
        tags: ['wd', 'disque dur', 'externe', '2to', 'portable', 'sauvegarde', 'usb']
      },
      {
        id: 'per-006',
        ref: 'IT-PER-006',
        name: 'SSD Kingston 1 To NVMe — M.2 2280',
        brand: 'Kingston',
        price: 58000,
        image: 'https://images.unsplash.com/photo-1597673030470-87f51f2d396e?w=600',
        description: `SSD Kingston NV2 1 To M.2 2280 PCIe Gen 4x4. Vitesse lecture séquentielle : 3500 Mo/s. Écriture : 2800 Mo/s. Interface PCIe 4.0 NVMe. Profondeur queue QD32T8 : lecture 600K IOPS, écriture 500K IOPS. Consommation 2W actif, 0,01W veille. Endurance 320 TBW. Format compact M.2 2280. Compatible AMD Ryzen 5000/7000, Intel 12e/13e génération. Idéal mise à niveau laptop/desktop, boost performance système. Installation 5 minutes (sans outil spécial). Garantie Kingston 3 ans.`,
        rating: 4.8,
        reviews: 267,
        stock: 28,
        tags: ['kingston', 'ssd', 'nvme', 'm.2', '1to', 'upgrade', 'rapide']
      },
      {
        id: 'per-007',
        ref: 'IT-PER-007',
        name: 'Hub USB-C 12en1 — HDMI 4K, Ethernet',
        brand: 'Ugreen',
        price: 38000,
        image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=600',
        description: `Hub USB-C polyvalent Ugreen 12-en-1. Ports : HDMI 4K@60Hz, VGA 1080p, Ethernet RJ-45 Gigabit, USB-A 3.0×4, USB-C Data, USB-C PD 100W, SD card, MicroSD, jack audio 3,5mm. Chipset certifié. Taux transfert USB3.0 : 5 Gbps. Passthrough charge 100W (aucune perte). Compatible : MacBook, Dell, Lenovo, Surface. Câble intégré 15cm — pas de câble supplementaire. Boîtier aluminium dissipation thermique. Plug & play. Idéal voyageurs, créatifs, présentations. Garantie Ugreen 18 mois.`,
        rating: 4.6,
        reviews: 198,
        stock: 24,
        tags: ['ugreen', 'hub usb-c', 'hdmi', '4k', 'ethernet', 'multiport', 'laptop']
      },
      {
        id: 'per-008',
        ref: 'IT-PER-008',
        name: 'Tablette Graphique XP-Pen Deco 01 V2',
        brand: 'XP-Pen',
        price: 65000,
        image: 'https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=600',
        description: `Tablette graphique XP-Pen Deco 01 V2. Zone active : 25,4×15,9 cm (A4 grand format). Stylet passif 8192 niveaux pression, 60° d'inclinaison. Résolution 5080 lpi. Vitesse report : 266 pps. 8 touches express personnalisables. USB-C. Compatible : Photoshop, Illustrator, Clip Studio, Krita, GIMP, SAI. Drivers Windows 10/11 et macOS. Idéal : graphistes, illustrateurs, retouche photo, créateurs de contenu, enseignants tableau numérique. Stylet inclus + 8 embouts. Garantie XP-Pen 2 ans.`,
        rating: 4.7,
        reviews: 134,
        stock: 11,
        badge: 'Nouveau',
        tags: ['xp-pen', 'tablette graphique', 'photoshop', 'illustrateur', 'graphiste', 'dessin']
      },
    ]
  },

  // ─── 9. TÉLÉPHONES & SMARTPHONES ──────────────────────────────────────────
  {
    id: 'phones',
    name: 'Téléphones & IP',
    icon: '📱',
    products: [
      {
        id: 'pho-001',
        ref: 'IT-PHO-001',
        name: 'Samsung Galaxy A54 5G — 256 Go',
        brand: 'Samsung',
        price: 315000,
        oldPrice: 345000,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
        description: `Samsung Galaxy A54 5G avec Exynos 1380 (4nm, 8 cœurs), 8 Go RAM, 256 Go stockage interne (extensible microSD). Écran Super AMOLED 6,4" FHD+ 120Hz, Gorilla Glass 5. Triple caméra arrière : 50 MP OIS + 12 MP ultra-grand-angle + 5 MP macro. Caméra avant 32 MP. Batterie 5000 mAh, charge rapide 25W. 5G Sub-6 GHz. IP67 (résistant eau). One UI 5.1 + Android 13. Compatibilité Orange/MTN Cameroun 4G/5G. Idéal professionnel mobile, créateurs de contenu. Garantie Samsung 1 an.`,
        rating: 4.7,
        reviews: 156,
        stock: 13,
        badge: 'Promo',
        tags: ['samsung', '5g', 'galaxy', 'smartphone', 'professionnel', '256go']
      },
      {
        id: 'pho-002',
        ref: 'IT-PHO-002',
        name: 'Téléphone IP Cisco 8841 — VoIP 5 lignes',
        brand: 'Cisco',
        price: 185000,
        image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600',
        description: `Téléphone IP Cisco CP-8841 pour entreprise. 5 lignes SIP. Écran couleur 5" 800×480 px WSVGA. Son HD wideband (codec G.722). Haut-parleur mains-libres. Ethernet Gigabit PoE intégré. Support casque EHS. Répertoire XML, historique appels 150 entrées. Compatible Cisco Unified CM, Broadsoft, FreePBX/Asterisk. Chiffrement SRTP. Authentification certificat 802.1X. Réglable en hauteur. Idéal : open-space, réception, managers. Déploiement plug-and-play DHCP + TFTP auto-provisionning. Garantie Cisco 90 jours (hardware).`,
        rating: 4.8,
        reviews: 43,
        stock: 8,
        tags: ['cisco', 'voip', 'ip', 'téléphone', 'entreprise', 'pbx', '5 lignes']
      },
      {
        id: 'pho-003',
        ref: 'IT-PHO-003',
        name: 'Téléphone IP Yealink T46U — Couleur',
        brand: 'Yealink',
        price: 95000,
        image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600',
        description: `Téléphone IP Yealink SIP-T46U. 16 lignes SIP. Écran couleur 4,3" 480×272. Dual USB (casque, enregistrement, téléchargements). Port Gigabit PoE. Codec audio HD : G.711, G.722, G.726, G.729A, Opus. Support SRTP + TLS chiffrement. Répertoire 2000 contacts, journal 400 appels. Compatible Zoom Phone, Teams Direct, MS TEAMS, 3CX, Asterisk, FreePBX, BroadSoft. Casque Yealink UH36 compatible USB. Déploiement en masse via RPS/TFTP. Idéal call-center, banques, cabinets. Garantie Yealink 2 ans.`,
        rating: 4.7,
        reviews: 67,
        stock: 11,
        badge: 'Nouveau',
        tags: ['yealink', 'voip', 'ip', '16 lignes', 'call center', 'teams', '3cx']
      },
      {
        id: 'pho-004',
        ref: 'IT-PHO-004',
        name: 'Talkie Walkie Motorola T82 — PMR 8km',
        brand: 'Motorola',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1609096458733-95b38583ac4e?w=600',
        description: `Talkie-walkie Motorola T82 Extreme. Paire de 2 radios PMR 446 (sans licence). Portée jusqu'à 10 km (terrain dégagé) / 2 km en ville. 8 canaux + 121 codes confidentialité. VOX mains-libres. IP54 résistant eau/poussière. LED torche intégrée. Autonomie 22h (piles AA incluses). Chargeur de bureau pour 2 appareils. Alarme d'urgence. Scan canaux automatique. Idéal : chantier, hôtel, événement, sécurité, entrepôt, agriculture. Livré avec 2 radios + chargeur + piles. Garantie Motorola 1 an.`,
        rating: 4.5,
        reviews: 134,
        stock: 20,
        tags: ['motorola', 'talkie walkie', 'pmr', 'chantier', 'sécurité', 'communication']
      },
    ]
  },

  // ─── 10. CONSOMMABLES & ACCESSOIRES ───────────────────────────────────────
  {
    id: 'consumables',
    name: 'Consommables',
    icon: '🖱️',
    products: [
      {
        id: 'con-001',
        ref: 'IT-CON-001',
        name: 'Toner HP 26X — LaserJet Pro Haute Capacité',
        brand: 'HP',
        price: 58000,
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600',
        description: `Cartouche de toner original HP 26X CF226X haute capacité. Rendement : 9000 pages à 5% couverture. Compatible : HP LaserJet Pro M402dn, M402dne, M402dw, M402n, M426dw, M426fdn, M426fdw. Toner certifié HP JetIntelligence : puce intelligente anti-contrefaçon, suivi automatique niveau encre. Poudre de toner HP ColorSphere 3 : texte net à 1200 dpi. 3× plus de pages vs cartouche standard. Coût/page : 6,4 FCFA. Emballage anti-statique. Garantie compatibilité 100% avec imprimantes HP listées. HP Eco-Return Program.`,
        rating: 4.8,
        reviews: 287,
        stock: 42,
        badge: 'Bestseller',
        tags: ['hp', 'toner', 'laserjet', 'cartouche', 'consommable', 'haute capacité']
      },
      {
        id: 'con-002',
        ref: 'IT-CON-002',
        name: 'Encre Epson 664 — Kit 4 couleurs EcoTank',
        brand: 'Epson',
        price: 18000,
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600',
        description: `Lot de 4 flacons d'encre Epson 664 pour imprimantes EcoTank. Couleurs : Noir (70ml, 4000p), Cyan/Magenta/Jaune (70ml chacun, 6500p). Compatible : EcoTank ET-2650, L300, L350, L355, L550, L555, L1300, L3050, L3060, L3070, L3150, L3250. Encre à base d'eau Epson Ultra Ink : résistance à l'eau et lumière UV. Remplissage anti-débordement avec capuchon de sécurité. Stockage 2 ans flacon ouvert. Garantie fraîcheur : date d'expiration indiquée. Économie : 85% vs cartouches classiques.`,
        rating: 4.7,
        reviews: 534,
        stock: 65,
        tags: ['epson', 'encre', 'ecotank', 'couleur', 'consommable', '664', 'économique']
      },
      {
        id: 'con-003',
        ref: 'IT-CON-003',
        name: 'RAM DDR4 16 Go 3200 MHz — Crucial',
        brand: 'Crucial',
        price: 32000,
        oldPrice: 40000,
        image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600',
        description: `Module RAM Crucial CT16G4DFRA32A DDR4 16 Go 3200 MHz. Format DIMM 288 broches. Tension 1,35V Low Power. Compatible Intel (XMP 2.0) et AMD (PCI-E 4.0). Timings CL22. Température opération 0-85°C. Certifié SPD standard JEDEC. Compatible Dell, HP, Lenovo, Asus, MSI. Améliore : multitâche, vitesse bureautique, compilation code, VM, montage. Test électronique 100% usine. Mise à niveau simple laptop/desktop existant. Garantie à vie Crucial.`,
        rating: 4.9,
        reviews: 345,
        stock: 48,
        badge: 'Promo',
        tags: ['crucial', 'ram', 'ddr4', '16go', 'upgrade', 'mémoire', 'compatible']
      },
      {
        id: 'con-004',
        ref: 'IT-CON-004',
        name: 'Câble HDMI 2.1 — 8K@60Hz, 2 mètres',
        brand: 'Ugreen',
        price: 8500,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
        description: `Câble HDMI 2.1 Ugreen 8K ultra haute vitesse 48 Gbps. Résolutions supportées : 8K@60Hz, 4K@120Hz, 2K@240Hz. eARC (Enhanced Audio Return Channel) audio haute définition. Variable Refresh Rate (VRR), Auto Low Latency Mode (ALLM). Compatible PS5, Xbox Series X, RTX 40xx, TV 4K 120Hz Samsung/LG/Sony. Blindage triple couche aluminium anti-interférence. Connecteurs dorés 24K anti-oxydation. Gaine nylon tressé flexible. Longueur 2m. Certifié CL2 pour installation murale. Garantie Ugreen 18 mois.`,
        rating: 4.8,
        reviews: 445,
        stock: 72,
        tags: ['ugreen', 'hdmi', '8k', '4k', 'câble', 'tv', 'ps5', 'xbox']
      },
      {
        id: 'con-005',
        ref: 'IT-CON-005',
        name: 'Clé USB 3.0 128 Go — SanDisk Ultra',
        brand: 'SanDisk',
        price: 12000,
        image: 'https://images.unsplash.com/photo-1597673030470-87f51f2d396e?w=600',
        description: `Clé USB SanDisk Ultra 128 Go USB 3.0. Vitesse lecture jusqu'à 130 Mo/s (5× plus rapide qu'USB 2.0). Vitesse écriture 40 Mo/s. Logiciel SanDisk SecureAccess (coffre chiffré AES 128 bits) pour données sensibles. Compatibilité USB 3.0 rétrocompatible USB 2.0. Design compact — reste dans le port sans gêner. Test de durabilité : 10 000 cycles insertion. Résistante à la chaleur, eau, chocs, champs magnétiques. Capacité réelle après formatage : 128 Go. Garantie SanDisk 5 ans.`,
        rating: 4.7,
        reviews: 678,
        stock: 85,
        tags: ['sandisk', 'clé usb', '128go', 'usb 3.0', 'rapide', 'stockage', 'portable']
      },
      {
        id: 'con-006',
        ref: 'IT-CON-006',
        name: 'Multiprise Parafoudre 6 Prises + USB',
        brand: 'Belkin',
        price: 18500,
        oldPrice: 22000,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
        description: `Multiprise Belkin BSV603vf2M avec protection parafoudre 2000 joules. 6 prises françaises + 2 ports USB-A 2,4A. Câble 2 mètres. Interrupteur lumineux marche/arrêt. Voyant indicateur parafoudre actif. Protection : surtension, parasites secteur, inversions de phases. Prise terre obligatoire. Courant max 16A / 3680W. Certification NF. Idéal : poste informatique complet, atelier électronique, studio son. Remplacement gratuit matériel jusqu'à 100 000 FCFA si dommage via parafoudre. Garantie Belkin à vie.`,
        rating: 4.6,
        reviews: 312,
        stock: 45,
        badge: 'Promo',
        tags: ['belkin', 'multiprise', 'parafoudre', 'usb', 'protection', 'bureau']
      },
      {
        id: 'con-007',
        ref: 'IT-CON-007',
        name: 'Papier A4 80g — Ramette 500 feuilles',
        brand: 'Navigator',
        price: 4500,
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600',
        description: `Ramette papier Navigator Premium A4 80g/m². 500 feuilles. Blancheur CIE 160 (blanc brillant exceptionnel). Lisse en surface (Bendtsen < 120 ml/min) : idéal laser et jet d'encre. Papier certifié FSC (gestion forestière durable) et PEFC. Fabriqué au Portugal selon normes ISO 9001. Compatible : imprimantes laser, jet d'encre, copieurs. Sens machine long : résiste à l'humidité, pas de voilage. Format exact 210×297mm. Conditionnement : rame de 500 feuilles. Achat carton 5 rames disponible. Référence standard pour bureau professionnel.`,
        rating: 4.5,
        reviews: 892,
        stock: 120,
        tags: ['papier', 'a4', '80g', 'navigator', 'impression', 'bureau', 'fsc']
      },
      {
        id: 'con-008',
        ref: 'IT-CON-008',
        name: 'Batterie Laptop HP 14/15 — 41Wh OEM',
        brand: 'HP',
        price: 22000,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
        description: `Batterie de remplacement HP originale HS04 / HQ-TRE 71004 41.04 Wh. Compatible : HP 240 G4/G5, 245 G4/G5, 246 G4/G5, 250 G4/G5, 255 G4/G5, HP 14-ac/af/an, HP 15-ac/af/ay. Tension : 14,6V. Capacité : 2670 mAh. 4 cellules Li-Ion. Certification : CE, RoHS, UN38.3. Puces de gestion batterie SMBus intégrées (compatibilité totale). Cycles de charge garantis : 300 charges (80% capacité). Installation en 3 min (aucun outil). Restaure l'autonomie du laptop à l'état neuf. Garantie 6 mois.`,
        rating: 4.4,
        reviews: 178,
        stock: 32,
        tags: ['hp', 'batterie', 'laptop', 'remplacement', '14-15', 'hs04', 'autonomie']
      },
    ]
  },

  // ─── 11. SERVEURS & NAS ────────────────────────────────────────────────────
  {
    id: 'servers',
    name: 'Serveurs & NAS',
    icon: '🗄️',
    products: [
      {
        id: 'srv-001',
        ref: 'IT-SRV-001',
        name: 'NAS Synology DS223 — 2 Baies, 8 To',
        brand: 'Synology',
        price: 345000,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
        description: `NAS Synology DiskStation DS223 à 2 baies avec 2× HDD WD Red 4 To RAID 1 inclus (8 To raw / 4 To utilisables en RAID). Processeur Realtek RTD1619B quad-core 1,7 GHz. RAM 2 Go DDR4. LAN 1GbE. USB 3.2. DiskStation Manager (DSM) 7 : interface web complète. Apps incluses : Drive (partage fichiers), Photos (galerie sécurisée), Surveillance Station (enregistrement IP), Hyper Backup (sauvegarde cloud). Chiffrement AES-256. Idéal PME, cabinet médical, association. Garantie Synology 2 ans + disques 3 ans.`,
        rating: 4.9,
        reviews: 87,
        stock: 7,
        badge: 'Bestseller',
        tags: ['synology', 'nas', '2 baies', 'raid', 'sauvegarde', 'partage', 'pme']
      },
      {
        id: 'srv-002',
        ref: 'IT-SRV-002',
        name: 'Dell PowerEdge T150 — Serveur Tour PME',
        brand: 'Dell',
        price: 895000,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
        description: `Serveur tour Dell PowerEdge T150 entrée de gamme entreprise. Processeur Intel Xeon E-2314 (4 cœurs/4T, 4,5 GHz). 16 Go ECC DDR4 3200 MHz. 2× SSD SATA 480 Go RAID 1 (iDRAC). 4 baies 3,5" SATA (extensible 32 To). iDRAC9 gestion à distance. Alimentation 300W redondante option. Certifié Windows Server 2022, VMware ESXi, Red Hat. Idéal : domaine Active Directory, serveur de fichiers, ERP, comptabilité centralisée, virtualisation légère. Support Dell ProSupport disponible. Garantie Dell 3 ans ProSupport.`,
        rating: 4.8,
        reviews: 29,
        stock: 4,
        badge: 'Stock limité',
        tags: ['dell', 'serveur', 'poweredge', 'xeon', 'active directory', 'virtualisation', 'pme']
      },
      {
        id: 'srv-003',
        ref: 'IT-SRV-003',
        name: 'NAS QNAP TS-453E — 4 Baies, 2.5GbE',
        brand: 'QNAP',
        price: 445000,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
        description: `NAS QNAP TS-453E 4 baies avec Intel Celeron J6412 (4 cœurs, 2,6 GHz), 8 Go DDR4. Double LAN 2,5GbE (agrégation de liens). Débit réseau jusqu'à 5 Gbps. 2× USB 3.2 Gen2 + HDMI 2.0. QTS 5 : OS puissant avec virtualisation (VMs légères), conteneurs Docker/LXC. SMB 3.0 multichannel, AFP, NFS. Apps : Plex Media Server 4K transcode, Surveillance Station 2 caméras, Download Station. Compatible Windows AD, LDAP. Idéal : backup sécurisé multi-sites, streaming 4K, hébergement applicatif. Garantie QNAP 2 ans.`,
        rating: 4.7,
        reviews: 41,
        stock: 6,
        tags: ['qnap', 'nas', '4 baies', '2.5gbe', 'docker', 'plex', 'virtualisation']
      },
    ]
  },

  // ─── 12. MOBILIER & ERGONOMIE ──────────────────────────────────────────────
  {
    id: 'furniture',
    name: 'Mobilier & Ergonomie',
    icon: '🪑',
    products: [
      {
        id: 'fur-001',
        ref: 'IT-FUR-001',
        name: 'Chaise Ergonomique Adjustable — Lombaire',
        brand: 'Ergohuman',
        price: 185000,
        oldPrice: 215000,
        image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=600',
        description: `Chaise de bureau ergonomique Ergohuman Basic avec maille respirante. Réglages : hauteur assise 42-52cm, profondeur assise, hauteur accoudoirs 4D (haut/bas/avant/arrière/rotation), inclinaison dossier avec tension réglable. Support lombaire intégré et ajustable. Maille de dossier Syncro-tilt pour suivi naturel du dos. Poids max utilisateur 120 kg. Piétement étoile aluminium 5 branches. Roulettes double-galets parquet/moquette. Certifié ANSI/BIFMA X5.1. Idéal : travail bureau intensif 8h+. Prévient TMS. Garantie 5 ans structure.`,
        rating: 4.8,
        reviews: 134,
        stock: 9,
        badge: 'Bestseller',
        tags: ['chaise', 'ergonomique', 'bureau', 'lombaire', 'maille', 'santé', 'tms']
      },
      {
        id: 'fur-002',
        ref: 'IT-FUR-002',
        name: 'Bureau Assis-Debout Électrique — 160cm',
        brand: 'FlexiSpot',
        price: 295000,
        image: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=600',
        description: `Bureau assis-debout électrique FlexiSpot E7 plateau 160×80cm. 2 moteurs silencieux (<50 dB). Plage hauteur : 58-123 cm. Vitesse réglage : 38 mm/s. Charge max 125 kg. Panneau de contrôle LED avec 4 positions mémorisables. Anti-collision (s'arrête si obstacle). Pied cadre acier robuste. Plateau MDF couleur chêne/blanc/noir. Câble management intégré. Alternance assis/debout : réduit -54% risques cardiovasculaires, -32% fatigue. Assemblage livré avec notice illustrée. Garantie FlexiSpot 5 ans moteur + 5 ans structure.`,
        rating: 4.8,
        reviews: 67,
        stock: 5,
        badge: 'Nouveau',
        tags: ['bureau', 'assis-debout', 'électrique', 'ergonomie', 'santé', 'flexispot']
      },
      {
        id: 'fur-003',
        ref: 'IT-FUR-003',
        name: 'Support Écran Bras Articulé Double',
        brand: 'Ergotron',
        price: 78000,
        image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600',
        description: `Bras articulé double écran Ergotron LX Dual Stacking Arm. Supporte 2 écrans jusqu'à 11,3 kg chacun (max 27"). Réglages : hauteur ±28cm, profondeur ±33cm, rotation 360°, inclinaison ±90°, pivotement portrait/paysage. VESA 75×75/100×100. Mécanisme Constant Force™ : repositionnement sans outil avec une main. Gestion câbles intégrée. Montage bureau pince C ou tige traversante (fournis). Libère 100% de l'espace bureau. Améliore posture cervicale. Idéal : dual screen, trading, développement, graphisme. Garantie Ergotron 10 ans.`,
        rating: 4.9,
        reviews: 89,
        stock: 12,
        tags: ['ergotron', 'bras écran', 'double', 'vesa', 'bureau', 'posture']
      },
      {
        id: 'fur-004',
        ref: 'IT-FUR-004',
        name: 'Sac à Dos Laptop 17" — USB, Antivol',
        brand: 'Targus',
        price: 35000,
        oldPrice: 42000,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
        description: `Sac à dos professionnel Targus CityLite Pro 15,6-17,3". Compartiment laptop amorti. Poche cachée antivol au dos (contre le corps). Porte USB externe rechargeable connecté à power bank interne. Matière imperméable ballistic nylon 1200D. Bretelles ergonomiques air-mesh rembourrées. Poche frontale organiseur complète (docs, câbles, téléphone). Compatible trolley (glisse sur poignée valise). Volume 25L. Fermeture zips YKK. Poids 0,9 kg. Noir. Convient déplacements professionnels. Garantie Targus 2 ans.`,
        rating: 4.6,
        reviews: 178,
        stock: 22,
        badge: 'Promo',
        tags: ['targus', 'sac à dos', 'laptop', 'antivol', 'usb', 'professionnel', 'voyage']
      },
    ]
  },

  // ─── 13. LOGICIELS & LICENCES ──────────────────────────────────────────────
  {
    id: 'software',
    name: 'Logiciels & Licences',
    icon: '📦',
    products: [
      {
        id: 'soft-001',
        ref: 'IT-SOF-001',
        name: 'Microsoft Office 2021 Pro — Licence Vie',
        brand: 'Microsoft',
        price: 85000,
        image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=600',
        description: `Licence Microsoft Office Professionnel 2021 (achat unique, perpétuelle). Inclut : Word, Excel, PowerPoint, Outlook, Access, Publisher, Teams. Compatible Windows 11/10 (64 bits). Licence 1 PC définitive — pas d'abonnement mensuel. Mise à jour de sécurité incluses à vie. Excel 2021 : nouvelles fonctions XLOOKUP, dynamic arrays, LET. PowerPoint : collaboration temps réel. Outlook : nouveau calendrier, recherche intelligente. Activation en ligne immédiate par clé produit. Idéal PME, professions libérales, particuliers. Livraison clé digitale par email sous 2h.`,
        rating: 4.9,
        reviews: 312,
        stock: 50,
        badge: 'Bestseller',
        tags: ['microsoft', 'office', 'excel', 'word', 'licence', 'perpétuelle', 'logiciel']
      },
      {
        id: 'soft-002',
        ref: 'IT-SOF-002',
        name: 'Windows 11 Pro — Licence OEM 64 bits',
        brand: 'Microsoft',
        price: 55000,
        image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=600',
        description: `Licence OEM Windows 11 Professionnel 64 bits. Fonctions Pro exclusives : BitLocker (chiffrement disque), Windows Sandbox, Hyper-V virtualisation, Remote Desktop, Group Policy, Azure AD Join, Autopilot. Compatible processeurs Intel 8e génération+, AMD Ryzen 2000+. Secure Boot + TPM 2.0 requis. Mise à jour Windows 12 incluse. Active Directory, domaine entreprise. Installation propre via Media Creation Tool. Support Microsoft 10 ans. Idéal mise à niveau Home→Pro, installation neuve PC professionnel. Livraison clé digitale sous 2h. Support Imani-Tech installation disponible.`,
        rating: 4.8,
        reviews: 234,
        stock: 45,
        tags: ['microsoft', 'windows 11', 'pro', 'licence', 'bitlocker', 'hyper-v', 'oem']
      },
      {
        id: 'soft-003',
        ref: 'IT-SOF-003',
        name: 'Kaspersky Internet Security — 3 PC 1 an',
        brand: 'Kaspersky',
        price: 28000,
        oldPrice: 35000,
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600',
        description: `Kaspersky Internet Security 2024 pour 3 appareils, 1 an. Protection multicouches : antivirus temps réel, anti-ransomware, anti-phishing, pare-feu intelligent, VPN sécurisé 300Mo/jour. Score AV-TEST Perfect : 100% détection malwares. Protection banque en ligne (mode Coffre-fort). Contrôle parental intégré. Compatible Windows, Mac, Android. Mise à jour bases de données automatiques (toutes les heures). Anti-spam email intégré. Idéal famille ou petite entreprise 3 postes. Performance impact <1% CPU (testé SPECrate). Garantie satisfait ou remboursé 30 jours.`,
        rating: 4.7,
        reviews: 189,
        stock: 35,
        badge: 'Promo',
        tags: ['kaspersky', 'antivirus', 'sécurité', '3 pc', 'ransomware', 'vpn', 'famille']
      },
      {
        id: 'soft-004',
        ref: 'IT-SOF-004',
        name: 'AutoCAD LT 2025 — Licence Annuelle',
        brand: 'Autodesk',
        price: 285000,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
        description: `AutoCAD LT 2025 licence annuelle. Dessin 2D professionnel : plans architecturaux, mécaniques, électriques. Nouveautés 2025 : Assistant IA Autodesk (génère des calques, corrige erreurs), Trace (annotation collaborative), Count (comptage automatique objets). Format natif DWG compatible AutoCAD Full. Cloud Autodesk Drive 100 Go inclus. Application mobile AutoCAD incluse (iOS/Android). Accès depuis 3 appareils. Support Autodesk Académie e-learning inclus. Idéal architectes, ingénieurs, dessinateurs, techniciens BTP. Facture officielle Autodesk fournie.`,
        rating: 4.8,
        reviews: 56,
        stock: 15,
        tags: ['autodesk', 'autocad', 'dessin', 'architecture', 'ingénierie', '2d', 'plan']
      },
      {
        id: 'soft-005',
        ref: 'IT-SOF-005',
        name: 'Sage 100 Comptabilité — PME Cameroun',
        brand: 'Sage',
        price: 185000,
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600',
        description: `Sage 100 Comptabilité monoposte adapté contexte camerounais (TVA, OH, centimes). Module complet : journal général, grand livre, balance, bilan, P&L. Export DGI Cameroun (déclarations fiscales OHADA). Gestion multi-exercices, multi-devises (FCFA, EUR, USD). Interface intuitive française. Connexion possible Sage 100 Gestion Commerciale et Paie. Formation initiale 2 jours incluse. Support Imani-Tech certification Sage. Mises à jour réglementaires incluses 1 an. Compatible Windows 10/11 64 bits. Idéal : PME, ONG, associations, cabinets comptables.`,
        rating: 4.9,
        reviews: 78,
        stock: 10,
        badge: 'Nouveau',
        tags: ['sage', 'comptabilité', 'pme', 'ohada', 'fiscalité', 'cameroun', 'logiciel']
      },
    ]
  },

  // ─── 14. PROJECTEURS & AUDIO-VISUEL ───────────────────────────────────────
  {
    id: 'av',
    name: 'Projecteurs & AV',
    icon: '📽️',
    products: [
      {
        id: 'av-001',
        ref: 'IT-AV-001',
        name: 'BenQ MH560 — Projecteur 3800 Lumens FHD',
        brand: 'BenQ',
        price: 285000,
        image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600',
        description: `Vidéoprojecteur BenQ MH560 3800 lumens réels Full HD (1920×1080). Contraste 20 000:1. Lampe 6000h économie (10 000h max). Distance projection 1m = image 40", 3m = image 120". Zoom optique 1,3×. Correction trapèze auto. HDMI×2, USB-A, VGA, audio. Haut-parleur 10W. Mode présentation, cinéma, sport, sRGB. Compatible Google Dongle, Apple TV, Chromecast. Idéal salle de conférence, amphithéâtre, enseignement. Luminosité parfaite pour pièce éclairée. Connectique complète pour ordinateur portable. Garantie BenQ 3 ans lampe incluse.`,
        rating: 4.8,
        reviews: 89,
        stock: 8,
        badge: 'Bestseller',
        tags: ['benq', 'projecteur', 'full hd', '3800 lumens', 'conférence', 'salle', 'présentation']
      },
      {
        id: 'av-002',
        ref: 'IT-AV-002',
        name: 'Écran Projection 120" — Motorisé',
        brand: 'Elite Screens',
        price: 125000,
        image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600',
        description: `Écran de projection motorisé Elite Screens Spectrum 120" 16:9 (266×149 cm). Toile MaxWhite FG : gain 1,1, vision 160°. Moteur silencieux ultra-silencieux (<35 dB). Télécommande IR + bouton mural RJ-45. Boîtier acier galvanisé blanc. Câblage standard 220V, relais 12V optionnel (déclenché par vidéoprojecteur). Bordure noire velours 5cm (masquage). Enroulement automatique. Installation murale ou plafond. Durée vie toile 50 000 cycles. Idéal salle conférence, cinéma maison, amphithéâtre. Garantie Elite Screens 3 ans.`,
        rating: 4.7,
        reviews: 52,
        stock: 6,
        tags: ['elite screens', 'écran projection', '120 pouces', 'motorisé', 'salle', 'cinéma']
      },
      {
        id: 'av-003',
        ref: 'IT-AV-003',
        name: 'Sonos One SL — Enceinte WiFi Stéréo',
        brand: 'Sonos',
        price: 145000,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600',
        description: `Enceinte connectée Sonos One SL. Double woofer + tweeter. Puissance amplifiée 2× 15W = son riche sans distorsion. Wi-Fi et Ethernet. AirPlay 2 (Apple) + Sonos app. Stereo Pair : 2× One SL = vraie stéréo home studio. Compatible Surround Sonos Arc/Beam. Contrôle : app iOS/Android, Alexa (avec Sonos One), touch. Streaming : Spotify, Apple Music, Deezer, YouTube Music, radio TuneIn. Finition noire/blanche. Idéal : bureau premium, salon, bibliothèque, salle réunion, arrière-fond commercial. Garantie Sonos 1 an.`,
        rating: 4.8,
        reviews: 67,
        stock: 9,
        tags: ['sonos', 'enceinte', 'wifi', 'airplay', 'spotify', 'stéréo', 'premium']
      },
      {
        id: 'av-004',
        ref: 'IT-AV-004',
        name: 'Micro-Cravate Rode Wireless GO II',
        brand: 'Rode',
        price: 185000,
        image: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=600',
        description: `Système microphone sans fil Rode Wireless GO II. 2 émetteurs + 1 récepteur compacts. Fréquence 2,4 GHz FHSS : portée 200m (ligne de mire). Enregistrement sur mémoire interne 24h. Dynamic Range Mode : protège contre les pics imprévisibles. Sortie USB-C + 3,5mm TRS. Encodage audio 24 bits 48 kHz. Latence ultra-faible 3,5ms. Compatible : caméra DSLR, iPhone, Android, PC. Batterie : 7h par émetteur. Idéal : youtubeurs, journalistes, formateurs, présentateurs, vidéastes terrain. Garantie Rode 2 ans.`,
        rating: 4.9,
        reviews: 43,
        stock: 7,
        badge: 'Nouveau',
        tags: ['rode', 'micro', 'sans fil', 'cravate', 'youtube', 'vidéo', 'journaliste']
      },
      {
        id: 'av-005',
        ref: 'IT-AV-005',
        name: 'Tableau Blanc Interactif 75" — 4K',
        brand: 'Samsung',
        price: 1850000,
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600',
        description: `Tableau blanc interactif Samsung Flip Pro 75" 4K UHD (3840×2160). Dalle LCD IPS tactile 20 points simultanés, stylet magnétique. Résolution écriture 4096 niveaux pression. Logiciel Note intégré : partage Wi-Fi, export PDF/PNG instantané, annotation sur présentation. Connexion : HDMI×3, USB-C 65W, USB-A×3, LAN. Mode présentation : diffuse écran sur téléphones participants via code QR. Microsoft Teams Rooms certifié. Android 12 intégré. Idéal : salle de direction, école premium, formation, agence créative. Garantie Samsung 3 ans.`,
        rating: 4.8,
        reviews: 18,
        stock: 2,
        badge: 'Stock limité',
        tags: ['samsung', 'tableau interactif', '75 pouces', '4k', 'salle réunion', 'teams', 'école']
      },
    ]
  },

  // ─── 15. FORMATION & SERVICES ──────────────────────────────────────────────
  {
    id: 'services',
    name: 'Services Imani-Tech',
    icon: '🛠️',
    products: [
      {
        id: 'svc-001',
        ref: 'IT-SVC-001',
        name: 'Formation Excel Avancé — 2 Jours',
        brand: 'Imani-Tech',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600',
        description: `Formation Excel Avancé certifiée Imani-Tech. Durée : 2 jours (14 heures). Prérequis : Excel niveau intermédiaire. Programme : Fonctions avancées (INDEX/MATCH, XLOOKUP, array functions), Tableaux croisés dynamiques Pro, Power Query (transformation données automatique), VBA macros de base, Dashboards et visualisation, Consolidation multi-classeurs. Supports de cours professionnels remis. Attestation de formation officielle. Groupes max 10 personnes. Salle Imani-Tech Yaoundé ou en entreprise (+frais déplacement). Ordinateur fourni. Formateurs certifiés Microsoft. Éligible financement FNE.`,
        rating: 4.9,
        reviews: 134,
        stock: 20,
        badge: 'Bestseller',
        tags: ['formation', 'excel', 'avancé', 'vba', 'power query', 'microsoft', 'yaoundé']
      },
      {
        id: 'svc-002',
        ref: 'IT-SVC-002',
        name: 'Installation Réseau PME — Clé en Main',
        brand: 'Imani-Tech',
        price: 150000,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
        description: `Service installation réseau informatique PME clé en main par Imani-Tech. Inclut : audit des besoins, plan de câblage, installation switch + routeur + points d'accès WiFi, configuration VLANs (ségrégation visiteurs/employés/serveurs), mise en place partage de fichiers sécurisé, configuration pare-feu de base, formation administrateur interne (1 jour), documentation réseau complète. Garantie intervention : travaux repris gratuitement 3 mois si problème. Pour : surfaces 200m² max, jusqu'à 30 postes. Devis personnalisé sur demande. Techniciens certifiés Cisco/TP-Link.`,
        rating: 4.9,
        reviews: 67,
        stock: 10,
        tags: ['installation réseau', 'pme', 'wifi', 'câblage', 'imani-tech', 'service', 'clé en main']
      },
      {
        id: 'svc-003',
        ref: 'IT-SVC-003',
        name: 'Maintenance Informatique — Contrat Annuel',
        brand: 'Imani-Tech',
        price: 120000,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600',
        description: `Contrat de maintenance informatique annuel Imani-Tech pour PME jusqu'à 10 postes. Inclut : 4 visites préventives/an (nettoyage, mises à jour, sauvegardes), assistance téléphonique illimitée 6j/7 8h-18h, dépannage sur site sous 24h (jours ouvrés), rapport mensuel état du parc, gestion antivirus et licences, service récupération données d'urgence (1 intervention/an). Économie estimée vs réparations ponctuelles : 300 000 FCFA/an. Rapport ROI positif dès le 3e incident. Renouvellement automatique avec réduction 10%. Tarif par tranche de postes supplémentaires disponible.`,
        rating: 4.8,
        reviews: 89,
        stock: 15,
        badge: 'Nouveau',
        tags: ['maintenance', 'contrat', 'annuel', 'pme', 'support', 'informatique', 'imani-tech']
      },
      {
        id: 'svc-004',
        ref: 'IT-SVC-004',
        name: 'Audit Cybersécurité PME — Rapport Complet',
        brand: 'Imani-Tech',
        price: 85000,
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600',
        description: `Audit cybersécurité PME par les experts Imani-Tech. Périmètre : réseau local, postes de travail, serveurs, mots de passe, accès distants, sauvegardes, sensibilisation employés. Méthodologie OWASP + ANSSI adaptée contexte camerounais. Livrable : rapport PDF détaillé avec score de risque par domaine, liste vulnérabilités classées par criticité, plan de remédiation priorisé 90 jours. Présentation orale direction incluse. Durée audit terrain : 1 journée. Délai remise rapport : 5 jours ouvrés. Discrétion et confidentialité contractuelle. Idéal avant audit ISO 27001.`,
        rating: 4.9,
        reviews: 34,
        stock: 8,
        tags: ['audit', 'cybersécurité', 'pme', 'sécurité', 'rapport', 'imani-tech', 'risque']
      },
    ]
  }
];
