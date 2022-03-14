import { Change } from '@/servers/BasicManage/ChargeManage'

export const items = (queryInfo: Change, tableType: string) => {
  return [
    {
      label: '类型',
      key: 'chargeType',
      widget: 'select',
      option: [
        { label: '常规收费项(商铺)', value: '1' },
        { label: '临时收费项', value: '2' },
        { label: '押金类收费项', value: '3' },
      ],
      initialValue: queryInfo?.chargeType,
      widgetProps: {},
      required: true,
      placeholder: '请选择类型',
      span: '8',
      rules: [{ required: true, message: '请选择类型' }],
    },
    {
      label: '收费项目名',
      key: 'chargeName',
      widget: 'input',
      initialValue: queryInfo?.chargeName,
      required: true,
      span: '8',
      rules: [{ required: true, message: '请输入收费项目名' }],
    },
    {
      label: '单价',
      key: 'chargePrice',
      widget: 'input',
      initialValue: queryInfo?.chargePrice,
      required: true,
      hide:
        (tableType === 'add' || tableType === 'edit') &&
        queryInfo?.chargeType === '1'
          ? false
          : true,
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
      label: '数量',
      key: 'chargeNumType',
      widget: 'select',
      initialValue: queryInfo?.chargeNumType,
      required: true,
      hide:
        (tableType === 'add' || tableType === 'edit') &&
        queryInfo?.chargeType === '1'
          ? false
          : true,
      option: [
        { label: '按户数收费', value: '1' },
        { label: '按人口数收费', value: '2' },
        { label: '按楼层收费', value: '3' },
        { label: '按占地面积收费', value: '4' },
        { label: '按使用面积收费', value: '5' },
        { label: '按走表数量', value: '6' },
        { label: '按租金收费', value: '7' },
      ],
      rules: [{ required: true, message: '请输入数量类型' }],
    },
    {
      label: '计算公式',
      key: 'chargeFormula',
      widget: 'select',
      initialValue: queryInfo?.chargeFormula,
      required: true,
      hide:
        (tableType === 'add' || tableType === 'edit') &&
        queryInfo?.chargeType === '1'
          ? false
          : true,
      option: [
        { label: '单价*数量', value: '1' },
        { label: '自定义', value: '2' },
      ],
      rules: [{ required: true, message: '请输入计算公式' }],
    },
    {
      label: '计算周期',
      key: 'chargeMonth',
      widget: 'select',
      initialValue: queryInfo?.chargeMonth,
      required: true,
      hide:
        (tableType === 'add' || tableType === 'edit') &&
        queryInfo?.chargeType === '1'
          ? false
          : true,
      option: [
        { label: '1个月', value: 1 },
        { label: '2个月', value: 2 },
        { label: '3个月', value: 3 },
        { label: '4个月', value: 4 },
        { label: '6个月', value: 5 },
        { label: '12个月', value: 6 },
      ],
      rules: [{ required: true, message: '请输入计算周期' }],
    },
    {
      label: '滞纳金',
      key: 'chargeLateType',
      widget: 'radio',
      initialValue: queryInfo?.chargeLateType,
      required: true,
      hide:
        (tableType === 'add' || tableType === 'edit') &&
        queryInfo?.chargeType === '1'
          ? false
          : true,
      option: [
        { label: '不适用', value: 1 },
        { label: '适用', value: 2 },
      ],
      rules: [{ required: true, message: '请输入滞纳金' }],
    },
    // {
    //   label: '滞纳金比例',
    //   key: 'chargeLateProportion',
    //   widget: 'input',
    //   initialValue: queryInfo?.chargeLateProportion,
    //   required: true,
    //   hide: tableType === 'edit' ? false : true,
    //   rules: [{ required: true, message: '请输入滞纳金比例' }],
    // },
    // {
    //   label: '滞纳金天数',
    //   key: 'chargeDay',
    //   widget: 'input',
    //   initialValue: queryInfo?.chargeDay,
    //   required: true,
    //   hide: tableType === 'edit' ? false : true,
    //   rules: [{ required: true, message: '请输入滞纳金天数' }],
    // },
  ]
}
