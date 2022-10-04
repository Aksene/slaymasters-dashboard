import React from 'react'

function EditableRow ( {assignment, index, editFormData, handleEditFormChange, setEditContactId}, props )  {
    return (
        <tr key={index}>
            <td>
                <button className="editable-save_btn" type="submit">Save</button>
                <button className="editable-cancel_btn" onClick={() => {setEditContactId(null)}}> Cancel</button>
            </td>
            <td>
                <input 
                    className="editable-name_input"
                    type="text" 
                    name="videoAssignement" 
                    required="required" 
                    placeholder="Please Enter a title..."
                    value={editFormData.videoAssignement}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <label className={props.showPopup ? "popup_checkbox-checkmark": "checkbox-container"}>
                    <input className="tr-checkbox" type="checkbox" checked={assignment.submitted.myChecker()} name="submitted" disabled/>
                    <span className="checkbox-checkmark" disabled></span>
                </label>
            </td>
            <td>
                <label className={props.showPopup ? "popup_checkbox-checkmark": "checkbox-container"}>
                    <input className="tr-checkbox" type="checkbox" checked={assignment.approved.myChecker()} name="approved" disabled/>
                    <span className="checkbox-checkmark" disabled></span>
                </label>
            </td>
            <td>
                <label className={props.showPopup ? "popup_checkbox-checkmark": "checkbox-container"}>
                    <input className="tr-checkbox" type="checkbox" checked={assignment.paid.myChecker()} name="paid" disabled/>
                    <span className="checkbox-checkmark-paid" disabled></span>
                </label>
            </td>
            <td>                        
                <input 
                    className="editable-date_input"
                    type="datetime-local" 
                    name="dueDate" 
                    required="required" 
                    placeholder="Select a due date..."
                    onChange={handleEditFormChange}
                />
            </td>
            
        </tr>
    )
}

export default EditableRow
