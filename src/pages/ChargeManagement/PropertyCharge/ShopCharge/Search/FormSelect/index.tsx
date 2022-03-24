import { Fragment } from 'react'
import '../../index.css'
import DetailsList from './details'
// import ButtonGroup from './ButtonGroup'

export default function FormSelect() {
  return (
    <Fragment>
      <div className="uiw-SearchSelect-body">
        {/* 商品信息详情表 */}
        <DetailsList />
      </div>
      {/* table头部按钮 */}
      {/* <ButtonGroup /> */}
    </Fragment>
  )
}
