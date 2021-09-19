import React from 'react'
import Username from './Username'
import LoginBtn from './LoginBtn'
import LogoutBtn from './LogoutBtn'
import { useAuth0 } from '@auth0/auth0-react'

function Header() {
    const { isAuthenticated, user } = useAuth0();
    
    return (
        <div className="bg-chapter-blue w-full h-12 flex justify-center items-center">
            <div className="container flex items-center justify-between mx-3 md:pl-4 md:pr-8 max-w-4xl">
                <div className="flex justify-center items-center">
                    <svg className="w-8" width="50" height="38" viewBox="0 0 50 38" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path className="text-white" d="M47.9167 4.16667V33.0896L45.8333 33.3333V0C37.7187 0.247917 30.1979 1.5875 24.9958 4.825C19.7958 1.5875 12.2833 0.247917 4.16667 0V33.3333L2.08333 33.0896V4.16667H0V35.4167H18.8687C21.95 35.4167 22.2875 37.5 24.9958 37.5C27.7125 37.5 28.0396 35.4167 31.125 35.4167H50V4.16667H47.9167ZM22.9167 32.5937C18.8625 30.9854 14.2979 29.95 8.33333 29.5021V4.39583C13.2333 4.80625 18.7417 5.80208 22.9167 8.4V32.5937ZM41.6667 29.5021C35.7021 29.95 31.1375 30.9854 27.0833 32.5937V8.4C31.2583 5.80208 36.7667 4.80625 41.6667 4.39583V29.5021V29.5021Z" fill="currentColor"/>
                    </svg>
                    <p className="hidden font-black text-white ml-3 text-lg tracking-widest md:block">DailyChapter.xyz</p>
                </div>
                <div className="display flex items-center text-white space-x-3">
                    <Username />
                    {isAuthenticated ? <img src={user.picture} alt="profile avatar" className="w-9 rounded-full"/> : null}
                    {isAuthenticated ? <LogoutBtn className="underline" /> : <LoginBtn className="underline" />}
                </div>
            </div>
        </div>
    )
}

export default Header
