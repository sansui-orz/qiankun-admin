const randomRange = {
  sale: [120, 132, 101, 134, 90, 230, 210],
  profit: [220, 182, 191, 234, 290, 330, 310],
  order: [150, 232, 201, 154, 190, 330, 410],
  uv: [320, 332, 301, 334, 390, 330, 320],
  conversionRate: [820, 932, 901, 934, 1290, 1330, 1320],
  return: [32, 29, 33, 35, 30, 31, 33]
}

function getRangeList(list, length) {
  return Array.from({ length }).fill('').map(() => list[Math.floor(Math.random() * list.length)])
}

module.exports = function config(router) {
  router.get("/chart-detail", (ctx) => {
    const charts = Array.isArray(ctx.query['charts[]']) ? ctx.query['charts[]'] : [ctx.query['charts[]']]
    const dateRange = Array.isArray(ctx.query['dateRange[]']) ? ctx.query['dateRange[]'] : [ctx.query['dateRange[]']]
    ctx.body = {
      code: 200,
      data: {
        xAxis: dateRange,
        legend: charts,
        series: charts.map(item => ({
          name: item,
          type: 'line',
          stack: 'Total',
          data: getRangeList(randomRange[item], dateRange.length)
        }))
      }
    }
  })
}