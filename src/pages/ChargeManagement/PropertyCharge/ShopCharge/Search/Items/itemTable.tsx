import { Dropdown, Menu, Button, Tag } from 'uiw'
import * as React from 'react'
import { searchValue } from '@/servers/ChargeManagement/ShopCharge'

const option = [
  { label: '打印收款单', value: 1 },
  { label: '打印退还单', value: 2 },
]

export const columnsRout = (
  option: searchValue[],
  setValue: (e: any) => void
) => {
  return [
    {
      title: '收费项名称',
      align: 'center',
      key: 'saleName',
      ellipsis: true,
      props: [
        {
          label: '商铺',
          key: 'code',
          widget: 'searchSelect',
          option,
          widgetProps: {
            mode: 'single',
            showSearch: true,
            maxTagCount: 6,
            allowClear: true,
            disabled: false,
            placeholder: '请输入选择',
            onSearch: (value: String) => setValue(value),
          },
        },
      ],
    },
    {
      align: 'center',
      title: '起收日期',
      key: 'startTime',
      ellipsis: true,
      width: 200,
    },
    {
      align: 'center',
      title: '到期日期',
      key: 'endTime',
      ellipsis: true,
      width: 200,
    },
    {
      align: 'center',
      title: '缴费日期',
      key: 'deadlineTime',
      ellipsis: true,
      width: 200,
    },
    {
      title: '单价',
      align: 'center',
      key: 'chargePrice',
      ellipsis: true,
    },
    {
      title: '数量',
      align: 'center',
      key: 'number',
      ellipsis: true,
    },
    {
      title: '金额',
      align: 'center',
      key: 'price',
      ellipsis: true,
    },
  ]
}

export const columnsTem = (
  handleEditTable: (tableType: string, obj: any) => void,
  option1: searchValue[],
  loading: boolean,
  value: searchValue[],
  setValue: React.Dispatch<React.SetStateAction<searchValue[]>>,
  handleSearch: (e: any) => void
) => {
  return [
    {
      title: '商铺编号',
      key: 'code',
      props: {
        widget: 'searchSelect',
        option: option1,
        widgetProps: {
          mode: 'single',
          style: { width: 200 },
          showSearch: true,
          maxTagCount: 6,
          allowClear: true,
          value: value,
          disabled: false,
          placeholder: '请输入选择',
          onSearch: (e: any) => handleSearch(e),
          // onSelect:{(value):>console.log('onSelect',value)}
          loading: loading,
          // option: option,
          onChange: (e: any) => {
            setValue([{ label: e, value: e }])
          },
        },
      },
      render: (text: any) => {
        return <div>{text}</div>
      },
    },
    {
      title: '客户姓名',
      align: 'center',
      key: 'shouName',
    },
    {
      align: 'center',
      title: '收费项目',
      key: 'startingTime',
    },
    {
      align: 'center',
      title: '付款方式',
      key: 'select',
    },

    {
      title: '收费金额',
      align: 'center',
      key: 'fee',
    },
    {
      title: '收款人',
      align: 'center',
      key: 'num',
    },
    {
      align: 'center',
      title: '收款时间',
      key: 'feeTime',
      ellipsis: true,
    },
    {
      title: '状态',
      align: 'center',
      key: 'money',
      render: (createName: string) => (
        <div style={{ textAlign: 'center' }}>
          {createName === '已付款' ? (
            <Tag disabled title="已付款" color="#28a745" />
          ) : (
            <Tag disabled title="未付款" color="#ffc107" />
          )}
        </div>
      ),
    },
    {
      title: '备注',
      align: 'center',
      key: 'remarks',
    },
    {
      title: '操作',
      align: 'center',
      key: 'edit',
      width: 250,
      render: (text: string, key: string, rowData: any) => (
        <div style={{ textAlign: 'center' }}>
          <Button
            size="small"
            icon="edit"
            onClick={() => handleEditTable('refund', rowData)}
          >
            退款
          </Button>
          <Button
            size="small"
            icon="eye-o"
            onClick={() => handleEditTable('refundView', rowData)}
          >
            退款详情
          </Button>
          <Button
            size="small"
            icon="down"
            onClick={() => handleEditTable('print', rowData)}
          >
            打印
          </Button>
        </div>
      ),
    },
  ]
}

export const columnsDep = (
  handleEditTable: (tableType: string, obj: any) => void,
  updateData: (payload: any) => void,
  printDropdown: number,
  option1: searchValue[],
  loading: boolean,
  value: searchValue[],
  setValue: React.Dispatch<React.SetStateAction<searchValue[]>>,
  handleSearch: (e: any) => void
) => {
  return [
    {
      title: '商铺编号',
      key: 'code',
      props: {
        widget: 'searchSelect',
        option: option1,
        widgetProps: {
          mode: 'single',
          style: { width: 200 },
          showSearch: true,
          maxTagCount: 6,
          allowClear: true,
          value: value,
          disabled: false,
          placeholder: '请输入选择',
          onSearch: (e: any) => handleSearch(e),
          // onSelect:{(value):>console.log('onSelect',value)}
          loading: loading,
          // option: option,
          onChange: (e: any) => {
            setValue([{ label: e, value: e }])
          },
        },
      },
      render: (text: any) => {
        return <div>{text}</div>
      },
    },
    {
      title: '客户姓名',
      align: 'center',
      key: 'shouName',
    },
    {
      align: 'center',
      title: '收费项目',
      key: 'startingTime',
    },
    {
      align: 'center',
      title: '付款方式',
      key: 'endTime',
    },
    {
      title: '收费金额',
      align: 'center',
      key: 'fee',
    },
    {
      title: '收款人',
      align: 'center',
      key: 'num',
    },
    {
      align: 'center',
      title: '收款时间',
      key: 'feeTime',
      ellipsis: true,
    },
    {
      title: '退款人',
      align: 'center',
      key: 'num',
    },
    {
      align: 'center',
      title: '退款时间',
      key: 'feeTime',
      ellipsis: true,
    },
    {
      title: '状态',
      align: 'center',
      key: 'money',
      render: (createName: string) => (
        <div style={{ textAlign: 'center' }}>
          {createName === '已付款' ? (
            <Tag disabled title="已退款" color="#28a745" />
          ) : (
            <Tag disabled title="未退款" color="#ffc107" />
          )}
        </div>
      ),
    },
    {
      title: '备注',
      align: 'center',
      key: 'ramker',
    },
    {
      title: '操作',
      align: 'center',
      key: 'edit',
      width: 200,
      render: (text: string, key: string, rowData: any) => (
        <div style={{ textAlign: 'center' }}>
          <Button
            size="small"
            icon="edit"
            onClick={() => handleEditTable('back', rowData)}
          >
            退还
          </Button>
          <Dropdown
            onVisibleChange={(isOpen) => updateData({ isOpen: isOpen })}
            menu={
              <div>
                <Menu bordered style={{ minWidth: 120 }}>
                  {option.map((item, idx) => {
                    const active = printDropdown === item.value
                    return (
                      <Menu.Item
                        key={idx}
                        active={active}
                        text={item.label}
                        onClick={(e) => {
                          updateData({
                            isOpen: false,
                            printDropdown: item.value,
                            printVisible: true,
                            queryInfo: e,
                          })
                        }}
                      />
                    )
                  })}
                </Menu>
              </div>
            }
          >
            <Button size="small" icon="down">
              打印
            </Button>
          </Dropdown>
        </div>
      ),
    },
  ]
}

export const columnsAdDep = (
  handleEditTable: (tableType: string, obj: any) => void,
  option1: searchValue[],
  loading: boolean,
  value: searchValue[],
  setValue: React.Dispatch<React.SetStateAction<searchValue[]>>,
  handleSearch: (e: any) => void
) => {
  return [
    {
      title: '商铺编号',
      key: 'code',
      props: {
        widget: 'searchSelect',
        option: option1,
        widgetProps: {
          mode: 'single',
          style: { width: 200 },
          showSearch: true,
          maxTagCount: 6,
          allowClear: true,
          value: value,
          disabled: false,
          placeholder: '请输入选择',
          onSearch: (e: any) => handleSearch(e),
          // onSelect:{(value):>console.log('onSelect',value)}
          loading: loading,
          // option: option,
          onChange: (e: any) => {
            setValue([{ label: e, value: e }])
          },
        },
      },
      render: (text: any) => {
        return <div>{text}</div>
      },
    },
    {
      title: '客户姓名',
      align: 'center',
      key: 'shouName',
    },
    {
      title: '状态',
      align: 'center',
      key: 'money',
      render: (createName: string) => (
        <div style={{ textAlign: 'center' }}>
          {createName === '支付' ? (
            <Tag disabled title="支付" color="#28a745" />
          ) : (
            <Tag disabled title="未支付" color="#ffc107" />
          )}
        </div>
      ),
    },
    {
      align: 'center',
      title: '收费项目',
      key: 'startingTime',
    },
    {
      align: 'center',
      title: '付款方式',
      key: 'endTime',
    },
    {
      title: '收费金额',
      align: 'center',
      key: 'fee',
    },
    {
      align: 'center',
      title: '金额',
      key: 'moneys',
    },
    {
      title: '收款人',
      align: 'center',
      key: 'num',
    },
    {
      align: 'center',
      title: '收款时间',
      key: 'feeTime',
      ellipsis: true,
    },
    {
      title: '单号',
      align: 'center',
      key: 'id',
    },
    {
      title: '操作',
      align: 'center',
      key: 'edit',
      width: 200,
      render: (text: string, key: string, rowData: any) => (
        <div style={{ textAlign: 'center' }}>
          <Button
            size="small"
            icon="down"
            onClick={() => handleEditTable('print', rowData)}
          >
            打印退款单
          </Button>
        </div>
      ),
    },
  ]
}
