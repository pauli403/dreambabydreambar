import React, {useRef,useEffect, useState} from 'react';
import useOnScreen from './useOnScreen';
import { BASE_URL } from './constants';
import Cf7FormWrapper from './cf7-form-wrapper';
import ContactForm from './ContactForm';

const HorizontalOtherContent = ({object,variant, onEntry, index}) => {
    const formRefs = useRef([]);
    const [isLoaded, setIsLoaded] = useState(false)
    const ref = useRef(null)
    const imageURL = object.acf.image;
    const observer = useOnScreen(ref,(isVisible)=>onEntry(isVisible,index));
    if (object.acf.other==="[contactform]"){
      return <div ref = {ref} className={`Other-Content ${variant?"variant":""}`}>
        <Cf7FormWrapper siteUrl={BASE_URL} formId={49}>
        <ContactForm />
      </Cf7FormWrapper>
      </div>
    }else if (!(object.acf.other==="")){
      return <div ref = {ref} className={`Other-Content ${variant?"variant":""}`}>
      <div dangerouslySetInnerHTML={
          {__html:object.acf.other}
      }></div></div>
    } else{
      return <div ref={ref} className={`Other-Content ${variant?"variant":""}`}>
      <img src={imageURL}></img>
      </div>
    }
};

export default HorizontalOtherContent;
