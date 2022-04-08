import { Button } from 'uiw'
import { Change } from '@/servers/BasicManage/ChargeManage'

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void
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
        option: [
          { label: '常规收费项(商铺)', value: '1' },
          { label: '临时收费项', value: '2' },
          { label: '押金类收费项', value: '3' },
        ],
      },
      render: (chargeType: string) => (
        <div style={{ textAlign: 'center' }}>
          <span>
            {chargeType === '1'
              ? '常规收费项(商铺)'
              : chargeType === '2'
              ? '临时收费项'
              : '押金类收费项'}
          </span>
        </div>
      ),
    },
    {
      title: '收费项目名',
      key: 'chargeName',
      align: 'center',
      ellipsis: true,
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入收费项目名',
        },
      },
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
      render: (chargeNumType: string) => (
        <div style={{ textAlign: 'center' }}>
          <span>
            {chargeNumType === '1'
              ? '按户数收费'
              : chargeNumType === '2'
              ? '按人口数收费'
              : chargeNumType === '3'
              ? '按楼层收费'
              : chargeNumType === '4'
              ? '按占地面积收费'
              : chargeNumType === '5'
              ? '按使用面积收费'
              : chargeNumType === '6'
              ? '按走表数量'
              : chargeNumType === '7'
              ? '按租金收费'
              : ''}
          </span>
        </div>
      ),
    },
    {
      title: '计算公式',
      key: 'chargeFormula',
      align: 'center',
      ellipsis: true,
      render: (chargeFormula: string) => (
        <div style={{ textAlign: 'center' }}>
          <span>
            {chargeFormula === '1'
              ? '单价*数量'
              : chargeFormula === '2'
              ? '自定义'
              : ''}
          </span>
        </div>
      ),
    },
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
