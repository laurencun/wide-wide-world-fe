import React from 'react'

export default function Comment({comments}) {

    return (
        <>
        {/* display comments as list */}
            {comments.map((comment, index) => 
            <li key={index} style={{listStyle:'none'}}>
                {comment.content}<hr></hr>
            </li>
            )}
        </>
    )
}