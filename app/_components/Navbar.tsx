
import Link from 'next/link';
import React from 'react';
import { getToken } from '../_lib/token';
import LogoutButton from './LogoutButton';

const Navbar = async () => {
    const session = await getToken()
    console.log(session)
    return (
        <div className='bg-white shadow-sm'>
            <div className='container mx-auto p-4 flex justify-between items-center'>
                <Link href="/" className='text-xl font-bold text-blue-800'>
                    App
                </Link>
                <div className='flex items-center space-x-4'>
                    
                    {
                        session ? (

                            <>
                                
                                <LogoutButton />
                            </>

                        ) : (
                            <>
                                <Link href="/login" className='hover:text-blue-800 mr-5'>
                                    Login
                                </Link>
                                <Link href="/login" className='hover:text-blue-800 mr-8'>
                                    Register
                                </Link>
                            </>
                        )
                    }

                </div>

                

            </div>
        </div>
    );
}

export default Navbar;
