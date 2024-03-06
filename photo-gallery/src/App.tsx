import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SearchForm from "./components/SearchForm";
import DisplayPhotos from "./components/DisplayPhotos";

function App() {
  return (
    <div className="App">
      <header> </header>
      <main className="mainClass">
        <div className="searchForm">
          <SearchForm />
        </div>
        <div className="displayPhotos"></div>
      </main>
    </div>
  );
}

export default App;
