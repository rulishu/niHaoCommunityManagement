import React, { useEffect } from 'react';
import { useTable } from '@uiw-admin/components';
import { Params } from '@/servers/account-admin';
import { ProForm, useForm } from '@uiw-admin/components'
// import { columnsSearch } from './item';
// eslint-disable-next-line no-unused-vars
import { Button, Card } from 'uiw'

export default function Demo(props: {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setTableType: React.Dispatch<React.SetStateAction<'add' | 'edit' | null>>;
    visible: boolean;
    tableType: 'add' | 'edit' | null;
    setInitObj: React.Dispatch<React.SetStateAction<Params>>;
}) {
    const form = useForm()

    const search = useTable('后端接口', {
        // 格式化接口返回的数据，必须返回{total 总数, data: 列表数据}的格式
        formatData: (data) => {
            return {
                total: data?.data?.total,
                data: data?.data?.row || []
            }
        },
        // 格式化查询参数 会接收到pageIndex 当前页  searchValues 表单数据
        query: (pageIndex, searchValues) => {
            return {
                page: pageIndex,
                pageSize: 10,
                data: searchValues,
            }
        }
    })
    useEffect(() => {
        props.tableType && !props.visible && search.onSearch();
    }, [props.visible])

    return (
        <Card>
            <ProForm
                showSaveButton
                saveButtonProps={{
                    label: "搜索",
                    type: "primary"
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
                        span: "24",
                        // rules: [
                        // ]
                    },
                ]}
            />
        </Card>
    )
}