import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../actions/postActions';

class Post extends Component {
  handleClick = () => {
    this.props.deletePost(this.props.post.id);
    // Redirect you to the homepage
    this.props.history.push('/');
  }

  render() {
    console.log(this.props);
    // If we have a post?
    const post = this.props.post ? (
      <div className="post">
        <h4 className="center">{this.props.post.title}</h4>
        <p>{this.props.post.body}</p>
        <div className="center">
          <button className="btn grey" onClick={this.handleClick}>
            Delete Post
          </button>
        </div>
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

const mapDispatchToProps = (dispatch) => {
  // return the objects or functions we want to map to the props of this component
  return {
    // map a function
    deletePost: (id) => { dispatch(deletePost(id)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
