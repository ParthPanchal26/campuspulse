import { Link } from 'react-router'
import { Logo } from '../components'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

const ForgotPassword = () => {

    const [email, setEmail] = useState("")

    const server_uri = import.meta.env.VITE_SERVER_URI

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            
            const response = await axios.post(`${server_uri}/auth/forgot-password`, {
                email
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
                        Forgot your password? <br /> Enter your email to reset it.
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
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs transition hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Send Email
                            </button>
                        </div>
                    </form>


                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Got mail ? {' '}
                        <Link to="/campuspulse/reset-password/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Reset password
                        </Link>
                    </p>

                </div>
            </div>
        </>
    )
}

export default ForgotPassword