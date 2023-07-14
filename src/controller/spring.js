const spring = require('../service/spring')

const router = require('koa-router')()

router.prefix('/spring')

router.get('/boot', async(ctx, next) => {
  await spring.boot(ctx, next);
  ctx.body = 'boot';
})

router.get('/list/:status', async(ctx, next) => {
  const data = await spring.list(ctx, next);
  ctx.body = data;

})

router.get('/accept/:id', async(ctx, next) => {
  await spring.accept(ctx, next);
  ctx.status = 200;
}),

router.get('/reject/:id', async(ctx, next) => {
  await spring.reject(ctx, next);
  ctx.status = 200;
}),

router.get('/delete/:id', async(ctx, next) => {
  await spring.delete(ctx, next);
  ctx.status = 200;
}),

router.get('/image/:id/:index', async(ctx, next) => {
  const data = await spring.image(ctx, next);
  ctx.type = 'image/jpeg';
  ctx.body = data;
})



module.exports = router
