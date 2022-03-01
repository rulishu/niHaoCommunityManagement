import { Change } from '@/servers/Authority/User'

export const items = (queryInfo: Change) => [
  {
    label: '用户姓名',
    key: 'userName',
    widget: 'input',
    initialValue: queryInfo?.userName,
    required: true,
    rules: [{ required: true, message: '请输入用户姓名' }],
  },
  // {
  //   label: '用户性别',
  //   key: 'gender',
  //   widget: 'input',
  //   initialValue: queryInfo?.gender,
  //   required: true,
  //   rules: [{ required: true, message: '请输入用户性别' }],
  // },
  {
    label: '用户性别',
    key: 'gender',
    widget: 'select',
    width: 200,
    option: [
      { value: 1, label: '男' },
      { value: 2, label: '女' },
      // { value: 2, label: '未知' },
    ],
    initialValue: queryInfo?.gender,
    required: true,
    rules: [{ required: true, message: '请选择用户性别' }],
  },
  {
    label: '身份证',
    key: 'cardId',
    widget: 'input',
    initialValue: queryInfo?.cardId,
    required: true,
    rules: [
      {
        pattern: new RegExp(/^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/),
        message: '请正确输入身份证',
      },
    ],
  },
  {
    label: '手机号',
    key: 'phoneNumber',
    widget: 'input',
    initialValue: queryInfo?.phoneNumber,
    required: true,
    rules: [
      {
        pattern: new RegExp(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/),
        message: '请正确输入手机号',
      },
    ],
  },
  {
    label: '密码',
    key: 'password',
    widget: 'input',
    initialValue: queryInfo?.password,
    // required: true,
    rules: [
      {
        pattern: new RegExp(/^[0-9A-Za-z]{6,20}$/),
        message: '请正确输入密码',
      },
    ],
  },
  {
    label: '账号昵称',
    key: 'nickName',
    widget: 'input',
    initialValue: queryInfo?.nickName,
    required: true,
    rules: [{ required: true, message: '请输入账号昵称' }],
  },
  {
    label: '头像地址',
    key: 'avatar',
    widget: 'upload',
    initialValue: queryInfo?.avatar,
    // required: true,
    widgetProps: {
      uploadType: 'card',
    },
    rules: [{ message: '请输入头像地址' }],
  },
]
