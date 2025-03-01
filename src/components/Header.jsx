import React from "react"
import { Link, NavLink } from "react-router-dom"
import { getActiveClass } from "./HostLayout"
import LanguageSwitcher from "./LanguageSwitcher"
import { useLanguage } from "../contexts/LanguageContext"

export default function Header() {
    const { t } = useLanguage();
    
    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink to="/host" className={getActiveClass}>{t.host}</NavLink>
                <NavLink to="/about" className={getActiveClass}>{t.about}</NavLink>
                <NavLink to="/vans" className={getActiveClass}>{t.vans}</NavLink>
                <LanguageSwitcher />
            </nav>
        </header>
    )
}