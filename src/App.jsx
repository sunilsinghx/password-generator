import "./App.css";
import usePasswordGenerator from "./hooks/usePasswordGenerator";
import StrenghtChecker  from "./components/StrengthChecker";
import Button from "./components/Button";
import CheckBox from "./components/CheckBox";
import { useState } from "react";

function App() {
  const [length, setLength] = useState(4);
  const [copied, setCopied] = useState(false);
  const [checkBoxData, setCheckBoxData] = useState([
    {
      title: "Include Uppercase Letters",
      state: false,
    },
    {
      title: "Include Lowercase Letters",
      state: false,
    },
    {
      title: "Include Numbers",
      state: false,
    },
    {
      title: "Include Symbols",
      state: false,
    }
  ]);
  
  

  //toggle state of CheckBox
  const handleCheckboxChange = (index) => {
    

      setCheckBoxData(prev=> prev.map((curr,i)=>{
        return i === index ? {...curr, state: !curr.state} : curr
      }))



  };

  const handleCopy = () => {

    navigator.clipboard.writeText(password)
    setCopied(true)

    setTimeout(()=>{
      setCopied(false)
    },1000)

  };

  const { password, error, generatePassword } = usePasswordGenerator();

  return (
    <div className="container">
        {/* password Text and copy Btn */}
        {password && (
          <div className="header">
            <div className="title">{password}</div>
            <Button
              text={copied ? "Copied" : "Copy"}
              onClick={handleCopy}
              customClass="copyBtn"
            />
          </div>
        )}

      {/* character Length slider */}
      <div className="charlength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      {/* checkBox */}

      <div className="checkboxes">
        {checkBoxData.map((checkbox,index)=>{
          return (
            <CheckBox
              key={index}
              title={checkbox.title}
              state={checkbox.state}
              onChange={()=>handleCheckboxChange(index)}
            
            />
          )
        })}

      </div>

        {/* strength */}
        <StrenghtChecker password={password}/>

        {/* Error handling */}
        {error && <div className="errormsg">{error}</div>}

        {/* generate Button */}

          <Button
          
            text="Generate Password"
            onClick={()=>generatePassword(checkBoxData,length)}
            customClass="generateBtn"
          />
    </div>
  );
}

export default App;
