const Koa = require('koa');
const cors = require('koa-cors')
const { koaBody } = require('koa-body')
const router = require('koa-router')();
const app = new Koa();

app.use(cors({
  origin: () => '*',
  maxAge: 10,
  credentials: true,
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'x-token']
}))

app.use(koaBody());

app.use((ctx, next) => {
  // 检查登录状态
  if (ctx.url === '/login' || ctx.url === '/signup') {
    next()
  } else {
    if (ctx.request.headers['x-token']) {
      // TODO: 检查登录是否过期
      next()
    } else {
      ctx.response.status = 403
    }
  }
})

// 获取用户基础信息
require('./routers/config')(router)
require('./routers/login')(router)
require('./routers/signup')(router)
require('./routers/panel')(router)
require('./routers/chartDetail')(router)
require('./routers/rules')(router)
require('./routers/menus')(router)
require('./routers/accounts')(router)
require('./routers/options')(router)

app.use(router.routes())
app.use(router.allowedMethods());

app.listen(7999, () => {
  console.log('Mock server run on port: 7999.')
});