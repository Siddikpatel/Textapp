import React, { useState } from "react"

export default function TextForm(props) {
  const [text, setText] = useState(String);
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
    setText(text.toUpperCase());
  };

  const toLowerCase = () => {
    setText(text.toLowerCase());
  };

  const handleChange = (event) => {
    let te = event.target.value.replaceAll(/\s+/g, " ");
    setText(te);
  };

  const clearText = () => {
    setText("");
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Text Copied", "success");
  };

  return (
    <>
      <div
        className="rounded-3"
        style={{
          backgroundColor: props.mode === "dark" ? "#171313" : "#ffe6b3",
          userSelect: "none",
          color: props.mode === "dark" ? "#FFFFFF" : "#000000",
        }}
      >
        <div className="container">
          <h1>{props.heading}</h1>
          <div className="form-group my-3">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="8"
              value={text}
              onChange={handleChange}
              style={{
                backgroundColor: props.mode === "dark" ? "#383737" : "#ffffff",
                color: props.mode === "light" ? "#000000" : "#ffffff",
              }}
            ></textarea>
          </div>
          <button className="btn btn-primary my-2 mx-1" onClick={toUpperCase}>
            Uppercase
          </button>
          <button className="btn btn-primary mx-1" onClick={toLowerCase}>
            Lowercase
          </button>
          <button className="btn btn-primary mx-1" onClick={copyText}>
            Copy Text
          </button>
          <button className="btn btn-danger mx-1" onClick={clearText}>
            Clear
          </button>
        </div>

        <div className="container">
          <h1>Your text summary</h1>
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
