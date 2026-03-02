import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  ShoppingCart, X, Star, ChevronRight, ChevronDown, ChevronLeft,
  Search, Check, ArrowRight, Minus, Plus, ShieldCheck, Truck,
  RotateCcw, Smartphone, MapPin, Package, Filter, Globe, SlidersHorizontal,
  Tag, Zap, TrendingUp, Award, ChevronUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';
import { WHATSAPP_LINK } from '../data';
import {
  SHOP_CATEGORIES, ShopProduct, ShopCategory,
  PARTNERS, WHATSAPP_ORDER_NUMBER, ORANGE_MONEY_NUMBER, MTN_MOMO_NUMBER
} from '../shopData';

// ─── UTILS ───────────────────────────────────────────────────────────────────
const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA';

const Stars = ({ rating, size = 12 }: { rating: number; size?: number }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map(i => (
      <Star key={i} size={size}
        className={i <= Math.round(rating) ? 'text-brand-orange fill-brand-orange' : 'text-brand-sand'} />
    ))}
  </div>
);

// ─── PANIER ───────────────────────────────────────────────────────────────────
interface CartItem { product: ShopProduct; qty: number; category: string; }

// ─── COMPOSANT CARTE PRODUIT ──────────────────────────────────────────────────
const ProductCard: React.FC<{
  product: ShopProduct;
  category: string;
  onView: (p: ShopProduct, cat: string) => void;
  onAdd: (p: ShopProduct, cat: string) => void;
}> = ({ product: p, category, onView, onAdd }) => (
  <div
    onClick={() => onView(p, category)}
    className="bg-white rounded-[2rem] border-2 border-brand-sand hover:border-brand-orange shadow-sm hover:shadow-xl transition-all group flex flex-col cursor-pointer relative overflow-hidden"
  >
    {p.badge && (
      <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-lg ${
        p.badge === 'Promo' ? 'bg-red-500' :
        p.badge === 'Nouveau' ? 'bg-green-500' :
        p.badge === 'Bestseller' ? 'bg-brand-orange' : 'bg-brand-stone'
      }`}>{p.badge}</div>
    )}
    {p.oldPrice && (
      <div className="absolute top-3 right-3 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-[9px] font-black">
        -{Math.round((1 - p.price / p.oldPrice) * 100)}%
      </div>
    )}

    <div className="w-full h-44 overflow-hidden rounded-t-[1.8rem] bg-brand-beige/30">
      <img
        src={p.image}
        alt={p.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>

    <div className="p-5 flex flex-col flex-grow">
      <span className="text-[9px] font-black uppercase tracking-widest text-brand-orange mb-1">{p.brand}</span>
      <h3 className="text-sm font-black text-brand-stone uppercase tracking-tight mb-2 leading-tight group-hover:text-brand-orange transition-colors line-clamp-2">{p.name}</h3>
      <p className="text-brand-stone/50 text-[11px] font-bold leading-relaxed mb-3 line-clamp-2 flex-grow">{p.description}</p>

      <div className="flex items-center gap-2 mb-3">
        <Stars rating={p.rating} />
        <span className="text-[9px] text-brand-stone/40 font-bold">({p.reviews})</span>
      </div>

      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="text-lg font-black text-brand-stone tracking-tighter">{fmt(p.price)}</div>
          {p.oldPrice && <div className="text-[10px] text-brand-stone/30 line-through font-bold">{fmt(p.oldPrice)}</div>}
        </div>
        <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${
          p.stock <= 5 ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'
        }`}>
          {p.stock <= 5 ? `${p.stock} restants` : 'En stock'}
        </span>
      </div>

      <button
        onClick={e => { e.stopPropagation(); onAdd(p, category); }}
        className="w-full bg-brand-orange text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-stone transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20"
      >
        <ShoppingCart size={13} />
        Ajouter au panier
      </button>
    </div>
  </div>
);

// ─── PAGE PRINCIPALE ──────────────────────────────────────────────────────────
const ShopPage: React.FC = () => {

  // ── États principaux
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'new' | 'rating'>('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [filterBadge, setFilterBadge] = useState<string>('');
  const [filterBrand, setFilterBrand] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  // ── Panier
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // ── Modales
  const [selectedProduct, setSelectedProduct] = useState<{ product: ShopProduct; category: string } | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // ── Checkout
  const [payMethod, setPayMethod] = useState<'mtn' | 'orange'>('mtn');
  const [payPhone, setPayPhone] = useState('');
  const [txCode, setTxCode] = useState('');
  const [deliveryMode, setDeliveryMode] = useState<'livraison' | 'retrait'>('livraison');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [orderDone, setOrderDone] = useState(false);

  const cartCount = cart.reduce((a, i) => a + i.qty, 0);
  const cartTotal = cart.reduce((a, i) => a + i.product.price * i.qty, 0);

  // ── Logique filtre & tri
  const allProducts = useMemo(() => {
    const cat = activeCategory === 'all'
      ? SHOP_CATEGORIES
      : SHOP_CATEGORIES.filter(c => c.id === activeCategory);

    let prods: { product: ShopProduct; category: string }[] = [];
    cat.forEach(c => c.products.forEach(p => prods.push({ product: p, category: c.name })));

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      prods = prods.filter(({ product: p }) =>
        p.name.toLowerCase().includes(q) ||
        p.ref.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    prods = prods.filter(({ product: p }) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (filterBadge) prods = prods.filter(({ product: p }) => p.badge === filterBadge);
    if (filterBrand) prods = prods.filter(({ product: p }) => p.brand === filterBrand);

    switch (sortBy) {
      case 'price-asc':   prods.sort((a, b) => a.product.price - b.product.price); break;
      case 'price-desc':  prods.sort((a, b) => b.product.price - a.product.price); break;
      case 'rating':      prods.sort((a, b) => b.product.rating - a.product.rating); break;
      case 'new':         prods.sort((a, b) => (b.product.badge === 'Nouveau' ? 1 : 0) - (a.product.badge === 'Nouveau' ? 1 : 0)); break;
      default:            prods.sort((a, b) => (b.product.badge === 'Bestseller' ? 1 : 0) - (a.product.badge === 'Bestseller' ? 1 : 0)); break;
    }

    return prods;
  }, [activeCategory, searchQuery, sortBy, priceRange, filterBadge, filterBrand]);

  const allBrands = useMemo(() => {
    const brands = new Set<string>();
    SHOP_CATEGORIES.forEach(c => c.products.forEach(p => brands.add(p.brand)));
    return Array.from(brands).sort();
  }, []);

  // ── Panier actions
  const addToCart = (product: ShopProduct, category: string) => {
    setCart(prev => {
      const ex = prev.find(i => i.product.id === product.id);
      if (ex) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1, category }];
    });
    setCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => i.product.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));
  };

  // ── Génération message WhatsApp
  const buildWhatsAppMessage = () => {
    const lines = [
      `*🛒 COMMANDE IMANI-TECH BOUTIQUE*`,
      `━━━━━━━━━━━━━━━━━━━━━`,
      `*Moyen de paiement :* ${payMethod === 'mtn' ? 'MTN Mobile Money' : 'Orange Money'}`,
      `*Numéro de paiement :* ${payPhone}`,
      `*Code de transaction :* ${txCode}`,
      `━━━━━━━━━━━━━━━━━━━━━`,
      `*ARTICLES COMMANDÉS :*`,
      ...cart.map(i => `• ${i.product.name} (×${i.qty}) — ${fmt(i.product.price * i.qty)}`),
      `━━━━━━━━━━━━━━━━━━━━━`,
      `*TOTAL :* ${fmt(cartTotal)}`,
      `*Livraison :* ${deliveryMode === 'livraison' ? `Livraison à domicile — ${deliveryAddress}` : 'Retrait au siège Imani-Tech'}`,
    ];
    return encodeURIComponent(lines.join('\n'));
  };

  const handleConfirmOrder = () => {
    if (!txCode || !payPhone) return;
    if (deliveryMode === 'livraison' && !deliveryAddress) return;
    const waUrl = `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${buildWhatsAppMessage()}`;
    window.open(waUrl, '_blank');
    setOrderDone(true);
  };

  return (
    <div className="bg-brand-cream min-h-screen pt-24 page-appear">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4 relative overflow-hidden border-b border-brand-sand">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Boutique Officielle</span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[0.9] text-brand-stone">
            {SHOP_CATEGORIES.length} Catégories<br /><span className="text-brand-orange">d'Équipements Pro</span>
          </h1>
          <p className="text-lg text-brand-stone/60 max-w-2xl mx-auto font-bold leading-relaxed mb-8">
            {SHOP_CATEGORIES.reduce((acc, c) => acc + c.products.length, 0)}+ produits sélectionnés et garantis. Paiement Mobile Money sécurisé. Livraison Cameroun.
          </p>

          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto relative">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-stone/30" />
            <input
              type="text"
              placeholder="Rechercher par nom, référence, marque, mot-clé..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-brand-sand focus:border-brand-orange outline-none font-bold text-brand-stone bg-white shadow-xl transition-all text-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-stone/30 hover:text-brand-orange">
                <X size={18} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[['🚚','Livraison 24-48h'],['🔒','Paiement Sécurisé'],['🔁','Retour 7 jours'],['⭐','Produits Certifiés']].map(([icon, label]) => (
              <div key={label as string} className="flex items-center gap-2 text-brand-stone/50 font-black text-[10px] uppercase tracking-widest">
                <span>{icon}</span><span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-orange/5 blur-[100px] rounded-full" />
      </section>

      {/* ── BANDEAU PARTENAIRES ───────────────────────────────────────────── */}
      <div className="bg-brand-stone py-3 overflow-hidden border-y border-brand-orange/20">
        <div className="flex whitespace-nowrap" style={{ animation: 'tickerScroll 35s linear infinite' }}>
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <span key={i} className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50 mr-10 hover:text-brand-orange transition-colors">
              ✦ {p}
            </span>
          ))}
        </div>
      </div>

      {/* ── NAV CATÉGORIES + FILTRES ─────────────────────────────────────── */}
      <section className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-xl border-b border-brand-sand shadow-sm">

        {/* Ligne 1 : catégories */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveCategory('all')}
            className={`shrink-0 px-5 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest border-2 transition-all ${activeCategory === 'all' ? 'bg-brand-stone text-white border-brand-stone' : 'border-brand-sand text-brand-stone hover:border-brand-orange'}`}
          >
            Tous ({SHOP_CATEGORIES.reduce((a, c) => a + c.products.length, 0)})
          </button>

          {SHOP_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest border-2 transition-all ${activeCategory === cat.id ? 'bg-brand-orange text-white border-brand-orange' : 'border-brand-sand text-brand-stone hover:border-brand-orange'}`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Ligne 2 : tri + filtres + panier */}
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3 border-t border-brand-sand/30">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-brand-stone/40 uppercase hidden sm:block">
              {allProducts.length} résultat{allProducts.length > 1 ? 's' : ''}
            </span>

            {/* Tri */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="text-[10px] font-black uppercase tracking-widest border-2 border-brand-sand rounded-full px-4 py-2 bg-white text-brand-stone focus:border-brand-orange outline-none cursor-pointer"
            >
              <option value="popular">Popularité</option>
              <option value="rating">Mieux notés</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="new">Nouveautés</option>
            </select>

            {/* Bouton filtres */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest border-2 transition-all ${showFilters ? 'bg-brand-stone text-white border-brand-stone' : 'border-brand-sand text-brand-stone hover:border-brand-orange'}`}
            >
              <SlidersHorizontal size={13} />
              Filtres
            </button>
          </div>

          {/* Bouton panier */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 bg-brand-orange text-white px-5 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-brand-stone transition-all shadow-lg"
          >
            <ShoppingCart size={14} />
            <span className="hidden sm:inline">Panier</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-brand-orange rounded-full text-[9px] font-black flex items-center justify-center border-2 border-brand-orange">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Panneau filtres avancés */}
        {showFilters && (
          <div className="border-t border-brand-sand/30 bg-brand-beige/30 px-4 py-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Prix */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40 mb-2">Budget max</p>
                <input
                  type="range"
                  min={0} max={2000000} step={10000}
                  value={priceRange[1]}
                  onChange={e => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-brand-orange"
                />
                <p className="text-[10px] font-black text-brand-orange mt-1">≤ {fmt(priceRange[1])}</p>
              </div>

              {/* Badge */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40 mb-2">Statut</p>
                <div className="flex flex-wrap gap-2">
                  {['Nouveau', 'Bestseller', 'Promo', 'Stock limité'].map(b => (
                    <button
                      key={b}
                      onClick={() => setFilterBadge(filterBadge === b ? '' : b)}
                      className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase border-2 transition-all ${filterBadge === b ? 'bg-brand-orange text-white border-brand-orange' : 'border-brand-sand text-brand-stone hover:border-brand-orange'}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Marque */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40 mb-2">Marque</p>
                <select
                  value={filterBrand}
                  onChange={e => setFilterBrand(e.target.value)}
                  className="w-full text-[10px] font-black uppercase border-2 border-brand-sand rounded-xl px-3 py-2 bg-white text-brand-stone focus:border-brand-orange outline-none"
                >
                  <option value="">Toutes les marques</option>
                  {allBrands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            {(filterBadge || filterBrand || priceRange[1] < 2000000) && (
              <button
                onClick={() => { setFilterBadge(''); setFilterBrand(''); setPriceRange([0, 2000000]); }}
                className="mt-3 text-[9px] font-black uppercase tracking-widest text-brand-orange hover:underline"
              >
                ✕ Effacer les filtres
              </button>
            )}
          </div>
        )}
      </section>

      {/* ── GRILLE PRODUITS ──────────────────────────────────────────────── */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {allProducts.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <span className="text-6xl">🔍</span>
              <p className="text-brand-stone/40 font-black uppercase text-sm tracking-widest">Aucun produit trouvé</p>
              <button onClick={() => { setSearchQuery(''); setFilterBadge(''); setFilterBrand(''); setPriceRange([0,2000000]); }} className="text-brand-orange font-black text-[10px] uppercase tracking-widest hover:underline">
                Effacer les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allProducts.map(({ product, category }) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  category={category}
                  onView={(p, cat) => setSelectedProduct({ product: p, category: cat })}
                  onAdd={addToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── MODAL PRODUIT ────────────────────────────────────────────────── */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-stone/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden border border-brand-sand animate-in zoom-in duration-300">
            <div className="bg-brand-stone p-6 sm:p-10 text-white flex justify-between items-start shrink-0 border-b-4 border-brand-orange">
              <div>
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-orange block mb-1">{selectedProduct.category} • {selectedProduct.product.brand}</span>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter leading-tight max-w-xl">{selectedProduct.product.name}</h2>
                <p className="text-white/40 text-[10px] font-bold uppercase mt-1">Réf: {selectedProduct.product.ref}</p>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="w-10 h-10 bg-white/10 hover:bg-brand-orange rounded-full flex items-center justify-center transition-all shrink-0 ml-4">
                <X size={18} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Image + prix + actions */}
                <div className="space-y-5">
                  <div className="w-full h-64 rounded-2xl overflow-hidden bg-brand-beige/30">
                    <img src={selectedProduct.product.image} alt={selectedProduct.product.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="p-5 bg-brand-beige/50 rounded-2xl border border-brand-sand">
                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-orange block mb-1">Prix</span>
                    <div className="text-3xl font-black text-brand-stone tracking-tighter">{fmt(selectedProduct.product.price)}</div>
                    {selectedProduct.product.oldPrice && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-brand-stone/30 line-through font-bold">{fmt(selectedProduct.product.oldPrice)}</span>
                        <span className="text-red-500 font-black text-[10px]">-{Math.round((1 - selectedProduct.product.price/selectedProduct.product.oldPrice)*100)}%</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Stars rating={selectedProduct.product.rating} size={16} />
                    <span className="text-[10px] font-black text-brand-stone/40">{selectedProduct.product.rating}/5 ({selectedProduct.product.reviews} avis)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase ${
                      selectedProduct.product.stock <= 5 ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'
                    }`}>
                      {selectedProduct.product.stock <= 5 ? `⚠ ${selectedProduct.product.stock} en stock` : '✓ En stock'}
                    </span>
                  </div>

                  <button
                    onClick={() => { addToCart(selectedProduct.product, selectedProduct.category); setSelectedProduct(null); }}
                    className="w-full bg-brand-orange text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-brand-stone transition-all shadow-xl flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    Ajouter au panier
                  </button>
                </div>

                {/* Description + tags */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-stone/40 mb-3">Description</h4>
                    <p className="text-brand-stone/70 font-bold text-sm leading-relaxed">{selectedProduct.product.description}</p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-stone/40 mb-3">Mots-clés</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.product.tags.map(tag => (
                        <span key={tag} onClick={() => { setSearchQuery(tag); setSelectedProduct(null); }}
                          className="px-3 py-1 bg-brand-beige rounded-full text-[9px] font-black uppercase tracking-widest text-brand-orange border border-brand-sand hover:bg-brand-orange hover:text-white cursor-pointer transition-all">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-brand-beige/50 p-5 rounded-2xl border border-brand-sand space-y-3">
                    <div className="flex items-center gap-3">
                      <Truck size={16} className="text-brand-orange" />
                      <span className="text-[11px] font-black uppercase tracking-tight text-brand-stone/70">Livraison Yaoundé & environs 24-48h</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <RotateCcw size={16} className="text-brand-orange" />
                      <span className="text-[11px] font-black uppercase tracking-tight text-brand-stone/70">Retour gratuit sous 7 jours</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={16} className="text-brand-orange" />
                      <span className="text-[11px] font-black uppercase tracking-tight text-brand-stone/70">Garantie Imani-Tech certifiée</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── PANIER LATÉRAL ───────────────────────────────────────────────── */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-brand-stone/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl" style={{ animation: 'slideInFromRight 0.35s ease both' }}>
            <div className="bg-brand-stone p-6 text-white flex justify-between items-center border-b-4 border-brand-orange shrink-0">
              <div>
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-orange block mb-0.5">Imani-Tech</span>
                <h2 className="text-xl font-black uppercase tracking-tighter">Mon Panier ({cartCount})</h2>
              </div>
              <button onClick={() => setCartOpen(false)} className="w-10 h-10 bg-white/10 hover:bg-brand-orange rounded-full flex items-center justify-center transition-all">
                <X size={18} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <span className="text-5xl">🛒</span>
                  <p className="text-brand-stone/40 font-black uppercase text-[10px] tracking-widest">Votre panier est vide</p>
                  <button onClick={() => setCartOpen(false)} className="text-brand-orange font-black text-[10px] uppercase tracking-widest hover:underline">
                    Continuer mes achats
                  </button>
                </div>
              ) : cart.map(item => (
                <div key={item.product.id} className="bg-brand-beige/50 p-4 rounded-2xl border border-brand-sand flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-brand-sand shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-tight text-brand-stone truncate">{item.product.name}</p>
                    <p className="text-[10px] font-black text-brand-orange">{fmt(item.product.price)}</p>
                    <p className="text-[9px] text-brand-stone/30 uppercase">{item.category}</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <button onClick={() => updateQty(item.product.id, 1)} className="w-7 h-7 rounded-lg bg-brand-orange/10 hover:bg-brand-orange hover:text-white text-brand-orange flex items-center justify-center transition-all">
                      <Plus size={12} />
                    </button>
                    <span className="text-[11px] font-black text-brand-stone w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.product.id, -1)} className="w-7 h-7 rounded-lg bg-brand-sand/50 hover:bg-red-100 hover:text-red-500 text-brand-stone/50 flex items-center justify-center transition-all">
                      <Minus size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t border-brand-sand shrink-0 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-stone/40">Total</span>
                  <span className="text-2xl font-black text-brand-stone tracking-tighter">{fmt(cartTotal)}</span>
                </div>
                <button
                  onClick={() => { setCartOpen(false); setCheckoutOpen(true); setCheckoutStep(1); setOrderDone(false); }}
                  className="w-full bg-brand-orange text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-brand-stone transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  <Smartphone size={16} />
                  Passer la commande
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── CHECKOUT ─────────────────────────────────────────────────────── */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-brand-stone/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 max-h-[95vh] flex flex-col">
            <div className="bg-brand-stone p-6 text-white border-b-4 border-brand-orange flex justify-between items-center shrink-0">
              <div>
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-orange block mb-0.5">
                  {orderDone ? 'Commande envoyée' : `Étape ${checkoutStep}/3`}
                </span>
                <h2 className="text-xl font-black uppercase tracking-tighter">
                  {orderDone ? '✓ Commande Confirmée' : checkoutStep === 1 ? 'Paiement Mobile Money' : checkoutStep === 2 ? 'Livraison' : 'Confirmation'}
                </h2>
              </div>
              <button onClick={() => setCheckoutOpen(false)} className="w-10 h-10 bg-white/10 hover:bg-brand-orange rounded-full flex items-center justify-center transition-all">
                <X size={18} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-5">
              {orderDone ? (
                // ── Confirmation finale
                <div className="text-center space-y-6 py-4">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto border-2 border-green-200">
                    <Check size={36} className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-brand-stone mb-2">Commande Envoyée !</h3>
                    <p className="text-brand-stone/60 font-bold text-sm leading-relaxed">
                      Votre commande a été transmise sur WhatsApp à l'équipe Imani-Tech. Nous vous contacterons dans les plus brefs délais pour confirmer la livraison.
                    </p>
                  </div>
                  <div className="bg-brand-beige/50 p-5 rounded-2xl border border-brand-sand text-left space-y-2">
                    <p className="text-[9px] font-black uppercase tracking-widest text-brand-orange">Récapitulatif</p>
                    <p className="font-black text-brand-stone text-lg">{fmt(cartTotal)}</p>
                    <p className="text-[11px] font-bold text-brand-stone/50 uppercase">{payMethod === 'mtn' ? 'MTN MoMo' : 'Orange Money'} • Code: {txCode}</p>
                  </div>
                  <button onClick={() => { setCheckoutOpen(false); setCart([]); setOrderDone(false); }}
                    className="w-full bg-brand-stone text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-brand-orange transition-all">
                    Retour à la boutique
                  </button>
                </div>
              ) : checkoutStep === 1 ? (
                // ── Étape 1 : Paiement
                <>
                  {/* Récap commande */}
                  <div className="bg-brand-beige/50 p-4 rounded-2xl border border-brand-sand">
                    <p className="text-[9px] font-black uppercase tracking-widest text-brand-orange mb-2">Votre commande</p>
                    {cart.map(i => (
                      <div key={i.product.id} className="flex justify-between text-[10px] font-bold text-brand-stone/70 py-1 border-b border-brand-sand/50 last:border-0">
                        <span>{i.product.name} ×{i.qty}</span>
                        <span className="font-black text-brand-stone">{fmt(i.product.price * i.qty)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between mt-3 pt-2 border-t border-brand-sand">
                      <span className="font-black uppercase text-[10px] tracking-widest text-brand-stone/40">Total</span>
                      <span className="font-black text-xl text-brand-stone">{fmt(cartTotal)}</span>
                    </div>
                  </div>

                  {/* Choix opérateur */}
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40 mb-3">1. Choisir l'opérateur</p>
                    <div className="grid grid-cols-2 gap-3">
                      {(['mtn', 'orange'] as const).map(op => (
                        <button key={op} onClick={() => setPayMethod(op)}
                          className={`p-4 rounded-2xl border-2 font-black text-[10px] uppercase tracking-wider flex flex-col items-center gap-2 transition-all ${payMethod === op ? 'border-brand-orange bg-brand-orange/5 text-brand-orange' : 'border-brand-sand text-brand-stone/50 hover:border-brand-orange/50'}`}
                        >
                          <span className="text-2xl">{op === 'mtn' ? '🟡' : '🟠'}</span>
                          <span>{op === 'mtn' ? 'MTN MoMo' : 'Orange Money'}</span>
                          <span className="text-[8px] font-bold opacity-60">{op === 'mtn' ? MTN_MOMO_NUMBER : ORANGE_MONEY_NUMBER}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Instructions paiement */}
                  <div className="bg-brand-orange/5 p-4 rounded-2xl border border-brand-orange/20">
                    <p className="text-[9px] font-black uppercase tracking-widest text-brand-orange mb-2">2. Effectuez le paiement</p>
                    <p className="text-[11px] font-bold text-brand-stone/60 leading-relaxed">
                      Envoyez <strong className="text-brand-stone">{fmt(cartTotal)}</strong> au numéro{' '}
                      <strong className="text-brand-orange">{payMethod === 'mtn' ? MTN_MOMO_NUMBER : ORANGE_MONEY_NUMBER}</strong>{' '}
                      via {payMethod === 'mtn' ? 'MTN Mobile Money' : 'Orange Money'}.
                    </p>
                  </div>

                  {/* Numéro payeur */}
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40 mb-2">3. Votre numéro de paiement</p>
                    <input
                      type="tel"
                      placeholder="Ex: 6XX XXX XXX"
                      value={payPhone}
                      onChange={e => setPayPhone(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-brand-sand focus:border-brand-orange outline-none font-black text-brand-stone text-sm bg-brand-beige/30 transition-all"
                    />
                  </div>

                  {/* Code transaction */}
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40 mb-2">4. Code de confirmation reçu</p>
                    <input
                      type="text"
                      placeholder="Entrez le code de transaction"
                      value={txCode}
                      onChange={e => setTxCode(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-brand-sand focus:border-brand-orange outline-none font-black text-brand-stone text-sm bg-brand-beige/30 transition-all"
                    />
                  </div>

                  <button
                    onClick={() => setCheckoutStep(2)}
                    disabled={!payPhone || !txCode}
                    className="w-full bg-brand-orange text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-brand-stone transition-all shadow-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Étape suivante <ChevronRight size={16} />
                  </button>
                </>
              ) : checkoutStep === 2 ? (
                // ── Étape 2 : Livraison
                <>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40 mb-3">Mode de livraison</p>
                    <div className="grid grid-cols-2 gap-3">
                      {(['livraison', 'retrait'] as const).map(mode => (
                        <button key={mode} onClick={() => setDeliveryMode(mode)}
                          className={`p-4 rounded-2xl border-2 font-black text-[10px] uppercase tracking-wider flex flex-col items-center gap-2 transition-all ${deliveryMode === mode ? 'border-brand-orange bg-brand-orange/5 text-brand-orange' : 'border-brand-sand text-brand-stone/50 hover:border-brand-orange/50'}`}
                        >
                          <span className="text-2xl">{mode === 'livraison' ? '🚚' : '🏢'}</span>
                          <span>{mode === 'livraison' ? 'À domicile' : 'Retrait siège'}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {deliveryMode === 'livraison' && (
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40 mb-2">Adresse de livraison</p>
                      <textarea
                        placeholder="Quartier, rue, repère, ville..."
                        value={deliveryAddress}
                        onChange={e => setDeliveryAddress(e.target.value)}
                        rows={3}
                        className="w-full px-5 py-4 rounded-2xl border-2 border-brand-sand focus:border-brand-orange outline-none font-bold text-brand-stone text-sm bg-brand-beige/30 transition-all resize-none"
                      />
                    </div>
                  )}

                  {deliveryMode === 'retrait' && (
                    <div className="bg-brand-beige/50 p-4 rounded-2xl border border-brand-sand">
                      <p className="text-[9px] font-black uppercase tracking-widest text-brand-orange mb-1">Adresse du siège</p>
                      <p className="text-[11px] font-bold text-brand-stone/70 leading-relaxed">
                        Imani-Tech Solutions — Yaoundé, Cameroun<br />
                        Horaires : Lun-Ven 8h-17h, Sam 9h-13h
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={() => setCheckoutStep(1)} className="flex-1 border-2 border-brand-sand text-brand-stone py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-brand-orange transition-all flex items-center justify-center gap-2">
                      <ChevronLeft size={14} /> Retour
                    </button>
                    <button
                      onClick={() => setCheckoutStep(3)}
                      disabled={deliveryMode === 'livraison' && !deliveryAddress}
                      className="flex-[2] bg-brand-orange text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-brand-stone transition-all shadow-xl disabled:opacity-40 flex items-center justify-center gap-2"
                    >
                      Confirmer <ChevronRight size={16} />
                    </button>
                  </div>
                </>
              ) : (
                // ── Étape 3 : Résumé final
                <>
                  <div className="space-y-4">
                    <div className="bg-brand-beige/50 p-4 rounded-2xl border border-brand-sand">
                      <p className="text-[9px] font-black uppercase tracking-widest text-brand-orange mb-2">Récapitulatif</p>
                      {cart.map(i => (
                        <div key={i.product.id} className="flex justify-between text-[10px] font-bold text-brand-stone/70 py-1">
                          <span>{i.product.name} ×{i.qty}</span>
                          <span className="font-black text-brand-stone">{fmt(i.product.price * i.qty)}</span>
                        </div>
                      ))}
                      <div className="border-t border-brand-sand mt-2 pt-2 flex justify-between">
                        <span className="font-black text-[10px] uppercase tracking-widest text-brand-stone/40">Total payé</span>
                        <span className="font-black text-xl text-brand-stone">{fmt(cartTotal)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-brand-beige/50 p-3 rounded-xl border border-brand-sand">
                        <p className="text-[8px] font-black uppercase tracking-widest text-brand-orange mb-1">Opérateur</p>
                        <p className="text-[11px] font-black text-brand-stone">{payMethod === 'mtn' ? 'MTN MoMo' : 'Orange Money'}</p>
                        <p className="text-[9px] font-bold text-brand-stone/50">{payPhone}</p>
                      </div>
                      <div className="bg-brand-beige/50 p-3 rounded-xl border border-brand-sand">
                        <p className="text-[8px] font-black uppercase tracking-widest text-brand-orange mb-1">Livraison</p>
                        <p className="text-[11px] font-black text-brand-stone">{deliveryMode === 'livraison' ? 'À domicile' : 'Retrait siège'}</p>
                        {deliveryAddress && <p className="text-[9px] font-bold text-brand-stone/50 truncate">{deliveryAddress}</p>}
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-2xl border border-green-200 flex items-start gap-3">
                      <Smartphone size={20} className="text-green-600 shrink-0 mt-0.5" />
                      <p className="text-[11px] font-bold text-green-700 leading-relaxed">
                        En cliquant sur <strong>Envoyer la commande</strong>, vous serez redirigé vers WhatsApp avec toutes les informations préremplies.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setCheckoutStep(2)} className="flex-1 border-2 border-brand-sand text-brand-stone py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-brand-orange transition-all flex items-center justify-center gap-2">
                      <ChevronLeft size={14} /> Retour
                    </button>
                    <button
                      onClick={handleConfirmOrder}
                      className="flex-[2] bg-[#25D366] text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:opacity-90 transition-all shadow-xl flex items-center justify-center gap-2"
                    >
                      📱 Envoyer sur WhatsApp
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── SECTION GARANTIES ────────────────────────────────────────────── */}
      <section className="py-20 bg-brand-stone text-white text-center rounded-[4rem] mx-4 sm:mx-8 mb-20 overflow-hidden relative border-y border-brand-orange/20">
        <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none"><Globe size={300} /></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-orange text-[9px] font-black uppercase tracking-[0.2em] mb-8">
            <ShieldCheck size={12} />
            <span>Garantie Intégrale Imani-Tech</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-10 uppercase tracking-tighter leading-none">
            Achetez avec <span className="text-brand-orange">Confiance</span>.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-12">
            {[
              [Truck, 'Livraison rapide', 'Yaoundé 24-48h'],
              [RotateCcw, 'Retour 7 jours', 'Remplacement garanti'],
              [ShieldCheck, 'Produits certifiés', 'Sélection qualité'],
              [Zap, 'Support technique', 'Équipe disponible'],
            ].map(([Icon, title, desc]) => (
              <div key={title as string} className="bg-white/5 p-6 rounded-[2rem] border border-white/10 hover:border-brand-orange/40 transition-all">
                <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center mb-3 mx-auto">
                  {React.createElement(Icon as React.ElementType, { size: 18, className: 'text-white' })}
                </div>
                <h4 className="font-black uppercase text-sm mb-1">{title as string}</h4>
                <p className="text-[10px] font-bold text-white/40 uppercase">{desc as string}</p>
              </div>
            ))}
          </div>

          <Link to={AppRoute.Contact} className="bg-brand-orange text-white px-10 py-5 rounded-full font-black text-lg hover:bg-white hover:text-brand-stone transition-all shadow-2xl shadow-brand-orange/30 inline-flex items-center gap-2 uppercase tracking-tighter">
            Besoin d'un devis ? <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
