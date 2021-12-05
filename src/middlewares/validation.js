import { check } from "express-validator";

const stringErr = (field) => {
  return `Only strings are allowed for ${field}`;
}

const otpErr = () => {
  return 'Invalid OTP!';
}

const textErr = (field) => {
  return `Only alphabets and punctuations are allowed for ${field}`;
}

const maxLenErr = (field, num) => {
  return `Maximum ${num} characters are allowed for ${field}`;
}

const exactLen = (field, num) => {
  return `Exactly ${num} characters are allowed for ${field}`;
}

const emptErr = (field) => {
  return `${field} cannot be empty!`;
}

export const validString = (required, field, name, max) => {
  const rule = check(field).trim()
    .isString().withMessage(stringErr(name))
    .isLength({
      max: max
    }).withMessage(maxLenErr(name, max));
  if (required) {
    rule.notEmpty().withMessage(emptErr(name))
  }

  return rule;
}

export const validOtp = (field, name, len) => {
  const rule = check(field).trim()
    .notEmpty().withMessage(emptErr(name))
    .isAlphanumeric().withMessage(otpErr)
    .isLength({
      max: len,
      min: len
    }).withMessage(exactLen(field, len));

  return rule;
}

export const validText = (field, name, max) => {
  const rule = check(field).trim()
    .notEmpty().withMessage(emptErr(name))
    .isAlpha('en-US', { ignore: " .," }).withMessage(textErr(name))
    .isLength({
      max: max
    }).withMessage(maxLenErr(name, max))
  return rule;
}

export const validEmail = (field) => {
  const rule = check(field).trim()
    .notEmpty().withMessage(emptErr(field))
    .isEmail().withMessage("Invalid email")
    .toLowerCase();
  return rule;
}