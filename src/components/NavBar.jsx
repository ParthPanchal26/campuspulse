import { Link, NavLink, useNavigate } from 'react-router'
import Logo from './Logo'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/features/auth/authSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const NavBar = () => {

    const token = useSelector((state) => state?.auth?.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const server_uri = import.meta.env.VITE_SERVER_URI
    const [userRole, setUserRole] = useState('Student');

    function handleLogout() {
        dispatch(logout());
        navigate("/campuspulse/");
        toast.success("Sign-out successfully")
    }

    const getUserRole = async () => {
        try {
            const response = await axios.get(`${server_uri}/auth/whoami`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            })

            setUserRole(response.data.role)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (token) getUserRole();
    }, [token])

    return (
        <nav className="bg-white border-b-1 border-gray-500 dark:bg-gray-900 fixed top-0 left-0 w-full z-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <Link to="/campuspulse/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Logo />

                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CampusPulse</span>
                </Link>

                <div className="flex md:order-2 items-center mr-4 md:space-x-0 rtl:space-x-reverse md:hidden">
                    <span className="sr-only">Open main menu</span>

                    <svg className="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </div>

                <div className=" hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <ul className="flex items-center flex-col font-medium p-4 md:p-0 mt-4 border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                        <li>
                            <NavLink
                                to="/campuspulse"
                                end
                                className={({ isActive }) =>
                                    isActive
                                        ? "block py-2 px-3 md:p-0 transition text-blue-400"
                                        : "block py-2 px-3 md:p-0 transition text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                }
                            >
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/campuspulse/events"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block py-2 px-3 md:p-0 transition text-blue-400"
                                        : "block py-2 px-3 md:p-0 transition text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                }
                            >
                                Events
                            </NavLink>
                        </li>

                        {
                            token && userRole && userRole !== 'Student' && (
                                <li>
                                    <NavLink
                                        to="/campuspulse/create-event"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "block py-2 px-3 md:p-0 transition text-blue-400"
                                                : "block py-2 px-3 md:p-0 transition text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                        }
                                    >
                                        Create Event
                                    </NavLink>
                                </li>)
                        }


                        {
                            token && userRole && userRole === 'Student' && (
                                <li>
                                    <NavLink
                                        to="/campuspulse/student-profile"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "block py-2 px-3 md:p-0 transition text-blue-400"
                                                : "block py-2 px-3 md:p-0 transition text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                        }
                                    >
                                        Profile
                                    </NavLink>
                                </li>
                            )
                        }

                        <li>
                            {token
                                ? <button onClick={handleLogout} className="block py-2 px-3 md:p-0 transition text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer hover:underline">Logout</button>
                                : <NavLink
                                    to="/campuspulse/login"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "block py-2 px-3 md:p-0 transition text-blue-400"
                                            : "block py-2 px-3 md:p-0 transition text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    }
                                >
                                    Sign-In
                                </NavLink>
                            }
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default NavBar