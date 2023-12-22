//layout
import Navbar from "./components/layout/navbar/Navbar"

//pages
import HomePage from "./components/pages/homepage/HomePage"

//css
import AppCSS from './App.module.css'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div>
      <Navbar />
      <div className={AppCSS.container}>
        <Routes>
          <Route path='/' element={<HomePage />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
