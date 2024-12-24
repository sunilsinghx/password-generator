import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, SetPassword] = useState("");
  const [error, SetError] = useState("");

  const generatePassword = (checkBoxData, length) => {
    let charSet = "";
    let generatedPassword = "";


    //return only selected checkbox data
    const selectedOptions = checkBoxData.filter((checkbox) => checkbox.state);
    if (selectedOptions.length === 0) {
      SetError("Select at least one Option");
      SetPassword("");
      return;
    }

    //make charset as per selected Options
    selectedOptions.forEach((option) => {
      switch (option.title) {
        case "Include Uppercase Letters":
          charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include Lowercase Letters":
          charSet += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include Numbers":
          charSet += "1234567890";
          break;
        case "Include Symbols":
          charSet += "!@#$%^&*()";
          break;
        default:
          break;
      }
    });

    //loop over charset for provided length
    for (let i = 0; i < length; i++) {
      //find random index from charset
      const randomIndex = Math.floor(Math.random() * charSet.length);

      //append if to our result
      generatedPassword += charSet[randomIndex];
    }

    SetPassword(generatedPassword);
    SetError("");
  };

  return {
    password,
    error,
    generatePassword,
  };
};

export default usePasswordGenerator;
