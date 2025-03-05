const TextArea = ({ label, value, id, rows, cols, setValue, name, placeholder, className }) => {
    return (
        <div>
            <label htmlFor="email" className="block text-sm/6 m-1 font-medium text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <textarea
                    value={value}
                    rows={rows}
                    cols={cols}
                    onChange={(e) => setValue(e.target.value)}
                    id={id}
                    name={name}
                    required
                    placeholder={placeholder}
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${className}`}
                >{value}</textarea>
            </div>
        </div>
    )
}

export default TextArea