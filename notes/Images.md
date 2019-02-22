## Use Images inside the Components

We will use an image to put a little background to each one of these different posts on the Home page.

First we have to import that image.

_Home.js_
```js
// Give the image that you imported a name.
import Advantech from '../advantech.png';

```

Now we can use the image in the template. We just have to output the name of the object we imported in curly braces.

```js
return (
  <div className="post card" key={post.id}>
    <img src={Advantech} alt="Advantech Logo" />
    <div className="card-content">
      <Link to={'/' + post.id}>
        <span className="card-title">{post.title}</span>
      </Link>
      <p>{post.body}</p>
    </div>
  </div>
);
```

Now back to the browser, we can see the image in each post in the Home page, but the image size is a little bit too large.

![logo](/notes/files/logo-large.png)

First let's add a class of ``home`` to the template.

_Home.js_
```html
return (
  <div className="container home" >
    <h4 className="center">Home</h4>
    {postList}
  </div>
);
```

Then, we go the CSS file and just spruce this up a little bit. 

We will grab the class of ``home`` and then the ``post`` and finally the ``img`` inside that.

_index.css_
```css
.home .post img {
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0.6;
  width: 30%;
}

.home .post {
  padding-left: 30%;
}
```

We also want to change the color of the link on each title. We will give the post title a class of ``red-text``.

_Home.js_
```html
<Link to={'/' + post.id}>
  <span className="card-title red-text">{post.title}</span>
</Link>
```

Now back to the browser. The page now looks better.

![logo normal](/notes/files/logo-normal.png)


