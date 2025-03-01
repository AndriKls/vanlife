import React from "react"
import { useOutletContext } from "react-router-dom"
import { useLanguage } from "../../contexts/LanguageContext"

export default function HostVanPricing() {
    const { currentVan } = useOutletContext()
    const { t } = useLanguage()
    
    return (
        <section>
            <h3 className="host-van-price">${currentVan.price}<span>{t.perDay}</span></h3>
        </section>
    )
}