import React from "react";
import moment from "moment"
import { Layout, Menu, Icon, Button } from 'antd';
import { Items } from './subpages/Items'
import { CreateForm } from './subpages/CreateForm'
import Link from 'umi/link'
import axios from 'axios'

const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
//  创建一些测试数据
const todoItems = [
    {
        id: 1,
        title: "Go to Market",
        content: "Buy ingredients to prepare dinner",
        pub_date: "2019-9-1",
        isDone: true
    },
    {
        id: 2,
        title: "Study",
        content: "Read Algebra and History textbook for upcoming test",
        pub_date: "2019-9-2",
        isDone: false
    },
    {
        id: 3,
        title: "Sally's books",
        content: "Go to library to rent sally's books",
        pub_date: "2019-9-3",
        isDone: true
    },
    {
        id: 4,
        title: "Article",
        content: "Write article on how to use django with react",
        pub_date: "2019-9-4",
        isDone: false
    },
    {
        id: 5,
        title: "Article",
        content: "Write article on how to use django with react",
        pub_date: "2019-9-1",
        isDone: false
    },
    {
        id: 6,
        title: "Article",
        content: "Write article on how to use django with react",
        pub_date: "2019-9-5",
        isDone: false
    }
];

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            displayFinishedItems: false,
            collapsed: false,
            modalVisible: false,
        }
        this.finish = this.finish.bind(this);
        this.delete = this.delete.bind(this);
    }
    //展示对话框
    showModal() {
        this.setState({ modalVisible: true });
    }

    //隐藏对话框
    handleCancle = () => {
        this.setState({ modalVisible: false });
    }

    //处理表单提交
    //TODO: 应该post到后端
    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            //TODO: 在这里我应该将新加入的待办发送到后端
            const todoList = this.state.todoList;
            let now = moment().format('YYYY-MM-DD');
            let newTodo = {id: null, title: values.title, content: values.description, isDone: false, pub_date: now}
            this.updateTodoList(newTodo);
            form.resetFields();
            this.setState({ modalVisible: false });
        });

    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    //折叠sider
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    //展示已完成的待办事项
    chooseFinished = () => {
        this.setState({ displayFinishedItems: true });
    }

    //展示未完成的待办事项
    chooseUnfinished = () => {
        this.setState({ displayFinishedItems: false });
    }

    //将一个待办标记为完成
    //TODO: 也算是一种更改，应该将请求put到后端
    finish(id) {
        let newTodoList = this.state.todoList;
        for (let todo of newTodoList) {
            if (todo.id === id) {
                if (!todo.isDone) {
                    let newTodo = {id : id, title : todo.title, content : todo.content, pub_date : todo.pub_date, isDone : true};
                    axios.put(`http://localhost:8000/api/todos/${id}/`, newTodo)
                    .then(res=>this.refreshTodoList())
                    .catch(e=>console.log(e));
                    return;
                }
            }
        }
    }

    //删除某个待办
    //TODO: delete到后端
    delete(id) {
        axios.delete(`http://localhost:8000/api/todos/${id}`)
        .then(res=>this.refreshTodoList())
    }


    //创建新待办的按钮
    getCreateButton() {
        const style = {
            width: '860px',
            margin: '20px',
        };
        return <Button type='dashed' style={style} onClick={() => this.showModal()}>+ 创建新待办</Button>
    }

    getItems() {
        const flag = this.state.displayFinishedItems;
        const todoList = this.state.todoList;
        if (flag) {
            return <div><Items isDone={true} todoList={todoList} finish={this.finish} delete={this.delete}></Items></div>;
        }
        else {
            return <div>{this.getCreateButton()} <Items isDone={false} todoList={todoList} finish={this.finish} delete={this.delete}></Items></div>;
        }
    }

    componentDidMount() {
        this.refreshTodoList();
    }

    //从后台获取数据
    refreshTodoList() {
        axios.get('http://localhost:8000/api/todos/')
        .then(res=>this.setState({todoList:res.data}))
        .catch(e => console.log(e));
    }

    //新增或更新数据到后台
    updateTodoList(item) {
        //若id非空，则是修改，否则是添加
        if(item.id) {
            axios.put(`http://localhost:8000/api/todos/${item.id}/`, item)
            then(res=>this.refreshTodoList())
            .catch(e=>console.log(e));
        }
        else {
            axios.post('http://localhost:8000/api/todos/', item)
            .then(res=>this.refreshTodoList())
            .catch(e=>console.log(e));
        }
    }


    render() {    
        return (
            <Layout>
                <Sider width={256} style={{ minHeight: '100vh' }} trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px' }} />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" onClick={this.chooseUnfinished}>
                            <Link to='/'>
                                <Icon type="pie-chart" />
                                <span>待完成</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2" onClick={this.chooseFinished}>
                            <Link to='/'>
                                <Icon type="pie-chart" />
                                <span>已完成</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout >
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>

                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <CreateForm
                                wrappedComponentRef={this.saveFormRef}
                                visible={this.state.modalVisible}
                                onCancel={this.handleCancle}
                                onCreate={this.handleCreate}
                            />
                            {this.getItems()}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}