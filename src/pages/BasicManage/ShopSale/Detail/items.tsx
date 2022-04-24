import { Change } from '@/servers/BasicManage/ShopSale'
import { Button } from 'uiw'
import { UseFormProps } from '@uiw-admin/components/src/ProForm/type'
// import formatter from '@uiw/formatter'

export const items = (
  queryInfo: Change,
  industryList: [],
  userNameList: [],
  userList: [],
  baseRef: UseFormProps,
  tableType: string,
  value: boolean
) => {
  return [
    {
      label: '商铺编码',
      key: 'code',
      widget: 'input',
      initialValue: queryInfo?.code,
      disabled: true,
      widgetProps: {
        placeholder: '输入商铺编码',
      },
      rules: [{ required: true, message: '请输入商铺编码' }],
    },
    {
      label: '类别',
      key: 'useStatus',
      widget: 'select',
      initialValue: queryInfo?.useStatus,
      required: true,
      option: [
        { label: '已出租', value: 2 },
        { label: '已出售', value: 3 },
      ],
      widgetProps: {
        placeholder: '请输入类别',
      },
      rules: [{ required: true, message: '请输入类别' }],
    },
    {
      label: '客户姓名',
      key: 'userName',
      widget: 'select',
      initialValue: queryInfo?.userName || '',
      required: true,
      option: userNameList,
      widgetProps: {
        mode: 'single',
        placeholder: '请输入选择',
        onChange: (e: any) => {
          userList &&
            userList.forEach((itm: any) => {
              if (itm.userName === e.target.value) {
                baseRef.setFields &&
                  baseRef.setFields({
                    card: itm.cardId,
                    gender: itm.gender.toString(),
                    phone: itm.phoneNumber,
                  })
              }
            })
        },
      },
      rules: [{ required: true, message: '请输入客户姓名' }],
    },
    {
      label: '身份证',
      key: 'card',
      widget: 'input',
      initialValue: queryInfo?.card,
      required: true,
      disabled: tableType === 'edit' ? true : false,
      widgetProps: {
        placeholder: '请输入身份证',
      },
      rules: [
        {
          required: true,
          message: '请输入身份证',
          pattern: new RegExp(
            /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/
          ),
        },
      ],
    },
    {
      label: '性别',
      key: 'gender',
      widget: 'input',
      initialValue: queryInfo?.gender,
      required: true,
      disabled: tableType === 'edit' ? true : false,
      widgetProps: {
        placeholder: '请输入性别',
      },
      rules: [{ required: true, message: '请输入性别' }],
    },
    {
      label: '联系方式',
      key: 'phone',
      widget: 'input',
      initialValue: queryInfo?.phone,
      required: true,
      disabled: tableType === 'edit' ? true : false,
      widgetProps: {
        placeholder: '请输入联系方式',
      },
      rules: [
        {
          required: true,
          message: '请输入联系方式',
          pattern: new RegExp(
            /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
          ),
        },
      ],
    },
    {
      label: '开始时间',
      key: 'startTime',
      widget: 'dateInput',
      widgetProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: '请输入开始时间',
      },
      initialValue: queryInfo?.startTime,
      required: true,
      rules: [{ required: true, message: '请输入开始时间' }],
    },
    {
      label: '结束时间',
      key: 'endTime',
      widget: 'dateInput',
      widgetProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: '请输入开始时间',
      },
      initialValue: queryInfo?.endTime,
      required: true,
      rules: [{ required: true, message: '请输入开始时间' }],
    },
    {
      label: '租金',
      key: 'sale',
      widget: 'input',
      initialValue: queryInfo?.sale,
      required: true,
      hide: value,
      widgetProps: {
        addonAfter: <div style={{ color: '#A6A6A6', marginRight: 5 }}>元</div>,
        placeholder: '请输入租金',
      },
      rules: [
        {
          required: true,
          message: '请输入租金',
          pattern: new RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/),
        },
      ],
    },
    {
      label: '从事的行业',
      key: 'industry',
      widget: 'select',
      initialValue: queryInfo?.industry,
      required: true,
      option: industryList,
      widgetProps: {
        placeholder: '请输入从事的行业',
      },
      rules: [{ required: true, message: '请输入从事的行业' }],
    },
    {
      label: '详细说明',
      key: 'remark',
      widget: 'textarea',
      initialValue: queryInfo?.remark,
      widgetProps: {
        placeholder: '请输入备注',
      },
      rules: [{ message: '请输入备注' }],
    },
  ]
}

export const itemsList = (
  handleEditTable: (tableType: string, obj: Change) => void
) => {
  return [
    {
      title: '序号',
      align: 'center',
      key: 'id',
      ellipsis: true,
    },
    {
      title: '收费项目名',
      align: 'center',
      key: 'chargeName',
      ellipsis: true,
    },
    {
      title: '单价',
      align: 'center',
      key: 'chargePrice',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'edit',
      align: 'center',
      width: 80,
      render: (text: any, key: any, rowData: Change) => (
        <div>
          <Button
            size="small"
            icon="delete"
            onClick={() => {
              handleEditTable('deDel', rowData)
            }}
          >
            删除
          </Button>
        </div>
      ),
    },
  ]
}
