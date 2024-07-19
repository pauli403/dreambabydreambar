import { useEffect, useMemo,useState, } from "react";


export default function useOnScreen(ref, onEntry) {

  
    const observer = useMemo(() => new IntersectionObserver(
      ([entry]) => onEntry(entry.isIntersecting),
      {threshold:0.9}
    ), [ref])
  
  
    useEffect(() => {
      observer.observe(ref.current)
      return () => observer.disconnect()
    }, [])

  }
