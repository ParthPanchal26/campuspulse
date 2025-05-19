import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const Participants = () => {

    const [participantData, setParticipantData] = useState([])

    const param = useParams()
    const server_uri = import.meta.env.VITE_SERVER_URI;
    const token = useSelector((state) => state?.auth?.token);

    const fetchEventDetails = async () => {
        try {
            const response = await axios.get(`${server_uri}/events/${param.id}/registrations`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            })
            const userData = response?.data
            setParticipantData(userData)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        fetchEventDetails()
    }, [])

    return (
        participantData.length
            ? <section className='m-6'>
                <h1 className="text-2xl font-medium">Event Participants</h1>
                <div className="relative overflow-x-auto mt-3">

                    <table className="w-full text-sm text-left rtl:text-right text-slate-900">
                        <thead className="text-xs text-gray-700 uppercase bg-slate-200">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Participant Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Contact
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Class
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Semester
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Registered at
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                participantData && participantData.map((std) => (
                                    <tr key={std?.registrationId} className="bg-slate-50 border-b border-gray-300">
                                        <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                                            {std?.user?.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {std?.user?.phoneNumber}
                                        </td>
                                        <td className="px-6 py-4">
                                            {std?.user?.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {std?.user?.class}
                                        </td>
                                        <td className="px-6 py-4">
                                            {std?.user?.semester}
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(std?.registeredAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </section>
            : <h2 className='text-xl text-center pt-3'>No Record Found</h2>
    )
}

export default Participants