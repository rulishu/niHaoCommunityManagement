import { Change } from '@/servers/Coordination/Complaint'

// 新增
export const items = (queryInfo: Change, butType: string) => {
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
      rules: [{ required: true, message: '请选择报修分类' }],
    },
    {
      label: '商铺编号',
      key: 'flo',
      widget: 'input',
      initialValue: queryInfo?.chargeName,
      required: true,
      hide: butType === '2' || butType === '3' ? false : true,
      rules: [{ required: true, message: '请输入商铺编号' }],
    },
    {
      label: '报修人员',
      key: 'floor',
      widget: 'input',
      initialValue: queryInfo?.chargeName,
      required: true,
      rules: [{ required: true, message: '请输入报修人员' }],
    },
    {
      label: '报修电话',
      key: 'use',
      widget: 'input',
      initialValue: queryInfo?.chargeName,
      required: true,
      rules: [
        {
          required: true,
          pattern: new RegExp(
            /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
          ),
          message: '请输入正确的报修电话',
        },
      ],
    },
    {
      label: '预约时间',
      key: 'time',
      widget: 'dateInput',
      initialValue: queryInfo?.chargeName,
      hide: butType === '2' || butType === '3' ? false : true,
      span: '8',
      rules: [{ required: true, message: '请输入预约时间' }],
    },
    {
      label: '报修内容',
      key: 'univalent',
      widget: 'textarea',
      initialValue: queryInfo?.univalent,
      required: true,
      rules: [{ required: true, message: '请输入报修内容' }],
    },
    {
      label: '报修图片',
      key: 'univa',
      widget: 'upload',
      widgetProps: {
        uploadType: 'card',
      },
      initialValue: queryInfo?.univalent,
    },
  ]
}
// 详情
export const viewItems = (queryInfo: Change) => {
  return [
    {
      label: '流程标题',
      key: 'title',
      widget: 'input',
      required: true,
      initialValue: queryInfo?.univalent,
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
    },
    {
      label: '投诉人姓名',
      key: 'flo',
      widget: 'input',
      initialValue: queryInfo?.chargeName,
      required: true,
    },
    {
      label: '投诉人电话',
      key: 'flo',
      widget: 'input',
      initialValue: queryInfo?.chargeName,
      required: true,
    },
    {
      label: '投诉时间',
      key: 'flo',
      widget: 'input',
      initialValue: queryInfo?.chargeName,
      required: true,
    },
    {
      label: '投诉图片',
      key: 'univa',
      widget: 'upload',
      widgetProps: {
        uploadType: 'card',
      },
      initialValue: queryInfo?.univalent,
    },
    {
      label: '投诉内容',
      key: 'univalent',
      widget: 'textarea',
      initialValue: queryInfo?.univalent,
      required: true,
    },
    {
      label: '投诉人要求',
      key: 'floor',
      widget: 'input',
      initialValue: queryInfo?.chargeName,
      required: true,
    },
    {
      label: '选择处理人',
      key: 'use',
      widget: 'input',
      initialValue: queryInfo?.chargeName,
      required: true,
    },
    {
      label: '处理备注',
      key: 'time',
      widget: 'textarea',
      initialValue: queryInfo?.chargeName,
    },
  ]
}
export const columns = [
  {
    title: '序号',
    key: 'age',
  },
  {
    title: '活动名称',
    key: 'age',
  },
  {
    title: '办理人ID',
    key: 'age',
  },
  {
    title: '办理人',
    key: 'age',
  },
  {
    title: '备注',
    key: 'age',
  },
  {
    title: '开始时间',
    key: 'age',
  },
  {
    title: '结束时间',
    key: 'age',
  },
  {
    title: '耗时',
    key: 'age',
  },
]
