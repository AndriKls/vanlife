import { Link } from "react-router-dom"

export default function Card(props) {
    
    return (
        <div key={props.id} className="van-tile">
        <Link to={`${props.id}`}>
            <img src={props.img}/>
            <div className="van-info">
                <h3>{props.title}r</h3>
                <p>${props.price}<span>/day</span></p>
            </div>
            <i className={`van-type ${props.type} selected`}>{props.type}</i>
        </Link>
        </div>

        )
}
    