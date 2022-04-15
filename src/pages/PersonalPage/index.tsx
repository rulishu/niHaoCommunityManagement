import { useEffect } from 'react'
import { Menu } from 'uiw'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import Split from '@uiw/react-split'
import PDFrom from './personalData'
import CPFrom from './changePassword'

function PersonalPage() {
  const buttonName = [
    { id: '1', name: '基本信息', icon: 'verification' },
    { id: '2', name: '修改密码', icon: 'lock' },
  ]
  const dispatch = useDispatch<Dispatch>()

  const {
    userInfo: { title, index, userInfoData },
  }: any = useSelector((state: RootState) => state)

  const onButName = (data: any) => {
    dispatch({
      type: 'userInfo/updateState',
      payload: { index: data.id, title: data.name },
    })
  }

  const renderChildren = () => {
    switch (index) {
      case '1':
        return (
          <PDFrom
            userInfo={userInfoData?.user || {}}
            dispatch={dispatch}
            userInfoData={userInfoData}
          />
        )
      case '2':
        return <CPFrom dispatch={dispatch} userInfoData={userInfoData} />
      default:
        return null
    }
  }

  useEffect(() => {
    return () => {
      dispatch({
        type: 'userInfo/clean',
      })
    }
  }, [dispatch])

  useEffect(() => {
    dispatch({
      type: 'userInfo/getProfileFun',
    })
  }, [dispatch])

  return (
    <Split visiable={false}>
      <div style={{ width: '35%' }}>
        <Menu bordered style={{ height: '100%' }}>
          {buttonName.map((itm: any) => (
            <div key={itm.id}>
              <Menu.Item
                icon={itm.icon}
                text={itm.name}
                active={itm.id === index ? true : false}
                onClick={() => {
                  onButName(itm)
                }}
              />
              <Menu.Divider />
            </div>
          ))}
        </Menu>
      </div>
      <Split
        mode="vertical"
        visiable={false}
        style={{ width: '100%', marginLeft: 15 }}
      >
        <div
          style={{
            background: '#fff',
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 10,
            height: '100%',
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 400 }}>{title}</span>
          {renderChildren()}
        </div>
      </Split>
    </Split>
  )
}

export default PersonalPage
