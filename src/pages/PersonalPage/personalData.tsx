import { ProForm, useForm } from '@uiw-admin/components'
import { Button } from 'uiw'
interface DetailProps {
  userInfo?: any
  dispatch?: any
  userInfoData: any
}
function PDFrom({ userInfo, dispatch, userInfoData }: DetailProps) {
  const form = useForm() as any
  const submit = async () => {
    await form?.submitvalidate()
    const errors = form.getError()
    if (errors && Object.keys(errors).length > 0) return
    const value = { ...form.getFieldValues?.() }
    delete value?.image
    dispatch({
      type: 'userInfo/getdifyProfile',
      payload: { accountId: userInfoData?.accountId, user: value },
    })
  }
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
                required: true,
                rules: [{ required: true, message: '请输入姓名' }],
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
                required: true,
                rules: [{ required: true, message: '请选择性别' }],
              },
              {
                label: '手机号码',
                key: 'phoneNumber',
                widget: 'input',
                span: '12',
                initialValue: userInfo?.phoneNumber || '',
                required: true,
                rules: [
                  { required: true, message: '请输入手机号码' },
                  {
                    pattern: new RegExp(/^1[34578]\d{9}$/g),
                    message: '请输入正确手机号',
                  },
                ],
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
            onClick={submit}
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
