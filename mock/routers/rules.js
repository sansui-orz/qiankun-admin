module.exports = function config(router) {
  router.get('/rules', ctx => {
    ctx.body = {
      code: 200,
      data: [
        {
          id: 1,
          name: "系统管理员",
          menus: [
            { value: 11, name: "数据看板" },
            { value: 12, name: "数据详情" },
            { value: 13, name: "数据表格" },
            { value: 21, name: "账号管理" },
            { value: 22, name: "角色管理" },
            { value: 23, name: "菜单管理" },
          ],
          buttons: [
            { value: 1, name: '删除账号'},
            { value: 2, name: '删除角色'},
            { value: 3, name: '创建账号'},
          ],
        },
        {
          id: 2,
          name: "买手主管",
          menus: [
            { value: 11, name: "数据看板" },
            { value: 12, name: "数据详情" },
            { value: 13, name: "数据表格" },
            { value: 21, name: "账号管理" },
          ],
          buttons: [
            { value: 1, name: '删除账号'},
            { value: 3, name: '创建账号'},
          ],
        },
        {
          id: 3,
          name: "买手",
          menus: [
            { value: 11, name: "数据看板" },
            { value: 12, name: "数据详情" },
            { value: 13, name: "数据表格" },
          ],
          buttons: [],
        },
        {
          id: 4,
          name: "业务主管",
          menus: [
            { value: 11, name: "数据看板" },
            { value: 12, name: "数据详情" },
            { value: 13, name: "数据表格" },
            { value: 21, name: "账号管理" },
          ],
          buttons: [
            { value: 1, name: '删除账号'},
            { value: 3, name: '创建账号'},
          ],
        },
        {
          id: 5,
          name: "业务员",
          menus: [
            { value: 11, name: "数据看板" },
            { value: 12, name: "数据详情" },
            { value: 13, name: "数据表格" },
          ],
          buttons: [],
        },
        {
          id: 5,
          name: "开发人员",
          menus: [
            { value: 11, name: "数据看板" },
            { value: 12, name: "数据详情" },
            { value: 13, name: "数据表格" },
            { value: 21, name: "账号管理" },
            { value: 22, name: "角色管理" },
            { value: 23, name: "菜单管理" },
          ],
          buttons: [
            { value: 1, name: '删除账号'},
            { value: 2, name: '删除角色'},
            { value: 3, name: '创建账号'},
          ],
        },
      ]
    }
  });
  router.post('/rules', ctx => {
    // 创建
    ctx.body = {
      code: 200,
      data: {
        id: 'xxxx',
        success: true
      }
    }
  });
  router.put('/rules/:id', ctx => {
    // 更新
    ctx.body = {
      code: 200,
      data: {
        id: ctx.params.id,
        success: true
      }
    }
  });
  router.del('/rules/:id', ctx => {
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