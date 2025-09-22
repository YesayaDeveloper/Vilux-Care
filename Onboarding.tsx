import React from 'react';
import type { Language } from '../App';
import { t } from '../services/translations';

interface OnboardingProps {
  onGetStarted: () => void;
  language: Language;
}

const Onboarding: React.FC<OnboardingProps> = ({ onGetStarted, language }) => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center text-center p-4">
      <div className="animate-elegant-slide-up">
        <h1 className="text-6xl md:text-7xl font-playfair font-bold text-slate-800 dark:text-slate-200 tracking-tight">
          Vilux{' '}
          <span className="animate-text-shine">Care</span>
        </h1>
        <p className="mt-4 text-slate-500 dark:text-slate-400">{t('tagline', language)}</p>
      </div>

      <div className="absolute bottom-24 flex flex-col items-center" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
        <button
          onClick={onGetStarted}
          className="bg-white/20 backdrop-blur-md text-slate-700 font-semibold py-3 px-8 rounded-full border border-white/30 hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-elegant-slide-up
          dark:text-slate-200 dark:border-white/20 dark:hover:bg-white/30 dark:focus:ring-slate-500"
          style={{ animationDelay: '0.7s' }}
        >
          {t('getStarted', language)}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;