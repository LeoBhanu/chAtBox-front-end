import React from 'react'
import {Dialog, withStyles, Box, Typography, makeStyles, List, ListItem} from '@material-ui/core'
import {GoogleLogin} from 'react-google-login'
import { useContext } from 'react'
import { AccountContext } from '../../context/AccountProvider'
import {clientID} from '../../Constants/data'
import { addUser } from '../../service/api'

const useStyles = makeStyles({
    component :{
        display: 'flex'
    },
    leftComponent :{
        padding : '56px 0 56px 56px'
    },
    title :{
        fontSize : '26px',
        marginBottom : '25px',
        fontFamily: 'Verdana'
    },
    list :{
        '& > *':{
             color : '#0da0ba',
             fontSize : '18px'
        }
    },
    googleButton: {
        display: 'flex',
        alignItems:'center',
        paddingLeft: '20%',
        paddingRight:'20%'
    }
})
const style = {
    dialogPaper : {
        height : '95%',
        width : '65%',
        marginTop : '12%',
        boxShodow : 'none',
        maxWidth : '100%',
        maxHeight : '100%',
        overflow : 'hidden'
    }
}

const Login = ({classes}) => {
    const classname = useStyles();

    const {account, setAccount} = useContext(AccountContext) 

    const onLoginSuccess = async (res) =>{
        console.log(res.profileObj);
        console.log("Login Success");
        setAccount(res.profileObj);
        await addUser(res.profileObj)
    }
    const onLoginFailure = () =>{
        console.log("Login Failure");
    }

    return (
        <div>
        <Dialog open={true} classes={{paper:classes.dialogPaper}} BackdropProps={{style:{backgroundColor:'unset'}}}>
            <Box className={classname.component}>
                <Box className={classname.leftComponent}>
                    <Typography className={classname.title}>To Use chAt Box :</Typography>
                    <List className={classname.list}>
                        <ListItem>1. Click on the google logo on the rise side.</ListItem>
                        <ListItem>2. Login with the email.</ListItem>
                        <ListItem>3. Enjoy chAt Box.</ListItem>
                    </List>
                </Box>
                <Box className={classname.googleButton}>
                    <GoogleLogin clientId={clientID} cookiePolicy={'single_host_origin'} buttonText="LOGIN HERE" isSignedIn={true} onSuccess={onLoginSuccess} onFailure={onLoginFailure} />
                </Box>
            </Box>
        </Dialog>
           
        </div>
    )
}

export default withStyles(style)(Login);

 