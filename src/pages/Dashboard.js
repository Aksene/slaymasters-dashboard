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

const Dashboard = () => {
    const auth = useAuth();
    const [userInfo, setUserInfo] = useState([])
    const [userAssignments, setUserAssignments] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)

    useEffect(() => {
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

    Boolean.prototype.myChecker = function() {
        if (this.valueOf() === true) {
          return "checked";
        } else {
          return  "";
        }
    };


    // const renderUserName = () => {
    //     return userInfo.map(info => (<h1> Welcome {info.first_name}</h1>))
    // }

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
                                ALL UPDATES WILL BE SHARED VIA VIDEO AND VIA EMAIL AS THINGS ARE HAPPENING. WE VALUE YOUR FEEDBACK !
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
                            {console.log("Assignments: " + userAssignments.length)}
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
                                        </tr>
                                    </thead>

                                    {userAssignments.map((assignment, index) => (
                                        <tbody key={index} className="assignment-table-row">
                                        <tr key={index}>
                                            <td><h4>{assignment.video_assignment}</h4></td>
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
                                    <div className="tools-grid-item"><Link to="//VIMEO.COM" target='_blank'><button >UPLOAD TO VIMEO</button></Link></div>
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
                                    <div className="tools-grid-item"><Link to="//www.google.com" target='_blank'><button >GET HELP</button></Link></div>
                                    <div className="tools-grid-item"><Link to="//www.google.com" target='_blank'><button >CONSULTATION PROMPTS</button></Link></div>
                                    <div className="tools-grid-item"><Link to="//slaymastercreators.tawk.help/" target='_blank'><button >VIDEO GUIDELINES</button></Link></div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="dashboard-training">
                        <h1>Training Videos</h1>
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
                        </div>
                    </div>


                </div>
            </div>   
        </Layout>
    )
}

export default Dashboard
