import { useDispatch } from 'react-redux';
import { Link } from 'react-router'
import { logout } from '../redux/features/auth/authSlice';

const Home = () => {

    const dispatch = useDispatch()

    return (
        <>
            <Link to="/campuspulse/login">Login</Link>
            {" "}
            <Link to="/campuspulse/signup">signup</Link>
            {" "}
            <Link to="/campuspulse/events">Events</Link>
            {" "}
            <Link to="/campuspulse/about">About</Link>
            {" "}
            <button onClick={() => dispatch(logout())} className="block py-2 px-3 md:p-0 transition text-gray-900 rounded-sm hover:bg-gray-900 md:hover:bg-transparent md:hover:text-red-700 md:dark:hover:text-red-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer hover:underline">Logout</button>

            
        </>
    )
}

export default Home