import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  ShoppingCart, X, Star, ChevronRight, ChevronLeft,
  Search, Check, ArrowRight, Minus, Plus, ShieldCheck, Truck,
  RotateCcw, Smartphone, Globe, SlidersHorizontal,
  Zap, MapPin, AlertCircle, Trash2, CheckCircle, Copy, Sparkles,
  Package, Clock, MessageSquare, Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';
import {
  SHOP_CATEGORIES, ShopProduct,
  PARTNERS, WHATSAPP_ORDER_NUMBER, ORANGE_MONEY_NUMBER, MTN_MOMO_NUMBER
} from '../shopData';
import { WHATSAPP_NUMBER } from '../data';

// ─── UTILS ────────────────────────────────────────────────────────────────────
const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA';

const REGIONS_CAMEROUN = [
  'Centre (Yaoundé)', 'Littoral (Douala)', 'Ouest (Bafoussam)', 
  'Sud-Ouest (Buéa/Limbe)', 'Nord-Ouest (Bamenda)', 'Adamaoua (Ngaoundéré)',
  'Nord (Garoua)', 'Extrême-Nord (Maroua)', 'Sud (Ebolowa/Kribi)', 'Est (Bertoua)'
];

const FREE_SHIPPING_THRESHOLD = 150000;

export interface CartItem {
  product: ShopProduct;
  qty: number;
  category: string;
}

const Stars: React.FC<{ rating: number; size?: number }> = ({ rating, size = 12 }) => (
  <div className="flex items-center gap-0.5" aria-label={`Note: ${rating} sur 5`}>
    {[1, 2, 3, 4, 5].map(i => (
      <Star
        key={i}
        size={size}
        className={i <= Math.round(rating) ? 'text-amber-500 fill-amber-500' : 'text-brand-sand'}
      />
    ))}
  </div>
);

// ─── BADGE PANIER FLOTTANT ────────────────────────────────────────────────────
const FloatingCartBadge: React.FC<{
  count: number;
  total: number;
  onClick: () => void;
}> = ({ count, total, onClick }) => {
  const [pulse, setPulse] = useState(false);
  const prevCount = useRef(count);

  useEffect(() => {
    if (count > prevCount.current) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 600);
      prevCount.current = count;
      return () => clearTimeout(timer);
    }
    prevCount.current = count;
  }, [count]);

  if (count === 0) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 sm:bottom-8 sm:left-auto sm:right-8 sm:translate-x-0 z-[130] pointer-events-auto">
      <button
        onClick={onClick}
        aria-label={`Voir le panier contenant ${count} articles`}
        className={`flex items-center gap-2.5 sm:gap-3.5 bg-brand-stone text-white px-4 sm:px-6 py-3 sm:py-3.5 rounded-full shadow-2xl shadow-brand-stone/50 hover:bg-brand-orange border-2 border-white/20 transition-all duration-300 active:scale-95 ${
          pulse ? 'scale-105 ring-4 ring-brand-orange/40' : 'scale-100'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <ShoppingCart size={18} className="text-white" />
          <span className="absolute -top-2.5 -right-2.5 min-w-[18px] h-[18px] px-1 bg-brand-orange text-white rounded-full text-[9px] font-black flex items-center justify-center border-2 border-brand-stone">
            {count}
          </span>
        </div>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-[8px] font-bold uppercase tracking-widest text-brand-orange sm:text-white/80">Mon Panier</span>
          <span className="text-xs sm:text-sm font-black tracking-tight">{fmt(total)}</span>
        </div>
        <ChevronRight size={14} className="opacity-70 ml-1 hidden sm:block" />
      </button>
    </div>
  );
};

// ─── CARTE PRODUIT ────────────────────────────────────────────────────────────
const ProductCard: React.FC<{
  product: ShopProduct;
  category: string;
  inCartQty?: number;
  onView: (p: ShopProduct, cat: string) => void;
  onAdd: (p: ShopProduct, cat: string) => void;
}> = ({ product: p, category, inCartQty = 0, onView, onAdd }) => {
  const [justAdded, setJustAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd(p, category);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const discountPercent = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

  return (
    <div
      onClick={() => onView(p, category)}
      className="bg-white rounded-2xl border border-brand-sand/70 hover:border-brand-orange/60 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer relative overflow-hidden h-full"
    >
      {/* Badges statut */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        {p.badge && (
          <span
            className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider text-white shadow-sm ${
              p.badge === 'Promo'
                ? 'bg-red-500'
                : p.badge === 'Nouveau'
                ? 'bg-emerald-600'
                : p.badge === 'Bestseller'
                ? 'bg-brand-orange'
                : 'bg-brand-stone'
            }`}
          >
            {p.badge}
          </span>
        )}
      </div>

      {discountPercent > 0 && (
        <div className="absolute top-2.5 right-2.5 z-10 bg-red-600 text-white px-2 py-0.5 rounded-full text-[9px] font-black shadow-sm">
          -{discountPercent}%
        </div>
      )}

      {/* Image container */}
      <div className="w-full h-36 sm:h-44 overflow-hidden rounded-t-2xl bg-brand-beige/40 relative flex items-center justify-center p-2">
        {!imgError ? (
          <img
            src={p.image}
            alt={p.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-brand-stone/30 gap-1">
            <Package size={28} />
            <span className="text-[9px] font-bold uppercase">{p.brand}</span>
          </div>
        )}

        {inCartQty > 0 && (
          <div className="absolute bottom-2 right-2 bg-brand-stone/90 backdrop-blur-sm text-brand-orange text-[9px] font-black px-2 py-0.5 rounded-full border border-brand-orange/30 flex items-center gap-1 shadow">
            <ShoppingCart size={10} /> ×{inCartQty}
          </div>
        )}
      </div>

      {/* Détails */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-grow justify-between gap-3">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-brand-orange">{p.brand}</span>
            <span className="text-[8px] font-mono text-brand-stone/40 uppercase tracking-tight">{p.ref}</span>
          </div>

          <h3 className="text-xs sm:text-[13px] font-black text-brand-stone uppercase tracking-tight line-clamp-2 leading-snug group-hover:text-brand-orange transition-colors mb-1.5">
            {p.name}
          </h3>

          <p className="text-brand-stone/60 text-[11px] font-medium line-clamp-2 leading-relaxed mb-2">
            {p.description}
          </p>
        </div>

        <div>
          {/* Note & Avis */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <Stars rating={p.rating} size={11} />
            <span className="text-[9px] text-brand-stone/50 font-bold">({p.reviews})</span>
          </div>

          {/* Prix & Stock */}
          <div className="flex items-end justify-between mb-3 border-t border-brand-sand/40 pt-2.5">
            <div>
              <div className="text-sm sm:text-base font-black text-brand-stone tracking-tight leading-none">
                {fmt(p.price)}
              </div>
              {p.oldPrice && (
                <div className="text-[10px] text-brand-stone/40 line-through font-bold mt-0.5">
                  {fmt(p.oldPrice)}
                </div>
              )}
            </div>
            <span
              className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                p.stock <= 5
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}
            >
              {p.stock <= 5 ? `Reste ${p.stock}` : 'En stock'}
            </span>
          </div>

          {/* Bouton Ajouter */}
          <button
            onClick={handleAdd}
            className={`w-full py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-sm ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-brand-orange hover:bg-brand-stone text-white shadow-brand-orange/20'
            }`}
          >
            {justAdded ? (
              <>
                <Check size={13} /> Ajouté !
              </>
            ) : (
              <>
                <ShoppingCart size={13} /> Ajouter au panier
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── PANIER LATÉRAL ───────────────────────────────────────────────────────────
const CartDrawer: React.FC<{
  cart: CartItem[];
  total: number;
  open: boolean;
  onClose: () => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}> = ({
  cart, total, open, onClose,
  onUpdateQty, onRemoveItem, onClearCart, onCheckout
}) => {
  const count = cart.reduce((a, i) => a + i.qty, 0);
  const isFreeShipping = total >= FREE_SHIPPING_THRESHOLD;
  const missingForFreeShipping = FREE_SHIPPING_THRESHOLD - total;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-stone/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className="relative bg-white w-full sm:w-[450px] md:w-[500px] h-full flex flex-col shadow-2xl z-10"
        style={{ animation: 'slideInFromRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) both' }}
      >
        {/* Header */}
        <div className="bg-brand-stone text-white shrink-0">
          <div className="flex items-center justify-between p-4 sm:p-5 border-b-4 border-brand-orange">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-orange flex items-center justify-center text-white shadow-md">
                <ShoppingCart size={18} />
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-orange">Boutique Officielle</p>
                <h2 className="text-base sm:text-lg font-black uppercase tracking-tight flex items-center gap-2">
                  Mon Panier
                  <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-black">
                    {count}
                  </span>
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Fermer le panier"
              className="w-9 h-9 bg-white/10 hover:bg-brand-orange rounded-xl flex items-center justify-center transition-all active:scale-90"
            >
              <X size={16} />
            </button>
          </div>

          {/* Jauge de livraison offerte */}
          {cart.length > 0 && (
            <div className="px-4 sm:px-5 py-3 bg-white/5 border-b border-white/10">
              <div className="flex items-center justify-between text-[10px] font-bold mb-1.5">
                <span className="text-white/70">
                  {isFreeShipping ? (
                    <span className="text-emerald-400 font-black flex items-center gap-1">
                      <Check size={12} /> Livraison offerte activée !
                    </span>
                  ) : (
                    <span>
                      Plus que <strong className="text-brand-orange">{fmt(missingForFreeShipping)}</strong> pour la livraison offerte
                    </span>
                  )}
                </span>
                <span className="text-white/40">{Math.min(100, Math.round((total / FREE_SHIPPING_THRESHOLD) * 100))}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-orange transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Liste des articles */}
        <div className="flex-grow overflow-y-auto overscroll-contain p-3 sm:p-5 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 p-8">
              <div className="w-20 h-20 bg-brand-beige rounded-full flex items-center justify-center border border-brand-sand">
                <ShoppingCart size={32} className="text-brand-stone/20" />
              </div>
              <div>
                <p className="text-brand-stone font-black uppercase text-xs tracking-widest mb-1">Votre panier est vide</p>
                <p className="text-brand-stone/50 text-xs font-medium max-w-xs">
                  Sélectionnez des équipements professionnels dans notre catalogue et commandez facilement.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-3 px-6 py-3 bg-brand-orange hover:bg-brand-stone text-white rounded-full font-black text-[10px] uppercase tracking-widest transition-all shadow-md active:scale-95"
              >
                Explorer la boutique
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-brand-sand/50">
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-stone/40">
                  {cart.length} référence{cart.length > 1 ? 's' : ''}
                </span>
                <button
                  onClick={onClearCart}
                  className="text-[9px] font-bold uppercase tracking-wider text-red-500 hover:underline flex items-center gap-1"
                >
                  <Trash2 size={11} /> Vider le panier
                </button>
              </div>

              {cart.map(item => (
                <div
                  key={item.product.id}
                  className="bg-white border border-brand-sand/80 rounded-2xl p-3 sm:p-3.5 flex gap-3 hover:border-brand-orange/40 transition-colors shadow-sm"
                >
                  {/* Image */}
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-brand-beige/40 shrink-0 border border-brand-sand/50">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Infos */}
                  <div className="flex-grow min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[9px] font-black text-brand-orange uppercase tracking-wide truncate">
                          {item.product.brand}
                        </p>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-brand-stone/30 hover:text-red-500 p-1 transition-colors"
                          title="Supprimer cet article"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <p className="text-[11px] sm:text-xs font-black text-brand-stone uppercase tracking-tight line-clamp-2 leading-snug">
                        {item.product.name}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-brand-sand/30">
                      <span className="text-xs sm:text-sm font-black text-brand-stone">
                        {fmt(item.product.price * item.qty)}
                      </span>

                      {/* Stepper */}
                      <div className="flex items-center gap-1 bg-brand-beige/80 rounded-xl px-1.5 py-0.5 border border-brand-sand/60">
                        <button
                          onClick={() => onUpdateQty(item.product.id, -1)}
                          className="w-6 h-6 rounded-lg bg-white hover:bg-red-50 hover:text-red-500 text-brand-stone/60 flex items-center justify-center transition-all shadow-xs active:scale-90"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-xs font-black text-brand-stone w-6 text-center tabular-nums">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.product.id, 1)}
                          className="w-6 h-6 rounded-lg bg-white hover:bg-brand-orange hover:text-white text-brand-stone/60 flex items-center justify-center transition-all shadow-xs active:scale-90"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer Panier */}
        {cart.length > 0 && (
          <div className="shrink-0 bg-white border-t border-brand-sand p-4 sm:p-5 space-y-3 shadow-lg">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-brand-stone/60">
                <span>Sous-total</span>
                <span>{fmt(total)}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-bold text-brand-stone/60">
                <span>Livraison</span>
                <span className={isFreeShipping ? 'text-emerald-600 font-black' : 'text-brand-stone'}>
                  {isFreeShipping ? 'Gratuite' : 'Calculée à l\'étape suivante'}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-brand-sand">
                <span className="text-xs font-black uppercase tracking-wider text-brand-stone">Total estimé</span>
                <span className="text-xl sm:text-2xl font-black text-brand-stone tracking-tight">{fmt(total)}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-brand-orange hover:bg-brand-stone text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-brand-orange/25 flex items-center justify-center gap-2 active:scale-95"
            >
              <Smartphone size={16} /> Passer la commande <ChevronRight size={16} />
            </button>

            <button
              onClick={onClose}
              className="w-full text-brand-stone/50 font-bold text-[10px] uppercase tracking-widest hover:text-brand-orange transition-colors py-1 text-center"
            >
              ← Continuer mes achats
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── CHECKOUT MODAL ───────────────────────────────────────────────────────────
const CheckoutModal: React.FC<{
  open: boolean;
  cart: CartItem[];
  total: number;
  onClose: () => void;
  onOrderSuccess: () => void;
}> = ({ open, cart, total, onClose, onOrderSuccess }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [done, setDone] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<'livraison' | 'retrait'>('livraison');
  const [region, setRegion] = useState('Centre (Yaoundé)');
  const [ville, setVille] = useState('');
  const [adresse, setAdresse] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [payMethod, setPayMethod] = useState<'mtn' | 'orange'>('mtn');
  const [payPhone, setPayPhone] = useState('');
  const [txCode, setTxCode] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(1);
      setDone(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const targetMoMoNumber = payMethod === 'mtn' ? MTN_MOMO_NUMBER : ORANGE_MONEY_NUMBER;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const isStep1Valid = clientName.trim().length >= 2 && clientPhone.replace(/\D/g, '').length >= 9 && (
    deliveryMode === 'retrait' || (ville.trim().length >= 2 && adresse.trim().length >= 3)
  );

  const isStep2Valid = payPhone.replace(/\D/g, '').length >= 9;

  const buildWhatsAppMessage = () => {
    const lines = [
      `*🛒 NOUVELLE COMMANDE — IMANI-TECH SOLUTIONS*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `*Client :* ${clientName}`,
      `*Contact :* +237 ${clientPhone}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `*ARTICLES COMMANDÉS :*`,
      ...cart.map(i => `  • ${i.product.name} [${i.product.ref}] ×${i.qty} = ${fmt(i.product.price * i.qty)}`),
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `*TOTAL ARTICLES :* ${fmt(total)}`,
      `*MODE DE LIVRAISON :* ${
        deliveryMode === 'livraison'
          ? `Livraison à domicile (${region} – ${ville})\n*Adresse :* ${adresse}`
          : 'Retrait direct au siège Imani-Tech (Yaoundé / Douala)'
      }`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `*PAIEMENT MOBILE MONEY :*`,
      `*Opérateur :* ${payMethod === 'mtn' ? 'MTN Mobile Money' : 'Orange Money'}`,
      `*Numéro Payeur :* +237 ${payPhone}`,
      txCode ? `*Code Transaction :* ${txCode}` : `*Statut :* En cours de validation`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `_Envoyé depuis le site officiel Imani-Tech_`
    ];
    return encodeURIComponent(lines.join('\n'));
  };

  const handleSendWhatsApp = () => {
    const targetPhone = WHATSAPP_ORDER_NUMBER || WHATSAPP_NUMBER.replace(/\D/g, '');
    const url = `https://wa.me/${targetPhone}?text=${buildWhatsAppMessage()}`;
    window.open(url, '_blank');
    setDone(true);
    onOrderSuccess();
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-brand-stone/80 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative bg-white w-full sm:max-w-xl rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl flex flex-col overflow-hidden max-h-[94vh]"
        style={{ animation: 'slideInFromBottom 0.3s cubic-bezier(0.16, 1, 0.3, 1) both' }}
      >
        {/* Header modal */}
        <div className="bg-brand-stone text-white shrink-0 p-4 sm:p-5 border-b-4 border-brand-orange">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-orange">
                {done ? 'Confirmation' : `Étape ${step} sur 3`}
              </p>
              <h2 className="text-base sm:text-xl font-black uppercase tracking-tight">
                {done
                  ? '✓ Commande Transmise'
                  : step === 1
                  ? 'Livraison & Coordonnées'
                  : step === 2
                  ? 'Paiement Mobile Money'
                  : 'Récapitulatif & Validation'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 bg-white/10 hover:bg-brand-orange rounded-xl flex items-center justify-center transition-all"
            >
              <X size={16} />
            </button>
          </div>

          {/* Stepper bar */}
          {!done && (
            <div className="flex gap-2">
              {[
                { n: 1, label: 'Livraison' },
                { n: 2, label: 'Paiement' },
                { n: 3, label: 'Confirmation' },
              ].map(s => (
                <div key={s.n} className="flex-1">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      step >= s.n ? 'bg-brand-orange' : 'bg-white/20'
                    }`}
                  />
                  <span
                    className={`text-[8px] font-black uppercase tracking-wider block mt-1 ${
                      step >= s.n ? 'text-brand-orange' : 'text-white/40'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Corps scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4">
          {done ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-200">
                <CheckCircle size={32} className="text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase text-brand-stone tracking-tight mb-1">
                  Commande initiée avec succès !
                </h3>
                <p className="text-brand-stone/60 text-xs font-medium max-w-sm mx-auto leading-relaxed">
                  Votre récapitulatif a été transmis sur WhatsApp. Notre service logistique prend en charge votre commande immédiatement.
                </p>
              </div>

              <div className="bg-brand-beige/60 p-4 rounded-2xl border border-brand-sand text-left space-y-2 text-xs">
                <div className="flex justify-between font-bold">
                  <span className="text-brand-stone/60">Total payé</span>
                  <span className="font-black text-brand-stone">{fmt(total)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-brand-stone/60">Mode</span>
                  <span className="font-black text-brand-stone">
                    {deliveryMode === 'livraison' ? `Livraison (${ville})` : 'Retrait au siège'}
                  </span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-brand-stone/60">Paiement</span>
                  <span className="font-black text-brand-stone">
                    {payMethod === 'mtn' ? 'MTN MoMo' : 'Orange Money'} ({payPhone})
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-brand-stone hover:bg-brand-orange text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md active:scale-95"
              >
                Retour à la boutique
              </button>
            </div>
          ) : step === 1 ? (
            /* Étape 1 : Coordonnées & Livraison */
            <>
              {/* Infos Client */}
              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/50">
                  1. Vos coordonnées
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-bold text-brand-stone/60 uppercase block mb-1">Nom complet *</label>
                    <input
                      type="text"
                      placeholder="Ex: Paul Biya / Entreprise X"
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-brand-sand focus:border-brand-orange outline-none font-bold text-brand-stone text-xs bg-brand-beige/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-brand-stone/60 uppercase block mb-1">Téléphone de contact *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-stone/40">+237</span>
                      <input
                        type="tel"
                        placeholder="6XX XXX XXX"
                        value={clientPhone}
                        onChange={e => setClientPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                        className="w-full pl-14 pr-3.5 py-2.5 rounded-xl border-2 border-brand-sand focus:border-brand-orange outline-none font-bold text-brand-stone text-xs bg-brand-beige/20 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mode de livraison */}
              <div className="space-y-3 pt-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/50">
                  2. Mode de réception
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMode('livraison')}
                    className={`p-3.5 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all text-center ${
                      deliveryMode === 'livraison'
                        ? 'border-brand-orange bg-brand-orange/5 text-brand-orange font-black'
                        : 'border-brand-sand text-brand-stone/60 font-bold hover:border-brand-orange/40'
                    }`}
                  >
                    <span className="text-xl">🚚</span>
                    <span className="text-[10px] uppercase">Livraison Domicile</span>
                    <span className="text-[8px] opacity-70">10 Régions du Cameroun</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMode('retrait')}
                    className={`p-3.5 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all text-center ${
                      deliveryMode === 'retrait'
                        ? 'border-brand-orange bg-brand-orange/5 text-brand-orange font-black'
                        : 'border-brand-sand text-brand-stone/60 font-bold hover:border-brand-orange/40'
                    }`}
                  >
                    <span className="text-xl">🏢</span>
                    <span className="text-[10px] uppercase">Retrait au Siège</span>
                    <span className="text-[8px] opacity-70">Yaoundé / Douala</span>
                  </button>
                </div>
              </div>

              {/* Détails Adresse si livraison */}
              {deliveryMode === 'livraison' ? (
                <div className="space-y-3 bg-brand-beige/40 p-4 rounded-2xl border border-brand-sand">
                  <div>
                    <label className="text-[9px] font-bold text-brand-stone/60 uppercase block mb-1">Région *</label>
                    <select
                      value={region}
                      onChange={e => setRegion(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-brand-sand focus:border-brand-orange outline-none font-bold text-brand-stone text-xs bg-white cursor-pointer"
                    >
                      {REGIONS_CAMEROUN.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-bold text-brand-stone/60 uppercase block mb-1">Ville / Localité *</label>
                      <input
                        type="text"
                        placeholder="Ex: Douala, Yaoundé, Bafoussam..."
                        value={ville}
                        onChange={e => setVille(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-brand-sand focus:border-brand-orange outline-none font-bold text-brand-stone text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-brand-stone/60 uppercase block mb-1">Quartier & Repère *</label>
                      <input
                        type="text"
                        placeholder="Ex: Akwa, face pharmacie..."
                        value={adresse}
                        onChange={e => setAdresse(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-brand-sand focus:border-brand-orange outline-none font-bold text-brand-stone text-xs bg-white"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-100 flex items-start gap-3">
                  <MapPin size={18} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-black uppercase text-blue-900">Sièges Imani-Tech</p>
                    <p className="text-[11px] font-medium text-blue-800/80 mt-0.5">
                      Douala (Akwa) & Yaoundé (Bastos). Disponibilité : Lun-Ven 8h00 - 18h00.
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : step === 2 ? (
            /* Étape 2 : Paiement Mobile Money */
            <>
              {/* Choix opérateur */}
              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/50">
                  1. Choisissez votre compte Mobile Money
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPayMethod('mtn')}
                    className={`p-3.5 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all text-center ${
                      payMethod === 'mtn'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-800 font-black'
                        : 'border-brand-sand text-brand-stone/60 font-bold hover:border-amber-400'
                    }`}
                  >
                    <span className="text-2xl">🟡</span>
                    <span className="text-xs uppercase">MTN MoMo</span>
                    <span className="text-[8px] font-mono opacity-80">{MTN_MOMO_NUMBER}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPayMethod('orange')}
                    className={`p-3.5 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all text-center ${
                      payMethod === 'orange'
                        ? 'border-orange-500 bg-orange-500/10 text-orange-800 font-black'
                        : 'border-brand-sand text-brand-stone/60 font-bold hover:border-orange-400'
                    }`}
                  >
                    <span className="text-2xl">🟠</span>
                    <span className="text-xs uppercase">Orange Money</span>
                    <span className="text-[8px] font-mono opacity-80">{ORANGE_MONEY_NUMBER}</span>
                  </button>
                </div>
              </div>

              {/* Instructions paiement */}
              <div className="bg-brand-stone text-white p-4 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60 font-bold">Montant à transférer</span>
                  <span className="text-lg font-black text-brand-orange">{fmt(total)}</span>
                </div>
                <div className="flex items-center justify-between bg-white/10 p-2.5 rounded-xl text-xs">
                  <div>
                    <p className="text-[8px] uppercase tracking-wider text-white/50">Numéro Marchand Imani-Tech</p>
                    <p className="font-mono font-black text-sm text-white">{targetMoMoNumber}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(targetMoMoNumber)}
                    className="flex items-center gap-1 bg-brand-orange hover:bg-white hover:text-brand-stone text-white px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all"
                  >
                    <Copy size={11} /> {copiedNumber ? 'Copié !' : 'Copier'}
                  </button>
                </div>
              </div>

              {/* Saisie numéro payeur */}
              <div className="space-y-3">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-wider text-brand-stone/60 block mb-1">
                    Votre numéro {payMethod === 'mtn' ? 'MTN' : 'Orange'} ayant payé *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-stone/40">+237</span>
                    <input
                      type="tel"
                      placeholder="6XX XXX XXX"
                      value={payPhone}
                      onChange={e => setPayPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                      className="w-full pl-14 pr-4 py-3 rounded-xl border-2 border-brand-sand focus:border-brand-orange outline-none font-black text-brand-stone text-sm bg-brand-beige/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-bold uppercase tracking-wider text-brand-stone/60 block mb-1">
                    ID / Référence de transaction SMS (optionnel)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: MP240902.1234.A001"
                    value={txCode}
                    onChange={e => setTxCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-brand-sand focus:border-brand-orange outline-none font-bold text-brand-stone text-xs bg-brand-beige/20"
                  />
                </div>
              </div>
            </>
          ) : (
            /* Étape 3 : Récapitulatif */
            <>
              <div className="bg-brand-beige/50 rounded-2xl border border-brand-sand p-4 space-y-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-orange">
                  Articles commandés ({cart.reduce((a, i) => a + i.qty, 0)})
                </p>
                <div className="divide-y divide-brand-sand/50 max-h-36 overflow-y-auto">
                  {cart.map(i => (
                    <div key={i.product.id} className="py-1.5 flex justify-between items-center text-xs">
                      <span className="font-bold text-brand-stone truncate mr-2">
                        {i.product.name} <span className="text-brand-orange">×{i.qty}</span>
                      </span>
                      <span className="font-black text-brand-stone shrink-0">{fmt(i.product.price * i.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-brand-sand flex justify-between items-center">
                  <span className="text-xs font-black uppercase text-brand-stone">Total Général</span>
                  <span className="text-xl font-black text-brand-stone">{fmt(total)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-brand-beige/40 p-3 rounded-xl border border-brand-sand">
                  <p className="text-[8px] font-black uppercase text-brand-orange mb-1">Destinataire</p>
                  <p className="font-black text-brand-stone truncate">{clientName}</p>
                  <p className="text-brand-stone/60">{clientPhone}</p>
                </div>
                <div className="bg-brand-beige/40 p-3 rounded-xl border border-brand-sand">
                  <p className="text-[8px] font-black uppercase text-brand-orange mb-1">Paiement</p>
                  <p className="font-black text-brand-stone">
                    {payMethod === 'mtn' ? 'MTN MoMo' : 'Orange Money'}
                  </p>
                  <p className="text-brand-stone/60">{payPhone}</p>
                </div>
              </div>

              <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 flex items-start gap-2.5">
                <MessageSquare size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[11px] font-medium text-emerald-800 leading-snug">
                  En cliquant ci-dessous, votre commande sera ouverte sur WhatsApp avec tous vos détails préformatés pour un traitement prioritaire.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        {!done && (
          <div className="shrink-0 p-4 sm:p-5 bg-white border-t border-brand-sand flex gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(prev => (prev - 1) as 1 | 2)}
                className="px-4 py-3.5 rounded-xl border-2 border-brand-sand text-brand-stone font-black text-xs uppercase tracking-wider hover:border-brand-orange transition-all flex items-center gap-1 active:scale-95"
              >
                <ChevronLeft size={14} /> Retour
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(prev => (prev + 1) as 2 | 3)}
                disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
                className="flex-1 bg-brand-orange disabled:bg-brand-sand text-white disabled:text-brand-stone/40 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-stone transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95 disabled:cursor-not-allowed"
              >
                Suivant <ChevronRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="flex-1 bg-[#25D366] hover:bg-emerald-600 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageSquare size={16} /> Envoyer sur WhatsApp
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── MODAL DÉTAILS PRODUIT ────────────────────────────────────────────────────
const ProductModal: React.FC<{
  product: ShopProduct;
  category: string;
  onClose: () => void;
  onAdd: (p: ShopProduct, cat: string, qty: number) => void;
  onDirectOrder: (p: ShopProduct, cat: string) => void;
}> = ({ product: p, category, onClose, onAdd, onDirectOrder }) => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const discountPercent = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

  const handleAddWithQty = () => {
    onAdd(p, category, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[220] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-brand-stone/80 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative bg-white w-full sm:max-w-2xl rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden max-h-[92vh]"
        style={{ animation: 'slideInFromBottom 0.3s cubic-bezier(0.16, 1, 0.3, 1) both' }}
      >
        {/* Header modal */}
        <div className="bg-brand-stone text-white p-4 sm:p-5 flex justify-between items-start shrink-0 border-b-4 border-brand-orange">
          <div className="pr-3 min-w-0">
            <span className="text-[8px] font-black uppercase tracking-widest text-brand-orange block mb-0.5">
              {category} · {p.brand}
            </span>
            <h2 className="text-base sm:text-lg font-black uppercase tracking-tight leading-snug line-clamp-2">
              {p.name}
            </h2>
            <p className="text-white/40 text-[9px] font-mono uppercase mt-0.5">Réf: {p.ref}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer la vue produit"
            className="w-9 h-9 bg-white/10 hover:bg-brand-orange rounded-xl flex items-center justify-center transition-all shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* Corps modal scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-5">
          {/* Bloc image + infos rapides */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-brand-beige/40 border border-brand-sand/60 flex items-center justify-center p-2">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-brand-stone tracking-tight">
                  {fmt(p.price)}
                </div>
                {p.oldPrice && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-brand-stone/40 line-through font-bold">{fmt(p.oldPrice)}</span>
                    <span className="text-[9px] font-black bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                      -{discountPercent}%
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Stars rating={p.rating} size={14} />
                <span className="text-xs font-black text-brand-stone/60">{p.rating} / 5 ({p.reviews} avis vérifiés)</span>
              </div>

              <div className="pt-2 border-t border-brand-sand/50 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-brand-stone/70 font-medium">
                  <Truck size={14} className="text-brand-orange shrink-0" />
                  <span>Livraison disponible dans les 10 régions du Cameroun</span>
                </div>
                <div className="flex items-center gap-2 text-brand-stone/70 font-medium">
                  <ShieldCheck size={14} className="text-brand-orange shrink-0" />
                  <span>Garantie constructeur & support technique certifié</span>
                </div>
                <div className="flex items-center gap-2 text-brand-stone/70 font-medium">
                  <RotateCcw size={14} className="text-brand-orange shrink-0" />
                  <span>Remplacement garanti sous 7 jours en cas d'avarie</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description technique */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-stone/50">
              Spécifications & Description technique
            </h4>
            <p className="text-brand-stone/80 text-xs sm:text-sm font-medium leading-relaxed bg-brand-beige/20 p-4 rounded-2xl border border-brand-sand/50">
              {p.description}
            </p>
          </div>

          {/* Mots clés / tags */}
          {p.tags && p.tags.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40">Tags & Catégories</h4>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map(t => (
                  <span
                    key={t}
                    className="px-2.5 py-1 bg-brand-beige rounded-lg text-[9px] font-bold text-brand-stone/70 uppercase"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions modal */}
        <div className="shrink-0 p-4 sm:p-5 bg-white border-t border-brand-sand flex flex-col sm:flex-row items-center gap-3">
          {/* Stepper quantité */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-2 bg-brand-beige/80 rounded-2xl px-3 py-2 border border-brand-sand">
            <span className="text-[10px] font-bold text-brand-stone/60 uppercase">Qté:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-7 h-7 rounded-xl bg-white hover:bg-brand-orange hover:text-white flex items-center justify-center font-black transition-all shadow-xs"
              >
                <Minus size={12} />
              </button>
              <span className="text-sm font-black text-brand-stone w-6 text-center tabular-nums">{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="w-7 h-7 rounded-xl bg-white hover:bg-brand-orange hover:text-white flex items-center justify-center font-black transition-all shadow-xs"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          {/* Bouton ajouter */}
          <button
            onClick={handleAddWithQty}
            className={`flex-1 w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-brand-orange hover:bg-brand-stone text-white shadow-brand-orange/20'
            }`}
          >
            {added ? (
              <>
                <Check size={16} /> Ajouté au panier !
              </>
            ) : (
              <>
                <ShoppingCart size={16} /> Ajouter ({fmt(p.price * qty)})
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── PAGE PRINCIPALE BOUTIQUE ──────────────────────────────────────────────────
const ShopPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'new' | 'rating'>('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [filterBadge, setFilterBadge] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Panier & Modales avec persistance locale
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('imanitech_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ product: ShopProduct; category: string } | null>(null);

  // Sauvegarde panier dans localStorage
  useEffect(() => {
    try {
      localStorage.setItem('imanitech_cart', JSON.stringify(cart));
    } catch {
      // Ignorer si quota dépassé
    }
  }, [cart]);

  const cartCount = cart.reduce((a, i) => a + i.qty, 0);
  const cartTotal = cart.reduce((a, i) => a + i.product.price * i.qty, 0);
  const totalProducts = SHOP_CATEGORIES.reduce((a, c) => a + c.products.length, 0);

  // Suggestions de recherche
  const suggestions = useMemo(() => {
    if (searchQuery.trim().length < 2) return [];
    const q = searchQuery.toLowerCase();
    const set = new Set<string>();

    SHOP_CATEGORIES.forEach(c =>
      c.products.forEach(p => {
        if (p.name.toLowerCase().includes(q)) set.add(p.name);
        if (p.brand.toLowerCase().includes(q)) set.add(p.brand);
        p.tags.forEach(t => {
          if (t.toLowerCase().includes(q)) set.add(t);
        });
      })
    );
    return Array.from(set).slice(0, 5);
  }, [searchQuery]);

  // Tous les produits filtrés & triés
  const allProducts = useMemo(() => {
    const cats = activeCategory === 'all' ? SHOP_CATEGORIES : SHOP_CATEGORIES.filter(c => c.id === activeCategory);
    let list: { product: ShopProduct; category: string }[] = [];

    cats.forEach(c => c.products.forEach(p => list.push({ product: p, category: c.name })));

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        ({ product: p }) =>
          p.name.toLowerCase().includes(q) ||
          p.ref.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    list = list.filter(({ product: p }) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (filterBadge) list = list.filter(({ product: p }) => p.badge === filterBadge);
    if (filterBrand) list = list.filter(({ product: p }) => p.brand === filterBrand);

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.product.price - b.product.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.product.price - a.product.price);
        break;
      case 'rating':
        list.sort((a, b) => b.product.rating - a.product.rating);
        break;
      case 'new':
        list.sort((a, b) => (b.product.badge === 'Nouveau' ? 1 : 0) - (a.product.badge === 'Nouveau' ? 1 : 0));
        break;
      default:
        list.sort((a, b) => (b.product.badge === 'Bestseller' ? 1 : 0) - (a.product.badge === 'Bestseller' ? 1 : 0));
    }

    return list;
  }, [activeCategory, searchQuery, sortBy, priceRange, filterBadge, filterBrand]);

  // Liste de toutes les marques uniques
  const allBrands = useMemo(() => {
    const set = new Set<string>();
    SHOP_CATEGORIES.forEach(c => c.products.forEach(p => set.add(p.brand)));
    return Array.from(set).sort();
  }, []);

  // Gestion du panier
  const addToCart = useCallback((product: ShopProduct, category: string, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, qty: i.qty + quantity } : i
        );
      }
      return [...prev, { product, qty: quantity, category }];
    });
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setCart(prev =>
      prev
        .map(i => (i.product.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter(i => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart(prev => prev.filter(i => i.product.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const hasActiveFilters = !!(filterBadge || filterBrand || priceRange[1] < 2000000);

  const resetAllFilters = () => {
    setSearchQuery('');
    setFilterBadge('');
    setFilterBrand('');
    setPriceRange([0, 2000000]);
    setActiveCategory('all');
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-28 sm:pt-36 lg:pt-40 pb-28 sm:pb-24 page-appear">
      {/* ─── HERO SECTION ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-8 sm:py-14 px-4 relative overflow-hidden border-b border-brand-sand/80 shadow-xs">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-[9px] font-black uppercase tracking-widest mb-3">
            <Sparkles size={12} />
            <span>Catalogue Officiel Imani-Tech</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-3 tracking-tighter uppercase leading-[0.95] text-brand-stone">
            {SHOP_CATEGORIES.length} Catégories<br />
            <span className="text-brand-orange">d'Équipements Pro</span>
          </h1>

          <p className="text-xs sm:text-sm text-brand-stone/60 max-w-2xl mx-auto font-bold mb-6 px-4">
            {totalProducts}+ références certifiées · Paiement sécurisé Mobile Money (MoMo / OM) · Livraison dans les{' '}
            <strong className="text-brand-stone">10 régions du Cameroun</strong>
          </p>

          {/* Barre de Recherche Principale */}
          <div className="max-w-2xl mx-auto relative px-2 sm:px-0">
            {searchFocused && suggestions.length > 0 && (
              <div className="fixed inset-0 z-20" onClick={() => setSearchFocused(false)} />
            )}

            <div className={`relative z-30 transition-all duration-300 ${searchFocused ? 'scale-[1.01]' : ''}`}>
              <div
                className={`flex items-center bg-white border-2 rounded-2xl shadow-lg transition-all overflow-hidden ${
                  searchFocused
                    ? 'border-brand-orange shadow-brand-orange/20 shadow-xl'
                    : 'border-brand-sand hover:border-brand-stone/40'
                }`}
              >
                <div className="pl-4 pr-2 shrink-0">
                  <Search
                    size={18}
                    className={`transition-colors ${searchFocused ? 'text-brand-orange' : 'text-brand-stone/40'}`}
                  />
                </div>
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Rechercher équipement, marque (HP, Cisco, Dahua...), référence..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  className="flex-grow py-3.5 sm:py-4 pr-2 outline-none font-bold text-brand-stone bg-transparent text-xs sm:text-sm placeholder:text-brand-stone/30 min-w-0"
                />

                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      searchRef.current?.focus();
                    }}
                    className="shrink-0 w-7 h-7 mr-1 bg-brand-sand/50 hover:bg-red-100 hover:text-red-500 text-brand-stone/50 rounded-full flex items-center justify-center transition-all"
                  >
                    <X size={12} />
                  </button>
                )}

                <button
                  onClick={() => searchRef.current?.focus()}
                  className="shrink-0 m-1.5 bg-brand-orange hover:bg-brand-stone text-white px-4 sm:px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap shadow-sm active:scale-95"
                >
                  <span className="hidden sm:inline">Chercher</span>
                  <Search size={14} className="sm:hidden" />
                </button>
              </div>

              {/* Suggestions auto-complétion */}
              {searchFocused && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-brand-sand rounded-2xl shadow-2xl z-40 overflow-hidden text-left">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSearchQuery(s);
                        setSearchFocused(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brand-beige/50 transition-colors text-left border-b border-brand-sand/30 last:border-0"
                    >
                      <Search size={12} className="text-brand-orange shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-brand-stone capitalize">{s}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Mots clés rapides */}
              {!searchQuery && (
                <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                  {['Laptop HP', 'Epson EcoTank', 'Switch Cisco', 'Hikvision 4K', 'Onduleur APC', 'WiFi 6', 'Synology NAS'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-2.5 py-1 bg-white border border-brand-sand rounded-full text-[9px] font-black uppercase tracking-wider text-brand-stone/60 hover:border-brand-orange hover:text-brand-orange transition-all shadow-2xs"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Badges de confiance */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-6 px-4">
            {[
              ['🚚', 'Livraison 10 Régions'],
              ['🔒', 'Paiement MoMo & OM'],
              ['🔄', 'Remplacement 7 Jours'],
              ['⭐', 'Garantie Constructeur'],
            ].map(([icon, label]) => (
              <div
                key={label}
                className="flex items-center gap-1.5 text-brand-stone/60 font-black text-[9px] uppercase tracking-wider"
              >
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BANDEAU PARTENAIRES ──────────────────────────────────────────────── */}
      <div className="bg-brand-stone py-2.5 overflow-hidden border-y border-brand-orange/20">
        <div className="flex whitespace-nowrap" style={{ animation: 'tickerScroll 35s linear infinite' }}>
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <span
              key={i}
              className="text-[8px] font-black uppercase tracking-[0.3em] text-white/50 mr-8 hover:text-brand-orange transition-colors"
            >
              ✦ {p}
            </span>
          ))}
        </div>
      </div>

      {/* ─── NAVIGATION CATÉGORIES & FILTRES STICKY ───────────────────────────── */}
      <section
        className="sticky z-30 bg-white/95 backdrop-blur-xl border-b border-brand-sand shadow-sm top-[96px] sm:top-[112px] lg:top-[128px]"
      >
        {/* Catégories Scrollables */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveCategory('all')}
            className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-full font-black text-[9px] uppercase tracking-wider border-2 transition-all ${
              activeCategory === 'all'
                ? 'bg-brand-stone text-white border-brand-stone shadow-sm'
                : 'border-brand-sand text-brand-stone/80 hover:border-brand-orange'
            }`}
          >
            Tous ({totalProducts})
          </button>
          {SHOP_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full font-black text-[9px] uppercase tracking-wider border-2 transition-all ${
                activeCategory === cat.id
                  ? 'bg-brand-orange text-white border-brand-orange shadow-sm'
                  : 'border-brand-sand text-brand-stone/80 hover:border-brand-orange'
              }`}
            >
              <span>{cat.icon}</span>
              <span className="hidden sm:inline">{cat.name}</span>
              <span className="sm:hidden">{cat.name.split(' ')[0]}</span>
              <span className="text-[8px] opacity-70">({cat.products.length})</span>
            </button>
          ))}
        </div>

        {/* Barre des contrôles : Tri, Filtres & Panier */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-2 border-t border-brand-sand/40">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <span className="text-[9px] font-black text-brand-stone/50 uppercase hidden sm:block shrink-0">
              {allProducts.length} résultat{allProducts.length > 1 ? 's' : ''}
            </span>

            {/* Sélecteur de tri */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="text-[9px] font-black uppercase tracking-wider border-2 border-brand-sand rounded-full px-3 py-1.5 bg-white text-brand-stone focus:border-brand-orange outline-none cursor-pointer shrink-0"
            >
              <option value="popular">Popularité</option>
              <option value="rating">Mieux notés</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="new">Nouveautés</option>
            </select>

            {/* Bouton filtres avancés */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-black text-[9px] uppercase tracking-wider border-2 transition-all ${
                showFilters || hasActiveFilters
                  ? 'bg-brand-stone text-white border-brand-stone'
                  : 'border-brand-sand text-brand-stone hover:border-brand-orange'
              }`}
            >
              <SlidersHorizontal size={11} />
              <span>Filtres</span>
              {hasActiveFilters && <span className="w-1.5 h-1.5 bg-brand-orange rounded-full" />}
            </button>
          </div>

          {/* Bouton d'accès au panier */}
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Ouvrir le panier"
            className="relative shrink-0 flex items-center gap-2 bg-brand-orange text-white px-3.5 sm:px-5 py-2 rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-brand-stone transition-all shadow-md active:scale-95"
          >
            <ShoppingCart size={14} />
            <span className="hidden sm:inline">Panier</span>
            {cartCount > 0 && (
              <span className="min-w-[18px] h-[18px] px-1 bg-white text-brand-orange rounded-full text-[8px] font-black flex items-center justify-center border border-brand-orange">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Tiroir de filtres repliable */}
        {showFilters && (
          <div className="border-t border-brand-sand/40 bg-brand-beige/40 px-3 sm:px-4 py-4 transition-all">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/50 mb-1.5">
                  Budget Maximum
                </p>
                <input
                  type="range"
                  min={0}
                  max={2000000}
                  step={25000}
                  value={priceRange[1]}
                  onChange={e => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-brand-orange cursor-pointer"
                />
                <p className="text-[11px] font-black text-brand-orange mt-1">≤ {fmt(priceRange[1])}</p>
              </div>

              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/50 mb-1.5">
                  Statut & Badges
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['Nouveau', 'Bestseller', 'Promo', 'Stock limité'].map(b => (
                    <button
                      key={b}
                      onClick={() => setFilterBadge(filterBadge === b ? '' : b)}
                      className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase border-2 transition-all ${
                        filterBadge === b
                          ? 'bg-brand-orange text-white border-brand-orange'
                          : 'border-brand-sand text-brand-stone bg-white hover:border-brand-orange'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/50 mb-1.5">
                  Marques partenaires
                </p>
                <select
                  value={filterBrand}
                  onChange={e => setFilterBrand(e.target.value)}
                  className="w-full text-[9px] font-black uppercase border-2 border-brand-sand rounded-xl px-3 py-2 bg-white text-brand-stone focus:border-brand-orange outline-none cursor-pointer"
                >
                  <option value="">Toutes les marques</option>
                  {allBrands.map(b => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-3 pt-3 border-t border-brand-sand/50 flex justify-end">
                <button
                  onClick={resetAllFilters}
                  className="text-[9px] font-black uppercase tracking-wider text-brand-orange hover:underline flex items-center gap-1"
                >
                  <X size={11} /> Réinitialiser tous les filtres
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ─── GRILLE PRODUITS ─────────────────────────────────────────────────── */}
      <section className="py-6 sm:py-10 px-3 sm:px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {searchQuery && (
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-xs font-black text-brand-stone/60 uppercase tracking-wider">
                {allProducts.length} résultat{allProducts.length > 1 ? 's' : ''} pour
              </span>
              <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange font-black text-xs rounded-full border border-brand-orange/20">
                "{searchQuery}"
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-[9px] font-black text-brand-stone/40 hover:text-brand-orange underline uppercase tracking-widest ml-1"
              >
                Effacer
              </button>
            </div>
          )}

          {allProducts.length === 0 ? (
            <div className="text-center py-20 space-y-4 bg-white rounded-3xl border border-brand-sand p-8 shadow-xs">
              <span className="text-5xl block">🔍</span>
              <p className="text-brand-stone font-black uppercase text-sm tracking-widest">Aucun équipement correspondant</p>
              <p className="text-brand-stone/50 text-xs max-w-sm mx-auto font-medium">
                Essayez d'élargir votre recherche, de changer de catégorie ou de réinitialiser vos critères de budget.
              </p>
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-stone text-white px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all shadow-md active:scale-95"
              >
                <X size={12} /> Voir tous les produits
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {allProducts.map(({ product, category }) => {
                const inCartItem = cart.find(i => i.product.id === product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    category={category}
                    inCartQty={inCartItem?.qty}
                    onView={(p, cat) => setSelectedProduct({ product: p, category: cat })}
                    onAdd={(p, cat) => addToCart(p, cat, 1)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ─── MODALES & COMPOSANTS OVERLAY ────────────────────────────────────── */}
      {/* Modal Détails Produit */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct.product}
          category={selectedProduct.category}
          onClose={() => setSelectedProduct(null)}
          onAdd={addToCart}
          onDirectOrder={(p, cat) => {
            addToCart(p, cat, 1);
            setSelectedProduct(null);
            setCheckoutOpen(true);
          }}
        />
      )}

      {/* Panier Tiroir Latéral */}
      <CartDrawer
        cart={cart}
        total={cartTotal}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {/* Modal Tunnel de Commande */}
      <CheckoutModal
        open={checkoutOpen}
        cart={cart}
        total={cartTotal}
        onClose={() => setCheckoutOpen(false)}
        onOrderSuccess={() => {
          clearCart();
        }}
      />

      {/* Badge Panier Flottant */}
      <FloatingCartBadge
        count={cartCount}
        total={cartTotal}
        onClick={() => setCartOpen(true)}
      />

      {/* ─── GARANTIES & SAV ─────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-brand-stone text-white text-center rounded-2xl sm:rounded-[3rem] mx-3 sm:mx-4 md:mx-8 mt-10 sm:mt-16 overflow-hidden relative border-y border-brand-orange/20 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Globe size={200} />
        </div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-orange text-[8px] font-black uppercase tracking-widest mb-6">
            <ShieldCheck size={12} />
            <span>Garantie Intégrale Imani-Tech</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-8 uppercase tracking-tight">
            Achetez avec <span className="text-brand-orange">Sérénité & Confiance</span>.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {[
              [Truck, 'Livraison Nationale', '10 régions du Cameroun'],
              [RotateCcw, 'Retour 7 Jours', 'Remplacement garanti'],
              [ShieldCheck, 'Produits Certifiés', 'Matériel pro d\'origine'],
              [Zap, 'Assistance Dédiée', 'Techniciens disponibles'],
            ].map(([Icon, title, desc]) => (
              <div
                key={title as string}
                className="bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-brand-orange/40 transition-all"
              >
                <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center mb-3 mx-auto shadow-md">
                  {React.createElement(Icon as React.ElementType, { size: 18, className: 'text-white' })}
                </div>
                <h4 className="font-black uppercase text-xs sm:text-sm mb-1">{title as string}</h4>
                <p className="text-[8px] sm:text-[9px] font-bold text-white/50 uppercase">{desc as string}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to={AppRoute.Contact}
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-white hover:text-brand-stone text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider transition-all shadow-xl shadow-brand-orange/30 active:scale-95"
            >
              Demander un devis sur mesure <ArrowRight size={16} />
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-[#25D366] text-white px-6 py-4 rounded-full font-black text-sm uppercase tracking-wider transition-all border border-white/20 active:scale-95"
            >
              <MessageSquare size={16} /> Contact WhatsApp Direct
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
