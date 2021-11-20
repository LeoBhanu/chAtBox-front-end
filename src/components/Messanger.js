import React, { useContext } from 'react'
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
import Login from './account/login';
import { AccountContext } from '../context/AccountProvider';
import MyChatBox from './MyChatBox';

const useStyles = makeStyles({
    loginHeader: {
        background: '#0da0ba',
        boxShadow: 'none',
        height: 200
    }
})
const Messanger = () => {
    const classes = useStyles();
    const { account } = useContext(AccountContext)
    return (
        <React.Fragment>
            <AppBar className={classes.loginHeader}>
                <Toolbar></Toolbar>
            </AppBar>
            {account ? <MyChatBox/> : <Login />}
        </React.Fragment>

    )
}

export default Messanger;