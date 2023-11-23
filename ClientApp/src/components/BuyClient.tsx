import React from "react";
import SellTicketSeller from "./SellTicketSeller";

interface Props {
    scheduledMovieId: string
    scheduledMovie: string;
    scheduledRoom: string;
    scheduledDate: Date;
}

function BuyClient(props: Props){
    // ~~~~~~~~~~~~~~~~~~~~~~ Configure endpoints ~~~~~~~~~~~~~~~~~~~~~~~~~~
    // const isLocalTesting = process.env.REACT_APP_LOCAL_TESTING;
    // const port = process.env.REACT_APP_PORT;
    // const networkIp = process.env.REACT_APP_NETWORK_IP;
    
    // const home = (isLocalTesting === 'true') ? `https://localhost:${port}` : `https://${networkIp}:${port}`;
    const scheduleEndpoint = '/api/movieprogramming';
    const discountsEndpoint = '/api/discount';
    const seatsEndponit = '/api/seats'
    const buyEndpoint = '/api/sales'
    // ~~~~~~~~~~~~~~~~~~~~~~ End configure endpoints ~~~~~~~~~~~~~~~~~~~~~~~~

    return (
        <div>
            Buy: {props.scheduledMovieId}
            <SellTicketSeller scheduleEndpoint={scheduleEndpoint} discountEndpoint={discountsEndpoint} seatEndpoint={seatsEndponit} buyEndpoint={buyEndpoint} scheduledMovieId={props.scheduledMovieId} scheduledMovie={props.scheduledMovie} scheduledDate={props.scheduledDate} scheduledRoom={props.scheduledRoom} />
        </div>
    );
}

export default BuyClient;