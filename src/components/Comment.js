import React from 'react'

export default function Comment({comments}) {

    return (
        <div>
            <li>
                {comments.content}
            </li>
        </div>
    )
}