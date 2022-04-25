import formatter from '@uiw/formatter'
export const drawerTitle = (type: string) => {
  switch (type) {
    case 'add':
      return '新增'
    case 'edit':
      return '编辑'
    default:
      return ''
  }
}

export const matching = (
  type: string,
  shopNoList: Array<any>,
  form: any,
  projectList: Array<any>,
  queryInfo: any
) => {
  switch (type) {
    case 'add':
    case 'edit':
      return addItems(shopNoList, form, projectList, queryInfo)
    default:
      return []
  }
}

const addItems = (
  shopNoList: Array<any>,
  form: any,
  projectList: Array<any>,
  queryInfo: any
) => {
  return [
    {
      label: '商铺',
      key: 'code',
      widget: 'searchSelect',
      option: shopNoList,
      required: true,
      span: 8,
      initialValue: queryInfo?.code,
      widgetProps: {
        placeholder: '请选择商铺',
        mode: 'single',
        allowClear: false,
        onChange: (value: any) => {
          const nameObj = shopNoList.find((item) => item?.value === value) || {}
          const fromData = form.getFieldValues()
          form.setFields({
            ...fromData,
            username: nameObj?.username || '',
            code: nameObj?.value || '',
          })
        },
      },
    },
    {
      label: '客户姓名',
      key: 'username',
      widget: 'input',
      required: true,
      span: 8,
      disabled: true,
      initialValue: queryInfo?.username,
      widgetProps: { placeholder: '请选择商铺' },
    },
    {
      label: '收费项目',
      key: 'saleType',
      widget: 'searchSelect',
      option: projectList,
      required: true,
      span: 8,
      initialValue: queryInfo?.saleType,
      widgetProps: {
        placeholder: '请选择收费项目',
        mode: 'single',
        allowClear: true,
        onChange: (value: any) => {
          const saleTypeObj =
            projectList.find((item) => item?.value === value) || {}
          const fromData = form.getFieldValues()
          form.setFields({
            ...fromData,
            price: saleTypeObj?.chargePrice || '',
            saleType: saleTypeObj?.value || '',
          })
        },
      },
    },
    {
      label: '单价',
      key: 'price',
      widget: 'input',
      required: true,
      span: 8,
      disabled: true,
      initialValue: queryInfo?.price,
      widgetProps: { placeholder: '请选择收费项目' },
    },
    {
      label: '开始时间',
      key: 'startTime',
      widget: 'dateInput',
      initialValue: queryInfo?.startTime,
      widgetProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
      },
    },
    {
      label: '结束时间',
      key: 'endTime',
      widget: 'dateInput',
      initialValue: queryInfo?.endTime,
      widgetProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
      },
    },
    {
      label: '缴费限期',
      key: 'deadline',
      widget: 'dateInput',
      initialValue: queryInfo?.deadline,
      widgetProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
      },
    },
    {
      label: '数量',
      key: 'quantity',
      widget: 'input',
      initialValue: queryInfo?.quantity,
      required: true,
      widgetProps: {
        placeholder: '请填写数量',
        onBlur: (e: any) => {
          const quantity = e?.target?.value || 0
          if (!/^[0-9]{1}\d*?$/g.test(quantity)) return
          const fromData = form.getFieldValues()
          form.setFields({
            ...fromData,
            quantity,
            money: quantity * fromData?.price,
          })
        },
      },
    },
    {
      label: '金额',
      key: 'money',
      widget: 'input',
      initialValue: queryInfo?.money,
      required: true,
      disabled: true,
      widgetProps: { placeholder: '请填写数量' },
    },
  ]
}

// 批量增加

export const batchMatching = (
  type: string,
  codeList: Array<any>,
  form: any,
  shopList: Array<any>,
  queryInfo: any
) => {
  switch (type) {
    case 'batchAdd':
      return batchAddItems(codeList, form, shopList, queryInfo)
    default:
      return []
  }
}

const batchAddItems = (
  codeList: Array<any>,
  form: any,
  shopList: Array<any>,
  queryInfo: any
) => {
  return [
    {
      label: '编号',
      key: 'code',
      widget: 'searchSelect',
      span: 12,
      option: codeList,
      initialValue: queryInfo?.code,
      required: true,
      widgetProps: {
        mode: 'multiple',
      },
    },
    {
      label: '收费项目',
      key: 'saleType',
      widget: 'searchSelect',
      option: shopList,
      required: true,
      span: 12,
      initialValue: queryInfo?.saleType,
      widgetProps: {
        placeholder: '请选择收费项目',
        mode: 'single',
        allowClear: false,
        onChange: (value: any) => {
          const nameObj = shopList.find((item) => item?.value === value) || {}
          const fromData = form.getFieldValues()
          form.setFields({
            ...fromData,
            price: nameObj?.chargePrice || '',
            saleType: nameObj?.value || '',
          })
        },
      },
    },
    {
      label: '单价',
      key: 'price',
      widget: 'input',
      required: true,
      span: 12,
      disabled: true,
      initialValue: queryInfo?.price,
      widgetProps: { placeholder: '请选择单价' },
    },
    {
      label: '开始时间',
      key: 'startTime',
      span: 12,
      widget: 'dateInput',
      required: true,
      initialValue: queryInfo?.startTime,
      widgetProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
      },
    },
    {
      label: '结束时间',
      key: 'endTime',
      span: 12,
      widget: 'dateInput',
      required: true,
      initialValue: queryInfo?.endTime,
      widgetProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        onChange: (value: any) => {
          // 获取当前时间
          const startTime: any = new Date(value.setHours(0, 0, 0, 0))
          // 获取当前时间后七天
          const futureTime: any = new Date(startTime * 1 + 86400 * 7 * 1000)
          const fromData = form.getFieldValues()
          form.setFields({
            ...fromData,
            endTime: value,
            deadline: formatter('YYYY-MM-DD HH:mm:ss', futureTime) || '',
          })
        },
      },
    },
    {
      label: '缴费限期',
      key: 'deadline',
      span: 12,
      widget: 'dateInput',
      disabled: true,
      initialValue: queryInfo?.deadline,
      widgetProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
      },
    },
  ]
}
