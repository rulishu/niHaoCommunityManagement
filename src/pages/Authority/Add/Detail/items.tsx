import { Change } from '@/servers/Authority/Add'

export const items = (queryInfo: Change) => {
  return [
    {
      label: '昵称',
      key: 'nickName',
      widget: 'input',
      initialValue: queryInfo?.nickName,
      placeholder: '请输入昵称',
      required: true,
      span: '12',
      rules: [{ required: true, message: '请输入昵称' }],
    },
    {
      label: '密码',
      key: 'password',
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
      // hide: tableType === 'look',
    },
  ]
}
