const initState = {
  posts: []
};

// The first time this runs, and the store is being set up,
// we'll pass the initial state as the default value to be
// the state.
const rootReducer = (state = initState, action) => {
  return state; // We won't do any interaction for now.
};

export default rootReducer;
