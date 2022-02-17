import React from 'react';
import Regular from './Regular';
// import Temporary from './temporary';
// import Deposit from './deposit';
// import Advance from './advance'
import { Tabs, Card } from 'uiw';
import { Params } from '@/servers/account-admin';

export default function Demo(props: {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setTableType: React.Dispatch<React.SetStateAction<'add' | 'edit' | null>>;
    setKeys: React.Dispatch<React.SetStateAction<string>>
    visible: boolean;
    tableType: 'add' | 'edit' | null;
    initObj: Params;
    keys: string
}) {
    return (
        <Card style={{ marginTop: 10 }}>
            <Tabs type="line" activeKey="1" onTabClick={(tab) => {
                props.setVisible(true);
                props.setTableType('add');
                props.setKeys(tab);
            }}>
                <Tabs.Pane label="常规收费" key="1">
                    <Regular keys={props.keys} />
                </Tabs.Pane>
                <Tabs.Pane label="临时收费" key="2">
                    <Regular keys={props.keys} />
                </Tabs.Pane>
                <Tabs.Pane label="收取押金" key="3">
                    <Regular keys={props.keys} />
                </Tabs.Pane>
                <Tabs.Pane label="预存款" key="4">
                    <Regular keys={props.keys} />
                </Tabs.Pane>
            </Tabs>
        </Card>
    )
}

