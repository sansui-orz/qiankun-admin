module.exports = function login(router) {
  router.post('/login', ctx => {
    const token = 'xxx_mock_token'
    // 简单模拟
    const { username, password } = ctx.request.body
    if (username === 'admin' && password === 'd34d2c41d96d8e240829fa9d71a93cd5') {
      ctx.cookies.set('TOKEN', token)
      ctx.body = {
        code: 200,
        data: {
          token: token,
          username
        }
      }
    } else {
      ctx.body = {
        code: 500,
        data: {
        },
        message: '账号密码错误'
      }
    }
  })
}