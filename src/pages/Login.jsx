import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../components'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../redux/features/auth/authSlice'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const server_uri = import.meta.env.VITE_SERVER_URI

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const token = useSelector((state) => state?.auth?.token);

  useEffect(() => {
    if (token) navigate("/campuspulse/");
  }, [token, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(`${server_uri}/auth/signin`, {
        email, password
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      const { token, message } = response.data;
      dispatch(loginSuccess({ token }));

      toast.success(message);
      navigate("/campuspulse/");

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={submitHandler} method="POST" className="space-y-6">

            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link to="/campuspulse/forgotPassword" className="font-semibold text-indigo-600 transition hover:text-indigo-800">Forgot password?</Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs transition hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>


          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Don&lsquo;t have an account?{' '}
            <Link to="/campuspulse/signup/" className="font-semibold text-indigo-600 transition hover:text-indigo-800">
              Sign up to create an account
            </Link>
          </p>

        </div>
      </div>
    </>
  )
}

export default Login