import React, { useEffect, useState } from 'react';
import SinglePageWrapper from '../SinglePageWrapper';
import axios from 'axios';
import { BASE_URL } from './constants';
import SyncLoader from "react-spinners/SyncLoader";

const Imprint = () => {
    const [isLoaded,setIsLoaded] = useState(false)
    const [privacyPage,setPrivacyPage] = useState(null)
    useEffect(()=>{
        axios.get(`${BASE_URL}/wp-json/wp/v2/pages/3`)
        .then(obj => {
            setPrivacyPage(obj.data);
            setIsLoaded(true)
        })
    },[])
    if(isLoaded){
        return (<>
            <SinglePageWrapper>
                <h2>Imprint</h2>
                <div dangerouslySetInnerHTML={{__html:privacyPage.content.rendered}}></div>
            </SinglePageWrapper>
            </>)
    }else{
        return(<>
            <SinglePageWrapper><SyncLoader
              color= "#CCCCCC"
              cssOverride={{
                  margin: "65% auto",
                  textAlign: "center"
                }}
              size="1.5em"
              margin="1em"
              /></SinglePageWrapper>
            </>)

    }
};

export default Imprint;
