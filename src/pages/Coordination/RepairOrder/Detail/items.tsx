import { Change } from '@/servers/BasicManage/ChargeManage'

export const items = (queryInfo: Change, butType: string) => {
  console.log('butType', butType)
  return [
    {
      label: '数据来源',
      key: 'source',
      widget: 'btns',
      required: true,
      initialValue: queryInfo?.univalent,
      span: '24',
    },
    {
      label: '报修分类',
      key: 'types',
      widget: 'select',
      option: [
        { label: '水暖', value: '水暖' },
        { label: '电路', value: '电路' },
        { label: '电器', value: '电器' },
        { label: '门窗', value: '门窗' },
        { label: '公共设施', value: '公共设施' },
      ],
      initialValue: queryInfo?.types,
      widgetProps: {},
      required: true,
      placeholder: '请选择报修分类',
      span: '24',
      rules: [{ required: true, message: '请选择报修分类' }],
    },
    {
      label: '商铺编号',
      key: 'flo',
      widget: 'input',
      initialValue: queryInfo?.chargeName,
      required: true,
      hide: (butType === '2' || butType ==='3') ? false : true,
      span: '24',
      rules: [{ required: true, message: '请输入商铺编号' }],
    },
    {
      label: '报修人员',
      key: 'floor',
      widget: 'input',
      initialValue: queryInfo?.chargeName,
      required: true,
      span: '24',
      rules: [{ required: true, message: '请输入报修人员' }],
    },
    {
      label: '报修电话',
      key: 'use',
      widget: 'input',
      initialValue: queryInfo?.chargeName,
      required: true,
      span: '24',
      rules: [{ required: true, message: '请输入报修电话' }],
    },
    {
      label: '预约时间',
      key: 'time',
      widget: 'dateInput',
      initialValue: queryInfo?.chargeName,
      hide: (butType === '2' || butType ==='3') ? false : true,
      span: '8',
      rules: [{ required: true, message: '请输入预约时间' }],
    },
    {
      label: '报修内容',
      key: 'univalent',
      widget: 'textarea',
      initialValue: queryInfo?.univalent,
      required: true,
      span: '24',
    },
    {
      label: '报修图片',
      key: 'univa',
      widget: 'upload',
      widgetProps:{
        uploadType: 'card',
      },
      initialValue: queryInfo?.univalent,
      required: true,
      span: '24',
    },
  ]
}

