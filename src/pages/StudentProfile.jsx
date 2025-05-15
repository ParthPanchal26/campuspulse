import { useEffect, useState } from 'react';
import { InputBox, Button } from '../components';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
    const [profile, setProfile] = useState({
        phoneNumber: '',
        birthdate: '',
        enrollmentNumber: '',
        class: '',
        year: '',
        semester: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [hasProfile, setHasProfile] = useState(true);

    const server_uri = import.meta.env.VITE_SERVER_URI;
    const token = useSelector((state) => state?.auth?.token);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${server_uri}/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });
                setProfile(res.data.profile);
                setHasProfile(true);
            } catch (error) {
                console.error(error);
                if (error?.response?.status === 404) {
                    setHasProfile(false);
                } else {
                    toast.error(error?.response?.data?.message || 'Failed to fetch profile');
                }
            }
        };
        fetchProfile();
    }, [token, server_uri]);

    const handleChange = (field, value) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        try {
            const apiMethod = hasProfile ? axios.put : axios.post;

            const res = await apiMethod(`${server_uri}/profile`, {
                phoneNumber: profile.phoneNumber,
                enrollmentNumber: profile.enrollmentNumber,
                birthdate: profile.birthdate,
                class: profile.class,
                year: profile.year,
                semester: profile.semester
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            toast.success(res.data.message || (hasProfile ? 'Profile updated' : 'Profile created'));
            setIsEditing(false);
            setHasProfile(true);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'Failed to save profile');
        }
    };

    if (!hasProfile && !isEditing) {
        setIsEditing(true);
    }

    return (
        <div className='p-6'>
            <div className='flex gap-6 px-6 my-6 items-center'>
                <h1 className='text-3xl font-medium'>Student Profile</h1>
                {hasProfile && (
                    <button onClick={() => setIsEditing(!isEditing)} title="Edit Profile">
                        <svg className="w-6 h-6 text-black cursor-pointer transition-all hover:text-blue-500"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M5 1v3m5-3v3m5-3v3M1 7h7m1.506 3.429 2.065 2.065M19 7h-2M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm6 13H6v-2l5.227-5.292a1.46 1.46 0 0 1 2.065 2.065L8 16Z" />
                        </svg>
                    </button>
                )}
            </div>

            <div className='px-6'>
                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    <div className='flex gap-8 justify-center'>
                        <div className='w-full'>
                            {isEditing ? (
                                <>
                                    <InputBox
                                        placeholder="123 456 7890"
                                        type="text"
                                        label="Phone Number"
                                        id="phoneNumber"
                                        value={profile.phoneNumber}
                                        setValue={(val) => handleChange('phoneNumber', val)}
                                    />
                                    <InputBox
                                        type="date"
                                        label="Birthdate"
                                        id="birthdate"
                                        value={profile.birthdate?.slice(0, 10) || ''}
                                        setValue={(val) => handleChange('birthdate', val)}
                                    />
                                    <InputBox
                                        placeholder="E.g. 4"
                                        type="number"
                                        label="Year"
                                        id="year"
                                        value={profile.year}
                                        setValue={(val) => handleChange('year', val)}
                                    />
                                </>
                            ) : (
                                <>
                                    <p className="block text-xl m-1 text-gray-900">Phone</p>
                                    <p className='py-2'>{profile.phoneNumber}</p>
                                    <hr />
                                    <p className="block text-xl m-1 text-gray-900">Date of Birth</p>
                                    <p className='py-2'>{profile.birthdate?.slice(0, 10)}</p>
                                    <hr />
                                    <p className="block text-xl m-1 text-gray-900">Year</p>
                                    <p className='py-2'>{profile.year}</p>
                                </>
                            )}
                        </div>

                        <div className='w-full'>
                            {isEditing ? (
                                <>
                                    <InputBox
                                        placeholder="12321245763422"
                                        type="text"
                                        label="Enrollment Number"
                                        id="enrollmentNumber"
                                        value={profile.enrollmentNumber}
                                        setValue={(val) => handleChange('enrollmentNumber', val)}
                                    />
                                    <InputBox
                                        placeholder="E.g. 8CE2"
                                        type="text"
                                        label="Class"
                                        id="class"
                                        value={profile.class}
                                        setValue={(val) => handleChange('class', val)}
                                    />
                                    <InputBox
                                        placeholder="E.g. 8"
                                        type="number"
                                        label="Semester"
                                        id="semester"
                                        value={profile.semester}
                                        setValue={(val) => handleChange('semester', val)}
                                    />
                                </>
                            ) : (
                                <>
                                    <p className="block text-xl m-1 text-gray-900">Enrollment No</p>
                                    <p className='py-2'>{profile.enrollmentNumber}</p>
                                    <hr />
                                    <p className="block text-xl m-1 text-gray-900">Class</p>
                                    <p className='py-2'>{profile.class}</p>
                                    <hr />
                                    <p className="block text-xl m-1 text-gray-900">Semester</p>
                                    <p className='py-2'>{profile.semester}</p>
                                </>
                            )}
                        </div>
                    </div>
                    <hr />

                    {isEditing && (
                        <div className="mt-6">
                            <Button type="submit" value={hasProfile ? "Update Profile" : "Create Profile"} />
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default StudentProfile;
