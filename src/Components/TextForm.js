import React, { useState } from "react";

export default function TextForm(props) {

  const [text, setText] = useState(String);
  let uppBtn = document.getElementById("up");
  let lowBtn = document.getElementById("low");
  let clrBtn = document.getElementById("clr");
  let cpyBtn = document.getElementById("cpy");
  let totalChars = text.trim().replace(/\s+/g, "");
  let totalWords = text
    .trim()
    .split(" ")
    .filter((val) => val.match(/[a-zA-Z0-9]+/g));
  let totalSentences = text
    .trim()
    .split(/[.?!]/g)
    .filter((val) => val.match(/[a-zA-Z0-9]+/g));

  const toUpperCase = () => {
    if(text.length > 0) {
      setText(text.toUpperCase());
      uppBtn.innerText = "Success!";
      setTimeout(() => {
        uppBtn.innerText = "Uppercase";
      }, 2600);
    }    
  };

  const toLowerCase = () => {
    if(text.length > 0) {
      setText(text.toLowerCase());
      lowBtn.innerText = "Success!";
      setTimeout(() => {
        lowBtn.innerText = "Lowercase";
      }, 2600);
    }    
  };

  const handleChange = (event) => {
    let te = event.target.value.replaceAll(/\s+/g, " ");
    setText(te);
  };

  const clearText = () => {
    setText("");
  };

  const copyText = () => {
    if(text.length > 0) {
      navigator.clipboard.writeText(text);
      cpyBtn.innerText = "Text Copied!";
      setTimeout(() => {
        cpyBtn.innerText = "Copy Text";
      }, 2600);
    }  
    // props.showAlert("Text Copied", "success");
  };

  return (
    <>
        <div className="container" style={{color: props.mode==="dark"?"#ffffff":"#000000"}}>
          <h2>{props.heading}</h2>
          <div className="form-group my-3">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="8"
              value={text}
              onChange={handleChange}
              style={{
                backgroundColor: props.mode==="dark" ? "#212529" : "#ffffff",
                color: props.mode==="dark" ? "#ffffff" : "#000000"
              }
              }
            ></textarea>
          </div>
          <div className="my-2">
            <button className="btn btn-info" id="up" onClick={toUpperCase}>
              Uppercase
            </button>
            &nbsp;
            <button className="btn btn-info mx-1" id="low"onClick={toLowerCase}>
              Lowercase
            </button>
            <button className="btn btn-info mx-1" id="cpy" onClick={copyText}>
              Copy Text
            </button>
            <button className="btn btn-danger mx-1" id="clr" onClick={clearText}>
              Clear
            </button>
          </div>
          
        <div className="my-1" >
          <h2>Your text summary</h2>
          <p>
            {totalWords.length} words, {totalChars.length} characters
          </p>
          <p>{totalSentences.length} sentences</p>
          <p>{0.008 * totalWords.length} minutes</p>
          <h2>Preview</h2>
          <p>{text.trim()}</p>
        </div>
        </div>
    </>
  );
}
