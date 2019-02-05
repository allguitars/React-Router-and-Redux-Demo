import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
  state = {
    post: null
  };

  componentDidMount() {
    const id = this.props.match.params.post_id;
    axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
      .then(res => {
        this.setState({
          post: res.data
        });
        // console.log(res);
      });
  }

  render() {
    // If we have a post?
    const post = this.state.post ? (
      <div className="post">
        <h4 className="center">{this.state.post.title}</h4>
        <p>{this.state.post.body}</p>
      </div>
    ) : (
        // When the component is initally loaded, and the axios is still
        // loading the content, the post property is still null.
        <div className="center">Loading post...</div>
      )

    return (
      <div className="container">
        {post}
      </div>
    );
  }
}

export default Post;
