import React from 'react';
import Search from './Search';
// import Drawer from './Detail';
// import Modals from './Modals';
// import { Dispatch } from '@uiw-admin/models';
// import { useDispatch } from 'react-redux';

const Index = () => {
    // const dispatch = useDispatch<Dispatch>();

    // const updateData =(payload:any)=>{
    //     dispatch({
    //         type:'temporaryCharges/updateState',
    //         payload,
    //     })
    // }

    return (
        <div>
            <Search />
            {/* <Drawer updateData={updateData} /> */}
            {/* <Modals /> */}
        </div>
    )
}

export default Index;