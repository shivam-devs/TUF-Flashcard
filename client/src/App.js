import React, { useState, useEffect } from 'react';
import FlashcardList from './FlashcardList';
import './App.css'
import axios from 'axios'
import { IoArrowForward,IoArrowBack } from "react-icons/io5";
import Modal from './Modal';
function App() {
  const [flashcards, setFlashcards] = useState([])
  const [idx, setIdx] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    axios.get('http://localhost:8080/api/questions').then(({data})=>{
      setFlashcards(data.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)),
          answer
        ]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: answer,
          options: options.sort(() => Math.random() - .5),
          difficulty:questionItem.difficulty
        }
      }))
    })
  }, [isOpen])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML= str
    return textArea.value
  }
  const handleClick = (e) =>{
    if (e.target.id === 'next'){
      setIdx(idx => ((idx+1) % flashcards.length))
    }else{
      if(idx){
        setIdx((idx)=>idx-1)
      }
    }
  }
  return (
    <>
      <div className="header">
      <div className="form-group">
          <img src='/logo.jpeg' alt='logo' className='logo'/>
        </div>
      <div className="form-group">
          <button className="btn" onClick={()=>setIsOpen(!isOpen)}>Admin</button>
        </div>  
      </div>
      <div className="container" style={{height:'10vh',fontFamily:'sans serif',fontWeight:'400',fontSize:'2rem'}}>Flip the card for answer.</div>
      {flashcards.length > 0 && <div className="container">
        <IoArrowBack id='prev'className='icon' onClick={handleClick}/>
         <FlashcardList flashcards={flashcards} idx={idx} />
        <IoArrowForward id='next' className='icon' onClick={handleClick}/>
      </div>}
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </>
  );
}

export default App;
