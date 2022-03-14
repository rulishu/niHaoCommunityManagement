import { useState, useEffect } from 'react'
import { Form, Row, Col, Button, Input, Checkbox } from 'uiw'
import { useSelector } from 'react-redux'
import logo from '../../assets/logo-dark.svg'
import styles from './index.module.less'
import { RootState } from '@uiw-admin/models'
import useSWR, { useSWRConfig } from 'swr'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const { provider } = useSWRConfig() as any
  const prt = provider()
  const loading = useSelector(
    (state: RootState) => state.loading.effects.login.submit
  )
  const state = useSelector((state: RootState) => state)
  console.log(state)

  const [store, setStore] = useState<any>()

  const { data } = useSWR(
    store
      ? [
          '/api/login',
          {
            method: 'POST',
            body: { nickName: 'admin', password: 'admin' },
          },
        ]
      : null
  )
  if (data && data.token) {
    prt.set('login', { ...data })
  }
  useEffect(() => {
    if (data && data.token) {
      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('auth', JSON.stringify(data.authList || []))
      navigate('/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)])

  return (
    <Row justify="center" align="middle" style={{ height: '100%' }}>
      <Col span="5">
        <div className={styles.logo}>
          <img src={logo} alt="Logo" />
        </div>
        <Form
          resetOnSubmit={false}
          onSubmit={({ current }) => {
            const errorObj: any = {}
            if (!current.nickName) errorObj.nickName = '用户名不能为空！'
            if (!current.password) errorObj.password = '密码不能为空！'
            if (Object.keys(errorObj).length > 0) {
              const err: any = new Error()
              err.filed = errorObj
              throw err
            } else {
              setStore({
                nickName: current.nickName,
                password: current.password,
              })
            }
          }}
          onSubmitError={(error: any) => {
            if (error.filed) {
              return { ...error.filed }
            }
            return null
          }}
          fields={{
            nickName: {
              labelClassName: 'fieldLabel',
              labelStyle: { width: 160 },
              labelFor: 'nickName',
              children: (
                <Input
                  disabled={!!loading}
                  preIcon="user"
                  id="nickName"
                  placeholder="用户名: admin"
                />
              ),
            },
            password: {
              labelClassName: 'fieldLabel',
              labelStyle: { width: 60 },
              labelFor: 'password',
              children: (
                <Input
                  disabled={!!loading}
                  preIcon="lock"
                  id="password"
                  type="password"
                  placeholder="密码: admin"
                />
              ),
            },
            terms: {
              style: { margin: 0 },
              validator: (currentValue) => !currentValue && '必须统一服务条款',
              children: (
                <Checkbox disabled={!!loading} value="1">
                  已阅读并同意
                </Checkbox>
              ),
            },
          }}
        >
          {({ fields, canSubmit }) => {
            return (
              <>
                <Row>
                  <Col>{fields.nickName}</Col>
                </Row>
                <Row>
                  <Col>{fields.password}</Col>
                </Row>
                <Row style={{ marginBottom: 10 }}>
                  <Col align="middle">{fields.terms}</Col>
                  <Col>
                    <a href="https://uiwjs.github.io">服务条款</a>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      loading={!!loading}
                      disabled={!canSubmit()}
                      block
                      type="dark"
                      htmlType="submit"
                    >
                      登录
                    </Button>
                  </Col>
                </Row>
              </>
            )
          }}
        </Form>
        <div className={styles.footer}>
          Copyright © 2018 <a href="https://github.com/uiwjs/uiw">@uiw</a>{' '}
          团队出品
        </div>
      </Col>
    </Row>
  )
}

export default Login
