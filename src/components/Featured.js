import React, { Component } from 'react'
import {connect} from 'react-redux'
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
import {featuredPosts} from '../actions/post_actions'

class Featured extends Component {

    componentDidMount () {
        this.props.featuredPosts()
    }

    render() {

            function Item (props)
                {
                    return (
                        <Paper style={{justifyContent:'center', alignItems:'center', padding:"20px"}}>
                            <img width={500}height={600} src={props.item.image} alt={props.item.caption}/><br/>
                            <h2>{props.item.location}</h2>
                        </Paper>
                    )
                }

        return (
            <>
             <Carousel >
            {
                this.props.posts.map( (item, i) => <Item key={i} item={item} /> )
            }
            </Carousel>
            </>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts
})

export default connect( mapStateToProps, {featuredPosts} )((Featured))
