import React from 'react';
import './App.css';
import './navbar.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/home'
import Login from './components/login'
import Landing from './landing'
import DisplayContent from './components/contents';

function App() {

  return (
      <BrowserRouter>
      <Routes>
      
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/contents' element={<DisplayContent/>}/>
      
      </Routes>
    </BrowserRouter>
 
  );
};



export default App;