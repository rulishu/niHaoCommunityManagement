import BasicLayout, { useLayouts } from '@uiw-admin/basic-layouts'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '@uiw-admin/models'
import { Outlet } from 'react-router-dom'
import { RoutersProps } from '@uiw-admin/router-control'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { useEffect } from 'react'
interface BasicLayoutProps {
  routes: RoutersProps[]
}

function BasicLayoutScreen(props: BasicLayoutProps = { routes: [] }) {
  const {
    userInfo: { userInfoData },
  }: any = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()
  useEffect(() => {
    dispatch({
      type: 'userInfo/getProfileFun',
    })
  }, [dispatch])

  const navigate = useNavigate()

  const layouts = useLayouts()

  const { mutate } = useSWR(['/api/account/refreshAuth', { method: 'POST' }], {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    onSuccess: (data) => {
      if (data && data.code === 1) {
        sessionStorage.setItem(
          'auth',
          JSON.stringify(data?.data?.menuList || [])
        )
        window.location.reload()
      }
    },
  })

  const setting = async () => {
    dispatch({
      type: 'userInfo/updateState',
      payload: { index: '2', title: '修改密码' },
    })
    navigate('/userInfo', { replace: true })
  }

  const basicLayoutProps = {
    onReloadAuth: async () => mutate(),
    // 修改密码以及其他操作在项目中进行
    menus: [
      {
        title: '欢迎来到共享社区管理平台',
        icon: 'smile',
        onClick: () => layouts.closeMenu(),
      },
      {
        title: '修改密码',
        icon: 'setting',
        onClick: () => setting(),
      },
    ],
    profile: {
      avatar:
        'http://192.168.188.222:33680/scmp-service/' + userInfoData?.avatar,
      userName: userInfoData.nickName,
    },
    layouts,
    ...props,
  }
  return (
    <BasicLayout {...basicLayoutProps} projectName="共享社区管理平台">
      <Outlet />
    </BasicLayout>
  )
}
export default BasicLayoutScreen
