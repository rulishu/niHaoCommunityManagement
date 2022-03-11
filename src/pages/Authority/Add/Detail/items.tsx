import { Change } from '@/servers/Authority/Add'

export const items = (queryInfo: Change) => {
  return [
    {
      label: '账号',
      key: 'code',
      widget: 'input',
      initialValue: queryInfo?.code,
      placeholder: '请输入账号',
      required: true,
      span: '12',
      rules: [{ required: true, message: '请输入账号' }],
    },
    {
      label: '密码',
      key: 'password',
      type: 'password',
      widget: 'input',
      help: '最少6位，允许字母、数字',
      initialValue: queryInfo?.password,
      widgetProps: {},
      required: true,
      span: '12',
      rules: [
        {
          pattern: new RegExp(/^[0-9A-Za-z]{6,20}$/),
          message: '请正确输入密码',
        },
      ],
      placeholder: '输入密码',
      // hide: tableType === 'view',
    },
  ]
}
