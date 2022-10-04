import React, { useEffect, useState} from 'react';
import './AppChat.css';
import { supabase } from '../database/Database';
import { useAuth } from '../Auth/auth';
import Layout from '../components/Layout'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'




function AppChat() {
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
    checkUser();
    
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
          getMessages();
          setIsLoading(false);
          window.localStorage.setItem("uid",auth.user.id);

          // console.log(data.id)

      }
    }catch (error) {
      throw Error(error);
    }

    checkUser()
        
    console.log("Finished grabbing")
    console.log("_____________________________")
    

}

const checkUser = () => {
  const uid = window.localStorage.getItem('uid');

  console.log("Pathname: " + location.pathname);
  // Check if user is signed in and if pathname matches the sign-in page 
  // If true then will send them to the dashboard
  if(auth.user){
    console.log("Pathname: " + location.pathname);
  }else{
    console.log("Pathname: " + location.pathname);

    navigate("../sign-in", { replace: true });
  }
}

  const getMessages = async(e) => {
    const {data, error} = await supabase
        .from("messages")
        .select()

    if(error){
        console.log(error)
    }
    if(data){
        setMessages(data)
        
        if (data.length == 0){
            setIsEmpty(true)
            console.log("No messages in the table")

        }else{
            console.log("All Messages in the table")
            console.log(data)
        }
    }

  }


  const sendMessage = async(e) => {
    e.preventDefault();
    const test = "6bf87d06-1275-4229-8d6d-e1fbc56fa297"


    console.log("Message sent")

    if(formValue){
      try{

        const { data, error } = await supabase
          .from('messages')
          .insert([{ 
            uid: auth.user.id,
            text: formValue,
          },
        ])
      if(error){
          console.log(error)
      }
      if(data){
          alert("Message Has been sent!")
          setFormValue("")
          getMessages()
      }
      }catch (error){
        throw Error(error);


      }
    }else{
      alert("Please enter a message in the textbox")

    }
  }
  




  const ChatMessage = (text, uid, photoURL) => {
  // const { text } = props.message;
  console.log("text: " + text + "  uid: " + uid + "  photoURL: " + photoURL)

  const messageClass = uid === auth.user.id ? 'sent' : 'received';

  return( 
      <div className={`message ${messageClass}`}>
        {/* <img className="avatar_img" src={photoURL}/> */}
        <p>{text}</p>
      </div>
  )

  // Youtube: 4:15
}


  return (
    <Layout >
    {isLoading ? (
      <div className="chatapp_body">
        <h1>LOADING...</h1>
      </div>

      ) : (
      <div className="chatapp_body">
        <div className="chatapp_app">
          <header>
          <h1 className="chatapp_header">SlaymasterChat</h1>
        </header>
          {messages && messages.map((msg, index) => (<div key={index}>{ChatMessage(msg.text, msg.uid, msg.photoURL)}</div>))}
        </div>

        <form onSubmit={sendMessage}>
          <input type="text" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Please type your message here" />
          <button className="chatapp-submit_button" type="submit"> Send </button>
        </form> 
      </div>)}
    </Layout>
  )
}
export default AppChat;
