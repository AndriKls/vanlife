import React from "react"
import { Link } from "react-router-dom"
import Card from "../../components/Card"

export default function Vans() {
    const [vans, setVans] = React.useState([])
    React.useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])

    const vanElements = vans.map(van => (
        <Card key={van.id} id={van.id} img={van.imageUrl} title={van.name} price={van.price} type={van.type}/>
    ))

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}