import React from 'react'
import { Item } from './Item'
import { Row, Col } from 'antd'

export function Items(props) {
    //筛选item
    const items = (props.todoList).filter((item, index) => {
        return props.isDone === item.isDone;
    });
    //渲染, 用栅格排成两列
    const tempItems = items.map((item, index) => {
        return <Item
            key={index}
            id={item.id}
            title={item.title}
            content={item.content}
            pub_date={item.pub_date}
            isDone={item.isDone}
            finish={props.finish}
            delete={props.delete}
            edit={props.edit}
            >
        </Item>
    });
    let rows = [];
    let row = [];
    for (let i = 0; i < tempItems.length; i += 2) {
        if (i < tempItems.length) {
            row.push(<Col key={i} span={7}>{tempItems[i]}</Col>);
        }
        if (i + 1 < tempItems.length) {
            row.push(<Col key={i + 1} span={7}>{tempItems[i + 1]}</Col>);
        }
        rows.push(<Row key={i / 2} gutter={16} >{row}</Row>)
        row = []
    }
    return <div>{rows}</div>
}