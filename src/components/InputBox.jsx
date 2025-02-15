import { Link } from "react-router"

const InputBox = ({ type, label, value, setValue, id, name, placeholder, className, from }) => {

    let setForPassword = false

    if (from === 'login') setForPassword = true

    return (
        <div>
            {setForPassword
                ?
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                        {label}
                    </label>
                    <div className="text-sm">
                        <Link to="/campuspulse/forgotPassword" className="font-semibold text-indigo-600 transition hover:text-indigo-800">Forgot password?</Link>
                    </div>
                </div>
                : <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    {label}
                </label>}
            <div className="mt-2">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    id={id}
                    name={name}
                    type={type}
                    required
                    placeholder={placeholder}
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${className}`}
                />
            </div>
        </div>
    )

}

export default InputBox