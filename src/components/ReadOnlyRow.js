import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import DeletePopup from './DeletePopup'
import PaidPopup from './PaidPopup'


function ReadOnlyRow ( {assignment, index, showPopup, handleActionClick, handleEditClick, handleDeleteClick}, props )  {
    const [showDeletePopup, setShowDeletePopup] = useState(false)
    const [showPaidPopup, setShowPaidPopup] = useState(false)

    const formateDate = (assignmentDate) => {
        if(assignmentDate == null){
            return "No due date"
        }else{
            const date = new Date(assignmentDate)
            // const day = date.getDay
            // console.log("new day: ", day+1)
            // const date = new Date(assignmentDate).setDate(day)
            console.log(date)
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            })


            console.log("New Date: ",formattedDate)
            return formattedDate
        }
    }

    Boolean.prototype.myChecker = function() {
        if (this.valueOf() === true) {
          return "checked";
        } else {
          return  "";
        }
    };

    const assignmentLinkHandler = (link, video) => {
        if(link == null){
            return <h4>{video}</h4>
        }else{
            return (
                <Link className="assignments-table-links" to={`//${link}`} target='_blank'>
                    <h4>{video}</h4>
                </Link>  
            )
        }
        
    }

    return (
        <tr className="readOnly-assignment_row" key={index}>
            <td>
                {/* <button onClick={() => setShowPopup(true)}>  */}
                <button className="readOnly-edit_btn" type="button" onClick={(event) => handleEditClick(event, assignment)}>
                    Edit 
                </button>
                
                <button className="readOnly-delete_btn" type="button" onClick={() => { setShowDeletePopup(true) }}> 
                    Delete 
                </button>
                <DeletePopup
                    trigger={showDeletePopup} 
                    setTrigger={setShowDeletePopup} 
                    assignmentID={assignment.id}
                    handleDeleteClick={handleDeleteClick}
                ></DeletePopup>

            </td>
            <td>
                { 
                    assignmentLinkHandler(assignment.link,assignment.video_assignment)
                }                                                        
            </td>
            <td>
                <label className={"checkbox-container"}>
                    <input className="tr-checkbox" type="checkbox" checked={assignment.submitted.myChecker()} name="submitted" disabled/>
                    <span className="checkbox-checkmark" disabled></span>
                </label>
            </td>
            <td>
                <label className={"checkbox-container"}>
                    <input className="tr-checkbox" type="checkbox" checked={assignment.approved.myChecker()} name="approved" disabled/>
                    <span className="checkbox-checkmark" disabled></span>
                </label>
            </td>
            <td>
                {/* <label className={showPopup ? "popup_checkbox-checkmark": showDeletePopup ? "popup_checkbox-checkmark" : "checkbox-container"}> */}
                <label className={"checkbox-container"}>
                    <input className="tr-checkbox" type="checkbox" checked={assignment.paid.myChecker()} name="paid" disabled/>
                    <span className="checkbox-checkmark-paid" disabled></span>
                </label>
            </td>
            <td>
                <h4>
                    {
                        formateDate(assignment.due_date)
                    }
                </h4>
            </td>
            <td>
                <div className="readOnly-btn_grid">
                    {assignment.submitted 
                        ?  <button className="readOnly-other_btn" onClick={(event) => handleActionClick(event, assignment.id, false, 'submitted')}>Mark as NOT Submitted</button>
                        : <button className="readOnly-other_btn" onClick={(event) => handleActionClick(event, assignment.id, true, 'submitted')}>Mark as Submitted</button>
                    }

                    {assignment.approved 
                        ?  <button className="readOnly-other_btn" onClick={(event) => handleActionClick(event, assignment.id, false, 'approved')}>Mark as NOT Approved</button>
                        : <button className="readOnly-other_btn" onClick={(event) => handleActionClick(event, assignment.id, true, 'approved')}>Mark as Approved</button>
                    }

                    
                    <div>
                        <button className="readOnly-other_btn" onClick={() => setShowPaidPopup(true) }>Mark as Paid</button>
                        <PaidPopup
                            trigger={showPaidPopup} 
                            setTrigger={setShowPaidPopup} 
                            assignmentID={assignment.id}
                            handleActionClick={handleActionClick}
                        ></PaidPopup>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default ReadOnlyRow
