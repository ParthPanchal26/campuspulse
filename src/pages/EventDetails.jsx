import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"

const EventDetails = () => {

    const param = useParams()

    const [eventData, setEventData] = useState({})
    const [expired, setExpired] = useState(false)
    const [tags, setTags] = useState([])
    const server_uri = import.meta.env.VITE_SERVER_URI
    const token = useSelector((state) => state?.auth?.token);

    const getEvents = async () => {
        const response = await fetch(`${server_uri}/events/${param.id}`)

        if (!response) throw new Error("Couldn't fetch events")

        const data = await response.json()
        setEventData(data.event)

        if (eventData.isExpired === true) setExpired(true)

        if (data.event.tags && data.event.tags.length > 0) {
            const extractedTags = data.event.tags[0]
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
        console.log(eventData);
        console.log(tags)
    }, [eventData])


    return (
        <section className="p-6 flex bg-slate-900 flex-col gap-2 w-[1536px] m-auto max-w-full sm:w-auto md:w-[1536px]">
            <div className="rounded-lg md:p-8" id="about" role="tabpanel" aria-labelledby="about-tab">

                <section className="m-1">
                    <div className="flex flex-col sm:flex-row m-2 sm:m-0 sm:justify-between items-center">
                        <div className="text-white">
                            <div className="text-4xl font-medium p-0.5">{eventData.name}</div>
                            <div className="flex gap-1 font-medium p-2">
                                <span>{eventData.category}</span>
                                <span className='text-slate-100'>•</span>
                                <span>{eventData.venue}</span>
                            </div>
                        </div>
                        <div className="self-center my-1">
                            {expired
                                ? <h2 className="bg-slate-950 border border-slate-500 px-10 rounded-sm transition-all py-3 text-xl font-medium text-red-500">Expired</h2>
                                : <button className="bg-gray-800 px-10 rounded-sm transition-all hover:bg-gray-950 hover:text-blue-400 hover:border hover:border-blue-400 py-3 text-xl font-medium text-white">Apply</button>
                            }
                        </div>
                    </div>
                    <hr className="text-white" />
                </section>

                <section className="m-1">
                    <div className="flex flex-row m-auto justify-center gap-3 flex-wrap max-w-[1024px] items-center my-3 font-medium">
                        <p className="bg-gray-800 px-6 py-3 rounded-sm text-left  transition-all hover:bg-slate-950  text-white">Email&nbsp;-&nbsp;{eventData?.contactEmail}</p>
                        <p className="bg-gray-800 px-6 py-3 rounded-sm text-left  transition-all hover:bg-slate-950  text-white">Contact&nbsp;-&nbsp;+91&nbsp;{eventData?.contactPhone}</p>
                        <p className="bg-gray-800 px-6 py-3 rounded-sm text-left  transition-all hover:bg-slate-950  text-white">Start Date&nbsp;-&nbsp;{eventData.date?.slice(0, 10)}</p>
                        <p className="bg-gray-800 px-6 py-3 rounded-sm text-left  transition-all hover:bg-slate-950  text-white">Deadline&nbsp;-&nbsp;{eventData.registrationDeadline?.slice(0, 10)}</p>
                    </div>
                    {/* <hr className="text-white" /> */}
                </section>

                <section className="m-1">
                    <div className="flex flex-col py-3 px-2">
                        <h3 className="text-white font-semibold text-2xl mb-2">Description</h3>
                        <p className="text-justify text-white">{eventData.description}</p>
                    </div>
                    {/* <hr className="text-white" /> */}
                </section>

                <section className="m-1">
                    <div className="flex flex-row m-auto justify-center gap-3 flex-wrap max-w-[1024px] items-center my-3 font-medium">
                        <p className="bg-gray-800 px-8 py-5 rounded-sm text-left  transition-all hover:bg-slate-950  text-white">Organized By&nbsp;-&nbsp;{eventData?.organizedBy}</p>
                        <p className="bg-gray-800 px-8 py-5 rounded-sm text-left  transition-all hover:bg-slate-950  text-white">Price&nbsp;-&nbsp;{eventData?.price === 0 ? "Free" : eventData?.price}</p>
                        <p className="bg-gray-800 px-8 py-5 rounded-sm text-left  transition-all hover:bg-slate-950  text-white">Time&nbsp;-&nbsp;{eventData?.time}</p>
                        <p className="bg-gray-800 px-8 py-5 rounded-sm text-left  transition-all hover:bg-slate-950  text-white">Total Seats&nbsp;-&nbsp;{eventData.totalSeats}</p>
                        <p className="bg-gray-800 px-8 py-5 rounded-sm text-left  transition-all hover:bg-slate-950  text-white">Available Seats&nbsp;-&nbsp;{eventData.availableSeats}</p>
                    </div>
                    {/* <hr className="text-white" /> */}
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
                    <hr className="text-white" />

            </div>
        </section>
    )
}

export default EventDetails