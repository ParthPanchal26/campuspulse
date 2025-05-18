import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RequestLogin } from "../components";
import { useNavigate } from "react-router";

const Events = () => {

    const [events, setEvents] = useState([])
    const [eventCategory, setEventCategory] = useState('All')

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

    const filteredEvents = eventCategory === 'All'
        ? events
        : events.filter(event =>
            event?.category?.toLowerCase() === eventCategory.toLowerCase()
        );

    const navigate = useNavigate();


    return (
        <>
            {token ? (
                <div className="flex flex-col">
                    <div className="bg-slate-300 flex justify-between px-5 items-center py-4">
                        <p className="text-3xl text-slate-950 font-medium">Events</p>
                        <div className="ml-5 font-medium text-xl text-white">
                            <div className="flex">
                                <label htmlFor="id" className="block text-sm/6 m-1 font-medium text-slate-950">
                                    Category:
                                </label>
                                <select
                                    type="select"
                                    className="block w-full rounded-sm text-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 bg-slate-700"
                                    value={eventCategory}
                                    onChange={(e) => setEventCategory(e.target.value)}
                                >
                                    <option className="bg-slate-600" value="All">All</option>
                                    <option className="bg-slate-600" value="Technical">Technical</option>
                                    <option className="bg-slate-600" value="Cultural">Cultural</option>
                                    <option className="bg-slate-600" value="Sports">Sports</option>
                                    <option className="bg-slate-600" value="Workshop">Workshop</option>
                                    <option className="bg-slate-600" value="Seminar">Seminar</option>
                                    <option className="bg-slate-600" value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex-grow">
                        <section className="flex flex-wrap bg-slate-0 justify-center bg-slate-200 pb-10">
                            {
                                filteredEvents.slice().reverse().map((event) => (
                                    <div key={event?.id} className="mx-2 my-2 w-[325px] border bg-slate-800 border-gray-700 rounded-sm">
                                        <div className="flex flex-col">
                                            <div className="m-3">
                                                <div className="h-48">
                                                    <div className="font-medium text-white text-2xl p-1">
                                                        {event?.name.length > 38 ? `${event?.name.slice(0, 40)}...` : `${event?.name}`}
                                                    </div>
                                                    <p className="text-white p-2">• {event?.createdAt.slice(0, 10)}</p>
                                                    <hr className="text-white my-2" />
                                                    <p className="text-justify text-white p-2">
                                                        {event?.description.length > 50 ? `${event?.description.slice(0, 50)} . . .` : event?.description}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => navigate(`/campuspulse/event-details/${event._id}`)}
                                                    className="flex w-full justify-center rounded-sm px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs transition hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-gray-700 mt-2"
                                                >
                                                    View Event
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </section>
                    </div>
                </div>
            ) : (
                <RequestLogin />
            )}

        </>
    )
}

export default Events