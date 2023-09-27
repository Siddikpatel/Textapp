import React, { useState } from "react";

export default function TextForm(props) {


  const [startDate, setStartDate] = useState(null);
  const [wordPerMinute, setWordPerMinute] = useState(0);
  const [text, setText] = useState('');
  const [totalChars, setTotalChars] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [totalSentences, setTotalSentences] = useState(0);
  let uppBtn = document.getElementById("up");
  let lowBtn = document.getElementById("low");
  let clrBtn = document.getElementById("clr");
  let cpyBtn = document.getElementById("cpy");

  const toUpperCase = () => {
    if (text.length > 0) {
      setText(text.toUpperCase());
      uppBtn.innerText = "Success!";
      setTimeout(() => {
        uppBtn.innerText = "Uppercase";
      }, 2600);
    }
  };

  const toLowerCase = () => {
    if (text.length > 0) {
      setText(text.toLowerCase());
      lowBtn.innerText = "Success!";
      setTimeout(() => {
        lowBtn.innerText = "Lowercase";
      }, 2600);
    }
  };

  const handleChange = (event) => {
    const newText = event.target.value;

    if (newText.length === 0) {
      setStartDate(null);
    } else if (startDate === null) {
      setStartDate(new Date())
    }

    setText(event.target.value);

    const totalWords = newText.trim().split(" ").filter((val) => val && val.match(/[a-zA-Z0-9]+/g)).length;

    if (startDate) {
      const minutesPassed = (new Date().getTime() - startDate.getTime()) / (60 * 1000);
      console.log(minutesPassed)
      setWordPerMinute(Math.round(totalWords / minutesPassed));
    }

    setTotalWords(totalWords);
    setTotalSentences(newText.trim().split(/[.?!]/g).filter((val) => val && val.match(/[a-zA-Z0-9]+/g)).length);
    setTotalChars(text.trim().length);
  };

  const clearText = () => {
    setText('');
  };

  const copyText = () => {
    if (text.length > 0) {
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
      <div className="container" style={{ color: props.mode === "dark" ? "#ffffff" : "#000000" }}>
        <h2>{props.heading}</h2>
        <div className="form-group my-3">
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="8"
            value={text}
            onChange={handleChange}
            style={{
              backgroundColor: props.mode === "dark" ? "#212529" : "#ffffff",
              color: props.mode === "dark" ? "#ffffff" : "#000000"
            }
            }
          ></textarea>
        </div>
        <div className="my-2">
          <button className="btn btn-info" id="up" onClick={toUpperCase}>
            Uppercase
          </button>
          &nbsp;
          <button className="btn btn-info mx-1" id="low" onClick={toLowerCase}>
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
            {totalWords} words, {totalChars} characters
          </p>
          <p>{totalSentences} sentences</p>
          <p>{wordPerMinute} words per minute</p>
          <h2>Preview</h2>
          <textarea
            className="form-control my-3"
            readonly
            style={{
              backgroundColor: props.mode === "dark" ? "#212529" : "#ffffff",
              color: props.mode === "dark" ? "#ffffff" : "#000000"
            }}
            rows={8}
            value={text.trim()} ></textarea>
        </div>
      </div>
    </>
  );
}
