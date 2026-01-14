"use client";

import React from 'react';
import { useRouter } from 'next/router';
import { logoutAction } from '../actions/auth.actions';

const LogoutButton = () => {
    

    const handleClick = async () => {
        try {
           // toast("Logging out...")
            await logoutAction()
           
            
        } catch (error) {
            //toast("Logout failed!")
            console.log("Logout failed: ", error);
        }
        
    }
    return (
        <div>
            <button onClick={handleClick} className="bg-red-500 hover:bg-red-600 transition-colors cursor-pointer text-white font-bold py-2 px-4 rounded-md">
              Logout
            </button>
        </div>
    );
}

export default LogoutButton;
