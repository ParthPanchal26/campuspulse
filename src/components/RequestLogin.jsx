import { Link } from 'react-router'

const requestLogin = () => {
    return (
        <section className="bg-slate-100 h-[86vh] py-[70px] dark:bg-dark text-center">
            <div className="mx-auto px-4 sm:container">
                <div>
                    <h2 className="mb-2 text-2xl font-semibold text-dark dark:text-slate-800">
                        Please login to view page
                    </h2>
                    <p className="text-body-color dark:text-dark-6">
                        <Link to="/campuspulse/login/" className="font-semibold text-xl text-indigo-500 transition hover:text-blue-700">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default requestLogin