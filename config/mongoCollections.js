const dbConnection = require('./mongoConnection');

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

module.exports = {
  movie: getCollectionFn('movie'),

  session: getCollectionFn('session'),

  users: getCollectionFn('users'),

  comments: getCollectionFn('comments')

};