import { Link } from 'react-router'
import { Logo } from '../components'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

const ResetPassword = () => {

    const [email, setEmail] = useState("")
    const [otp, setOTP] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const server_uri = import.meta.env.VITE_SERVER_URI

    const submitHandler = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(`${server_uri}/auth/reset-password`, {
                email, otp, newPassword
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })

            toast.success(response.data.message)

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Logo />
                    <h2 className="mt-10 text-center text-2xl/10 font-bold tracking-tight text-gray-900">
                        Enter details to reset password
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
                                    placeholder='example@gmail.com'
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                OTP
                            </label>
                            <div className="mt-2">
                                <input
                                    value={otp}
                                    onChange={(e) => setOTP(e.target.value)}
                                    id="otp"
                                    name="otp"
                                    type="number"
                                    required
                                    placeholder='123-456'
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 [-moz-appearance: textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                New Password
                            </label>
                            <div className="mt-2">
                                <input
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder='Your Password'
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs transition hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>


                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Want to keep the old one ? {' '}
                        <Link to="/campuspulse/login/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Sign In
                        </Link>
                    </p>

                </div>
            </div>
        </>
    )
}

export default ResetPassword