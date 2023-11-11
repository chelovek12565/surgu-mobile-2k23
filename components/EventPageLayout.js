import EventHeader from "./EventHeader";
import Footer from "./Footer";
import { useEffect, useState } from "react";


const EventPageLayout = ({title, children}) => {
    return (
        <div>
            <EventHeader title={title}/>
            {children}
            <Footer />
        </div>
   );
};



export default EventPageLayout;
