import React, {useState} from 'react'
import './Popup.css'

function Popup(props) {
    const [inputList, setInputList] = useState([{
        fullName: "",
        title: "Slaymaster",
        email: "",
        videoAssignement: "",
        link: "",
        dueDate: "",
    }])

    const handleInputChange=(e, index) => {
        const {name, value} = e.target
        const list = [...inputList];
        list[index][name] = value;

        props.userInfo.map((info) => {
            if (info.full_name === value) {
                list[index]['email'] = info.email
                console.log("Event loop found", list)
                
            }else if (list[index]['fullName'] === ''){
                list[index]['email'] = ""
                console.log("Event loop empty", list)

            }
        })
        setInputList(list)
    }

    const handleAddMoreClick = (e) => {
        e.preventDefault();

        alert("New assignment input added")

        setInputList([...inputList, {
            fullName: "",
            title: "Slaymaster",
            email: "",
            videoAssignement: "",
            link: "",
            dueDate: "",
        }])
    }

    const handleRemoveClick = ( index) => {
        console.log("event Index: ",index)
        const list = [...inputList];
        list.splice(index,1);

        setInputList(list)
    }

    const handleInputListFormSubmit = () => {
        // e.preventDefault();
        const list = [...inputList];

        console.log("event: list before adding", list)

        list.map((event, index, item) => {
            props.handleAddSubmit(event, index, item[index])
        })
        // handleInputListFormReset(e) 

    }

    const handleInputListFormReset = (e) => {
        e.preventDefault();

        const newAssignement = {
            fullName: "",
            title: "Slaymaster",
            email: "",
            videoAssignement: "",
            link: "",
            dueDate: "",
        }
        const newList = [newAssignement]
        setInputList(newList)
    }

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={(e) => 
                    {
                        props.setTrigger(false)
                        handleInputListFormReset(e) 
                    }
                }> X</button>
                <div className="form-container">
                    {/* {props.userInfo.map((info, index) => (
                        <p>{info.full_name}</p>
                    ))} */}
                    <h2 className="form-header">Add New Assignments</h2>
                    
                            <form  onSubmit={handleInputListFormSubmit}>
                            {
                                inputList.map((input, index) => {
                                    return(
                                        <div className="form-inputList-item">
                                            <div >
                                                {
                                                    console.log("event: List length", inputList.length)
                                                }
                                                {
                                                    console.log("event: InputList ", inputList)
                                                }
                                                <p1>Assignment #{index+1}</p1>
                                                <div className="form-add_remove_container">
                                                    {   
                                                        
                                                        inputList.length-1===index  &&
                                                        <button className="popup-add_more_btn" onClick={(event) => handleAddMoreClick(event)}> 
                                                            Add 
                                                        </button>
                                                    }
                                                    {
                                                        inputList.length!==1 &&
                                                        <button className="popup-remove_btn" onClick={() => handleRemoveClick(index)}> 
                                                            Remove 
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                            <div className="form-name_email_input">
                                                <select value={input.fullName} className="form-name_select" type="text" onChange={e => handleInputChange(e,index)} required="required" name="fullName" id="nameSelector">
                                                    <option value="" > ---- </option>
                                                    {props.userInfo.map((info, index) => (
                                                        <option value={info.full_name} >{info.full_name}</option>
                                                    ))}
                                                </select>
                                                
                                                <input 
                                                    type="email" 
                                                    name="email" 
                                                    required="required" 
                                                    placeholder="Email"
                                                    readonly="readonly"
                                                    value={input.email}
                                                    onChange={e => handleInputChange(e,index)}
                                                />
                                            </div>

                                            <div className="form-select_inputs">
                                                <select value={input.title} type="text" onChange={e => handleInputChange(e,index)} name="title" id="">
                                                    <option value="Slaymaster">Slaymaster</option>
                                                    <option value="SlaymasterPro">SlaymasterPro</option>
                                                </select>

                                                <input 
                                                    type="text" 
                                                    name="videoAssignement" 
                                                    required="required" 
                                                    placeholder="Enter a assignment title..."
                                                    value={input.videoAssignement}
                                                    onChange={e => handleInputChange(e,index)}
                                                />
                                                <input 
                                                    type="url" 
                                                    name="link" 
                                                    // required="required" 
                                                    placeholder="Enter a assignment description link..."
                                                    value={input.link}
                                                    onChange={e => handleInputChange(e,index)}
                                                />
                                                <input 
                                                    type="datetime-local" 
                                                    name="dueDate" 
                                                    required="required" 
                                                    placeholder="Select a due date..."
                                                    value={input.dueDate}
                                                    onChange={e => handleInputChange(e,index)}
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            <div className="assign-assignments-container">
                                {
                                    inputList.length === 1 
                                    ? <button className="assign-assignments-btn" type="submit"> Assign Assignment </button>
                                    : <button className="assign-assignments-btn" type="submit"> Assign Assignment(s) </button>
                                    
                                }
                            </div>
                        </form>      
                </div>
            </div>
        </div>
    ) : "";
}



export default Popup
