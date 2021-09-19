import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

import Comment from './Comment'

function CommentCnt({ date }) {
    const [newComment, setNewComment] = useState('');
    const [existingComments, setExistingComments] = useState([]);
    
    const { isAuthenticated, user } = useAuth0();

    useEffect(() => {
        getComments();
    }, [])

    useEffect(() => {
        getComments();
    }, [date])

    const getComments = () => {
        axios.get(`https://daily-chapter-backend.herokuapp.com/api/comment/${date}`)
        .then((response) => {
            setExistingComments(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleChange = (e) => {
        setNewComment(e.target.value)
    }

    const handleSubmit = () => {
        axios.post(`https://daily-chapter-backend.herokuapp.com/api/comment/${date}`, {
            username: user.name,
            comment: newComment
        })
        setNewComment('');
        getComments();
    }
    
    return (
        <div className="container mx-auto max-w-4xl px-4 py-10">
            <hr className="mx-auto w-12 bg-chapter-blue h-1 mt-4" />
            {
                isAuthenticated ?
                <div className="mt-4 flex justify-center items-center space-x-3 md:space-x-6">
                    {/* <img src={user.picture} alt="profile avatar" className="w-9 h-9 rounded-full"/> */}
                    <input className="border-b-2 w-full focus:outline-none" placeholder="Add comment..." onChange={handleChange} value={newComment}/>
                    <button onClick={handleSubmit}>
                        <svg className="w-6" width="50" height="50" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path className="text-chapter-blue" d="M0 25L22.9167 31.4583L37.5 14.5833L20.5083 26.4L11.525 23.8958L43.5292 7.89583L35.25 38.25L27.4375 31.2937L22.9167 37.3875V35.7854L18.75 34.6187V50L28.0687 37.4354L37.5 45.8333L50 0L0 25Z" fill="currentColor"/>
                        </svg>
                    </button>
                </div>
                :
                <p className="mt-4">*Please log in to leave a comment.</p>
            }
            <div className="mt-8 space-y-4">
                {
                existingComments.length === 0 ?
                null
                :
                existingComments.map(comment => {
                    return <Comment key={comment.id} username={comment.username} comment={comment.comment} date={date} commentID={comment.id} refresh={getComments} />
                })
                }
            </div>
        </div>
    )
}

export default CommentCnt