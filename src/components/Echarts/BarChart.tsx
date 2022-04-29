import { useEffect } from 'react'
import * as echarts from 'echarts'
import useSWR from 'swr'

export default function BarChart() {
  const { data } = useSWR([
    'api/home/statistical',
    {
      method: 'POST',
      body: {},
    },
  ])
  useEffect(() => {
    const myChart = echarts.init(document.getElementById('main')!)
    myChart.setOption({
      title: {
        text: '统计结果',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'horizontal',
        left: 'center',
        bottom: 0,
      },
      series: [
        {
          name: '商铺租售比例',
          type: 'pie',
          radius: '50%',
          selectedMode: 'single',
          data: [
            { value: data?.data?.lackData || 0, name: '欠费数据' },
            { value: data?.data?.lackMoney || 0, name: '欠费金额' },
            { value: data?.data?.rentQuantity || 0, name: '商铺出租数' },
            { value: data?.data?.sellQuantity || 0, name: '商铺出售数' },
            { value: data?.data?.unchargedData || 0, name: '待收费数据' },
            { value: data?.data?.unchargedMoney || 0, name: '待收费金额' },
            { value: data?.data?.vacancyQuantity || 0, name: '商铺空置数' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    })
  }, [data?.data])
  return <div id="main" style={{ width: '100%', height: 500 }}></div>
}
