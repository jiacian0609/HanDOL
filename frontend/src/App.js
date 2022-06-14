import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Index from './pages/indexPage';

// import SideBar from './components/SideBar';
import Layout from './pages/layout';

function App() {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='' element={<Layout />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

// <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
export default App;
