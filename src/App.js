import React from 'react';
import './App.css';
import Home from './Home';
import config from "./config";
import Firebase from "firebase";

function App() {
  Firebase.initializeApp(config);
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
