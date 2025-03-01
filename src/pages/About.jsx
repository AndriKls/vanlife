import React from "react"
import bgImg from "../assets/images/about-hero.png"
import { Link } from "react-router-dom"
import { useLanguage } from "../contexts/LanguageContext"

export default function About() {
    const { t } = useLanguage();
    
    return (
        <div className="about-page-container">
            <img src={bgImg} className="about-hero-image" alt="Van parked beside mountains" />
            <div className="about-page-content">
                <h1>{t.aboutTitle}</h1>
                <p>{t.aboutSubtitle}</p>
                <p>{t.aboutDescription}</p>
            </div>
            <div className="about-page-cta">
                <h2>{t.yourDestination}</h2>
                <Link className="link-button" to="/vans">{t.exploreVans}</Link>
            </div>
        </div>
    );
}