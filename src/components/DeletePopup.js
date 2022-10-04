import React from 'react'
import './DeletePopup.css'

function DeletePopup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}> X</button>
                <div className="prompt-container">
                    <h1> Are you sure you want to DELETE this assignment? </h1>
                    <div className="button-container">
                        <button className="cancel-btn" onClick={() => props.setTrigger(false)}> Cancel </button>
                        <button className="delete-btn" type="button" onClick={() => props.handleDeleteClick(props.assignmentID)}> 
                            Delete 
                        </button>
                    </div>      
                </div>
            </div>
        </div>
    ) : "";
}



export default DeletePopup
