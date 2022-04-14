import BasicLayout, { useLayouts } from '@uiw-admin/basic-layouts'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'
import { Outlet } from 'react-router-dom'
import { RoutersProps } from '@uiw-admin/router-control'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
interface BasicLayoutProps {
  routes: RoutersProps[]
}

function BasicLayoutScreen(props: BasicLayoutProps = { routes: [] }) {
  const dispatch = useDispatch<Dispatch>()

  const navigate = useNavigate()

  const layouts = useLayouts()

  const { mutate } = useSWR(['/api/account/refreshAuth', { method: 'POST' }], {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    onSuccess: (data) => {
      if (data && data.code === 1) {
        // localStorage.setItem('auth', JSON.stringify(data?.data?.menuList || []))
        // localStorage.setItem('userInfo', JSON.stringify(data?.data?.user || {}))
        sessionStorage.setItem(
          'auth',
          JSON.stringify(data?.data?.menuList || [])
        )
        sessionStorage.setItem(
          'userInfo',
          JSON.stringify(data?.data?.user || {})
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
