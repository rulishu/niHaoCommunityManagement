import { Row, Col, Icon, Card } from 'uiw'
import './index.css'
import useSWR from "swr";
import { request } from "@uiw-admin/utils";

export default function Rows() {  
  const { data } = useSWR(
  [
    "api/home/statistical",
    {
      method: "POST",
    },
  ],
  request
);
  const list = [
    { id: 0, num: data?.data?.unchargedData|| 0, title: '待收费数据(条)' },
    { id: 1, num: data?.data?.unchargedMoney|| 0, title: '待收费金额(元)' },
    { id: 2, num: data?.data?.lackData|| 0, title: '欠费数据(条)' },
    { id: 3, num: data?.data?.lackMoney|| 0, title: '欠费金额(元)' },
    { id: 4, num: data?.data?.rentQuantity|| 0, title: '商铺出租数' },
    { id: 5, num: data?.data?.sellQuantity|| 0, title: '商铺出售数' },
    { id: 6, num: data?.data?.vacancyQuantity|| 0, title: '商铺空置数' },
  ]

  function randomColor() {
    return (
      '#' +
      ('00000' + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6)
    )
  }
  console.log('randomColor()',randomColor())
  return (
    <Row>
      {list.map((item, index) => {
        return (
          <Col key={index} className="col-bag">
            <Card bordered={false} style={{ height: '140px' }}>
              <Icon
                type="smile"
                className="col-bag-icon"
                color={randomColor()}
                style={{ fontSize: '50px' }}
              />
              <div>
                <div className="col-num">{item.num}</div>
                <div className="col-title">{item.title}</div>
              </div>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}
