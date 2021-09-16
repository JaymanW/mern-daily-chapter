import React from 'react'

function Header({ onBackOneDay, onForwardOneDay, date }) {
       return (
        <div className="mx-auto w-56 flex justify-between items-center mt-4 py-3 space-x-6">
            <svg onClick={onBackOneDay} className="text-black cursor-pointer w-4" width="26" height="50" viewBox="0 0 26 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 49L1 25L25 1" stroke="currentColor"/>
            </svg>

            <p className="font-light text-2xl">{date}</p>

            <svg onClick={onForwardOneDay} className="cursor-pointer w-4" width="26" height="50" viewBox="0 0 26 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L25 25L1 49" stroke="currentColor"/>
            </svg>
        </div>
    )
}

export default Header
