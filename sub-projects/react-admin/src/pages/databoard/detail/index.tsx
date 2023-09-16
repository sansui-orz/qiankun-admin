import { useRef, useEffect, useCallback, useState } from "react";
import { Card } from "antd";
import * as echarts from "echarts/core";
import Search, { SearchValues, IRefProps } from "./components/search";
import request from "main_request/request";
import { LoadingContainer } from "@/comonents/loading";
import { ChartDetail } from '@/types/api';

import "./index.less";

function DataboardDetail() {
  const chart = useRef<HTMLDivElement>(null);
  const search = useRef<IRefProps>(null);
  const [loading, setLoading] = useState(true)
  const saleChartRef = useRef<echarts.ECharts | null>(null)
  const chartInit = useCallback((charts: string[], dateRange: string[], series: ChartDetail['series']) => {
    // 绘制图表
    saleChartRef.current!.clear()
    saleChartRef.current!.setOption({
      title: {
        text: "数据详情图表",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        orient: "horizontal",
        bottom: 0,
        data: charts,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "10%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: dateRange,
      },
      yAxis: {
        type: "value",
      },
      series: series
    });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      saleChartRef.current = echarts.init(chart.current);
      search.current!.search();
    }, 200);
  }, []);
  return (
    <div className="databoard-detail">
      <Search
        ref={search}
        onSearch={(values: SearchValues) => {
          request.get<ChartDetail>('/chart-detail', {
            params: {
              charts: values.charts,
              dateRange: values.dateRange
            }
          }).then(res => {
            chartInit(res.data.legend, res.data.xAxis, res.data.series);
            setLoading(false)
          })
        }}
      />
      <Card className="mt-20">
        <LoadingContainer isLoading={loading}>
          <div className="w-full h-500" ref={chart}></div>
        </LoadingContainer>
      </Card>
    </div>
  );
}

export default DataboardDetail;
