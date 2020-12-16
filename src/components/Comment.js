import React from 'react'

export default function Comment({comments}) {

    return (
        <>
            {comments.map((comment, index) => 
            <li key={index} style={{listStyle:'none'}}>
                {comment.content}<hr></hr>
            </li>
            )}
        </>
    )
}