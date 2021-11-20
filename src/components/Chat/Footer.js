import React from 'react'
import { useState } from 'react';
import { EmojiEmotionsOutlined, AttachFile, Mic } from '@material-ui/icons';
import { Box, makeStyles, InputBase } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    footer: {
        height: '63px',
        background: '#ededed',
        // position: 'absolute',
        width: '100%',
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        padding: '5px 15px',
        '&  >*': {
            margin: 5,
            color: '#919191'
        }
    },
    search: {
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        width: 'calc(94% - 100px)'
    },
    inputRoot: {
        width: '100%'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: 25,
        fontSize: 18,
        height: 25,
        width: '100%'
    },
    clipIcon: {
        transform: 'rotate(40deg)'
    }
}));


const Footer = ({ sendText, value, setValue }) => {
    const classes = useStyles()
    return (
        <Box className={classes.footer}>
            <EmojiEmotionsOutlined />
            <AttachFile className={classes.clipIcon} />
            <Box className={classes.search}>
                <InputBase
                    placeholder="Type a message"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={(e) => sendText(e)}
                    value={value}
                />
            </Box>

            <Mic />
        </Box>
    )
}

export default Footer
