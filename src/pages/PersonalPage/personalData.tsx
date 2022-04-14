import { ProForm, useForm } from '@uiw-admin/components'
import { Button } from 'uiw'
interface DetailProps {
  userInfo?: any
}
function PDFrom({ userInfo }: DetailProps) {
  const form = useForm() as any
  return (
    <>
      {JSON.stringify(userInfo) !== '{}' && (
        <>
          <ProForm
            form={form}
            formType="pure"
            formDatas={[
              {
                label: '头像',
                key: 'image',
                widget: 'upload',
                span: '24',
                readSpan: 3,
                required: true,
                widgetProps: {
                  uploadType: 'card',
                  multiple: true,
                  maxNumber: 1,
                  showFileIcon: {
                    showPreviewIcon: true,
                    showRemoveIcon: true,
                  },
                },
              },
              {
                label: '姓名',
                key: 'userName',
                widget: 'input',
                span: '12',
                initialValue: userInfo?.userName || '',
              },
              {
                label: '用户状态',
                key: 'status',
                widget: 'select',
                span: '12',
                disabled: true,
                initialValue: userInfo?.status,
                option: [
                  { value: 1, label: '正常' },
                  { value: 2, label: '停用' },
                ],
              },
              {
                label: '性别',
                key: 'gender',
                widget: 'select',
                span: '12',
                initialValue: userInfo?.status,
                option: [
                  { value: 1, label: '男' },
                  { value: 2, label: '女' },
                ],
              },
              {
                label: '手机号码',
                key: 'phoneNumber',
                widget: 'input',
                span: '12',
                initialValue: userInfo?.phoneNumber || '',
              },
              {
                label: '邮箱',
                key: 'email',
                widget: 'input',
                span: '12',
                initialValue: userInfo?.email || '',
              },
              {
                label: '民族',
                key: 'nation',
                widget: 'input',
                span: '12',
                initialValue: userInfo?.nation || '',
              },
              {
                label: '籍贯',
                key: 'nationPlace',
                widget: 'input',
                span: '12',
                initialValue: userInfo?.nationPlace || '',
              },
              {
                label: '户口地址',
                key: 'nativeAddress',
                widget: 'input',
                span: '12',
                initialValue: userInfo?.nativeAddress || '',
              },
            ]}
          />
          <Button
            style={{ marginTop: -14, width: 80, marginLeft: 4 }}
            type="primary"
          >
            保存
          </Button>
          <Button
            style={{ marginTop: -14, width: 80, marginLeft: 4 }}
            type="primary"
            onClick={() => {
              form && form.resetForm()
            }}
          >
            重置
          </Button>
        </>
      )}
    </>
  )
}

export default PDFrom
