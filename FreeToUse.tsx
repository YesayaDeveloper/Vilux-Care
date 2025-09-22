import React, { useState, useEffect } from 'react';
import type { Language } from '../App';

const healthTips: { en: string[], id: string[] } = {
  en: [
    "Stay hydrated, drink plenty of water.",
    "A short walk is better than no walk at all.",
    "Quality sleep is key to a healthy mind.",
    "Eat a rainbow of fruits and vegetables.",
    "Take a moment to breathe and relax.",
    "Listen to your body; rest when you need to.",
    "Laughter is a great form of stress relief.",
    "Stretching in the morning can boost your energy.",
    "Mindful eating can improve digestion.",
    "Limit processed foods for better overall health.",
    "Regular check-ups are important for prevention.",
    "Protect your skin from the sun.",
    "Practice good posture to avoid back pain.",
  ],
  id: [
    "Tetap terhidrasi, minum banyak air.",
    "Jalan kaki singkat lebih baik daripada tidak sama sekali.",
    "Tidur berkualitas adalah kunci pikiran yang sehat.",
    "Makan buah dan sayuran berwarna-warni.",
    "Luangkan waktu sejenak untuk bernapas dan rileks.",
    "Dengarkan tubuh Anda; istirahatlah saat Anda membutuhkannya.",
    "Tertawa adalah bentuk pereda stres yang hebat.",
    "Peregangan di pagi hari dapat meningkatkan energi Anda.",
    "Makan dengan sadar dapat meningkatkan pencernaan.",
    "Batasi makanan olahan untuk kesehatan yang lebih baik.",
    "Pemeriksaan rutin penting untuk pencegahan.",
    "Lindungi kulit Anda dari sinar matahari.",
    "Latih postur yang baik untuk menghindari sakit punggung."
  ]
};


interface FreeToUseProps {
  language: Language;
}

const FreeToUse: React.FC<FreeToUseProps> = ({ language }) => {
  const [tip, setTip] = useState('');

  useEffect(() => {
    const tipsForLanguage = healthTips[language];
    setTip(tipsForLanguage[Math.floor(Math.random() * tipsForLanguage.length)]);
  }, [language]);


  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* The main "Free to use" text with the new fade-out blur animation */}
      <h2 className="text-5xl font-playfair font-bold text-slate-800 dark:text-slate-200 tracking-tight animate-fade-in-out-blur">
        Free to <span className="animate-text-shine">use</span>
      </h2>

      {/* The animated health tip, also with the new animation but slightly delayed */}
      <div className="mt-8 w-full max-w-md animate-fade-in-out-blur" style={{ animationDelay: '0.3s' }}>
        <p className="text-base font-playfair italic text-slate-500 dark:text-slate-400">
          {tip}
        </p>
      </div>
    </div>
  );
};

export default FreeToUse;