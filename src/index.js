const Koa = require('koa');
const Router = require('koa-router');
const bodyPaarser = require('koa-bodyparser');

const api = require('./api');

const app = new Koa();
const router = new Router();

// Router setting
router.use('/api', api.routes());

// apply bodyparser to app
app.use(bodyPaarser());

// apply router to app
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
