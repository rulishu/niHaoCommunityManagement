import { Fragment, useEffect, useState } from 'react'
import { Tabs } from 'uiw'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '@uiw-admin/models'
import Rout from './rout'
// import Tem from './tem'
// import Dep from './dep'
// import AdDep from './AdDep'
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
      <Tabs
        type="card"
        activeKey="rout"
        onTabClick={(tab) => {
          updateData({ keys: tab })
        }}
      >
        <Tabs.Pane label="常规收费" key="rout">
          <Rout option1={option} setValue={setValue} />
        </Tabs.Pane>
        {/* <Tabs.Pane label="临时收费" key="tem">
          <Tem
            option1={option1}
            loading={loading}
            value={value}
            setValue={setValue}
            handleSearch={handleSearch}
            newCode={newCode}
          />
        </Tabs.Pane>
        <Tabs.Pane label="收取押金" key="dep">
          <Dep
            option1={option1}
            loading={loading}
            value={value}
            setValue={setValue}
            handleSearch={handleSearch}
            newCode={newCode}
          />
        </Tabs.Pane>
        <Tabs.Pane label="预存款" key="AdDep">
          <AdDep
            option1={option1}
            loading={loading}
            value={value}
            setValue={setValue}
            handleSearch={handleSearch}
            newCode={newCode}
          />
        </Tabs.Pane> */}
      </Tabs>
    </Fragment>
  )
}
