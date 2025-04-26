export const checkValidData = (email, password, flag, fullName) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/.test(password);
  const fullNameValid = /[a-zA-Z]+\.?/.test(fullName)
  
  if (!fullNameValid && flag) return "Name is not valid";
  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Password is not valid";
  return null;
};
