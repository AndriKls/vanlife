import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
    const { language } = useLanguage();
    
    const footerText = {
        en: "© 2024 #VANLIFE",
        et: "© 2024 #KAUBIKUELU"
    };
    
    return (
        <footer>{footerText[language]}</footer>
    )
}