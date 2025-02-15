import { Button, FormFooter, FormHeading, InputBox } from '../components'
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

                <FormHeading heading="Forgot your password?" newLine="Enter your email to reset it." />

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form onSubmit={submitHandler} method="POST" className="space-y-6">
                        <InputBox label="Email" value={email} placeholder='example@gmail.com' setValue={setEmail} id="email" name="email" type="email" />

                        <Button type="submit" value="Send Email" />
                    </form>

                    <FormFooter message="Got mail ?" link="reset-password" linkText="Reset password" />

                </div>
            </div>
        </>
    )
}

export default ForgotPassword