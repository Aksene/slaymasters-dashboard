import React from 'react'
import './AllTablePopup.css'

function AllTablePopup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="showTable_popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}> X</button>
                <div className="info-container">
                <div className="all-assignmentst-table">
                            <h3>ALL ASSIGNMENTS</h3>
                                {props.isEmpty 
                                    ? <h4>No Assignment Available!</h4> 
                                    :
                                    <table className="assignments-table">
                                        <thead>
                                            <tr>
                                                <th><h4>Title</h4></th>
                                                <th><h4>Submitted</h4></th>
                                                <th><h4>Approved</h4></th>
                                                <th><h4>Paid</h4></th>
                                                <th><h4>Due Date</h4></th>
                                            </tr>
                                        </thead>

                                        {props.allAssignments.map((assignment, index) => (
                                            <tbody key={index} >
                                            {/* <tr className="assignment-table-row" key={index}> */}
                                            {console.log("logging due date befkre table: " + assignment.due_date)}
                                            <tr className={props.checkLateAssignment(assignment.due_date)} key={index}>
                                                <td>
                                                    { 
                                                        props.assignmentLinkHandler(assignment.link,assignment.video_assignment)
                                                    }                                                        
                                                </td>
                                                <td>
                                                    <label className="checkbox-container" disabled>
                                                        <input className="tr-checkbox" type="checkbox" checked={assignment.submitted.myChecker()} name="submitted" disabled/>
                                                        <span className="checkbox-checkmark" disabled></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label className="checkbox-container">
                                                        <input className="tr-checkbox" type="checkbox" checked={assignment.approved.myChecker()} name="approved" disabled/>
                                                        <span className="checkbox-checkmark" disabled></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label className="checkbox-container">
                                                        <input className="tr-checkbox" type="checkbox" checked={assignment.paid.myChecker()} name="paid" disabled/>
                                                        <span className="checkbox-checkmark-paid" disabled></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <h4>
                                                        {
                                                            props.formateDate(assignment.due_date)
                                                        }
                                                    </h4>
                                                </td>
                                            </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                }
                        </div>      
                </div>
            </div>
        </div>
    ) : "";
}



export default AllTablePopup;
