import { Toaster } from 'react-hot-toast'
import { NavBar } from './components/'
import { Signup, Login, Home, Events, About, ForgotPassword, ResetPassword } from './pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className='mt-21'>
          <Routes>
            <Route path='/campuspulse/' exact element={<Home />} />
            <Route path='/campuspulse/events' exact element={<Events />} />
            <Route path='/campuspulse/login' exact element={<Login />} />
            <Route path='/campuspulse/signup' exact element={<Signup />} />
            <Route path='/campuspulse/forgotPassword' exact element={<ForgotPassword />} />
            <Route path='/campuspulse/about' exact element={<About />} />
            <Route path='/campuspulse/reset-password' exact element={<ResetPassword />} />
          </Routes>
          <Toaster />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App