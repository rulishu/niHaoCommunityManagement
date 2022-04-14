import { ProForm } from '@uiw-admin/components'

interface DetailProps {
  userInfo?: any
}
function PDFrom({ userInfo }: DetailProps) {
  return (
    <ProForm
      formType="pure"
      formDatas={[
        {
          label: '用户名',
          key: 'name',
          widget: 'input',
          span: '13',
          disabled: true,
          initialValue: userInfo?.name || '',
        },
        {
          label: '手机号',
          key: 'phone',
          widget: 'input',
          span: '13',
          disabled: true,
          initialValue: userInfo?.phone || '',
        },
        {
          label: '用户类型',
          key: 'type',
          disabled: true,
          widget: 'input',
          span: '13',
          initialValue:
            userInfo?.type === 1
              ? '普通用户'
              : userInfo?.type === 2
              ? '管理员'
              : userInfo?.type === 3
              ? '超级管理员'
              : '',
        },
      ]}
    />
  )
}

export default PDFrom
