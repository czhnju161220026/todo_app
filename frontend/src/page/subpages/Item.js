import { Card, Icon, Tooltip, Avatar } from 'antd'

export function Item(props) {
    const style = {
        width: '400px',
        margin: '30px',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        border: '1px solid #e8e8e8',
    }

    return <Card style={style} actions={[
        <Tooltip title='完成' placement='bottomLeft'><Icon type="check" key="check" onClick={() => {props.finish(props.id)}}/></Tooltip>, 
        <Tooltip title='编辑' placement='bottom'><Icon type="edit" key="edit" onClick={()=>{props.edit(props)}}/></Tooltip>,
        <Tooltip title='删除' placement='bottomRight'><Icon type="close" key="delete" onClick={() => {props.delete(props.id)}}/></Tooltip>
        ,
    ]}>
        <Card.Meta
            //avatar={<Avatar src={props.isDone? done : todo}/>}
            title={<span>{props.title+'  '}<span><Icon type={props.isDone? "check-circle":"bell"} key="flag" /></span></span>}
            description={"发布时间: " + props.pub_date}
        />
        {props.content}
    </Card>;
}