import React from 'react';
import { UserAuth } from '../context/AuthContext';

const Home = () => {
    const { user, logOut } = UserAuth();

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <h1 >Account</h1>
            <p>Welcome, {user?.displayName}</p>
            <button onClick={handleSignOut} className='border py-2 px-5 mt-10'>
                Logout
            </button>
        </div>
    );
};

export default Home;