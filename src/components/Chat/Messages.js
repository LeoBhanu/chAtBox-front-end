import React from 'react'
import { useState, useEffect, useContext, useRef } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Footer from './Footer'
import Message from './Message';
import { AccountContext } from '../../context/AccountProvider';
import { newMessages, getMessages } from '../../service/api';

const useStyles = makeStyles({
    wrapper: {
        backgroundImage: `url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'})`,
        backgroundSize: '50%'
    },
    footer: {
        height: '55px',
        background: '#ededed',
        width: '100%',
    },
    component: {
        height: '77vh',
        overflowY: 'scroll'
    },
    container: {
        padding: '1px 8px'
    }
})

const Messages = ({person, conversation}) => {

    const classes = useStyles();
    const [value, setValue] = useState();
    const { account, socket, newMessageFlag, setNewMessageFlag} = useContext(AccountContext);
    const [messages, setMessages] = useState([]);
    const [incomingMessage, setIncomingMessage] = useState(null);
    const scrollRef = useRef();

    const receiverId = conversation?.members?.find(member => member !== account.googleId)

    const sendText = async (e)=>{
        let code = e.keyCode || e.which;
        if(!value) { return }
        if(code === 13 ){
            let message = {
                sender: account.googleId,
                conversationId: conversation._id,
                text: value
            };
            socket.current.emit('sendMessage',{
                senderId : account.googleId,
                receiverId,
                text : value
            })
            await newMessages(message);
            setValue('');
            setNewMessageFlag(prev => !prev)
        }
    }

    useEffect(() => { 
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, []);

    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.sender) && 
            setMessages((prev) => [...prev, incomingMessage]);    
    }, [incomingMessage, conversation]);

    useEffect(() => {
        const getMessageDetails = async () => {
            let response = await getMessages(conversation._id);
            console.log(response);
            setMessages(response);
            console.log("my messages",messages);
        }
        getMessageDetails();
    }, [conversation?._id, person._id, newMessageFlag]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ transition: "smooth" })
    }, [messages]);


    return (
        <Box className={classes.wrapper}>
            <Box className={classes.component}>
                {
                    messages && messages.map(message => (
                        <Box className={classes.container} ref={scrollRef}> 
                            <Message message={message}/>
                        </Box>
                    ))
                }
            </Box>
            <Footer sendText={sendText} value={value} setValue={setValue} />
        </Box>
    )
}

export default Messages
