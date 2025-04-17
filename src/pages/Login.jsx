import { useNavigate } from 'react-router-dom'
import { Button, InputBox, FormHeading, FormFooter } from '../components'
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

      toast.success(message)
      navigate("/campuspulse/");
      // window.location.reload()

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <FormHeading heading="Sign in to your account" />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={submitHandler} method="POST" className="space-y-6">
            <InputBox label="Email" value={email} placeholder='example@gmail.com' setValue={setEmail} id="email" name="email" type="email" />
            <InputBox label="Password" from="login" value={password} placeholder='Your Password' setValue={setPassword} id="password" name="password" type="password" />
            <Button type="submit" value="Sign In" />
          </form>

          <FormFooter message="Don&lsquo;t have an account?" link="signup" linkText="Sign up to create an account" />

        </div>
      </div>
    </>
  )
}

export default Login