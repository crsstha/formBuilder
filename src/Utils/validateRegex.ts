// validationUtils.ts

export const regexValidation: { [key: string]: RegExp } = {
  text: /^[a-zA-Z0-9 ]*$/, // Regex for text (alphanumeric and space)
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regex for email
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, // Regex for password (at least 8 characters, one letter, one number)
};

// Utility function for regex validation
export const validateRegex = (
  value: string,
  fieldType: string,
  errorMessage: string
): string | true => {
  const regex = regexValidation[fieldType];

  if (regex && !regex.test(value)) {
    return errorMessage;
  }

  return true;
};
