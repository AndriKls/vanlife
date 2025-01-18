import React from "react";
import Card from "../components/Card"

export default function Vans() {
    const [data, setData] = React.useState([])
    
    React.useEffect(() => {
        fetch("/api/vans")
        .then(res => res.json())
        .then(data => setData(data.vans))
    }, [])
    
    const vanElements = data.map(van => {
        return <Card key={van.id} img={van.imageUrl} title={van.name} tag={van.type} price={van.price}/>
    })
    return (
        <main className="vans-page">
            <div className="vans-top">
                <h1>Explore our van options</h1>
                <div className="filters">
                    <span>Simple</span>
                    <span>Luxury</span>
                    <span>Rugged</span>
                    <button>Clear filters</button>
                </div>
            </div>
            <div className="vans">
                {vanElements}
            </div>
        </main>
    )
}