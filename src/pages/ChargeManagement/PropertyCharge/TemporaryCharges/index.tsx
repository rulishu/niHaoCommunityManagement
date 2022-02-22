import React from 'react';
import Search from './Search';
import Drawer from './Detail';
import Modals from './Modals';
import { Dispatch } from '@uiw-admin/models';
import { useDispatch } from 'react-redux';
interface State {
    drawerVisible?: boolean;
    tableType?: string;
    queryInfo?: object;
    isView?: boolean;
}
const Index = () => {
    const dispatch = useDispatch<Dispatch>();

    const updateData = (payload: State) => {
        dispatch({
            type: 'temporaryCharges/updateState',
            payload,
        })
    }

    return (
        <div>
            <Search />
            <Drawer updateData={updateData} />
            <Modals />
        </div>
    )
}

export default Index;