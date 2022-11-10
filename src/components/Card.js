import { Link } from "react-router-dom";

export default function Card() {
    return (
        <div className="card">
            {/* <div className="card-header">
                8
            </div> */}
            <div className="card-body">
                <h3 className="card-title">8</h3>
                <p className="card-text">Open Tickets</p>
                <Link to={'/my-tickets?state=open'} className="btn btn-primary stretched-link">View Open Tickets</Link>
                {/* <a href="#" className="btn btn-primary">View Open Tickets</a> */}
            </div>
        </div>
    )
}