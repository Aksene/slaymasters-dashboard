import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Auth/auth'
import Layout from '../components/Layout'
import { supabase } from '../database/Database'
import "../App.css"
import axios from 'axios';
import Popup from '../components/Popup'
import EditableRow from '../components/EditableRow'
import ReadOnlyRow from '../components/ReadOnlyRow'
import AllTablePopup from '../components/AllTablePopup'
import { Fragment } from 'react'

function ManageAssignments() {
    const auth = useAuth();
    const [userInfo, setUserInfo] = useState([])
    const [allAssignments, setAllAssignments] = useState([])
    const [dueAssignments, setDueAssignments] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    const [date, setDate] = useState()
    const [editFormData, setEditFormData] = useState({
        videoAssignement: "",
        dueDate: "",
    })
    const [showPopup, setShowPopup] = useState(false)
    const [showAllTablePopup, setShowAllTablePopup] = useState(false)
    const [editContactId, setEditContactId] = useState(null)

    useEffect(() => {

        getUserInfo()
        getDueAssignments()
        getAllAssignments()
       
    },[])

    const handleAddFormSubmit = async ( event, index, item) => {
        // event.preventDefault();

        const newAssignement = {
            full_name: item.fullName,
            title: item.title,
            email: item.email,
            video_assignment: item.videoAssignement,
            due_date: item.dueDate,
            link: item.link
        }

        console.log("event: NewAssignment", newAssignement)
        

        // if(newAssignement) {

        //     // With upsert, if upload exist it updates it and if not it will insert a new row
        //     const {data, error} = await supabase.from("slaymastersAssignments").insert({
        //         full_name: newAssignement.full_name,
        //         email: newAssignement.email,
        //         title: newAssignement.title,
        //         video_assignment: newAssignement.video_assignment,
        //         // date: newAssignement.due_date,
        //         // link: newAssignement.link
        //     })

        //     if(error) {
        //         console.log(error)
        //         alert(error.message)
        //     }
        //     if(data) {
        //         console.log(data)
        //         alert("Assignment has been uploaded!")
        //         getAllAssignments()
        //         getDueAssignments()
        //         setShowPopup(false) 
        //     }
        // }

    }

    const handlePopup = (e) => {
        e.preventDefault();
        setShowPopup(true)

        console.log("Test: "+ e.target.value)
    }

    const getUserInfo = async() => {
        let info = [];

        const {data, error} = await supabase
            .from("slaymastersProfiles")
            .select()
            // .match({user_id: auth.user.id})

        if(error){
            console.log(error)
        }
        if(data){
            // info.push(data)
            console.log("Data info for user")
            console.log(data)
            setUserInfo(data)

            // console.log(data.id)
        }
    }

    const getAllAssignments = async() => {
        const {data, error} = await supabase
            .from("slaymastersAssignments")
            .select()

        if(error){
            console.log(error)
        }
        if(data){
            setAllAssignments(data)
            
            if (data.length == 0){
                setIsEmpty(true)

            }else{
                console.log(data)
            }
        }

    }

    const getDueAssignments = async() => {
        const {data, error} = await supabase
            .from("slaymastersAssignments")
            .select()
            .match({paid: false})

        if(error){
            console.log(error)
        }
        if(data){
            setDueAssignments(data)
            
            if (data.length == 0){
                setIsEmpty(true)

            }else{

            }
        }

    }

    const formateDate = (assignmentDate) => {
        if(assignmentDate == null){
            return "No due date"
        }else{
            const date = new Date(assignmentDate)
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            })
            return formattedDate
        }
    }

    const checkLateAssignment = (assignmentDate) => {
        // var date = new Date();
        // var m = date.getMonth();
        // var d = date.getDate();
        // var y = date.getFullYear();

        var rawDate = new Date();

        var todaysDate = new Date().valueOf();
        console.log("Todays RAW date: " + rawDate) 
        
        console.log("Todays date: " + todaysDate.toString() + "    " + "Assignment Date: " + formateDate(assignmentDate))

        // formateDate(todaysDate)
        // Converts value Date value into an integer
        var assignment = new Date(assignmentDate).valueOf()

        if(assignmentDate == null){
            console.log("There is no due date!")
            return "assignment-table-row";
        }
        else if(todaysDate > assignment){
            console.log("Assignment is late!")
            return "late-assignment-table-row"

        }else if(todaysDate < assignment){
            console.log("Assignment is early!")
            return "assignment-table-row";
        } 
    }

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

    Boolean.prototype.myChecker = function() {
        if (this.valueOf() === true) {
          return "checked";
        } else {
          return  "";
        }
    };

    const handleEditClick = (event, assignment)=> {
        event.preventDefault();
        setEditContactId(assignment.id);

        const formValues = {
            videoAssignement: assignment.video_assignment,
            // dueDate: assignment.dueDate,
            dueDate: null,
        }

        setEditFormData(formValues)
        console.log(editFormData)
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value;

        console.log("Field Value" + fieldValue)
        console.log("Field Name" + fieldName)

        const newFormData = { ...editFormData};
        newFormData[fieldName] = fieldValue

        console.log("New form data: ", newFormData)
        setEditFormData(newFormData)
    }

    const handleEditFormSubmit = async (event) => {
        event.preventDefault();

        const newAssignement = {
            video_assignment: editFormData.videoAssignement,
            due_date: editFormData.dueDate,
        }

        console.log(newAssignement)

        if(newAssignement) {

            // With upsert, if upload exist it updates it and if not it will insert a new row
            const {data, error} = await supabase.from("slaymastersAssignments").update({
                video_assignment: newAssignement.video_assignment,
                // date: newAssignement.due_date,
                // link: newAssignement.link
            }).eq('id', editContactId)

            if(error) {
                console.log(error)
                // alert(error.message)
            }
            if(data) {
                console.log(data)
                alert("Assignment has been uploaded!")
                // newAssignement = {
                //     videoAssignement: "",
                //     dueDate: "",
                // }
                setEditFormData(newAssignement)
                getAllAssignments()
                getDueAssignments()
                setEditContactId(null)
                // setShowPopup(false) 
            }
        }
    }

    const handleDeleteClick = async (assignmentId) => {

        
        if(assignmentId) {

            // With upsert, if upload exist it updates it and if not it will insert a new row
            const {data, error} = await supabase
                .from("slaymastersAssignments")
                .delete()
                .eq('id', assignmentId)

            if(error) {
                console.log(error)
                alert(error.message)
            }
            if(data) {
                console.log(data)
                alert("Assignment has been deleted!")
                getAllAssignments()
                getDueAssignments()
                setEditContactId(null)
            }
        }
    }

    const handleActionClick = async (event, assignmentID, action, type) => {
        event.preventDefault();

        if(assignmentID) {

            // With upsert, if upload exist it updates it and if not it will insert a new row
            if (type === 'submitted'){
                const {data, error} = await supabase
                .from("slaymastersAssignments")
                .update({submitted: action})
                .eq('id', assignmentID)

                if(error) {
                    console.log(error)
                    alert(error.message)
                }
                if(data) {
                    console.log(data)
                    alert("Assignment submission status has been changed!")
                    getAllAssignments()
                    getDueAssignments()
                    setEditContactId(null)
                }
            } else if (type === 'approved'){
                const {data, error} = await supabase
                .from("slaymastersAssignments")
                .update({approved: action})
                .eq('id', assignmentID)

                if(error) {
                    console.log(error)
                    alert(error.message)
                }
                if(data) {
                    console.log(data)
                    alert("Assignment approval status has been changed!")
                    getAllAssignments()
                    getDueAssignments()
                    setEditContactId(null)
                }
            } else if (type === 'paid'){
                const {data, error} = await supabase
                .from("slaymastersAssignments")
                .update({paid: action})
                .eq('id', assignmentID)

                if(error) {
                    console.log(error)
                    alert(error.message)
                }
                if(data) {
                    console.log(data)
                    alert("Assignment payment status has been changed!")
                    getAllAssignments()
                    getDueAssignments()
                    setEditContactId(null)
                }
            }
        }
    }

    return (
        <Layout>
            <div className="manage-assignment-container">
                <h1>MANAGE ASSIGNMENTS</h1>
                <div className="manage-assignments-btns">
                    <button className="add_assignments-btn" onClick={() => setShowPopup(true)}> Add Assignments </button>
                    <button className="all_assignments-btn" onClick={() => setShowAllTablePopup(true)}> Show ALL Assignments </button>

                </div>
                <Popup 
                    trigger={showPopup} 
                    setTrigger={setShowPopup} 
                    // handleAddChange={handleAddFormChange}
                    // handleNameAddChange={handleNameAddFormChange} 
                    handleAddSubmit={handleAddFormSubmit}
                    getAllAssignments={getAllAssignments}
                    getDueAssignments={getDueAssignments}
                    setShowPopup={setShowPopup}
                    // addFormData={addFormData}
                    userInfo={userInfo}
                >
                </Popup> 

                <AllTablePopup
                    trigger={showAllTablePopup}
                    setTrigger={setShowAllTablePopup}
                    checkLateAssignment={checkLateAssignment}
                    isEmpty={isEmpty}
                    allAssignments={allAssignments}
                    assignmentLinkHandler={assignmentLinkHandler}
                    formateDate={formateDate}
                >

                </AllTablePopup>

                <div className="manage-assignment-table-container">
                    <div className="grid-1">
                        <div className="due-assignments-table">
                            <h2>DUE ASSIGNMENTS</h2>
                                {isEmpty 
                                    ? <h4>No Assignment Available!</h4> 
                                    :
                                    <div>
                                        <form onSubmit={handleEditFormSubmit}>
                                            <table className="assignments-table">
                                                <thead>
                                                    <tr>
                                                        <th><h4>Actions</h4></th>
                                                        <th><h4>Title</h4></th>
                                                        <th><h4>Submitted</h4></th>
                                                        <th><h4>Approved</h4></th>
                                                        <th><h4>Paid</h4></th>
                                                        <th><h4>Due Date</h4></th>
                                                    </tr>
                                                </thead>

                                                {dueAssignments.map((assignment, index) => (
                                                    <tbody key={index} >
                                                    {/* <tr className="assignment-table-row" key={index}> */}
                                                    {console.log("logging assignment ID : " + assignment.id)}
                                                    
                                                        <Fragment>
                                                            {   
                                                                editContactId ===  assignment.id ? (
                                                                    <EditableRow
                                                                        assignment={assignment} 
                                                                        showPopup={showPopup}
                                                                        setShowPopup={setShowPopup}
                                                                        editFormData={editFormData}
                                                                        handleEditFormChange={handleEditFormChange}
                                                                        handleEditClick={handleEditClick}
                                                                        setEditContactId={setEditContactId}

                                                                    />
                                                                ):(
                                                                    <ReadOnlyRow 
                                                                        assignment={assignment} 
                                                                        checkLateAssignment={checkLateAssignment} 
                                                                        index={index} 
                                                                        showPopup={showPopup} 
                                                                        setShowPopup={setShowPopup}
                                                                        handleEditClick={handleEditClick}
                                                                        handleDeleteClick={handleDeleteClick}
                                                                        handleActionClick={handleActionClick}
                                                                    />
                                                                )
                                                            }   
                                                        </Fragment>
                                                    </tbody>
                                                ))}
                                            </table>
                                        </form>
                                    </div>
                                }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ManageAssignments
