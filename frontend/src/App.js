import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Index from './pages/indexPage';

import SideBar from './components/SideBar';
import Layout from './pages/layout';
import CardList from './pages/cardList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='' element={<Layout />}>
            <Route path='/cardlist' element={<CardList />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

// <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
export default App;
