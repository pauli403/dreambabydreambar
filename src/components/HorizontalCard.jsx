import HorizontalOtherContent from './HorizontalOtherContent';
import './horizontalCard.css'
import React from "react"
import { isMobile } from './constants';

const HorizontalCard = ({index, object, variant, onEntry }) => {

        if ((variant && !isMobile )) {
            return(<>
                <HorizontalOtherContent object={object} variant={variant} onEntry={onEntry} index={index}></HorizontalOtherContent>
                <div className={`Text-Content variant`}>
                    <h2 id={object.slug}>{object.title.rendered}</h2>
                    <p dangerouslySetInnerHTML={
                    {__html:object.content.rendered}
                    }></p>
                </div>
            </>
            );
        }else{
            return(<>
            <div className={`Text-Content`}>
            <h2 id={object.slug}>{object.title.rendered}</h2>
            <p dangerouslySetInnerHTML={
                    {__html:object.content.rendered}
                    }></p>
            
            </div>
            <HorizontalOtherContent object={object} variant={variant} onEntry={onEntry} index={index}></HorizontalOtherContent> 
            </>
        );
        }
};

export default HorizontalCard;
