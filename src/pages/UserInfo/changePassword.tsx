import { useState } from 'react'
import { ProForm } from '@uiw-admin/components'
import { Notify, Button } from 'uiw'
import { useNavigate } from 'react-router-dom'
interface DetailProps {
  dispatch?: any
}
function CPFrom({ dispatch }: DetailProps) {
  const [btnIcon, setBtnIcon] = useState('lock' as any)
  const [newPwd, setNewPwd] = useState('lock' as any)
  const [newPwd2, setNewPwd2] = useState('lock' as any)
  const matters = [
    '1. 密码必须由字母(区分大小写)、数字组成',
    '2. 密码长度为6-16位',
    '3. 密码必须包含数字',
    '4. 密码必须包含字母',
    '5. 密码必须包含已下特殊字符, 例如: ?=.*[._~!@#$^&*',
    '6. 新密码不能与旧密码相同',
  ]

  const navigate = useNavigate()

  //提交按钮
  const onAddSubmit = async (current: any) => {
    if (
      !/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[._~!@#$^&*])[A-Za-z0-9._~!@#$^&*]{6,16}$/g.test(
        current?.newPassword || current?.newPasswordtow
      )
    ) {
      return Notify.error({ description: '请确认格式是否正确！' })
    }
    if (current.newPassword !== current?.newPasswordtow) {
      return Notify.error({ description: '两次输入的密码不一致！' })
    }
    if (
      current.oldPassword === current.newPassword ||
      current.oldPassword === current.newPasswordtow
    ) {
      return Notify.error({ description: '新密码不能与旧密码相同！' })
    }
    dispatch({
      type: 'userInfo/getModifyPassword',
      payload: {
        originalpwd: current?.oldPassword,
        newpwd: current?.newPassword,
        confirmpwd: current?.newPasswordtow,
      },
    }).then((data: any) => {
      if (data?.code === 1) {
        localStorage.clear()
        sessionStorage.clear()
        navigate('/login', { replace: true })
      } else {
        Notify.error({ title: data?.message || '' })
      }
    })
  }

  const onClick = () => {
    setBtnIcon(btnIcon === 'lock' ? 'unlock' : 'lock')
  }
  const onClickPwd = () => {
    setNewPwd(newPwd === 'lock' ? 'unlock' : 'lock')
  }
  const onClickPwd2 = () => {
    setNewPwd2(newPwd2 === 'lock' ? 'unlock' : 'lock')
  }
  //新增编辑表单
  const formList = [
    {
      label: '原密码',
      key: 'oldPassword',
      widget: 'input',
      required: true,
      span: '24',
      type: btnIcon === 'lock' ? 'password' : 'text',
      widgetProps: {
        addonAfter: (
          <Button
            icon={btnIcon}
            onClick={() => onClick()}
            size="small"
            basic
            type="light"
          />
        ),
      },
    },
    {
      label: '新密码',
      key: 'newPassword',
      widget: 'input',
      required: true,
      span: '24',
      type: newPwd === 'lock' ? 'password' : 'text',
      widgetProps: {
        addonAfter: (
          <Button
            icon={newPwd}
            onClick={() => onClickPwd()}
            size="small"
            basic
            type="light"
          />
        ),
      },
    },
    {
      label: '确认新密码',
      key: 'newPasswordtow',
      widget: 'input',
      required: true,
      span: '24',
      type: newPwd2 === 'lock' ? 'password' : 'text',
      widgetProps: {
        addonAfter: (
          <Button
            icon={newPwd2}
            onClick={() => onClickPwd2()}
            size="small"
            basic
            type="light"
          />
        ),
      },
    },
  ]

  return (
    <div style={{ display: 'flex', marginTop: 10 }}>
      <div style={{ width: 400, marginRight: 20 }}>
        <ProForm
          showSaveButton
          showResetButton
          formType="pure"
          saveButtonProps={{ type: 'primary' }}
          onSubmit={(_, current) => onAddSubmit(current)}
          formDatas={formList}
        />
      </div>
      <div>
        <p style={{ color: '#a1a3a6', fontSize: 13 }}>
          修改密码时需要注意如下事项：
        </p>
        {matters.map((item: any, idx: number) => (
          <p key={idx} style={{ color: '#a1a3a6', fontSize: 13 }}>
            {item}
          </p>
        ))}
      </div>
    </div>
  )
}

export default CPFrom
