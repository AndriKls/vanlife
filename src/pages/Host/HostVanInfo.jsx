import React from "react"
import { useOutletContext } from "react-router-dom"
import { useLanguage } from "../../contexts/LanguageContext"

export default function HostVanInfo() {
    const { currentVan } = useOutletContext()
    const { t } = useLanguage()
    
    return (
        <section className="host-van-detail-info">
            <h4>{t.name}: <span>{currentVan.name}</span></h4>
            <h4>{t.category}: <span>{t[currentVan.type]}</span></h4>
            <h4>{t.description}: <span>{currentVan.description}</span></h4>
            <h4>{t.visibility}: <span>{currentVan.visibility}</span></h4>
        </section>
    )
}