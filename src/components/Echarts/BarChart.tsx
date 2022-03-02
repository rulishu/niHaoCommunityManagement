import React, { useEffect } from 'react';
import * as echarts from 'echarts';

export default function BarChart() {
  useEffect(() => {
    const myChart = echarts.init(document.getElementById('main')!);
    myChart.setOption({
      title: {
        // text: 'ECharts 入门示例',
      },
      tooltip: {},
      xAxis: {
        data: ['2021-09', '2021-10', '2021-11', '2021-12', '2022-01','2022-02'],
      },
      yAxis: {},
      series: [
        {
          name: '收款金额',
          type: 'bar',
          data: [165, 0, 0, 43, 29, 1001],
        },
      ],
    });
  }, []);
  return <div id="main" style={{ width: '100%', height: 500 }}></div>;
}
