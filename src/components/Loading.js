export default function Loading() {
    return (
        <div className="d-flex flex-row justify-content-center">
            <span className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </span>
            <h3>Loading...</h3>
        </div>
    )
}