export default function Card(props) {
    
    return (
    <div className="card">
            <img src={props.img} alt="" />
            <div className="card-content">
                <h2 className="card-title">{props.title}r</h2>
                <div className="card-price">
                    <span className="card-badge">{props.tag}</span>
                    <span className="cprice">${props.price}/day</span>
                </div>
            </div>
        </div>

        )
}
