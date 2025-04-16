import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';

const useUserId = () => {
    const token = useSelector((state) => state?.auth?.token);

    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.userId;
    } catch (err) {
        console.error("Invalid token:", err.message);
        return null;
    }
};

export default useUserId;