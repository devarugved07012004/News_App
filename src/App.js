
import './App.css';

import React, { useState } from 'react'
import NavBar from './components/Navbar';
import News  from './components/News';
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'


const App =()=> {
  const pageSize=6;
  // apiKey=process.env.REACT_APP_NOT_SECRET_CODE;
  const apiKey='use_your_api';
  // const apiKey='';

  const [progress, setProgress] = useState(10);
    return(
    <div>
      <Router>
        <NavBar/>
        <LoadingBar
        height={2}
        color='#f11946'
        progress={progress}
      />
        <Routes>
          <Route path='/' element={<News setProgress={setProgress} apiKey={apiKey} key='general' pageSize={pageSize} country='in' category='general' />} />
          <Route path='/sports'  element={<News setProgress={setProgress} apiKey={apiKey} key='sports' pageSize={pageSize} country='in' category='sports' />} />
          <Route path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key='business' pageSize={pageSize} country='in' category='business' />} />
          <Route path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key='entertainment' pageSize={pageSize} country='in' category='entertainment' />} />
          <Route path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key='health' pageSize={pageSize} country='in' category='health' />} />
          <Route path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key='science' pageSize={pageSize} country='in' category='science' />} />
          <Route path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key='technology' pageSize={pageSize} country='in' category='technology' />} />
        </Routes>
        
      </Router>
    </div>
    )
  
}
export default App;
