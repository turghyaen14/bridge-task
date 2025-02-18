import React from "react";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { StepFormContext } from "../../context/StepFormContext";

const TextField = ({
  label = "Your Name",
  fieldType = "text",
  placeholder = "Enter your name",
  onChange,
  value = "",
}) => {
  return (
    <Form.Group className="mb-3" controlId={`formGroup${label}`}>
      <Form.Label className="text-center">{label}</Form.Label>
      <Form.Control
        type={fieldType}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        required
      />
    </Form.Group>
  );
};

export default TextField;
