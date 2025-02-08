import { Link } from 'react-router'
import Logo from './Logo'

const NavBar = () => {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
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
                            <Link to="/campuspulse/" className="block py-2 px-3 md:p-0 transition text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</Link>
                        </li>

                        <li>
                            <Link to="/campuspulse/events" className="block py-2 px-3 md:p-0 transition text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Events</Link>
                        </li>

                        <li>
                            <Link to="/campuspulse/about" className="block py-2 px-3 md:p-0 transition text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</Link>
                        </li>

                        <li>
                            <Link to="/campuspulse/login" className="block py-2 px-3 md:p-0 transition text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Sign-In</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default NavBar