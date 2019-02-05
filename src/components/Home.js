import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Advantech from '../advantech.png';

class Home extends Component {
  state = {
    // To begin with, it will be an empty array for the posts 
    // object because we don't have the data yet.
    posts: []
  };

  componentDidMount() {
    // This is an asynchronous operation and it returns a Promise.
    // axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://desolate-lowlands-49769.herokuapp.com/api/genres`)
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        // console.log(res);  // Check the content first.
        // When receiving the data, we add it to the posts array
        this.setState({
          posts: res.data.slice(0, 10) // Just grab the first 10
        });
        // console.log(res.data.slice(0, 10));
      });
  }

  render() {
    // Grab the property using onject destructuring
    const { posts } = this.state;

    // Check if there is any data inside the array because when
    // the component first starts, we don't have any data.
    const postList = posts.length ? (
      // If the length is not undefined, we do have the posts
      posts.map(post => {
        return (
          <div className="post card" key={post.id}>
            <img src={Advantech} alt="Advantech Logo" />
            <div className="card-content">
              <Link to={'/' + post.id}>
                <span className="card-title red-text">{post.title}</span>
              </Link>
              <p>{post.body}</p>
            </div>
          </div>
        );
      })
    ) : (
        <div className="center">No posts yet.</div>
      );

    return (
      <div className="container home" >
        <h4 className="center">Home</h4>
        {postList}
      </div>
    );
  }
}

export default Home;
