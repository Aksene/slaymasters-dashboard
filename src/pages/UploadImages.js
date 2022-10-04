import React from 'react'
import { useEffect, useState } from 'react'
import { useAuth } from '../Auth/auth'
import Layout from '../components/Layout'
import { supabase } from '../database/Database'
import "../App.css"


function UploadImages() {
    const auth = useAuth();
    const [userInfo, setUserInfo] = useState([])
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [message, setMessage] = useState("")

    useEffect(() => {
        getUserInfo()
    }, [auth])

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


    // This method stores the file in a bucket 
    // Then it saves the url in the profile table 
    const handleSubmit = async (e) => {
        e.preventDefault()
        let localImageUrl = ""
        let name = userInfo.map(info => (info.full_name))

        console.log(userInfo.map(info => (info.full_name)))

        // const url = `${supabase.supabaseUrl}/storage/v1/object/assignments/${auth.user.email}/${Date.now()}_${image.name}`;
        // const headers = supabase._getAuthHeaders();

        // const req = new XMLHttpRequest();
        // req.upload.onprogress = updateProgress;
        // req.upload.onload = transferComplete;
        // // You might want to also listen to onabort, onerror, ontimeout
        // req.open("POST", url);
        // for (const [key, value] of Object.entries(headers)) {
        // req.setRequestHeader(key, value);
        // }
        // req.send(image);

        // function updateProgress(e) {
        //     const pct = (e.loaded / e.total) * 100;
        //     console.log(`Upload progress = ${e.loaded} / ${e.total} = ${pct}`);
        // }
          
        // function transferComplete(e) {
        //     console.log("The transfer is complete.");
        //     alert("Image has been uploaded!")

        // }


        if(image) {
            const {data, error} = await supabase.storage.from(`assignments/${auth.user.email}`).upload(`${Date.now()}_${image.name}`, image)

            if(error) {
                console.log(error)
                alert(error.message)
            }
            if(data) {
                setImageUrl(data.Key)
                localImageUrl = data.Key
                console.log(data)
            }
        }

        // With upsert, if upload exist it updates it and if not it will insert a new row
        const {data, error} = await supabase.from("slaymastersUploads").insert({
            uploader_id: auth.user.id,
            email: auth.user.email,
            uploader_name: name.toString(),
            url: `https://vkmtcvqheexcvbnvlamo.supabase.co/storage/v1/object/public/${localImageUrl}`,
            embed_url: 'none',
            name: image.name
        })

        if(error){
            console.log(error)
        }
        if(data){
            setMessage("Image has been uploaded!")
            alert("Image has been uploaded!")
        }

    }
    

    return (
        
        <Layout>
        <div className="uploadImages-layout">

            <div className="uploadImages-form-grid">
                <h1>ASSIGNEMENT PHOTOS</h1>   
                {imageUrl ? <img src={`https://vkmtcvqheexcvbnvlamo.supabase.co/storage/v1/object/public/${imageUrl}`} width={200} alt=""/> : <h3 className="uploadImage-form-preview">Image has not been uploaded</h3>}
                <h4>{message && message}</h4>
                <form onSubmit={handleSubmit}>
                    <div className="form-group-top">
                        <label className="choose-image-label" htmlFor="image">Choose a image: </label>
                        <input 
                            type="file" 
                            accept={"img/*"}
                            onChange={e => setImage(e.target.files[0])}
                        />
                    </div>

                    <div className="form-group-bottom">
                        <button className="uploadImages-form-button" type={"submit"}> <h2>UPLOAD</h2> </button>
                    </div>
                </form>
            </div>
        </div>
        </Layout>
    )
}

export default UploadImages