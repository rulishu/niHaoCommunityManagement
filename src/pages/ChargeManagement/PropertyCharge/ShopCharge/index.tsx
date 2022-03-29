import { Fragment, useEffect, useState } from 'react'
import { Tabs } from 'uiw'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '@uiw-admin/models'
import Routine from './TabsList/routine'
import Temporary from './TabsList/temporary'
import Deposit from './TabsList/deposit'
import Advance from './TabsList/advance'
import Drawer from './Drawer'
import { searchValue } from '@/servers/ChargeManagement/ShopCharge'

interface State {
  drawerVisible?: boolean
  drawerType?: string
  queryInfo?: object
}

export default function Demo() {
  const dispatch = useDispatch<Dispatch>()
  const {
    shopCharge: { shopNoList },
  } = useSelector((shopCharge: RootState) => shopCharge)

  const [option, setOption] = useState<searchValue[]>(shopNoList)
  const [value, setValue] = useState('')

  useEffect(() => {
    // 查询所有商铺
    dispatch({
      type: 'shopCharge/shopSelectPage',
    })
    // 支付方式
    dispatch({
      type: 'shopCharge/pay',
    })
    // 收费项目
    dispatch({
      type: 'shopCharge/service',
    })
  }, [dispatch])

  // 塞选商铺
  useEffect(() => {
    setOption(
      value
        ? shopNoList.filter((item: any) => item.label.indexOf(value) !== -1)
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

  // 查询
  const onSearch = (table: any) => {
    table.onSearch()
    updateData({
      // @ts-ignorets-ignore
      searchParms: { code: table?.form?.current?.getFieldValues()?.code || '' },
    })
    dispatch({
      type: 'shopCharge/buShop',
      payload: {
        // @ts-ignorets-ignore
        code: table?.form?.current?.getFieldValues()?.code || '',
      },
    })
  }

  const payload = {
    option,
    setValue,
    updateData,
    dispatch,
    onSearch,
  }
  return (
    <Fragment>
      <Tabs type="card" activeKey="rout">
        <Tabs.Pane label="常规收费" key="rout">
          <Routine {...payload} />
        </Tabs.Pane>
        <Tabs.Pane label="临时收费" key="tem">
          <Temporary {...payload} />
        </Tabs.Pane>
        <Tabs.Pane label="收取押金" key="dep">
          <Deposit {...payload} />
        </Tabs.Pane>
        <Tabs.Pane label="预存款" key="adv">
          <Advance {...payload} />
        </Tabs.Pane>
      </Tabs>
      <Drawer {...payload} />
    </Fragment>
  )
}
