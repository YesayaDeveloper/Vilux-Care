import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import FreeToUse from './components/FreeToUse';
import HealthTopics from './components/HealthTopics';
import AIHealthAssistant from './components/AIHealthAssistant';
import { resetChat } from './services/geminiService';

export type AppState = 'onboarding' | 'free_to_use' | 'health_topics' | 'main_chat';
export type Theme = 'light' | 'dark';
export type Language = 'en' | 'id';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (appState === 'free_to_use') {
      // The animation for FreeToUse is ~3.5s. After it completes, move to health_topics.
      const timer = setTimeout(() => {
        setAppState('health_topics');
      }, 3500); // Corresponds to the duration of the animations within FreeToUse
      return () => clearTimeout(timer);
    }
  }, [appState]);

  const handleGetStarted = () => {
    setIsFadingOut(true);
    // Wait for the fade-out animation to complete before changing the state
    setTimeout(() => {
      setAppState('free_to_use');
      setIsFadingOut(false); // Reset for potential future use
    }, 1000); // Corresponds to the fadeOut animation duration
  };
  
  const handleTopicSelect = (topic: string | null) => {
    setSelectedTopic(topic);
    setAppState('main_chat');
  };

  const handleBackToTopics = () => {
    resetChat(); // Reset the AI conversation memory
    setAppState('health_topics');
  };

  const handleResetApp = () => {
    resetChat(); // Also reset on full app restart
    setAppState('onboarding');
  }

  switch (appState) {
    case 'onboarding':
      return (
        <div className={isFadingOut ? 'animate-fade-out' : 'animate-fade-in'}>
          <Onboarding onGetStarted={handleGetStarted} language={language} />
        </div>
      );
    case 'free_to_use':
      return <FreeToUse language={language}/>;
    case 'health_topics':
        return (
            <div className="animate-fade-in">
                <HealthTopics 
                  onTopicSelect={handleTopicSelect} 
                  theme={theme}
                  setTheme={setTheme}
                  language={language}
                  setLanguage={setLanguage}
                  onReset={handleResetApp}
                />
            </div>
        );
    case 'main_chat':
      return (
        <div className="animate-fade-in">
          <AIHealthAssistant 
            initialTopic={selectedTopic} 
            onBack={handleBackToTopics} 
            language={language}
          />
        </div>
      );
    default:
      return null;
  }
};

export default App;