import React from 'react';
import { Row, Col, Card } from 'uiw';
import BarChart from '@/components/Echarts/BarChart';
import PieChart from '@/components/Echarts/PieChart';

export default function Chart() {
  return (
    <div style={{ marginTop: '5px' }}>
      <Row>
        <Col style={{ margin: '5px' }}>
          <Card title="商铺租售情况" bordered={false} style={{ height: 600 }}>
            <div style={{ width: '100%', }}>
              <PieChart />
              {/* <img src={require('./tupian.png')} style={{ width: '70%' }} /> */}
            </div>
          </Card>
        </Col>
        <Col style={{ margin: '5px' }}>
          <Card title="月度收费" bordered={false} style={{ height: 600, }}>
            <BarChart />
            {/* <img src={require('./tupian1.png')} style={{ width: '100%' }} /> */}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
