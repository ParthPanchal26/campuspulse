import { useNavigate } from 'react-router'
import { Button, FormFooter, FormHeading, InputBox } from '../components'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../redux/features/auth/authSlice'

const Signup = () => {

    const [name, setName] = useState("")
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

            const response = await axios.post(`${server_uri}/auth/signup`, {
                name, email, password
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })

            const { token, message } = response.data;
            dispatch(loginSuccess({ token }))


            toast.success(message);
            navigate("/campuspulse/");


        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

                <FormHeading heading="Sign up to create your account" />

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={submitHandler} method="POST" className="space-y-6">

                        <InputBox placeholder="FirstName LastName" label="Name" value={name} setValue={setName} id="name" name="name" type="text" />
                        <InputBox placeholder="example@gmail.com" label="Email" value={email} setValue={setEmail} id="email" name="email" type="email" />
                        <InputBox placeholder="Your Password" label="Password" value={password} setValue={setPassword} id="password" name="password" type="password" />
                        <Button type="submit" value="Sign up" />

                    </form>

                    <FormFooter message="already have an account?" link="login" linkText="Sign In to your account" />

                </div>
            </div>
        </>
    )
}

export default Signup