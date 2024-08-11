import React, { useState } from "react";
import './Modal.css'
import axios from "axios";
import { RiCloseLine } from "react-icons/ri";
const Modal = ({ setIsOpen }) => {
  const [payload,setPayload] = useState({
    "type": "",
    "difficulty": "",
    "category": "",
    "question": "",
    "correct_answer": "",
    "incorrect_answers": Array(3)
  })

  const handleClick = () =>{
    if(payload.category===''||payload.question===''||payload.category===''||payload.correct_answer===''||payload.type===''){
        alert('Plaese add all fields !')
        return
    }
    setIsOpen(false)
    axios.post("https://backend-96qf.onrender.com/api/question", payload).then((response) => {
        if(response.status===200){
            alert('Question Added !')
        }else{
            alert('Something Went Wrong !')
        }
      });
  }  
  const handleChange = (e) => {
      if(e.target.name === "incorrect_answers"){
          setPayload((payload)=>{
              payload.incorrect_answers[e.target.id] = e.target.value
              return payload
            })
        }else{
            const value = e.target.value;
    setPayload({
      ...payload,
      [e.target.name]: value
    });
        }
  };

  return (
    <>
      <div className={'darkBG'} onClick={() => setIsOpen(false)} />
      <div className={'centered'}>
        <div className={'modal'}>
          <div className={'modalHeader'}>
            <h5 className={'heading'}>Add Question</h5>
          </div>
          <button className={'closeBtn'} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={'modalContent'}>
            <div>
          <label htmlFor="">Question : </label><input type="text" className="input" name="question" value={payload.question} onChange={handleChange}/>
          </div>
          <div>
          <label htmlFor="">Type : </label><label htmlFor="">Boolean</label><input type="radio" name="type" value={'boolean'} onChange={handleChange}/><label htmlFor=""> Multiple</label><input type="radio" name="type" value={'multiple'} onChange={handleChange}/>
          </div>
          <div>
          <label htmlFor="">Difficulty : </label><label htmlFor=""> Easy</label><input type="radio" value={'easy'} onChange={handleChange} name="difficulty"/><label htmlFor=""> Medium</label><input type="radio" value={'medium'} onChange={handleChange} name="difficulty"/><label htmlFor=""> Hard</label><input type="radio" value={'hard'} onChange={handleChange} name="difficulty"/>
          </div>
          <div>
          <label htmlFor="">category : </label><input type="text" className="input" value={payload.category} name="category" onChange={handleChange}/>
          </div>
          <div>
          <label htmlFor="">Correct_answer : </label><input type="text" className="input" value={payload.correct_answer} name="correct_answer" onChange={handleChange}/>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'0.3rem'}}>
          <label htmlFor="">Incorrect_answers : </label><input type="text" className="input" id="0" name="incorrect_answers" onChange={handleChange} value={payload.incorrect_answers[0]}/><input type="text" className="input" id="1" name="incorrect_answers" onChange={handleChange} value={payload.incorrect_answers[1]}/><input type="text" className="input" id="2" name="incorrect_answers" onChange={handleChange} value={payload.incorrect_answers[2]}/>
          </div>
          </div>
          <div className={'modalActions'}>
            <div className={'actionsContainer'}>
              <button className={'deleteBtn'} onClick={handleClick}>
                Save
              </button>
              <button
                className={'cancelBtn'}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;