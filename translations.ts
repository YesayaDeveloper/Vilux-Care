import type { Language } from '../App';

const translations = {
  en: {
    // Onboarding
    tagline: "Your Personal Health Companion",
    getStarted: "Get Started",
    // Health Topics
    whatsOnYourMind: "What's on your mind?",
    selectTopic: "Select a topic to get started.",
    "General Wellness": "General Wellness",
    "Skin Health": "Skin Health",
    "Nutrition & Diet": "Nutrition & Diet",
    "Fitness & Exercise": "Fitness & Exercise",
    "Mental Well-being": "Mental Well-being",
    or: "OR",
    typeMyOwn: "I'll type my own question",
    // Settings
    settings: "Settings",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    language: "Language",
    resetApp: "Start Over",
    done: "Done",
    // AI Chat
    initialGreeting: 'Hello! I am your Vilux Care health assistant. How can I help you today?\n\nYou can ask me questions or upload an image for a general description.',
    initialGreetingWithTopic: `I see you're interested in **{topic}**. What specific questions do you have? I'm here to provide general information.`,
    analyzingImage: "Analyzing image",
    imageCommentPlaceholder: "Add a comment about the image...",
    wellnessQuestionPlaceholder: "Ask a wellness question...",
    disclaimer: "Vilux Care is for informational purposes only and does not provide medical advice. Consult a healthcare professional.",
    // Loading
    thinking: "Thinking"
  },
  id: {
    // Onboarding
    tagline: "Pendamping Kesehatan Pribadi Anda",
    getStarted: "Mulai",
    // Health Topics
    whatsOnYourMind: "Apa yang Anda pikirkan?",
    selectTopic: "Pilih topik untuk memulai.",
    "General Wellness": "Kesehatan Umum",
    "Skin Health": "Kesehatan Kulit",
    "Nutrition & Diet": "Nutrisi & Diet",
    "Fitness & Exercise": "Kebugaran & Olahraga",
    "Mental Well-being": "Kesehatan Mental",
    or: "ATAU",
    typeMyOwn: "Saya akan ketik pertanyaan sendiri",
    // Settings
    settings: "Pengaturan",
    theme: "Tema",
    light: "Terang",
    dark: "Gelap",
    language: "Bahasa",
    resetApp: "Mulai Ulang",
    done: "Selesai",
    // AI Chat
    initialGreeting: 'Halo! Saya adalah asisten kesehatan Vilux Care Anda. Ada yang bisa saya bantu hari ini?\n\nAnda dapat mengajukan pertanyaan atau mengunggah gambar untuk deskripsi umum.',
    initialGreetingWithTopic: `Saya lihat Anda tertarik dengan **{topic}**. Pertanyaan spesifik apa yang Anda miliki? Saya di sini untuk memberikan informasi umum.`,
    analyzingImage: "Menganalisis gambar",
    imageCommentPlaceholder: "Tambahkan komentar tentang gambar...",
    wellnessQuestionPlaceholder: "Ajukan pertanyaan kesehatan...",
    disclaimer: "Vilux Care hanya untuk tujuan informasi dan tidak memberikan saran medis. Konsultasikan dengan tenaga kesehatan profesional.",
    // Loading
    thinking: "Berpikir"
  }
};

type TranslationKey = keyof typeof translations.en;

export const t = (
  key: TranslationKey, 
  lang: Language,
  options?: Record<string, string>
): string => {
  let text = translations[lang][key] || translations['en'][key];
  if (options) {
    Object.keys(options).forEach(placeholder => {
      text = text.replace(`{${placeholder}}`, options[placeholder]);
    });
  }
  return text;
};