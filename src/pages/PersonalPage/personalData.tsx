import { useState } from 'react'
import { ProForm, useForm } from '@uiw-admin/components'
import { Button, Notify } from 'uiw'
interface DetailProps {
  userInfo?: any
  dispatch?: any
  userInfoData: any
  roleList: any
}
function PDFrom({ userInfo, dispatch, userInfoData, roleList }: DetailProps) {
  const [loading, setLoading] = useState(false)

  const form = useForm() as any

  const updateState = (payload: any) => {
    dispatch({
      type: 'userInfo/updateState',
      payload,
    })
  }

  // 提交表单
  const submit = async () => {
    await form?.submitvalidate()
    const value = { ...form.getFieldValues?.() }
    if (!(value.userName && value.gender && value.phoneNumber)) return
    if (!/^1[34578]\d{9}$/g.test(value?.phoneNumber))
      return Notify.warning({ title: '请输入正确手机号' })
    delete value?.image
    delete value?.roleList
    setLoading(true)
    dispatch({
      type: 'userInfo/getdifyProfile',
      payload: {
        accountId: userInfoData?.accountId,
        user: value,
        avatar: userInfoData?.avatar || '',
      },
    }).then(async (data: any) => {
      if (data?.code === 1) {
        Notify.success({ title: data?.message || '' })
        await dispatch({
          type: 'userInfo/getProfileFun',
        })
        setLoading(false)
      } else {
        setLoading(false)
        Notify.error({ title: data?.message || '' })
      }
    })
  }

  // 上穿文件
  const upload = (value: any) => {
    if (value.length > 0) {
      dispatch({
        type: 'userInfo/getFileUpload',
        payload: { file: value[0].file },
      }).then(async (data: any) => {
        if (data.code === 1) {
          updateState({
            userInfoData: {
              ...userInfoData,
              avatar: data?.message || '',
            },
          })
        } else {
          Notify.error({ title: data?.message || '' })
        }
      })
    } else {
      updateState({
        userInfoData: {
          ...userInfoData,
          avatar: '',
        },
      })
    }
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
                initialValue: userInfoData?.avatar
                  ? [
                      {
                        dataURL: userInfoData?.avata,
                      },
                    ]
                  : [],
                widgetProps: {
                  uploadType: 'card',
                  multiple: true,
                  maxNumber: 1,
                  showFileIcon: {
                    showPreviewIcon: true,
                    showRemoveIcon: true,
                  },
                  onChange: (value: any) => upload(value),
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
                label: '用户类型',
                key: 'roleList',
                widget: 'searchSelect',
                span: '12',
                disabled: true,
                initialValue: roleList.map((item: any) => item?.value),
                option: roleList,
                widgetProps: {
                  mode: 'multiple',
                },
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
                label: '手机号码',
                key: 'phoneNumber',
                widget: 'input',
                span: '12',
                initialValue: userInfo?.phoneNumber || '',
                required: true,
                rules: [{ required: true, message: '请输入手机号码' }],
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
            loading={loading}
          >
            保存
          </Button>
          <Button
            style={{ marginTop: -14, width: 80, marginLeft: 4 }}
            type="primary"
            loading={loading}
            onClick={async () => {
              form &&
                (await form.setFields({
                  ...userInfo,
                  image: userInfoData?.avatar
                    ? [
                        {
                          dataURL: userInfoData?.avata,
                        },
                      ]
                    : [],
                  roleList: roleList.map((item: any) => item?.value),
                }))
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
