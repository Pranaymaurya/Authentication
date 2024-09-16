import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import './index.css';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';
// Adjust the import path

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/home" element={<Home/>} />
  </>
));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


