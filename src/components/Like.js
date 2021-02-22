import React from 'react'

export default function Like ({likes}) {

    return (
        <div>
            {/* display number of likes to update dynamically */}
            <span> {likes.length} likes </span>
        </div>
    )
}