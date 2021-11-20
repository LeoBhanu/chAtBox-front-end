import React from 'react'
import {Box, Dialog, withStyles, makeStyles } from '@material-ui/core'
import Menu from './menu/Menu'
import ChattingArea from './Chat/ChattingArea'
import { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import EmptyChat from './Chat/EmptyChat'

const useStyles = makeStyles({
    component : {
        display : 'flex'
    },
    leftComponent : {
        minWidth : '30%',
        backgroundColor:'white'
    },
    rightComponent : {
        borderLeft : `5px solid #ededed`,
        width : '70%',
        minWidth : '30%',
        height : '100%'
    }
})

const style = {
    dialogPaper : {
        height : '95%',
        width : '90%',
        boxShodow : 'none',
        maxWidth : '100%',
        maxHeight : '100%',
        overflow : 'hidden'
    }
}

const MyChatBox = ({classes}) => {
    const classname = useStyles();
    const { person } = useContext(UserContext)
    return (
        <Dialog
            open={true}
            classes={{paper:classes.dialogPaper}}
            BackdropProps={{style:{backgroundColor:'unset'}}}>
            <Box className={classname.component}>
                <Box className={classname.leftComponent}>
                    <Menu />
                </Box>
                <Box className={classname.rightComponent}>
                    {
                        Object.keys(person).length ? <ChattingArea /> : <EmptyChat />
                    }
                </Box>
            </Box>    
        </Dialog>
    )
}

export default withStyles(style)(MyChatBox)
