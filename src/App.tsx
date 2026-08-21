import React from 'react';
import { AdminFloatingButton } from './components/admin/AdminFloatingButton';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-8 font-sans">
      {/* Entête du site */}
      <header className="max-w-6xl mx-auto w-full flex justify-between items-center pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black tracking-wider text-blue-500">IMANI-TECH</h1>
          <p className="text-xs text-slate-400">Solutions Technologiques & E-Commerce</p>
        </div>
        <nav className="flex gap-6 text-sm text-slate-300">
          <a href="#" className="hover:text-blue-400 transition">Accueil</a>
          <a href="#" className="hover:text-blue-400 transition">Boutique</a>
          <a href="#" className="hover:text-blue-400 transition">Services</a>
          <a href="#" className="hover:text-blue-400 transition">Contact</a>
        </nav>
      </header>

      {/* Contenu principal */}
      <main className="max-w-4xl mx-auto w-full my-auto text-center py-16">
        <span className="px-3 py-1 bg-blue-950 text-blue-400 border border-blue-800 rounded-full text-xs font-semibold uppercase tracking-widest">
          Plateforme E-Commerce
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold mt-6 mb-4 text-white">
          Bienvenue sur IMANI-TECH
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Accédez aux services et produits technologiques. Pour accéder à la gestion du site, utilisez le bouton d'administration sécurisé.
        </p>
      </main>

      {/* Pied de page */}
      <footer className="max-w-6xl mx-auto w-full pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} IMANI-TECH SOLUTIONS SARL. Tous droits réservés.</p>
        
        {/* Bouton d'accès Admin */}
        <AdminFloatingButton />
      </footer>
    </div>
  );
};