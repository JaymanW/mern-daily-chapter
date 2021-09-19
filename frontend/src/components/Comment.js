import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';

function Comment({ username, comment, commentID, date, refresh }) {
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
                <svg className="w-12" width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                    <path className="text-black" d="M25 0C11.1937 0 0 11.1937 0 25C0 38.8062 11.1937 50 25 50C38.8062 50 50 38.8062 50 25C50 11.1937 38.8062 0 25 0ZM41.1521 38.1354C40.6083 36.9146 39.5083 36.0708 37.2542 35.55C32.4771 34.4479 28.0292 33.4812 30.1854 29.4146C36.7375 17.0354 31.9208 10.4167 25 10.4167C17.9417 10.4167 13.2417 17.2896 19.8146 29.4146C22.0354 33.5062 17.4229 34.4708 12.7458 35.55C10.4875 36.0708 9.39583 36.9208 8.85625 38.1458C5.92917 34.5562 4.16667 29.9812 4.16667 25C4.16667 13.5125 13.5125 4.16667 25 4.16667C36.4875 4.16667 45.8333 13.5125 45.8333 25C45.8333 29.9771 44.0729 34.5479 41.1521 38.1354Z" fill="currentColor"/>
                </svg>
                : 
                user.name === username ?
                <button onClick={toggleTrashReady}>
                    <svg className="w-5 ml-3 mr-2" width="50" height="60" viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
                        <path className="text-chapter-blue" d="M17.5 47.5C17.5 48.88 16.38 50 15 50C13.62 50 12.5 48.88 12.5 47.5V22.5C12.5 21.12 13.62 20 15 20C16.38 20 17.5 21.12 17.5 22.5V47.5ZM27.5 47.5C27.5 48.88 26.38 50 25 50C23.62 50 22.5 48.88 22.5 47.5V22.5C22.5 21.12 23.62 20 25 20C26.38 20 27.5 21.12 27.5 22.5V47.5ZM37.5 47.5C37.5 48.88 36.38 50 35 50C33.62 50 32.5 48.88 32.5 47.5V22.5C32.5 21.12 33.62 20 35 20C36.38 20 37.5 21.12 37.5 22.5V47.5ZM50 5V10H0V5H14.2775C16.5275 5 18.355 2.2525 18.355 0H31.6425C31.6425 2.2525 33.4675 5 35.72 5H50ZM42.5 15V55H7.5V15H2.5V60H47.5V15H42.5Z" fill="currentColor"/>
                    </svg>
                </button>
                :
                <svg className="w-12" width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                    <path className="text-black" d="M25 0C11.1937 0 0 11.1937 0 25C0 38.8062 11.1937 50 25 50C38.8062 50 50 38.8062 50 25C50 11.1937 38.8062 0 25 0ZM41.1521 38.1354C40.6083 36.9146 39.5083 36.0708 37.2542 35.55C32.4771 34.4479 28.0292 33.4812 30.1854 29.4146C36.7375 17.0354 31.9208 10.4167 25 10.4167C17.9417 10.4167 13.2417 17.2896 19.8146 29.4146C22.0354 33.5062 17.4229 34.4708 12.7458 35.55C10.4875 36.0708 9.39583 36.9208 8.85625 38.1458C5.92917 34.5562 4.16667 29.9812 4.16667 25C4.16667 13.5125 13.5125 4.16667 25 4.16667C36.4875 4.16667 45.8333 13.5125 45.8333 25C45.8333 29.9771 44.0729 34.5479 41.1521 38.1354Z" fill="currentColor"/>
                </svg>
            }
            <div className="flex flex-col w-full">
                <p className="font-bold">{username}</p>
                <p>{comment}</p>
            </div>
        </div>
    )
}

export default Comment
