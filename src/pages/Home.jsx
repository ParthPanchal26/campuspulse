import { Link } from 'react-router'

const Home = () => {
    return (
        <>
            <Link to="/campuspulse/login">Login</Link>
            {" "}
            <Link to="/campuspulse/signup">signup</Link>
        </>
    )
}

export default Home