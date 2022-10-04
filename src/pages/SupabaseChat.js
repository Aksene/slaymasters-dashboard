import React, { useEffect, useState, useRef} from 'react';
import './AppChat.css';
import { supabase } from '../database/Database';
import { useAuth } from '../Auth/auth';
import Layout from '../components/Layout'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'


function SupabaseChat() {
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
    const messageRef = useRef(null)


  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
  });
    // const fetch = getUserInfo();
    getMessages();

    //   checkUser();
    

    // setUserCheck(true)

  },[auth.user])

    const getMessages = async(e) => {
        const {data, error} = await supabase
            .from('slaymastersMessages')
            .select('*, profile: slaymastersProfiles(email)')
    
        if(error){
            console.log(error)
        }
        if(data){
            setMessages(data)
            // Makes the screen scroll up when theres a new message
            // Linked with the div being returned in the screen
            if(messageRef?.current) {
                messageRef.current.scrollTop = messageRef.current.scrollHeight
            }
            
            if (data.length == 0){
                setIsEmpty(true)
                console.log("No messages in the table")
    
            }else{
                console.log("All Messages in the table")
                console.log(data)
            }
        }

        console.log({ messages})

        // Listens to any update in the messages database
        supabase.from('slaymastersMessages').on('INSERT', (payload) => {
            console.log(payload)
            // Spreads the new message into the array
            // OLD WAY
            // setMessages((messages) => [...messages, payload.new])
            // NEW WAY
            // setMessages([...messages, payload.new])
            getMessages()
        }).subscribe()
    
    }

    const handleCreateRoom = async () => {
        // Creates room 
        await supabase.from('rooms').insert({}, {returning: 'minimal'})

        // Grabbing the latest created room
        const { data } = await supabase
        .from('rooms')
        .select('*')
        .order('created_at', {ascending: false})
        .limit(1)
        .single()

        console.log({data})


    }

    const sendMessage = async(e) => {
        e.preventDefault();
        const test = "6bf87d06-1275-4229-8d6d-e1fbc56fa297"
    
    
        console.log("Message sent")
    
        if(formValue){
          try{
    
            const { data, error } = await supabase
              .from('slaymastersMessages')
              .insert([{ 
                text: formValue,
              },
            ])
          if(error){
              console.log(error)
          }
          if(data){
              alert("Message Has been sent!")
              setFormValue("")
            //   getMessages()
          }
          }catch (error){
            throw Error(error);
    
    
          }
        }else{
          alert("Please enter a message in the textbox")
    
        }
      }



      const ChatMessage = (text, email, uid, photoURL) => {
        // const { text } = props.message;
        console.log("text: " + text + "  uid: " + uid + "  photoURL: " + photoURL)
      
        const messageClass = uid === auth.user.id ? 'sent' : 'received';
      
        return( 
            <div className={`message ${messageClass}`} >
              {/* <img className="avatar_img" src={photoURL}/> */}
                <div className="message-container" >
                    <div className={`username-container ${messageClass}`}>
                        <h6>{email}</h6>
                    </div>
                    <div className="text-container">
                        <p>{text}</p>
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div className="chatapp_body">
        <header>
            <h1 className="chatapp_header">SlaymasterChat</h1> 
            <button className="chatapp_header-btn" onClick={handleCreateRoom}> New Room</button>
            
         </header>
        <div className="chatapp_app" ref={messageRef}>
            <ul className="chatapp_message-list" >
                {messages && messages.map((msg, index) => (
                    <li key={index}>
                        {ChatMessage(msg.text, msg.profile.email, msg.profile_id, msg.photoURL)}
                    </li>
                ))}

            </ul>

        </div>

        <form className="chatapp_app-form" onSubmit={sendMessage}>
          <input type="text" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Please type your message here" />
          <button className="chatapp-submit_button" type="submit"> Send </button>
        </form> 
      </div>
    )
}

export default SupabaseChat
