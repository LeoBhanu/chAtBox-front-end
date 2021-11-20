import { MoreVert } from '@material-ui/icons'
import React from 'react'
import { useState, useContext } from 'react';
import { Menu, MenuItem, makeStyles } from '@material-ui/core';
import { GoogleLogout } from 'react-google-login';
import { clientID } from '../../Constants/data';
import { AccountContext } from '../../context/AccountProvider';
import UserInfo from '../drawer/UserInfo';

const useStyle = makeStyles({
    menuItem: {
        fontSize: 14,
        padding: '15px 60px 5px 24px',
        color: '#4A4A4A'
    },
    logout: {
        border:'none!important', 
        boxShadow: 'none!important',
    }
})

const HeaderMenu = () => {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    
    const { setAccount } = useContext(AccountContext);


    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setAccount('');
    };

    const toggleDrawer = () => {
        setOpenDrawer(true);
    }

    return (
        <>
            <MoreVert onClick={handleClick} />
            <Menu
            anchorEl={open}
            keepMounted
            open={open}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
        <MenuItem className={classes.menuItem} onClick={() => { handleClose(); toggleDrawer()}}>Profile</MenuItem>
        <MenuItem className={classes.menuItem} onClick={() => { handleClose(); }}>
            <GoogleLogout
                clientId={clientID}
                buttonText="Logout"
                onLogoutSuccess={onSignoutSuccess}
                className={classes.logout}
            >
            </GoogleLogout> 
        </MenuItem>
    </Menu>
    <UserInfo open={openDrawer} setOpen={setOpenDrawer} />

        </>
    )
}

export default HeaderMenu;
