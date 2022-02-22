import React from 'react';
import { Table, } from 'uiw';
import ButtonGroup from './buttonGroup';
import { depositColumns } from './detail'
// interface DetailProps {
//     updateData?: any;
//   }
export default function Regular() {

    return (
        <Table
            title={<ButtonGroup />}
            columns={depositColumns()}
            // data={dataSource}
            // footer={
            //     <Pagination
            //         current={2}
            //         pageSize={10}
            //         total={30}
            //         divider
            //         onChange={(current: any, total: any, pageSize: any) => {
            //             console.log(current, total, pageSize)
            //         }}
            //     />
            // }
        />
    )
}