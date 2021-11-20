import {useContext, useState} from 'react'
import React from 'react'
import { Box, makeStyles} from '@material-ui/core'
import { Chat } from '@material-ui/icons';
import { AccountContext } from '../../context/AccountProvider';
import HeaderMenu from './HeaderMenu';
import UserInfo from '../drawer/UserInfo';

const useStyles = makeStyles({
    header: {
        height: 40,
        background: '#ededed',
        display: 'flex',
        padding: '10px 16px',
        alignItems: 'center'
    },
    chatIcons: {
        marginLeft: 'auto',
        display : 'flex',
        '& > *': {
            marginLeft: 2,
            padding: 8,
            color: '#919191'
        },
        '& :first-child': {
            fontSize: 25,
            marginRight: 8,
            marginTop: 3
        }
    },
    avatar: {
        height: 37,
        width: 37,
        borderRadius: '50%'
    }
})

const Header = () => {
    const classes = useStyles();
    const { account } = useContext(AccountContext);
    const [open, setOpen] = useState(false)
   
    const toggleUserInfo = ()=>{
        console.log("profile drawer");
        setOpen(true)
    }

    return (
        <>
            <Box className={classes.header}>
                <img src={account.imageUrl} onClick={()=>toggleUserInfo()} className={classes.avatar} alt="DP" />
                <Box className={classes.chatIcons}>
                    <Chat/>
                    <HeaderMenu/>
                </Box>
            </Box>
            <UserInfo open={open} setOpen={setOpen} />
        </>
    )
}

export default Header
