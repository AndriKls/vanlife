import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

export default function HostVans() {
    const [myVans, setMyVans] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const { t } = useLanguage();

    React.useEffect(() => {
        async function loadVans() {
            try {
                const res = await fetch("/api/host/vans");
                const data = await res.json();
                setMyVans(data.vans);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        
        loadVans();
    }, []);

    const vanElements = myVans.map((van) => {
        return (
            <Link to={`${van.id}`} key={van.id} className="host-van-link-wrapper">
                <div className="host-van-container">
                    <div className="host-van-image-container">
                        <img src={van.imageUrl} alt={van.name} />
                    </div>
                    <div className="host-van-info-container">
                        <p className="hostvanname">{van.name}</p>
                        <p>${van.price}{t.perDay}</p>
                    </div>
                </div>
            </Link>
        )
    });

    if (loading) {
        return <h2 className="loading">{t.loading}</h2>
    }

    if (error) {
        return <h2 className="error">{t.errorLoading}</h2>
    }

    return (
        <div className="host-van-list">
            <h1>{t.yourListedVans}</h1>
            {vanElements.length > 0 ? 
                vanElements : 
                <p className="no-vans">{t.noVansListed}</p>
            }
        </div>
    )
}