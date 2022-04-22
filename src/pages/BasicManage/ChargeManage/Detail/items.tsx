import { Change } from '@/servers/BasicManage/ChargeManage'

export const items = (
  queryInfo: Change,
  tableType: string,
  statusList: any,
  standardList: any,
  hide: boolean
) => {
  return tableType === 'add'
    ? [
        {
          label: '类型',
          key: 'chargeType',
          widget: 'select',
          option: statusList,
          initialValue: queryInfo?.chargeType,
          widgetProps: {
            placeholder: '请选择类型',
          },
          required: true,
          placeholder: '请选择类型',
          span: '8',
          rules: [{ required: true, message: '请选择类型' }],
        },
        {
          label: '收费项目名',
          key: 'chargeName',
          initialValue: queryInfo?.chargeName,
          widget: 'input',
          widgetProps: {
            placeholder: '请输入收费项目名',
          },
          required: true,
          span: '8',
          rules: [{ required: true, message: '请输入收费项目名' }],
        },
        {
          label: '单价',
          key: 'chargePrice',
          widget: 'input',
          initialValue: queryInfo?.chargePrice,
          required: !hide,
          hide: hide,
          span: '8',
          widgetProps: {
            addonAfter: (
              <div style={{ color: '#A6A6A6', marginRight: 5 }}>元</div>
            ),
            placeholder: '请输入单价',
          },
          rules:
            queryInfo?.chargeType === '1'
              ? [
                  {
                    required: !hide,
                    pattern: new RegExp(
                      /(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/
                    ),
                    message: '请正确输入单价',
                  },
                ]
              : [
                  {
                    required: !hide,
                    message: '请正确输入单价',
                  },
                ],
        },
        {
          label: '收费标准',
          key: 'chargeNumType',
          widget: 'select',
          initialValue: queryInfo?.chargeNumType,
          required: !hide,
          hide: hide,
          option: standardList,
          widgetProps: {
            placeholder: '请输入收费标准',
          },
          span: '8',
          rules: [{ required: !hide, message: '请输入收费标准' }],
        },
        {
          label: '计算周期',
          key: 'chargeMonth',
          widget: 'select',
          initialValue: queryInfo?.chargeMonth,
          required: !hide,
          hide: hide,
          widgetProps: {
            placeholder: '请输入计算周期',
          },
          option: [
            { label: '1个月', value: 1 },
            { label: '2个月', value: 2 },
            { label: '3个月', value: 3 },
            { label: '4个月', value: 4 },
            { label: '6个月', value: 5 },
            { label: '12个月', value: 6 },
          ],
          span: '8',
          rules: [{ required: !hide, message: '请输入计算周期' }],
        },
      ]
    : [
        {
          label: '类型',
          key: 'chargeType',
          widget: 'select',
          option: statusList,
          initialValue: queryInfo?.chargeType,
          widgetProps: {
            placeholder: '请输入请选择类型',
          },
          required: true,
          placeholder: '请选择类型',
          span: '8',
          rules: [{ required: true, message: '请选择类型' }],
        },
        {
          label: '收费项目名',
          key: 'chargeName',
          initialValue: queryInfo?.chargeName,
          widget: 'input',
          widgetProps: {
            placeholder: '请输入收费项目名',
          },
          required: true,
          span: '8',
          rules: [{ required: true, message: '请输入收费项目名' }],
        },
        {
          label: '单价',
          key: 'chargePrice',
          widget: 'input',
          initialValue: queryInfo?.chargePrice,
          required: !hide,
          hide: queryInfo?.chargeType !== '1' ? true : false,
          span: '8',
          widgetProps: {
            addonAfter: (
              <div style={{ color: '#A6A6A6', marginRight: 5 }}>元</div>
            ),
            placeholder: '请输入单价',
          },
          rules:
            queryInfo?.chargeType === '1'
              ? [
                  {
                    required: !hide,
                    pattern: new RegExp(
                      /(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/
                    ),
                    message: '请正确输入',
                  },
                ]
              : [
                  {
                    required: !hide,
                    message: '请正确输入',
                  },
                ],
        },
        {
          label: '收费标准',
          key: 'chargeNumType',
          widget: 'select',
          initialValue: queryInfo?.chargeNumType,
          required: !hide,
          widgetProps: {
            placeholder: '请输入收费标准',
          },
          hide: queryInfo?.chargeType !== '1' ? true : false,
          option: standardList,
          span: '8',
          rules: [{ required: !hide, message: '请输入收费标准' }],
        },
        {
          label: '计算周期',
          key: 'chargeMonth',
          widget: 'select',
          initialValue: queryInfo?.chargeMonth,
          required: !hide,
          widgetProps: {
            placeholder: '请输入计算周期',
          },
          hide: queryInfo?.chargeType !== '1' ? true : false,
          option: [
            { label: '1个月', value: 1 },
            { label: '2个月', value: 2 },
            { label: '3个月', value: 3 },
            { label: '4个月', value: 4 },
            { label: '6个月', value: 5 },
            { label: '12个月', value: 6 },
          ],
          span: '8',
          rules: [{ required: !hide, message: '请输入计算周期' }],
        },
      ]
}
