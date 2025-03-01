import React from "react"
import { useParams, Link, Outlet, NavLink } from "react-router-dom"
import { getActiveClass } from '../../components/HostLayout'
import { useLanguage } from '../../contexts/LanguageContext'

export default function HostVanDetail() {
    const { id } = useParams()
    const [currentVan, setCurrentVan] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const { t } = useLanguage()

    React.useEffect(() => {
        async function loadVanDetail() {
            try {
                const res = await fetch(`/api/host/vans/${id}`)
                const data = await res.json()
                setCurrentVan(data.vans)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        
        loadVanDetail()
    }, [id])

    if (loading) {
        return <h2 className="loading">{t.loading}</h2>
    }

    if (error) {
        return <h2 className="error">{t.errorLoading}</h2>
    }

    if (!currentVan) {
        return <h2 className="not-found">{t.vanNotFound}</h2>
    }

    return (
        <section>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>{t.backToVans}</span></Link>

            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={currentVan.imageUrl} alt={currentVan.name} />
                    <div className="host-van-detail-info-text">
                        <i className={`van-type van-type-${currentVan.type}`}>
                            {t[currentVan.type]}
                        </i>
                        <h3>{currentVan.name}</h3>
                        <h4>${currentVan.price}{t.perDay}</h4>
                    </div>
                </div>

                <nav className="host-van-detail-nav">
                    <NavLink to='.' className={getActiveClass}>
                        {t.info}
                    </NavLink>
                    <NavLink to='pricing' className={getActiveClass}>
                        {t.pricing}
                    </NavLink>
                    <NavLink to='photos' className={getActiveClass}>
                        {t.photos}
                    </NavLink>
                </nav>

                <Outlet context={{currentVan}} />
            </div>
        </section>
    )
}
