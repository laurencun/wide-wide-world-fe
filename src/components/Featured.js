import React, { Component } from 'react'
import {connect} from 'react-redux'
import Carousel from 'react-material-ui-carousel'
import {Card} from 'rebass'
import {featuredPosts} from '../actions/post_actions'
import API from '../API.js'


class Featured extends Component {

    componentDidMount () {
        //get the top five posts from post actions
        this.props.featuredPosts()
    }

    render() {

            function Item (props)
                {
                    const photo_url = `${API}${props.item.image}`

                    return (
        
                        <Card style={{textAlign: 'center'}}>
                            <img style={{width: '50%', maxWidth: '80vw'}} src={photo_url} alt={props.item.caption}/><br/>
                            <h2 style={{fontFamily:'Playfair'}}>{props.item.location}</h2>
                        </Card>
                    
                    )
                }

        return (
            <div style={{justifyContent:'center', alignItems:'center', padding:"20px 20px", maxWidth:'50vw', height:'50vh'}}>

            <h2 style={{textAlign: 'center', fontFamily:'Playfair'}}>Featured Posts</h2>

             <Carousel>
            {
                this.props.posts.map( (item, i) => <Item key={i} item={item}/> )
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
