import { Table } from 'uiw'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { columnsList } from './item'
export default function index() {
  return <Table bordered columns={columnsList() as FormCol[]} data={[]} />
}
