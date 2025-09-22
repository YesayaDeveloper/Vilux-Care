import React, { useState } from 'react';
import type { Theme, Language } from '../App';
import { GearIcon } from './icons/GearIcon';
import { t } from '../services/translations';

interface HealthTopicsProps {
  onTopicSelect: (topic: string | null) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  onReset: () => void;
}

const topics = [
    "General Wellness",
    "Skin Health",
    "Nutrition & Diet",
    "Fitness & Exercise",
    "Mental Well-being",
];

const TopicButton: React.FC<{ topicKey: string, onClick: () => void, delay: string, language: Language }> = ({ topicKey, onClick, delay, language }) => (
    <button
        onClick={onClick}
        className="w-full text-left p-4 bg-white/60 backdrop-blur-md border border-slate-200/50 rounded-lg shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 transform hover:-translate-y-1 animate-elegant-slide-up
        dark:bg-slate-800/60 dark:border-slate-700/50 dark:hover:bg-slate-700"
        style={{ animationDelay: delay }}
    >
        <span className="font-semibold text-slate-700 dark:text-slate-200">{t(topicKey as any, language)}</span>
    </button>
);

const SettingsModal: React.FC<{ 
  onClose: () => void; 
  theme: Theme; 
  setTheme: (theme: Theme) => void; 
  language: Language;
  setLanguage: (language: Language) => void;
  onReset: () => void;
}> = ({ onClose, theme, setTheme, language, setLanguage, onReset }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-fade-in"
        style={{ animationDuration: '0.3s' }}
      ></div>
      <div 
        className="relative m-4 w-full max-w-xs bg-white/80 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-slate-200/50 animate-elegant-slide-up dark:bg-slate-800/80 dark:border-slate-700/50"
        style={{ animationDuration: '0.5s' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-center text-slate-800 dark:text-slate-200 mb-4">{t('settings', language)}</h2>
        
        <div className="space-y-3">
          {/* Theme Toggle */}
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">{t('theme', language)}</label>
            <div className="mt-1 grid grid-cols-2 gap-2 rounded-lg bg-slate-200 dark:bg-slate-700 p-1">
              <button 
                onClick={() => setTheme('light')}
                className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${theme === 'light' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 dark:text-slate-300'}`}
              >
                {t('light', language)}
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${theme === 'dark' ? 'bg-slate-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-300'}`}
              >
                {t('dark', language)}
              </button>
            </div>
          </div>

           {/* Language Selector */}
           <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">{t('language', language)}</label>
            <div className="mt-1 grid grid-cols-2 gap-2 rounded-lg bg-slate-200 dark:bg-slate-700 p-1">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${language === 'en' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 dark:text-slate-300'}`}
              >
                English
              </button>
              <button 
                onClick={() => setLanguage('id')}
                className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${language === 'id' ? 'bg-white text-slate-800 shadow-sm dark:bg-slate-600 dark:text-white' : 'text-slate-500 dark:text-slate-300'}`}
              >
                Indonesia
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={onReset} 
          className="mt-4 w-full py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors"
        >
          {t('resetApp', language)}
        </button>
        <button 
          onClick={onClose} 
          className="mt-2 w-full py-2 text-sm font-semibold text-blue-600 dark:text-blue-400"
        >
          {t('done', language)}
        </button>
      </div>
    </div>
  );
};


const HealthTopics: React.FC<HealthTopicsProps> = ({ onTopicSelect, theme, setTheme, language, setLanguage, onReset }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} onReset={onReset}/>}
      <div className="absolute top-0 left-0 p-4 z-10">
        <button onClick={() => setShowSettings(true)} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <GearIcon />
        </button>
      </div>

      <div className="h-screen w-full flex flex-col items-center justify-center p-4">
          <div className="max-w-sm w-full text-center">
              <h1 className="text-4xl font-playfair font-bold text-slate-800 dark:text-slate-200 tracking-tight mb-2 animate-elegant-slide-up">
                  {t('whatsOnYourMind', language)}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mb-8 animate-elegant-slide-up" style={{ animationDelay: '0.1s' }}>
                  {t('selectTopic', language)}
              </p>

              <div className="space-y-3">
                  {topics.map((topic, index) => (
                      <TopicButton 
                          key={topic} 
                          topicKey={topic} 
                          onClick={() => onTopicSelect(topic)}
                          delay={`${(index * 0.1) + 0.2}s`}
                          language={language}
                      />
                  ))}
                  
                  <div className="relative flex py-3 items-center animate-elegant-slide-up" style={{ animationDelay: '0.7s' }}>
                      <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                      <span className="flex-shrink mx-4 text-xs text-slate-400 dark:text-slate-500">{t('or', language)}</span>
                      <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                  </div>

                  <button 
                      onClick={() => onTopicSelect(null)}
                      className="w-full text-center py-3 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors duration-200 animate-elegant-slide-up dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                      style={{ animationDelay: '0.8s' }}
                  >
                      {t('typeMyOwn', language)}
                  </button>
              </div>
          </div>
      </div>
    </>
  );
};

export default HealthTopics;