import React from 'react'
import { ProForm, useForm } from '@uiw-admin/components'
import { Card } from 'uiw'

export default function Demo() {
  const form = useForm()

  return (
    <Card>
      {/* <ProForm
        showSaveButton
        saveButtonProps={{
          label: '搜索',
          type: 'primary',
        }}
        onSubmit={(initial, current) => {
          console.log('current', current, 'initial', initial)
          // 调用请求接口
        }}
        form={form}
        formType="pure"
        formDatas={[
          {
            label: '商铺编号',
            key: 'input',
            widget: 'input',
            initialValue: '',
            widgetProps: {},
            span: '24',
            // rules: [
            // ]
          },
        ]}
      /> */}
      <ProForm
        showSaveButton
        saveButtonProps={{
          label: '查询',
          type: 'primary',
        }}
        formType={ 'pure'}
        form={form}
        onSubmit={(initial, current) => {
          initial;
          current;
          console.log('current',current)
        }}
        // buttonsContainer={{ justifyContent: 'flex-start' }}
        formDatas={[
          {
            label: '商铺编号',
            key: '1',
            widget: 'input',
            widgetProps: {},
            required: true,
            span: '8',
            placeholder: '请输入商铺编号',
          },
        ]}
      />

    </Card>
  )
}
