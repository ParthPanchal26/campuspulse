import { Button, FormFooter, FormHeading, InputBox } from '../components'
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
                <FormHeading heading="Enter details to reset password" />

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={submitHandler} method="POST" className="space-y-6">
                        <InputBox label="Email" value={email} setValue={setEmail} id="email" name="email" type="email" placeholder="example@gmail.com" />
                        <InputBox label="OTP" value={otp} setValue={setOTP} id="otp" name="otp" type="number" placeholder="123-456" className="[-moz-appearance: textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        <InputBox label="New Password" value={newPassword} setValue={setNewPassword} id="password" name="password" type="password" placeholder="Your Password" />
                        <Button type="submit" value="Reset Password" />
                    </form>

                    <FormFooter message="Want to keep the old one ?" link="login" linkText="Sign In" />

                </div>
            </div>
        </>
    )
}

export default ResetPassword