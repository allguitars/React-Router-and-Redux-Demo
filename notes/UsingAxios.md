# Using Axios

## Using JSON-placeholder for Dummy Data

When we are creating a website, we would like to at some point reach out and grab some data from somewhere to make our site more dynamic and show data to our users. This could be from some kind of REST API on your server some other third party API or a service like Firebase going direct to the database. 

What we will do is just use a third-party REST API to get some fake dummy data from, and that API is called [JSON-placeholder](https://jsonplaceholder.typicode.com/). What it essentially does is give us access to some REST API enpoints receive some dummy data.

## Axios

```
npm install axios
```

Now we can use it inside the component to go out and fetch data from an external source.

When we were talking about the lifecycle hooks, a good place to go out and get external data was in the lifecycle hook **componentDidMount** -- That is when the component has then mounted to the DOM. We will use that lifecycle hook to go out and grab the data using Axios. 

To use a lifecycle hook inside the ``Home`` component, we have to convert this component into a class-based component because **funtional components cannot use lifecyle hooks**.

Original ``Home`` component:
```js
import React from 'react';

const Home = () => {
  return (
    <div className="container">
      <h4 className="center">Home</h4>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime doloremque nihil harum consequatur labore, itaque voluptatem eveniet maiores, fugiat perferendis laborum officiis quod qui. Earum fugiat enim error illo amet!</p>
    </div>
  );
};

export default Home;
```

New:
```js
import React, { Component } from 'react';

class Home extends Component {
  ...

```

Now we have turned this into a class-based component but at the place where we return some JSX, we have to embed that in the ``render()`` method.

```js
class Home extends Component {
  render() {
    return (
      <div className="container" >
        <h4 className="center">Home</h4>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime doloremque nihil harum consequatur labore, itaque voluptatem eveniet maiores, fugiat perferendis laborum officiis quod qui. Earum fugiat enim error illo amet!</p>
      </div>
    );
  }
};
```

We could have used ``fetch`` to do this, we are using ``axios`` because we just prefer it.

```js
class Home extends Component {
  componentDidMount() {
    // This is an asynchronous operation and it returns a Promise.
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        console.log(res);  // Check the content first.
      });
  }

  ...

```

Check the result in the browser. We have received one hundred of the following data.

```json
body: "quia et suscipit↵suscipit recusandae consequuntur expedita et cum↵reprehenderit molestiae ut ut quas totam↵nostrum rerum est autem sunt rem eveniet architecto"
id: 1
title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
userId: 1
__proto__: Object
```

What we need to do now is grab that data and output it to our template.

The first step will be create a state locally to this component. Inside this state we have the ``posts`` array.

```js
  state = {
    // To begin with, it will be an empty array for the posts 
    // object because we don't have the data yet.
    posts: []
  };

  componentDidMount() {
    // This is an asynchronous operation and it returns a Promise.
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        console.log(res);  // Check the content first.
        // When receiving the data, we add it to the posts array
        this.setState({
          posts: res.data.slice(0, 10) // Just grab the first 10
        });
      });
  }
```

Now we will cycle through that state inside the template.

```jsx
class Home extends Component {

  ...

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
            <div className="card-content">
              <span className="card-title">{post.title}</span>
              <p>{post.body}</p>
            </div>
          </div>
        );
      })
    ) : (
      {/*If there is nothing in posts.*/}
        <div className="center">No posts yet.</div>
      )

    return (
      <div className="container" >
        <h4 className="center">Home</h4>
        {postList}
      </div>
    );
  }

}
```