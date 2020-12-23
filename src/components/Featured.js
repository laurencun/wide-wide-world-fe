import React, { Component } from 'react'
import {connect} from 'react-redux'
import Carousel from 'react-material-ui-carousel'
import {Card} from 'rebass'
import {featuredPosts} from '../actions/post_actions'

class Featured extends Component {

    componentDidMount () {
        this.props.featuredPosts()
    }

    render() {

            function Item (props)
                {
                    const photo_url = `http://limitless-earth-02935.herokuapp.com${props.item.image}`

                    return (
        
                        <Card>
                            <img width={500} src={photo_url} alt={props.item.caption}/><br/>
                            <h2>{props.item.location}</h2>
                        </Card>
                    
                    )
                }

        return (
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', padding:"20px"}}>
             <Carousel >
            {
                this.props.posts.map( (item, i) => <Item key={i} item={item} /> )
            }
            </Carousel>
            </div>
        )
    }
} 

const mapStateToProps = state => ({
    posts: state.posts
})

export default connect( mapStateToProps, {featuredPosts} )((Featured))
