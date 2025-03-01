import { Link } from "react-router-dom"
import { useLanguage } from "../contexts/LanguageContext"

export default function Card(props) {
    const { t } = useLanguage();
    
    return (
        <div key={props.id} className="van-tile">
            <Link to={`${props.id}`}>
                <img src={props.img} alt={props.title} />
                <div className="van-info">
                    <h3>{props.title}</h3>
                    <p>${props.price}<span>{t.perDay}</span></p>
                </div>
                <i className={`van-type ${props.type} selected`}>{t[props.type]}</i>
            </Link>
        </div>
    )
}
    