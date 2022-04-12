import { Button } from 'uiw'
import { Change } from '@/servers/BasicManage/ChargeManage'

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void,
  statusList: any,
  buChargesList: any
) => {
  return [
    {
      title: '类型',
      align: 'center',
      key: 'chargeType',
      ellipsis: true,
      props: {
        label: '类型',
        widget: 'select',
        option: statusList,
      },
      render: (text: any, key: any, rowData: Change) => (
        <div style={{ textAlign: 'center' }}>
          <span>{rowData?.chargeTypeName}</span>
        </div>
      ),
    },
    {
      title: '收费项目名',
      key: 'chargeName',
      props: {
        widget: 'select',
        option: buChargesList,
      },
      align: 'center',
      render: (text: any, key: any, rowData: Change) => (
        <div style={{ textAlign: 'center' }}>
          <span>{rowData?.chargeName}</span>
        </div>
      ),
    },
    {
      title: '单价',
      key: 'chargePrice',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '收费标准',
      key: 'chargeNumType',
      align: 'center',
      ellipsis: true,
      render: (text: any, key: any, rowData: Change) => (
        <div style={{ textAlign: 'center' }}>
          <span>{rowData?.chargeNumTypeName}</span>
        </div>
      ),
    },
    // {
    //   title: '计算公式',
    //   key: 'chargeFormula',
    //   align: 'center',
    //   ellipsis: true,
    //   render: (chargeFormula: string) => (
    //     <div style={{ textAlign: 'center' }}>
    //       <span>
    //         {chargeFormula === '1'
    //           ? '单价*数量'
    //           : chargeFormula === '2'
    //           ? '自定义'
    //           : ''}
    //       </span>
    //     </div>
    //   ),
    // },
    {
      title: '计算周期',
      key: 'chargeMonth',
      align: 'center',
      ellipsis: true,
      render: (chargeMonth: number) => (
        <div style={{ textAlign: 'center' }}>
          <span>
            {chargeMonth === 1
              ? '1个月'
              : chargeMonth === 2
              ? '2个月'
              : chargeMonth === 3
              ? '3个月'
              : chargeMonth === 4
              ? '4个月'
              : chargeMonth === 5
              ? '6个月'
              : chargeMonth === 6
              ? '12个月'
              : ''}
          </span>
        </div>
      ),
    },
    // {
    //   title: '滞纳金',
    //   key: 'chargeLateType',
    //   align: 'center',
    //   ellipsis: true,
    //   render: (chargeLateType: number) => (
    //     <div style={{ textAlign: 'center' }}>
    //       <span>
    //         {chargeLateType === 1
    //           ? '不适用'
    //           : chargeLateType === 2
    //           ? '适用'
    //           : ''}
    //       </span>
    //     </div>
    //   ),
    // },
    // {
    //   title: '滞纳金比例',
    //   key: 'chargeLateProportion',
    //   align: 'center',
    //   ellipsis: true,
    // },
    // {
    //   title: '滞纳金天数',
    //   key: 'chargeDay',
    //   align: 'center',
    //   ellipsis: true,
    // },
    {
      title: '操作',
      key: 'edit',
      align: 'center',
      width: 200,
      render: (text: any, key: any, rowData: Change) => (
        <div>
          <Button
            size="small"
            icon="edit"
            onClick={handleEditTable.bind(this, 'edit', rowData)}
          >
            编辑
          </Button>
          <Button
            size="small"
            icon="eye"
            onClick={handleEditTable.bind(this, 'view', rowData)}
          >
            查看
          </Button>
          <Button
            size="small"
            icon="delete"
            onClick={() => handleEditTable('del', rowData)}
          >
            删除
          </Button>
        </div>
      ),
    },
  ]
}
