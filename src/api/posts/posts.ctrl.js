const Joi = require('joi');
const Post = require('models/post');
const { ObjectId } = require('mongoose').Types;

exports.checkObjectId = (ctx, next) => {
  const { id } = ctx.params;

  // fail
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // 400 Bad request
    return null;
  }

  return next();
};

// check objectId middleware

// POST /api/posts
// { title, body, tags }

exports.write = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required(),
  });

  // first parameter is object to verify, second is schema
  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;

  // make a new instance
  const post = new Post({
    title,
    body,
    tags,
  });

  try {
    await post.save();
    ctx.body = post;
  } catch (error) {
    ctx.throw(error, 500);
  }
};

// GET /api/posts
exports.list = async (ctx) => {
  // initial page number is 1
  // query have to change String to Integer
  const page = parseInt(ctx.query.page || 1, 10);

  // if page number is smaller then 1 return error
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
    const limitBodyLength = (post) => ({
      ...post.toJSON(),
      body:
        post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
    });
    const postCount = await Post.countDocuments().exec();
    // ctx.set for setting response header
    ctx.set('Last-Page', Math.ceil(postCount / 10));
    ctx.body = posts.map(limitBodyLength);
  } catch (error) {
    ctx.throw(error, 500);
  }
};

// GET /api/posts/:id
exports.read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    // if post is not exist
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (error) {
    ctx.throw(error, 500);
  }
};

// DELETE /api/posts/:id
exports.remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndRemove(id).exec();
    // if post is not exist
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (error) {
    ctx.throw(error, 500);
  }
};

exports.update = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();
    // if post is not exist
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (error) {
    ctx.throw(error, 500);
  }
};
