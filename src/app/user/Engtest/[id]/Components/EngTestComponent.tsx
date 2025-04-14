import { ReactElement, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ETWP } from "../../../../../../Models/EngTestWindowModels/ETWProps";
import { Question } from "./QuestionsModels/question";
import useQuizHubR from "./quizhubR";
import { LASQ } from "./QuestionsModels/lASQ";

const EngTestWindow = (props: ETWP) => {
  const [windowContent, setWindow] = useState<ReactElement>();
  const [CurrentQ, SetQ] = useState<Question | null>(null);
  const { startConnection, submitAnswer } = useQuizHubR(props.hubUrl, SetQ);

  useEffect(() => {
    if (CurrentQ === null)
      setWindow(
        <div>
          <p>Press the button below to start your test</p>
          <Button onClick={() => startConnection()}></Button>
        </div>
      );
    else
      switch (CurrentQ.qPOId) {
        case 1:
          setWindow(
            <div>
              <input 
              type="text"
              onChange ={HandleInputChange}
              />
              <Button onClick={() => submitAnswer()}></Button>
            </div>
          );
          break;
        case 2:
          setWindow(
            <div>
              <input 
              type="text"
              onChange ={HandleInputChange}
              />
              <Button onClick={() => submitAnswer()}></Button>
            </div>
          );
          break;
        case 3:
          setWindow(
            <div>
              <input 
              type="text"
              onChange ={HandleInputChange}
              />
              <Button onClick={() => submitAnswer()}></Button>
            </div>
          );
          break;
        case 4:
          setWindow(
            <div>
              <input 
              type="text"
              onChange ={HandleInputChange}
              />
              <Button onClick={() => submitAnswer()}></Button>
            </div>
          );
          break;
        case 5:
          setWindow(
            <div>
              <input 
              type="text"
              onChange ={HandleInputChange}
              />
              <Button onClick={() => submitAnswer()}></Button>
            </div>
          );
          break;
        case 6:
          setWindow(
            <div>
              <input 
              type="text"
              onChange ={HandleInputChange}
              />
              <Button onClick={() => submitAnswer()}></Button>
            </div>
          );
          break;
        case 7:
          setWindow(
            <div>
              <input 
              type="text"
              onChange ={HandleInputChange}
              />
              <Button onClick={() => submitAnswer()}></Button>
            </div>
          );
          break;
        case 8:
          setWindow(
            <div>
              <input 
              type="text"
              onChange ={HandleInputChange}
              />
              <Button onClick={() => submitAnswer()}></Button>
            </div>
          );
          break;
        case 9:
          setWindow(
            <div>
              <input 
              type="text"
              onChange ={HandleInputChange}
              />
              <Button onClick={() => submitAnswer()}></Button>
            </div>
          );
          break;
        case 10:
          setWindow(
            <div>
              <input 
              type="text"
              onChange ={HandleInputChange}
              />
              <Button onClick={() => submitAnswer()}></Button>
            </div>
          );
          break;
        case 11:
          setWindow(
            <div>
              <input 
              type="text"
              onChange ={HandleInputChange}
              />
              <Button onClick={() => submitAnswer()}></Button>
            </div>
          );
          break;
        case 12:
          setWindow(
            <div>
              <input 
              type="text"
              onChange ={HandleInputChange}
              />
              <Button onClick={() => submitAnswer()}></Button>
            </div>
          );
          break;
        case 13:
          setWindow(
            <div>
              <input 
              type="text"
              onChange ={HandleInputChange}
              />
              <Button onClick={() => submitAnswer()}></Button>
            </div>
          );
          break;
      }
  }, [CurrentQ, submitAnswer, startConnection]);

  const HandleInputChange = (event) =>{
    const {name, value} = event.target

    switch (name) {
        case 1:

          break;
        case 2:
          
          break;
        case 3:
          
          break;
        case 4:
          
          break;
        case 5:
          
          break;
        case 6:
          
          break;
        case 7:
          
          break;
        case 8:
          
          break;
        case 9:
          
          break;
        case 10:
          
          break;
        case 11:
          
          break;
        case 12:
          
          break;
        case 13:
          
          break;
      }
  }

  const handleSubmit = (event) =>{
    event.preventDefault()
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            {windowContent}
        </form>
    </div>
  );
};

export default EngTestWindow;
