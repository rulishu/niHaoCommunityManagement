import React from 'react'
import './index.css'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'
import { ProForm, useForm } from '@uiw-admin/components'
import { Button, Input } from 'uiw'
import { useNavigate } from 'react-router-dom'
import { LoginParams } from '@/servers/login'

export default function Register() {
  const dispatch = useDispatch<Dispatch>()
  const form = useForm()
  const navigate = useNavigate()
  // const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="uiw-loayout-register">
      <div className="uiw-loayout-register-warp  uiw-loayout-register-warp-center">
        {/* <div className="uiw-loayout-register-body"> */}
        <div style={{ width: 350 }}>
          <ProForm
            // style={{ width: 100 }}
            form={form}
            // 表单类型
            // formType="card"
            // showSaveButton
            // title="注册"
            // 提交后验证
            onSubmit={(initial, current) => {
              initial
              const errorObj: Partial<LoginParams> = {}
              if (!current.idCard) errorObj.idCard = '身份证不能为空！'
              if (!current.nickName) errorObj.nickName = '昵称不能为空！'
              if (!current.password) errorObj.password = '密码不能为空！'
              if (!current.realName) errorObj.realName = '真实姓名不能为空！'
              if (Object.keys(errorObj).length > 0) {
                const err: Error & { filed?: Partial<LoginParams> } =
                  new Error()
                err.filed = errorObj
                throw err
              }
              dispatch.login.register(current as LoginParams)
              // 调用请求接口
            }}
            formDatas={[
              {
                label: '身份证',
                key: 'idCard',
                widget: 'input',
                initialValue: '',
                widgetProps: {},
                span: '24',
                // help: 'input不能为空',
                // required: true,
                placeholder: '请输入身份证号',
                children: <Input preIcon="verification" id="idCard" />,
              },
              {
                label: '昵称',
                key: 'nickName',
                widget: 'input',
                initialValue: '',
                widgetProps: {},
                span: '24',
                // help: 'input不能为空',
                // required: true,
                placeholder: '请输入昵称',
                children: <Input preIcon="user" id="idCard" />,
              },
              {
                label: '密码',
                key: 'password',
                widget: 'input',
                initialValue: '',
                widgetProps: {},
                span: '24',
                // help: 'input不能为空',
                // required: true,
                placeholder: '请输入密码',
                children: <Input preIcon="lock" id="idCard" />,
              },
              {
                label: '真实姓名',
                key: 'realName',
                widget: 'input',
                initialValue: '',
                widgetProps: {},
                span: '24',
                // help: 'input不能为空',
                // required: true,
                placeholder: '请输入真实姓名',
                children: <Input preIcon="user" id="idCard" />,
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
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}
