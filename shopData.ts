// ─── SHOP DATA ───────────────────────────────────────────────────────────────
// 30 catégories × 15 produits = 450 produits
// Images via Unsplash Source API (gratuit, pas de clé requise)

export interface ShopProduct {
  id: string;
  name: string;
  ref: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: 'Nouveau' | 'Promo' | 'Bestseller' | 'Stock limité';
  rating: number;
  reviews: number;
  stock: number;
  brand: string;
  tags: string[];
}

export interface ShopCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
  products: ShopProduct[];
}

const img = (keyword: string, w = 400, h = 400) =>
  `https://picsum.photos/seed/${encodeURIComponent(keyword)}/${w}/${h}`;

// Helper pour générer des produits rapidement
const mkp = (
  id: string, name: string, ref: string, desc: string,
  price: number, brand: string, tags: string[],
  imgKey: string, badge?: ShopProduct['badge'], oldPrice?: number,
  rating = 4.5, reviews = Math.floor(Math.random() * 200 + 20),
  stock = Math.floor(Math.random() * 50 + 5)
): ShopProduct => ({
  id, name, ref, description: desc, price, oldPrice, brand, tags,
  image: img(imgKey), badge, rating, reviews, stock,
});

export const SHOP_CATEGORIES: ShopCategory[] = [
  // ── 1. Routeurs & Box ──────────────────────────────────────────────────────
  {
    id: 'routeurs',
    name: 'Routeurs & Box',
    icon: '📡',
    description: 'Routeurs Wi-Fi professionnels et grand public',
    image: img('router-network'),
    products: [
      mkp('r1','Routeur Wi-Fi 6 AX3000','RT-AX3000','Routeur double bande Wi-Fi 6, couverture 200m², 4 ports Gigabit',185000,'ASUS',['wifi6','réseau'],'asus-router','Bestseller'),
      mkp('r2','Box 4G LTE Pro','B4G-PRO','Box Internet 4G avec SIM, idéal zones sans ADSL, 150Mbps',95000,'Huawei',['4g','lte'],'huawei-4g'),
      mkp('r3','Routeur Mesh Wi-Fi 6E','MESH-6E','Système mesh 3 unités, couvre 600m², Wi-Fi 6E tri-bande',320000,'TP-Link',['mesh','wifi6e'],'mesh-wifi','Nouveau'),
      mkp('r4','Routeur ADSL2+ N300','ADSL-N300','Modem routeur ADSL2+, Wi-Fi N300, 4 ports FE',45000,'D-Link',['adsl','wifi'],'dlink-router'),
      mkp('r5','Routeur VPN Gigabit','VPN-GIG','Routeur VPN professionnel, 5 ports Gigabit, IPSec/PPTP',120000,'Cisco',['vpn','professionnel'],'cisco-router'),
      mkp('r6','Routeur 5G Enterprise','5G-ENT','Routeur 5G NR Sub-6GHz, débit jusqu\'à 3.6Gbps',450000,'Huawei',['5g','enterprise'],'5g-router','Nouveau'),
      mkp('r7','Point d\'Accès Wi-Fi 6','AP-AX1800','AP plafond Wi-Fi 6, PoE, gestion centralisée',95000,'Ubiquiti',['ap','poe'],'access-point'),
      mkp('r8','Routeur Dual-WAN Pro','DW-PRO','Load balancing, failover automatique, 2 WAN Gigabit',165000,'MikroTik',['dual-wan','pro'],'mikrotik'),
      mkp('r9','Box Wi-Fi Fibre GPON','GPON-BOX','ONT GPON avec Wi-Fi AC1200, 4 ports Gigabit',75000,'ZTE',['fibre','gpon'],'zte-fiber'),
      mkp('r10','Routeur Gaming Wi-Fi 6','GT-AX11000','Routeur gaming tri-bande, QoS gaming, 8 antennes',280000,'ASUS',['gaming','wifi6'],'gaming-router'),
      mkp('r11','Répéteur Wi-Fi AC1200','RE-AC1200','Répéteur Wi-Fi double bande, port Ethernet, plug & play',25000,'TP-Link',['répéteur','wifi'],'repeater',undefined,35000),
      mkp('r12','Routeur SOHO 4G','SOHO-4G','Routeur pour PME, 4G LTE + Wi-Fi AC1200, 32 users',85000,'ZTE',['soho','pme'],'soho-router'),
      mkp('r13','Switch-Router L3','L3-SW','Routeur-switch L3 manageable, 8 ports SFP, RIP/OSPF',210000,'MikroTik',['l3','switch'],'l3-switch'),
      mkp('r14','Routeur Portable 4G','PORT-4G','Mi-Fi 4G portable, batterie 3000mAh, 10 appareils',35000,'Huawei',['portable','4g'],'mifi',undefined,45000),
      mkp('r15','Routeur Wi-Fi 7 Pro','AXE16000','Premier routeur Wi-Fi 7, 16Gbps, tri-bande, USB 3.0',580000,'ASUS',['wifi7','ultra'],'wifi7-router','Nouveau'),
    ],
  },

  // ── 2. Switches Réseau ─────────────────────────────────────────────────────
  {
    id: 'switches',
    name: 'Switches Réseau',
    icon: '🔌',
    description: 'Switches manageable et non-manageable pour entreprises',
    image: img('network-switch'),
    products: [
      mkp('sw1','Switch 8 Ports Gigabit','SW-8G','Switch non manageable 8 ports Gigabit, plug & play',18000,'TP-Link',['switch','gigabit'],'switch-8port'),
      mkp('sw2','Switch PoE+ 8 Ports','SW-POE8','Switch PoE+ 8 ports Gigabit, budget 65W, idéal IP cam',45000,'Netgear',['poe','gigabit'],'poe-switch','Bestseller'),
      mkp('sw3','Switch Manageable 24 Ports','SW-MNG24','Switch L2 manageable, 24 ports GE + 4 SFP, VLAN',185000,'Cisco',['manageable','vlan'],'cisco-switch'),
      mkp('sw4','Switch PoE+ 24 Ports','SW-POE24','24 ports PoE+ Gigabit, budget 370W, rack 19"',220000,'TP-Link',['poe24','rack'],'poe-switch-24','Bestseller'),
      mkp('sw5','Switch Core 48 Ports','SW-48G','Switch backbone 48 ports GE + 4 SFP+, L3',420000,'Huawei',['core','l3'],'core-switch'),
      mkp('sw6','Switch SFP+ 10G','SW-10G','Switch 10 Gigabit, 8 ports SFP+, faible latence',350000,'MikroTik',['10g','sfp'],'sfp-switch'),
      mkp('sw7','Switch Industriel DIN','SW-IND','Switch industriel -40°/+75°C, montage rail DIN',125000,'Moxa',['industriel','robuste'],'industrial-switch'),
      mkp('sw8','Switch Desktop 5 Ports','SW-5G','Switch bureau 5 ports Gigabit, compact et silencieux',12000,'D-Link',['desktop','compact'],'desktop-switch'),
      mkp('sw9','Switch PoE 48V Passif','SW-48V','Switch PoE passif 48V, 4 ports, pour équip. Ubiquiti',22000,'MikroTik',['poe-passif'],'passive-poe'),
      mkp('sw10','Switch Manageable L3 48P','SW-L3-48','L3 48 ports Gigabit, routage statique, OSPF',520000,'Cisco',['l3','ospf'],'l3-cisco'),
      mkp('sw11','Switch Fibre Optique','SW-FO','Switch avec 2 ports SFP fibre + 8 GE cuivre',85000,'TP-Link',['fibre','sfp'],'fiber-switch'),
      mkp('sw12','Switch Wi-Fi Contrôleur','SW-WLC','Switch avec contrôleur Wi-Fi intégré, 8 AP gérés',145000,'Ubiquiti',['controleur','wifi'],'wifi-controller'),
      mkp('sw13','Switch PoE++ 90W','SW-POE90','PoE++ 802.3bt, 8 ports 90W/port, pour PTZ cam',180000,'Netgear',['poe-plus','90w'],'poe90-switch'),
      mkp('sw14','Switch KVM 8 Ports','KVM-8','KVM switch 8 ports, HDMI + USB, sans câble',55000,'ATEN',['kvm','hdmi'],'kvm-switch'),
      mkp('sw15','Switch Empilable 24P','SW-STACK','Switch empilable 24 ports, stack 10G, haute dispo',380000,'HP',['empilable','ha'],'stackable-switch'),
    ],
  },

  // ── 3. Câblage & Connectique ───────────────────────────────────────────────
  {
    id: 'cablage',
    name: 'Câblage & Connectique',
    icon: '🔗',
    description: 'Câbles réseau, connecteurs RJ45, goulottes et accessoires',
    image: img('ethernet-cable'),
    products: [
      mkp('c1','Câble RJ45 Cat6 305m','CAT6-305','Bobine 305m câble UTP Cat6, 250MHz, pull box incluse',35000,'Nexans',['cat6','bobine'],'cat6-cable','Bestseller'),
      mkp('c2','Câble RJ45 Cat6A 305m','CAT6A-305','Bobine 305m câble F/UTP Cat6A, 500MHz, blindé',65000,'Draka',['cat6a','blindé'],'cat6a-cable'),
      mkp('c3','Patch Cord Cat6 2m (x10)','PATCH-2M','Lot 10 cordons RJ45 Cat6 2m, couleurs assorties',15000,'TP-Link',['patch','lot'],'patch-cable'),
      mkp('c4','Câble Fibre Monomode 100m','FO-SM-100','Câble fibre optique monomode OS2 duplex 100m, SC/SC',45000,'Generic',['fibre','monomode'],'fiber-cable'),
      mkp('c5','Connecteurs RJ45 Cat6 (x100)','RJ45-100','Boîte 100 connecteurs RJ45 Cat6, blindés',8500,'Keystone',['rj45','connecteur'],'rj45-connectors'),
      mkp('c6','Pince à Sertir RJ45 Pro','CRIMP-PRO','Pince à sertir RJ45/RJ11 professionnelle avec testeur',22000,'Klein',['pince','outil'],'crimping-tool'),
      mkp('c7','Goulotte PVC 40×25 (x5)','GOUL-40','Lot 5 goulottes PVC 40×25mm, 2m, blanc',12000,'Legrand',['goulotte','installation'],'cable-duct'),
      mkp('c8','Panneau de Brassage 24 Ports','PATCH-PNL','Patch panel Cat6 24 ports, 1U rack 19", avec numérotation',28000,'Panduit',['patch-panel','rack'],'patch-panel'),
      mkp('c9','Testeur de Câble Réseau','NET-TEST','Testeur RJ45/RJ11, détection court-circuit, map complet',18000,'Fluke',['testeur','diagnostic'],'cable-tester'),
      mkp('c10','Câble HDMI 2.1 5m','HDMI-5M','Câble HDMI 2.1 ultra haute vitesse, 8K@60Hz, 5 mètres',15000,'Belkin',['hdmi','4k'],'hdmi-cable'),
      mkp('c11','Câble USB-C vers USB-A 2m (x5)','USBC-2M','Lot 5 câbles USB-C charge rapide 60W, données 5Gbps',12000,'Anker',['usb-c','charge'],'usb-cable'),
      mkp('c12','Organisateur de Câbles 1U','CABLE-ORG','Organisateur câbles horizontal 1U rack, 10 anneaux',8000,'Generic',['organisation','rack'],'cable-organizer'),
      mkp('c13','Câble Coaxial RG6 100m','RG6-100','Bobine coaxial RG6 100m, quad-shield, pour TNT/satellite',22000,'Belden',['coaxial','antenne'],'coax-cable'),
      mkp('c14','Multiplexeur HDMI 4 en 1','HDMI-4X1','Switch HDMI 4 entrées 1 sortie, 4K@60Hz, télécommande',25000,'UGREEN',['hdmi','switch'],'hdmi-switch'),
      mkp('c15','Kit Fixation Câbles (x200)','COLSON-KIT','Kit 200 colliers de serrage + 100 attaches murales',5000,'Generic',['fixation','installation'],'cable-ties'),
    ],
  },

  // ── 4. Caméras de Surveillance ─────────────────────────────────────────────
  {
    id: 'cameras',
    name: 'Caméras de Surveillance',
    icon: '📷',
    description: 'Caméras IP intérieur/extérieur, dômes et bullet',
    image: img('security-camera'),
    products: [
      mkp('cam1','Caméra IP 4K PoE Bullet','CAM-4K-B','4K 8MP extérieure, IR 50m, IP67, détection IA',95000,'Hikvision',['4k','poe','extérieur'],'bullet-camera','Bestseller'),
      mkp('cam2','Caméra Dôme 4MP','CAM-D4','Dôme intérieur 4MP, IR 30m, grand angle 105°',55000,'Dahua',['dome','intérieur'],'dome-camera'),
      mkp('cam3','Caméra PTZ 4K 20x','CAM-PTZ','PTZ 4K, zoom optique 20x, suivi automatique IA',280000,'Hikvision',['ptz','zoom'],'ptz-camera','Nouveau'),
      mkp('cam4','Caméra Fisheye 360°','CAM-360','Fisheye 12MP 360°, déwarping en temps réel, PoE',125000,'Axis',['360','fisheye'],'fisheye-camera'),
      mkp('cam5','Caméra Wi-Fi 2K Solaire','CAM-SOL','Caméra solaire 2K, batterie 10000mAh, Wi-Fi',65000,'Reolink',['solaire','wifi'],'solar-camera','Nouveau'),
      mkp('cam6','Caméra Thermique','CAM-THERM','Caméra bi-spectre thermique+visible, détection temp.',380000,'FLIR',['thermique','industriel'],'thermal-camera'),
      mkp('cam7','Caméra ANPR Plaque','CAM-ANPR','Caméra lecture plaques immatriculation, 4K, IR 60m',220000,'Hikvision',['anpr','plaque'],'anpr-camera'),
      mkp('cam8','Mini Caméra Cachée 1080p','CAM-MINI','Mini caméra 1080p, détection mouvement, stockage SD',28000,'Generic',['mini','discrète'],'mini-camera'),
      mkp('cam9','Caméra Anti-Explosion','CAM-ATEX','Caméra ATEX zone explosible, IP68, inox',450000,'Axis',['atex','industriel'],'explosion-proof'),
      mkp('cam10','Caméra Multidirectionnelle','CAM-MULTI','4 capteurs 2MP indépendants, vue 180° panoramique',185000,'Vivotek',['multi','panoramique'],'multidirectional'),
      mkp('cam11','Caméra Réseau Cube 2MP','CAM-CUBE','Cube IP 2MP, Wi-Fi, deux voies audio, SD 256Go',35000,'Hikvision',['cube','audio'],'cube-camera'),
      mkp('cam12','Caméra Comptage Personnes','CAM-COUNT','Compteur birectionnaire AI, statistiques en temps réel',165000,'Axis',['comptage','analyse'],'counting-camera'),
      mkp('cam13','Caméra Sous-Marine IP68','CAM-UNDER','Caméra marine IP68, 10m profondeur, 1080p',95000,'Mobotix',['marine','ip68'],'underwater-camera'),
      mkp('cam14','Caméra Réseau Audio','CAM-AUDIO','Caméra 4MP + micro + haut-parleur intégrés, sirène',75000,'Dahua',['audio','sirène'],'audio-camera'),
      mkp('cam15','Kit Caméra 4 × 5MP','KIT-4CAM','Kit 4 caméras 5MP + NVR 8 voies + HDD 2To',285000,'Hikvision',['kit','nvr'],'camera-kit','Bestseller'),
    ],
  },

  // ── 5. Enregistreurs NVR/DVR ───────────────────────────────────────────────
  {
    id: 'nvr-dvr',
    name: 'Enregistreurs NVR/DVR',
    icon: '🖥️',
    description: 'Enregistreurs réseau et analogiques pour vidéosurveillance',
    image: img('nvr-recorder'),
    products: [
      mkp('n1','NVR 8 Voies 4K','NVR-8-4K','8 canaux IP 4K, HDD 4To incl., interface tactile, app mobile',185000,'Hikvision',['nvr','4k'],'nvr-8ch','Bestseller'),
      mkp('n2','NVR 16 Voies PoE','NVR-16-POE','16 canaux PoE intégrés, 4K, HDD 6To, RAID',310000,'Dahua',['nvr','poe','16ch'],'nvr-16ch'),
      mkp('n3','NVR 32 Voies Pro','NVR-32','32 canaux IP, 2 baies HDD, jusqu\'à 16To, HDMI 4K',480000,'Hikvision',['nvr','32ch'],'nvr-32ch'),
      mkp('n4','DVR Hybride 8 Voies','DVR-H8','DVR hybride analogique+IP, 8 voies 5MP, HDD 2To',95000,'Dahua',['dvr','hybride'],'dvr-8ch'),
      mkp('n5','DVR 16 Voies 5MP','DVR-16','DVR 16 voies 5MP Lite, 2 HDD, sortie HDMI',145000,'Hikvision',['dvr','16ch'],'dvr-16ch'),
      mkp('n6','Mini NVR 4 Voies','NVR-MINI4','Mini NVR 4 canaux 4K, sans ventilateur, ultra compact',65000,'Reolink',['mini','4ch'],'mini-nvr'),
      mkp('n7','NVR AI 16 Voies','NVR-AI16','16 canaux IA, détection visage/plaque, HDD 8To',420000,'Dahua',['nvr','ia','16ch'],'ai-nvr','Nouveau'),
      mkp('n8','Serveur Video Management','VMS-SVR','Serveur VMS 64 canaux, stockage centralisé, haute dispo',850000,'Milestone',['vms','serveur'],'vms-server'),
      mkp('n9','NVR Cloud 8 Voies','NVR-CLOUD8','NVR avec accès cloud, 8 canaux 4MP, stockage hybride',155000,'Axis',['cloud','nvr'],'cloud-nvr'),
      mkp('n10','HDD Surveillance 4To','HDD-SVR-4T','Disque dur dédié surveillance 24/7, 4To, 180Mo/s',65000,'WD',['hdd','stockage'],'surveillance-hdd'),
      mkp('n11','HDD Surveillance 8To','HDD-SVR-8T','Disque dur surveillance 8To, WD Purple Pro, NAS',110000,'WD',['hdd','8to'],'hdd-8tb'),
      mkp('n12','DVR Coaxial 4K 4 Voies','DVR-4K4','DVR 4K Ultra HD, 4 voies coaxiales, HDD 1To',75000,'Hikvision',['dvr','4k'],'4k-dvr'),
      mkp('n13','Rack NVR 64 Voies','NVR-RACK64','NVR rack 2U, 64 canaux 4K, 8 baies HDD RAID',1200000,'Hikvision',['nvr','enterprise'],'rack-nvr'),
      mkp('n14','NVR PoE+ 8 Voies Compact','NVR-POE8C','NVR compact 8 ports PoE+ 30W, 4K, HDD 2To',165000,'TP-Link',['poe','compact'],'compact-nvr'),
      mkp('n15','DVR Mobile Embarqué','DVR-MOB','DVR embarqué véhicule 4 caméras, GPS, 3G, anti-choc',245000,'Generic',['mobile','véhicule'],'mobile-dvr'),
    ],
  },

  // ── 6. Ordinateurs Portables ───────────────────────────────────────────────
  {
    id: 'laptops',
    name: 'Ordinateurs Portables',
    icon: '💻',
    description: 'Laptops pour usage professionnel, gaming et bureautique',
    image: img('laptop-computer'),
    products: [
      mkp('l1','Laptop Pro 14" Intel i7','LP-I7-14','Core i7-12e gen, 16Go RAM, SSD 512Go, écran FHD IPS',580000,'Dell',['i7','professionnel'],'dell-laptop','Bestseller'),
      mkp('l2','MacBook Air M2 13"','MBA-M2','Apple M2, 8Go RAM, SSD 256Go, autonomie 18h',850000,'Apple',['m2','apple'],'macbook-air'),
      mkp('l3','Laptop Gaming RTX 4070','LG-RTX4070','Intel i9, RTX 4070, 32Go, SSD 1To, 144Hz',1250000,'ASUS ROG',['gaming','rtx4070'],'gaming-laptop','Nouveau'),
      mkp('l4','Chromebook Entreprise','CB-ENT','Intel Core i3, 8Go, 128Go, Chrome OS gestionné',285000,'HP',['chromebook','entreprise'],'chromebook'),
      mkp('l5','Laptop Ultrabook 13"','UB-13','Core i5, 16Go LPDDR5, SSD 512Go, 1.1kg, FHD',420000,'LG Gram',['ultrabook','léger'],'ultrabook'),
      mkp('l6','Laptop Rugged Militaire','LR-MIL','Intel i5, 8Go, 256Go, MIL-STD-810H, IP53',680000,'Panasonic',['rugged','robuste'],'rugged-laptop'),
      mkp('l7','Laptop AMD Ryzen 7','LAP-R7','Ryzen 7 6800H, 16Go, SSD 1To, 120Hz, Wi-Fi 6',520000,'Lenovo',['ryzen7','amd'],'amd-laptop'),
      mkp('l8','Laptop 2-en-1 Tactile','2IN1-TAC','Core i7, 16Go, SSD 512Go, écran OLED tactile 14"',720000,'HP Spectre',['tactile','convertible'],'2in1-laptop'),
      mkp('l9','MacBook Pro 14" M3','MBP-M3','Apple M3 Pro, 18Go, SSD 512Go, ProMotion 120Hz',1450000,'Apple',['m3','pro'],'macbook-pro','Nouveau'),
      mkp('l10','Laptop Budget 15.6"','LB-156','Intel Celeron N4500, 8Go, SSD 256Go, prix accessible',165000,'Acer',['budget','débutant'],'budget-laptop'),
      mkp('l11','Laptop Workstation','LW-WORK','Intel Xeon W, 32Go ECC, Quadro RTX A2000, 15.6"',1850000,'HP ZBook',['workstation','cao'],'workstation-laptop'),
      mkp('l12','Laptop Étudiant 14"','LE-14','Ryzen 5, 8Go, SSD 512Go, autonomie 12h, 14" FHD',285000,'Lenovo',['étudiant','autonomie'],'student-laptop'),
      mkp('l13','Gaming Laptop RTX 4060','LG-RTX4060','Core i7-13e, RTX 4060, 16Go, 1To SSD, 165Hz',880000,'MSI',['gaming','rtx4060'],'msi-laptop'),
      mkp('l14','Laptop Fin 13" OLED','LF-OLED','Core Ultra 7, 16Go, 512Go, OLED 13.3" 2.8K',920000,'Samsung',['oled','premium'],'oled-laptop'),
      mkp('l15','Laptop Celeron Bureau','LC-BUR','Celeron J4125, 4Go, eMMC 64Go, léger 1.8kg',125000,'Acer',['entrée-gamme','bureau'],'entry-laptop',undefined,145000),
    ],
  },

  // ── 7. Ordinateurs de Bureau ───────────────────────────────────────────────
  {
    id: 'desktops',
    name: 'Ordinateurs de Bureau',
    icon: '🖥️',
    description: 'PC de bureau, tours et mini-PC pour tous usages',
    image: img('desktop-computer'),
    products: [
      mkp('d1','PC Tour Intel i7 Pro','PC-I7-PRO','Core i7-13700, 32Go, SSD 1To + HDD 2To, RTX 3060',720000,'Dell',['i7','tour','pro'],'desktop-tower','Bestseller'),
      mkp('d2','Mini PC Intel i5','MPC-I5','Intel i5-12450H, 16Go, SSD 512Go, format ultra compact',285000,'Intel NUC',['mini-pc','compact'],'mini-pc'),
      mkp('d3','PC Gaming RTX 4080','PC-RTX4080','Core i9, RTX 4080, 32Go DDR5, SSD 2To NVMe, RGB',1650000,'Custom',['gaming','rtx4080'],'gaming-pc','Nouveau'),
      mkp('d4','PC Tout-en-Un 27"','AIO-27','Core i5, 16Go, SSD 512Go, écran IPS 27" FHD intégré',580000,'HP',['tout-en-un','aio'],'all-in-one'),
      mkp('d5','Workstation Xeon','WS-XEON','Xeon W-2245, 64Go ECC, Quadro RTX 4000, SSD 1To',2250000,'HP Z4',['workstation','xeon'],'workstation-desktop'),
      mkp('d6','PC Bureau Ryzen 5','PC-R5','AMD Ryzen 5 5600G, 16Go, SSD 512Go, sans GPU dédié',285000,'Custom',['ryzen5','bureau'],'ryzen-desktop'),
      mkp('d7','PC Industriel Fanless','PC-IND','Intel Atom x6425E, fanless, -20°/+60°C, DIN rail',380000,'Advantech',['industriel','fanless'],'industrial-pc'),
      mkp('d8','Mini PC ARM Raspberry Pi 5','RPI-5','Raspberry Pi 5, 8Go RAM, kit boîtier + alim + SD 32Go',45000,'Raspberry Pi',['rpi','arm'],'raspberry-pi'),
      mkp('d9','PC Slim Format','PC-SLIM','Core i3-12100T, 8Go, SSD 256Go, format 1L, VESA',185000,'Lenovo ThinkCentre',['slim','bureau'],'slim-pc'),
      mkp('d10','Serveur Tour 1x Xeon','SRV-TOUR','Xeon E-2300, 16Go ECC, 4×HDD 1To, RAID 5',820000,'Dell',['serveur','tour'],'server-tower'),
      mkp('d11','PC Gaming AMD RX 7600','PC-RX7600','Ryzen 7 7700X, RX 7600, 32Go DDR5, SSD 1To',920000,'Custom',['gaming','amd'],'amd-gaming-pc'),
      mkp('d12','PC Bureautique Basic','PC-BUR','Intel Core i3-12100, 8Go, SSD 256Go, HDMI',185000,'Lenovo',['bureautique','basic'],'office-pc'),
      mkp('d13','Station de Montage Vidéo','VID-WORK','Core i9-13900K, 64Go, RTX 4070Ti, SSD 2To NVMe',1850000,'Custom',['montage','créatif'],'video-workstation'),
      mkp('d14','PC Éducation Ruggedisé','PC-EDU','Intel Celeron, 4Go, 64Go eMMC, boîtier anti-choc, VESA',125000,'HP',['éducation','robuste'],'education-pc'),
      mkp('d15','PC NAS 4 Baies','PC-NAS','Intel Pentium, 8Go, 4 baies HDD hot-swap, OMV',285000,'Custom',['nas','stockage'],'nas-pc'),
    ],
  },

  // ── 8. Écrans & Moniteurs ──────────────────────────────────────────────────
  {
    id: 'ecrans',
    name: 'Écrans & Moniteurs',
    icon: '🖥️',
    description: 'Moniteurs IPS, 4K, gaming et professionnels',
    image: img('computer-monitor'),
    products: [
      mkp('e1','Moniteur 27" 4K IPS','MON-27-4K','27" 4K UHD IPS, 60Hz, HDR400, 99% sRGB, USB-C 65W',285000,'LG',['4k','ips','27'],'4k-monitor','Bestseller'),
      mkp('e2','Écran Gaming 27" 165Hz','MON-G27','27" Full HD IPS, 165Hz, 1ms, G-Sync, DAS 99% sRGB',195000,'ASUS',['gaming','165hz'],'gaming-monitor'),
      mkp('e3','Moniteur Ultrawide 34"','MON-UW34','34" 3440×1440 VA, 144Hz, courbe 1800R, HDR',380000,'Samsung',['ultrawide','courbe'],'ultrawide-monitor'),
      mkp('e4','Écran Professionnel 24"','MON-P24','24" FHD IPS, calibré usine, 99% AdobeRGB, pivot',185000,'Eizo',['professionnel','calibré'],'professional-monitor'),
      mkp('e5','Écran Portable 15.6"','MON-PORT','15.6" FHD IPS, USB-C, 400 nits, 800g, étui inclus',125000,'ASUS ZenScreen',['portable','usb-c'],'portable-monitor'),
      mkp('e6','Moniteur 32" 4K 144Hz','MON-32-4K','32" 4K Mini LED, 144Hz, HDMI 2.1, 1000 nits HDR',520000,'LG',['4k','miniLED','144hz'],'4k-144hz-monitor','Nouveau'),
      mkp('e7','Écran 19" FHD Bureau','MON-19','19" TN FHD, 75Hz, VGA+HDMI, économique',75000,'Acer',['bureau','économique'],'budget-monitor',undefined,95000),
      mkp('e8','Écran 49" Super Ultrawide','MON-49','49" 5120×1440 VA, 240Hz, mini-LED, 2× PC simultanés',850000,'Samsung',['super-ultrawide','49'],'super-ultrawide'),
      mkp('e9','Moniteur Tactile 21.5"','MON-TOUCH','21.5" FHD 10 points tactile, PCAP, sans biseau, PoE',185000,'Elo',['tactile','poe'],'touch-monitor'),
      mkp('e10','Écran Kiosque 43"','MON-KIOSK','43" FHD tactile, luminosité 700 nits, montage mural',380000,'Samsung',['kiosque','affichage'],'kiosk-display'),
      mkp('e11','Écran Gaming OLED 27"','MON-OLED','27" OLED 4K, 240Hz, temps réponse 0.1ms, Dolby',680000,'LG',['oled','gaming','premium'],'oled-gaming-monitor','Nouveau'),
      mkp('e12','Moniteur Deux Écrans 24"','MON-DUAL','Pack 2× 24" FHD IPS 75Hz, bras double inclus',285000,'Philips',['dual','pack'],'dual-monitor'),
      mkp('e13','Écran LED 55" Affichage','MON-LED55','55" 4K LED commercial, 24/7, LAN, Android 11',420000,'LG',['affichage','commercial'],'commercial-display'),
      mkp('e14','Moniteur Courbe 32" 4K','MON-C32','32" 4K VA courbe 1500R, 60Hz, USB hub intégré',285000,'MSI',['courbe','4k','32'],'curved-4k'),
      mkp('e15','Bras Écran Double Articulé','BRAS-DBL','Bras double articulé, VESA 75/100, jusqu\'à 10kg',35000,'Ergotron',['bras','ergonomie'],'monitor-arm'),
    ],
  },

  // ── 9. Imprimantes & Scanners ──────────────────────────────────────────────
  {
    id: 'imprimantes',
    name: 'Imprimantes & Scanners',
    icon: '🖨️',
    description: 'Imprimantes laser, jet d\'encre, multifonctions et scanners',
    image: img('printer-office'),
    products: [
      mkp('i1','Imprimante Laser Monochrome','IMP-L-MONO','35 ppm, recto-verso auto, réseau Wi-Fi, 1200 dpi',185000,'HP',['laser','mono','réseau'],'laser-printer','Bestseller'),
      mkp('i2','Imprimante Laser Couleur A4','IMP-L-COL','20 ppm couleur, recto-verso, Wi-Fi, 600 dpi',285000,'Brother',['laser','couleur'],'color-laser'),
      mkp('i3','Multifonction Jet d\'Encre','MFP-JE','Imprimer/Scanner/Copier/Fax, Wi-Fi, 4800 dpi scan',95000,'Epson',['multifonction','jet-encre'],'inkjet-mfp'),
      mkp('i4','Imprimante A3 Laser','IMP-A3','Laser A3 couleur, 20 ppm, bac 250f, réseau',420000,'HP',['a3','laser'],'a3-laser'),
      mkp('i5','Imprimante Étiquettes','IMP-ETQ','Imprimante étiquettes thermique 203 dpi, USB+LAN',85000,'Zebra',['étiquettes','thermique'],'label-printer'),
      mkp('i6','Traceur A0 Grand Format','TRAC-A0','Traceur A0, 2400 dpi, rouleau + feuille, LAN',680000,'HP DesignJet',['traceur','a0','gf'],'plotter'),
      mkp('i7','Scanner Documentaire A4','SCAN-A4','Scanner 600 dpi, 50 feuilles ADF, USB 3.0, OCR',125000,'Fujitsu',['scanner','adf'],'document-scanner'),
      mkp('i8','Scanner Négatifs & Diapos','SCAN-NEG','Scanner diapositives/négatifs 35mm, 48 bits, 3200 dpi',85000,'Epson',['scanner','photo'],'film-scanner'),
      mkp('i9','Imprimante Ticket Thermique','IMP-TIC','Imprimante ticket 80mm, USB+LAN+BT, 300mm/s',45000,'Epson',['ticket','pos'],'receipt-printer'),
      mkp('i10','Imprimante Carte Plastique','IMP-CARD','Imprimante badges PVC, recto/verso, encodeur RFID',380000,'HID',['badge','pvc','rfid'],'card-printer'),
      mkp('i11','Multifonction Laser Couleur A3','MFP-A3','A3 laser couleur, copier/scanner/imprimer, 30 ppm',680000,'Konica Minolta',['a3','multifonction'],'a3-mfp'),
      mkp('i12','Imprimante Photo 13×18','IMP-PHOTO','Jet d\'encre 6 couleurs, 5760 dpi, 13×18 et A4',125000,'Canon',['photo','jet-encre'],'photo-printer'),
      mkp('i13','Scanner à Plat A4 Pro','SCAN-PRO','Scanner 4800 dpi, 48 bits, transparents, USB 3.0',85000,'Epson',['scanner','pro'],'flatbed-scanner'),
      mkp('i14','Imprimante 3D FDM','IMP-3D','Volume 220×220×250mm, filament PLA/PETG/ABS, wi-fi',285000,'Bambu Lab',['3d','fdm'],'3d-printer','Nouveau'),
      mkp('i15','Cartouches Laser Compatibles (x4)','CART-4X','Lot 4 cartouches toner compatibles haute capacité',45000,'Generic',['toner','compatible'],'toner-cartridge',undefined,65000),
    ],
  },

  // ── 10. Téléphones IP & VoIP ───────────────────────────────────────────────
  {
    id: 'voip',
    name: 'Téléphones IP & VoIP',
    icon: '📞',
    description: 'Téléphones SIP, IPBX et solutions de téléphonie d\'entreprise',
    image: img('voip-phone'),
    products: [
      mkp('v1','Téléphone IP HD 6 lignes','TEL-IP6','6 comptes SIP, écran 3.5" couleur, PoE, HD audio',55000,'Yealink',['sip','hd'],'ip-phone','Bestseller'),
      mkp('v2','IPBX 50 Postes','IPBX-50','Centrale IP 50 internes, SVI, file d\'attente, SIP trunk',480000,'Yeastar',['ipbx','entreprise'],'pbx-server'),
      mkp('v3','Téléphone Conférence','TEL-CONF','Téléconférence 360°, 3 micros, Wi-Fi+BT, USB',145000,'Yealink',['conférence','reunion'],'conference-phone'),
      mkp('v4','Téléphone DECT Cordless','DECT-CORD','Combiné DECT SIP, autonomie 8h, portée 300m',45000,'Gigaset',['dect','sans-fil'],'dect-phone'),
      mkp('v5','IPBX Cloud 100 Users','IPBX-CLOUD','Solution UCaaS 100 utilisateurs, app mobile, vidéo',180000,'3CX',['cloud','ucaas'],'cloud-pbx','Nouveau'),
      mkp('v6','Casque IP USB Pro','CASQUE-IP','Casque USB-C noise cancelling, certifié Teams/Zoom',55000,'Jabra',['casque','uc'],'headset'),
      mkp('v7','Portier Vidéo IP','PORT-VID','Portier vidéo 2MP PoE, SIP, déverrouillage à distance',125000,'2N',['portier','video'],'video-doorbell'),
      mkp('v8','Gateway GSM 4 Canaux','GW-GSM4','Passerelle VoIP-GSM 4 canaux SIM, ToIP, SIP trunk',185000,'Dinstar',['gsm','gateway'],'gsm-gateway'),
      mkp('v9','Téléphone Salle de Réunion','TEL-SALLE','Téléphone table ronde 12 micros, Wi-Fi, BT, Zoom',285000,'Poly',['salle','réunion'],'meeting-phone'),
      mkp('v10','Softphone Pro Licence','SOFT-PRO','Licence softphone 1 an, multi-device, chiffrement',25000,'Zoiper',['softphone','licence'],'softphone'),
      mkp('v11','Gateway VoIP 8 FXS','GW-FXS8','Passerelle 8 ports FXS, SIP, permet raccord. analo.',125000,'Grandstream',['fxs','analogique'],'fxs-gateway'),
      mkp('v12','Téléphone Robuste Extérieur','TEL-EXT','Téléphone IP extérieur IP65, anti-vandalisme, PoE',185000,'2N',['extérieur','robuste'],'outdoor-phone'),
      mkp('v13','IPBX Open-Source 200P','IPBX-OSS','Serveur Asterisk 200 postes, rack 1U, licence gratuite',320000,'Generic',['asterisk','opensource'],'asterisk-server'),
      mkp('v14','Enregistreur Appels 8 Lignes','REC-CALL','Enregistreur téléphonique 8 lignes, 1To, interface web',245000,'CallRec',['enregistrement','compliance'],'call-recorder'),
      mkp('v15','Téléphone IP Basic 2 Lignes','TEL-IP2','2 comptes SIP, écran LCD, PoE, ultra économique',22000,'Grandstream',['basic','entry'],'basic-ip-phone',undefined,30000),
    ],
  },

  // ── 11. Serveurs & NAS ─────────────────────────────────────────────────────
  {
    id: 'serveurs',
    name: 'Serveurs & NAS',
    icon: '🗄️',
    description: 'Serveurs rack, tour et NAS pour stockage et virtualisation',
    image: img('server-rack'),
    products: [
      mkp('s1','Serveur Rack 1U Intel Xeon','SRV-1U','Xeon Silver 4316, 32Go ECC, 2×SSD 480Go, RAID',1250000,'Dell PowerEdge',['rack','xeon'],'rack-server','Bestseller'),
      mkp('s2','NAS 4 Baies Synology','NAS-SYN4','NAS 4 baies, Ryzen C3538, 4Go RAM, DSM 7, 2×2.5GbE',285000,'Synology',['nas','4baies'],'synology-nas'),
      mkp('s3','NAS 8 Baies Pro','NAS-8B','8 baies 3.5", SSD cache, 10GbE, virtualisation, 8Go',580000,'Synology',['nas','8baies','pro'],'nas-8bay'),
      mkp('s4','Serveur Tour SMB','SRV-TOUR-SMB','Intel Core i3-13100, 16Go ECC, 2×1To, Windows Server',520000,'HP ML',['tour','smb'],'tower-server'),
      mkp('s5','NAS 2 Baies Entrée','NAS-2B','2 baies, Intel J4125, 2Go RAM, 1GbE, plug & play',125000,'QNAP',['nas','2baies'],'2bay-nas'),
      mkp('s6','Serveur Blade Châssis','SRV-BLADE','Châssis 10 lames + 2 lames Intel Xeon, 512Go total',3500000,'HP BladeSystem',['blade','enterprise'],'blade-server'),
      mkp('s7','NAS QNAP 6 Baies 10GbE','NAS-10G','6 baies, Xeon D-1602, 8Go, 2×10GbE, JBOD/RAID',720000,'QNAP',['nas','10gbe'],'qnap-10g'),
      mkp('s8','Micro Serveur ARM','SRV-ARM','Ampere Altra Q64, 128Go ECC, 2×NVMe 1To, 1U',850000,'Ampere',['arm','cloud'],'arm-server','Nouveau'),
      mkp('s9','Serveur GPU A100','SRV-GPU','2×Xeon Platinum, 256Go ECC, 4×A100 80Go, 4U',8500000,'NVIDIA DGX',['gpu','ia','dl'],'gpu-server'),
      mkp('s10','NAS Vidéosurveillance','NAS-CCTV','NAS dédié CCTV, 8 baies, Seagate SkyHawk pré-inst.',380000,'QNAP',['cctv','nas'],'cctv-nas'),
      mkp('s11','Serveur Fichiers Windows','SRV-WIN','Windows Server 2022, Core i5, 32Go, RAID 1 2×2To',820000,'HP',['windows','fichiers'],'windows-server'),
      mkp('s12','PDU Intelligent Rack','PDU-INT','PDU 20A, 16 prises, monitoring IP, par prise On/Off',185000,'APC',['pdu','alimentation'],'smart-pdu'),
      mkp('s13','KVM over IP','KVM-IP','KVM IP 1 port, HDMI, USB, accès hors-bande, BIOS',145000,'ATEN',['kvm','out-of-band'],'kvm-ip'),
      mkp('s14','Onduleur Rack 3000VA','UPS-3K','UPS 3000VA/2700W, rack 2U, management SNMP, runtime 1h',380000,'APC',['ups','onduleur'],'ups-rack'),
      mkp('s15','Armoire Rack 19" 22U','RACK-22U','Armoire réseau 22U, 600×600mm, vitre, 2 PDU inclus',285000,'Legrand',['rack','armoire'],'server-rack-cabinet'),
    ],
  },

  // ── 12. Smartphones ────────────────────────────────────────────────────────
  {
    id: 'smartphones',
    name: 'Smartphones',
    icon: '📱',
    description: 'Smartphones Android et iPhone pour particuliers et professionnels',
    image: img('smartphone-mobile'),
    products: [
      mkp('sm1','iPhone 15 Pro 256Go','IPH15P-256','A17 Pro, titanium, USB-C, ProCamera 48MP, 5G',985000,'Apple',['iphone','5g'],'iphone-15','Bestseller'),
      mkp('sm2','Samsung Galaxy S24 Ultra','SGS24U','Snapdragon 8 Gen 3, stylet S Pen, 200MP, 12Go RAM',1050000,'Samsung',['samsung','ultra'],'galaxy-s24','Nouveau'),
      mkp('sm3','Google Pixel 8 Pro','GPX8P','Tensor G3, IA Google, 50MP, 12Go, 120Hz, 5G',680000,'Google',['pixel','ia'],'pixel-8'),
      mkp('sm4','Xiaomi 14 Ultra','XMI14U','Leica, 1" capteur, 120W charge, Snapdragon 8 Gen 3',780000,'Xiaomi',['xiaomi','leica'],'xiaomi-14','Nouveau'),
      mkp('sm5','Samsung Galaxy A55','SGA55','Exynos 1480, 50MP OIS, 8Go, AMOLED 120Hz, IP67',320000,'Samsung',['samsung','mid-range'],'galaxy-a55'),
      mkp('sm6','iPhone SE 4','IPHSE4','A16 Bionic, 48MP, 5G, 4.7", prix accessible',480000,'Apple',['iphone','compact'],'iphone-se'),
      mkp('sm7','Smartphone Rugged 5G','SMRUG5G','MIL-810H, IP68, Snapdragon 480, batterie 7000mAh',285000,'CAT Phones',['rugged','robuste'],'rugged-phone'),
      mkp('sm8','Oppo Find X7','OPX7','Hasselblad, 50MP, Dimensity 9300, 100W, 6.78" AMOLED',680000,'Oppo',['oppo','hasselblad'],'oppo-findx'),
      mkp('sm9','Samsung Galaxy Fold 5','SGFOLD5','Pliant 7.6", Snapdragon 8 Gen 2, 12Go, S Pen',1350000,'Samsung',['pliable','fold'],'galaxy-fold'),
      mkp('sm10','Xiaomi Redmi 13C','XMR13C','Helio G85, 50MP, 5000mAh, 6.74", entrée gamme',95000,'Xiaomi',['redmi','budget'],'redmi-13',undefined,115000),
      mkp('sm11','Vivo X100 Pro','VXP100','Dimensity 9300, Zeiss 50MP, 100W, IPX8, 6.78" AMOLED',680000,'Vivo',['vivo','zeiss'],'vivo-x100'),
      mkp('sm12','Smartphone Double SIM Pro','DS-PRO','Snapdragon 778G, double SIM 5G, 108MP, 256Go',380000,'OnePlus',['dual-sim','5g'],'oneplus'),
      mkp('sm13','iPhone 14 128Go','IPH14-128','A15 Bionic, 12MP, 6.1", Face ID, iOS 17',650000,'Apple',['iphone','14'],'iphone-14',undefined,720000),
      mkp('sm14','Tablette Téléphone 7"','PHABLET7','Snapdragon 4 Gen 1, 7" FHD, 6000mAh, 4G dual SIM',145000,'Samsung',['tablette','phablet'],'phablet'),
      mkp('sm15','Smartphone Pro Business','BIZ-PRO','Snapdragon 778G, PDAF, 256Go, MDM ready, 5G',420000,'Blackberry',['business','mdm'],'business-phone'),
    ],
  },

  // ── 13. Tablettes ─────────────────────────────────────────────────────────
  {
    id: 'tablettes',
    name: 'Tablettes',
    icon: '📱',
    description: 'Tablettes Android, iPad et tablettes industrielles',
    image: img('tablet-device'),
    products: [
      mkp('t1','iPad Pro 11" M4','IPADP11M4','Apple M4, OLED Tandem, 256Go, Wi-Fi 6E, 5G',985000,'Apple',['ipad','m4'],'ipad-pro','Nouveau'),
      mkp('t2','Samsung Galaxy Tab S9','SGTABS9','Snapdragon 8 Gen 2, 11" 120Hz, 12Go, IP68, S Pen',680000,'Samsung',['tab','s-pen'],'galaxy-tab'),
      mkp('t3','iPad Air 13" M2','IPADA13M2','Apple M2, 13" Liquid Retina, 128Go, Wi-Fi 6E',720000,'Apple',['ipad','air'],'ipad-air'),
      mkp('t4','Tablette Android 10" Pro','TAB-AND-10','Snapdragon 865, 10.5" AMOLED, 8Go, 4G, 256Go',380000,'Lenovo',['android','tablette'],'android-tablet'),
      mkp('t5','Tablette Industrielle 8"','TAB-IND8','IP65, MIL-STD, NFC+2D barcode, Windows 10, 4G',520000,'Zebra',['industriel','barcode'],'industrial-tablet'),
      mkp('t6','Tablette Éducative 8"','TAB-EDU8','Quad-core, 3Go, 32Go, Android, résistante chocs',95000,'Dragon Touch',['éducation','enfant'],'education-tablet'),
      mkp('t7','Tablette Dessin Wacom','TAB-WAC','Stylet 8192 niveaux, 15.6" tactile, UHD, stylus',620000,'Wacom',['dessin','stylus'],'wacom-tablet'),
      mkp('t8','Surface Pro 9','SURF-P9','Intel Core i5, 8Go, SSD 256Go, 13" 120Hz, 5G optionnel',820000,'Microsoft',['surface','windows'],'surface-pro'),
      mkp('t9','Tablette E-Ink 10.3"','TAB-EINK','E-Ink 300 dpi, stylet actif, autonomie 2 sem, PDF',285000,'reMarkable',['ebook','eink'],'ereader'),
      mkp('t10','iPad mini 7','IPADMINI7','Apple A17 Pro, 8.3" Liquid Retina, 128Go, Wi-Fi 6',480000,'Apple',['ipad','mini'],'ipad-mini'),
      mkp('t11','Tablette POS 10" Android','TAB-POS','Android 11, 10", NFC, lecteur cartes, pied inclus',285000,'Generic',['pos','paiement'],'pos-tablet'),
      mkp('t12','Tablette Médicale IP54','TAB-MED','IP54, désinfectable, RFID, 10", Android validé FDA',680000,'Advantech',['médical','ip54'],'medical-tablet'),
      mkp('t13','Tablette 4G 10" Budget','TAB-4G','4G LTE, Unisoc T618, 4Go, 64Go, 10" FHD',125000,'Blackview',['4g','budget'],'budget-tablet',undefined,150000),
      mkp('t14','Clavier Bluetooth pour Tablette','KB-BT-TAB','Clavier BT slim universel, trackpad, pliable, 200h',35000,'Logitech',['clavier','bluetooth'],'tablet-keyboard'),
      mkp('t15','Tablette Double Écran','TAB-DUAL','Double écran 10"+8", Snapdragon 710, Android, 4G',420000,'LG',['double-écran','unique'],'dual-screen-tablet','Nouveau'),
    ],
  },

  // ── 14. Accessoires PC ─────────────────────────────────────────────────────
  {
    id: 'accessoires-pc',
    name: 'Accessoires PC',
    icon: '🖱️',
    description: 'Claviers, souris, webcams et accessoires pour PC',
    image: img('computer-accessories'),
    products: [
      mkp('ap1','Clavier Mécanique RGB','KB-MECA','Switches Cherry MX Red, PBT, NKRO, USB-C, français',85000,'Corsair',['mécanique','rgb'],'mechanical-keyboard','Bestseller'),
      mkp('ap2','Souris Gaming 25600 DPI','MUS-GAM','Capteur PixArt 3395, 25600 DPI, 8 boutons, 60g',55000,'Logitech',['gaming','souris'],'gaming-mouse'),
      mkp('ap3','Webcam 4K HDR','WEB-4K','4K 30fps, HDR, auto-focus, micro stéréo, USB-C',85000,'Logitech',['webcam','4k'],'webcam-4k'),
      mkp('ap4','Casque Gaming 7.1','CAST-71','Son surround 7.1, micro boom rétractable, USB, RVB',55000,'HyperX',['gaming','casque'],'gaming-headset'),
      mkp('ap5','Tapis de Souris XXL','TAPIS-XXL','900×400mm, surface tissée, anti-dérapant, RGB bord',15000,'Corsair',['tapis','xxl'],'mousepad-xxl'),
      mkp('ap6','Hub USB-C 10-en-1','HUB-10','USB-C→HDMI 4K+USB3×3+SD+PD 100W+Ethernet+Jack',35000,'Anker',['hub','usb-c'],'usb-hub'),
      mkp('ap7','Clavier Bluetooth Multi-Device','KB-BT3','BT 5.2, connexion 3 appareils, silencieux, USB-C',45000,'Logitech',['bluetooth','silencieux'],'bt-keyboard'),
      mkp('ap8','Souris Ergonomique Verticale','MUS-ERG','Design vertical 57°, 6 boutons, DPI réglable, 2.4G',35000,'Anker',['ergonomie','vertical'],'vertical-mouse'),
      mkp('ap9','Webcam 1080p Streaming','WEB-STREAM','1080p 60fps, fond vert virtuel, USB-C, micro AI noise',55000,'Razer',['streaming','1080p'],'stream-webcam'),
      mkp('ap10','Clavier + Souris Sans Fil Combo','KB-MUS-COMBO','Combo clavier+souris 2.4GHz, nano récepteur, pile 2ans',25000,'Logitech',['combo','sans-fil'],'kb-mouse-combo',undefined,35000),
      mkp('ap11','Repose-Poignets Clavier','REST-KB','Repose-poignets mémoire de forme, antidérapant, 43cm',8000,'Kensington',['ergonomie','confort'],'wrist-rest'),
      mkp('ap12','Trackpad Bluetooth Pro','TRACK-BT','Trackpad multi-touch 130mm, gestes avancés, silicone',45000,'Apple',['trackpad','multi-touch'],'trackpad'),
      mkp('ap13','Stylet Actif Universel','STYLET-UNI','4096 niveaux pression, tilt, rechargeable, universel',35000,'Wacom',['stylet','stylet'],'stylus'),
      mkp('ap14','Lecteur Empreinte USB','EMPRE-USB','Lecteur biométrique USB, Windows Hello, 0.1s, 360°',22000,'Kensington',['biométrie','sécurité'],'fingerprint-reader'),
      mkp('ap15','Support PC Portable Réglable','SUPP-PC','Aluminium, 6 hauteurs, pliable, 360° pivotant',18000,'Rain Design',['support','ergonomie'],'laptop-stand'),
    ],
  },

  // ── 15. Stockage & Mémoire ─────────────────────────────────────────────────
  {
    id: 'stockage',
    name: 'Stockage & Mémoire',
    icon: '💾',
    description: 'SSD, HDD, clés USB, cartes mémoire et NAS',
    image: img('storage-device'),
    products: [
      mkp('st1','SSD NVMe M.2 1To','SSD-M2-1T','PCIe Gen4, 7000Mo/s lecture, Samsung V-NAND, cache 1Go',95000,'Samsung 990 Pro',['ssd','nvme','m2'],'ssd-nvme','Bestseller'),
      mkp('st2','SSD SATA 2.5" 2To','SSD-SATA-2T','SATA III 550Mo/s, TLC 3D NAND, 2To, boîtier 7mm',85000,'Crucial',['ssd','sata','2to'],'ssd-sata'),
      mkp('st3','HDD 4To 3.5" Desktop','HDD-4T','CMR 5400 rpm, 256Mo cache, 7200 rpm pro, 4To',55000,'Seagate',['hdd','4to'],'hdd-desktop'),
      mkp('st4','RAM DDR5 32Go 6000MHz','RAM-DDR5-32','32Go (2×16Go) DDR5-6000, CL36, RGB, XMP 3.0',125000,'G.Skill Trident Z5',['ram','ddr5'],'ram-ddr5'),
      mkp('st5','RAM DDR4 16Go 3200MHz','RAM-DDR4-16','16Go (2×8Go) DDR4-3200, CL16, compatible Intel/AMD',45000,'Corsair Vengeance',['ram','ddr4'],'ram-ddr4'),
      mkp('st6','Clé USB 3.2 256Go','USB-256G','USB 3.2 Gen2 400Mo/s, 256Go, rotative, métal',18000,'Samsung',['usb','flash'],'usb-drive'),
      mkp('st7','Carte MicroSD 512Go','MICROSD-512','V30 A2, 180Mo/s, 512Go, pour caméras et drones',45000,'SanDisk Extreme Pro',['microsd','rapide'],'microsd'),
      mkp('st8','SSD Portable 2To USB-C','SSD-PORT-2T','2To, USB 3.2 Gen2 20Gbps, 2000Mo/s, IP55',125000,'Samsung T9',['ssd','portable'],'portable-ssd'),
      mkp('st9','HDD Externe 5To','HDD-EXT-5T','5To USB 3.0, auto-aliment., 120Mo/s, 2 ans garantie',85000,'WD Elements',['hdd','externe'],'external-hdd'),
      mkp('st10','NVMe PCIe 4To','NVME-4T','PCIe Gen4 4To, 7300Mo/s, 3D TLC, 5 ans garantie',280000,'WD Black SN850X',['nvme','4to'],'nvme-4tb'),
      mkp('st11','Boîtier SSD M.2 USB-C','BOI-M2','Boîtier M.2 NVMe USB-C 3.2 Gen2, 10Gbps, aluminium',15000,'ORICO',['boîtier','m2'],'m2-enclosure'),
      mkp('st12','RAID USB 2 Baies','RAID-USB','2 baies 2.5"/3.5", RAID 0/1/JBOD, USB 3.0, fan',35000,'Inateck',['raid','externe'],'usb-raid'),
      mkp('st13','RAM Laptop DDR4 16Go','RAM-LAP-16','16Go SODIMM DDR4-3200, CL22, pour laptops',35000,'Kingston',['sodimm','laptop'],'laptop-ram'),
      mkp('st14','Lecteur Cartes Multi','LECT-CARD','Lecteur CF/SD/MicroSD/XQD, USB-C, 312Mo/s',22000,'Lexar',['lecteur','cartes'],'card-reader'),
      mkp('st15','Disque Dur Surveillance 8To','HDD-SVR-8T2','8To 24/7 surveillance, 180Mo/s, WD Purple Pro',110000,'WD',['surveillance','8to'],'surveillance-disk'),
    ],
  },

  // ── 16. Alimentation & Onduleurs ──────────────────────────────────────────
  {
    id: 'alimentation',
    name: 'Alimentation & Onduleurs',
    icon: '⚡',
    description: 'Onduleurs, multiprise, alimentations PC et protecteurs',
    image: img('ups-power'),
    products: [
      mkp('al1','Onduleur Line-Interactive 2000VA','UPS-2K','2000VA/1200W, 4 sorties, USB management, autonomie 20min',185000,'APC Back-UPS',['ups','line-interactive'],'ups-2000va','Bestseller'),
      mkp('al2','Onduleur On-Line 3000VA','UPS-3K-OL','On-line double conversion 3000VA, rack 2U, SNMP',380000,'Eaton',['ups','online','rack'],'online-ups'),
      mkp('al3','Multiprise Parafoudre 6 Prises','MULTI-6','6 prises avec parafoudre, USB×2 18W, câble 1.8m',22000,'Belkin',['multiprise','parafoudre'],'surge-protector'),
      mkp('al4','Alimentation PC 850W Gold','PSU-850','850W 80+ Gold, modulaire, 120mm ventil., ATX',95000,'Seasonic',['psu','gold','modular'],'pc-psu'),
      mkp('al5','Alimentation PC 650W Bronze','PSU-650','650W 80+ Bronze, semi-modulaire, silencieux',55000,'Corsair',['psu','bronze'],'psu-650'),
      mkp('al6','Chargeur USB-C 100W GaN','CHG-GAN100','GaN 100W, 3 ports USB-C+USB-A, compact, PPS',25000,'Anker',['gan','usb-c'],'gan-charger'),
      mkp('al7','Onduleur Tour 6000VA','UPS-6K','6000VA line-interactive, 6 prises IEC, bypass manuel',680000,'Eaton',['ups','6000va'],'ups-6000va'),
      mkp('al8','Batterie de Remplacement UPS','BAT-UPS','Batterie de rechange 12V 9Ah pour onduleurs APC/Eaton',25000,'Generic',['batterie','remplacement'],'ups-battery'),
      mkp('al9','Régulateur de Tension 5000W','REG-5K','Régulateur servo-moteur 5000W, entrée 150-250V',125000,'Microtek',['régulateur','servo'],'voltage-regulator'),
      mkp('al10','PDU Rack 16 Prises','PDU-16','PDU 1U, 16×schuko, 32A, monitoring courant par prise',185000,'Rittal',['pdu','rack'],'rack-pdu'),
      mkp('al11','Alimentation PoE 48V 120W','POE-120W','Adaptateur PoE passif 48V 120W, pour AP Ubiquiti',15000,'Ubiquiti',['poe','48v'],'poe-adapter'),
      mkp('al12','Onduleur Solaire Hybride 5kW','SOLAR-5K','Hybride solaire MPPT 80A, 5kW, 48V, Wi-Fi, LVDS',620000,'Growatt',['solaire','hybride','mppt'],'solar-inverter','Nouveau'),
      mkp('al13','Multiprise Rack 1U 10 Prises','PDU-1U','1U rack, 10 prises, 16A, interrupteur général, LED',45000,'Generic',['rack','multiprise'],'rack-strip'),
      mkp('al14','Testeur Prise Électrique','TEST-PRISE','Testeur prise EU, vérifie terre/polarité/RCD, LED',8000,'Metrel',['testeur','électricité'],'socket-tester'),
      mkp('al15','Câble d\'Alimentation IEC C13 2m (×10)','CAB-IEC-10','Lot 10 câbles IEC C13→Schuko 2m, 16A, pour serveurs',22000,'Generic',['câble','iec'],'iec-cable'),
    ],
  },

  // ── 17. Sécurité Réseau & Firewalls ───────────────────────────────────────
  {
    id: 'firewall',
    name: 'Sécurité Réseau',
    icon: '🛡️',
    description: 'Firewalls, VPN, WAF et solutions de cybersécurité',
    image: img('network-firewall'),
    products: [
      mkp('fw1','Firewall UTM 1Gbps','FW-UTM-1G','NGFW 1Gbps, IPS/IDS, antivirus, VPN, HA, 8 ports GE',380000,'Fortinet',['firewall','utm'],'firewall','Bestseller'),
      mkp('fw2','Routeur Firewall MikroTik','FW-MT','MikroTik RB4011, 10 ports GE, RouterOS L6, Gigabit',165000,'MikroTik',['routeur','firewall'],'mikrotik-fw'),
      mkp('fw3','Appliance VPN 100 Tunnels','VPN-100','VPN IPSec/SSL 100 tunnels, 1Gbps, HA, 4 GE',245000,'SonicWall',['vpn','ipsec'],'vpn-appliance'),
      mkp('fw4','Switch Firewall L3','SWF-L3','Switch avec firewall L3 intégré, 24 GE, 4 SFP+',420000,'Cisco',['switch','firewall','l3'],'cisco-fw-switch'),
      mkp('fw5','WAF Applicatif','WAF-APP','Web Application Firewall, OWASP, DDoS, LB, 2Gbps',520000,'F5',['waf','owasp'],'waf'),
      mkp('fw6','Boîtier IDS/IPS','IPS-BOX','Détection intrusion passive, 10Gbps, analyse protoc.',285000,'Snort/Suricata',['ids','ips'],'ips-box'),
      mkp('fw7','Concentrateur VPN SSL','VPN-SSL','500 tunnels SSL simultanés, AD/LDAP, MFA, portail',380000,'Pulse Secure',['vpn','ssl'],'ssl-vpn'),
      mkp('fw8','Honeypot Réseau','HONEY','Pot de miel réseau, 5 services leurres, alertes SIEM',125000,'Generic',['honeypot','deception'],'honeypot'),
      mkp('fw9','Sonde SIEM','SIEM-PROBE','Sonde collecte logs, 5000 EPS, corrélation, tableaux',380000,'Splunk',['siem','logs'],'siem-probe'),
      mkp('fw10','Pare-Feu Open Source pfSense','PFS-BOX','Appliance pfSense, Core i5, 8Go, 6×GE, 1To SSD',245000,'Netgate',['pfsense','opensource'],'pfsense'),
      mkp('fw11','Scanner Vulnérabilités','SCAN-VULN','Scanner réseau 256 IPs, rapports CVSS, planifiable',85000,'Tenable Nessus',['scanner','vuln'],'vuln-scanner'),
      mkp('fw12','Authentification 2FA Token','2FA-TOKEN','Token TOTP/HOTP matériel, FIDO2, NFC, USB',35000,'YubiKey',['2fa','fido2'],'yubikey'),
      mkp('fw13','Certificat SSL Wildcard','SSL-WILD','Certificat SSL/TLS Wildcard 2 ans, SAN inclus',85000,'DigiCert',['ssl','certificat'],'ssl-cert'),
      mkp('fw14','Switch NAC','NAC-SW','Contrôle d\'accès réseau, 802.1X, VLAN dynamique, 24P',285000,'Cisco ISE',['nac','802.1x'],'nac-switch'),
      mkp('fw15','Boîtier Chiffrement HD','CRYPT-HD','Chiffrement transparent disque dur/SSD, AES-256, USB',45000,'Generic',['chiffrement','aes'],'hdd-encryptor'),
    ],
  },

  // ── 18. Domotique & IoT ────────────────────────────────────────────────────
  {
    id: 'domotique',
    name: 'Domotique & IoT',
    icon: '🏠',
    description: 'Maison connectée, capteurs IoT et automatisation',
    image: img('smart-home'),
    products: [
      mkp('dm1','Hub Domotique Zigbee','HUB-ZB','Contrôleur Zigbee 3.0, Z-Wave, Wi-Fi, 200 appareils, app',65000,'Home Assistant',['zigbee','zwave'],'smart-hub','Nouveau'),
      mkp('dm2','Ampoule LED Connectée E27 (×4)','AMPO-4X','RGB+blanc chaud, 2700-6500K, 9W, Wi-Fi, app, 4 pièces',22000,'Philips Hue',['ampoule','rgb'],'smart-bulb'),
      mkp('dm3','Prise Connectée 16A','PRISE-CON','Prise Wi-Fi 16A, mesure consommation, timer, Alexa',12000,'TP-Link',['prise','énergie'],'smart-plug'),
      mkp('dm4','Serrure Connectée Bluetooth','SERR-BT','Serrure BT 5.0, empreinte, code, carte, clé, app',85000,'Yale',['serrure','biométrie'],'smart-lock'),
      mkp('dm5','Thermostat Connecté','THERM-CON','Thermostat Wi-Fi apprentissage automatique, économie 20%',55000,'Nest',['thermostat','économie'],'smart-thermostat'),
      mkp('dm6','Sonnette Vidéo Wi-Fi','SONN-VID','1080p, vision nocturne, détection mouvement, chime',65000,'Ring',['sonnette','vidéo'],'video-doorbell'),
      mkp('dm7','Capteur Température/Humidité','CAPT-TH','Capteur Zigbee temp/humidité, LCD, données historiques',15000,'Xiaomi',['capteur','temperature'],'temp-sensor'),
      mkp('dm8','Détecteur Fumée Connecté','DET-FUM','Détecteur fumée Wi-Fi, alerte push, interconnectable',22000,'Nest Protect',['fumée','sécurité'],'smoke-detector'),
      mkp('dm9','Volet Roulant Connecté','VOL-CON','Moteur volet Wi-Fi, timer, capteur solaire, app',85000,'Somfy',['volet','timer'],'smart-shutter'),
      mkp('dm10','Passerelle IoT LoRaWAN','GATE-LORA','Passerelle LoRaWAN 8 canaux, couverture 15km rural',245000,'RAK Wireless',['lorawan','iot'],'lora-gateway','Nouveau'),
      mkp('dm11','Capteur Ouverture Porte','CAPT-OUVERT','Capteur Zigbee porte/fenêtre, alerte app, 2 ans pile',8000,'Aqara',['capteur','alarme'],'door-sensor'),
      mkp('dm12','Strip LED Connecté 5m','LED-STRIP5','RGB+blanc, Wi-Fi, sync musique, coupable, 5m, USB-C',22000,'Govee',['led','strip','rgb'],'led-strip'),
      mkp('dm13','Centrale Alarme Connectée','ALARM-CON','Centrale alarme Wi-Fi, 64 zones, sirène 110dB, gsm',145000,'Ajax',['alarme','centrale'],'alarm-hub'),
      mkp('dm14','Caméra Intérieure 360° Wi-Fi','CAM-360-INT','360° 1080p, suivi auto, parole bidirectionnelle, SD',35000,'TP-Link Tapo',['camera','360','intérieur'],'indoor-cam'),
      mkp('dm15','Contrôleur Irrigation','IRRIG-CON','8 zones, Wi-Fi, météo auto, économie eau 50%, app',65000,'Rachio',['irrigation','jardin'],'smart-irrigation'),
    ],
  },

  // ── 19. Drones & Robotique ─────────────────────────────────────────────────
  {
    id: 'drones',
    name: 'Drones & Robotique',
    icon: '🚁',
    description: 'Drones professionnels, robots et gadgets high-tech',
    image: img('drone-flying'),
    products: [
      mkp('dr1','Drone 4K GPS Pro','DRN-4K-GPS','4K 30fps, stabilisateur 3 axes, 30min vol, 7km portée',580000,'DJI Mini 4 Pro',['drone','4k','gps'],'dji-drone','Bestseller'),
      mkp('dr2','Drone Inspection Thermique','DRN-THERM','Caméra thermique+RGB, 35min, zoom 30x, RTK',2500000,'DJI Matrice',['drone','thermique'],'thermal-drone'),
      mkp('dr3','Drone de Course FPV','DRN-FPV','FPV 4K, vitesse 140km/h, mode acro, lunettes incluses',380000,'DJI FPV',['fpv','racing'],'fpv-drone'),
      mkp('dr4','Drone Agricole Épandeur','DRN-AGRI','Capacité 20L, GNSS, épandage précis 10 ha/h',4500000,'XAG',['agriculture','épandeur'],'agri-drone','Nouveau'),
      mkp('dr5','Robot Aspirateur Laveur','ROB-ASP','LiDAR SLAM, carte 200m², double aspir+serpillière',185000,'Roborock',['robot','aspirateur'],'robot-vacuum'),
      mkp('dr6','Bras Robotique Éducatif','BRAS-ROB','6 axes, 500g charge, programmable Python/Blockly',280000,'DOBOT',['bras','éducation'],'robot-arm'),
      mkp('dr7','Robot Delivery Indoor','ROB-DEL','Robot livraison bureau, 5 niveaux, lidar, ascenseur',2800000,'Keenon',['robot','livraison'],'delivery-robot'),
      mkp('dr8','Drone Aquatique','DRN-AQUA','Drone sous-marin 4K, 100m profondeur, 4h, bras articulé',1250000,'Chasing M2 Pro',['aquatique','sous-marin'],'underwater-drone'),
      mkp('dr9','Kit Drone DIY Éducatif','DRN-DIY','Kit assemblage drone, Raspberry Pi, Python, 250mm',125000,'Generic',['éducation','diy'],'diy-drone'),
      mkp('dr10','Batterie DJI Mini 4 Pro','BAT-DJI-M4','Batterie intelligente 2453mAh, 34min autonomie, BMS',65000,'DJI',['batterie','drone'],'drone-battery'),
      mkp('dr11','Exosquelette Membre Sup.','EXO-MS','Exosquelette réhabilitation bras, motorisé, capteurs',3800000,'ReWalk',['exosquelette','médical'],'exoskeleton','Nouveau'),
      mkp('dr12','Voiture RC 4×4 Tout-Terrain','RC-4X4','4WD, portée 200m, 50km/h, LED, gyroscope',45000,'WLtoys',['rc','tout-terrain'],'rc-car'),
      mkp('dr13','Simulateur Réalité Augmentée','AR-SIM','Lunettes AR 50° FOV, suivi mains, passthrough 4K',1250000,'Magic Leap 2',['ar','lunettes'],'ar-glasses','Nouveau'),
      mkp('dr14','Station Recharge Drone Auto','DOCK-DRN','Station recharge automatique, protection IP55, 4G',580000,'DJI Dock 2',['dock','recharge'],'drone-dock'),
      mkp('dr15','Hélice DJI Mini 4 Pro (×4)','HEL-M4','Lot 4 hélices de rechange DJI Mini 4 Pro, silencieuses',12000,'DJI',['hélice','accessoire'],'drone-props'),
    ],
  },

  // ── 20. Audio & Visioconférence ────────────────────────────────────────────
  {
    id: 'audio-video',
    name: 'Audio & Visioconférence',
    icon: '🎙️',
    description: 'Systèmes audio, vidéo conférence et affichage dynamique',
    image: img('video-conference'),
    products: [
      mkp('av1','Barre Son Conférence 4K','BARRE-CONF','4K 120° FOV, 6 micros, Bluetooth, USB-C, Teams certif.',285000,'Jabra PanaCast',['conférence','4k'],'conference-bar','Bestseller'),
      mkp('av2','Système PA Sans Fil','PA-SANS-FIL','Ampli 500W + 2 enceintes 12" + 2 micros HF',185000,'Yamaha',['pa','sono'],'pa-system'),
      mkp('av3','Enceinte Bluetooth Pro 30W','ENC-BT30','30W RMS, IP67, BT 5.3, 24h, NFC, TWS',65000,'JBL Xtreme',['enceinte','bluetooth'],'bt-speaker'),
      mkp('av4','Caméra PTZ Conférence','PTZ-CONF','PTZ 4K 12x, HDMI+IP, suivi auto speaker, PoE',380000,'HuddleCamHD',['ptz','conférence'],'conference-ptz'),
      mkp('av5','Micro Cravate Sans Fil','MIC-CRV','UHF 655-679MHz, 2 émetteurs, portée 80m, batterie 8h',125000,'Sennheiser',['micro','cravate','uhf'],'wireless-mic'),
      mkp('av6','Matrice HDMI 4×4','MAT-HDMI','Commutateur matrice HDMI 4 in×4 out, 4K, IP control',185000,'Kramer',['matrice','hdmi'],'hdmi-matrix'),
      mkp('av7','Ampli 100V Plafond','AMP-100V','Ampli 120W 100V, 4 zones, MP3 BT, RJ45 control',95000,'Bosch',['ampli','100v'],'pa-amplifier'),
      mkp('av8','Haut-Parleur Plafond 20W','HP-PLAF','HP encastré plafond 20W 100V, 6.5", blanc, rot. 20°',18000,'Bosch',['haut-parleur','plafond'],'ceiling-speaker'),
      mkp('av9','Tablette Conférence Android','TAB-CONF','Tablette 10" dédiée salle de réunion, agenda, Zoom',185000,'Logitech Tap',['salle','conférence'],'conference-tablet'),
      mkp('av10','Casque Réducteur Bruit','CASQ-NC','ANC 40dB, 30h autonomie, codec LDAC, multipoint 2 BT',185000,'Sony WH-1000XM5',['casque','anc'],'noise-cancelling','Bestseller'),
      mkp('av11','Interface Audio USB','INTER-AUDIO','2 in/2 out, XLR+TRS, 24bit 192kHz, compatible Mac/Win',85000,'Focusrite Scarlett',['interface','studio'],'audio-interface'),
      mkp('av12','Micro Conférence USB','MIC-USB-CONF','Micro omni USB, captage 360°, réduction bruit IA, 4m',45000,'Blue Yeti',['micro','usb'],'usb-microphone'),
      mkp('av13','Écran Interactif 75"','ECRAN-INT75','75" 4K tactile 20 points, Windows 11, Android dual OS',1250000,'Samsung Flip',['interactif','75'],'interactive-display'),
      mkp('av14','Projecteur Laser 4K','PROJ-LASER','Laser 4K DLP, 4000 lumens, 20000h, HDMI 2.1',850000,'Sony',['projecteur','laser'],'laser-projector'),
      mkp('av15','Chromecast HDMI 4K','CC-4K','Streaming 4K HDR, Wi-Fi 6, AirPlay, Ethernet inclus',35000,'Google',['chromecast','streaming'],'chromecast'),
    ],
  },

  // ── 21. Énergie Solaire & Green Tech ──────────────────────────────────────
  {
    id: 'solaire',
    name: 'Énergie Solaire',
    icon: '☀️',
    description: 'Panneaux solaires, batteries de stockage et onduleurs',
    image: img('solar-panels'),
    products: [
      mkp('sol1','Panneau Solaire 400W Monocristallin','PAN-400W','400W, 21.5% rendement, garantie 25 ans, MC4',85000,'LONGi',['panneau','monocristallin'],'solar-panel','Bestseller'),
      mkp('sol2','Batterie Lithium 100Ah 48V','BAT-LIFEPO4','LiFePO4 100Ah 48V, BMS intégré, 6000 cycles',380000,'pylontech',['batterie','lifepo4'],'lithium-battery'),
      mkp('sol3','Onduleur Hybride 10kW','INV-HYB10K','MPPT 120A, 10kW, 48V, entrée grid optionnelle, Wi-Fi',850000,'Growatt SPH',['onduleur','hybride','10kw'],'hybrid-inverter','Nouveau'),
      mkp('sol4','Régulateur MPPT 60A','MPPT-60','MPPT 60A 12/24/48V, bluetooth, display LCD, 2 entrées',65000,'Victron',['mppt','régulateur'],'mppt-controller'),
      mkp('sol5','Kit Solaire 1kW Complet','KIT-SOL-1K','Kit 1kW: 2×400W + MPPT 40A + batterie 100Ah + inv',350000,'Generic',['kit','complet'],'solar-kit'),
      mkp('sol6','Station Energie Portable 2kWh','STAT-PORT','2kWh LiFePO4, 2000W, 14 prises, panneau 200W inclus',680000,'EcoFlow Delta Pro',['portable','camping'],'power-station'),
      mkp('sol7','Micro-Onduleur Enphase','MICRO-INV','Micro-onduleur 350W par panneau, monitoring cloud',85000,'Enphase',['micro-onduleur','monitoring'],'micro-inverter'),
      mkp('sol8','Câble Solaire 6mm² 50m','CAB-SOL-6','Câble PV 6mm² double isolant, 1000V DC, rouge+noir',22000,'Helukabel',['câble','solaire'],'solar-cable'),
      mkp('sol9','Monitoring Solaire Wi-Fi','MON-SOL','Passerelle monitoring Wi-Fi, courbes prod., alertes',35000,'SolarEdge',['monitoring','production'],'solar-monitor'),
      mkp('sol10','Fixation Toiture Tuile (×10)','FIX-TUILE','Kit fixation pour 10 panneaux, inox A2, tuiles plates',45000,'K2 Systems',['fixation','montage'],'roof-mounting'),
      mkp('sol11','Batterie AGM 200Ah 12V','BAT-AGM-200','Batterie AGM VRLA 200Ah 12V, cycle profond, 5 ans',95000,'Victron',['agm','200ah'],'agm-battery'),
      mkp('sol12','Onduleur Réseau String 5kW','INV-5K-GRID','Onduleur réseau 5kW, MPPT 2 entrées, rendement 98.2%',520000,'SMA Sunny Boy',['réseau','string'],'grid-inverter'),
      mkp('sol13','Compteur Énergie Bidirectionnel','CPT-BID','Compteur énergie 3-phases bi, IoT, Modbus RTU',45000,'Generic',['compteur','modbus'],'energy-meter'),
      mkp('sol14','Chargeur Solaire Véhicule','CHG-VEH','MPPT 30A 12/24V, charge batterie voiture/bateau',22000,'Victron',['chargeur','véhicule'],'vehicle-charger'),
      mkp('sol15','Ballon Eau Chaude Solaire 300L','BALLON-SOL','Ballon solaire 300L, 2 échangeurs, résistance appoint',380000,'Atlantic',['ballon','eau chaude'],'solar-water-heater'),
    ],
  },

  // ── 22. Gadgets Technologiques ─────────────────────────────────────────────
  {
    id: 'gadgets',
    name: 'Gadgets Technologiques',
    icon: '🎮',
    description: 'Gadgets high-tech, objets connectés et innovations',
    image: img('tech-gadgets'),
    products: [
      mkp('g1','Montre Connectée GPS Sport','WATCH-GPS','GPS intégré, santé 24/7, 14 jours autonomie, AMOLED',185000,'Garmin',['montre','gps','sport'],'smartwatch','Bestseller'),
      mkp('g2','Lunettes VR Standalone','VR-STAND','Résolution 2.1K/œil, 120Hz, controllers, 128Go, Wi-Fi 6',620000,'Meta Quest 3',['vr','standalone'],'vr-headset'),
      mkp('g3','Stylo Intelligent IA','STYLO-IA','Stylo numérique, conversion manuscrit→texte, OCR IA',85000,'Neo Smartpen',['stylo','ocr'],'smart-pen'),
      mkp('g4','Badge NFC Programmable (×10)','NFC-BADGE','Lot 10 badges NFC ISO14443A, réécriture infinie, 1Ko',8000,'Generic',['nfc','badge'],'nfc-cards'),
      mkp('g5','Tracker GPS Ultra Mini','TRACK-GPS','GPS+GSM 4G, batterie 30 jours, IP67, alertes SOS',45000,'Optimus',['tracker','gps'],'gps-tracker'),
      mkp('g6','Cube LED RGB Connecté','LED-CUBE','Cube 6×6×6 LED RGB, Wi-Fi, animations, app, SDK',185000,'Signify',['led','cube'],'led-cube','Nouveau'),
      mkp('g7','Station Météo Wi-Fi Pro','METEO-PRO','Capteur ext/int, pluie, UV, vent, graphiques 24h, Wi-Fi',65000,'Netatmo',['météo','station'],'weather-station'),
      mkp('g8','Casque AR Audio Spatial','CASQ-AR','Son spatial 3D, capteurs tête, BT 5.3, ANC adaptative',280000,'Apple AirPods Max',['casque','spatial'],'spatial-audio'),
      mkp('g9','Imprimante 3D Résine LCD','RESIN-3D','LCD 8K 12.8", résolution 22µm, résine 200ml inclus',380000,'Elegoo Saturn 3',['résine','3d','8k'],'resin-printer'),
      mkp('g10','Tablette Graphique Pro A3','GRAPH-A3','Zone active A3, stylet 8192 niv., inclinaison, USB-C',185000,'XP-Pen',['graphique','dessin'],'drawing-tablet'),
      mkp('g11','Clé Streaming 4K Fire','FIRE-4K','Fire TV Stick 4K Max, Wi-Fi 6, Dolby Vision, Alexa',22000,'Amazon',['streaming','fire'],'fire-stick',undefined,28000),
      mkp('g12','Robot Éducatif Codable','ROB-CODE','Robot STEM, Scratch/Python, capteurs, gyroscope, LED',85000,'Sphero',['robot','stem'],'coding-robot'),
      mkp('g13','Rétroprojecteur Pico','PICO-PROJ','Projecteur 1080p 800 lumens poche, BT, Wi-Fi, batterie',185000,'Nebula Capsule',['pico','projecteur'],'pico-projector'),
      mkp('g14','Balance Connectée Impédancemètre','BAL-IMP','18 mesures corps, Wi-Fi, sync appli santé, 8 utilisateurs',25000,'Withings',['balance','santé'],'smart-scale'),
      mkp('g15','Pointeur Laser Télécommande','PTR-LASER','Laser vert, télécommande 100m, timer, PDF spotlight',15000,'Logitech Spotlight',['pointeur','présentation'],'laser-pointer'),
    ],
  },

  // ── 23. Outils & Mesure ────────────────────────────────────────────────────
  {
    id: 'outils',
    name: 'Outils & Mesure',
    icon: '🔧',
    description: 'Multimètres, outils réseau, testeurs et équipements de mesure',
    image: img('measurement-tools'),
    products: [
      mkp('o1','Multimètre Numérique Pro','MULTI-PRO','TRMS, 6000 points, Bluetooth app, thermocouple inclus',45000,'Fluke 117',['multimètre','trms'],'digital-multimeter','Bestseller'),
      mkp('o2','Analyseur Spectre Wi-Fi','WIFI-ANAL','Analyse 2.4/5/6GHz, RSSI, canal, WPA3, USB, app',125000,'MetaGeek',['wifi','analyse'],'wifi-analyzer'),
      mkp('o3','Testeur Câble Réseau Pro','NET-TESTER-PRO','Certification Cat6A TIA-568, rapport PDF, PoE test',485000,'Fluke LinkIQ',['certification','cat6a'],'cable-certifier'),
      mkp('o4','Oscilloscope Numérique 100MHz','OSCILLO','2 voies 100MHz, 1GSa/s, 8" tactile, FFT, USB, LAN',285000,'Rigol',['oscilloscope','mesure'],'oscilloscope'),
      mkp('o5','Caméra Thermique Mobile','THERM-MOB','Caméra thermique smartphone -20° à 550°C, 256×192',285000,'FLIR ONE Pro',['thermique','mobile'],'flir-one'),
      mkp('o6','Pince Ampèremétrique TRMS','PINCE-AMP','AC/DC 600A TRMS, Bluetooth, enregistrement, CAT III',85000,'Fluke 376',['pince','ampèremètre'],'clamp-meter'),
      mkp('o7','Réflectomètre OTDR Fibre','OTDR','OTDR 1310/1550nm, portée 60km, résolution 0.5m, USB',680000,'EXFO',['otdr','fibre'],'otdr'),
      mkp('o8','Niveaumètre Laser Croix','LASER-NIVEAU','Laser croix 360°, précision ±1mm/5m, IP54, étui',55000,'Bosch',['laser','niveau'],'laser-level'),
      mkp('o9','Testeur Isolation 5kV','MEGA-5K','Mégohmmètre 5000V, résistance isolation, polarisation',125000,'Metrel',['isolation','mégohmmètre'],'insulation-tester'),
      mkp('o10','Analyseur Qualité Réseau','PQ-ANAL','Qualité énergie 3P+N, harmoniques, enregistrement',380000,'Chauvin Arnoux',['qualité-réseau','harmoniques'],'power-quality'),
      mkp('o11','Perceuse-Visseuse 18V','PERC-18V','18V brushless, 2 batteries 5Ah, chargeur rapide, coffret',95000,'DeWalt',['perceuse','outil'],'power-drill'),
      mkp('o12','Malette Outillage IT (30 pièces)','MALET-IT','30 outils informatique, sertissage, tournevis torx/hex',35000,'Generic',['malette','outillage'],'it-toolkit'),
      mkp('o13','Thermomètre Infrarouge Pro','THERM-IR','Non-contact -50° à 2200°C, émissivité réglable, USB',22000,'Fluke 62 Max+',['thermomètre','ir'],'ir-thermometer'),
      mkp('o14','Testeur PoE Pro','POE-TEST','Test PoE 802.3af/at/bt, tension, courant, classe, câble',55000,'NetAlly',['poe','testeur'],'poe-tester'),
      mkp('o15','Étiqueteuse Industrielle','ETQ-IND','Étiquettes câbles/équip., QWERTY, Wi-Fi, formats mult.',85000,'Brady',['étiqueteuse','cable'],'label-maker'),
    ],
  },

  // ── 24. Logiciels & Licences ───────────────────────────────────────────────
  {
    id: 'logiciels',
    name: 'Logiciels & Licences',
    icon: '💿',
    description: 'Licences Windows, Office, antivirus et logiciels professionnels',
    image: img('software-license'),
    products: [
      mkp('log1','Windows 11 Pro OEM','WIN11-PRO','Licence OEM Windows 11 Professionnel, clé + support',85000,'Microsoft',['windows','système'],'windows-11','Bestseller'),
      mkp('log2','Microsoft 365 Business (1 an)','M365-BIZ','1 an, 5 appareils, Teams, 1To OneDrive, Exchange',55000,'Microsoft',['office','365'],'microsoft-365'),
      mkp('log3','Adobe Creative Cloud 1 an','ADOBE-CC','Toutes les apps Adobe, 100Go cloud, 1 utilisateur/1 an',185000,'Adobe',['adobe','création'],'adobe-cc'),
      mkp('log4','Antivirus EDR Enterprise','AV-EDR','EDR endpoint, 10 licences, 1 an, dashboard central',85000,'CrowdStrike',['antivirus','edr'],'edr-antivirus'),
      mkp('log5','AutoCAD LT 2024 1 an','ACAD-LT','AutoCAD LT 2024, dessin 2D, nuage de points, 1 an',380000,'Autodesk',['autocad','cao'],'autocad'),
      mkp('log6','Licence Zoom Pro 1 an','ZOOM-PRO','Zoom Pro 1 an, réunions illimitées, 100 participants',85000,'Zoom',['zoom','visioconf'],'zoom'),
      mkp('log7','Sauvegarde Cloud 5To','BACK-5T','5To stockage cloud chiffré, versioning 90j, multi-OS',45000,'Backblaze',['sauvegarde','cloud'],'cloud-backup'),
      mkp('log8','VPN Business 10 Users','VPN-BIZ10','VPN professionnel 10 users, kill switch, no-log, 1 an',45000,'NordVPN Teams',['vpn','privacy'],'vpn-business'),
      mkp('log9','Windows Server 2022 STD','WINSRV-22','16 cœurs, 2 VMs, accès distant, AD, DHCP, DNS',485000,'Microsoft',['windows-server','ad'],'windows-server'),
      mkp('log10','Suite QGIS + licence support','QGIS-ENT','QGIS Enterprise, plugins, support 1 an, 5 postes',95000,'QGIS',['gis','cartographie'],'gis-software'),
      mkp('log11','Antivirus BitDefender GravityZone','BD-GZ','GravityZone 25 postes, EDR, sandbox, 1 an',125000,'BitDefender',['antivirus','25p'],'gravityzone'),
      mkp('log12','Logiciel Supervision PRTG','PRTG-500','PRTG 500 capteurs, monitoring réseau/cloud, 1 an',185000,'Paessler',['monitoring','prtg'],'prtg'),
      mkp('log13','Licence WinRAR Entreprise (×10)','WINRAR-10','10 licences WinRAR entreprise, à vie',15000,'RARlab',['compression','archivage'],'winrar'),
      mkp('log14','Suite Comptabilité Sage','SAGE-100','Sage 100 Comptabilité, 1 poste, mise à jour 1 an',380000,'Sage',['comptabilité','gestion'],'sage'),
      mkp('log15','Logiciel GMAO','GMAO-ENT','GMAO maintenance, gestion équipements, 5 utilisateurs',185000,'UpKeep',['gmao','maintenance'],'gmao-software'),
    ],
  },

  // ── 25. Matériel Médical Tech ──────────────────────────────────────────────
  {
    id: 'medical-tech',
    name: 'Matériel Médical Tech',
    icon: '🏥',
    description: 'Équipements médicaux connectés et matériel de télémédecine',
    image: img('medical-device'),
    products: [
      mkp('med1','Tensiomètre Connecté Bluetooth','TENS-BT','Mesure PA + fréquence cardiaque, BT, app, mémoire 120',22000,'Withings BPM Core',['tensiomètre','bluetooth'],'bp-monitor','Bestseller'),
      mkp('med2','Oxymètre de Pouls','OXY-PRO','SpO2 + fréquence cardiaque, OLED, alerte, USB, MD',15000,'Contec',['oxymètre','spo2'],'pulse-oximeter'),
      mkp('med3','ECG Portable 6 Pistes','ECG-6P','ECG 6 dérivations, Bluetooth, app iOS/Android, CE',125000,'AliveCor KardiaMobile',['ecg','cardiaque'],'ecg-device'),
      mkp('med4','Glucomètre Connecté','GLUCO-CON','Glycémie + cétones, NFC, 60s résultat, app santé',35000,'Abbott LibreLink',['glucomètre','diabète'],'glucometer'),
      mkp('med5','Stéthoscope Électronique','STETH-ELEC','Amplification 40x, enregistrement, Bluetooth, ANC',285000,'3M Littmann',['stéthoscope','auscultation'],'stethoscope'),
      mkp('med6','Balance Impédancemètre Médical','BAL-MED','18 paramètres corps, USB, DICOM, 200kg, CE',185000,'Tanita',['balance','bmi'],'medical-scale'),
      mkp('med7','Thermomètre Médical Infrarouge','THERM-MED','Front-oreille sans contact, 1s, mémo 35, fièvre alerte',12000,'Braun',['thermomètre','fièvre'],'medical-thermometer'),
      mkp('med8','Spiromètre Numérique','SPIRO','Spirométrie FVC/FEV1, Bluetooth, ATS standards, app',85000,'MIR',['spiromètre','respiratoire'],'spirometer'),
      mkp('med9','Chariot Hôpital PC','CHARIOT-PC','Chariot workstation hôpital, batterie chaude, VESA, lecteur CB',580000,'Ergotron',['chariot','hôpital'],'hospital-cart'),
      mkp('med10','Système Télémédecine','TELE-MED','Kit téléconsultation: cam HD, otoscope, dermoscope, hub',380000,'TytoCare',['télémédecine','kit'],'telemedicine-kit','Nouveau'),
      mkp('med11','Défibrillateur DAE','DAE','Défibrillateur externe automatique, voix bilingue, IP55',850000,'Philips HeartStart',['dae','urgence'],'aed'),
      mkp('med12','Lecteur Cardiaque ECG Holter','HOLTER','ECG Holter 24h, 12 dérivations, analyse auto, USB',185000,'Contec',['holter','ecg'],'holter-monitor'),
      mkp('med13','Brassard TA Ambulatoire MAPA','MAPA','Mesure ambulatoire 24h, mémoire 200, rapport PDF',125000,'Spacelabs',['mapa','tension'],'abpm-monitor'),
      mkp('med14','Gestion Cabinet Logiciel','LOG-CAB','Logiciel gestion patients, RDV, facturation CNAM, web',85000,'Doctolib',['logiciel','cabinet'],'clinic-software'),
      mkp('med15','Station Télétriage Covid+','TRIAGE','Température + masque + distanciation IA, borne 55"',680000,'Generic',['triage','ia','covid'],'triage-station'),
    ],
  },

  // ── 26. Formation & Certifications ────────────────────────────────────────
  {
    id: 'formation',
    name: 'Formation & Certifications',
    icon: '🎓',
    description: 'Formations IT, certifications Cisco, Microsoft et cyber',
    image: img('it-training'),
    products: [
      mkp('fm1','Formation CCNA Complet','CCNA-COMP','Préparation CCNA 200-301, 120h vidéo, labs, exam voucher',185000,'Cisco',['ccna','réseau'],'cisco-ccna','Bestseller'),
      mkp('fm2','Préparation CEH v12','CEH-V12','Certified Ethical Hacker v12, 40h, labs virtuels, exam',280000,'EC-Council',['ceh','pentest'],'ceh-cert'),
      mkp('fm3','Formation Azure AZ-900','AZ-900','Microsoft Azure Fundamentals, exam voucher inclus, 30h',95000,'Microsoft',['azure','cloud'],'azure-training'),
      mkp('fm4','Formation Python Cybersécurité','PY-CYBER','Python pour la cyber, 50h, scripts offensifs/défensifs',85000,'Udemy',['python','cyber'],'python-course'),
      mkp('fm5','Certification PMP®','PMP-CERT','Project Management Professional, 35h PDU, exam voucher',380000,'PMI',['pmp','gestion'],'pmp-cert'),
      mkp('fm6','Formation Linux LPI 1','LPI-1','Linux LPI 101+102, serveurs, shell, réseau, 80h',95000,'Linux Foundation',['linux','lpi'],'linux-training'),
      mkp('fm7','Formation CCTV IP Pro','CCTV-IP','Installation caméras IP, NVR, réseaux, 3 jours présentiel',125000,'Imani-Tech Academy',['cctv','installation'],'cctv-training'),
      mkp('fm8','Certification AWS SAA-C03','AWS-SAA','AWS Solutions Architect Associate, exam + labs, 60h',185000,'Amazon',['aws','architect'],'aws-cert'),
      mkp('fm9','Formation Fibre Optique','FIBRE-FORM','Soudure, raccordement FTTH, OTDR, 2 jours, TP inclus',125000,'Imani-Tech Academy',['fibre','soudure'],'fiber-training'),
      mkp('fm10','Formation VoIP Asterisk','VOIP-AST','Asterisk, FreePBX, SIP trunk, QoS, 3 jours, certificat',145000,'Imani-Tech Academy',['voip','asterisk'],'voip-training'),
      mkp('fm11','Certification CISSP','CISSP-CERT','Certified Info Security Professional, 8 domaines, exam',580000,'ISC²',['cissp','sécurité'],'cissp'),
      mkp('fm12','Formation Solaire Photovoltaïque','SOL-FORM','Installation PV, dimensionnement, 3 jours, certificat',145000,'Imani-Tech Academy',['solaire','installation'],'solar-training'),
      mkp('fm13','Formation Virtualisation VMware','VMWARE','vSphere 8, VCenter, HA/DRS/vMotion, 40h, exam prep',185000,'VMware',['vmware','virtualisation'],'vmware-training'),
      mkp('fm14','CompTIA Security+','SEC-PLUS','CompTIA Security+ SY0-701, 60h vidéo, exam voucher',185000,'CompTIA',['security+','certif'],'security-plus'),
      mkp('fm15','Formation ITIL 4 Foundation','ITIL-4','ITIL v4 Foundation, gestion des services IT, exam, 24h',125000,'Axelos',['itil','itsm'],'itil-training'),
    ],
  },

  // ── 27. Contrôle d'Accès & Biométrie ──────────────────────────────────────
  {
    id: 'controle-acces',
    name: 'Contrôle d\'Accès',
    icon: '🔐',
    description: 'Contrôle d\'accès biométrique, badges RFID et gestion du temps',
    image: img('access-control'),
    products: [
      mkp('ca1','Lecteur Biométrique Empreinte','BIO-EMP','Empreinte + RFID + code, 3000 utilisateurs, TCP/IP, Wiegand',85000,'ZKTeco',['biométrie','empreinte'],'fingerprint-reader-access','Bestseller'),
      mkp('ca2','Lecteur Facial 3D','BIO-FACE3D','Reconnaissance faciale 3D, masque, 1500 visages, PoE',185000,'HikVision',['facial','3d'],'face-reader'),
      mkp('ca3','Centrale Accès 4 Portes','CENT-4P','Contrôleur 4 portes, RS485, TCP/IP, anti-passback',125000,'HID',['contrôleur','4portes'],'access-controller'),
      mkp('ca4','Electro-Serrure Fail-Safe 12V','ESERRURE','Electro-serrure NO/NC, 600kg, 12/24V, acier inox',22000,'Generic',['serrure','électrique'],'electric-lock'),
      mkp('ca5','Badges RFID Mifare 13.56MHz (×50)','BADGE-RFID50','50 badges blancs Mifare Classic 1Ko, réécriture, 54×86mm',15000,'Generic',['badge','rfid','mifare'],'rfid-badges'),
      mkp('ca6','Pointeuse Biométrique','POINT-BIO','Empreinte + RFID + PIN, Web + USB, Excel/PDF, API',125000,'ZKTeco',['pointeuse','présence'],'time-attendance'),
      mkp('ca7','Serrure RFID Hôtel','SERRURE-HOTEL','Serrure hôtel RFID, Mifare/HID, DND, encodeur',85000,'Hafele',['hôtel','rfid'],'hotel-lock'),
      mkp('ca8','Tourniquet Triple Barre','TOURNI-3B','Tourniquet tripode, acier, lecteur RFID intégré, 120p/min',580000,'Magnetic',['tourniquet','barrière'],'turnstile'),
      mkp('ca9','Barrière Levante 3m','BARR-3M','Barrière levante 3m, moteur 24V, télécommande, boucle',380000,'FAAC',['barrière','parking'],'boom-barrier'),
      mkp('ca10','Interphone Vidéo 2 Fils','INTERPH-2F','Interphone vidéo 2 fils, écran 7" couleur, déverrouil.',95000,'Hikvision',['interphone','vidéo'],'video-intercom'),
      mkp('ca11','Logiciel Gestion Accès','LOG-ACCES','Logiciel contrôle accès 500 utilisateurs, rapports, API',85000,'ZKTeco',['logiciel','gestion'],'access-software'),
      mkp('ca12','Lecteur Veine de Doigt','BIO-VEINE','Biométrie veine de doigt, 3000 templates, spoofing-proof',285000,'Hitachi',['veine','biométrie'],'vein-reader'),
      mkp('ca13','Câble de Sécurité Kensington','KEN-SECU','Câble acier 1.8m, verrou 2 clés, loop Kensington',15000,'Kensington',['antivol','câble'],'security-cable'),
      mkp('ca14','Détecteur Métaux Portique','DETEC-PORT','Portique détecteur métaux 33 zones, sensibilité régl.',380000,'Garrett',['détecteur','portique'],'metal-detector'),
      mkp('ca15','Armoire Clés Connectée','ARM-CLES','Gestion 50 clés, RFID+code, TCP/IP, historique, alarme',185000,'Key Control',['clés','armoire'],'key-cabinet'),
    ],
  },

  // ── 28. Climatisation & Ventilation ───────────────────────────────────────
  {
    id: 'climatisation',
    name: 'Climatisation & Ventilation',
    icon: '❄️',
    description: 'Climatiseurs de précision pour datacenters et bureaux',
    image: img('air-conditioning'),
    products: [
      mkp('cl1','Climatiseur Précision Salle Serveurs','CLIM-PREC','12000 BTU de précision, humidification, ±0.1°C',1250000,'Stulz',['précision','serveurs'],'precision-ac','Bestseller'),
      mkp('cl2','Climatiseur Mural Inverter 12K','CLIM-12K','12000 BTU, inverter A+++, Wi-Fi, -15°C ext., réversible',285000,'Daikin',['inverter','climatiseur'],'split-ac'),
      mkp('cl3','Armoire Climatisation Rack','CLIM-RACK','Climatisation armoire rack 2kW, porte arrière, 19"',680000,'APC',['rack','refroidissement'],'rack-ac'),
      mkp('cl4','Ventilateur Rack 1U (×2)','VENT-RACK','Kit 2 ventilateurs 1U rack, thermostat, 230V, 60CFM',18000,'Generic',['ventilateur','rack'],'rack-fans'),
      mkp('cl5','Thermomètre/Hygromètre Data Center','THERM-DC','Sonde temp+humidité, alarme, LAN, SNMP, IP67',45000,'SensorPush',['capteur','datacenter'],'dc-sensor'),
      mkp('cl6','Système de Refroidissement Adiabatique','REFR-ADIAB','Refroidissement adiabatique 50kW, économie 70% énergie',4500000,'Munters',['adiabatique','green'],'adiabatic-cooling','Nouveau'),
      mkp('cl7','Pompe à Chaleur Air/Air 18K','PAC-18K','PAC réversible 18000 BTU, Wi-Fi, COP 4.5, A++',580000,'Mitsubishi',['pac','efficacité'],'heat-pump'),
      mkp('cl8','Climatiseur Portable 9000 BTU','CLIM-PORT','Clim portable 9000 BTU, drain continu, 2 vitesses',185000,'Olimpia',['portable','mobile'],'portable-ac'),
      mkp('cl9','Système Détection Fuite Eau','DET-FUITE','Détection fuite eau, câble 10m, alerte SMS+SNMP',45000,'Jandy',['détection','fuite'],'water-leak-sensor'),
      mkp('cl10','Grille de Plancher Dataroom','GRILLE-DC','Grille plancher technique 600×600mm, 35% ouverture',22000,'Generic',['plancher','technique'],'floor-tile'),
      mkp('cl11','Unité Extérieure VRV','VRV-EXT','Unité extérieure VRV 8HP, raccorde 10 unités int., R32',2850000,'Daikin',['vrv','multisplit'],'vrv-system'),
      mkp('cl12','Purificateur Air HEPA+UV','PURIF-HEPA','HEPA H14+UV-C+charbon actif, 120m², débit 800m³/h',185000,'IQAir',['purificateur','hepa'],'air-purifier'),
      mkp('cl13','Humidificateur Industriel','HUMID-IND','Humidificateur ultrasonique 12L/h, hygromètre, LAN',280000,'Carel',['humidificateur','industriel'],'industrial-humidifier'),
      mkp('cl14','Conduit de Soufflage Rack','CONDUIT-RACK','Conduit cheminée de soufflage rack 42U, redresse air',45000,'Generic',['cheminée','rack'],'chimney-kit'),
      mkp('cl15','Matelas d\'Étanchéité Rack','JOINT-RACK','Joint d\'étanchéité rack 42U haut/bas, aile d\'abeilles',15000,'Generic',['étanchéité','rack'],'rack-seal'),
    ],
  },

  // ── 29. Électricité & Installation ────────────────────────────────────────
  {
    id: 'electricite',
    name: 'Électricité & Installation',
    icon: '🔌',
    description: 'Matériel électrique, tableaux, câblage et installation',
    image: img('electrical-panel'),
    products: [
      mkp('el1','Tableau Électrique 24 Modules','TABLEAU-24','Coffret tableau 24 modules, IP40, PE, avec porte',35000,'Schneider',['tableau','coffret'],'electrical-panel','Bestseller'),
      mkp('el2','Disjoncteur Différentiel 40A 30mA','DIF-40A','DDR 40A type A 30mA, 4 pôles, courbe C',15000,'Legrand',['disjoncteur','différentiel'],'rcd-breaker'),
      mkp('el3','Câble H07VU 2.5mm² 100m','H07VU-25','Câble souple H07V-U 2.5mm², 100m, gaine blanche',22000,'Nexans',['câble','2.5mm'],'electric-cable'),
      mkp('el4','Prise de Courant Type E+T','PRISE-ET','Prise 16A 250V type E+F, encastrée, enjoliveur blanc',2500,'Legrand',['prise','type-e'],'socket-outlet'),
      mkp('el5','Interrupteur Va-et-Vient','INTER-VV','Interrupteur bipolaire va-et-vient, 10A, blanc',2000,'Schneider',['interrupteur','va-et-vient'],'light-switch'),
      mkp('el6','Compteur d\'Énergie 3 Phases','CPT-3P','Compteur énergie 3P+N 100A, MID, impulsions, RS485',45000,'Eastron',['compteur','3phases'],'3phase-meter'),
      mkp('el7','Câble LSZH 4×6mm² 100m','LSZH-4X6','Câble zéro halogène, 4×6mm², 100m, rouge/noir/bleu/vert',85000,'Draka',['lszh','multifilaire'],'lszh-cable'),
      mkp('el8','Borne de Recharge VE 22kW','BORNE-VE','Borne IRVE type 2, 22kW, RFID, connectée, IP55',380000,'Schneider EVlink',['borne','ev'],'ev-charger','Nouveau'),
      mkp('el9','Armoire de Distribution IP65','ARM-DIST','Armoire polyester IP65, 600×400×200, montagePlaque',85000,'Legrand',['armoire','ip65'],'distribution-box'),
      mkp('el10','Disjoncteur Magnétothermique 63A','DISCO-63A','Disjoncteur 63A 4P courbe C, 10kA, DIN',12000,'Hager',['disjoncteur','63a'],'mcb-breaker'),
      mkp('el11','Prise Industrielle 32A 3P+N+T','PRISE-IND32','Prise industrielle IP67, 32A 400V 3P+N+T, rouge',15000,'Legrand',['prise','industrielle','32a'],'industrial-socket'),
      mkp('el12','Câblette Tresse Cuivre 16mm²','TERRE-16','Tresse cuivre souple 16mm² 10m, mise à la terre',18000,'Generic',['terre','cuivre'],'earth-cable'),
      mkp('el13','Transformateur Séparation 1kVA','TRANSF-1K','Transformateur isolation 1kVA 230V/230V, PELV, rack',85000,'Hahn',['transformateur','isolation'],'isolation-transformer'),
      mkp('el14','Détecteur de Présence Infrarouge','DET-PRES','Détecteur PIR encastré plafond, 360°, 8m, ON/OFF/AUTO',8000,'Legrand',['détecteur','pir'],'presence-detector'),
      mkp('el15','Variateur de Lumière LED 400W','VARIAT-LED','Variateur encastré LED 400W, sans neutre, silencieux',15000,'Schneider',['variateur','led'],'dimmer'),
    ],
  },

  // ── 30. Matériel Bureau & Ergonomie ───────────────────────────────────────
  {
    id: 'bureau',
    name: 'Matériel Bureau & Ergonomie',
    icon: '🪑',
    description: 'Mobilier bureau ergonomique, chaises et équipements de travail',
    image: img('office-ergonomics'),
    products: [
      mkp('bu1','Bureau Assis-Debout Électrique','BUREAU-AD','Moteur double, mémoire 4 positions, 120×60cm, anti-pincement',285000,'Flexispot',['assis-debout','ergonomie'],'standing-desk','Bestseller'),
      mkp('bu2','Chaise de Bureau Ergonomique Pro','CHAISE-ERG','Lombaire réglable, accoudoirs 4D, maille filet, 150kg',185000,'Herman Miller',['chaise','ergonomie'],'ergonomic-chair'),
      mkp('bu3','Support Laptop + Dock USB-C','SUPP-DOCK','Support alu + hub USB-C 11-en-1, HDMI 4K, 100W PD',85000,'Anker',['dock','support'],'laptop-dock'),
      mkp('bu4','Éclaireuse LED Bureau','ECLAIR-LED','Lampe bureau LED 24W, 3000-6500K, gradable, USB-A,sans scintillement',25000,'BenQ',['lampe','led'],'desk-lamp'),
      mkp('bu5','Repose-Pieds Ergonomique','REPOS-PIED','Repose-pieds réglable, balancement, moquette, 3 hauteurs',22000,'Kensington',['repose-pieds','ergonomie'],'footrest'),
      mkp('bu6','Organisateur de Bureau Bambou','ORG-BAMBOU','5 compartiments bambou, chargeur wireless 15W intégré',35000,'Generic',['organisation','bambou'],'desk-organizer'),
      mkp('bu7','Tapis Anti-Fatigue 60×90cm','TAPIS-AF','Mousse EVA 20mm, bords chanfreinés, lavable, anti-dérap.',18000,'Ergodriven',['anti-fatigue','debout'],'anti-fatigue-mat'),
      mkp('bu8','Webcam + Micro Conférence 4K','WEB-CONF4K','Cam 4K + micro directif, Teams/Zoom, USB-C, clip écran',85000,'Anker PowerConf',['webcam','réunion'],'conference-webcam'),
      mkp('bu9','Casque Anti-Bruit Open Office','CASQ-OFFICE','ANC hybride, transparence, 20h, USB-C + jack, léger',125000,'Jabra Evolve2',['casque','uc'],'office-headset'),
      mkp('bu10','Destructeur Documents Pro','DESTR-PRO','Coupe croisée P-4, 10 feuilles/pass, carte + CD, 22L',65000,'Fellowes',['destructeur','sécurité'],'paper-shredder'),
      mkp('bu11','Massicot A4 Pro','MASSICOT-A4','Massicot 40 feuilles, règle aimantée, lame safety, A4',35000,'Dahle',['massicot','découpe'],'paper-cutter'),
      mkp('bu12','Tableau Blanc Magnétique 120×90','TABLEAU-BLANC','120×90cm, émaillé, effaçable à sec, cadre aluminium',45000,'Nobo',['tableau','blanc'],'whiteboard'),
      mkp('bu13','Scanner de Cartes de Visite','SCAN-CDV','Scan 1000 cartes/h, OCR 27 langues, USB+Wi-Fi, CRM',85000,'IRIScard',['scanner','cartes'],'business-card-scanner'),
      mkp('bu14','Afficheur Client USB 2×20','AFF-CLIENT','Afficheur caissier USB 2 lignes 20 caractères, pilotes',18000,'Generic',['afficheur','pos'],'customer-display'),
      mkp('bu15','Tiroir-Caisse USB RJ12','TIROIR-CAISSE','Tiroir-caisse 410×415mm, 4 billets 8 pièces, USB+RJ12',45000,'APG',['caisse','tiroir'],'cash-drawer'),
    ],
  },
];

// ─── PARTENAIRES ──────────────────────────────────────────────────────────────
export const PARTNERS = [
  'Cisco', 'Huawei', 'HP', 'Dell', 'Hikvision', 'Dahua', 'TP-Link',
  'Ubiquiti', 'MikroTik', 'Fortinet', 'Palo Alto Networks', 'Schneider Electric',
  'APC by Schneider', 'Samsung', 'LG', 'Apple', 'Lenovo', 'Netgear',
  'Aruba Networks', 'Juniper Networks', 'Axis Communications', 'Bosch Security',
  'Legrand', 'Siemens', 'ABB', 'ZKTeco', 'Yealink', 'Grandstream',
  'Growatt', 'Victron Energy', 'Eaton', 'Vertiv', 'Rittal', 'Panduit',
];

export const WHATSAPP_ORDER_NUMBER = '+237672777657';
export const ORANGE_MONEY_NUMBER = '+237695900362';
export const MTN_MOMO_NUMBER = '+237672777657';
