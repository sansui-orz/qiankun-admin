module.exports = function config(router) {
  router.get("/panel", (ctx) => {
    ctx.body = {
      code: 200,
      data: {
        notice: [
          {
            id: "0001",
            desc: "供应商签约流程变更通知",
            publicTime: "2023-09-01",
          },
          {
            id: "0002",
            desc: "供应链事业部组织架构变更通知",
            publicTime: "2023-08-18",
          },
          {
            id: "0003",
            desc: "元旦放假通知",
            publicTime: "2022-12-21",
          },
          {
            id: "0004",
            desc: "【新冠疫情防疫措施】",
            publicTime: "2022-12-11",
          },
        ],
        records: [
          {
            id: "0001",
            desc: "步惊云修改了【基础配置-尺码设置】，新增了尺码XXXXL",
          },
          {
            id: "0002",
            desc: "武三通审批通过【基础物料价格变更-洗水唛标签价格】",
          },
          {
            id: "0003",
            desc: "令狐冲审批通过【基础物料价格变更-洗水唛标签价格】",
          },
          {
            id: "0004",
            desc: "聂小倩创建审批【基础物料价格变更-洗水唛标签价格】",
          },
        ],
        todoList: [
          {
            id: "0001",
            desc: "【物料申领 WL20230901-张三丰】待审核",
            todo: { text: "去审核", url: "/audit" },
          },
          {
            id: "0002",
            desc: "【报销申请 BX20230822】被驳回",
            todo: { text: "查看详情", url: "/" },
          },
          {
            id: "0003",
            desc: "聂小倩创建新款【夏日清凉连衣裙山水青绿款】",
            todo: { text: "查看详情", url: "/" },
          },
          {
            id: "0004",
            desc: "聂小倩创建新款【夏日防晒冰丝带帽衫】",
            todo: { text: "查看详情", url: "/" },
          },
        ],
        sale: [312087, 328980, 287810, 298750, 299876, 300287, 298070],
        uv: [1002988, 1039891, 992352, 1013933, 1023941, 1058881, 1062986],
        conversionRate: [13, 14, 8, 15, 17, 18, 15],
        origin: [
          { value: 1048, name: "搜索引擎" },
          { value: 735, name: "直接访问" },
          { value: 580, name: "邮件" },
          { value: 484, name: "社交广告" },
          { value: 300, name: "视频广告" },
        ],
        store: [
          {
            value: "17.09",
            name: "T恤",
          },
          {
            value: "16.24",
            name: "外套",
          },
          {
            value: "13.68",
            name: "长裤",
          },
          {
            value: "12.82",
            name: "裙子",
          },
          {
            value: "11.97",
            name: "袜子",
          },
          {
            value: "11.11",
            name: "鞋子",
          },
          {
            value: "9.40",
            name: "内衣",
          },
          {
            value: "7.69",
            name: "套装",
          },
        ],
      },
    };
  });
};
