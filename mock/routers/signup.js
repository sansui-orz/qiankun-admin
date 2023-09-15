module.exports = function login(router) {
  router.post('/signup', ctx => {
    const token = 'xxx_mock_token'
    // 简单模拟
    const { username, password, email } = ctx.request.body
    ctx.cookies.set('TOKEN', token)
    ctx.body = {
      code: 200,
      data: {
        token: token,
        username, email
      }
    }
  })
}