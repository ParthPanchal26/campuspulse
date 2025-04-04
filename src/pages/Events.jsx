import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RequestLogin } from "../components";

const Events = () => {

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
        getEvents()
    }, [])


    return (
        <>
            {token
                ?
                <section className="p-6 flex flex-col gap-2 w-[1536px] m-auto max-w-full sm:w-auto md:w-[1536px]">
                    {
                        events.map((event) => (
                            <div key={event._id} className="bg-white rounded-lg md:p-8 dark:bg-slate-800" id="about" role="tabpanel" aria-labelledby="about-tab">
                                <h2 className="mb-3 p-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{event.name}</h2>
                                <p className="mb-3 p-3 text-justify text-gray-500 dark:text-gray-400">
                                    {
                                        event.description.length > 240
                                            ? event.description.slice(0, 160) + '...'
                                            : event.description.slice(0, 160)
                                    }
                                </p>
                                <button className="inline-flex px-3 pb-5 md:p-3 items-center font-medium text-blue-700 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700">
                                    View Event
                                    <svg className=" w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                </button>
                            </div>
                        ))
                    }
                </section>
                : <RequestLogin />
            }
        </>
    )
}

export default Events