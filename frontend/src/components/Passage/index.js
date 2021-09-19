import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './Passage.css'

function Passage({ date }) {
    const [passage, setPassage] = useState()

    useEffect(() => {
        axios.get(`https://daily-chapter-backend.herokuapp.com/api/${date}`)
            .then(function (response) {
                // handle success
                setPassage(response.data[0].content);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setPassage(`Sorry, this day doesn't exist!`);
            })
            .then(function () {
                // always executed
            });
    }, [date]);
    
    return (
        <div>
            <div id="verse-cnt" className="container mx-auto max-w-4xl px-4" dangerouslySetInnerHTML={{ __html: passage }} />
        </div>
    )
}

export default Passage
