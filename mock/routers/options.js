module.exports = function config(router) {
  router.get('/options/rules', ctx => {
    ctx.body = {
      code: 200,
      data: [
        { value: "admin", name: "系统管理员" },
        { value: "buyer-admin", name: "买手主管" },
        { value: "buyer", name: "买手" },
        { value: "salesman-admin", name: "业务主管" },
        { value: "salesman", name: "业务员" },
        { value: "developer", name: "开发人员" },
      ]
    }
  })
  router.get('/options/menus', ctx => {
    ctx.body = {
      code: 200,
      data: [
        { value: 11, name: "数据看板" },
        { value: 12, name: "数据详情" },
        { value: 13, name: "数据表格" },
        { value: 21, name: "账号管理" },
        { value: 22, name: "角色管理" },
        { value: 23, name: "菜单管理" },
      ]
    }
  })
  router.get('/options/systems', ctx => {
    ctx.body = {
      code: 200,
      data: [
        { value: "data", name: "数据系统" },
        { value: "authority", name: "权限系统" },
      ]
    }
  })
}