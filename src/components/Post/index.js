import React, { Component } from 'react';
import './Post.css';


export default class Post extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const {username, gif, title } = this.props;
    return(
      <article className='post'>
        <div className='gif'
          style={{backgroundImage: `url(${gif})`}}
        >
        </div>
        <div className='description'>
          <h3 className='marker'>{title}</h3>
        </div>
  
      </article>
    )
  }

}