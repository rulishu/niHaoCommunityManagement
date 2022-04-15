import { Change } from '@/servers/BasicManage/BusinessManage'
import { Dispatch } from '@uiw-admin/models'

export const items = (
  queryInfo: Change,
  parentDivCodeList: [],
  cityCodeList: [],
  areaCodeList: [],
  setProvinceCodeValue: (value: string) => void,
  setCityCodeValue: (value: string) => void,
  dispatch: Dispatch
) => {
  return [
    {
      label: '社区编号',
      key: 'zoneNo',
      widget: 'input',
      initialValue: queryInfo?.zoneNo,
      required: true,
      widgetProps: {
        placeholder: '请输入社区编号',
      },
      rules: [{ required: true, message: '请输入社区编号' }],
    },
    {
      label: '社区名称',
      key: 'zoneName',
      widget: 'input',
      initialValue: queryInfo?.zoneName,
      required: true,
      widgetProps: {
        placeholder: '请输入社区名称',
      },
      rules: [{ required: true, message: '请输入社区名称' }],
    },
    {
      label: '省',
      key: 'provinceCode',
      widget: 'select',
      initialValue: queryInfo?.provinceCode,
      required: true,
      option: parentDivCodeList,
      widgetProps: {
        placeholder: '请输入省',
        onChange: (e: any) => {
          setProvinceCodeValue(e.target.value)
        },
      },
      rules: [{ required: true, message: '请输入省' }],
    },
    {
      label: '市',
      key: 'cityCode',
      widget: 'select',
      initialValue: queryInfo?.cityCode,
      required: true,
      option: cityCodeList,
      widgetProps: {
        placeholder: '请输入市',
        onChange: (e: any) => {
          setCityCodeValue(e.target.value)
        },
      },
      rules: [{ required: true, message: '请输入市' }],
    },
    {
      label: '区',
      key: 'areaCode',
      widget: 'select',
      initialValue: queryInfo?.areaCode,
      required: true,
      option: areaCodeList,
      widgetProps: {
        placeholder: '请输入区',
      },
      rules: [{ required: true, message: '请输入区' }],
    },
    {
      label: '社区地址',
      key: 'address',
      widget: 'textarea',
      initialValue: queryInfo?.address,
      required: true,
      widgetProps: {
        placeholder: '请输入社区地址',
      },
      rules: [
        {
          required: true,
          message: '请输入社区地址',
        },
      ],
    },
    {
      label: '备注',
      key: 'zoneRemark',
      widget: 'textarea',
      widgetProps: {
        placeholder: '请输入备注',
      },
      initialValue: queryInfo?.zoneRemark,
      rules: [{ message: '备注' }],
    },
  ]
}
