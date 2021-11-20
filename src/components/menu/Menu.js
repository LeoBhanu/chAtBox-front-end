import React from 'react'
import { useState } from 'react'
import Header from './Header'
import SearchBar from './SearchBar'
import Conversations from './Conversations'

const Menu = () => {

    const [text, setText] = useState('')

    return (
        <>
            <Header/>
            <SearchBar setText={setText}/>
            <Conversations text={text}/> 
        </>
    )
}

export default Menu
