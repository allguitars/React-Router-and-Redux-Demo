# Route Parameters

## Use Cases
- User Profile Route:
  - mysite.com/users/neo
  - mysite.com/users/dave

  _neo_ and _dave_ are part of the route parameters.

- Cooking Recipe Page:
  - mycookingsite.com/recipe/12345
  - mycookingsite.com/recipe/67890

  _12345_ and _67890_ are the route pamareters.


## Grab the Extra Information Added by React Route

To represent the route parameter after the forward slash, we add a colon and then the name of the route parameter.

_App.js_
```js
<BrowserRouter>
  <div className="App">
    <Navbar />
    ... 

    <Route path='/:post_id' component={Post} />
  </div>
</BrowserRouter>
```

Let's create a component that would just show a single post. This new component will have a state in it so we will use a class-based component.

_Post.js_
```js
import React, { Component } from 'react';

class Post extends Component {

  componentDidMount() {
    console.log(this.props);
    let id = this.props.match.params.post_id;
  }

  render() {
    return (
      <div className="container">
        <h4>Route Params</h4>
      </div>
    );
  }
}

export default Post;
```

The following is how we identify the route parameter inside the component. The ``componentDidMount`` hook is a good time to do this, and we use the extra information that the React Router provides to us on the ``props`` object. Let's also log the ``props`` object. Remenber we automatically get ``props`` in class-based components, and when this component being used as a route, then we get access to that extra ``route`` information on the ``props`` object.

```js
console.log(this.props);
let id = this.props.match.params.post_id;
```

_Apps.js_
```js
...
import Post from './components/Post';
...


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          ...

          <Route path='/:post_id' component={Post} />
        </div>
      </BrowserRouter>
    );
  }
}

```

Let's try to requrest the route ``/12345``


_Console log_
```
Object
- history: {length: 3, action: "POP", location: {…}, createHref: ƒ, push: ƒ, …}
- location: {pathname: "/12345", search: "", hash: "", state: undefined}
- match:
  isExact: true
  - params:
    post_id: "12345"
```

Now inside the component, let's create the ``state`` object, and we will set it equal to an object, and inside we will store a property called ``id``. To begin with, when the component first loads up, it will be ``null``, but when ``componentDidMount`` fires, we will grab the ID from our URL and set the state so the ``id`` then becomes the ``post_id`` from the URL, and thus we're keeping track of that locally inside this component.

```js
  state = {
    id: null
  };

  componentDidMount() {
    const id = this.props.match.params.post_id;
    this.setState({
      id: id
    });
  }
```

Then we output the id inside the template.

```js
  render() {
    return (
      <div className="container">
        <h4>{this.state.id}</h4>
      </div>
    );
  }
```

What we want to do is, from the Home page, link up those different titles so that if we click on them it takes us to that individual Post page and shows us that individual post.

What we need to do is surround the title on the Home page with a link tag, and that will link us to the separate component.

Now that we have already output the ID into the key.

_Home.js_
```js
<div className="post card" key={post.id}>
  <div className="card-content">
    <span className="card-title">{post.title}</span>
    <p>{post.body}</p>
  </div>
</div>
```

We have to surround the ``post.title`` with a link tag, and in the ``to`` property of that link tag, we have to say ``/`` + ``post.id``.


First of all, we need to import ``Link`` tag from the React Router pacjage.

_Home.js_
```js
import { Link } from 'react-router-dom';
```

Then add the surrounding Link tag.

```js
  <Link to={'/' + post.id}>
    <span className="card-title">{post.title}</span>
  </Link>
```

We have the dynamic link sorted now. Save this and go to the browser now, we can see that the titles have changed color that's just he default styles because links are somehow to be blue.

![title with link](/notes/files/title-with-link.png)

## Make a Reuest to the URL with the Specified Post ID

We no longer need to store the ``id`` in the state. Instead, what we will do is store that individual post we get back. Once we've made this request, we can tack on a ``.then`` method because we receive the response and we can use that inside the callback function.

_Post.js_
```js
...

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
        console.log(res); // Log out the response for inspection
      });
  }


...

```

Back to the browser and click a post on the Home page.

_Console output_
```
// Inside the data property

data:
- body: "est rerum tempore vitae↵sequi sint nihil reprehenderit dolor beatae ea dolores neque↵fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis↵qui aperiam non debitis possimus qui neque nisi nulla"
- id: 2
- title: "qui est esse"
- userId: 1

```

Inside the template, this is where we want to output the post.

```js
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
```

## Switch Tag

Now what if we go to the Contact page after loading a post?

We get the Contact component but we also get the Post component right below the Contact component.
![content after post](/notes/files/contact-after-post.png)

That's because it is treating the URL ``http://localhost:3000/contact`` as out Post page.

Inside our ``App`` component, we set up the URL to be ``/:post_id`` so whatever we put after the forward slash, it would treat as a post ID.

The URL ``http://localhost:3000/contact`` matches the route ``<Route path='/contact' />`` but it also matches the route ``<Route path='/:post_id' />``. There is nothing here to say that our post ID has to be a number or it can't be 'contact'. So it's interpreting ``/contact`` as a post ID as well as the one that we wanted it to be. 

What we need is a way to only load up one of the two, either ``/contact`` if it's a contact, or ``/:post_id`` if it's some kind of Post ID route. 

### Adding a Prefix to Distinguish

```js
<Route path='/posts/:post_id' component={Post} />
```

Then we have to update the links in the _Home_ component.
```js
<Link to={'/posts/' + post.id}>
  <span className="card-title">{post.title}</span>
</Link>
```

### A Better Way

If you didn't want to restructure your URLs as mentioned above, you don't have to do that. You can actually combat this with a **Switch Tag**.

We first have to import the ``Switch`` object from the ``react-router-dom``.

_App.js_
```js
import { BrowserRouter, Route, Switch } from 'react-router-dom';
```

We will surround all these ``Routes`` with the ``Switch`` tag. What it says is at any point in time, I only want one of these routes to take precedence -- I don't want to match two at a time.

```html
<Switch>
  <Route exact path='/' component={Home} /> 
  <Route path='/about' component={About} />
  <Route path='/contact' component={Contact} />
  <Route path='/:post_id' component={Post} />
</Switch>
```

What will happen is when we type something in the URL or when we link to something, it will start at the top of the **Route stack** and it will go down and compare each route. When it finds a match, it will load the related component in and then it will stop there. It won't try to match the next one.

If we didn't have the ``Switch`` tag, then it would carry on and it would match as many as it could and load all of those components up. But with the ``Switch`` tag right here, we are only matching the first one we find, in this case, the ``/contact``. Now, we check it again in the browser and we don't have that problem any more.

That is how we can use the ``Switch`` tag to only load up one component.

