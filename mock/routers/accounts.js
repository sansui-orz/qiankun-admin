module.exports = function config(router) {
  router.get('/accounts', ctx => {
    ctx.body = {
      code: 200,
      data: [
        {
          id: 1,
          name: "猪猪侠",
          email: "zhuzhuxia@qk-admin.com",
          rules: [{ value: "admin", name: "系统管理员" }],
          status: "on",
        },
        {
          id: 2,
          name: "蜘蛛侠",
          email: "zhizhuxia@qk-admin.com",
          rules: [{ value: "admin", name: "系统管理员" }],
          status: "on",
        },
        {
          id: 3,
          name: "张三丰",
          email: "zhangshanfeng@qk-admin.com",
          rules: [{ value: "buyer-admin", name: "买手主管" }],
          status: "on",
        },
        {
          id: 4,
          name: "霍去病",
          email: "huoqubing@qk-admin.com",
          rules: [{ value: "salesman", name: "业务员" }],
          status: "on",
        },
        {
          id: 5,
          name: "帝江",
          email: "dijiang@qk-admin.com",
          rules: [
            { value: "buyer", name: "买手" },
            { value: "developer", name: "开发人员" },
          ],
          status: "on",
        },
      ]
    }
  });
  router.post('/accounts', ctx => {
    // 创建
    ctx.body = {
      code: 200,
      data: {
        id: 'xxxx',
        success: true
      }
    }
  });
  router.put('/accounts/:id', ctx => {
    // 更新
    ctx.body = {
      code: 200,
      data: {
        id: ctx.params.id,
        success: true
      }
    }
  });
  router.del('/accounts/:id', ctx => {
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