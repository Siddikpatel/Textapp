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
    }, 3000);
  }
  
  const toggleMode = () => {
    if(mode === 'light') {
      setMode("dark");
      document.body.style.backgroundColor = '#000000';
      // showAlert("Dark Mode has been enabled!", "success");
      document.title = "Text Editor - Dark Mode";
      setTimeout(() => {
        document.title = "Text Editor - Home";
      }, 3000);
    }
    else {
      setMode("light");
      document.body.style.backgroundColor = '#ffffff';
      // showAlert("Light Mode has been enabled!", "success");
      document.title = "Text Editor - Light Mode";
      setTimeout(() => {
        document.title = "Text Editor - Home";
      }, 3000);
    }
  }

  return (
    <>
    <Router>
    <Navbar title="Text Editor" aboutText="About" toggleMode={toggleMode} mode={mode}/>
    <Alert alert={alert}/>
    <div className="container my-3">
      <Routes>
        <Route path="/about" element={<About/>}/>
        <Route path="/" element={<TextForm heading="Enter your text here" mode={mode} showAlert={showAlert}/>}/>
      </Routes> 
    </div>
    </Router>  
    </>
  );
}

export default App;