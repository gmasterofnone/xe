import React, { Component } from "react";

import Post from '../Post';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      users: [],
    };

    window.onscroll = () => {
      const {
        loadUsers,
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
        loadUsers();
      }
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = async () => {
    this.setState({ isLoading: true }, async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=8');
        const data =  await response.json();
        const nextUsers = data.results.map(user => ({
          email: user.email,
          name: Object.values(user.name).join(' '),
          photo: user.picture.medium,
          username: user.login.username,
          uuid: user.login.uuid,
        }));

        this.setState({
          hasMore: (this.state.users.length < 100),
          isLoading: false,
          users: [
            ...this.state.users,
            ...nextUsers,
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
    const {
      error,
      hasMore,
      isLoading,
      users,
    } = this.state;

    const posts = users.map(user => (
      <Post key={user.username} {...user} />
    ))

    return (
      <div>
        <h1>Infinite Users!</h1>
        <p>Scroll down to load more!!</p>
        { posts }
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


