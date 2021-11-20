import React from 'react'
import { getUsers } from '../../service/api'
import { useEffect, useState, useContext } from 'react'
import { Box, makeStyles, Divider } from '@material-ui/core'

import  Conversation  from '../../../src/components/menu/Conversation'
import { AccountContext } from '../../context/AccountProvider'


const useStyles = makeStyles({
    component: {
        overflow: 'overlay',
        height: '81vh'
    },
    divider: {
        margin: '0 0 0 67px',
        backgroundColor: '#F2F2F2'
    }
})

const Conversations = ({ text }) => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const { account, socket, setActiveUsers } = useContext(AccountContext)

    useEffect(()=>{
        const fetchUsers = async () =>{
            const data = await getUsers();
            console.log("usersdata",data)
            const filteredData = data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()))
            setUsers(filteredData);
            console.log("filtereddata",filteredData);
        }
        fetchUsers();
    }, [text])

    useEffect(()=>{
        socket.current.emit('addUser', account.googleId)
        socket.current.on('getUsers',users =>{
            setActiveUsers(users);
        })
    }, [account])

    return (
        <Box className={classes.component}>
            {
                users && users.map((user, index) => (
                    user.googleId !== account.googleId && 
                        <>
                            <Conversation user={user} />
                            {
                                users.length !== (index + 1)  && <Divider className={classes.divider} />
                            }
                        </>
                ))
            }
        </Box>
    )
}

export default Conversations
