export const deletePost = (id) => {
  // Return the action, which is an object
  return {
    type: 'DELETE_POST',
    id  // ES6 syntax -- equals to "id: id"
  };
};
