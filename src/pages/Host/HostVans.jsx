import React from 'react';
import { Link } from 'react-router-dom';

export default function HostVans() {
    const [myVans, setMyVans] = React.useState([])

    React.useEffect(() => {
        fetch("/api/host/vans")
        .then(res => res.json())
        .then(data => setMyVans(data.vans))
    }, []);

    const vanElements = myVans.map((van) => {
        return (
            
            <Link to={`/host/vans/${van.id}`}
            key={van.id} className="host-van-link-wrapper">
            <div className="host-van-container" key={van.id}>
                <div className="host-van-image-container">
                    <img src={van.imageUrl} alt={van.name} />
                </div>
                <div className="host-van-info-container">
                    <p className="hostvanname">{van.name}</p>
                    <p>${van.price}/day</p>
                </div>
            </div>
            </Link>
        )
    })
    return (
        <>
        <div className="host-van-list">
        <h1>Your listed vans</h1>

            {vanElements}
        </div>
        </>
    )
}