import { Button, Modal, Form, Input, Radio } from 'antd';

export const UpdateForm = Form.create({ name: 'form_in_modal2' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onUpdate, form} = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="编辑待办"
          okText="Update"
          onCancel={onCancel}
          onOk={onUpdate}
        >
          <Form layout="vertical">
            <Form.Item label="标题">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="内容">
              {getFieldDecorator('description')(<Input type="textarea" />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);


