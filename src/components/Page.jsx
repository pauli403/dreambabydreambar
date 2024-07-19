import React from 'react';
import { useEffect, useState } from 'react'
import Hero from './Hero';
import Logo from './Logo';
import Navbar from './Navbar';
import HorizontalCard from './HorizontalCard';
import Carousel from './Carousel';
import axios from 'axios';
import { BASE_URL } from './constants';
import SyncLoader from "react-spinners/SyncLoader";

const Page = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [cards, setCards] = useState()
  const [cocktails, setCocktails] = useState([])
  const [visibleCards, setVisibleCards] = useState([false])

  const onEntry = (entryIsVisible,entryIndex)=>{
    const nextVisible = visibleCards.map((c,i)=>{
      if(i===entryIndex){
        return entryIsVisible
      }else{
        return c
      }
    })
    if (nextVisible.some(e=>e==true)||entryIndex===-1){
      setVisibleCards(nextVisible);
    }

  }
  useEffect(() => {
      const requests = [
        axios.get(`${BASE_URL}/wp-json/wp/v2/main-cards`),
        axios.get(`${BASE_URL}/wp-json/p4/v1/cocktails`)
      ]
        
      axios.all(requests).then(responses => {
          let cards = responses[0].data;
          cards.sort((a, b) => parseInt(a.acf.index, 10) - parseInt(b.acf.index, 10));
          cards = cards.filter(card=>parseInt(card.acf.index, 10) >=0)
          setCards(cards)
          setVisibleCards(cards.map(()=>false))

          let cocktails = responses[1].data;
          setCocktails(cocktails);
          setIsLoaded(true)
        })

}, [])

  if(isLoaded){
    return (
        <>
    <Hero index={-1} onEntry={onEntry}></Hero>
      <Logo asIcon={false}/>
      <Navbar cards={cards} visibleCards={visibleCards}></Navbar>
      <div className='Container'>
        
        <div className='gridded'>
        
        {
          cards.map( (card,i) =>{
            if(card.slug === "cocktails"){
              return <Carousel key={i} index={i} onEntry={onEntry} cocktails={cocktails}/>
            }else{
            return <HorizontalCard key={i} index={i}variant={i%2==0} object={card} onEntry={onEntry}></HorizontalCard>
          }
          })
        }
        </div>
      </div>
        </>
    );
  }else{
    return(
      <SyncLoader
      color= "#CCCCCC"
      cssOverride={{
          margin: "65% auto",
          textAlign: "center"
        }}
      size="1.5em"
      margin="1em"
      />
  )
    
  }
};

export default Page;
