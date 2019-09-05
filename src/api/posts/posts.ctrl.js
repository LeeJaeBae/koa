let postId = 1; // initial value of id

const posts = [
  {
    id: 1,
    title: 'title',
    body: 'Lorem ipsum',
  },
];

/* Post
    Post /api/posts
    { title,body }
*/

exports.write = (ctx) => {
  // Rest ApI의 request body는 ctx.request.body에서 조회할 수 있다.
  const { title, body } = ctx.request.body;
  postId += 1;

  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;
};

/* 포스트 목록 조회
   GET /api/posts
*/
exports.list = (ctx) => {
  ctx.body = posts;
};

/* 특정 포스트 조회
   GET /api/posts/:id
*/
exports.read = (ctx) => {
  const { id } = ctx.params;

  // 주어진 id 값으로 포스트를 찾습니다.
  // 파라미터로 받아 온 값은 문자열 형식이니 파라미터를 숫자로 변환하거나,
  // 비교할 p.id값을 문자열로 변경해야 합니다.
  const post = posts.find((p) => p.id.toString() === id);

  // 포스트가 없으면 오류를 반환합니다.
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: "there's no posts",
    };
    return;
  }

  ctx.body = post;
};

/* 특정 포스트 제거
   DELETE /api/posts/:id
*/
exports.remove = (ctx) => {
  const { id } = ctx.params;

  // find id's index number
  const index = posts.findIndex((p) => p.id.toString() === id);

  // return error message if there's no text
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: "there's no posts",
    };
    return;
  }

  // delete index number's item
  posts.splice(index, 1);
  ctx.status = 204; // No Content
};

/* 포스트 수정
   PUT /api/posts/:id
   { title, body }
*/
exports.replace = (ctx) => {
  // using PUT method for change of entire data with inputed post information
  const { id } = ctx.params;

  // find id's index number
  const index = posts.findIndex((p) => p.id.toString() === id);

  // return error message if there's no text
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: "there's no posts",
    };
    return;
  }

  // 전체 객체를 덮어 씌웁니다.
  // 따라서 id를 제외한 기존 정보를 날리고, 객체를 새로 만듭니다.
  posts[index] = {
    id,
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};

/* 포스트 수정 (특정 필드 변경)
   PATCH /api/posts/:id
   { title, body }
*/
exports.update = (ctx) => {
  const { id } = ctx.params;

  // find id's index number
  const index = posts.findIndex((p) => p.id.toString() === id);

  // return error message if there's no text
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: "there's no posts",
    };
    return;
  }

  // 기존 값에 정보를 덮어씌웁니다.
  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};
