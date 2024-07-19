import React from 'react';
import Cf7FormWrapper from "./cf7-form-wrapper"
import { useState } from "react"

const ContactForm = ({ handler, isLoading, isSent, hasError }) => {
    const [formState, setFormState] = useState({})

    const handleFieldChange = (field, e) => {
      setFormState({
        ...formState,
        [field]: e.target.value,
      })
    }
  
    const handleFormSubmit = (e) => {
      handler(e, formState)
    }
  
    return (
      <form onSubmit={handleFormSubmit}>
        {/* <div>isLoading: {isLoading ? "Loading" : "false"}</div>
        <div>isSent: {isSent ? "Sent" : "false"}</div>
        <div>Error: {hasError || "null"}</div> */}
        <p style={{textTransform:'uppercase'}}>Email</p>
        <input className='FormInput' onChange={(e) => handleFieldChange("your-email", e)} type="email" placeholder='more@cocktails.com'/>
        <textarea className='FormInput' onChange={(e) => handleFieldChange("your-message", e)} placeholder='Your Message' />
        <input className={`Default-Button ${isLoading?"Inactive":""}`} type="submit" value="Send" />
        <p>{hasError&&`There was an error, please send an email to info@dreambabydreambar.com!`}
        {isSent&&"Thank you for your email!"}</p>
      </form>
    )
  }

export default ContactForm;
