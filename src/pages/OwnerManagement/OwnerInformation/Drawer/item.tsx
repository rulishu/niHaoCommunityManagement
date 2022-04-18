export const matching = (queryInfo: any) => [
  {
    label: '业主姓名',
    key: 'userName',
    widget: 'input',
    initialValue: queryInfo?.userName,
    readSpan: 1.5,
  },
  {
    label: '手机号码',
    key: 'phoneNumber',
    widget: 'input',
    initialValue: queryInfo?.phoneNumber,
    readSpan: 1.5,
  },
  {
    label: '身份证号',
    key: 'cardId',
    widget: 'input',
    initialValue: queryInfo?.cardId,
    readSpan: 1.5,
  },
  {
    label: '用户邮箱',
    key: 'email',
    widget: 'input',
    initialValue: queryInfo?.email,
    readSpan: 1.5,
  },
  {
    label: '创建日期',
    key: 'createTime',
    widget: 'input',
    initialValue: queryInfo?.createTime,
  },
]
