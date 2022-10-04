import { useAuth } from "../Auth/auth";
import { Navigate } from "react-router-dom";
import { supabase } from '../database/Database'
import { useState, useEffect } from 'react'


const AdminProtectedRoute = ({children}) => {
        const [userInfo, setUserInfo] = useState([])
        const auth = useAuth()


        useEffect(() => {

                getUserInfo()
               
        },[auth])

        const getUserInfo = async() => {
                let info = [];
        
                const {data, error} = await supabase
                    .from("slaymastersProfiles")
                    .select()
                    .match({user_id: supabase.auth.user().id})
                if(error){
                    console.log(error)
                }
                if(data){
                    // info.push(data)
                    console.log("Data info for user")
                    console.log(data)
                    setUserInfo(data)
        
                    console.log(data.id)
                }
        }

        const userId = userInfo.map(({isAdmin}) => isAdmin);
        let userRole = ""
        userId.forEach(role => userRole = role)
        // console.log(supabase.auth.user().id)
        console.log(userRole)


        // const { id } = auth.user
        // console.log(id)

        // 86749241-18c6-435e-8187-cf542943a422
        
        // return supabase.auth.user().id == "6bf87d06-1275-4229-8d6d-e1fbc56fa297" ? children : <Navigate to ={"/sign-in"}/>
        if (userRole === true) {
                console.log("If statement executed", userRole)
                return children
        }else if (userRole === false){
                console.log("Else If statement executed", userRole)
                return <Navigate to ={"/sign-in"}/>
        }

}

export default AdminProtectedRoute;
