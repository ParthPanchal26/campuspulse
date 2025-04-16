import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RequestLogin } from "../components";
import { useNavigate } from "react-router";

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

    const navigate = useNavigate();


    return (
        <>
            {token
                ?
                <>
                    <div className="text-3xl text-white bg-slate-900 font-medium px-10 py-3">Events</div>
                    <section className="flex flex-wrap bg-slate-900 justify-center">
                        {
                            events.slice().reverse().map((event) => (
                                <div key={event?._id} className="mx-5 my-3 w-[325px] border bg-slate-800 border-gray-700 rounded-sm">
                                    <div className="flex flex-col">
                                        <div className="m-3">
                                            <div className="h-48">
                                                <div className=" font-medium text-white text-2xl text-justify">{event?.name}</div>
                                                <p className="text-white p-1">•&nbsp;{event?.createdAt.slice(0, 10)}</p>
                                                <hr className="text-white my-2" />
                                                <p className="text-justify text-white">{(event?.description.length > 50) ? `${event?.description.slice(0, 50)} . . .` : event?.description}</p>
                                            </div>
                                            <button onClick={() => navigate(`/campuspulse/event-details/${event._id}`)} value="View Event" className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs transition hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-gray-700 mt-2 align-center">View Event</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </section>
                </>
                : <RequestLogin />
            }
        </>
    )
}

export default Events