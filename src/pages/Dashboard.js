import React,{ useEffect, useState} from 'react'
import Layout from '../components/Layout'
import { supabase } from '../database/Database'
import { useAuth } from '../Auth/auth'
import { Link } from 'react-router-dom'
import "../App.css"

import howToCreate from '../Assets/how_to_create.png'
import howToRecord from '../Assets/how-to-record.png'
import howTo from '../Assets/how_to.png'
import howToFrame from '../Assets/how_to_frame.png'
import howToFilm from '../Assets/how_to_film_at_home.png'
import howToFindTrends from '../Assets/how_to_find_trends.jpg'
import howToUseDashboard from '../Assets/how_to_use_dashboard.jpg'



const Dashboard = () => {
    const auth = useAuth();
    const [userInfo, setUserInfo] = useState([])
    const [userAssignments, setUserAssignments] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    const [date, setDate] = useState()

    useEffect(() => {
        // window.scrollTo({
        //     top: 0,
        //     behavior: "smooth",
        // });
        getUserInfo()
        getUserAssignments()
    },[])

    const getUserInfo = async() => {
        let info = [];

        const {data, error} = await supabase
            .from("slaymastersProfiles")
            .select()
            .match({user_id: auth.user.id})

        if(error){
            console.log(error)
        }
        if(data){
            // info.push(data)
            // console.log("Data info for user")
            // console.log(info)
            setUserInfo(data)
            console.log("Data info for user")
            console.log(data)
            // console.log(data.id)
        }
    }

    const getUserAssignments = async() => {
        const {data, error} = await supabase
            .from("slaymastersAssignments")
            .select()
            .match({email: auth.user.email})

        if(error){
            console.log(error)
        }
        if(data){
            setUserAssignments(data)
            
            if (data.length == 0){
                setIsEmpty(true)
                console.log("No assignment info for user")

            }else{
                console.log("Assignment info for user")
                console.log(data)
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
                // <a className="assignments-table-links" href={`${link}`} >
                //     <h4>{video}</h4>
                // </a> 
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

    return (
        <Layout >
            <div className="dashboard-layout">
                {/* <h1>This Dashboard is protected</h1> */}
                {console.log(userInfo)}
                {console.log("Return method userInfo:")}

                <div>
                    <div className="dashboard-title">
                        {userInfo.map((info, index) => (<h1 key={index}> Welcome {info.full_name.substring(0, info.full_name.indexOf(' '))}!</h1>))}
                    </div>
                    <div className="dashboard-updates">
                        <h2>UPDATES</h2>
                        <div className="updates-info">
                            <p1>
                            As a <Link 
                                    className="dashboard-updates_hyperlink" 
                                    to="//sduxzxrctlxqqbmtfsqr.supabase.co/storage/v1/object/sign/onboarding/SLAYMASTER_ONBOARDING.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvbmJvYXJkaW5nL1NMQVlNQVNURVJfT05CT0FSRElORy5wZGYiLCJpYXQiOjE2NTM0ODMzMjksImV4cCI6MTk2ODg0MzMyOX0.7FilJPs0RXJoex_DBbIuEzwUzqcUyNBwwWrBBM3PPn8&t=2022-05-25T12%3A55%3A31.539Z" 
                                    target='_blank'>SLAYMASTER</Link> you play an important role in the work we do. All updates on what we are doing as a company will be found on your dashboard and welcome you to share your feedback.
                                <br></br>
                                <br></br>XO, 
    ​                            <br></br>THE TEAM  
                            </p1>
                        </div>
                        <div className="updates-iframe-container">
                            <iframe
                                src="https://player.gotolstoy.com/b8rw1dn163juj"
                                allowFullScreen={true}
                                className="updates-iframe"
                                title="Updates"
                            />
                        </div>
                    </div>
                    <div className="dashboard-calender">
                        <h2>SLAYMASTER CREATOR CALENDER</h2>
                        <div className="calender-iframe-container">
                            <iframe
                                src="https://calendar.google.com/calendar/embed?src=c_sc33prns60tbqgd25suu5ejdrs%40group.calendar.google.com&amp;ctz=America%2FNew_York"
                                className="calender-iframe"
                                title="Calender"
                            />
                        </div>
                    </div>
                    <div className="dahsboard-assignments">
                        <h2>MAKE THE SLAY HAPPEN</h2>
                        <div className="dashboard-assignment-tools-title-container">
                            {/* <div className="assignment-grid-header">
                                <h3>Upcoming Assignments</h3>
                            </div>
                            <div className="tools-grid-header">
                                <h3>TOOLS TO COMPLETE ASSIGNMENTS</h3>
                            </div> */}
                        </div>
                        <div className="assignments-container">
                            <div className="assignments-table-set">
                            <h3>UPCOMING ASSIGNMENTS</h3>
                            {isEmpty 
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

                                    {userAssignments.map((assignment, index) => (
                                        <tbody key={index} >
                                        {/* <tr className="assignment-table-row" key={index}> */}
                                        {console.log("logging due date befkre table: " + assignment.due_date)}
                                        <tr className={checkLateAssignment(assignment.due_date)} key={index}>
                                            <td>
                                                { 
                                                    assignmentLinkHandler(assignment.link,assignment.video_assignment)
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
                                                        formateDate(assignment.due_date)
                                                    }
                                                </h4>
                                            </td>
                                        </tr>
                                        </tbody>
                                    ))}
                                </table>
                            }
                            </div>
                            

                            <div className="tools-grid-container">
                                    <h3>TOOLS TO COMPLETE ASSIGNMENTS</h3>
                                <div className="tools-grid-content">
                                    <div className="tools-grid-item"><Link to="//app.restream.io/" target='_blank'><button >GO LIVE</button></Link></div>
                                    <div className="tools-grid-item"><Link to="/upload-to-vimeo"><button >UPLOAD TO VIMEO</button></Link></div>
                                    <div className="tools-grid-item">
                                        <Link 
                                            to="//sduxzxrctlxqqbmtfsqr.supabase.co/storage/v1/object/sign/scripts/scripts42822?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzY3JpcHRzL3NjcmlwdHM0MjgyMiIsImlhdCI6MTY1MTIwMzI1MCwiZXhwIjoxOTY2NTYzMjUwfQ.OW0KaVr_PG6xmJQrojWN4myJrSNw6f_r4NogPIcTIlY" 
                                            target='_blank'
                                        >
                                            <button >SCRIPTS</button>
                                        </Link>
                                    </div>
                                    <div className="tools-grid-item"><Link to="/upload-images"><button >UPLOAD IMAGES</button></Link></div>
                                    <div className="tools-grid-item"><Link to="//tk8wnxtrmyu.typeform.com/to/jg8s2uvd" target='_blank'><button >REFER A FRIEND TO BE A SLAYMASTER</button></Link></div>
                                    <div className="tools-grid-item"><Link to="//www.google.com" target='_blank'><button onClick={() => window.location.href = 'mailto:tickets@slaymaster-creators.p.tawk.email'}> GET HELP</button></Link></div>
                                    <div className="tools-grid-item"><Link to="//slaymastercreators.tawk.help/" target='_blank'><button >VIDEO GUIDELINES</button></Link></div>
                                    <div className="tools-grid-item"><Link to="//a.co/3aOZPuu" target='_blank'><button > RECOMMENDED PRODUCTS FOR FILMING KIT </button></Link></div>
                                    <div className="tools-grid-item"><Link to="//tk8wnxtrmyu.typeform.com/to/JUR8aiOi" target='_blank'><button className="tools-grid-button_feedback" > GIVE US FEEDBACK </button></Link></div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="tutorial-iframe-container">
                        <h1 className="how_to_use_dash-title">HOW TO USE DASHBOARD</h1>
                        <div className="how_to_use_dash">
                            <iframe 
                                src="https://www.loom.com/embed/6d4a401469a349a29b80ed4611080c20" 
                                frameborder="0" 
                                webkitallowfullscreen 
                                mozallowfullscreen 
                                allowfullscreen 
                                className="how_to_use_dash-video"
                            >
                            </iframe>
                        </div>
                    </div>

                    <div className="dashboard-training">
                        <h1>TRAINING VIDEOS</h1>
                        <div className="training-videos-grid">
                            <video
                                src="https://sduxzxrctlxqqbmtfsqr.supabase.co/storage/v1/object/sign/trainingvideos/My Lighting for YouTube Videos - CRISP CLEAR YOUTUBE videos (DAY &amp; NIGHT).mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbmluZ3ZpZGVvcy9NeSBMaWdodGluZyBmb3IgWW91VHViZSBWaWRlb3MgLSBDUklTUCBDTEVBUiBZT1VUVUJFIHZpZGVvcyAoREFZICYgTklHSFQpLm1wNCIsImlhdCI6MTY0OTgwNjUwMiwiZXhwIjoxOTY1MTY2NTAyfQ.t2PV_VP5pRMi-U2D9BfhU1QRZe7LnuxXT0nPuVDKer4"
                                loop
                                muted
                                poster={howToCreate}
                                controls
                                className="training-video"
                            ></video>
                            <video
                                src="https://sduxzxrctlxqqbmtfsqr.supabase.co/storage/v1/object/sign/trainingvideos/How to Make YouTube Videos on Your Phone (Beginners Tutorial).mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbmluZ3ZpZGVvcy9Ib3cgdG8gTWFrZSBZb3VUdWJlIFZpZGVvcyBvbiBZb3VyIFBob25lIChCZWdpbm5lcnMgVHV0b3JpYWwpLm1wNCIsImlhdCI6MTY0OTgwNjE2NiwiZXhwIjoxOTY1MTY2MTY2fQ.mswZ0w_nwi-969MYeXk8MmqjzaVay_orIv3wLoevgWQ"
                                loop
                                muted
                                poster={howToRecord}
                                controls
                                className="training-video"
                            ></video>
                            <video
                                src="https://sduxzxrctlxqqbmtfsqr.supabase.co/storage/v1/object/sign/trainingvideos/TOP 12 Best Audio Tips for YouTube Videos.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbmluZ3ZpZGVvcy9UT1AgMTIgQmVzdCBBdWRpbyBUaXBzIGZvciBZb3VUdWJlIFZpZGVvcy5tcDQiLCJpYXQiOjE2NDk4MDY4MjgsImV4cCI6MTk2NTE2NjgyOH0.-bMtI57IyuvyF9GuVqSv3fgP2R30VAXr5nm18hEJYuI"
                                loop
                                muted
                                poster={howTo}
                                controls
                                className="training-video"
                            ></video>
                            <video
                                src="https://sduxzxrctlxqqbmtfsqr.supabase.co/storage/v1/object/sign/trainingvideos/The Guide to Framing Your Video.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbmluZ3ZpZGVvcy9UaGUgR3VpZGUgdG8gRnJhbWluZyBZb3VyIFZpZGVvLm1wNCIsImlhdCI6MTY0OTgwNzA2MCwiZXhwIjoxOTY1MTY3MDYwfQ.UDUXR-oos3toWCPUUBh1FiyESgkpPFGWWFEalgYwP0E"
                                loop
                                muted
                                poster={howToFrame}
                                controls
                                className="training-video"
                            ></video>
                            <video
                                src="https://sduxzxrctlxqqbmtfsqr.supabase.co/storage/v1/object/sign/trainingvideos/v5.mp4 (720p).mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbmluZ3ZpZGVvcy92NS5tcDQgKDcyMHApLm1wNCIsImlhdCI6MTY1MTU5NzM2NSwiZXhwIjoxOTY2OTU3MzY1fQ.bieSr320KaKG9O3HusjHTTxyU12GpW3K5xZZmfe5cws"
                                loop
                                muted
                                poster={howToFilm}
                                controls
                                className="training-video"
                            ></video>
                            <video
                                // src={SocialMediaTrends}
                                src="https://res.cloudinary.com/dj6o8qccm/video/upload/v1654377819/tut-Video-1_1_sfvvqt.mp4"
                                loop
                                muted
                                poster={howToFindTrends}
                                controls
                                className="training-video"
                            ></video>
                        </div>
                    </div>
                </div>
            </div>  
        </Layout>
    )
}

export default Dashboard
