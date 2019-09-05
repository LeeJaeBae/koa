const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');

const posts = new Router();

// eslint-disable-next-line object-curly-newline
const { list, write, read, remove, checkObjectId, update } = postsCtrl;

posts.get('/', list);
posts.post('/', write);
posts.get('/:id', checkObjectId, read);
posts.delete('/:id', checkObjectId, remove);
// posts.put('/:id', replace);
posts.patch('/:id', checkObjectId, update);

module.exports = posts;
