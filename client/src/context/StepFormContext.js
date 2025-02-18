import { createContext, useEffect, useState } from "react";
import { questions } from "../assets/staticData";
import Swal from "sweetalert2";

export const StepFormContext = createContext();

export const StepFormContextProvider = ({ children }) => {
  const [name, setName] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputData, setInputData] = useState({});
  const [staticQuestions, setStaticQuestions] = useState([...questions]);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleScoreCalculation = async () => {
    const correctAnswerCount = staticQuestions.filter(
      (q) => q.checkCorrect
    ).length;

    const scoreData = {
      name: name,
      score: correctAnswerCount,
    };

    try {
      const response = await fetch("http://localhost:5000/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scoreData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit score");
      }

      const data = await response.json();
      console.log("Score submitted successfully:", data);
      setScoreSubmitted(true);
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  const handleReset = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reset it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Reset Successful!",
          text: "Your answer has been reset.",
          icon: "success",
        });
        setStaticQuestions(questions);
        setCurrentStep(1);
      }
    });
  };

  return (
    <StepFormContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        inputData,
        setInputData,
        nextStep,
        setName,
        name,
        prevStep,
        staticQuestions,
        setStaticQuestions,
        handleScoreCalculation,
        handleReset,
        scoreSubmitted,
      }}
    >
      {children}
    </StepFormContext.Provider>
  );
};
