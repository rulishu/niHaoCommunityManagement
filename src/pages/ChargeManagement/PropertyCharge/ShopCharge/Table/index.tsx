import React from 'react';
import Regular from './Regular';
// import Temporary from './temporary';
// import Deposit from './deposit';
// import Advance from './advance'
import { Tabs, Card } from 'uiw';
// import { Params } from '@/servers/account-admin';
import { Dispatch } from '@uiw-admin/models';
import { useDispatch } from 'react-redux';
interface State {
    drawerVisible?: boolean;
    tableType?: string;
    queryInfo?: object;
    isView?: boolean;
}
export default function Demo() {
    const dispatch = useDispatch<Dispatch>();

    const updateData = (payload: State) => {
        dispatch({
            type: 'shopCharge/updateState',
            payload,
        })
    }
    return (
        <Card style={{ marginTop: 10 }}>
            <Tabs type="line" activeKey="1" onTabClick={(tab) => {
                //  dispatch({
                //     type: 'shopCharge/updateState',
                //     payload:{
                //         tableType: tab
                //     }
                // })
                updateData({tableType: tab})
            }} >
                <Tabs.Pane label="常规收费" key="1">
                    <Regular />
                </Tabs.Pane>
                <Tabs.Pane label="临时收费" key="2">
                    <Regular  />
                </Tabs.Pane>
                <Tabs.Pane label="收取押金" key="3">
                    <Regular  />
                </Tabs.Pane>
                <Tabs.Pane label="预存款" key="4">
                    <Regular />
                </Tabs.Pane>
            </Tabs>
        </Card>
    )
}

