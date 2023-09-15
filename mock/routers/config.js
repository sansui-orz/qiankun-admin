module.exports = function config(router) {
  router.get('/config', ctx => {
    ctx.body = {
      code: 200,
      data: {
        userInfo: {
          username: '蜘蛛侠',
          account: '123456@gmail.com',
          avatar: 'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/WBsXGwMQAYW0ST9paXKIEoD~tplv-t2oaga2asx-jj-mark:36:36:0:0:q75.avis'
        },
        rules: {
          menus: [
            {
              name: '数据中心',
              url: '',
              children: [
                {
                  name: '数据看板',
                  url: '/databoard'
                },
                {
                  name: '数据详情',
                  url: '/databoard/detail'
                },
                {
                  name: '数据表格',
                  url: '/databoard/data-table'
                }
              ]
            },
            {
              name: '系统管理',
              url: '',
              children: [
                {
                  name: '账号管理',
                  url: '/system/accounts',
                },
                {
                  name: '角色管理',
                  url: '/system/rules'
                },
                {
                  name: '菜单管理',
                  url: '/system/menus'
                }
              ]
            }
          ]
        }
      }
    }
  })
}