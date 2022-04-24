import { Change } from '@/servers/BasicManage/ShopManage'

export const items = (
  queryInfo: Change,
  tableType: string,
  selectZoneList: any
) => [
  {
    label: '社区',
    key: 'zoneId',
    widget: 'select',
    option: selectZoneList,
    initialValue: queryInfo?.zoneId,
    widgetProps: {
      placeholder: '请选择社区',
    },
    required: true,
    disabled: tableType === 'edit' ? true : false,
    rules: [{ required: true, message: '请选择社区' }],
  },
  {
    label: '商铺编号',
    key: 'shopNo',
    widget: 'input',
    initialValue: queryInfo?.shopNo,
    required: true,
    widgetProps: {
      placeholder: '建议使用社区号-楼层号',
    },
    hide: tableType === 'add' ? true : false,
    disabled: tableType === 'edit' ? true : false,
    rules: [
      {
        required: true,
        message: '请选择商铺编号',
      },
    ],
  },
  {
    label: '商铺名称',
    key: 'shopName',
    widget: 'input',
    initialValue: queryInfo?.shopName,
    required: true,
    widgetProps: {
      placeholder: '请选择商铺名称',
    },
    // disabled: tableType==='edit'? true:false,
    rules: [
      {
        required: true,
        message: '请选择商铺名称',
      },
    ],
  },
  {
    label: '楼层',
    key: 'shopFloor',
    widget: 'input',
    initialValue: queryInfo?.shopFloor,
    widgetProps: {
      placeholder: '请输入楼层',
    },
    disabled: tableType === 'edit' ? true : false,
    required: true,
    rules: [
      {
        pattern: new RegExp(/(^[+-]?[0-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/),
        message: '请正确输入楼层',
      },
    ],
  },
  {
    label: '占地面积(㎡)',
    key: 'areaCovered',
    widget: 'input',
    initialValue: `${queryInfo?.areaCovered || ''} ${
      tableType === 'view' ? '㎡' : ''
    }`,
    required: true,
    widgetProps: {
      addonAfter: <div style={{ color: '#A6A6A6', marginRight: 5 }}>m^2</div>,
      placeholder: '请输入占地面积',
    },
    disabled: tableType === 'edit' ? true : false,
    rules: [
      {
        pattern: new RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/),
        message: '请正确输入占地面积',
      },
    ],
  },
  {
    label: '使用面积(㎡)',
    key: 'areaUsable',
    widget: 'input',
    initialValue: `${queryInfo?.areaUsable || ''}${
      tableType === 'view' ? '㎡' : ''
    }`,
    required: true,
    widgetProps: {
      addonAfter: <div style={{ color: '#A6A6A6', marginRight: 5 }}>m^2</div>,
      placeholder: '请输入使用面积',
    },
    rules: [
      {
        pattern: new RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/),
        message: '请正确输入使用面积',
      },
    ],
  },
  {
    label: '租金',
    key: 'shopRent',
    widget: 'input',
    initialValue: `${queryInfo?.shopRent || ''}${
      tableType === 'view' ? '元' : ''
    }`,
    widgetProps: {
      addonAfter: <div style={{ color: '#A6A6A6', marginRight: 5 }}>元</div>,
      placeholder: '请输入租金',
    },
    rules: [
      {
        pattern: new RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/),
        message: '请正确输入租金',
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
    widgetProps: {
      placeholder: '请选择使用状态',
    },
    required: true,
    hide: tableType === 'edit' ? false : true,
    placeholder: '请选择使用状态',
    rules: [{ required: true, message: '请选择使用状态' }],
  },
  {
    label: '备注',
    key: 'remark',
    widget: 'textarea',
    widgetProps: {
      placeholder: '请输入备注',
    },
    initialValue: queryInfo?.remark,
  },
]
