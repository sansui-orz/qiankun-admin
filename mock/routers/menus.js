module.exports = function config(router) {
  router.get('/menus', ctx => {
    ctx.body = {
      code: 200,
      data: [
        {
          key: 1,
          id: 1,
          name: "数据中心",
          count: 3,
          menus: [
            { id: 11, name: "数据看板", level: 1, hidden: false, status: "on", sort: 9, url: '/databoard' },
            { id: 12, name: "数据详情", level: 1, hidden: false, status: "on", sort: 8, url: '/databoard/detail' },
            { id: 13, name: "数据表格", level: 1, hidden: false, status: "on", sort: 7, url: '/databoard/data-table' },
          ],
        },
        {
          key: 2,
          id: 2,
          name: "系统管理",
          count: 3,
          menus: [
            { id: 21, name: "账号管理", level: 1, hidden: false, status: "on", sort: 9, url: '/system/accounts' },
            { id: 22, name: "角色管理", level: 1, hidden: false, status: "on", sort: 8, url: '/system/rules' },
            { id: 23, name: "菜单管理", level: 1, hidden: false, status: "on", sort: 7, url: '/system/menus' },
          ],
        },
      ]
    }
  });
  router.post('/menus', ctx => {
    // 创建
    ctx.body = {
      code: 200,
      data: {
        id: 'xxxx',
        success: true
      }
    }
  });
  router.put('/menus/:id', ctx => {
    // 更新
    ctx.body = {
      code: 200,
      data: {
        id: ctx.params.id,
        success: true
      }
    }
  });
  router.del('/menus/:id', ctx => {
    // 删除
    ctx.body = {
      code: 200,
      data: {
        id: ctx.params.id,
        success: true
      }
    }
  })
}