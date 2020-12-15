import React from 'react'

export default function Like ({likes}) {

    return (
        <div>
            <span> {likes.length} likes </span>
        </div>
    )
}