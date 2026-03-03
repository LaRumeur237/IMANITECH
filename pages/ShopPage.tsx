import React, { useState, useMemo } from 'react';
import {
  ShoppingCart, X, Star, Search, ArrowRight,
  ShieldCheck, Truck, RotateCcw, Zap, SlidersHorizontal, Globe,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';
import { SHOP_CATEGORIES, ShopProduct, PARTNERS } from '../shopData';
import { useCart, CartDrawer, CartFAB, CheckoutModal } from './CartSystem';

// ─── UTILS ───────────────────────────────────────────────────────────────────
const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA';

const Stars = ({ rating, size = 12 }: { rating: number; size?: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <Star key={i} size={size}
        className={i <= Math.round(rating) ? 'text-brand-orange fill-brand-orange' : 'text-brand-sand'} />
    ))}
  </div>
);

// ─── CARTE PRODUIT ────────────────────────────────────────────────────────────
const ProductCard: React.FC<{
  product: ShopProduct; category: string;
  onView: (p: ShopProduct, cat: string) => void;
  onAdd: (p: ShopProduct, cat: string) => void;
}> = ({ product: p, category, onView, onAdd }) => (
  <div
    onClick={() => onView(p, category)}
    className="bg-white rounded-[2rem] border-2 border-brand-sand hover:border-brand-orange shadow-sm hover:shadow-xl transition-all duration-200 group flex flex-col cursor-pointer relative overflow-hidden"
  >
    {p.badge && (
      <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-lg ${
        p.badge === 'Promo' ? 'bg-red-500' : p.badge === 'Nouveau' ? 'bg-green-500' :
        p.badge === 'Bestseller' ? 'bg-brand-orange' : 'bg-brand-stone'
      }`}>{p.badge}</div>
    )}
    {p.oldPrice && (
      <div className="absolute top-3 right-3 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-[9px] font-black">
        -{Math.round((1 - p.price / p.oldPrice) * 100)}%
      </div>
    )}
    <div className="w-full h-40 sm:h-44 overflow-hidden rounded-t-[1.8rem] bg-brand-beige/30">
      <img src={p.image} alt={p.name} loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    </div>
    <div className="p-3 sm:p-5 flex flex-col flex-grow">
      <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-brand-orange mb-1">{p.brand}</span>
      <h3 className="text-[11px] sm:text-sm font-black text-brand-stone uppercase tracking-tight mb-1.5 sm:mb-2 leading-tight group-hover:text-brand-orange transition-colors line-clamp-2">{p.name}</h3>
      <p className="text-brand-stone/50 text-[10px] sm:text-[11px] font-bold leading-relaxed mb-2 sm:mb-3 line-clamp-2 flex-grow hidden sm:block">{p.description}</p>
      <div className="flex items-center gap-1 mb-2 sm:mb-3">
        <Stars rating={p.rating} size={10} />
        <span className="text-[8px] text-brand-stone/40 font-bold">({p.reviews})</span>
      </div>
      <div className="flex items-end justify-between mb-3 sm:mb-4">
        <div>
          <div className="text-sm sm:text-lg font-black text-brand-stone tracking-tighter">{fmt(p.price)}</div>
          {p.oldPrice && <div className="text-[9px] sm:text-[10px] text-brand-stone/30 line-through font-bold">{fmt(p.oldPrice)}</div>}
        </div>
        <span className={`text-[8px] font-black uppercase px-1.5 sm:px-2 py-1 rounded-full hidden sm:block ${
          p.stock <= 5 ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'
        }`}>{p.stock <= 5 ? `${p.stock} restants` : 'En stock'}</span>
      </div>
      <button
        onClick={e => { e.stopPropagation(); onAdd(p, category); }}
        className="w-full bg-brand-orange text-white py-2.5 sm:py-3 rounded-xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-brand-stone transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-brand-orange/20 active:scale-95"
      >
        <ShoppingCart size={12} />
        <span className="hidden sm:inline">Ajouter au panier</span>
        <span className="sm:hidden">Ajouter</span>
      </button>
    </div>
  </div>
);

// ─── PAGE ─────────────────────────────────────────────────────────────────────
const ShopPage: React.FC = () => {
  const {
    items: cartItems, count: cartCount, total: cartTotal,
    add: addToCart, updateQty, remove: removeFromCart, clear: clearCart,
    drawerOpen, setDrawerOpen,
    checkoutOpen, setCheckoutOpen,
    openCheckout,
  } = useCart();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery,    setSearchQuery]    = useState('');
  const [sortBy,         setSortBy]         = useState<'popular'|'price-asc'|'price-desc'|'new'|'rating'>('popular');
  const [priceRange,     setPriceRange]     = useState<[number,number]>([0,2000000]);
  const [filterBadge,    setFilterBadge]    = useState('');
  const [filterBrand,    setFilterBrand]    = useState('');
  const [showFilters,    setShowFilters]    = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{product:ShopProduct; category:string}|null>(null);

  const allProducts = useMemo(() => {
    const cats = activeCategory === 'all' ? SHOP_CATEGORIES : SHOP_CATEGORIES.filter(c => c.id === activeCategory);
    let prods: {product:ShopProduct; category:string}[] = [];
    cats.forEach(c => c.products.forEach(p => prods.push({product:p, category:c.name})));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      prods = prods.filter(({product:p}) =>
        p.name.toLowerCase().includes(q) || p.ref.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    prods = prods.filter(({product:p}) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (filterBadge) prods = prods.filter(({product:p}) => p.badge === filterBadge);
    if (filterBrand) prods = prods.filter(({product:p}) => p.brand === filterBrand);
    switch (sortBy) {
      case 'price-asc':  prods.sort((a,b) => a.product.price - b.product.price); break;
      case 'price-desc': prods.sort((a,b) => b.product.price - a.product.price); break;
      case 'rating':     prods.sort((a,b) => b.product.rating - a.product.rating); break;
      case 'new':        prods.sort((a,b) => (b.product.badge==='Nouveau'?1:0)-(a.product.badge==='Nouveau'?1:0)); break;
      default:           prods.sort((a,b) => (b.product.badge==='Bestseller'?1:0)-(a.product.badge==='Bestseller'?1:0));
    }
    return prods;
  }, [activeCategory, searchQuery, sortBy, priceRange, filterBadge, filterBrand]);

  const allBrands = useMemo(() => {
    const s = new Set<string>();
    SHOP_CATEGORIES.forEach(c => c.products.forEach(p => s.add(p.brand)));
    return Array.from(s).sort();
  }, []);

  const totalProductCount = SHOP_CATEGORIES.reduce((a,c) => a + c.products.length, 0);
  const hasActiveFilter   = !!(filterBadge || filterBrand || priceRange[1] < 2000000);

  return (
    <div className="bg-brand-cream min-h-screen pt-24 page-appear">

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-14 sm:py-20 px-4 relative overflow-hidden border-b border-brand-sand">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Boutique Officielle</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-5 tracking-tighter uppercase leading-[0.9] text-brand-stone">
            {SHOP_CATEGORIES.length} Catégories<br/><span className="text-brand-orange">d'Équipements Pro</span>
          </h1>
          <p className="text-base sm:text-lg text-brand-stone/60 max-w-2xl mx-auto font-bold leading-relaxed mb-8">
            {totalProductCount}+ produits sélectionnés et garantis. Paiement Mobile Money sécurisé. Livraison Cameroun.
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-stone/30 pointer-events-none" />
            <input
              type="text" placeholder="Rechercher par nom, référence, marque…"
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-13 pr-12 py-4 sm:py-5 rounded-2xl border-2 border-brand-sand focus:border-brand-orange outline-none font-bold text-brand-stone bg-white shadow-lg transition-all text-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-stone/30 hover:text-brand-orange">
                <X size={17} />
              </button>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-5 sm:gap-8 mt-8">
            {[['🚚','Livraison 24-48h'],['🔒','Paiement sécurisé'],['🔁','Retour 7 jours'],['⭐','Produits certifiés']].map(([icon,label]) => (
              <div key={label} className="flex items-center gap-2 text-brand-stone/50 font-black text-[9px] sm:text-[10px] uppercase tracking-widest">
                <span>{icon}</span><span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-orange/5 blur-[100px] rounded-full pointer-events-none" />
      </section>

      {/* ══ BANDEAU PARTENAIRES ═══════════════════════════════════════════════ */}
      <div className="bg-brand-stone py-2.5 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{animation:'tickerScroll 40s linear infinite'}}>
          {[...PARTNERS,...PARTNERS].map((partner,i) => (
            <span key={i} className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mr-10">✦ {partner}</span>
          ))}
        </div>
      </div>

      {/* ══ BARRE NAV CATÉGORIES + FILTRES ═══════════════════════════════════ */}
      <div className="sticky top-[72px] z-[50] bg-white/95 backdrop-blur-xl border-b border-brand-sand shadow-sm">

        {/* Ligne 1 : catégories scrollables + bouton panier desktop */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center gap-2 sm:gap-3">
          <div className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-hide pb-0.5">
            <button onClick={() => setActiveCategory('all')}
              className={`shrink-0 px-4 py-2 rounded-full font-black text-[9px] sm:text-[10px] uppercase tracking-widest border-2 transition-all ${activeCategory==='all' ? 'bg-brand-stone text-white border-brand-stone' : 'border-brand-sand text-brand-stone hover:border-brand-orange'}`}>
              Tous ({totalProductCount})
            </button>
            {SHOP_CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full font-black text-[9px] sm:text-[10px] uppercase tracking-widest border-2 transition-all ${activeCategory===cat.id ? 'bg-brand-orange text-white border-brand-orange' : 'border-brand-sand text-brand-stone hover:border-brand-orange'}`}>
                <span>{cat.icon}</span><span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Panier bouton — desktop uniquement */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="hidden sm:flex shrink-0 relative items-center gap-2 bg-brand-orange hover:bg-brand-stone text-white px-4 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all shadow-md"
          >
            <ShoppingCart size={14} />
            <span>Panier</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white text-brand-orange rounded-full text-[9px] font-black flex items-center justify-center border-2 border-brand-orange">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Ligne 2 : tri + filtres + nb résultats */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-3 border-t border-brand-sand/30">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:block text-[10px] font-black text-brand-stone/35 uppercase tracking-widest">
              {allProducts.length} résultat{allProducts.length>1?'s':''}
            </span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest border-2 border-brand-sand rounded-full px-3 sm:px-4 py-2 bg-white text-brand-stone focus:border-brand-orange outline-none cursor-pointer">
              <option value="popular">Popularité</option>
              <option value="rating">Mieux notés</option>
              <option value="price-asc">Prix ↑</option>
              <option value="price-desc">Prix ↓</option>
              <option value="new">Nouveautés</option>
            </select>
            <button onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full font-black text-[9px] sm:text-[10px] uppercase tracking-widest border-2 transition-all ${showFilters ? 'bg-brand-stone text-white border-brand-stone' : 'border-brand-sand text-brand-stone hover:border-brand-orange'}`}>
              <SlidersHorizontal size={12} />
              <span className="hidden sm:inline">Filtres</span>
              {hasActiveFilter && <span className="w-4 h-4 bg-brand-orange rounded-full text-[8px] font-black text-white flex items-center justify-center">!</span>}
            </button>
          </div>
          <span className="sm:hidden text-[9px] font-black text-brand-stone/35 uppercase">
            {allProducts.length} résultat{allProducts.length>1?'s':''}
          </span>
        </div>

        {/* Panneau filtres */}
        {showFilters && (
          <div className="border-t border-brand-sand/30 bg-brand-beige/30 px-4 py-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40 mb-2">Budget max</p>
                <input type="range" min={0} max={2000000} step={10000} value={priceRange[1]}
                  onChange={e => setPriceRange([0,Number(e.target.value)])} className="w-full accent-brand-orange" />
                <p className="text-[10px] font-black text-brand-orange mt-1">≤ {fmt(priceRange[1])}</p>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40 mb-2">Statut</p>
                <div className="flex flex-wrap gap-2">
                  {['Nouveau','Bestseller','Promo','Stock limité'].map(b => (
                    <button key={b} onClick={() => setFilterBadge(filterBadge===b?'':b)}
                      className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase border-2 transition-all ${filterBadge===b ? 'bg-brand-orange text-white border-brand-orange' : 'border-brand-sand text-brand-stone hover:border-brand-orange'}`}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40 mb-2">Marque</p>
                <select value={filterBrand} onChange={e => setFilterBrand(e.target.value)}
                  className="w-full text-[10px] font-black border-2 border-brand-sand rounded-xl px-3 py-2 bg-white text-brand-stone focus:border-brand-orange outline-none">
                  <option value="">Toutes les marques</option>
                  {allBrands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>
            {hasActiveFilter && (
              <button onClick={() => {setFilterBadge('');setFilterBrand('');setPriceRange([0,2000000]);}}
                className="mt-3 text-[9px] font-black uppercase tracking-widest text-brand-orange hover:underline">
                ✕ Effacer les filtres
              </button>
            )}
          </div>
        )}
      </div>

      {/* ══ GRILLE PRODUITS ══════════════════════════════════════════════════ */}
      {/* pb-28 sur mobile = espace pour la CartFAB fixe en bas */}
      <section className="py-8 sm:py-12 px-3 sm:px-4 pb-32 sm:pb-16">
        <div className="max-w-7xl mx-auto">
          {allProducts.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <span className="text-6xl">🔍</span>
              <p className="text-brand-stone/40 font-black uppercase text-sm tracking-widest">Aucun produit trouvé</p>
              <button onClick={() => {setSearchQuery('');setFilterBadge('');setFilterBrand('');setPriceRange([0,2000000]);}}
                className="text-brand-orange font-black text-[10px] uppercase tracking-widest hover:underline">
                Effacer les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {allProducts.map(({product, category}) => (
                <ProductCard key={product.id} product={product} category={category}
                  onView={(p,cat) => setSelectedProduct({product:p, category:cat})}
                  onAdd={addToCart} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ SECTION GARANTIES ════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-brand-stone text-white text-center rounded-[2rem] sm:rounded-[4rem] mx-3 sm:mx-8 mb-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none"><Globe size={300} /></div>
        <div className="max-w-5xl mx-auto px-5 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-orange text-[9px] font-black uppercase tracking-[0.2em] mb-6 sm:mb-8">
            <ShieldCheck size={12}/><span>Garantie Intégrale Imani-Tech</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black mb-8 sm:mb-10 uppercase tracking-tighter leading-none">
            Achetez avec <span className="text-brand-orange">Confiance</span>.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 mb-10">
            {[[Truck,'Livraison rapide','Yaoundé 24-48h'],[RotateCcw,'Retour 7 jours','Remplacement garanti'],[ShieldCheck,'Produits certifiés','Sélection qualité'],[Zap,'Support technique','Équipe disponible']].map(([Icon,title,desc]) => (
              <div key={title as string} className="bg-white/5 p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 hover:border-brand-orange/40 transition-all">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-brand-orange rounded-xl flex items-center justify-center mb-3 mx-auto">
                  {React.createElement(Icon as React.ElementType, {size:16, className:'text-white'})}
                </div>
                <h4 className="font-black uppercase text-xs sm:text-sm mb-1">{title as string}</h4>
                <p className="text-[9px] sm:text-[10px] font-bold text-white/40 uppercase">{desc as string}</p>
              </div>
            ))}
          </div>
          <Link to={AppRoute.Contact}
            className="bg-brand-orange text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-black text-base sm:text-lg hover:bg-white hover:text-brand-stone transition-all shadow-2xl shadow-brand-orange/30 inline-flex items-center gap-2 uppercase tracking-tighter">
            Besoin d'un devis ? <ArrowRight size={18}/>
          </Link>
        </div>
      </section>

      {/* ══ MODAL FICHE PRODUIT ═══════════════════════════════════════════════ */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-brand-stone/90 backdrop-blur-md"
          style={{animation:'fadeIn 0.2s ease both'}}
          onClick={e => {if(e.target===e.currentTarget) setSelectedProduct(null);}}
        >
          <div
            className="bg-white w-full sm:max-w-3xl rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            style={{animation:'sheetUp 0.3s cubic-bezier(0.32,0.72,0,1) both'}}
          >
            {/* Handle mobile */}
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-brand-sand" />
            </div>
            {/* Header */}
            <div className="bg-brand-stone px-5 sm:px-8 py-5 text-white flex justify-between items-start shrink-0 border-b-4 border-brand-orange">
              <div className="min-w-0 mr-4">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-orange block mb-1">
                  {selectedProduct.category} · {selectedProduct.product.brand}
                </span>
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tighter leading-tight">{selectedProduct.product.name}</h2>
                <p className="text-white/35 text-[9px] font-bold uppercase mt-0.5">Réf : {selectedProduct.product.ref}</p>
              </div>
              <button onClick={() => setSelectedProduct(null)}
                className="w-9 h-9 bg-white/10 hover:bg-brand-orange rounded-full flex items-center justify-center transition-all shrink-0">
                <X size={16}/>
              </button>
            </div>
            {/* Corps */}
            <div className="flex-grow overflow-y-auto p-5 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                {/* Image + prix + CTA */}
                <div className="space-y-4">
                  <div className="w-full h-52 sm:h-64 rounded-2xl overflow-hidden bg-brand-beige/30">
                    <img src={selectedProduct.product.image} alt={selectedProduct.product.name} className="w-full h-full object-cover"/>
                  </div>
                  <div className="bg-brand-beige/50 p-4 rounded-2xl border border-brand-sand">
                    <p className="text-[9px] font-black uppercase tracking-widest text-brand-orange mb-1">Prix</p>
                    <div className="text-2xl sm:text-3xl font-black text-brand-stone tracking-tighter">{fmt(selectedProduct.product.price)}</div>
                    {selectedProduct.product.oldPrice && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-brand-stone/30 line-through font-bold">{fmt(selectedProduct.product.oldPrice)}</span>
                        <span className="text-red-500 font-black text-[10px]">-{Math.round((1-selectedProduct.product.price/selectedProduct.product.oldPrice)*100)}%</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Stars rating={selectedProduct.product.rating} size={14}/>
                      <span className="text-[10px] font-black text-brand-stone/40">{selectedProduct.product.rating}/5 ({selectedProduct.product.reviews})</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${selectedProduct.product.stock<=5 ? 'bg-red-50 text-red-500 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                      {selectedProduct.product.stock<=5 ? `⚠ ${selectedProduct.product.stock} en stock` : '✓ En stock'}
                    </span>
                  </div>
                  <button
                    onClick={() => {addToCart(selectedProduct.product, selectedProduct.category); setSelectedProduct(null);}}
                    className="w-full bg-brand-orange text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-brand-stone transition-all shadow-xl flex items-center justify-center gap-2 active:scale-[0.98]">
                    <ShoppingCart size={15}/> Ajouter au panier
                  </button>
                </div>
                {/* Desc + tags + garanties */}
                <div className="space-y-5">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-stone/35 mb-2">Description</p>
                    <p className="text-brand-stone/70 font-bold text-sm leading-relaxed">{selectedProduct.product.description}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-stone/35 mb-2">Mots-clés</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.product.tags.map(tag => (
                        <span key={tag} onClick={() => {setSearchQuery(tag); setSelectedProduct(null);}}
                          className="px-3 py-1 bg-brand-beige rounded-full text-[9px] font-black uppercase tracking-widest text-brand-orange border border-brand-sand hover:bg-brand-orange hover:text-white cursor-pointer transition-all">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-brand-beige/50 p-4 rounded-2xl border border-brand-sand space-y-2.5">
                    {[[Truck,'Livraison Yaoundé & environs 24-48h'],[RotateCcw,'Retour gratuit sous 7 jours'],[ShieldCheck,'Garantie Imani-Tech certifiée']].map(([Icon,label]) => (
                      <div key={label as string} className="flex items-center gap-3">
                        {React.createElement(Icon as React.ElementType, {size:14, className:'text-brand-orange shrink-0'})}
                        <span className="text-[11px] font-black uppercase tracking-tight text-brand-stone/60">{label as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ SYSTÈME PANIER ═══════════════════════════════════════════════════ */}
      <CartDrawer
        items={cartItems} count={cartCount} total={cartTotal}
        open={drawerOpen} onClose={() => setDrawerOpen(false)}
        onUpdate={updateQty} onRemove={removeFromCart} onCheckout={openCheckout}
      />

      {/* FAB flottant mobile — visible uniquement < sm */}
      <CartFAB count={cartCount} total={cartTotal} onClick={() => setDrawerOpen(true)} />

      {/* Modale checkout */}
      <CheckoutModal
        open={checkoutOpen} items={cartItems} total={cartTotal}
        onClose={() => setCheckoutOpen(false)} onSuccess={clearCart}
      />

      <style>{`
        @keyframes sheetUp { from{transform:translateY(40px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes tickerScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .scrollbar-hide::-webkit-scrollbar{display:none}
        .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>
    </div>
  );
};

export default ShopPage;
