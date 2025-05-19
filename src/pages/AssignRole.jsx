import React, { useEffect, useState } from 'react'
import { Button, FormHeading, InputBox } from '../components/'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useSelector } from 'react-redux'

const AssignRole = () => {

    const [newRole, setNewRole] = useState('Student')
    const [email, setEmail] = useState('')

    // useEffect(() => {
    //     console.log(role);
    // }, [role])

    const server_uri = import.meta.env.VITE_SERVER_URI;
    const token = useSelector((state) => state?.auth?.token);

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await axios.post(`${server_uri}/events/change-role`, {
                email,
                newRole
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            })

            console.log(response);
            toast.success(response.data.message)

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='py-12 px-6'>
            <FormHeading heading="Assign Role" newLine="&nbsp;" />
            <div className="w-80 m-auto">
                <form onSubmit={handleSubmit}>
                    <InputBox value={email} setValue={setEmail} label="User Email" type="email" id="email" placeholder="example@gmail.com" />
                    <div className="flex flex-col">
                        <label className="block text-sm/6 m-1 font-medium text-gray-900">
                            User Role
                        </label>
                        <select
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                            type="select"
                            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-950 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                        >
                            <option className='bg-slate-200 font-medium' value="" disabled>Select</option>
                            <option className='bg-slate-200 font-medium' value="Student">Student</option>
                            <option className='bg-slate-200 font-medium' value="Faculty">Faculty</option>
                            <option className='bg-slate-200 font-medium' value="HOD">HOD</option>
                            <option className='bg-slate-200 font-medium' value="Principal">Principal</option>
                            <option className='bg-slate-200 font-medium' value="ISTE">ISTE</option>
                            <option className='bg-slate-200 font-medium' value="IEEE">IEEE</option>
                            <option className='bg-slate-200 font-medium' value="ETTC">ETTC</option>
                            <option className='bg-slate-200 font-medium' value="Admin">Admin</option>
                        </select>
                    </div>
                    <Button type="submit" value="Change Role" />
                </form>
            </div>
        </div>
    )
}

export default AssignRole