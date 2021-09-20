import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';

function Comment({ username, comment, commentID, date, profileImg, refresh }) {
    const [isReadyToTrash, setIsReadyToTrash] = useState(false);
    const { isAuthenticated, user } = useAuth0();

    const toggleTrashReady = () => {
        setIsReadyToTrash(isReadyToTrash => !isReadyToTrash)
    }

    const deleteComment = async () => {
        await axios.delete(`https://daily-chapter-backend.herokuapp.com/api/comment/${date}`, {
            data: {
                commentID: commentID
            }    
        })
        refresh();
    }
    
    return (
        isReadyToTrash === true ?
        <div className="flex justify-center items-center space-x-6">
            <button onClick={toggleTrashReady}>
                <svg className="w-6" width="50" height="54" viewBox="0 0 50 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="text-chapter-blue" d="M42.155 7.84036C31.8489 -2.4679 15.2436 -2.59737 4.75234 7.40508L0 2.36479V20.0839H16.7057L12.094 15.1932C18.3888 9.15289 28.3823 9.21986 34.5789 15.4164C44.2688 25.1064 38.4562 42.8523 22.3219 42.8523V53.5668C30.5989 53.5668 37.0857 50.79 42.155 45.7207C52.615 35.2606 52.615 18.3004 42.155 7.84036V7.84036Z" fill="currentColor"/>
                </svg>
            </button>
            <button onClick={deleteComment}>
                <svg className="w-5 ml-3 mr-3 " width="50" height="60" viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
                    <path className="text-chapter-blue" d="M17.5 47.5C17.5 48.88 16.38 50 15 50C13.62 50 12.5 48.88 12.5 47.5V22.5C12.5 21.12 13.62 20 15 20C16.38 20 17.5 21.12 17.5 22.5V47.5ZM27.5 47.5C27.5 48.88 26.38 50 25 50C23.62 50 22.5 48.88 22.5 47.5V22.5C22.5 21.12 23.62 20 25 20C26.38 20 27.5 21.12 27.5 22.5V47.5ZM37.5 47.5C37.5 48.88 36.38 50 35 50C33.62 50 32.5 48.88 32.5 47.5V22.5C32.5 21.12 33.62 20 35 20C36.38 20 37.5 21.12 37.5 22.5V47.5ZM50 5V10H0V5H14.2775C16.5275 5 18.355 2.2525 18.355 0H31.6425C31.6425 2.2525 33.4675 5 35.72 5H50ZM42.5 15V55H7.5V15H2.5V60H47.5V15H42.5Z" fill="currentColor"/>
                </svg>
            </button>
        </div>
        :
        <div className="flex justify-center items-start space-x-4">
            {
                !isAuthenticated ? 
                <img src={profileImg} alt="profile avatar" className="w-11 rounded-full"/>
                : 
                user.name === username ?
                <button onClick={toggleTrashReady} className="relative">
                    {/* <svg className="w-5 ml-3 mr-2" width="50" height="60" viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
                        <path className="text-chapter-blue" d="M17.5 47.5C17.5 48.88 16.38 50 15 50C13.62 50 12.5 48.88 12.5 47.5V22.5C12.5 21.12 13.62 20 15 20C16.38 20 17.5 21.12 17.5 22.5V47.5ZM27.5 47.5C27.5 48.88 26.38 50 25 50C23.62 50 22.5 48.88 22.5 47.5V22.5C22.5 21.12 23.62 20 25 20C26.38 20 27.5 21.12 27.5 22.5V47.5ZM37.5 47.5C37.5 48.88 36.38 50 35 50C33.62 50 32.5 48.88 32.5 47.5V22.5C32.5 21.12 33.62 20 35 20C36.38 20 37.5 21.12 37.5 22.5V47.5ZM50 5V10H0V5H14.2775C16.5275 5 18.355 2.2525 18.355 0H31.6425C31.6425 2.2525 33.4675 5 35.72 5H50ZM42.5 15V55H7.5V15H2.5V60H47.5V15H42.5Z" fill="currentColor"/>
                    </svg> */}
                    <img src={profileImg} alt="profile avatar" className="w-11 rounded-full"/>
                    <svg className="absolute -right-1 -bottom-2 w-6 h-6 shadow-md rounded-full" width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="25" cy="25" r="25" fill="white"/>
                        <path d="M21.25 33.75C21.25 34.44 20.69 35 20 35C19.31 35 18.75 34.44 18.75 33.75V21.25C18.75 20.56 19.31 20 20 20C20.69 20 21.25 20.56 21.25 21.25V33.75ZM26.25 33.75C26.25 34.44 25.69 35 25 35C24.31 35 23.75 34.44 23.75 33.75V21.25C23.75 20.56 24.31 20 25 20C25.69 20 26.25 20.56 26.25 21.25V33.75ZM31.25 33.75C31.25 34.44 30.69 35 30 35C29.31 35 28.75 34.44 28.75 33.75V21.25C28.75 20.56 29.31 20 30 20C30.69 20 31.25 20.56 31.25 21.25V33.75ZM37.5 12.5V15H12.5V12.5H19.6387C20.7637 12.5 21.6775 11.1263 21.6775 10H28.3212C28.3212 11.1263 29.2338 12.5 30.36 12.5H37.5ZM33.75 17.5V37.5H16.25V17.5H13.75V40H36.25V17.5H33.75Z" fill="#0080FF"/>
                    </svg>
                </button>
                :
                <img src={profileImg} alt="profile avatar" className="w-11 rounded-full"/>
                // <img src={profileImg} alt="profile avatar" className="w-9 rounded-full"/>
            }
            <div className="flex flex-col w-full">
                <p className="font-bold">{username}</p>
                <p>{comment}</p>
            </div>
        </div>
    )
}

export default Comment
