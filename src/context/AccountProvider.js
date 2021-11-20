import React, { createContext, useState, useRef, useEffect } from 'react'
import {io} from 'socket.io-client'

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {

    const [account, setAccount] = useState(); 
    const [activeUsers, setActiveUsers] = useState([])
    const socket = useRef()
    const [newMessageFlag, setNewMessageFlag] = useState(false);

    useEffect(() => {
       socket.current = io('ws://localhost:9000')
    }, [])

    return (
        <div>
            <AccountContext.Provider value={{
                account,
                setAccount,
                socket,
                setActiveUsers,
                activeUsers,
                newMessageFlag,
                setNewMessageFlag
            }}>
                {children}
            </AccountContext.Provider>
        </div>
    )
}

export default AccountProvider
