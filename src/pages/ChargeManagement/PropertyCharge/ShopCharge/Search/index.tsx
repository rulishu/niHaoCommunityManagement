import { Fragment, useEffect, useState } from 'react'
import { Tabs } from 'uiw'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '@uiw-admin/models'
import Rout from './rout'
import Tem from './tem'
import Dep from './dep'
import AdDep from './AdDep'
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
  useEffect(() => {
    dispatch({
      type: 'shopCharge/shopSelectPage',
    })
  }, [dispatch])

  const {
    shopCharge: { shopNoList },
  } = useSelector((shopCharge: RootState) => shopCharge)

  const [option1, setOption] = useState<searchValue[]>(shopNoList)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState<searchValue[]>([])
  const [newCode, setNewCode] = useState('')

  useEffect(() => {
    setOption(shopNoList)
  }, [shopNoList])

  useEffect(() => {
    if (value.length === 0) {
      setNewCode('')
    } else {
      setNewCode(value[0].value)
    }
  }, [value])

  const updateData = (payload: State) => {
    dispatch({
      type: 'shopCharge/updateState',
      payload,
    })
  }

  const handleSearch = (e: any) => {
    setLoading(true)
    setTimeout(() => {
      const filterOpion = shopNoList.filter(
        (item: any) => !!item.label.includes(e.trim())
      )
      setOption([...filterOpion])
      setLoading(false)
    }, 500)
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
          <Rout
            option1={option1}
            loading={loading}
            value={value}
            setValue={setValue}
            handleSearch={handleSearch}
            newCode={newCode}
          />
        </Tabs.Pane>
        <Tabs.Pane label="临时收费" key="tem">
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
        </Tabs.Pane>
      </Tabs>
    </Fragment>
  )
}
