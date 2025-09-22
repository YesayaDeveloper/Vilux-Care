import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { sendMessage } from '../services/geminiService';
import { searchDatabase } from '../services/diseaseDatabase';
import LoadingAnimator from './LoadingAnimator';
import { PaperClipIcon } from './icons/PaperClipIcon';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import type { Language } from '../App';
import { t } from '../services/translations';


// Renders model response text, respecting newlines and bold markdown (**text**)
const FormattedMessage: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="text-sm break-words leading-relaxed">
      {text.split('\n').map((line, index) => (
        <p key={index} className={line.trim() === '' ? 'h-2' : ''}>
          {line.split(/(\*\*.*?\*\*)/).map((part, partIndex) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      ))}
    </div>
  );
};

interface AIHealthAssistantProps {
  initialTopic?: string | null;
  onBack: () => void;
  language: Language;
}

const AIHealthAssistant: React.FC<AIHealthAssistantProps> = ({ initialTopic, onBack, language }) => {
  const getInitialMessage = (): ChatMessage => {
    let text = t('initialGreeting', language);
    if (initialTopic) {
        const translatedTopic = t(initialTopic as any, language) || initialTopic;
        text = t('initialGreetingWithTopic', language, { topic: translatedTopic });
    }
    return { role: 'model', text };
  };

  const [messages, setMessages] = useState<ChatMessage[]>([getInitialMessage()]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearchingDb, setIsSearchingDb] = useState<boolean>(false);
  const [image, setImage] = useState<{b64: string, file: File} | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
          const base64String = (reader.result as string).split(',')[1];
          setImage({ b64: base64String, file: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((input.trim() === '' && !image) || isLoading || isSearchingDb) return;

    const userMessageText = input || (image ? `${t('analyzingImage', language)}: ${image.file.name}` : "...");
    const userMessage: ChatMessage = { role: 'user', text: userMessageText };
    setMessages(prev => [...prev, userMessage]);
    
    const currentInput = input;
    const currentImage = image;
    setInput('');
    setImage(null);
    if(fileInputRef.current) fileInputRef.current.value = '';

    // Determine loading state before calling service
    if (!currentImage && (await searchDatabase(currentInput)) !== null) {
        setIsSearchingDb(true);
    } else {
        setIsLoading(true);
    }
    
    const imagePayload = currentImage ? { b64: currentImage.b64, mimeType: currentImage.file.type } : undefined;
    const responseText = await sendMessage(currentInput, imagePayload);
    
    const modelMessage: ChatMessage = { role: 'model', text: responseText };
    setMessages(prev => [...prev, modelMessage]);

    setIsLoading(false);
    setIsSearchingDb(false);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-200">
      {(isLoading || isSearchingDb) && <LoadingAnimator language={language} />}
      <header className="bg-white/80 backdrop-blur-md shadow-sm z-10 sticky top-0 dark:bg-slate-900/80 dark:border-b dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between h-16">
            <button onClick={onBack} className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 p-2 -ml-2 rounded-full transition-colors">
              <ChevronLeftIcon />
            </button>
            <h1 className="text-3xl font-playfair font-bold text-slate-800 dark:text-slate-200 tracking-tight">
              Vilux{' '}
              <span className="animate-text-shine">Care</span>
            </h1>
            <div className="w-8"></div>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-white/60 backdrop-blur-md border border-slate-200/50 text-slate-800 rounded-br-none animate-background-shine dark:bg-slate-800/60 dark:border-slate-700/50 dark:text-slate-200'
                    : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
                }`}
              >
                {msg.role === 'model' 
                  ? <FormattedMessage text={msg.text} /> 
                  : <p className="text-sm break-words leading-relaxed font-medium">{msg.text}</p>
                }
              </div>
            </div>
          ))}
          {isLoading && !isSearchingDb && ( // Show dots only for AI loading, not DB search
            <div className="flex justify-start">
               <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl bg-white text-slate-800 rounded-bl-none border border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="pt-4 pb-2 px-4 bg-white/80 backdrop-blur-md border-t border-slate-200 dark:bg-slate-900/80 dark:border-slate-800">
        {image && (
          <div className="max-w-4xl mx-auto mb-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-between animate-fade-in">
              <div className="flex items-center space-x-2 min-w-0">
                  <img src={URL.createObjectURL(image.file)} alt="Preview" className="h-10 w-10 rounded object-cover" />
                  <span className="text-sm text-slate-600 dark:text-slate-400 truncate">{image.file.name}</span>
              </div>
              <button onClick={() => {
                  setImage(null);
                  if(fileInputRef.current) fileInputRef.current.value = '';
                }} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex-shrink-0 ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
          </div>
        )}
        <form onSubmit={handleSend} className="flex items-center space-x-3 max-w-4xl mx-auto">
          <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
          <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading || isSearchingDb}
              className="text-slate-500 hover:text-slate-800 p-3 rounded-full hover:bg-slate-200 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
              aria-label="Attach image"
          >
              <PaperClipIcon />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={image ? t('imageCommentPlaceholder', language) : t('wellnessQuestionPlaceholder', language)}
            disabled={isLoading || isSearchingDb}
            className="flex-1 block w-full px-5 py-3 bg-white border border-slate-300 rounded-full text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
              disabled:bg-slate-50 disabled:cursor-not-allowed transition-shadow
              dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-500
              dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading || isSearchingDb || (input.trim() === '' && !image)}
            className="bg-slate-800 text-white rounded-full p-3 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg
            dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white dark:focus:ring-slate-400 dark:disabled:bg-slate-600"
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
         <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-3 px-4">
          {t('disclaimer', language)}
        </p>
      </div>
    </div>
  );
};

export default AIHealthAssistant;