"use client";

import { useState, useEffect } from "react";
import styles from "./FormValidation.module.css";

type ValidationState = "empty" | "invalid" | "valid";
type FieldType = "email" | "password" | "required";

interface Field {
  type: FieldType;
  label: string;
  placeholder: string;
  value: string;
  state: ValidationState;
  errorMessage: string;
}

export default function FormValidation() {
  const [fields, setFields] = useState<Field[]>([
    {
      type: "email",
      label: "Email Address",
      placeholder: "Enter your email",
      value: "",
      state: "empty",
      errorMessage: "Please enter a valid email address",
    },
    {
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      value: "",
      state: "empty",
      errorMessage: "Password must be at least 8 characters",
    },
    {
      type: "required",
      label: "Full Name",
      placeholder: "Enter your full name",
      value: "",
      state: "empty",
      errorMessage: "This field is required",
    },
  ]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
  };

  const validateField = (field: Field): ValidationState => {
    if (field.value.trim() === "") {
      return "empty";
    }

    switch (field.type) {
      case "email":
        return validateEmail(field.value) ? "valid" : "invalid";
      case "password":
        return validatePassword(field.value) ? "valid" : "invalid";
      case "required":
        return validateRequired(field.value) ? "valid" : "invalid";
      default:
        return "empty";
    }
  };

  const handleChange = (index: number, value: string) => {
    setFields((prev) => {
      const newFields = [...prev];
      newFields[index] = { ...newFields[index], value };
      return newFields;
    });
  };

  const handleBlur = (index: number) => {
    setFields((prev) => {
      const newFields = [...prev];
      const field = newFields[index];
      newFields[index] = { ...field, state: validateField(field) };
      return newFields;
    });
  };

  // Debounced validation while typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setFields((prev) =>
        prev.map((field) => {
          if (field.value.trim() !== "") {
            return { ...field, state: validateField(field) };
          }
          return field;
        })
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [fields.map((f) => f.value).join(",")]);

  const getStrengthLabel = (password: string): string => {
    if (password.length === 0) return "";
    if (password.length < 4) return "Weak";
    if (password.length < 8) return "Fair";
    if (password.length < 12) return "Good";
    return "Strong";
  };

  const getStrengthClass = (password: string): string => {
    const length = password.length;
    if (length === 0) return "";
    if (length < 4) return styles.weak;
    if (length < 8) return styles.fair;
    if (length < 12) return styles.good;
    return styles.strong;
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        {fields.map((field, index) => (
          <div key={index} className={styles.fieldWrapper}>
            <label className={styles.label}>{field.label}</label>
            <div className={styles.inputWrapper}>
              <input
                type={field.type === "password" ? "password" : "text"}
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => handleChange(index, e.target.value)}
                onBlur={() => handleBlur(index)}
                className={`${styles.input} ${styles[field.state]}`}
              />

              {/* State Icons */}
              {field.state === "valid" && (
                <span className={`${styles.icon} ${styles.validIcon}`}>✓</span>
              )}
              {field.state === "invalid" && (
                <span className={`${styles.icon} ${styles.invalidIcon}`}>
                  ✕
                </span>
              )}
            </div>

            {/* Error Message */}
            {field.state === "invalid" && (
              <p className={styles.errorMessage}>{field.errorMessage}</p>
            )}

            {/* Password Strength Indicator */}
            {field.type === "password" && field.value.length > 0 && (
              <div className={styles.strengthIndicator}>
                <div className={styles.strengthBars}>
                  <div
                    className={`${styles.strengthBar} ${
                      field.value.length >= 1
                        ? getStrengthClass(field.value)
                        : ""
                    }`}
                  />
                  <div
                    className={`${styles.strengthBar} ${
                      field.value.length >= 4
                        ? getStrengthClass(field.value)
                        : ""
                    }`}
                  />
                  <div
                    className={`${styles.strengthBar} ${
                      field.value.length >= 8
                        ? getStrengthClass(field.value)
                        : ""
                    }`}
                  />
                  <div
                    className={`${styles.strengthBar} ${
                      field.value.length >= 12
                        ? getStrengthClass(field.value)
                        : ""
                    }`}
                  />
                </div>
                <span
                  className={`${styles.strengthLabel} ${getStrengthClass(
                    field.value
                  )}`}
                >
                  {getStrengthLabel(field.value)}
                </span>
              </div>
            )}
          </div>
        ))}

        <button type="submit" className={styles.submitButton}>
          Submit Form
        </button>
      </form>
    </div>
  );
}
