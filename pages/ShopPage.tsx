import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  ShoppingCart, X, Star, ChevronRight, ChevronLeft,
  Search, Check, ArrowRight, Minus, Plus, ShieldCheck, Truck,
  RotateCcw, Smartphone, Globe, SlidersHorizontal,
  Zap, MapPin, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';
import {
  SHOP_CATEGORIES, ShopProduct,
  PARTNERS, WHATSAPP_ORDER_NUMBER, ORANGE_MONEY_NUMBER, MTN_MOMO_NUMBER
} from '../shopData';

const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA';

const REGIONS_CAMEROUN = [
  'Adamaoua', 'Centre', 'Est', 'Extrême-Nord',
  'Littoral', 'Nord', 'Nord-Ouest', 'Ouest', 'Sud', 'Sud-Ouest'
];

const Stars = ({ rating, size = 12 }: { rating: number; size?: number }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map(i => (
      <Star key={i} size={size}
        className={i <= Math.round(rating) ? 'text-brand-orange fill-brand-orange' : 'text-brand-sand'} />
    ))}
  </div>
);

interface CartItem { product: ShopProduct; qty: number; category: string; }

// ─── BADGE PANIER FLOTTANT ────────────────────────────────────────────────────
const FloatingCartBadge: React.FC<{ count: number; total: number; onClick: () => void }> = ({ count, total, onClick }) => {
  if (count === 0) return null;
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-3 bg-brand-orange text-white px-4 sm:px-5 py-3 sm:py-3.5 rounded-full shadow-2xl shadow-brand-orange/40 hover:bg-brand-stone transition-all active:scale-95 animate-in slide-in-from-bottom-4 duration-300"
    >
      <div className="relative">
        <ShoppingCart size={18} />
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-brand-orange rounded-full text-[8px] font-black flex items-center justify-center border border-brand-orange">
          {count}
        </span>
      </div>
      <div className="flex flex-col items-start leading-none">
        <span className="text-[8px] font-bold uppercase tracking-widest opacity-80">Mon panier</span>
        <span className="text-xs sm:text-sm font-black tracking-tighter">{fmt(total)}</span>
      </div>
      <ChevronRight size={14} className="opacity-70" />
    </button>
  );
};

// ─── CARTE PRODUIT ────────────────────────────────────────────────────────────
const ProductCard: React.FC<{
  product: ShopProduct; category: string;
  onView: (p: ShopProduct, cat: string) => void;
  onAdd: (p: ShopProduct, cat: string) => void;
}> = ({ product: p, category, onView, onAdd }) => (
  <div onClick={() => onView(p, category)}
    className="bg-white rounded-2xl border border-brand-sand hover:border-brand-orange shadow-sm hover:shadow-xl transition-all group flex flex-col cursor-pointer relative overflow-hidden">
    {p.badge && (
      <div className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest text-white shadow ${
        p.badge === 'Promo' ? 'bg-red-500' : p.badge === 'Nouveau' ? 'bg-green-500' :
        p.badge === 'Bestseller' ? 'bg-brand-orange' : 'bg-brand-stone'}`}>{p.badge}</div>
    )}
    {p.oldPrice && (
      <div className="absolute top-2 right-2 z-10 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-[8px] font-black">
        -{Math.round((1 - p.price / p.oldPrice) * 100)}%
      </div>
    )}
    <div className="w-full h-32 sm:h-40 overflow-hidden rounded-t-2xl bg-brand-beige/30">
      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
    </div>
    <div className="p-3 sm:p-4 flex flex-col flex-grow">
      <span className="text-[8px] font-black uppercase tracking-widest text-brand-orange mb-0.5">{p.brand}</span>
      <h3 className="text-[11px] sm:text-xs font-black text-brand-stone uppercase tracking-tight mb-1 leading-tight group-hover:text-brand-orange transition-colors line-clamp-2">{p.name}</h3>
      <p className="text-brand-stone/50 text-[10px] leading-relaxed mb-2 line-clamp-2 flex-grow font-medium">{p.description.slice(0, 90)}...</p>
      <div className="flex items-center gap-1.5 mb-2">
        <Stars rating={p.rating} size={9} />
        <span className="text-[8px] text-brand-stone/40 font-bold">({p.reviews})</span>
      </div>
      <div className="flex items-end justify-between mb-3">
        <div>
          <div className="text-sm sm:text-base font-black text-brand-stone tracking-tighter">{fmt(p.price)}</div>
          {p.oldPrice && <div className="text-[9px] text-brand-stone/30 line-through font-bold">{fmt(p.oldPrice)}</div>}
        </div>
        <span className={`text-[7px] font-black uppercase px-1.5 py-0.5 rounded-full ${
          p.stock <= 5 ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
          {p.stock <= 5 ? `${p.stock} restants` : 'En stock'}
        </span>
      </div>
      <button onClick={e => { e.stopPropagation(); onAdd(p, category); }}
        className="w-full bg-brand-orange text-white py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-brand-stone transition-all flex items-center justify-center gap-1.5 shadow-md shadow-brand-orange/20 active:scale-95">
        <ShoppingCart size={11} /> Ajouter
      </button>
    </div>
  </div>
);

// ─── PANIER LATÉRAL ───────────────────────────────────────────────────────────
const CartDrawer: React.FC<{
  cart: CartItem[]; total: number; open: boolean;
  onClose: () => void; onUpdateQty: (id: string, delta: number) => void; onCheckout: () => void;
}> = ({ cart, total, open, onClose, onUpdateQty, onCheckout }) => {
  const count = cart.reduce((a, i) => a + i.qty, 0);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-brand-stone/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full sm:w-[420px] md:w-[480px] h-full flex flex-col shadow-2xl"
        style={{ animation: 'slideInFromRight 0.3s cubic-bezier(0.32,0.72,0,1) both' }}>

        {/* Header */}
        <div className="bg-brand-stone text-white shrink-0">
          <div className="flex items-center justify-between p-4 sm:p-5 border-b-4 border-brand-orange">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-orange mb-0.5">Imani-Tech</p>
              <h2 className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
                <ShoppingCart size={18} /> Mon Panier
                <span className="text-sm bg-brand-orange text-white w-6 h-6 rounded-full flex items-center justify-center font-black">{count}</span>
              </h2>
            </div>
            <button onClick={onClose} className="w-9 h-9 bg-white/10 hover:bg-brand-orange rounded-full flex items-center justify-center transition-all active:scale-90">
              <X size={16} />
            </button>
          </div>
          {cart.length > 0 && (
            <div className="px-4 sm:px-5 py-2.5 flex items-center justify-between bg-white/5">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Total commande</span>
              <span className="text-xl font-black tracking-tighter">{fmt(total)}</span>
            </div>
          )}
        </div>

        {/* Articles scrollables */}
        <div className="flex-grow overflow-y-auto overscroll-contain">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 p-8">
              <div className="w-20 h-20 bg-brand-beige rounded-full flex items-center justify-center">
                <ShoppingCart size={32} className="text-brand-stone/20" />
              </div>
              <div>
                <p className="text-brand-stone/50 font-black uppercase text-[10px] tracking-widest mb-1">Votre panier est vide</p>
                <p className="text-brand-stone/30 text-xs font-medium">Explorez nos produits et ajoutez-en au panier</p>
              </div>
              <button onClick={onClose} className="mt-2 text-brand-orange font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-1">
                <ArrowRight size={12} /> Continuer mes achats
              </button>
            </div>
          ) : (
            <div className="p-3 sm:p-4 space-y-2.5">
              {cart.map(item => (
                <div key={item.product.id} className="bg-white border border-brand-sand rounded-2xl p-3 flex gap-3 hover:border-brand-orange/30 transition-colors">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-brand-beige/50 shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-[9px] font-black text-brand-orange uppercase tracking-wide mb-0.5">{item.product.brand}</p>
                    <p className="text-[10px] sm:text-[11px] font-black text-brand-stone uppercase tracking-tight leading-tight line-clamp-2 mb-1.5">{item.product.name}</p>
                    <p className="text-[9px] text-brand-stone/40 uppercase font-bold mb-2">{item.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-brand-stone">{fmt(item.product.price * item.qty)}</span>
                      <div className="flex items-center gap-1 bg-brand-beige rounded-full px-1 py-0.5">
                        <button onClick={() => onUpdateQty(item.product.id, -1)}
                          className="w-6 h-6 rounded-full bg-white hover:bg-red-50 hover:text-red-500 text-brand-stone/50 flex items-center justify-center transition-all shadow-sm active:scale-90">
                          <Minus size={10} />
                        </button>
                        <span className="text-[11px] font-black text-brand-stone w-5 text-center">{item.qty}</span>
                        <button onClick={() => onUpdateQty(item.product.id, 1)}
                          className="w-6 h-6 rounded-full bg-white hover:bg-brand-orange hover:text-white text-brand-orange flex items-center justify-center transition-all shadow-sm active:scale-90">
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer CTA — toujours visible */}
        {cart.length > 0 && (
          <div className="shrink-0 bg-white border-t border-brand-sand p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40">{count} article{count > 1 ? 's' : ''}</p>
                <p className="text-2xl font-black text-brand-stone tracking-tighter">{fmt(total)}</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-bold text-brand-stone/30 uppercase">Livraison</p>
                <p className="text-[10px] font-black text-brand-orange">À calculer</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-brand-orange/5 rounded-xl px-3 py-2 border border-brand-orange/15">
              <Truck size={13} className="text-brand-orange shrink-0" />
              <p className="text-[9px] font-bold text-brand-stone/60 leading-snug">
                Livraison dans les <strong className="text-brand-stone">10 régions du Cameroun</strong>
              </p>
            </div>
            <button onClick={onCheckout}
              className="w-full bg-brand-orange text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-brand-stone transition-all shadow-xl shadow-brand-orange/25 flex items-center justify-center gap-2 active:scale-95">
              <Smartphone size={15} /> Commander maintenant <ChevronRight size={15} />
            </button>
            <button onClick={onClose} className="w-full text-brand-stone/40 font-black text-[9px] uppercase tracking-widest hover:text-brand-orange transition-colors py-1">
              ← Continuer mes achats
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── CHECKOUT ─────────────────────────────────────────────────────────────────
const CheckoutModal: React.FC<{
  open: boolean; cart: CartItem[]; total: number; onClose: () => void;
}> = ({ open, cart, total, onClose }) => {
  const [step, setStep] = useState<1|2|3>(1);
  const [done, setDone] = useState(false);
  const [payMethod, setPayMethod] = useState<'mtn'|'orange'>('mtn');
  const [payPhone, setPayPhone] = useState('');
  const [txCode, setTxCode] = useState('');
  const [deliveryMode, setDeliveryMode] = useState<'livraison'|'retrait'>('livraison');
  const [region, setRegion] = useState('');
  const [ville, setVille] = useState('');
  const [adresse, setAdresse] = useState('');

  useEffect(() => { if (open) { setStep(1); setDone(false); } }, [open]);
  if (!open) return null;

  const buildMsg = () => encodeURIComponent([
    `*🛒 COMMANDE IMANI-TECH*`,
    `━━━━━━━━━━━━━━━━━━━━━`,
    `*Paiement :* ${payMethod === 'mtn' ? 'MTN Mobile Money' : 'Orange Money'}`,
    `*Numéro payeur :* +237 ${payPhone}`,
    `*Code transaction :* ${txCode}`,
    `━━━━━━━━━━━━━━━━━━━━━`,
    `*ARTICLES :*`,
    ...cart.map(i => `• ${i.product.name} ×${i.qty} — ${fmt(i.product.price * i.qty)}`),
    `━━━━━━━━━━━━━━━━━━━━━`,
    `*TOTAL :* ${fmt(total)}`,
    deliveryMode === 'livraison'
      ? `*Livraison :* Région ${region} — ${ville}\n*Adresse :* ${adresse}`
      : `*Livraison :* Retrait siège Imani-Tech (Yaoundé)`,
  ].join('\n'));

  const canStep1 = payPhone.length >= 9 && txCode.length >= 4;
  const canStep2 = deliveryMode === 'retrait' || (!!region && !!ville && !!adresse);

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center sm:p-4 bg-brand-stone/90 backdrop-blur-md">
      <div className="bg-white w-full sm:max-w-lg rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl max-h-[96vh] flex flex-col overflow-hidden"
        style={{ animation: 'slideInFromBottom 0.35s cubic-bezier(0.32,0.72,0,1) both' }}>

        {/* Header + progress */}
        <div className="bg-brand-stone text-white shrink-0 border-b-4 border-brand-orange">
          <div className="flex items-center justify-between p-4 sm:p-5">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-orange mb-0.5">
                {done ? 'Terminé' : `Étape ${step} / 3`}
              </p>
              <h2 className="text-lg font-black uppercase tracking-tighter">
                {done ? '✓ Commande envoyée !'
                  : step === 1 ? 'Paiement Mobile Money'
                  : step === 2 ? 'Livraison & Région'
                  : 'Récapitulatif'}
              </h2>
            </div>
            <button onClick={onClose} className="w-9 h-9 bg-white/10 hover:bg-brand-orange rounded-full flex items-center justify-center transition-all">
              <X size={16} />
            </button>
          </div>
          {!done && (
            <div className="flex px-4 sm:px-5 pb-3 gap-1.5">
              {[{n:1,l:'Paiement'},{n:2,l:'Livraison'},{n:3,l:'Confirmation'}].map(s => (
                <div key={s.n} className="flex-1">
                  <div className={`h-1 rounded-full mb-1 transition-all duration-300 ${step >= s.n ? 'bg-brand-orange' : 'bg-white/20'}`} />
                  <span className={`text-[7px] font-black uppercase tracking-widest ${step >= s.n ? 'text-brand-orange' : 'text-white/30'}`}>{s.l}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Corps scrollable */}
        <div className="flex-grow overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-4">

          {/* ── DONE ── */}
          {done && (
            <div className="text-center space-y-5 py-6">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto border-4 border-green-200">
                <Check size={36} className="text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter text-brand-stone mb-2">Commande envoyée !</h3>
                <p className="text-brand-stone/60 font-medium text-sm leading-relaxed">
                  Votre commande a été transmise sur WhatsApp. Notre équipe vous contacte dans les plus brefs délais pour confirmer et organiser la livraison dans votre région.
                </p>
              </div>
              <div className="bg-brand-beige/60 p-4 rounded-2xl border border-brand-sand text-left space-y-1.5">
                <p className="text-[8px] font-black uppercase tracking-widest text-brand-orange">Récapitulatif</p>
                <p className="font-black text-brand-stone text-xl">{fmt(total)}</p>
                <p className="text-[10px] font-bold text-brand-stone/50">{payMethod === 'mtn' ? 'MTN MoMo' : 'Orange Money'} · +237 {payPhone}</p>
                {deliveryMode === 'livraison' && <p className="text-[10px] font-bold text-brand-stone/50">Région {region}, {ville}</p>}
              </div>
              <button onClick={onClose} className="w-full bg-brand-stone text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-all active:scale-95">
                Retour à la boutique
              </button>
            </div>
          )}

          {/* ── ÉTAPE 1 ── */}
          {!done && step === 1 && (
            <>
              <div className="bg-brand-beige/50 rounded-2xl border border-brand-sand overflow-hidden">
                <div className="px-4 py-2.5 border-b border-brand-sand/50 flex justify-between">
                  <span className="text-[8px] font-black uppercase tracking-widest text-brand-orange">Votre commande</span>
                  <span className="text-[8px] font-black text-brand-stone/40">{cart.reduce((a,i)=>a+i.qty,0)} article{cart.reduce((a,i)=>a+i.qty,0)>1?'s':''}</span>
                </div>
                <div className="max-h-28 overflow-y-auto divide-y divide-brand-sand/50">
                  {cart.map(i => (
                    <div key={i.product.id} className="flex justify-between items-center px-4 py-2">
                      <span className="text-[10px] font-bold text-brand-stone/70 truncate mr-3">{i.product.name} ×{i.qty}</span>
                      <span className="text-[10px] font-black text-brand-stone shrink-0">{fmt(i.product.price * i.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 bg-brand-stone/5 border-t border-brand-sand flex justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40">Total</span>
                  <span className="text-lg font-black text-brand-stone">{fmt(total)}</span>
                </div>
              </div>

              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-brand-stone/40 mb-2">1. Choisissez votre opérateur</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {(['mtn','orange'] as const).map(op => (
                    <button key={op} onClick={() => setPayMethod(op)}
                      className={`p-3.5 rounded-2xl border-2 font-black text-[10px] uppercase tracking-wide flex flex-col items-center gap-2 transition-all active:scale-95 ${payMethod === op ? 'border-brand-orange bg-brand-orange/5 text-brand-orange' : 'border-brand-sand text-brand-stone/50 hover:border-brand-orange/50'}`}>
                      <span className="text-2xl">{op === 'mtn' ? '🟡' : '🟠'}</span>
                      <span>{op === 'mtn' ? 'MTN MoMo' : 'Orange Money'}</span>
                      <span className="text-[8px] font-bold opacity-60 tracking-normal normal-case">{op === 'mtn' ? MTN_MOMO_NUMBER : ORANGE_MONEY_NUMBER}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-brand-orange/5 p-4 rounded-2xl border border-brand-orange/20">
                <p className="text-[8px] font-black uppercase tracking-widest text-brand-orange mb-1.5">2. Effectuez le paiement</p>
                <p className="text-[11px] font-medium text-brand-stone/70 leading-relaxed">
                  Envoyez <strong className="text-brand-stone font-black">{fmt(total)}</strong> au numéro{' '}
                  <strong className="text-brand-orange">{payMethod === 'mtn' ? MTN_MOMO_NUMBER : ORANGE_MONEY_NUMBER}</strong>{' '}
                  via {payMethod === 'mtn' ? 'MTN Mobile Money' : 'Orange Money'}, puis renseignez les informations ci-dessous.
                </p>
              </div>

              <div>
                <label className="text-[8px] font-black uppercase tracking-widest text-brand-stone/40 mb-1.5 block">3. Votre numéro de paiement</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-brand-stone/40">+237</span>
                  <input type="tel" placeholder="6XX XXX XXX" value={payPhone}
                    onChange={e => setPayPhone(e.target.value.replace(/\D/g,''))} maxLength={9}
                    className="w-full pl-14 pr-10 py-3.5 rounded-2xl border-2 border-brand-sand focus:border-brand-orange outline-none font-black text-brand-stone text-sm bg-white transition-all" />
                  {payPhone.length >= 9 && <Check size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />}
                </div>
              </div>

              <div>
                <label className="text-[8px] font-black uppercase tracking-widest text-brand-stone/40 mb-1.5 block">4. Code de confirmation reçu par SMS</label>
                <input type="text" placeholder="Ex: MP241203.A12B.345678" value={txCode}
                  onChange={e => setTxCode(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-brand-sand focus:border-brand-orange outline-none font-black text-brand-stone text-sm bg-white transition-all" />
              </div>
            </>
          )}

          {/* ── ÉTAPE 2 ── */}
          {!done && step === 2 && (
            <>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-brand-stone/40 mb-2.5">Mode de livraison</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {(['livraison','retrait'] as const).map(mode => (
                    <button key={mode} onClick={() => setDeliveryMode(mode)}
                      className={`p-4 rounded-2xl border-2 font-black text-[10px] uppercase tracking-wide flex flex-col items-center gap-2 transition-all active:scale-95 ${deliveryMode === mode ? 'border-brand-orange bg-brand-orange/5 text-brand-orange' : 'border-brand-sand text-brand-stone/50 hover:border-brand-orange/50'}`}>
                      <span className="text-2xl">{mode === 'livraison' ? '🚚' : '🏢'}</span>
                      <span>{mode === 'livraison' ? 'Livraison domicile' : 'Retrait au siège'}</span>
                    </button>
                  ))}
                </div>
              </div>

              {deliveryMode === 'livraison' && (
                <>
                  <div className="flex items-start gap-3 bg-blue-50 p-3.5 rounded-2xl border border-blue-100">
                    <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-0.5">Livraison nationale</p>
                      <p className="text-[10px] font-medium text-blue-700/80 leading-snug">
                        Nous livrons dans les <strong>10 régions du Cameroun</strong>. Délais et frais variables selon localisation.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-[8px] font-black uppercase tracking-widest text-brand-stone/40 mb-1.5 block">Région</label>
                    <div className="relative">
                      <select value={region} onChange={e => setRegion(e.target.value)}
                        className="w-full appearance-none px-4 py-3.5 rounded-2xl border-2 border-brand-sand focus:border-brand-orange outline-none font-black text-brand-stone text-sm bg-white transition-all cursor-pointer">
                        <option value="">Sélectionner votre région...</option>
                        {REGIONS_CAMEROUN.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-stone/30 rotate-90 pointer-events-none" />
                      {region && <Check size={14} className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none" />}
                    </div>
                  </div>

                  <div>
                    <label className="text-[8px] font-black uppercase tracking-widest text-brand-stone/40 mb-1.5 block">Ville / Localité</label>
                    <input type="text" placeholder="Ex: Douala, Bafoussam, Garoua, Ngaoundéré..."
                      value={ville} onChange={e => setVille(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-brand-sand focus:border-brand-orange outline-none font-black text-brand-stone text-sm bg-white transition-all" />
                  </div>

                  <div>
                    <label className="text-[8px] font-black uppercase tracking-widest text-brand-stone/40 mb-1.5 block">Adresse complète & repère</label>
                    <textarea placeholder="Quartier, rue, repère proche (ex: près du marché central)..."
                      value={adresse} onChange={e => setAdresse(e.target.value)} rows={3}
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-brand-sand focus:border-brand-orange outline-none font-medium text-brand-stone text-sm bg-white transition-all resize-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {[['📍','Yaoundé / Douala','24 – 48h'],['🗺️','Autres grandes villes','48 – 72h'],['🌍','Zones rurales','3 – 5 jours'],['📞','Confirmation','Par WhatsApp']].map(([icon,label,val]) => (
                      <div key={label} className="bg-brand-beige/60 rounded-xl p-2.5 border border-brand-sand">
                        <span className="text-base block mb-0.5">{icon}</span>
                        <p className="text-[8px] font-bold text-brand-stone/50 uppercase leading-tight mb-0.5">{label}</p>
                        <p className="text-[9px] font-black text-brand-stone">{val}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {deliveryMode === 'retrait' && (
                <div className="bg-brand-beige/60 p-4 rounded-2xl border border-brand-sand space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-brand-orange mb-1">Siège Imani-Tech</p>
                      <p className="text-sm font-black text-brand-stone">Yaoundé, Cameroun</p>
                      <p className="text-[10px] font-medium text-brand-stone/60 mt-0.5">Lun–Ven : 8h00 – 17h00</p>
                      <p className="text-[10px] font-medium text-brand-stone/60">Samedi : 9h00 – 13h00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-brand-orange/5 rounded-xl px-3 py-2 border border-brand-orange/15">
                    <AlertCircle size={12} className="text-brand-orange shrink-0" />
                    <p className="text-[9px] font-medium text-brand-stone/60">Vous serez contacté par WhatsApp avant votre déplacement pour confirmer la disponibilité.</p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── ÉTAPE 3 ── */}
          {!done && step === 3 && (
            <>
              <div className="bg-brand-beige/50 rounded-2xl border border-brand-sand overflow-hidden">
                <div className="px-4 py-2.5 border-b border-brand-sand/50">
                  <span className="text-[8px] font-black uppercase tracking-widest text-brand-orange">Articles commandés</span>
                </div>
                <div className="divide-y divide-brand-sand/50">
                  {cart.map(i => (
                    <div key={i.product.id} className="flex justify-between items-center px-4 py-2.5 gap-3">
                      <span className="text-[10px] font-bold text-brand-stone/70 truncate">{i.product.name} ×{i.qty}</span>
                      <span className="text-[10px] font-black text-brand-stone shrink-0">{fmt(i.product.price * i.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 bg-brand-stone/5 border-t border-brand-sand flex justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40">Total payé</span>
                  <span className="text-xl font-black text-brand-stone">{fmt(total)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-brand-beige/50 p-3.5 rounded-2xl border border-brand-sand">
                  <p className="text-[7px] font-black uppercase tracking-widest text-brand-orange mb-1.5">Paiement</p>
                  <p className="text-[11px] font-black text-brand-stone">{payMethod === 'mtn' ? 'MTN MoMo' : 'Orange Money'}</p>
                  <p className="text-[9px] font-bold text-brand-stone/50 mt-0.5">+237 {payPhone}</p>
                  <p className="text-[9px] font-bold text-brand-stone/40 mt-0.5 truncate">Code: {txCode}</p>
                </div>
                <div className="bg-brand-beige/50 p-3.5 rounded-2xl border border-brand-sand">
                  <p className="text-[7px] font-black uppercase tracking-widest text-brand-orange mb-1.5">Livraison</p>
                  {deliveryMode === 'livraison' ? (
                    <>
                      <p className="text-[11px] font-black text-brand-stone">Région {region}</p>
                      <p className="text-[9px] font-bold text-brand-stone/50 mt-0.5">{ville}</p>
                      <p className="text-[9px] font-bold text-brand-stone/40 mt-0.5 line-clamp-2">{adresse}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[11px] font-black text-brand-stone">Retrait siège</p>
                      <p className="text-[9px] font-bold text-brand-stone/50 mt-0.5">Yaoundé</p>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-2xl border border-green-200 flex items-start gap-3">
                <span className="text-xl shrink-0">📱</span>
                <p className="text-[11px] font-medium text-green-700 leading-relaxed">
                  En cliquant sur <strong>Envoyer sur WhatsApp</strong>, vous serez redirigé avec toutes vos informations préremplies.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer navigation — sticky, toujours visible */}
        {!done && (
          <div className="shrink-0 bg-white border-t border-brand-sand p-4 sm:p-5">
            <div className="flex gap-2.5">
              {step > 1 && (
                <button onClick={() => setStep(prev => (prev - 1) as 1|2|3)}
                  className="flex-1 border-2 border-brand-sand text-brand-stone py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-brand-orange transition-all flex items-center justify-center gap-1.5 active:scale-95">
                  <ChevronLeft size={13} /> Retour
                </button>
              )}
              {step < 3 ? (
                <button onClick={() => setStep(prev => (prev + 1) as 1|2|3)}
                  disabled={step === 1 ? !canStep1 : !canStep2}
                  className="flex-[2] bg-brand-orange text-white py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-brand-stone transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95">
                  Étape suivante <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  onClick={() => { window.open(`https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${buildMsg()}`, '_blank'); setDone(true); }}
                  className="flex-[2] bg-[#25D366] text-white py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95">
                  📱 Envoyer sur WhatsApp
                </button>
              )}
            </div>
            <div className="flex gap-1.5 mt-3">
              {[1,2,3].map(n => (
                <div key={n} className={`flex-1 h-1 rounded-full transition-all duration-300 ${step >= n ? 'bg-brand-orange' : 'bg-brand-sand'}`} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── PAGE PRINCIPALE ──────────────────────────────────────────────────────────
const ShopPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [sortBy, setSortBy] = useState<'popular'|'price-asc'|'price-desc'|'new'|'rating'>('popular');
  const [priceRange, setPriceRange] = useState<[number,number]>([0, 2000000]);
  const [filterBadge, setFilterBadge] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ product: ShopProduct; category: string } | null>(null);

  const cartCount = cart.reduce((a, i) => a + i.qty, 0);
  const cartTotal = cart.reduce((a, i) => a + i.product.price * i.qty, 0);
  const totalProducts = SHOP_CATEGORIES.reduce((a, c) => a + c.products.length, 0);

  const suggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    const s = new Set<string>();
    SHOP_CATEGORIES.forEach(c => c.products.forEach(p => {
      if (p.name.toLowerCase().includes(q)) s.add(p.name);
      if (p.brand.toLowerCase().includes(q)) s.add(p.brand);
      p.tags.forEach(t => { if (t.toLowerCase().includes(q)) s.add(t); });
    }));
    return Array.from(s).slice(0, 5);
  }, [searchQuery]);

  const allProducts = useMemo(() => {
    const cats = activeCategory === 'all' ? SHOP_CATEGORIES : SHOP_CATEGORIES.filter(c => c.id === activeCategory);
    let prods: { product: ShopProduct; category: string }[] = [];
    cats.forEach(c => c.products.forEach(p => prods.push({ product: p, category: c.name })));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      prods = prods.filter(({ product: p }) =>
        p.name.toLowerCase().includes(q) || p.ref.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    prods = prods.filter(({ product: p }) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (filterBadge) prods = prods.filter(({ product: p }) => p.badge === filterBadge);
    if (filterBrand) prods = prods.filter(({ product: p }) => p.brand === filterBrand);
    switch (sortBy) {
      case 'price-asc':  prods.sort((a, b) => a.product.price - b.product.price); break;
      case 'price-desc': prods.sort((a, b) => b.product.price - a.product.price); break;
      case 'rating':     prods.sort((a, b) => b.product.rating - a.product.rating); break;
      case 'new':        prods.sort((a, b) => (b.product.badge === 'Nouveau' ? 1 : 0) - (a.product.badge === 'Nouveau' ? 1 : 0)); break;
      default:           prods.sort((a, b) => (b.product.badge === 'Bestseller' ? 1 : 0) - (a.product.badge === 'Bestseller' ? 1 : 0));
    }
    return prods;
  }, [activeCategory, searchQuery, sortBy, priceRange, filterBadge, filterBrand]);

  const allBrands = useMemo(() => {
    const b = new Set<string>();
    SHOP_CATEGORIES.forEach(c => c.products.forEach(p => b.add(p.brand)));
    return Array.from(b).sort();
  }, []);

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

  const hasActiveFilters = !!(filterBadge || filterBrand || priceRange[1] < 2000000);

  return (
    <div className="bg-brand-cream min-h-screen pt-16 sm:pt-20 md:pt-24 page-appear">

      {/* HERO */}
      <section className="bg-white py-10 sm:py-16 px-4 relative overflow-hidden border-b border-brand-sand">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-brand-orange font-black uppercase tracking-[0.2em] text-[9px] mb-3 block">Boutique Officielle</span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase leading-[0.9] text-brand-stone">
            {SHOP_CATEGORIES.length} Catégories<br /><span className="text-brand-orange">d'Équipements Pro</span>
          </h1>
          <p className="text-sm sm:text-base text-brand-stone/60 max-w-2xl mx-auto font-bold mb-6 px-4">
            {totalProducts}+ produits certifiés · Paiement Mobile Money · Livraison dans les <strong>10 régions du Cameroun</strong>
          </p>

          {/* BARRE DE RECHERCHE */}
          <div className="max-w-2xl mx-auto relative px-4 sm:px-0">
            {searchFocused && suggestions.length > 0 && (
              <div className="fixed inset-0 z-20" onClick={() => setSearchFocused(false)} />
            )}
            <div className={`relative z-30 transition-all duration-300 ${searchFocused ? 'scale-[1.01]' : ''}`}>
              <div className={`flex items-center bg-white border-2 rounded-xl sm:rounded-2xl shadow-lg transition-all overflow-hidden ${searchFocused ? 'border-brand-orange shadow-brand-orange/20 shadow-xl' : 'border-brand-sand'}`}>
                <div className="pl-4 pr-2 shrink-0">
                  <Search size={16} className={`transition-colors ${searchFocused ? 'text-brand-orange' : 'text-brand-stone/30'}`} />
                </div>
                <input ref={searchRef} type="text" placeholder="Rechercher produit, marque, référence..."
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)} onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                  className="flex-grow py-3.5 sm:py-4 pr-2 outline-none font-bold text-brand-stone bg-transparent text-sm placeholder-brand-stone/30 min-w-0" />
                {searchQuery && allProducts.length > 0 && (
                  <span className="hidden sm:block shrink-0 text-[9px] font-black text-brand-stone/30 px-2">{allProducts.length} rés.</span>
                )}
                {searchQuery && (
                  <button onClick={() => { setSearchQuery(''); searchRef.current?.focus(); }}
                    className="shrink-0 w-7 h-7 mr-1 bg-brand-sand/50 hover:bg-red-100 hover:text-red-500 text-brand-stone/40 rounded-full flex items-center justify-center transition-all">
                    <X size={11} />
                  </button>
                )}
                <button className="shrink-0 m-1.5 bg-brand-orange text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-brand-stone transition-all whitespace-nowrap">
                  <span className="hidden sm:inline">Rechercher</span>
                  <Search size={13} className="sm:hidden" />
                </button>
              </div>

              {searchFocused && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-brand-sand rounded-xl shadow-2xl z-40 overflow-hidden">
                  <div className="px-4 py-2 border-b border-brand-sand/50">
                    <span className="text-[8px] font-black uppercase tracking-widest text-brand-stone/30">Suggestions</span>
                  </div>
                  {suggestions.map((s, i) => (
                    <button key={i} onClick={() => { setSearchQuery(s); setSearchFocused(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-brand-beige/50 transition-colors text-left border-b border-brand-sand/30 last:border-0">
                      <Search size={11} className="text-brand-orange shrink-0" />
                      <span className="text-sm font-bold text-brand-stone capitalize">{s}</span>
                    </button>
                  ))}
                </div>
              )}

              {!searchQuery && (
                <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                  {['Laptop HP','Epson EcoTank','Switch réseau','Onduleur APC','WiFi 6','NAS Synology'].map(tag => (
                    <button key={tag} onClick={() => setSearchQuery(tag)}
                      className="px-2.5 py-1 bg-white/80 border border-brand-sand rounded-full text-[9px] font-black uppercase tracking-wider text-brand-stone/60 hover:border-brand-orange hover:text-brand-orange transition-all">
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 px-4">
            {[['🚚','Livraison nationale'],['🔒','Paiement sécurisé'],['🔁','Retour 7 jours'],['⭐','Produits certifiés']].map(([icon, label]) => (
              <div key={label} className="flex items-center gap-1.5 text-brand-stone/50 font-black text-[8px] sm:text-[9px] uppercase tracking-widest">
                <span>{icon}</span><span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-orange/5 blur-[100px] rounded-full pointer-events-none" />
      </section>

      {/* BANDEAU PARTENAIRES */}
      <div className="bg-brand-stone py-2.5 overflow-hidden border-y border-brand-orange/20">
        <div className="flex whitespace-nowrap" style={{ animation: 'tickerScroll 35s linear infinite' }}>
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <span key={i} className="text-[8px] font-black uppercase tracking-[0.3em] text-white/50 mr-8 hover:text-brand-orange transition-colors">✦ {p}</span>
          ))}
        </div>
      </div>

      {/* NAV CATÉGORIES */}
      <section className="sticky top-[60px] sm:top-[72px] z-30 bg-white/95 backdrop-blur-xl border-b border-brand-sand shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <button onClick={() => setActiveCategory('all')}
            className={`shrink-0 px-3 sm:px-4 py-2 rounded-full font-black text-[9px] uppercase tracking-widest border-2 transition-all ${activeCategory === 'all' ? 'bg-brand-stone text-white border-brand-stone' : 'border-brand-sand text-brand-stone hover:border-brand-orange'}`}>
            Tous ({totalProducts})
          </button>
          {SHOP_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full font-black text-[9px] uppercase tracking-widest border-2 transition-all ${activeCategory === cat.id ? 'bg-brand-orange text-white border-brand-orange' : 'border-brand-sand text-brand-stone hover:border-brand-orange'}`}>
              <span>{cat.icon}</span>
              <span className="hidden sm:inline">{cat.name}</span>
              <span className="sm:hidden">{cat.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-1.5 flex items-center justify-between gap-2 border-t border-brand-sand/30">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <span className="text-[9px] font-black text-brand-stone/40 uppercase hidden sm:block shrink-0">{allProducts.length} résultat{allProducts.length > 1 ? 's' : ''}</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="text-[9px] font-black uppercase tracking-widest border-2 border-brand-sand rounded-full px-3 py-1.5 bg-white text-brand-stone focus:border-brand-orange outline-none cursor-pointer shrink-0">
              <option value="popular">Popularité</option>
              <option value="rating">Mieux notés</option>
              <option value="price-asc">Prix ↑</option>
              <option value="price-desc">Prix ↓</option>
              <option value="new">Nouveautés</option>
            </select>
            <button onClick={() => setShowFilters(!showFilters)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest border-2 transition-all ${showFilters ? 'bg-brand-stone text-white border-brand-stone' : 'border-brand-sand text-brand-stone hover:border-brand-orange'}`}>
              <SlidersHorizontal size={11} />
              <span className="hidden sm:inline">Filtres</span>
              {hasActiveFilters && <span className="w-1.5 h-1.5 bg-brand-orange rounded-full" />}
            </button>
          </div>
          <button onClick={() => setCartOpen(true)}
            className="relative shrink-0 flex items-center gap-1.5 bg-brand-orange text-white px-3 sm:px-5 py-2 rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-brand-stone transition-all shadow-md active:scale-95">
            <ShoppingCart size={13} />
            <span className="hidden sm:inline">Panier</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white text-brand-orange rounded-full text-[8px] font-black flex items-center justify-center border border-brand-orange">{cartCount}</span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="border-t border-brand-sand/30 bg-brand-beige/30 px-3 sm:px-4 py-3">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-brand-stone/40 mb-1.5">Budget max</p>
                <input type="range" min={0} max={2000000} step={10000} value={priceRange[1]}
                  onChange={e => setPriceRange([0, Number(e.target.value)])} className="w-full accent-brand-orange" />
                <p className="text-[10px] font-black text-brand-orange mt-1">≤ {fmt(priceRange[1])}</p>
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-brand-stone/40 mb-1.5">Statut</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Nouveau','Bestseller','Promo','Stock limité'].map(b => (
                    <button key={b} onClick={() => setFilterBadge(filterBadge === b ? '' : b)}
                      className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase border-2 transition-all ${filterBadge === b ? 'bg-brand-orange text-white border-brand-orange' : 'border-brand-sand text-brand-stone hover:border-brand-orange'}`}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-brand-stone/40 mb-1.5">Marque</p>
                <select value={filterBrand} onChange={e => setFilterBrand(e.target.value)}
                  className="w-full text-[9px] font-black uppercase border-2 border-brand-sand rounded-xl px-3 py-2 bg-white text-brand-stone focus:border-brand-orange outline-none">
                  <option value="">Toutes les marques</option>
                  {allBrands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>
            {hasActiveFilters && (
              <button onClick={() => { setFilterBadge(''); setFilterBrand(''); setPriceRange([0,2000000]); }}
                className="mt-2.5 text-[8px] font-black uppercase tracking-widest text-brand-orange hover:underline flex items-center gap-1">
                <X size={9} /> Effacer les filtres
              </button>
            )}
          </div>
        )}
      </section>

      {/* GRILLE PRODUITS */}
      <section className="py-6 sm:py-10 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          {searchQuery && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-black text-brand-stone/50 uppercase tracking-widest">{allProducts.length} résultat{allProducts.length>1?'s':''} pour</span>
              <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange font-black text-xs rounded-full border border-brand-orange/20">"{searchQuery}"</span>
              <button onClick={() => setSearchQuery('')} className="text-[9px] font-black text-brand-stone/40 hover:text-brand-orange underline uppercase tracking-widest">Effacer</button>
            </div>
          )}
          {allProducts.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <span className="text-5xl">🔍</span>
              <p className="text-brand-stone/40 font-black uppercase text-xs tracking-widest">Aucun produit trouvé</p>
              <button onClick={() => { setSearchQuery(''); setFilterBadge(''); setFilterBrand(''); setPriceRange([0,2000000]); setActiveCategory('all'); }}
                className="inline-flex items-center gap-2 bg-brand-orange text-white px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-brand-stone transition-all">
                <X size={11} /> Réinitialiser
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {allProducts.map(({ product, category }) => (
                <ProductCard key={product.id} product={product} category={category}
                  onView={(p, cat) => setSelectedProduct({ product: p, category: cat })}
                  onAdd={addToCart} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MODAL PRODUIT */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-brand-stone/90 backdrop-blur-md">
          <div className="bg-white w-full sm:max-w-4xl rounded-t-[2rem] sm:rounded-[3rem] shadow-2xl flex flex-col max-h-[94vh] overflow-hidden border border-brand-sand"
            style={{ animation: 'slideInFromBottom 0.3s cubic-bezier(0.32,0.72,0,1) both' }}>
            <div className="bg-brand-stone p-4 sm:p-8 text-white flex justify-between items-start shrink-0 border-b-4 border-brand-orange">
              <div className="pr-3">
                <span className="text-[8px] font-black uppercase tracking-widest text-brand-orange block mb-0.5">{selectedProduct.category} · {selectedProduct.product.brand}</span>
                <h2 className="text-base sm:text-2xl font-black uppercase tracking-tighter leading-tight">{selectedProduct.product.name}</h2>
                <p className="text-white/40 text-[9px] font-bold uppercase mt-0.5">Réf: {selectedProduct.product.ref}</p>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-brand-orange rounded-full flex items-center justify-center transition-all shrink-0">
                <X size={15} />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-4">
                  <div className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden bg-brand-beige/30">
                    <img src={selectedProduct.product.image} alt={selectedProduct.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 bg-brand-beige/50 rounded-2xl border border-brand-sand">
                    <span className="text-[8px] font-black uppercase tracking-widest text-brand-orange block mb-1">Prix</span>
                    <div className="text-2xl sm:text-3xl font-black text-brand-stone tracking-tighter">{fmt(selectedProduct.product.price)}</div>
                    {selectedProduct.product.oldPrice && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-brand-stone/30 line-through font-bold">{fmt(selectedProduct.product.oldPrice)}</span>
                        <span className="text-red-500 font-black text-[9px]">-{Math.round((1-selectedProduct.product.price/selectedProduct.product.oldPrice)*100)}%</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Stars rating={selectedProduct.product.rating} size={14} />
                    <span className="text-[9px] font-black text-brand-stone/40">{selectedProduct.product.rating}/5 ({selectedProduct.product.reviews} avis)</span>
                  </div>
                  <span className={`inline-flex px-3 py-1.5 rounded-full text-[9px] font-black uppercase ${selectedProduct.product.stock <= 5 ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                    {selectedProduct.product.stock <= 5 ? `⚠ ${selectedProduct.product.stock} en stock` : '✓ En stock'}
                  </span>
                  <button onClick={() => { addToCart(selectedProduct.product, selectedProduct.category); setSelectedProduct(null); }}
                    className="w-full bg-brand-orange text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-brand-stone transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95">
                    <ShoppingCart size={15} /> Ajouter au panier
                  </button>
                </div>
                <div className="space-y-5">
                  <div>
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40 mb-2">Description & Spécifications</h4>
                    <p className="text-brand-stone/70 font-medium text-xs sm:text-sm leading-relaxed">{selectedProduct.product.description}</p>
                  </div>
                  <div>
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40 mb-2">Mots-clés</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.product.tags.map(tag => (
                        <span key={tag} onClick={() => { setSearchQuery(tag); setSelectedProduct(null); }}
                          className="px-2.5 py-1 bg-brand-beige rounded-full text-[8px] font-black uppercase tracking-widest text-brand-orange border border-brand-sand hover:bg-brand-orange hover:text-white cursor-pointer transition-all">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-brand-beige/50 p-4 rounded-2xl border border-brand-sand space-y-2.5">
                    {[
                      [Truck, 'Livraison dans les 10 régions du Cameroun'],
                      [RotateCcw, 'Retour gratuit sous 7 jours'],
                      [ShieldCheck, 'Garantie Imani-Tech certifiée'],
                    ].map(([Icon, text]) => (
                      <div key={text as string} className="flex items-center gap-3">
                        {React.createElement(Icon as React.ElementType, { size: 15, className: 'text-brand-orange shrink-0' })}
                        <span className="text-[10px] font-black uppercase text-brand-stone/70">{text as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PANIER LATÉRAL */}
      <CartDrawer cart={cart} total={cartTotal} open={cartOpen}
        onClose={() => setCartOpen(false)} onUpdateQty={updateQty}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }} />

      {/* CHECKOUT */}
      <CheckoutModal open={checkoutOpen} cart={cart} total={cartTotal} onClose={() => setCheckoutOpen(false)} />

      {/* BADGE FLOTTANT */}
      <FloatingCartBadge count={cartCount} total={cartTotal} onClick={() => setCartOpen(true)} />

      {/* GARANTIES */}
      <section className="py-12 sm:py-16 bg-brand-stone text-white text-center rounded-2xl sm:rounded-[3rem] mx-3 sm:mx-4 md:mx-8 mb-12 sm:mb-16 overflow-hidden relative border-y border-brand-orange/20">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none"><Globe size={200} /></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-orange text-[8px] font-black uppercase tracking-widest mb-6">
            <ShieldCheck size={10} /><span>Garantie Intégrale Imani-Tech</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter">
            Achetez avec <span className="text-brand-orange">Confiance</span>.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {[
              [Truck,'Livraison nationale','10 régions du Cameroun'],
              [RotateCcw,'Retour 7 jours','Remplacement garanti'],
              [ShieldCheck,'Produits certifiés','Sélection qualité'],
              [Zap,'Support technique','Équipe disponible'],
            ].map(([Icon, title, desc]) => (
              <div key={title as string} className="bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-brand-orange/40 transition-all">
                <div className="w-9 h-9 bg-brand-orange rounded-xl flex items-center justify-center mb-2.5 mx-auto">
                  {React.createElement(Icon as React.ElementType, { size: 16, className: 'text-white' })}
                </div>
                <h4 className="font-black uppercase text-xs sm:text-sm mb-0.5">{title as string}</h4>
                <p className="text-[8px] sm:text-[9px] font-bold text-white/40 uppercase">{desc as string}</p>
              </div>
            ))}
          </div>
          <Link to={AppRoute.Contact}
            className="inline-flex items-center gap-2 bg-brand-orange text-white px-6 sm:px-10 py-3.5 sm:py-5 rounded-full font-black text-base sm:text-lg hover:bg-white hover:text-brand-stone transition-all shadow-2xl shadow-brand-orange/30 uppercase tracking-tighter">
            Besoin d'un devis ? <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
