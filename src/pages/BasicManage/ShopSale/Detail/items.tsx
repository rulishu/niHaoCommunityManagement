import { Change } from '@/servers/BasicManage/ShopSale'
import { Button } from 'uiw'

export const items = (queryInfo: Change) => {
  return [
    // {
    //   label: '商铺',
    //   key: 'zoneName',
    //   widget: 'input',
    //   initialValue: queryInfo?.zoneName,
    //   disabled: true,
    //   rules: [{ required: true, message: '请输入商铺' }],
    // },
    {
      label: '商铺编码',
      key: 'code',
      widget: 'input',
      initialValue: queryInfo?.code,
      disabled: true,
      rules: [{ required: true, message: '请输入商铺编码' }],
    },
    {
      label: '类别',
      key: 'useStatus',
      widget: 'select',
      initialValue: queryInfo?.useStatus,
      required: true,
      disabled: true,
      option: [
        { label: '空置', value: '1' },
        { label: '已出租', value: '2' },
        { label: '已出售', value: '3' },
      ],
      rules: [{ required: true, message: '请输入类别' }],
    },
    {
      label: '客户姓名',
      key: 'userName',
      widget: 'input',
      initialValue: queryInfo?.userName,
      required: true,
      rules: [{ required: true, message: '请输入客户姓名' }],
    },
    {
      label: '身份证',
      key: 'card',
      widget: 'input',
      initialValue: queryInfo?.card,
      required: true,
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
      widget: 'select',
      initialValue: queryInfo?.gender,
      required: true,
      option: [
        { label: '保密', value: '保密' },
        { label: '男', value: '男' },
        { label: '女', value: '女' },
      ],
      rules: [{ required: true, message: '请输入性别' }],
    },
    {
      label: '联系方式',
      key: 'phone',
      widget: 'input',
      initialValue: queryInfo?.phone,
      required: true,
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
      },
      initialValue: queryInfo?.startTime,
      required: true,
      rules: [{ required: true, message: '请输入开始时间' }],
    },
    {
      label: '出租时间',
      key: 'rentalMonth',
      widget: 'input',
      initialValue: queryInfo?.rentalMonth,
      required: true,
      hide: queryInfo?.useStatus === '2' ? false : true,
      widgetProps: {
        addonAfter: <div style={{ color: '#A6A6A6', marginRight: 5 }}>月</div>,
      },
      rules: [{ required: true, message: '请输入出租时间' }],
    },
    {
      label: '租金',
      key: 'sale',
      widget: 'input',
      initialValue: queryInfo?.sale,
      required: true,
      hide: queryInfo?.useStatus === '2' ? false : true,
      widgetProps: {
        addonAfter: <div style={{ color: '#A6A6A6', marginRight: 5 }}>元</div>,
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
      option: [
        { label: '房产/装修/租售', value: '房产/装修/租售' },
        { label: '手机数码/通讯服务', value: '手机数码/通讯服务' },
        { label: '教育/出国', value: '教育/出国' },
        { label: '计算机/互联网', value: '计算机/互联网' },
        { label: '美食餐饮', value: '美食餐饮' },
        { label: '旅游/出行', value: '旅游/出行' },
        { label: '金融/保险', value: '金融/保险' },
        { label: '工业/工业品', value: '工业/工业品' },
        { label: '商业服务', value: '商业服务' },
        { label: '收破烂', value: '收破烂' },
        { label: '收废品', value: '收废品' },
      ],
      rules: [{ required: true, message: '请输入从事的行业' }],
    },
    {
      label: '详细说明',
      key: 'remark',
      widget: 'textarea',
      initialValue: queryInfo?.remark,
      rules: [{ required: true, message: '备注' }],
    },
  ]
}

export const itemsList = (
  // queryInfoList: Change,
  handleEditTable: (tableType: string, obj: Change) => void
) => {
  return [
    // {
    //   title: '序号',
    //   align: 'center',
    //   key: 'id',
    //   ellipsis: true,
    // },
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
            onClick={(rowData) => {
              console.log('rowData', rowData)
            }}
          >
            删除
          </Button>
        </div>
      ),
    },
  ]
}
