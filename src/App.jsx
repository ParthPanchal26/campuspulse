import { NavBar } from './components/'
import { Signup, Login, Home, Events, About } from './pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/campuspulse/' exact element={<Home />} />
          <Route path='/campuspulse/events' exact element={<Events />} />
          <Route path='/campuspulse/login' exact element={<Login />} />
          <Route path='/campuspulse/about' exact element={<About />} />
          <Route path='/campuspulse/signup' exact element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App