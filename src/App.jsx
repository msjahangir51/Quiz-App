import React, { useRef, useState } from 'react'
import QuizData from "../public/Quiz.json";
import { Link } from 'react-router-dom';

import img from "./assets/Components/Submited.gif";

function App() {
  const [index,setIndex] = useState(0);
  const [score,setscore]= useState(0);
  const [wrong,Setwrong] = useState(0)
  const [Lock,SetLock] = useState(false);
  const [quizIndex,SetQuizIndex] = useState(1);
  const [submit,Setsubmit] = useState(false);
  const Option1 = useRef(null)
  const Option2 = useRef(null)
  const Option3 = useRef(null)
  const Option4 = useRef(null)
  const CorectQuiz = QuizData[index];
  const {id,Question,option1,option2,option3,option4,ans} =CorectQuiz;
  const options = [Option1,Option2,Option3,Option4];
  const resetBtn =()=>{
    Setsubmit(false)
    SetLock(false)
    setscore(0)
    setIndex(0)
    Setwrong(0)
    SetQuizIndex(1)
  }
  const ansHandle = (e,ansValue)=>{
    if(Lock === false){
      SetLock(true)
      if(ansValue === ans){
        e.target.classList.add("active");
        setscore(score +1)
      }else{
        Setwrong(wrong+1)
        options[ans-1].current.classList.add("active")
        e.target.classList.add("wrong")
      }

    }
  }


  const NextBTn =()=>{
    if(Lock === true){
      setIndex(index+1)
      SetQuizIndex(quizIndex +1)
      SetLock(false)

      // index >= 29 ? setIndex(0) : ""

      options.map(option =>{
        option.current.classList.remove("active")
        option.current.classList.remove("wrong")
      })
    }
  }

  
   
  return (
    <div className='quiz-conteinar'>
      <div className="conteinar">
        {
          submit ? 
          // submit section 

          <div className="SubmitedSection">
            <>
        <div className="submited-img">
           <img draggable="false" src={img}/>
        </div>

        <h1>your answer submited</h1>
        <h3>Answer Wrong {wrong}</h3>
        <h3>Completed Answer {score}</h3>
        <h3>All Task {index +1}</h3>
        <button onClick={resetBtn}>Reset</button>
    </>
          </div>
          // <Submit Score={score} Index={index} Wrong={wrong}/>
          // end of submit section 
          :
          <>
          
          <div className="quiz-navbar">
          <h1 className='quiz-heading'>Quiz <span>App</span></h1>
          <div>
            <span>30</span>
            <span>{quizIndex}</span>
          </div>
        </div>

        <div className="quiz_body">
          <h1>{index+1}. {Question}</h1>
          <ul className="QUIZ-liST">
              <li ref={Option1} onClick={(e)=> ansHandle(e,1)}>{option1}</li>
              <li ref={Option2} onClick={(e)=> ansHandle(e,2)}>{option2}</li>
              <li ref={Option3} onClick={(e)=> ansHandle(e,3)}>{option3}</li>
              <li ref={Option4} onClick={(e)=> ansHandle(e,4)}>{option4}</li>
          </ul>
          
        </div>

        <div className="footer">
          {
            index >= 29 ? <button onClick={()=>Lock === true ? Setsubmit(true) : ""}>Submit</button> : <button onClick={NextBTn}>Next</button>
          }
          
        </div>
            </>
        }
      </div>
    </div>
  )
}

export default App