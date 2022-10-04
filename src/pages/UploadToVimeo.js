import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Auth/auth'
import Layout from '../components/Layout'
import { supabase } from '../database/Database'
import "../App.css"
import axios from 'axios';
import * as tus from 'tus-js-client'
import ProgressBar from '../components/ProgressBar'



function UploadToVimeo() {
    const auth = useAuth();
    const [userInfo, setUserInfo] = useState([])
    const [image, setImage] = useState(null)
    const [videoName, setVideoName] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(0)
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        getUserInfo()
    },[auth])

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


    const handleChange = async eventObject => {
        eventObject.preventDefault()
        let localImageUrl = ""
        let name = userInfo.map(info => (info.full_name))
        

        console.log(userInfo.map(info => (info.full_name)))

        // Get the selected file from the input element
        const file = image;
        const fileName = `${auth.user.email} - ${file.name}`;
        const fileSize = file.size.toString();
        console.log(file, fileName, fileSize);

        const response = await axios({
        method: 'post',
        url: `https://api.vimeo.com/me/videos`,
        headers: headerPost,
        data: {
            upload: {
                approach: 'tus',
                size: fileSize
            },
            name: fileName,
            description: `Uploaded by ${auth.user.email}`,
            privacy: { 
                view: "nobody" 
            },
            folder_uri: '/projects/11909145'
        }
        });

        console.log(response);

        // Create a new tus upload
        const upload = await new tus.Upload(file, {
            endPoint: `https://api.vimeo.com/me/videos`,
            uploadUrl: response.data.upload.upload_link,
            retryDelays: [0, 3000, 5000, 10000, 20000],
            metadata: {
                filename: fileName,
                filetype: file.type
            },
            headers: {},
            onError: function(error) {
                console.log('Failed because: ' + error);
            },
            onProgress: function(bytesUploaded, bytesTotal) {
                let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
                console.log(bytesUploaded, bytesTotal, percentage + '%');
                setLoading(percentage)
                setLoading(oldPerc => {
                    const newPerc = percentage;
                    setLoading(newPerc)
                    console.log("testing loading nested: " + loading)
                    console.log("testing loading nested: " + newPerc)
                    return newPerc

                })
                console.log("testing loading: " + loading)
            },
            onSuccess: function() {
                console.log('Download %s from %s', upload.file.name, upload.url);
                console.log('View the video here %s', response.data.link);
                console.log('Heres the while upload object', upload);
                console.log('Heres the  embed link', response.data.embed.html);
                console.log('Heres the  embed link', response.data.embed.html);
                console.log('Video URI:', response.data.uri);
                console.log('User URI:', response.data.user.uri);
                const vimeoUserId = response.data.user.uri.split("users/")[1];

                // setVideoUrl(upload.url);
                setVideoUrl(response.data.link);
                setVideoName(response.data.name)
                setIsSuccess(true)
                alert("Video has been uploaded!")
                
            }
        });

        const vimeoUserId = response.data.user.uri.split("users/");

        // Start the upload
        upload.start();


        // With upsert, if upload exist it updates it and if not it will insert a new row
        const {data, error} = await supabase.from("slaymastersUploads").insert({
            uploader_id: auth.user.id,
            email: auth.user.email,
            uploader_name: name.toString(),
            url: response.data.link,
            embed_url: response.data.player_embed_url,
            name: file.name,
        })

        if(error){
            console.log(error)
        }
        if(data){
            console.log(data)
        }

    };

        const headerPost = {
            Accept: 'application/vnd.vimeo.*+json;version=3.4',
            Authorization: process.env.REACT_APP_VIMEO_TOKEN,
            'Content-Type': 'application/json'
          };
    return (
        
        <Layout>
        <div className="uploadImages-layout">
            <div className="uploadImages-form-grid">
                <h1>ASSIGNEMENT VIDEOS</h1>   
                {videoUrl ? 
                (
                    isSuccess ?
                        <div>
                            {/* <iframe 
                                src={`${videoEmbed}`} 
                                width="400" 
                                height="300" 
                                frameborder="0" 
                                allow="autoplay; fullscreen; picture-in-picture" 
                                allowfullscreen 
                                title={`${videoName}`}
                            >

                            </iframe> */}
                            <a className="uploadImage-form-link" href={`${videoUrl}`} target='_blank'>
                                <h3>Watch the uploaded video</h3>
                            </a>
                            <h4>Note: Please wait a few more minutes for Vimeo to finish transcribing</h4>
                            <h4>Progress: </h4>
                            <ProgressBar bgcolor="#a80379" completed={loading} />
                        </div>

                        
                    :
                        <div>
                            <h4> Upload Failed, please try again</h4>
                            <ProgressBar bgcolor="#a80379" completed={loading} />  
                        </div>  
                )
                : 
                    <div>
                        <h3 className="uploadImage-form-preview">Video has not been uploaded</h3>
                        <h4>Progress: </h4>
                        <ProgressBar bgcolor="#a80379" completed={loading} />
                    </div>}

                <form className="uploadImages-form" onSubmit={handleChange}>
                    <div className="uploadImages-form-group-top">
                        <label className="choose-image-label" htmlFor="image"><h2>Choose a image:</h2> </label>
                        <input 
                            className="choose-image-input"
                            type="file" 
                            accept={"img/*"}
                            onChange={e => setImage(e.target.files[0])}
                        />
                    </div>
                    <div className="uploadImages-form-group-bottom">
                        <button className="uploadImages-form-button" type={"submit"}> 
                            <h2>UPLOAD</h2> 
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </Layout>
    )
}

export default UploadToVimeo