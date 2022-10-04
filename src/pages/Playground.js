import React from 'react'
import Layout from '../components/Layout'
import { useEffect, useState, useRef  } from 'react'
import emailjs from "emailjs-com"
import { Link } from 'react-router-dom'
import { useAuth } from '../Auth/auth'
import { supabase } from '../database/Database'
import "../App.css"

function Playground() {
    const auth = useAuth();
    const [userInfo, setUserInfo] = useState([])
    const form = useRef();


    useEffect(() => {

        getUserInfo()
       
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

    const sendEmail = (e) => {
        e.preventDefault();
        console.log("Email sent!",form.current)
        // Alternative way using event target
        // emailjs.sendForm('gmail', 'template_niuvg3m', e.target, process.env.REACT_APP_EMAILJS_KEY)

        // emailjs.sendForm('gmail', 'template_niuvg3m', form.current, process.env.REACT_APP_EMAILJS_KEY)
        //     .then((result) => {
        //         console.log(result.text);
        //     }, (error) => {
        //         console.log(error.text);
        //     });
        form.current.reset()
        console.log("Form cleared!",form.current)


    };

    return (
        <Layout>
            <div className="container">
                <h1>PROTECTED PAGE ONLY FOR ADMIN</h1>
                <form ref={form} onSubmit={sendEmail}>
                    <label>Name</label>
                    <input placeholder="text" type="text" name="name" />
                    <label>Email</label>
                    <input placeholder="email" type="email" name="email" />
                    <label>Subject</label>
                    <input placeholder="subject" type="subject" name="subject" />
                    <label>Message</label>
                    <textarea placeholder="Please enter a message" id="" cols="30" rows="8" name="message" />
                    <input type="submit" value="Send" />
                </form>
            </div>
        </Layout>
    )
}

export default Playground
