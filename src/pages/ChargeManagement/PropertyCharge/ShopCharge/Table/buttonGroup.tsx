import React from 'react'
import { Button } from "uiw";
import { useSelector, } from 'react-redux';
import { RootState, } from '@uiw-admin/models';

export default function ButtonGroup() {
    // const dispatch = useDispatch<Dispatch>();

    const {
        shopCharge: { tableType, },
    } = useSelector((state: RootState) => state);

    return (
        <div>
            {tableType === '1' ?
                <>
                    <Button type="primary">收费</Button>
                    <Button type="primary">历史信息</Button>
                </>
                : (tableType === '2' || tableType === '3') ?
                    <Button type="primary">新增</Button>
                    :
                    <>
                        <Button type="primary">预存</Button>
                        <Button type="primary">退还</Button>
                    </>
            }
        </div>
    )
}