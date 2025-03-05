const DropDown = ({ label, value, setValue, id, name, className }) => {


    function handleChange(e) {
        let selectValue = e.target.value;
        setValue(selectValue)
    }

    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="block text-sm/6 m-1 font-medium text-gray-900">
                {label}
            </label>
            <select
                type="select"
                value={value}
                onChange={handleChange}
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-950 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${className}`}
                name={name}
                id={id}>
                <option value="" disabled>Select</option>
                <option value="Technical">Technical</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Other">Other</option>
            </select>
        </div>
    )
}

export default DropDown