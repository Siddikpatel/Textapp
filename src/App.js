// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import About from './Components/About';
import Navbar from './Components/Navbar';
import TextForm from './Components/TextForm';
import Alert from './Components/Alert';
import {
  Routes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

function App() {

  document.body.style.fontFamily = "Arial";
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2500);
  }
  
  const toggleMode = () => {
    if(mode === 'light') {
      setMode("dark");
      document.body.style.backgroundColor = '#383737';
      showAlert("Dark Mode has been enabled!", "success");
      document.title = "Textutils - Dark Mode"
      setTimeout(() => {
        document.title = "Textutils - Home"
      }, 2500);
    }
    else {
      setMode("light");
      document.body.style.backgroundColor = '#ffe6b3';
      showAlert("Light Mode has been enabled!", "success");
      document.title = "Textutils - Light Mode"
      setTimeout(() => {
        document.title = "Textutils - Home"
      }, 2500);
    }
  }

  return (
    <>
    <Router>
    <Navbar title="TextUtility" aboutText="About" toggleMode={toggleMode} mode={mode}/>
    <Alert alert={alert}/>
    <div className="container my-3">
      <Routes>
        <Route path="/about" element={<About/>}/>
        <Route path="/" element={<TextForm heading="Enter the text to analyze" mode={mode} showAlert={showAlert}/>}/>
      </Routes> 
    </div>
    </Router>  
    </>
  );
}

export default App;