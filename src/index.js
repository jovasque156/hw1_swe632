import React from 'react';
import ReactDOM from 'react-dom';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Monitoring from "./views/monitoring";

ReactDOM.render(
  <React.StrictMode>
  <HashRouter>
    <Routes>
      <Route path='/' element={<Monitoring />}/>
    </Routes>
  </HashRouter>
  </React.StrictMode>
  ,
  document.getElementById('root')
);


// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();