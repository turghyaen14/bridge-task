import React, { useContext, useState } from "react";
import TextField from "../FormItems/TextField";
import { Form, Container } from "react-bootstrap";
import { StepFormContext } from "../../context/StepFormContext";
import mathSplashArt from "../../assets/mathSplashArt.png";
import styles from "./Name.module.scss";
import { LongButtons } from "../FormItems/CustomButton";

const Name = () => {
  const { nextStep, setName } = useContext(StepFormContext);

  const [currentValue, setCurrentValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(currentValue);
    nextStep();
  };

  return (
    <Container>
      <div className={styles.splashImageWrapper}>
        <img
          src={mathSplashArt}
          alt="Math Splash Art"
          className={styles.splashImage}
        />
      </div>

      <h1 className="text-center p-2">Rounding Off to Nearest 10</h1>
      <div className="px-4">
        <p className="text-center muted ">
          Test your knowledge of essential math concepts such as rounding rules,
          <br />
          place values, estimation, and accuracy. Gain insights into simplifying
          numbers while maintaining precision!
        </p>
      </div>

      <Form onSubmit={handleSubmit}>
        <TextField
          onChange={(value) => setCurrentValue(value)}
          value={currentValue}
        />
        <LongButtons
          buttonType="submit"
          variant="success"
          buttontext="Start Now"
        />
      </Form>
    </Container>
  );
};

export default Name;
