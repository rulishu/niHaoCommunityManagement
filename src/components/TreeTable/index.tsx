import React from 'react'
import { Modal } from 'uiw'
import { Table } from 'uiw'
import { TableColumns } from '@uiw/react-table'

const TreeTable = (props: {
  //表单数据
  formDates?: TableColumns[]
  dataSource?: Record<string, string | number | boolean | React.ReactElement>[]
  //弹框是否开启
  isOpen: boolean
  maxWidth?: number
  title?: string
  onClose: () => void
}) => {
  const {
    onClose,
    formDates = [],
    dataSource = [],
    isOpen = false,
    maxWidth = 500,
    title = '',
  } = props
  return (
    <div>
      <Modal
        maxWidth={maxWidth}
        title={title}
        isOpen={isOpen}
        cancelText="取消按钮"
        type="primary"
        onCancel={onClose}
        onClosed={onClose}
        useButton={false}
      >
        <Table bordered columns={formDates} data={dataSource} />
      </Modal>
    </div>
  )
}
export default TreeTable
