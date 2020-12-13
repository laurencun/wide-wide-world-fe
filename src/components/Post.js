import React from 'react'
import Comment from './Comment'
import Like from './Like'

export default function Post ({post}) {

    return (
        <div>
            <span style={{fontWeight:'bold'}}>{post.user.username}</span><br/>
            <img width={500} src={post.image} alt={post.caption}/><br/>
            <span>{post.caption}</span><br/>
            <span style={{fontStyle:'italic'}}>{post.location}</span><br/>
            <span> <Like likes={post.likes}/> </span>
            <ul>
                {post.comments.map((commentArray, index) => <Comment key={index} comments={commentArray} />)}
            </ul>
            <button>like</button>
            <button>save</button>
        </div>
    )
}
