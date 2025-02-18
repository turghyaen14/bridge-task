import React, { useContext, useEffect, useState } from "react";
import { LongButtons, SmallButtons } from "../FormItems/CustomButton";
import { Form, Row, Col } from "react-bootstrap";
import { StepFormContext } from "../../context/StepFormContext";

import styles from "./QuestionWrapper.module.scss";

const QuestionWrapper = () => {
  const [selectedValue, setSelectedValue] = useState({});
  const {
    handleReset,
    currentStep,
    nextStep,
    prevStep,
    staticQuestions,
    setStaticQuestions,
    handleScoreCalculation,
  } = useContext(StepFormContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, value } = selectedValue;
    if (!id) return;
    const updateUserInput = () => {
      setStaticQuestions((prevQuestions) =>
        prevQuestions.map((questions) =>
          questions.id === id
            ? {
                ...questions,
                userInput: value,
                checkCorrect: value === questions.correctValue,
              }
            : questions
        )
      );
    };
    updateUserInput();
    nextStep();
  };

  return (
    <>
      {staticQuestions.map(
        (item, index) =>
          currentStep === item.id && (
            <>
              <div className={styles.questionCountWrapper}>
                <span className={styles.questionCountBold}>
                  Question {item.id}
                </span>
                <span className={`${styles.questionCountBold} muted px-1`}>
                  OUT OF {staticQuestions.length}
                </span>
              </div>
              <Form onSubmit={handleSubmit} onReset={handleReset}>
                <Form.Group className="mb-3">
                  <h2 className="text-center fs-2 my-3">{item.questionText}</h2>
                  <div>
                    {item.options.map((option, index) => (
                      <LongButtons
                        variant="outline-secondary"
                        buttontext={`${option.optionId}) ${option.optionValue}`}
                        onClick={() =>
                          setSelectedValue({
                            id: item.id,
                            value: option.optionValue,
                          })
                        }
                        active={
                          selectedValue.value === option.optionValue
                            ? true
                            : false
                        }
                      />
                    ))}
                  </div>
                </Form.Group>
                <div className={styles.smallButtonsWrapper}>
                  <div className={styles.smallButtonsContainer}>
                    <SmallButtons
                      variant="outline-danger"
                      buttontext="Reset"
                      buttonType="reset"
                      icon="reset"
                    />

                    <SmallButtons
                      variant="outline-secondary"
                      buttontext="Prev"
                      onClick={() => prevStep()}
                      icon="prev"
                    />
                    {staticQuestions.length === item.id ? (
                      <>
                        <SmallButtons
                          variant="outline-secondary"
                          buttontext="Calculate your score"
                          onClick={() => handleScoreCalculation()}
                        />
                      </>
                    ) : (
                      <SmallButtons
                        variant="outline-success"
                        buttontext="Next"
                        buttonType="submit"
                        icon="next"
                      />
                    )}
                  </div>
                </div>
              </Form>
            </>
          )
      )}
    </>
  );
};

export default QuestionWrapper;
