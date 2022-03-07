import React from 'react'
import UserLogin from '@uiw-admin/user-login'
import { useNavigate } from 'react-router-dom'
import { Notify } from 'uiw'
import './index.css'
const UserLayout = () => {
  const navigate = useNavigate()

  return (
    <UserLogin
      projectName="共享社区管理平台"
      buttons={[
        {
          title: '登录',
          htmlType: 'submit',
          type: 'primary',
          // style: { width: '45%' },
        },
        {
          title: '注册',
          // style: { width: '45%' },
          onClick: () => {
            navigate('/register', { replace: true })
          },
        },
      ]}
      api="/api/account/pcLogin"
      btnProps={{ type: 'primary' }}
      fields={[
        {
          style: { display: 'flex', flexDirection: 'row' },
          name: 'nickName',
          label: '账号',
          labelFor: 'nickName',
          children: (
            <input
              id={'nickName'}
              type="text"
              placeholder={`请输入账号`}
              className="form-fields"
            />
          ),
        },
        {
          style: { display: 'flex', flexDirection: 'row' },
          name: 'password',
          label: '密码',
          labelFor: 'password',
          children: (
            <input
              id={'password'}
              type="password"
              placeholder={`请输入密码`}
              className="form-fields"
            />
          ),
        },
      ]}
      isDefaultFields={false}
      // saveField={{
      //   userName: 'nickName',
      //   passWord: 'password',
      // }}
      onSuccess={(data) => {
        if (data && data.token) {
          sessionStorage.setItem('token', data.token)
          sessionStorage.setItem('auth', JSON.stringify(data.authList || []))
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
