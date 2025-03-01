import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();
  
  // Globe icon using SVG
  const GlobeIcon = () => (
    <svg 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={{ marginRight: '5px' }}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  );
  
  return (
    <button 
      onClick={toggleLanguage} 
      className="language-switcher"
      aria-label={`Change language to ${language === 'en' ? 'Estonian' : 'English'}`}
    >
      <GlobeIcon />
      {language === 'en' ? 'ET' : 'EN'}
    </button>
  );
} 