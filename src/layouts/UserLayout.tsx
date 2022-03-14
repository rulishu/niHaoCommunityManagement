import UserLogin from '@uiw-admin/user-login'
import { useNavigate } from 'react-router-dom'
import { Notify } from 'uiw'

const UserLayout = () => {
  const navigate = useNavigate()

  return (
    <UserLogin
      projectName={'共享社区管理平台'}
      buttons={[
        {
          title: '登录',
          htmlType: 'submit',
          type: 'primary',
          style: { width: '45%', marginRight: 30 },
        },
        {
          title: '注册',
          style: { width: '45%' },
          onClick: () => {
            navigate('/register', { replace: true })
          },
        },
      ]}
      api="/api/account/pcLogin"
      btnProps={{ type: 'primary' }}
      saveField={{
        userName: 'nickName',
        passWord: 'password',
      }}
      onSuccess={(data) => {
        if (data && data.token) {
          sessionStorage.setItem('token', data.token)
          sessionStorage.setItem(
            'auth',
            JSON.stringify(data.data.menuList || [])
          )

          navigate('/home', { replace: true })
        } else {
          Notify.error({
            title: '错误通知',
            description: data.error || '请求失败',
          })
        }
      }}
    />
  )
}
export default UserLayout
