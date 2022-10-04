import React, { useEffect, useState} from 'react';
// import './AppChat.css';
import { supabase } from '../database/Database';
import { useAuth } from '../Auth/auth';
import Layout from '../components/Layout'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'




function AppChatList() {
  const auth = useAuth();
  let navigate = useNavigate();
  let location = useLocation();
  const [isEmpty, setIsEmpty] = useState(false)
  const [messages, setMessages] = useState([])
  const [userInfo, setUserInfo] = useState([])
  const [formValue, setFormValue] = useState();
  const [userCheck, setUserCheck] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [senderInfo, setSenderInfo] = useState([])




  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
  });
    const fetch = getUserInfo();
    const fetch2 = getAllUsers();

      // checkUser();
    

    setUserCheck(true)

  },[auth.user])

  const getUserInfo = async(e) => {
    let info = [];
    setIsLoading(true);
    const uid = window.localStorage.getItem('uid');

    
    const test = "6bf87d06-1275-4229-8d6d-e1fbc56fa297"
    console.log("__________________________")
    console.log("Testing the get user method")
    console.log("_____________________________")

    try{
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
          setIsLoading(false);
          // window.localStorage.setItem("uid",auth.user.id);

          // console.log(data.id)

      }
    }catch (error) {
      throw Error(error);
    }

        
    console.log("Finished grabbing")
    console.log("_____________________________")
    

}



const getAllUsers = async(e) => {
  let info = [];
  setIsLoading(true);
  // const uid = window.localStorage.getItem('uid');

  
  const test = "6bf87d06-1275-4229-8d6d-e1fbc56fa297"
  console.log("__________________________")
  console.log("Get all users from table")
  console.log("_____________________________")

  try{
    const {data, error} = await supabase
        .from("slaymastersProfiles")
        .select()
    if(error){
        console.log(error)

    }
    if(data){
        // info.push(data)
        // console.log("Data info for user")
        // console.log(info)
        setSenderInfo(data)
        console.log("Data info for user")
        console.log(data)
        setIsLoading(false);
        // window.localStorage.setItem("uid",auth.user.id);

        // console.log(data.id)

    }
  }catch (error) {
    throw Error(error);
  }

      
  console.log("Finished grabbing")
  console.log("_____________________________")
  

}
  

const getNamesById = (id) => {
  return senderInfo.filter(sent => sent.user_id === id);

}


  const currentMessages = (email, user_id, title, full_name) => {
  // const { text } = props.message;
  console.log("email: " + email + "  user_id: " + user_id + "  title: " + title+ "  full_name: " + full_name)

  // const messageClass = uid === auth.user.id ? 'sent' : 'received';

  return( 
      <div >
        {/* <img className="avatar_img" src={photoURL}/> */}
        <p>{getNamesById(user_id)}</p>
      </div>
  )

  // Youtube: 4:15
}


  return (
    <Layout >
      <div className="chatapp_body">
        <div className="chatapp_app">
          <header>
          <h1 className="chatapp_header">SlaymasterChat</h1>
        </header>
          {senderInfo && senderInfo.map((profile, index) => (<div key={index}>{currentMessages(profile.email, profile.user_id, profile.title, profile.full_name )}</div>))}
        </div>
      </div>
    </Layout>
  )
}
export default AppChatList;
