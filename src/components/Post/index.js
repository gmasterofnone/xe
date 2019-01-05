import React, { Component } from 'react';
import './Post.css';


export default class Post extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const {username, photo, name, email } = this.props;
    return(
      <article>
        <hr />
        <div style={{ display: 'flex' }}>
          <img
            alt={username}
            src={photo}
            style={{
              borderRadius: '50%',
              height: 72,
              marginRight: 20,
              width: 72,
            }}
          />
          <div>
            <h2 style={{ marginTop: 0 }}>
              @{username}
            </h2>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
          </div>
        </div>
      </article>
    )
  }

}