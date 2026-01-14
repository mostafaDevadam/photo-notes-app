"use client";
import React, { useActionState } from 'react';

type Props = {
    action: (prevState: any, formData: FormData) => void

}
const LoginForm = ({action}: Props) => {
    const [state, formAction] = useActionState(action, null)
    return (
        <form action={formAction} className='space-x-4'>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder='Enter your email'
                    required
                    className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
            </div>
            <div className='mt-3'>
                <label className='block text-sm font-medium text-gray-700'>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder='Enter your password'
                    required
                    className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'

                />
            </div>

            <button type='submit' className="mt-5 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Login</button> 
              
        </form>
    );
}

export default LoginForm;
