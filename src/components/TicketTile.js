import { Link } from "react-router-dom";

export default function TicketTile(props) {
    const ticket = props.ticket;

    return (
        <Link className="card-body text-decoration-none d-flex flex-row" to={"/ticket-details/" + ticket.number} state={{ ticket }}>
            {/* <Link to="#" className="stretched-link text-decoration-none"> */}
            <span className="card-title text-decoration-none">{ticket.number}</span> &nbsp;
            <span className="card-text">{ticket.shortDescription}</span>
            <div className="ms-auto">
                {ticket.state == "Open" && <span className="badge bg-primary">Open</span>}
                {ticket.state == "Closed" && <span className="badge bg-secondary">Closed</span>}
            </div>
            {/* </Link> */}
        </Link>
    )

}