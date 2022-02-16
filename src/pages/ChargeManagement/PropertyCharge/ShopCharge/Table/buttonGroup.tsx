import React from 'react'
import { Button } from "uiw";

export default function ButtonGroup(props: {
    keys: string
}) {
    return (
        <div>
            {props.keys === '1' ?
                <>
                    <Button type="primary">收费</Button>
                    <Button type="primary">历史信息</Button>
                </>
                : props.keys === '2'||props.keys === '3' ?
                    <Button type="primary">新增</Button>
                    :
                    <>
                        <Button type="primary">预存</Button>
                        <Button type="primary">退还</Button>
                    </>
            }
        </div>
    )
}