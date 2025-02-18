import React from "react";
import {
  IconX,
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
} from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import styles from "./FormItems.module.scss";

export const SmallButtons = ({
  variant = "primary",
  buttontext = "Next",
  onClick,
  buttonType = "button",
  buttonValue = "",
  active = false,
  icon = "next",
}) => {
  const currentIcon = {
    reset: <IconX />,
    prev: <IconArrowNarrowLeft />,
    next: <IconArrowNarrowRight />,
  };

  return (
    <div>
      <Button
        variant={variant}
        onClick={onClick}
        type={buttonType}
        value={buttonValue}
        active={active}
      >
        {buttontext}
        {currentIcon[icon]}
      </Button>
    </div>
  );
};

export const LongButtons = ({
  variant = "primary",
  buttontext = "Next",
  onClick,
  buttonType = "button",
  buttonValue = "",
  active = false,
}) => {
  return (
    <div className={styles.longButtonWrapper}>
      <Button
        variant={variant}
        onClick={onClick}
        type={buttonType}
        value={buttonValue}
        active={active}
        className={styles.longButton}
      >
        {buttontext}
      </Button>
    </div>
  );
};
