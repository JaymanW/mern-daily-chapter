import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function Username() {
    const { user, isAuthenticated } = useAuth0();

    console.log(user)
    
    return (
        isAuthenticated && (
            <div>
                <p className="username">{user.name}</p>
            </div>
            
        )  
    );
};

export default Username