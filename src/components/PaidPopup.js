import React from 'react'
import './PaidPopup.css'

function PaidPopup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}> X</button>
                <div className="prompt-container">
                    <h1> Are you sure want to mark this assignment as PAID? </h1>
                    <div className="button-container">
                        <button className="cancel-btn" onClick={() => props.setTrigger(false)}> Cancel </button>
                        <button className="pay-btn"type="button" onClick={(event) => {
                            props.handleActionClick(event, props.assignmentID, true, 'paid')
                            props.setTrigger(false)
                        }}> 
                            Pay 
                        </button>
                    </div>      
                </div>
                
            </div>
        </div>
    ) : "";
}



export default PaidPopup
