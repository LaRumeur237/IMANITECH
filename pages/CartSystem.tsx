/**
 * CartSystem.tsx — Imani-Tech Boutique
 * Panier latéral + Checkout responsive 3 étapes
 *
 * Exports:
 *   - CartItem (interface)
 *   - CartFAB    → bouton flottant mobile (bas gauche) avec badge
 *   - CartDrawer → tiroir latéral desktop/tablette + sheet mobile
 *   - CheckoutModal → modale de finalisation 3 étapes (livraison → paiement → confirmation)
 *   - useCart   → hook état global du panier
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  ShoppingCart, X, Plus, Minus, Trash2, ChevronRight, ChevronLeft,
  Truck, MapPin, Smartphone, Check, ArrowUpRight, Package,
  ShieldCheck, Clock, MessageCircle,
} from 'lucide-react';
import {
  ShopProduct,
  WHATSAPP_ORDER_NUMBER, ORANGE_MONEY_NUMBER, MTN_MOMO_NUMBER,
} from '../shopData';

// ─── TYPES ────────────────────────────────────────────────────────────────────
export interface CartItem {
  product: ShopProduct;
  qty: number;
  category: string;
}

// ─── UTILS ────────────────────────────────────────────────────────────────────
const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA';

// ─── HOOK PANIER ──────────────────────────────────────────────────────────────
export function useCart() {
  const [items, setItems]           = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  const add = useCallback((product: ShopProduct, category: string) => {
    setItems(prev => {
      const ex = prev.find(i => i.product.id === product.id);
      return ex
        ? prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { product, qty: 1, category }];
    });
    setDrawerOpen(true);
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setItems(prev =>
      prev.map(i => i.product.id === id ? { ...i, qty: i.qty + delta } : i)
          .filter(i => i.qty > 0)
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.product.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const openCheckout = useCallback(() => {
    setDrawerOpen(false);
    setTimeout(() => setCheckoutOpen(true), 180);
  }, []);

  return {
    items, count, total,
    add, updateQty, remove, clear,
    drawerOpen, setDrawerOpen,
    checkoutOpen, setCheckoutOpen,
    openCheckout,
  };
}

// ─── PROGRESS BAR ÉTAPES ──────────────────────────────────────────────────────
const StepBar: React.FC<{ step: 1 | 2 | 3; done: boolean }> = ({ step, done }) => {
  const steps = ['Livraison', 'Paiement', 'Confirmation'];
  return (
    <div className="flex items-center gap-0 w-full">
      {steps.map((label, i) => {
        const n = i + 1;
        const active  = !done && n === step;
        const passed  = done || n < step;
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-300 ${
                passed  ? 'bg-brand-orange text-white' :
                active  ? 'bg-white text-brand-stone ring-2 ring-brand-orange' :
                          'bg-white/10 text-white/30'
              }`}>
                {passed ? <Check size={12} /> : n}
              </div>
              <span className={`text-[7px] font-black uppercase tracking-widest mt-1 ${
                active ? 'text-white' : passed ? 'text-brand-orange' : 'text-white/30'
              }`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px mx-1 mb-4 transition-all duration-500 ${
                n < step || done ? 'bg-brand-orange' : 'bg-white/15'
              }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ─── LIGNE PRODUIT DANS LE PANIER ─────────────────────────────────────────────
const CartLine: React.FC<{
  item: CartItem;
  onUpdate: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}> = ({ item: { product: p, qty, category }, onUpdate, onRemove }) => (
  <div className="group flex gap-3 p-3 rounded-2xl bg-white hover:bg-brand-beige/40 border border-transparent hover:border-brand-sand transition-all">
    {/* Image */}
    <div className="w-[68px] h-[68px] rounded-xl overflow-hidden bg-brand-beige/60 shrink-0 border border-brand-sand/60">
      <img
        src={p.image}
        alt={p.name}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Info */}
    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
      <div>
        <p className="text-[9px] font-black uppercase tracking-widest text-brand-orange leading-none mb-0.5">{p.brand}</p>
        <p className="text-[11px] font-black text-brand-stone leading-tight line-clamp-2 uppercase tracking-tight">{p.name}</p>
      </div>
      <p className="text-sm font-black text-brand-stone tracking-tighter mt-1">{fmt(p.price * qty)}</p>
    </div>

    {/* Contrôles quantité + suppr */}
    <div className="flex flex-col items-center justify-between shrink-0 gap-1">
      {/* Bouton supprimer (visible au hover) */}
      <button
        onClick={() => onRemove(p.id)}
        className="w-6 h-6 rounded-lg bg-transparent hover:bg-red-50 text-brand-stone/20 hover:text-red-400 flex items-center justify-center transition-all"
        title="Supprimer"
      >
        <Trash2 size={11} />
      </button>

      {/* Qty stepper */}
      <div className="flex items-center gap-1 bg-brand-sand/30 rounded-xl p-0.5">
        <button
          onClick={() => onUpdate(p.id, -1)}
          className="w-6 h-6 rounded-lg hover:bg-white hover:shadow-sm text-brand-stone flex items-center justify-center transition-all"
        >
          <Minus size={10} />
        </button>
        <span className="text-[11px] font-black text-brand-stone w-5 text-center tabular-nums">{qty}</span>
        <button
          onClick={() => onUpdate(p.id, 1)}
          className="w-6 h-6 rounded-lg hover:bg-brand-orange hover:text-white text-brand-stone flex items-center justify-center transition-all"
        >
          <Plus size={10} />
        </button>
      </div>
    </div>
  </div>
);

// ─── TIROIR PANIER (DRAWER) ───────────────────────────────────────────────────
export const CartDrawer: React.FC<{
  items: CartItem[];
  count: number;
  total: number;
  open: boolean;
  onClose: () => void;
  onUpdate: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}> = ({ items, count, total, open, onClose, onUpdate, onRemove, onCheckout }) => {
  // Fermer au clic sur l'overlay
  const overlayRef = useRef<HTMLDivElement>(null);

  // Body scroll lock quand ouvert
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* ── Overlay ── */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 z-[200] bg-brand-stone/70 backdrop-blur-sm"
        style={{ animation: 'fadeIn 0.2s ease both' }}
      />

      {/* ── Tiroir ── */}
      {/* Mobile : sheet bas (100vw, max 92vh) | sm+ : panneau droite (max 420px, 100vh) */}
      <div
        className={[
          'fixed z-[201] bg-[#FAFAF8] flex flex-col shadow-2xl',
          // Mobile : glisse depuis le bas
          'bottom-0 left-0 right-0 rounded-t-[2rem]',
          // sm+ : panneau latéral droit
          'sm:bottom-0 sm:top-0 sm:left-auto sm:right-0 sm:rounded-none sm:rounded-l-[2rem] sm:w-[420px] sm:max-h-full',
        ].join(' ')}
        style={{
          maxHeight: '92vh',
          animation: 'drawerUp 0.32s cubic-bezier(0.32,0.72,0,1) both',
        }}
      >
        {/* ── Handle mobile ── */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-brand-sand" />
        </div>

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-sand/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-stone rounded-xl flex items-center justify-center">
              <ShoppingCart size={16} className="text-white" />
            </div>
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-orange">Imani-Tech</p>
              <p className="text-[15px] font-black text-brand-stone uppercase tracking-tighter leading-none">
                Panier
                {count > 0 && (
                  <span className="ml-2 text-[11px] font-black text-brand-stone/40">({count} article{count > 1 ? 's' : ''})</span>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-brand-sand/50 hover:bg-brand-orange hover:text-white text-brand-stone flex items-center justify-center transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Corps du panier ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {items.length === 0 ? (
            // ── Panier vide
            <div className="flex flex-col items-center justify-center h-full py-16 gap-5 text-center px-6">
              <div className="w-20 h-20 rounded-full bg-brand-sand/40 flex items-center justify-center">
                <ShoppingCart size={32} className="text-brand-stone/20" />
              </div>
              <div>
                <p className="text-[13px] font-black uppercase tracking-widest text-brand-stone/30">Panier vide</p>
                <p className="text-[10px] text-brand-stone/25 font-bold mt-1">Ajoutez des articles depuis la boutique</p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-3 rounded-full bg-brand-orange text-white text-[10px] font-black uppercase tracking-widest hover:bg-brand-stone transition-all"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            // ── Liste articles
            <div className="p-4 space-y-2">
              {items.map(item => (
                <CartLine
                  key={item.product.id}
                  item={item}
                  onUpdate={onUpdate}
                  onRemove={onRemove}
                />
              ))}

              {/* ── Avantages ── */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  [Truck,        'Livraison\n24-48h'],
                  [ShieldCheck,  'Paiement\nsécurisé'],
                  [Clock,        'Retour\n7 jours'],
                ].map(([Icon, label]) => (
                  <div key={label as string} className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-brand-beige/50 border border-brand-sand/60">
                    {React.createElement(Icon as React.ElementType, { size: 14, className: 'text-brand-orange' })}
                    <p className="text-[8px] font-black uppercase tracking-wider text-brand-stone/50 text-center whitespace-pre-line leading-tight">
                      {label as string}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Footer CTA (toujours visible) ── */}
        {items.length > 0 && (
          <div className="shrink-0 p-4 border-t border-brand-sand/60 bg-white/80 backdrop-blur-sm space-y-3">
            {/* Total */}
            <div className="flex items-center justify-between px-1">
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-stone/35">Total commande</p>
                <p className="text-2xl font-black text-brand-stone tracking-tighter leading-none mt-0.5">{fmt(total)}</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-black uppercase tracking-widest text-brand-stone/30">Livraison</p>
                <p className="text-[11px] font-black text-green-600">Calculée à l'étape suivante</p>
              </div>
            </div>

            {/* CTA principal */}
            <button
              onClick={onCheckout}
              className="w-full flex items-center justify-between bg-brand-orange hover:bg-brand-stone text-white px-5 py-4 rounded-2xl font-black text-[12px] uppercase tracking-widest transition-all shadow-lg shadow-brand-orange/25 active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                <Smartphone size={16} />
                Commander maintenant
              </span>
              <span className="flex items-center gap-1 bg-white/15 px-3 py-1.5 rounded-xl text-[10px]">
                {fmt(total)} <ChevronRight size={12} />
              </span>
            </button>

            {/* Paiement icons */}
            <div className="flex items-center justify-center gap-3 py-1">
              <span className="text-[9px] font-black text-brand-stone/25 uppercase tracking-widest">Paiement via</span>
              <span className="text-[10px] font-black text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-lg border border-yellow-100">MTN MoMo</span>
              <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-100">Orange Money</span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes drawerUp {
          from { transform: translateY(100%); opacity: 0 }
          to   { transform: translateY(0);    opacity: 1 }
        }
        @media (min-width: 640px) {
          @keyframes drawerUp {
            from { transform: translateX(100%); opacity: 0 }
            to   { transform: translateX(0);    opacity: 1 }
          }
        }
      `}</style>
    </>
  );
};

// ─── BOUTON FLOTTANT MOBILE (FAB) ─────────────────────────────────────────────
export const CartFAB: React.FC<{
  count: number;
  total: number;
  onClick: () => void;
}> = ({ count, total, onClick }) => {
  const [pulse, setPulse] = useState(false);
  const prevCount = useRef(count);

  useEffect(() => {
    if (count > prevCount.current) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 600);
      prevCount.current = count;
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  if (count === 0) return null;

  return (
    <button
      onClick={onClick}
      className={[
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-[150]',
        'flex items-center gap-3',
        'bg-brand-stone text-white',
        'px-5 py-3.5 rounded-full shadow-2xl shadow-brand-stone/40',
        'font-black text-[11px] uppercase tracking-widest',
        'hover:bg-brand-orange transition-all active:scale-95',
        // N'afficher que sur mobile (sm- masqué sur sm+)
        'sm:hidden',
        pulse ? 'scale-105' : 'scale-100',
      ].join(' ')}
      style={{ transition: 'transform 0.15s ease, background-color 0.2s' }}
    >
      <div className="relative">
        <ShoppingCart size={16} />
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-brand-orange text-white rounded-full text-[8px] font-black flex items-center justify-center">
          {count}
        </span>
      </div>
      <span>Panier · {fmt(total)}</span>
      <ChevronRight size={14} className="opacity-60" />
    </button>
  );
};

// ─── CHECKOUT MODAL ───────────────────────────────────────────────────────────
export const CheckoutModal: React.FC<{
  open: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
  onSuccess: () => void;
}> = ({ open, items, total, onClose, onSuccess }) => {

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [done, setDone] = useState(false);

  // Étape 1 : livraison
  const [deliveryMode, setDeliveryMode] = useState<'livraison' | 'retrait'>('livraison');
  const [address, setAddress]           = useState('');

  // Étape 2 : paiement
  const [operator, setOperator]         = useState<'mtn' | 'orange'>('mtn');
  const [payPhone, setPayPhone]         = useState('');

  const opNum   = operator === 'mtn' ? MTN_MOMO_NUMBER : ORANGE_MONEY_NUMBER;
  const opLabel = operator === 'mtn' ? 'MTN Mobile Money' : 'Orange Money';
  const opColor = operator === 'mtn' ? 'text-yellow-600 bg-yellow-50 border-yellow-200' : 'text-orange-600 bg-orange-50 border-orange-200';

  const step1Valid = deliveryMode === 'retrait' || address.trim().length > 5;
  const step2Valid = payPhone.length >= 9;

  const buildWAMessage = () => {
    const lines = [
      `*🛒 NOUVELLE COMMANDE — IMANI-TECH*`,
      `━━━━━━━━━━━━━━━━━━━━━`,
      `*Articles :*`,
      ...items.map(i => `  • ${i.product.name} ×${i.qty}  →  ${fmt(i.product.price * i.qty)}`),
      `━━━━━━━━━━━━━━━━━━━━━`,
      `*TOTAL : ${fmt(total)}*`,
      `━━━━━━━━━━━━━━━━━━━━━`,
      `*Opérateur :* ${opLabel}`,
      `*Numéro ayant payé :* ${payPhone}`,
      `*Mode livraison :* ${deliveryMode === 'livraison' ? `Livraison domicile\nAdresse : ${address}` : 'Retrait au siège Imani-Tech'}`,
    ];
    return encodeURIComponent(lines.join('\n'));
  };

  const handleSendOrder = () => {
    const url = `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${buildWAMessage()}`;
    window.open(url, '_blank');
    setDone(true);
  };

  const handleClose = () => {
    onClose();
    // Reset après fermeture
    setTimeout(() => {
      setStep(1); setDone(false);
      setDeliveryMode('livraison'); setAddress('');
      setOperator('mtn'); setPayPhone('');
    }, 300);
  };

  const handleSuccess = () => {
    onSuccess();
    handleClose();
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        className="fixed inset-0 z-[300] bg-brand-stone/80 backdrop-blur-md"
        style={{ animation: 'fadeIn 0.2s ease both' }}
      />

      {/* Modale */}
      {/* Mobile : plein écran | sm+ : centré max-w-lg */}
      <div
        className={[
          'fixed z-[301] bg-white flex flex-col overflow-hidden',
          'inset-0',                              // mobile : plein écran
          'sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2',
          'sm:w-full sm:max-w-lg sm:max-h-[92vh]',
          'sm:rounded-[2rem]',
          'shadow-2xl',
        ].join(' ')}
        style={{ animation: 'modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both' }}
      >
        {/* ── Header ── */}
        <div className="bg-brand-stone shrink-0 px-5 pt-5 pb-4">
          {/* Bouton fermer */}
          <div className="flex justify-end mb-3">
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-brand-orange text-white flex items-center justify-center transition-all"
            >
              <X size={15} />
            </button>
          </div>

          {/* Titre */}
          <div className="mb-4">
            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-brand-orange">
              {done ? 'Commande transmise' : `Étape ${step} / 3`}
            </p>
            <h2 className="text-[19px] font-black uppercase tracking-tighter text-white leading-tight mt-0.5">
              {done         ? '✓ Commande confirmée' :
               step === 1   ? 'Livraison' :
               step === 2   ? 'Paiement Mobile Money' :
                              'Vérification finale'}
            </h2>
          </div>

          {/* Barre étapes */}
          <StepBar step={step} done={done} />
        </div>

        {/* ── Corps scrollable ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 space-y-5">

          {/* ════ SUCCÈS ════ */}
          {done ? (
            <div className="flex flex-col items-center text-center py-8 gap-5">
              <div
                className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-200"
                style={{ animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both' }}
              >
                <Check size={34} className="text-green-500" strokeWidth={3} />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase text-brand-stone tracking-tighter">Commande envoyée !</h3>
                <p className="text-[12px] text-brand-stone/50 font-bold mt-2 leading-relaxed max-w-xs mx-auto">
                  Votre message WhatsApp a été ouvert avec toutes les informations préremplies.
                  L'équipe Imani-Tech confirme votre commande sous 2h.
                </p>
              </div>

              {/* Récap carte */}
              <div className="w-full bg-brand-beige/60 rounded-2xl border border-brand-sand p-4 text-left space-y-2">
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-orange">Récapitulatif</p>
                {items.map(i => (
                  <div key={i.product.id} className="flex justify-between text-[11px] font-bold text-brand-stone/70">
                    <span className="truncate mr-4">{i.product.name} ×{i.qty}</span>
                    <span className="font-black text-brand-stone shrink-0">{fmt(i.product.price * i.qty)}</span>
                  </div>
                ))}
                <div className="border-t border-brand-sand pt-2 flex justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-stone/40">Total</span>
                  <span className="text-lg font-black text-brand-stone">{fmt(total)}</span>
                </div>
              </div>

              <button
                onClick={handleSuccess}
                className="w-full py-4 rounded-2xl bg-brand-stone text-white font-black text-[11px] uppercase tracking-widest hover:bg-brand-orange transition-all"
              >
                Retour à la boutique
              </button>
            </div>

          /* ════ ÉTAPE 1 : LIVRAISON ════ */
          ) : step === 1 ? (
            <>
              {/* Mini récap commande */}
              <div className="bg-brand-beige/50 rounded-2xl border border-brand-sand p-4 space-y-1.5">
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-orange mb-2">Votre commande</p>
                {items.map(i => (
                  <div key={i.product.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border border-brand-sand shrink-0">
                      <img src={i.product.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="flex-1 text-[10px] font-bold text-brand-stone/70 truncate">{i.product.name} ×{i.qty}</span>
                    <span className="text-[11px] font-black text-brand-stone shrink-0">{fmt(i.product.price * i.qty)}</span>
                  </div>
                ))}
                <div className="border-t border-brand-sand/60 pt-2 mt-2 flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase tracking-widest text-brand-stone/35">Total</span>
                  <span className="text-xl font-black text-brand-stone">{fmt(total)}</span>
                </div>
              </div>

              {/* Choix mode */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40 mb-3">Mode de livraison</p>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    ['livraison', '🚚', 'Livraison\ndomicile', '24-48h'],
                    ['retrait',   '🏢', 'Retrait\nau siège',  'Gratuit'],
                  ] as const).map(([mode, icon, label, sub]) => (
                    <button
                      key={mode}
                      onClick={() => setDeliveryMode(mode)}
                      className={[
                        'flex flex-col items-center gap-2 p-4 rounded-2xl border-2 font-black transition-all',
                        deliveryMode === mode
                          ? 'border-brand-orange bg-brand-orange/5 text-brand-orange'
                          : 'border-brand-sand text-brand-stone/50 hover:border-brand-stone/30',
                      ].join(' ')}
                    >
                      <span className="text-2xl">{icon}</span>
                      <span className="text-[10px] uppercase tracking-wider text-center whitespace-pre-line leading-tight">{label}</span>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                        deliveryMode === mode ? 'bg-brand-orange/10 text-brand-orange' : 'bg-brand-sand/50 text-brand-stone/30'
                      }`}>{sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Champ adresse */}
              {deliveryMode === 'livraison' ? (
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40 mb-2">
                    Adresse de livraison <span className="text-red-400">*</span>
                  </p>
                  <textarea
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Ex : Bastos, Rue 1.840, en face du lycée – Yaoundé"
                    rows={3}
                    className="w-full px-4 py-3.5 rounded-2xl border-2 border-brand-sand focus:border-brand-orange outline-none font-bold text-brand-stone text-sm bg-brand-beige/30 resize-none transition-all placeholder:text-brand-stone/25"
                  />
                </div>
              ) : (
                <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4 flex gap-3">
                  <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">Siège Imani-Tech</p>
                    <p className="text-[11px] font-bold text-blue-700/70 leading-relaxed">
                      Yaoundé — Horaires : Lun-Ven 8h-17h, Sam 9h-13h<br />
                      Votre commande sera prête à l'arrivée.
                    </p>
                  </div>
                </div>
              )}
            </>

          /* ════ ÉTAPE 2 : PAIEMENT ════ */
          ) : step === 2 ? (
            <>
              {/* Total à payer */}
              <div className="bg-brand-stone rounded-2xl p-5 text-white text-center">
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-orange mb-1">Montant à payer</p>
                <p className="text-4xl font-black tracking-tighter">{fmt(total)}</p>
              </div>

              {/* Choix opérateur */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40 mb-3">
                  1. Choisir l'opérateur
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    ['mtn',    '🟡', 'MTN MoMo',     MTN_MOMO_NUMBER],
                    ['orange', '🟠', 'Orange Money', ORANGE_MONEY_NUMBER],
                  ] as const).map(([op, icon, name, num]) => (
                    <button
                      key={op}
                      onClick={() => setOperator(op)}
                      className={[
                        'flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 transition-all',
                        operator === op
                          ? 'border-brand-orange bg-brand-orange/5'
                          : 'border-brand-sand hover:border-brand-stone/30',
                      ].join(' ')}
                    >
                      <span className="text-3xl">{icon}</span>
                      <span className={`text-[10px] font-black uppercase tracking-wider ${operator === op ? 'text-brand-orange' : 'text-brand-stone/50'}`}>
                        {name}
                      </span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${operator === op ? opColor : 'text-brand-stone/25 bg-transparent border-transparent'}`}>
                        {num}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Instructions paiement */}
              <div className={`rounded-2xl border p-4 ${opColor}`}>
                <p className="text-[9px] font-black uppercase tracking-widest mb-2">
                  2. Effectuez le paiement maintenant
                </p>
                <p className="text-[12px] font-bold leading-relaxed">
                  Envoyez <strong className="font-black">{fmt(total)}</strong> au numéro :{' '}
                  <strong className="font-black text-[14px]">{opNum}</strong>
                </p>
                <p className="text-[10px] font-bold opacity-70 mt-1">
                  Bénéficiaire : <strong>Imani-Tech Solutions</strong>
                </p>
              </div>

              {/* Numéro payeur */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-stone/40 mb-2">
                  3. Votre numéro {operator === 'mtn' ? 'MTN' : 'Orange'} ayant payé <span className="text-red-400">*</span>
                </p>
                <input
                  type="tel"
                  value={payPhone}
                  onChange={e => setPayPhone(e.target.value.replace(/\D/g, '').slice(0, 12))}
                  placeholder="6XX XXX XXX"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-brand-sand focus:border-brand-orange outline-none font-black text-brand-stone text-lg tracking-widest bg-brand-beige/30 transition-all placeholder:font-bold placeholder:text-[13px] placeholder:text-brand-stone/20"
                />
                <p className="text-[9px] text-brand-stone/30 font-bold mt-1.5 ml-1">
                  Ce numéro sera vérifié par notre équipe pour confirmer le paiement.
                </p>
              </div>
            </>

          /* ════ ÉTAPE 3 : CONFIRMATION ════ */
          ) : (
            <>
              {/* Résumé complet */}
              <div className="space-y-3">
                {/* Articles */}
                <div className="bg-brand-beige/50 rounded-2xl border border-brand-sand p-4 space-y-2">
                  <p className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-orange">Articles</p>
                  {items.map(i => (
                    <div key={i.product.id} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl overflow-hidden bg-white border border-brand-sand shrink-0">
                        <img src={i.product.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="flex-1 text-[11px] font-bold text-brand-stone/70 truncate">{i.product.name} ×{i.qty}</span>
                      <span className="text-[12px] font-black text-brand-stone shrink-0">{fmt(i.product.price * i.qty)}</span>
                    </div>
                  ))}
                  <div className="border-t border-brand-sand/60 pt-2 flex justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-stone/35">Total payé</span>
                    <span className="text-xl font-black text-brand-stone">{fmt(total)}</span>
                  </div>
                </div>

                {/* Détails */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-brand-beige/50 rounded-2xl border border-brand-sand p-3.5">
                    <p className="text-[8px] font-black uppercase tracking-widest text-brand-orange mb-1">Opérateur</p>
                    <p className="text-[12px] font-black text-brand-stone">{opLabel}</p>
                    <p className="text-[10px] font-bold text-brand-stone/50 tabular-nums">{payPhone}</p>
                  </div>
                  <div className="bg-brand-beige/50 rounded-2xl border border-brand-sand p-3.5">
                    <p className="text-[8px] font-black uppercase tracking-widest text-brand-orange mb-1">Livraison</p>
                    <p className="text-[12px] font-black text-brand-stone">
                      {deliveryMode === 'livraison' ? 'Domicile' : 'Retrait siège'}
                    </p>
                    {address && (
                      <p className="text-[9px] font-bold text-brand-stone/40 line-clamp-2 mt-0.5">{address}</p>
                    )}
                  </div>
                </div>

                {/* Note WhatsApp */}
                <div className="rounded-2xl bg-[#25D366]/8 border border-[#25D366]/20 p-4 flex gap-3 items-start">
                  <MessageCircle size={18} className="text-[#25D366] shrink-0 mt-0.5" />
                  <p className="text-[11px] font-bold text-brand-stone/70 leading-relaxed">
                    Cliquez sur <strong className="text-brand-stone">Envoyer sur WhatsApp</strong> pour transmettre votre commande préremplie à l'équipe Imani-Tech. La confirmation arrive sous 2h.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── Footer navigation (sticky) ── */}
        {!done && (
          <div className="shrink-0 px-5 py-4 border-t border-brand-sand/60 bg-white/90 backdrop-blur-sm">
            {step < 3 ? (
              <div className="flex gap-3">
                {step > 1 && (
                  <button
                    onClick={() => setStep((step - 1) as 1 | 2)}
                    className="flex items-center justify-center gap-1 px-5 py-3.5 rounded-2xl border-2 border-brand-sand text-brand-stone font-black text-[10px] uppercase tracking-widest hover:border-brand-orange transition-all"
                  >
                    <ChevronLeft size={14} /> Retour
                  </button>
                )}
                <button
                  onClick={() => setStep((step + 1) as 2 | 3)}
                  disabled={step === 1 ? !step1Valid : !step2Valid}
                  className="flex-1 flex items-center justify-between bg-brand-orange disabled:bg-brand-sand text-white disabled:text-brand-stone/30 px-5 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-brand-stone disabled:cursor-not-allowed transition-all"
                >
                  <span>Continuer</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            ) : (
              /* Étape 3 : bouton final WhatsApp */
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center justify-center gap-1 px-5 py-3.5 rounded-2xl border-2 border-brand-sand text-brand-stone font-black text-[10px] uppercase tracking-widest hover:border-brand-orange transition-all"
                >
                  <ChevronLeft size={14} /> Retour
                </button>
                <button
                  onClick={handleSendOrder}
                  className="flex-1 flex items-center justify-between bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-green-500/20 active:scale-[0.98]"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle size={15} />
                    Envoyer sur WhatsApp
                  </span>
                  <ArrowUpRight size={14} className="opacity-70" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes modalIn {
          from { transform: scale(0.92) translateY(20px); opacity: 0 }
          to   { transform: scale(1)    translateY(0);    opacity: 1 }
        }
        @media (min-width: 640px) {
          @keyframes modalIn {
            from { transform: translate(-50%, -46%) scale(0.94); opacity: 0 }
            to   { transform: translate(-50%, -50%) scale(1);    opacity: 1 }
          }
        }
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0 }
          to   { transform: scale(1);   opacity: 1 }
        }
      `}</style>
    </>
  );
};
