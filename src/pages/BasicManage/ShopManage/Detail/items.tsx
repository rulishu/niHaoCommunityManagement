import { Change } from '@/servers/BasicManage/ShopManage'

export const items = (queryInfo: Change, tableType: string) => [
  {
    label: '社区',
    key: 'shopName',
    widget: 'select',
    option: [
      { label: '中心区商业街', value: '中心区商业街' },
      { label: '瀚海大道商业街', value: '瀚海大道商业街' },
      { label: '经济开发区', value: '经济开发区' },
      { label: 'xxx', value: 'xxx' },
    ],
    initialValue: queryInfo?.shopName,
    widgetProps: {},
    required: true,
    placeholder: '请选择社区',
    rules: [{ required: true, message: '请选择社区' }],
  },
  {
    label: '商铺编号',
    key: 'shopNo',
    widget: 'input',
    initialValue: queryInfo?.shopNo,
    required: true,
    rules: [{ required: true, message: '请输入商铺编号' }],
  },
  {
    label: '楼层',
    key: 'shopFloor',
    widget: 'input',
    initialValue: queryInfo?.shopFloor,
    required: true,
    rules: [{ required: true, message: '请输入楼层' }],
  },
  {
    label: '占地面积',
    key: 'areaCovered',
    widget: 'input',
    initialValue: queryInfo?.areaCovered,
    required: true,
    widgetProps: {
      addonAfter: <div style={{ color: '#A6A6A6', marginRight: 5 }}>m^2</div>,
    },
    rules: [
      {
        pattern: new RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/),
        message: '请正确输入',
      },
    ],
  },
  {
    label: '使用面积',
    key: 'areaUsable',
    widget: 'input',
    initialValue: queryInfo?.areaUsable,
    required: true,
    widgetProps: {
      addonAfter: <div style={{ color: '#A6A6A6', marginRight: 5 }}>m^2</div>,
    },
    rules: [
      {
        pattern: new RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/),
        message: '请正确输入',
      },
    ],
  },
  {
    label: '租金',
    key: 'shopRent',
    widget: 'input',
    initialValue: queryInfo?.shopRent,
    widgetProps: {
      addonAfter: <div style={{ color: '#A6A6A6', marginRight: 5 }}>元</div>,
    },
    rules: [
      {
        pattern: new RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/),
        message: '请正确输入',
      },
    ],
  },
  {
    label: '使用状态',
    key: 'status',
    widget: 'select',
    disabled: true,
    option: [
      { label: '空置', value: 1 },
      { label: '已出售', value: 2 },
      { label: '已出租', value: 3 },
    ],
    initialValue: queryInfo?.status,
    widgetProps: {},
    required: true,
    placeholder: '请选择使用状态',
    rules: [{ required: true, message: '请选择使用状态' }],
  },
  {
    label: '备注',
    key: 'remark',
    widget: 'textarea',
    initialValue: queryInfo?.remark,
  },
]
