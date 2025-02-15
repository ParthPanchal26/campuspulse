const Button = ({ type, value }) => {
    return (
        <div>
            <button
                type={type}
                className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs transition hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                {value}
            </button>
        </div>
    )
}

export default Button