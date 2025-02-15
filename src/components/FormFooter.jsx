import { Link } from "react-router"

const FormFooter = ({ message, link, linkText }) => {
    return (
        <p className="mt-10 text-center text-sm/6 text-gray-500">
            {message}{' '}
            <Link to={`/campuspulse/${link}/`} className="font-semibold text-indigo-600 transition hover:text-indigo-800">
                {linkText}
            </Link>
        </p>
    )
}

export default FormFooter