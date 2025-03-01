import React, { createContext, useState, useContext, useEffect } from "react";

// Create the language context
const LanguageContext = createContext();

// English and Estonian translations
export const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    vans: "Vans",
    host: "Host",
    
    // Home page
    homeTitle: "You got the travel plans, we got the travel vans",
    homeSubtitle: "Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.",
    findVans: "Find your van",
    
    // About page
    aboutTitle: "Don't squeeze in a sedan when you could relax in a van",
    aboutSubtitle: "Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.",
    aboutDescription: "Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.",
    yourDestination: "Your destination is waiting. Your van is ready.",
    exploreVans: "Explore our vans",
    
    // Vans page
    exploreOptions: "Explore our van options",
    filterByType: "Filter by type:",
    filterByPrice: "Filter by price:",
    clearFilters: "Clear all filters",
    searchByName: "Search by name...",
    search: "Search",
    clear: "Clear",
    simple: "Simple",
    luxury: "Luxury",
    rugged: "Rugged",
    noResults: "No vans match your filter criteria. Please try different filters.",
    
    // Van detail page
    backToVans: "Back to all vans",
    perDay: "/day",
    rentVan: "Rent this van",
    
    // Reviews section
    customerReviews: "Customer Reviews",
    basedOn: "Based on",
    review: "review",
    reviews: "reviews",
    noReviews: "No reviews yet. Be the first to leave a review!",
    writeReview: "Write a Review",
    yourName: "Your Name",
    rating: "Rating",
    yourReview: "Your Review",
    shareFeedback: "Share your experience with this van",
    cancel: "Cancel",
    submitReview: "Submit Review",
    submitting: "Submitting...",
    
    // Error messages
    enterName: "Please enter your name",
    enterReview: "Please enter your review",
    errorFetch: "Failed to fetch reviews",
    errorSubmit: "Failed to submit review"
  },
  et: {
    // Navigation
    home: "Avaleht",
    about: "Meist",
    vans: "Kaubikud",
    host: "Majutaja",
    
    // Home page
    homeTitle: "Sul on reisiplaanid, meil on reisikaubikud",
    homeSubtitle: "Lisa oma ellu seiklust liitudes #vanlife liikumisega. Rendi täiuslik kaubik oma täiusliku roadtrip'i jaoks.",
    findVans: "Leia oma kaubik",
    
    // About page
    aboutTitle: "Ära pigista end sedaani, kui võiksid lõõgastuda kaubikus",
    aboutSubtitle: "Meie missioon on elavdada sinu roadtrip'i täiusliku reisikaubiku rendiga. Meie kaubikud on uuesti sertifitseeritud enne iga reisi, et sinu reisiplaanid saaksid sujuda tõrgeteta.",
    aboutDescription: "Meie meeskond on täis vanlife entusiaste, kes teavad isiklikult, milline võlu on maailma avastada 4 rattal.",
    yourDestination: "Sinu sihtkoht ootab. Sinu kaubik on valmis.",
    exploreVans: "Uuri meie kaubikuid",
    
    // Vans page
    exploreOptions: "Uuri meie kaubikuvalikuid",
    filterByType: "Filtreeri tüübi järgi:",
    filterByPrice: "Filtreeri hinna järgi:",
    clearFilters: "Tühista kõik filtrid",
    searchByName: "Otsi nime järgi...",
    search: "Otsi",
    clear: "Tühista",
    simple: "Lihtne",
    luxury: "Luksuslik",
    rugged: "Robustne",
    noResults: "Ükski kaubik ei vasta sinu filtritele. Palun proovi teisi filtreid.",
    
    // Van detail page
    backToVans: "Tagasi kõikide kaubikute juurde",
    perDay: "/päev",
    rentVan: "Rendi see kaubik",
    
    // Reviews section
    customerReviews: "Klientide arvustused",
    basedOn: "Põhineb",
    review: "arvustusel",
    reviews: "arvustustel",
    noReviews: "Veel pole ühtegi arvustust. Ole esimene, kes jätab arvustuse!",
    writeReview: "Kirjuta arvustus",
    yourName: "Sinu nimi",
    rating: "Hinnang",
    yourReview: "Sinu arvustus",
    shareFeedback: "Jaga oma kogemust selle kaubikuga",
    cancel: "Tühista",
    submitReview: "Saada arvustus",
    submitting: "Saadan...",
    
    // Error messages
    enterName: "Palun sisesta oma nimi",
    enterReview: "Palun sisesta oma arvustus",
    errorFetch: "Arvustuste laadimine ebaõnnestus",
    errorSubmit: "Arvustuse saatmine ebaõnnestus"
  }
};

export const LanguageProvider = ({ children }) => {
  // Get language from localStorage or default to English
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "en";
  });
  
  // Store language preference in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
    // Also update the document's lang attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);
  
  // Function to switch language
  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === "en" ? "et" : "en"));
  };
  
  // Get current translation object
  const t = translations[language];
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}; 