import React from 'react'
import Logo from '../components/Logo'

export const AuthenticationLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-blue-50 to-blue-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm">
                <Logo />
                {children}
            </div></div>
    )
}
