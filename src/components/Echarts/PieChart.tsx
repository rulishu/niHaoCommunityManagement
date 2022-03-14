import { useEffect } from 'react'
import * as echarts from 'echarts'

export default function PieChart() {
  useEffect(() => {
    const myChart = echarts.init(document.getElementById('main1')!)
    myChart.setOption({
      title: {
        text: '商铺租售比列',
        // subtext: 'Fake Data',
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
            { value: 24, name: '空置' },
            { value: 4, name: '出租' },
            { value: 12, name: '出售' },
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

      // title: {
      //   text: 'Weather Statistics',
      //   subtext: 'Fake Data',
      //   left: 'center'
      // },
      // tooltip: {
      //   trigger: 'item',
      // },
      // legend: {
      //   bottom: 10,
      //   left: 'center',
      //   data: ['CityA', 'CityB', 'CityC',]
      // },
      // series: [
      //   {
      //     type: 'pie',
      //     radius: '50%',
      //     center: ['50%', '50%'],
      //     selectedMode: 'single',
      //     data: [
      //       { value: 21, name: 'CityC' },
      //       { value: 4, name: 'CityB' },
      //       { value: 12, name: 'CityA' }
      //     ],
      //     emphasis: {
      //       itemStyle: {
      //         shadowBlur: 10,
      //         shadowOffsetX: 0,
      //         shadowColor: 'rgba(0, 0, 0, 0.5)'
      //       }
      //     }
      //   }
      // ]
    })
  }, [])
  return <div id="main1" style={{ width: '100%', height: 500 }}></div>
}
