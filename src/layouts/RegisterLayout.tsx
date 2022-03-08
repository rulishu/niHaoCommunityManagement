import React from 'react'
import UserLogin from '@uiw-admin/user-login'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'
import { useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button, Select } from 'uiw'
import { LoginParams } from '@/servers/login'
import { verifyIDCard, verifyPhone, verifyPassword } from '@/utils'
import './index.css'
const RegisterLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<Dispatch>()

  return (
    <UserLogin projectName={'共享社区管理平台'}>
      <Form
        resetOnSubmit={false}
        onSubmit={({ current }) => {
          const errorObj: Partial<LoginParams> = {}
          // if (!current.nickName) errorObj.nickName = `请输入昵称！`;
          if (!verifyPassword(current.password))
            errorObj.password = `请正确输入密码！`
          if (!verifyIDCard(current.cardId))
            errorObj.cardId = `请正确输入身份证！`
          if (!current.userName) errorObj.userName = `请输入真实姓名！`
          if (!verifyPhone(current.phoneNumber))
            errorObj.phoneNumber = `请正确输入手机号！`
          if (Object.keys(errorObj).length > 0) {
            const err: Error & { filed?: Partial<LoginParams> } = new Error()
            err.filed = errorObj
            throw err
          } else {
            dispatch.login.register(current as LoginParams)
          }
        }}
        onSubmitError={(error) => {
          if (error.filed) {
            return { ...error.filed }
          }
          return null
        }}
        fields={{
          nickName: {
            inline: true,
            label: `用户账号`,
            labelFor: 'nickName',
            children: (
              <input
                type="text"
                id="nickName"
                placeholder={`请输入用户账号`}
                className="form-fields"
              />
            ),
          },
          password: {
            inline: true,
            label: `用户密码`,
            labelFor: 'password',
            help: '最少6位，允许字母、数字',
            initialValue: '',
            children: (
              <input
                type="password"
                id="password"
                placeholder={`请输入用户密码`}
                className="form-fields"
              />
            ),
          },
          cardId: {
            inline: true,
            label: `身份证号`,
            labelFor: 'cardId',
            children: (
              <input
                type="text"
                id="cardId"
                placeholder={`请输入身份证号`}
                className="form-fields"
              />
            ),
          },
          userName: {
            inline: true,
            label: `真实姓名`,
            labelFor: 'userName',
            initialValue: '',
            children: (
              <input
                type="text"
                id="userName"
                placeholder={`请输入真实姓名`}
                className="form-fields"
              />
            ),
          },
          gender: {
            inline: true,
            label: `用户性别`,
            labelFor: 'gender',
            initialValue: 0,
            children: (
              <Select
                id="gender"
                placeholder={`请选择用户性别`}
                className="form-fields"
              >
                <Select.Option value={0}>男</Select.Option>
                <Select.Option value={1}>女</Select.Option>
              </Select>
            ),
          },
          phoneNumber: {
            inline: true,
            label: `手机号码`,
            labelFor: 'phoneNumber',
            children: (
              <input
                id="phoneNumber"
                type="text"
                placeholder={`请输入手机号码`}
                className="form-fields"
              />
            ),
          },
        }}
      >
        {({ fields, canSubmit }) => {
          return (
            <div>
              <Row>
                <Col style={{ color: '#555' }}>{fields.nickName}</Col>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <Col style={{ color: '#555' }}>{fields.password}</Col>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <Col style={{ color: '#555' }}>{fields.cardId}</Col>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <Col style={{ color: '#555' }}>{fields.userName}</Col>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <Col style={{ color: '#555' }}>{fields.gender}</Col>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <Col style={{ color: '#555' }}>{fields.phoneNumber}</Col>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <Button
                  disabled={!canSubmit()}
                  className="btns"
                  block
                  htmlType="submit"
                  type="primary"
                >
                  注册
                </Button>
                <Button
                  className="btns"
                  onClick={() => navigate('/login', { replace: true })}
                >
                  返回
                </Button>
              </Row>
            </div>
          )
        }}
      </Form>
    </UserLogin>
  )
}
export default RegisterLayout
