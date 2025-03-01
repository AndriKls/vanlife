import React from "react"
import { Link } from "react-router-dom"
import { useLanguage } from "../contexts/LanguageContext"

export default function Home() {
    const { t } = useLanguage();
    
    return (
        <div className="home-container">
            <h1>{t.homeTitle}</h1>
            <p>{t.homeSubtitle}</p>
            <Link to="vans">{t.findVans}</Link>
        </div>
    )
};