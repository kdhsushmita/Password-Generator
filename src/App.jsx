import "./Style.scss";
import { FaClipboard } from "react-icons/fa";
import {
  numbers,
  upperCaseLetters,
  lowerCaseLettters,
  specialCharacters,
} from "./Character";
import { useRef, useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(20);
  const [upperCase, setUpperCase] = useState(true);
  const [lowerCase, setLowerCase] = useState(true);
  const [includenumbers, includesetNumbers] = useState(true);
  const [includespecialCharacters, includesetSpecialCharacters] =
    useState(true);
  const copyBtn = useRef();

  const handleGeneratePassword = () => {
    if (
      !upperCase &&
      !lowerCase &&
      !includenumbers &&
      !includespecialCharacters
    ) {
      alert("You must select at least 1 option");
      return;
    }
    let characterList = "";
    if (upperCase) {
      characterList += upperCaseLetters;
    }
    if (lowerCase) {
      characterList += lowerCaseLettters;
    }
    if (includenumbers) {
      characterList += numbers;
    }
    if (includespecialCharacters) {
      characterList += specialCharacters;
    }
    setPassword(passwordCreator(characterList));
  };
  const passwordCreator = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = getrandomIndex(characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };
  const getrandomIndex = (limit) => {
    return Math.round(Math.random() * limit);
  };
  const handleOnCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Password is copied to clipboard!");
  };
  return (
    <>
      <div className="container">
        <div className="generator">
          <h2 className="generator_header">Password Generator</h2>
          <div className="generator_password">
            {password}
            <button className="generator_passwordGenerateBtn">
              <FaClipboard ref={copyBtn} onClick={handleOnCopy} />
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="password_length">Password Length</label>
            <input
              type="number"
              name="password_length"
              id="password_length"
              max={20}
              min={7}
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="include_uppercase">Include UpperCase Letter</label>
            <input
              type="checkbox"
              name="include_uppercase"
              id="include_uppercase"
              checked={upperCase}
              onChange={(e) => setUpperCase(e.target.checked)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="include_lowercase">Include LowerCase Letter</label>
            <input
              type="checkbox"
              name="include_lowercase"
              id="include_lowercase"
              checked={lowerCase}
              onClick={(e) => setLowerCase(e.target.checked)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="include_number">Include Number</label>
            <input
              type="checkbox"
              name="include_number"
              id="include_number"
              checked={includenumbers}
              onChange={(e) => includesetNumbers(e.target.checked)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="include_symbol">Include Symbol</label>
            <input
              type="checkbox"
              name="include_symbol"
              id="include_symbol"
              checked={includespecialCharacters}
              onChange={(e) => includesetSpecialCharacters(e.target.checked)}
            />
          </div>
          <button className="generator_btn" onClick={handleGeneratePassword}>
            Generate New Password
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
