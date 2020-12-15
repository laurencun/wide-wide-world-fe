import React from 'react'

export default function Comment({comments}) {

    return (
        <>
            <li style={{listStyle:'none'}}>
                {comments.content}
            </li>
        </>
    )
}