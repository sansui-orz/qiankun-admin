import React, { useRef, useEffect, useCallback } from "react";
import * as echarts from "echarts/core";
import { Card, Row, Col } from "antd";
import { PanelData } from "@/types/api";

function getFormatDay(timestamp: number) {
  const time = new Date(timestamp);
  const month = (time.getMonth() + 1).toString().padStart(2, "0");
  const day = time.getDate().toString().padStart(2, "0");
  return `${month}-${day}`;
}
const now = Date.now();
const oneday = 24 * 60 * 60 * 1000;
const days = Array.from({ length: 7 })
  .fill(0)
  .map((_, index) => getFormatDay(now - oneday * index))
  .reverse();



interface PropsType {
  sale: PanelData['sale'];
  coversionRate: PanelData['conversionRate'];
  origin: PanelData['origin'];
  uv: PanelData['uv'];
  store: PanelData['store'];
}

function SimpleChartPanel(props: PropsType ) {
  const panel = useRef<HTMLDivElement>(null);
  const conversionRate = useRef<HTMLDivElement>(null);
  const origin = useRef<HTMLDivElement>(null);
  const store = useRef<HTMLDivElement>(null);

  const chartInit = useCallback(() => {
    const saleChart = echarts.init(panel.current);
      // 绘制图表
      saleChart.setOption({
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          orient: "horizontal",
          bottom: 10,
          data: ["销售额", "流量"],
        },
        xAxis: {
          data: days,
        },
        tooltip: {
          trigger: "axis",
          formatter: "{a} <br/>{b} : {c}",
        },
        yAxis: {},
        series: [
          {
            name: "销售额",
            data: props.sale,
            type: "line",
            stack: "x",
            label: {
              show: true,
              position: "bottom",
              textStyle: {
                fontSize: 12,
              },
            },
            lineStyle: {
              normal: {
                color: "green",
                width: 4,
                type: "line",
              },
            },
          },
          {
            name: "流量",
            data: props.uv,
            type: "line",
            stack: "x",
            label: {
              show: true,
              position: "bottom",
              textStyle: {
                fontSize: 12,
              },
            },
            lineStyle: {
              normal: {
                color: "orange",
                width: 4,
                type: "line",
              },
            },
          },
        ],
      });
    
      const conversionRateChart = echarts.init(conversionRate.current);
      conversionRateChart.setOption({
        xAxis: {
          data: days,
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}%",
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}%",
          },
        },
        series: [
          {
            type: "bar",
            data: props.coversionRate,
          },
        ],
      });
    
      const originChart = echarts.init(origin.current);
      originChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          left: "center",
          bottom: 0,
        },
        series: [
          {
            name: "访问来源分布",
            type: "pie",
            radius: ["30%", "60%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: props.origin,
          },
        ],
      });
    
      const storeChart = echarts.init(store.current);
      storeChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: '{b} : {c}%'
        },
        legend: {
          top: 'bottom'
        },
        series: [
          {
            name: '库存图表',
            type: 'pie',
            radius: [18, 90],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 4
            },
            data: props.store
          }
        ]
      })
  }, [props.sale, props.coversionRate, props.origin, props.uv, props.store])

  useEffect(() => {
    // 因为使用了react-activation来缓存页面状态，导致挂载时还拿不到DOM元素宽高，需要做一下延迟
    setTimeout(() => {
      chartInit()
    }, 200);
  }, [chartInit]);

  const onClick = () => {
    // to detail
  };

  return (
    <div className="w-full simple-chart-panel">
      <Card className="mt-20" title="销量/流量" extra={<a href="#" onClick={onClick}>更多</a>}>
        <div className="w-full h-400" ref={panel}></div>
      </Card>
      <Row gutter={20}>
        <Col span={8}>
          <Card className="mt-20" title="转化率" extra={<a href="#" onClick={onClick}>更多</a>}>
            <div className="w-full h-300" ref={conversionRate}></div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="mt-20" title="访问来源" extra={<a href="#" onClick={onClick}>更多</a>}>
            <div className="w-full h-300" ref={origin}></div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="mt-20" title="库存分布" extra={<a href="#" onClick={onClick}>更多</a>}>
            <div className="w-full h-300" ref={store}></div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default React.memo(SimpleChartPanel);
