import React, { Component } from 'react';
import { connect } from 'react-redux';

class Post extends Component {
  render() {
    // If we have a post?
    const post = this.props.post ? (
      <div className="post">
        <h4 className="center">{this.props.post.title}</h4>
        <p>{this.props.post.body}</p>
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

const mapStateToProps = (state, ownProps) => {
  // This is where we want to grab that single individual record
  const id = ownProps.match.params.post_id; // Grab the route paramater
  return {
    post: state.posts.find(post => post.id === id)
  };
};

export default connect(mapStateToProps)(Post);
