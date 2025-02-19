import logo from "./logo.svg";
import { Button, Container } from "react-bootstrap";
import "./App.scss";
import Name from "./components/Name";
import { useContext, useState, useEffect } from "react";

import { StepFormContext } from "./context/StepFormContext";
import QuestionWrapper from "./components/QuestionItems/QuestionWrapper";
import HighScores from "./components/HighScores/HighScores";

function App() {
  const { currentStep, staticQuestions, name, scoreSubmitted } =
    useContext(StepFormContext);

  const questionSteps = staticQuestions.map((item) => ({
    id: item.id,
    component: <QuestionWrapper />,
  }));

  const steps = [{ id: 0, component: <Name /> }, ...questionSteps];

  return (
    <div className="App">
      <Container className="appWrapper">
        <div>
          {scoreSubmitted ? (
            <HighScores />
          ) : (
            <>
              {steps.map((item, index) =>
                currentStep === item.id ? item.component : <></>
              )}
            </>
          )}
        </div>

        <p className="text-center">Copyright: www.mathinenglish.com</p>
      </Container>
    </div>
  );
}

export default App;
