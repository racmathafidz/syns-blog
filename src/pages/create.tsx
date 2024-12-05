import { Button, Typography, Form, Input } from "antd";

const { Title } = Typography;

export default function Create() {
  const [form] = Form.useForm();

  return (
    <div className="flex flex-col justify-center items-center py-8">
      <Form
        layout="vertical"
        form={form}
        initialValues={{}}
        //   onValuesChange={onFormLayoutChange}
        className="w-2/5"
      >
        <Title level={2} className="text-left">
          Write Your Blog
        </Title>
        <Form.Item>
          <Input size="large" placeholder="Title" />
        </Form.Item>
        <Form.Item>
          <Input.TextArea
            size="large"
            rows={8}
            placeholder="Tell your story..."
          />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
