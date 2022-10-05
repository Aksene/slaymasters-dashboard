import React from 'react'
import { useEffect, useState } from 'react'
import { useAuth } from '../Auth/auth'
import Layout from '../components/Layout'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import "../App.css"



function SignIn() {
    const auth = useAuth()
    let navigate = useNavigate();
    let location = useLocation();
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        checkUser()
    })

    const checkUser = () => {
        console.log("Pathname: " + location.pathname);
        // Check if user is signed in and if pathname matches the sign-in page 
        // If true then will send them to the dashboard
        if(auth.user && location.pathname === "/sign-in"){
            console.log("Pathname: " + location.pathname);

            navigate("../dashboard", { replace: true });
        }
    }

    const handleSignIn = async (e) => {
        e.preventDefault()

       const signIn = await auth.Login(email)
       

       if (signIn.error) {
           if (signIn.error = "Signups not allowed for this instance"){
                setMessage("Your email is not valid, please contact customer support")
                alert("Your email is not valid, please contact customer support")
           }else{
                setMessage(signIn.error.message)
                alert(signIn.error.message)
           }
       } else {
           setMessage("Magic link has been sent")
           alert("Magic link has been sent")
       }
       setEmail("")



    }
    

    return (
        <Layout>
        <div className="signin-layout">
            {message && message}
            <div className="signin-form-container">
                <h1 className="signin-header">SIGN-IN</h1>

                <form  onSubmit={handleSignIn}>
                    Email: <input className="signin-email_input" type="email" value={email} placeholder="Please enter email here" onChange={e => setEmail(e.target.value)} />
                    <button className="signin-form-button" type="submit"><h3>SUBMIT</h3></button>
                </form>
            </div>
        </div>
        </Layout>
    )
}

export default SignIn