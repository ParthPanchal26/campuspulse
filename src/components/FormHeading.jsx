import Logo from './Logo'

const FormHeading = ({ heading, newLine, className }) => {
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Logo />
            <h2 className={`mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 ${className}`}>
                {newLine
                    ? <>{heading} <br /> {newLine}</>
                    : <>{heading}</>
                }
            </h2>
        </div>
    )
}

export default FormHeading