import UserLogin from '@uiw-admin/user-login'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'
import { useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button, Select } from 'uiw'
import { LoginParams } from '@/servers/login'
import { verifyIDCard, verifyPhone, verifyPassword } from '@/utils'

const RegisterLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<Dispatch>()

  return (
    <UserLogin projectName={null} logo={null} styleBody={{ width: 400 }}>
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
            // inline: true,
            label: `用户账号`,
            labelFor: 'nickName',
            children: (
              <input
                type="text"
                id="nickName"
                placeholder={`请输入用户账号`}
                className="form-field"
              />
            ),
          },
          password: {
            // inline: true,
            label: `用户密码`,
            labelFor: 'password',
            help: '最少6位，允许字母、数字',
            initialValue: '',
            children: (
              <input
                type="password"
                id="password"
                placeholder={`请输入用户密码`}
                className="form-field"
              />
            ),
          },
          cardId: {
            // inline: true,
            label: `身份证号`,
            labelFor: 'cardId',
            children: (
              <input
                type="text"
                id="cardId"
                placeholder={`请输入身份证号`}
                className="form-field"
              />
            ),
          },
          userName: {
            // inline: true,
            label: `真实姓名`,
            labelFor: 'userName',
            initialValue: '',
            children: (
              <input
                type="text"
                id="userName"
                placeholder={`请输入真实姓名`}
                className="form-field"
              />
            ),
          },
          gender: {
            // inline: true,
            label: `用户性别`,
            labelFor: 'gender',
            initialValue: 1,
            children: (
              <Select
                id="gender"
                placeholder={`请选择用户性别`}
                className="form-field"
              >
                <Select.Option value={1}>男</Select.Option>
                <Select.Option value={2}>女</Select.Option>
              </Select>
            ),
          },
          phoneNumber: {
            // inline: true,
            label: `手机号码`,
            labelFor: 'phoneNumber',
            children: (
              <input
                id="phoneNumber"
                type="text"
                placeholder={`请输入手机号码`}
                className="form-field"
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
              <Row>
                <Col style={{ color: '#555' }}>{fields.password}</Col>
              </Row>
              <Row>
                <Col style={{ color: '#555' }}>{fields.cardId}</Col>
              </Row>
              <Row>
                <Col style={{ color: '#555' }}>{fields.userName}</Col>
              </Row>
              <Row>
                <Col style={{ color: '#555' }}>{fields.gender}</Col>
              </Row>
              <Row>
                <Col style={{ color: '#555' }}>{fields.phoneNumber}</Col>
              </Row>
              <Row>
                <Button
                  disabled={!canSubmit()}
                  className="btns"
                  block
                  htmlType="submit"
                  type="primary"
                  style={{ width: '45%', marginRight: 30 }}
                >
                  注册
                </Button>
                <Button
                  className="btns"
                  onClick={() => navigate('/login', { replace: true })}
                  style={{ width: '45%' }}
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
