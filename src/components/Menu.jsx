import React, { useState } from 'react';
import SinglePageWrapper from '../SinglePageWrapper';
import "./menu.css"
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from './constants';
import SyncLoader from "react-spinners/SyncLoader";
const Menu = () => {
    const [cocktails, setCocktails] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(()=>{
        axios.get(`${BASE_URL}/wp-json/p4/v1/cocktails`)
        .then((resp)=>{
            const cocktails = resp.data.filter((e)=>e.show_on_menu).map(cocktail=>{
                if(cocktail.menu_index===null ||cocktail.menu_index<0){
                    return{
                        ...cocktail,
                        menu_index:0
                    }
                }else{return cocktail}
            }).sort((a,b)=>{
                return a.menu_index - b.menu_index;
            });
            
            setCocktails(cocktails);
            setIsLoaded(true)
        })

    },[])
    if (isLoaded){
    return (
        <>
        <SinglePageWrapper>
           <div className='drinks-grid'>
            {cocktails.map((cocktail)=>{
                return <div className='drink'>
                    <h3>{cocktail.title}</h3>
                    <p>{cocktail.public_ingredients}</p>
                </div>
            })}

           </div>
           <p>In addition to our beautifully crafted unique signature cocktails, we do an assortment of classic cocktails, long drinks, beers and wines. </p>
           </SinglePageWrapper>
        </>
    );}else{
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

export default Menu;
