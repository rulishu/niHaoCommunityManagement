import React, { useState } from 'react';
import Search from './Search';
import Drawer from './Table/index';
import { Params } from '@/servers/account-admin';

const Index = () => {
  const [visible, setVisible] = useState(false);
  const [tableType, setTableType] = useState<'add' | 'edit' | null>('add');
  const [initObj, setInitObj] = useState<Params>({})
  const [keys, setKeys] = useState('1')

  return (
    <div>
      <Search
        visible={visible}
        setVisible={setVisible}
        tableType={tableType}
        setTableType={setTableType}
        setInitObj={setInitObj}
      />
      <Drawer
        visible={visible}
        setVisible={setVisible}
        tableType={tableType}
        setTableType={setTableType}
        initObj={initObj}
        keys={keys}
        setKeys={setKeys}
      />
    </div>
  )
}
export default Index;