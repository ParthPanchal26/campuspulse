import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import useUserId from "../hooks/userDecoder.js"
import axios from "axios"
import toast from "react-hot-toast"
import useUserRole from "../hooks/useUserRole.js"

const EventDetails = () => {

    const param = useParams()

    const [eventData, setEventData] = useState({});
    const [expired, setExpired] = useState(false);
    const [tags, setTags] = useState([]);
    const [newTime, setNewTime] = useState('');
    const [payload, setPayload] = useState(false);
    const [isRegFull, setIsRegFull] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    const server_uri = import.meta.env.VITE_SERVER_URI;
    const token = useSelector((state) => state?.auth?.token);
    const userId = useUserId();
    const navigate = useNavigate();
    let userRole = useUserRole();
    userRole = userRole.toLowerCase();


    const getEvents = async () => {
        const response = await fetch(`${server_uri}/events/${param.id}`)

        if (!response) throw new Error("Couldn't fetch events")

        const data = await response.json()
        setEventData(data)

        if (data.tags && data.tags.length > 0) {
            const extractedTags = data.tags[0]
                .split(" ")
                .map(tag => tag.trim());
            setTags(extractedTags);
        }

    }

    useEffect(() => {
        if (token) getEvents()
        else setEventData([])
    }, [])


    useEffect(() => {
        // console.log(eventData);
        // console.log(tags)
        if (eventData?.registrationDeadline && eventData?.time) {
            const deadlineDateTime = new Date(`${eventData.registrationDeadline.slice(0, 10)}T${eventData.time}`);
            const now = new Date()

            setExpired(deadlineDateTime < now);
        }

        if (eventData?.availableSeats === 0) setIsRegFull(true)
        else setIsRegFull(false)

        eventData?.registeredUsers?.map((item) => {
            // console.log(item.userId);
            if (item.userId === userId) setIsRegistered(true)
            else setIsRegistered(false)
        })

        if (userId === eventData?.organizerId) setPayload(true)

        const time24 = eventData?.time;
        const time12 = new Date(`1970-01-01T${time24}`).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        setNewTime(time12);

    }, [eventData])

    const handleRegister = async () => {
        try {
            const response = await axios.post(`${server_uri}/events/${param.id}/register`, {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
            // console.log(response)
            toast.success(response?.data?.message)
            setIsRegistered(true)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data.message)
        }
    }


    return (
        <section className="p-6 flex bg-slate-900 flex-col gap-2 w-[1536px] m-auto max-w-full sm:w-auto md:w-full">
            <div className="rounded-lg md:p-8" id="about" role="tabpanel" aria-labelledby="about-tab">

                <section className="m-1">
                    <div className="flex flex-col sm:flex-row m-2 sm:m-0 sm:justify-between items-center">
                        <div className="text-white">
                            <div className="text-4xl font-medium p-0.5 text-center sm:text-left">{eventData?.name}</div>
                            <div className="flex gap-1 font-medium p-2 justify-center sm:justify-start">
                                <span>{eventData?.category}</span>
                                <span className='text-slate-100'>•</span>
                                <span>{eventData?.venue}</span>
                            </div>
                        </div>
                        {
                            userRole && userRole === 'student'
                                ? <div className="self-center my-1">
                                    {
                                        isRegFull ? <h2 className="bg-slate-950 border border-slate-500 px-10 rounded-sm transition-all py-3 text-xl font-medium text-red-500">No Seats</h2>
                                            : isRegistered ? <h2 className="bg-slate-950 border border-slate-500 px-10 rounded-sm transition-all py-3 text-xl font-medium text-red-500">Registered</h2>
                                                : expired ? <h2 className="bg-slate-950 border border-slate-500 px-10 rounded-sm transition-all py-3 text-xl font-medium text-red-500">Expired</h2>
                                                    : <button onClick={handleRegister} className="bg-gray-800 cursor-pointer px-10 rounded-sm transition-all hover:bg-gray-950 hover:text-blue-400 hover:border hover:border-blue-400 py-3 text-xl font-medium text-white">Apply</button>
                                    }
                                </div>
                                : <>
                                    {
                                        payload
                                            ? <div className="m-1 flex justify-end">
                                                <button onClick={() => navigate(`/campuspulse/event-edit/${param.id}`)}>
                                                    <svg className="w-6 h-6 text-white cursor-pointer transition-all hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1v3m5-3v3m5-3v3M1 7h7m1.506 3.429 2.065 2.065M19 7h-2M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm6 13H6v-2l5.227-5.292a1.46 1.46 0 0 1 2.065 2.065L8 16Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            : <></>
                                    }
                                </>
                        }
                    </div>
                    <hr className="text-white my-8" />
                </section>

                <section className="m-1">
                    <div className="flex flex-row m-auto justify-center gap-3 flex-wrap max-w-[1024px] items-center my-3 font-medium">
                        <p className="bg-gray-800 px-6 py-3 rounded-sm text-left  transition-all hover:bg-slate-950  text-white">Email&nbsp;-&nbsp;{eventData?.contactEmail}</p>
                        <p className="bg-gray-800 px-6 py-3 rounded-sm text-left  transition-all hover:bg-slate-950  text-white">Contact&nbsp;-&nbsp;+91&nbsp;{eventData?.contactPhone}</p>
                        <p className="bg-gray-800 px-6 py-3 rounded-sm text-left  transition-all hover:bg-slate-950  text-white">Start Date&nbsp;-&nbsp;{eventData?.date?.slice(0, 10)}</p>
                        <p className="bg-gray-800 px-6 py-3 rounded-sm text-left  transition-all hover:bg-slate-950  text-white">Deadline&nbsp;-&nbsp;{eventData?.registrationDeadline?.slice(0, 10)}</p>
                    </div>
                    <hr className="text-white my-8" />
                </section>

                <section className="m-1">
                    <div className="flex flex-col py-3 px-2">
                        <h3 className="text-white font-semibold text-2xl mb-2">Description</h3>
                        <pre className="text-justify text-white text-wrap">{eventData?.description}</pre>
                    </div>
                    <hr className="text-white my-8" />
                </section>

                <section className="m-1">
                    <div className="flex flex-row m-auto justify-center gap-3 flex-wrap max-w-[1024px] items-center my-3 font-medium">
                        <p className="bg-gray-800 px-8 py-5 rounded-sm text-left  transition-all hover:bg-slate-950  text-white">Organized By&nbsp;-&nbsp;{eventData?.organizedBy}</p>
                        <p className="bg-gray-800 px-8 py-5 rounded-sm text-left  transition-all hover:bg-slate-950  text-white">Price&nbsp;-&nbsp;{eventData?.price === 0 ? "Free" : eventData?.price}</p>
                        <p className="bg-gray-800 px-8 py-5 rounded-sm text-left  transition-all hover:bg-slate-950  text-white">Time&nbsp;-&nbsp;{newTime}</p>
                        <p className="bg-gray-800 px-8 py-5 rounded-sm text-left  transition-all hover:bg-slate-950  text-white">Total Seats&nbsp;-&nbsp;{eventData?.totalSeats}</p>
                        <p className="bg-gray-800 px-8 py-5 rounded-sm text-left  transition-all hover:bg-slate-950  text-white">Available Seats&nbsp;-&nbsp;{eventData?.availableSeats}</p>
                    </div>
                    <hr className="text-white my-8" />
                </section>

                <section className="my-1 max-w-[1000px]">
                    <div className="flex flex-col py-3 px-2">
                        <h3 className="text-white font-semibold text-2xl mb-2">Tags</h3>
                        <div className="flex flex-row gap-3 flex-wrap items-center my-3 font-medium">
                            {
                                tags.map((item) => <p key={item} className="bg-gray-800 px-6 py-3 rounded-sm text-left  transition-all hover:bg-slate-950  text-white">{item}</p>)
                            }
                        </div>
                    </div>
                </section>
                <hr className="text-white my-8" />

            </div>
        </section>
    )
}

export default EventDetails