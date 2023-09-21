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
              languageCode: 'data-center',
              url: '',
              children: [
                {
                  name: '数据看板',
                  languageCode: 'databoard',
                  url: '/databoard'
                },
                {
                  name: '数据详情',
                  languageCode: 'data-detail',
                  url: '/databoard/detail'
                },
                {
                  name: '数据表格',
                  languageCode: 'data-table',
                  url: '/databoard/data-table'
                }
              ]
            },
            {
              name: '系统管理',
              languageCode: 'system-setting',
              url: '',
              children: [
                {
                  name: '账号管理',
                  languageCode: 'accounts-setting',
                  url: '/system/accounts',
                },
                {
                  name: '角色管理',
                  languageCode: 'rules-setting',
                  url: '/system/rules'
                },
                {
                  name: '菜单管理',
                  languageCode: 'menus-setting',
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