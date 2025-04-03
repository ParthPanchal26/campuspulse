import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router"

const Home = () => {

    const [events, setEvents] = useState([])

    const token = useSelector((state) => state?.auth?.token);
    const server_uri = import.meta.env.VITE_SERVER_URI

    const getEvents = async () => {
        const response = await fetch(`${server_uri}/events/`)

        if (!response) throw new Error("Couldn't fetch events")

        const data = await response.json()
        setEvents(data)
    }

    useEffect(() => {

        if (token) getEvents()
        else setEvents([{ id: 0, name: "Please Sign In", description: "Sign In to see this event" }])

    }, [])

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/campuspulse/events");
    }

    return (
        <div className="h-[1150px] sm:h-[90vh] sm:w-full bg-slate-900">
            <div className="flex m-2 flex-col justify-center">
                <section className="text-6xl text-center mt-10 font-bold text-white">
                    Welcome to CampusPulse
                    <p className="text-2xl mt-4 font-light">Find all your campus events at one place</p>
                </section>
                <section className="flex align-middle justify-center mt-8 text-2xl">
                    <button onClick={handleClick} className="bg-purple-600 py-4 px-8 rounded-2xl text-white transition-all hover:bg-purple-700 hover:font-bold hover:text-sky-100 hover:px-12">Get Started &rarr;</button>
                </section>
                <section className="text-white m-auto mt-6 sm:w-[1080px]">
                    <p className="max-w-30 mx-2 my-2 text-xl underline underline-offset-2 transition-all hover:underline-offset-4">Latest Events</p>

                    <div className="m-auto sm:flex justify-center">

                        {
                            events.slice().reverse().slice(0, 3).map((event) => (

                                <div key={event.id} className="w-[25rem] m-2 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">

                                    <div>
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.name}</h5>
                                        <p className="font-normal text-gray-700 dark:text-gray-400">{event.description.slice(0, 50)}</p>
                                    </div>


                                    {
                                        token
                                            ? <button onClick={() => navigate(`/campuspulse/event-details/${event._id}`)} className="inline-flex mt-2 sm:mt-2 items-center px-6 py-3 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none transition-all hover:px-9">
                                                View Event
                                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                </svg>
                                            </button>
                                            : <></>
                                    }
                                </div>
                            ))
                        }

                    </div>

                </section>
            </div>
        </div>
    )
}

export default Home