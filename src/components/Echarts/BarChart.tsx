import { useEffect } from 'react'
import * as echarts from 'echarts'
import useSWR from 'swr'
// import { request } from "@uiw-admin/utils";

export default function BarChart() {
  const { data } = useSWR([
    'api/home/statistical',
    {
      method: 'POST',
      body: {},
    },
  ])
  const {
    lackData,
    lackMoney,
    rentQuantity,
    sellQuantity,
    unchargedData,
    unchargedMoney,
    vacancyQuantity,
  } = data.data
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
            { value: lackData, name: '欠费数据' },
            { value: lackMoney, name: '欠费金额' },
            { value: rentQuantity, name: '商铺出租数' },
            { value: sellQuantity, name: '商铺出售数' },
            { value: unchargedData, name: '待收费数据' },
            { value: unchargedMoney, name: '待收费金额' },
            { value: vacancyQuantity, name: '商铺空置数' },
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
  }, [
    lackData,
    lackMoney,
    rentQuantity,
    sellQuantity,
    unchargedData,
    unchargedMoney,
    vacancyQuantity,
  ])
  return <div id="main" style={{ width: '100%', height: 500 }}></div>
}
