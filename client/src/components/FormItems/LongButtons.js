import React from "react";

const LongButtons = ({
  variant = "primary",
  buttontext = "Next",
  onClick,
  buttonType = "button",
  buttonValue = "",
  active = false,
}) => {
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
      </Button>
    </div>
  );
};

export default LongButtons;
