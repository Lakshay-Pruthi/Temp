
import { BrowserRouter, Route, Routes } from 'react-router-dom'




import './App.css'
import Home from './Pages/Home';
import Rooms from './Pages/Rooms';
import About from './Pages/About';
import Main from './Pages/Main';

function App() {




  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/Sandesha/' element={<Main />} >
            <Route index element={<Home />} />
            <Route path='Rooms' element={<Rooms />} />
            <Route path='About' element={<About />} />
          </Route>
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
