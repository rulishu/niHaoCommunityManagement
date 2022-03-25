import { Fragment, useEffect, useState } from 'react'
import { Tabs } from 'uiw'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '@uiw-admin/models'
import Routine from './TabsList/routine'
import Temporary from './TabsList/temporary'
import Deposit from './TabsList/deposit'
import Advance from './TabsList/advance'
// import Tem from './tem'
// import Dep from './dep'
// import AdDep from './AdDep'
import Drawer from './Drawer'
import { searchValue } from '@/servers/ChargeManagement/ShopCharge'

interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
  keys?: string
}

export default function Demo() {
  const dispatch = useDispatch<Dispatch>()
  const {
    shopCharge: { shopNoList },
  } = useSelector((shopCharge: RootState) => shopCharge)

  const [option, setOption] = useState<searchValue[]>(shopNoList)
  const [value, setValue] = useState('')

  // 查询所有商铺
  useEffect(() => {
    dispatch({
      type: 'shopCharge/shopSelectPage',
    })
  }, [dispatch])

  // 塞选商铺
  useEffect(() => {
    setOption(
      value
        ? shopNoList.filter((item) => item.label.startsWith(value))
        : shopNoList
    )
  }, [shopNoList, value])

  // 更新值
  const updateData = (payload: State) => {
    dispatch({
      type: 'shopCharge/updateState',
      payload,
    })
  }

  return (
    <Fragment>
      <Tabs type="card" activeKey="rout">
        <Tabs.Pane label="常规收费" key="rout">
          <Routine
            option={option}
            setValue={setValue}
            updateData={updateData}
          />
        </Tabs.Pane>
        <Tabs.Pane label="临时收费" key="tem">
          <Temporary
            option={option}
            setValue={setValue}
            updateData={updateData}
          />
        </Tabs.Pane>
        <Tabs.Pane label="收取押金" key="dep">
          <Deposit
            option={option}
            setValue={setValue}
            updateData={updateData}
          />
        </Tabs.Pane>
        <Tabs.Pane label="预存款" key="adv">
          <Advance
            option={option}
            setValue={setValue}
            updateData={updateData}
          />
        </Tabs.Pane>
      </Tabs>
      <Drawer updateData={updateData} />
    </Fragment>
  )
}
