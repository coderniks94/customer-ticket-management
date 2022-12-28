import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import TicketTile from "../components/TicketTile";
import { useAuth } from "../contexts/AuthContextProvider"
import { getTicketsCreatedByUser } from "../firebase/ticketService";


/**
 * this page is only for customer role
 */
export default function MyTicketsPage() {
    // const [userDetails, setUserDetails] = useState({});
    const [ticketsCreatedByUser, setTicketsCreatedByUser] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    // const [hasPageAccess, setHasPageAccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [filterValues, setFilterValues] = useState({state:{open: true, closed: true}});
    const { loggedInUser } = useAuth();

    const filterList = [
        {
            label: "State",
            name: "state",
            filterOptions: [
                {
                    label: "Open",
                    name: "open"
                },
                {
                    label: "Closed",
                    name: "closed"
                }
            ]
        }
    ]

    const location = useLocation();
    console.debug(location);
    const queryParams = new Proxy(new URLSearchParams(location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    console.debug("queryParams.state:", queryParams.state);

    useEffect(() => {
        getTicketsCreatedByUser(loggedInUser.uid).then((response) => {
            console.debug("response", response);
            setTicketsCreatedByUser(response);
            setIsLoading(false);
            // getUrlParams();

            
            if(queryParams.state && (queryParams.state == "open" || queryParams.state == "closed")) {
                let filterValuesCopy = {...filterValues};
                filterValuesCopy = {state:{open: false, closed: false}};
                filterValuesCopy.state[queryParams.state] = true
                setFilterValues(filterValuesCopy);
            }
            

        });

    }, [])

    // can be implemented later
    //
    // useEffect(() => {
    //     let filterValuesCopy = { ...filterValues };
    //     filterList.forEach((category) => {
    //         filterValuesCopy[category.name] = {};
    //         category.filterOptions.forEach((option) => {
    //             filterValuesCopy[category.name][option.name] = false;
    //         })
    //     })
    //     setFilterValues(filterValuesCopy);
    // }, [])

    useEffect(()=>{
        filterTicketsResults();
    },[ticketsCreatedByUser]);

    useEffect(()=>{
        filterTicketsResults();
    }, [filterValues])

    const filterValuesChanged = function(filterValues) {
        setFilterValues(filterValues);
        // filterTicketsResults();
    }

    const filterTicketsResults = function() {
        var matchedTickets = ticketsCreatedByUser.filter((ticket)=>{
            return (filterValues.state.open && ticket.state == "Open") ||
            (filterValues.state.closed && ticket.state == "Closed");
        });

        setFilteredTickets(matchedTickets);
    }


    const getTicketsList = function () {
        return (
            <div className="d-flex">
                <div className="w-25">
                    <Filter filterList={filterList} filterValues={filterValues} filterValuesChanged={filterValuesChanged}/>
                </div>

                <ul className="ps-0 flex-grow-1">
                    {filteredTickets.map((ticket) => {
                        // return <li key={ticket.number}>{ticket.number} : {ticket.shortDescription}</li>
                        return <li className="card w-100 mt-2" key={ticket.number}>
                            <TicketTile ticket={ticket} />
                        </li>
                    })}
                </ul>
            </div>
        )
    }

    const getMyTicketsPageView = function () {
        return (
            <>
                <h3>My tickets list</h3>
                {ticketsCreatedByUser && ticketsCreatedByUser.length > 0 && getTicketsList()}
            </>
        )
    }

    return (
        <>{isLoading ? <Loading /> : getMyTicketsPageView()}</>
    )
}