import React from 'react';
import { Row, Col, Icon, Card } from 'uiw';
import './index.css';

export default function Rows() {
  const list = [
    { id: 0, num: 26, title: '待收费数据（条）' },
    { id: 1, num: 27, title: '待收费金额（元）' },
    { id: 2, num: 25, title: '欠费数据（条）' },
    { id: 3, num: 27, title: '欠费金额（元）' },
  ];

  function randomColor() {
    return '#' + ('00000' + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
  }
  return (
    <Row>
      {list.map((item, index) => {
        return (
          <Col key={index} className="col-bag">
            <Card bordered={false} style={{ height: '140px' }}>
              <Icon type="smile" className="col-bag-icon" color={randomColor()} style={{ fontSize: '50px' }} />
              <div>
                <div className="col-num">{item.num}</div>
                <div className="col-title">{item.title}</div>
              </div>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
