import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: 'Immobilier' | 'Santé' | 'Éducation' | 'PME' | 'Industrie' | 'Hôtellerie' | 'Logistique';
  results: string;
  description: string;
  imageUrl: string;
  challenge: string;
  solution: string;
  techStack: string[];
  location: string;
}

export interface Package {
  id: string;
  title: string;
  category: 'Web' | 'Infrastructure' | 'Digital' | 'Sécurité';
  price: string;
  features: string[];
  description: string;
  isPopular?: boolean;
  details?: {
    objective: string;
    target: string;
    techStack: string[];
    phases: string[];
    maintenance: string;
    roi: string;
  };
}

export enum AppRoute {
  Home = '/',
  Services = '/services',
  CaseStudies = '/etudes-de-cas',
  Packages = '/nos-packages',
  Method = '/methode',
  DigitalSolutions = '/solutions-digitales',
  About = '/a-propos',
  Blog = '/blog',
  Contact = '/contact',
  Audit = '/audit-strategique'
}