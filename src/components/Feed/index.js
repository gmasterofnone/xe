import React, { Component } from "react";

import Post from '../Post';
import { getPosts } from '../../utils/helper';
import './Feed.css';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      posts: [],
      postIDs: []
    };

    window.onscroll = () => {
      const {
        loadPosts,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;

      if (error || isLoading || !hasMore) return;

      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadPosts();
      }
    };
  }

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const { posts, postIDs } = this.state; 
    this.setState({ isLoading: true }, async () => {
      try {
        const nextPosts = await getPosts();
        const nextPostIDs = nextPosts.map(post => post.gifID)
        let newPosts;
        if (posts.length) {
          nextPosts.forEach(post => {
            if (postIDs.includes(post.gifID)) {
              console.log(true)
            } else {
              console.log(false)
            }
          })
        }
        this.setState({
          hasMore: (this.state.posts.length <= 80),
          isLoading: false,
          posts: [
            ...this.state.posts,
            ...nextPosts,
          ],
          postIDs: [
            ...this.state.postIDs,
            ...nextPostIDs,
          ],
        });
      } catch(error) {
        this.setState({
          error: error.message,
          isLoading: false,
        });
      }
    });
  }

  render() {
    const { error, hasMore, isLoading, posts } = this.state;
    const displayPosts = posts.map(post => (
      <Post key={post.id} {...post} />
    ))

    return (
      <div className='feed'>
        <h1>Infinite Users!</h1>
        <p>Scroll down to load more!!</p>
        { displayPosts }
        <hr />
        {error &&
          <div style={{ color: '#900' }}>
            {error}
          </div>
        }
        {isLoading &&
          <div>Loading...</div>
        }
        {!hasMore &&
          <div>You did it! You reached the end!</div>
        }
      </div>
    );
  }
}


