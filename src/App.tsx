import React from 'react';
import logo from './logo.svg';
import './globals.css';
import './App.css';

import Labs from "./Labs";
//import Labs2 from "./Labs/labs";

import Kanbas from './Kanbas';
import HelloWorld from './Labs/a3/hi';
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import {SnackbarProvider} from "notistack";

function App() {
  return (
      <SnackbarProvider maxSnack={1}>
          <HashRouter>
              <div>
                  <Routes>
                      <Route path="/" element={<Navigate to="/Labs"/>}/>
                      <Route path="/Labs/*" element={<Labs/>}/>
                      <Route path="/Kanbas/*" element={<Kanbas/>}/>
                      <Route path="/hello" element={<HelloWorld/>}/>
                  </Routes>
              </div>
          </HashRouter>
      </SnackbarProvider>
  );

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  
}

export default App;
