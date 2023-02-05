import * as React from 'react'
import {useAuth} from '../src/context/auth/auth.context'
import {Navigate} from "react-router-dom";

export default function RequireAuth({children}) {
    const {whoAmi} = useAuth()

    if(!whoAmi()) {
        return <Navigate to="/" replace/>
    }

    return children
}
