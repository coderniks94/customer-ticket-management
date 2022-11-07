import { Link } from "react-router-dom";

export default function AlertMessage(props) {
    console.debug("received alert obj: ", props);
    var iconDivClass = "";
    var iconClass = "";
    if(props.alert.type === "error"){
        iconDivClass = "alert-danger";
        iconClass = "bi-x-circle";
    } else if(props.alert.type === "warning"){
        iconDivClass = "alert-warning";
        iconClass = "bi-exclamation-circle";
    } else if(props.alert.type === "success") {
        iconDivClass = "alert-success";
        iconClass = "bi-check-circle";
    } else if (props.alert.type === "info") {
        iconDivClass = "alert-info";
        iconClass = "bi-info-circle";
    }
    iconDivClass += " alert"// alert-dismissible fade show";
    iconClass += " bi me-2"
    
    return (
        <div className={iconDivClass + " p-2"} role="alert">
            {/* <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill" /></svg> */}
            <i className={iconClass}></i>
            {props.alert.message}
            {props.alert.link && props.alert.linkText && <Link to={props.alert.link}>{props.alert.linkText}</Link>}
        </div>
    )
    
}