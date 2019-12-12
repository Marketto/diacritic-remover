import React from "react";
import DiacriticRemoverPage from "./pages/diacritic-remover.page";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <img src={logo} className="logo" alt="logo"/>
      <DiacriticRemoverPage></DiacriticRemoverPage>
    </div>
  );
}

export default App;
