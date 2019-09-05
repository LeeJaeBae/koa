const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');

const posts = new Router();

// eslint-disable-next-line object-curly-newline
const { list, write, read, remove, replace, update } = postsCtrl;

posts.get('/', list);
posts.post('/', write);
posts.get('/:id', read);
posts.delete('/:id', remove);
posts.put('/:id', replace);
posts.patch('/:id', update);

module.exports = posts;
