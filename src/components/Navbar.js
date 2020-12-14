import React from 'react'
import {useLocation} from 'react-router-dom'

export default function Navbar (props) {

    const location = useLocation()

        return (
            <div>
                <nav>
                    <ul>
                        {
                        location.pathname === '/home' ?
                        <li onClick={props.showProfile}>my profile</li>
                        : <ul><li onClick={props.showFeed}>back to feed</li>
                        <li onClick={props.showSaved}>show saved</li></ul>
                        }
                        <li onClick={props.showPostForm}>new post</li>
                        <li onClick={props.logout}>logout</li>
                    </ul>
                </nav>
            </div>
        )
    }
