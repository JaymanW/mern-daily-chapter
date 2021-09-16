import React, { useState, useEffect } from 'react'
import moment from 'moment';

function Header() {
    const [offset, setOffset] = useState(0);
    const [date, setDate] = useState(moment().format("MM-DD-YYYY"))

    useEffect(() => {
        const newDate = moment().subtract(offset, 'days').format("MM-DD-YYYY");
        setDate(newDate)
    }, [offset])
    
    const handleBackOneDay = () => {
        setOffset(offset => offset + 1);
    }

    const handleForwardOneDay = () => {
        if (offset > 0) {
            setOffset(offset => offset - 1);
        }
    }
    
    return (
        <div className="mx-auto w-56 flex justify-between items-center mt-4 py-3 space-x-6">
            <svg onClick={handleBackOneDay} className="text-black cursor-pointer" width="26" height="50" viewBox="0 0 26 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 49L1 25L25 1" stroke="currentColor"/>
            </svg>

            <p className="font-light text-2xl">{date}</p>

            <svg onClick={handleForwardOneDay} className="cursor-pointer" width="26" height="50" viewBox="0 0 26 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L25 25L1 49" stroke="currentColor"/>
            </svg>
        </div>
    )
}

export default Header
