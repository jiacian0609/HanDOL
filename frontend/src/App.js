import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Index from './pages/indexPage';

import Layout from './pages/layout';
import Home from './pages/home';
import CreatePost from './pages/createPost';
import CardList from './pages/cardList';
import Template from './pages/templatePage';
import Profile from './pages/profile';
import Feedback from './pages/feedback';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='' element={<Layout />}>
            <Route path='/home' element={<Home />} />
            <Route path='/post' element={<CreatePost />} />
            <Route path='/cardlist' element={<CardList />} />
            <Route path='/template' element={<Template />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/feedback' element={<Feedback />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

// <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
export default App;
