import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Advantech from '../advantech.png';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    console.log(this.props);

    // Grab the property from the props
    const { posts } = this.props;

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

const mapStateToProps = (state) => {
  // Here, we get access to the state of the store so now we can
  // grab stuff from the state and attach them to props by returning an object
  return {
    posts: state.posts
  };
};

export default connect(mapStateToProps)(Home);
