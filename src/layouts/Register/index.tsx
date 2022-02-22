import React from 'react'
import './index.css'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'
import { ProForm, useForm } from '@uiw-admin/components'
import { Button, Input, Select } from 'uiw'
import { useNavigate } from 'react-router-dom'
import { LoginParams } from '@/servers/login'

export default function Register() {
  const dispatch = useDispatch<Dispatch>()
  const form = useForm()
  const navigate = useNavigate()

  return (
    <div className="uiw-loayout-register">
      <div className="uiw-loayout-register-warp  uiw-loayout-register-warp-center">
        <div style={{ width: 350 }}>
          <ProForm
            form={form}
            onSubmit={(initial, current) => {
              initial
              const errorObj: Partial<LoginParams> = {}
              if (!current.cardId) errorObj.cardId = '身份证不能为空！'
              if (!current.nickName) errorObj.nickName = '昵称不能为空！'
              if (!current.password) errorObj.password = '密码不能为空！'
              if (!current.userName) errorObj.userName = '真实姓名不能为空！'
              if (!current.phoneNumber)
                errorObj.phoneNumber = '手机号不能为空！'
              if (Object.keys(errorObj).length > 0) {
                const err: Error & { filed?: Partial<LoginParams> } =
                  new Error()
                err.filed = errorObj
                throw err
              }
              const datas = { ...current }
              const { gender, ...res } = datas
              const params = { ...res }
              if (gender) {
                params.gender = Number(gender)
              } else if (gender === '') {
                params.gender = 0
              }
              dispatch.login.register(params as LoginParams)
              // 调用请求接口
            }}
            formDatas={[
              {
                label: '昵称',
                key: 'nickName',
                widget: 'input',
                initialValue: '',
                widgetProps: {},
                span: '24',
                placeholder: '请输入昵称',
                children: <Input preIcon="user" id="nickName" />,
              },
              {
                label: '密码',
                key: 'password',
                widget: 'input',
                initialValue: '',
                widgetProps: {},
                span: '24',
                placeholder: '请输入密码',
                children: <Input preIcon="lock" id="password" />,
              },
              {
                label: '身份证',
                key: 'cardId',
                widget: 'input',
                initialValue: '',
                widgetProps: {},
                span: '24',
                placeholder: '请输入身份证号',
                children: <Input preIcon="verification" id="cardId" />,
              },
              {
                label: '真实姓名',
                key: 'userName',
                widget: 'input',
                initialValue: '',
                widgetProps: {},
                span: '24',
                placeholder: '请输入真实姓名',
                children: <Input preIcon="user" id="userName" />,
              },
              {
                label: '性别',
                key: 'gender',
                widget: 'input',
                initialValue: '',
                widgetProps: {},
                span: '24',
                placeholder: '请选择性别',
                children: (
                  <Select id="gender">
                    <Select.Option value={0}>男</Select.Option>
                    <Select.Option value={1}>女</Select.Option>
                  </Select>
                ),
              },
              {
                label: '手机号',
                key: 'phoneNumber',
                widget: 'input',
                initialValue: '',
                widgetProps: {},
                span: '24',
                placeholder: '请输入手机号',
                children: <Input preIcon="mobile" id="phoneNumber" />,
              },
            ]}
          />
          <div style={{ display: 'flex' }}>
            <Button
              style={{ marginTop: 10, width: '50%' }}
              type="primary"
              onClick={() => form.submitvalidate()}
            >
              注册
            </Button>
            <Button
              style={{ marginTop: 10, width: '50%' }}
              onClick={() => navigate('/login', { replace: true })}
            >
              返回
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
