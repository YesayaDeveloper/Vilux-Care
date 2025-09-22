import React from 'react';
import type { Language } from '../App';
import { t } from '../services/translations';

interface LoadingAnimatorProps {
  language: Language;
}

const LoadingAnimator: React.FC<LoadingAnimatorProps> = ({ language }) => {
  return (
    <div className="fixed inset-0 bg-white/60 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in dark:bg-slate-900/60">
      <div className="text-center">
        <h1 className="text-5xl font-playfair font-bold text-slate-800 dark:text-slate-200 tracking-tight">
          Vilux{' '}
          <span className="animate-text-shine">Care</span>
        </h1>
        <p className="mt-4 text-slate-500 dark:text-slate-400 animate-pulse">
          {t('thinking', language)}...
        </p>
      </div>
    </div>
  );
};

export default LoadingAnimator;