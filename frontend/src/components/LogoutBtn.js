import React from 'react'
import { useAuth0 } from "@auth0/auth0-react"

function LogoutBtn() {
    const { logout } = useAuth0();
    
    return (
        <button className="underline text-sm" onClick={() => logout({ returnTo: "https://dailychapter.xyz/"})} >Log Out</button>
    )
}

export default LogoutBtn;