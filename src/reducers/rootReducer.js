const initState = {
  // Default values
  posts: [
    { id: '1', title: 'qui est esse', body: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla' },
    { id: '2', title: 'eum et est occaecati', body: 'ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi nesciunt rem tenetur doloremque ipsam iure quis sunt voluptatem rerum illo velit' },
    { id: '3', title: 'nesciunt quas odio', body: 'repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est voluptatem omnis possimus esse voluptatibus quis est aut tenetur dolor neque' }
  ]
};

// The first time this runs, and the store is being set up,
// we'll pass the initial state as the default value to be
// the state.
const rootReducer = (state = initState, action) => {
  return state; // We won't do any interaction for now.
};

export default rootReducer;
