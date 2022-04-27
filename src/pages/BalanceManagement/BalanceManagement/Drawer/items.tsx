// import { Input } from 'uiw'

export const items = (queryInfo: any, paysList: any) => {
  return [
    {
      label: '收款人',
      key: 'payName',
      widget: 'input',
      required: true,
      initialValue: queryInfo?.payName,
      placeholder: '请输入收款人',
      readSpan: 1.5,
      rules: [{ required: true, message: '请输入收款人' }],
    },
    {
      label: '付款方式',
      key: 'payType',
      initialValue: queryInfo?.payType,
      widget: 'select',
      required: true,
      option: paysList,
      rules: [{ required: true, message: '请输入付款方式' }],
    },
  ]
}

// export const backList = () => {
//     return [
//         {
//             title: '收费项',
//             align: 'center',
//             key: 'chargeName',
//         },
//         {
//             title: '账户金额',
//             align: 'center',
//             key: 'chargePrice',
//         },
//         {
//             title: '退还金额',
//             align: 'center',
//             key: 'refundAmount',
//             required: true,
//             render: (text: string, key: string, rowData: any) => {
//                 return (
//                     <Input
//                         placeholder="请输入内容"
//                         style={{ maxWidth: 150 }}
//                         onBlur={async (e) => {
//                             const value = e?.target?.value || ''
//                             rowData.refundAmount = value
//                         }}
//                     />
//                 )
//             },
//         },
//     ]
// }
