import { Toaster } from 'react-hot-toast'
import { NavBar } from './components/'
import { Signup, Login, Home, Events, About, ForgotPassword, ResetPassword, CreateEvent, EventDetails, EventEdit, StudentProfile, Manage, Participants, AssignRole } from './pages'
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
            <Route path='/campuspulse/create-event' exact element={<CreateEvent />} />
            <Route path='/campuspulse/login' exact element={<Login />} />
            <Route path='/campuspulse/signup' exact element={<Signup />} />
            <Route path='/campuspulse/forgotPassword' exact element={<ForgotPassword />} />
            <Route path='/campuspulse/about' exact element={<About />} />
            <Route path='/campuspulse/reset-password' exact element={<ResetPassword />} />
            <Route path='/campuspulse/event-details/:id' exact element={<EventDetails />} />
            <Route path='/campuspulse/event-edit/:id' exact element={<EventEdit />} />
            <Route path='/campuspulse/student-profile' exact element={<StudentProfile />} />
            <Route path='/campuspulse/manage/' exact element={<Manage />} />
            <Route path='/campuspulse/event-participants/:id' exact element={<Participants />} />
            <Route path='/campuspulse/assign-role' exact element={<AssignRole />} />
          </Routes>
          <Toaster />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App