const Button = ({ type, value, className }) => {
    return (
        <div>
            <button
                type={type}
                className={`flex mt-2 w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs transition hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className ? `${className}` : `bg-slate-600`}`}
            >
                {value}
            </button>
        </div>
    )
}

export default Button