import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import useUserId from '../hooks/userDecoder'

const Manage = () => {

  const [createdEvents, setCreatedEvents] = useState([])

  const server_uri = import.meta.env.VITE_SERVER_URI;
  const token = useSelector((state) => state?.auth?.token);
  const userId = useUserId()

  useEffect(() => {
    const organizedEvents = async () => {
      try {
        const events = await axios.get(`${server_uri}/events/organizer/events`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        })

        const allEvents = events.data
        let filteredEvents = allEvents.filter(event =>
          event.organizerId === userId
        )
        // console.log(filteredEvents);
        // console.log(userId)

        setCreatedEvents(filteredEvents)
        // console.log(orgEvents);
      } catch (error) {
        console.log(error)
      }
    }
    organizedEvents();

  }, [])

  return (
    <section className='m-6'>
      <h1 className="text-2xl font-medium">My Events</h1>

      <div className="relative overflow-x-auto mt-3">
        <table className="w-full text-sm text-left rtl:text-right text-slate-900">
          <thead className="text-xs text-gray-700 uppercase bg-slate-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Event
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Venue
              </th>
              <th scope="col" className="px-6 py-3">
                Registration Date
              </th>
              <th scope="col" className="px-6 py-3">
                View Link
              </th>
              <th scope="col" className="px-6 py-3">
                Edit Link
              </th>
              <th scope="col" className="px-6 py-3">
                Participants
              </th>
            </tr>
          </thead>
          {
            createdEvents && createdEvents.slice().reverse().map((event) => (
              <tbody key={event.id}>
                <tr className="bg-slate-50 border-b border-gray-300">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                    {event?.name.slice(0, 20)}
                  </th>
                  <td className="px-6 py-4">
                    {event?.category}
                  </td>
                  <td className="px-6 py-4">
                    {event?.date.slice(0, 10)}
                  </td>
                  <td className="px-6 py-4">
                    {event?.venue.slice(0, 20)}
                  </td>
                  <td className="px-6 py-4">
                    {event?.registrationDeadline.slice(0, 10)}
                  </td>
                  <td className='px-6 py-4 text-blue-500 underline underline-offset-1'>
                    <Link to={`/campuspulse/event-details/${event?._id}`}>
                      View
                    </Link>
                  </td>
                  <td className='px-6 py-4 text-blue-500 underline underline-offset-1'>
                    <Link to={`/campuspulse/event-edit/${event?._id}`}>
                      Edit
                    </Link>
                  </td>
                  <td className='px-6 py-4 text-blue-500 underline underline-offset-1'>
                    <Link to={`/campuspulse/event-participants/${event?._id}`}>
                      Participants
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))
          }
        </table>
      </div>



    </section>
  )
}

export default Manage