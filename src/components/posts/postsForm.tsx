import { Button, Form, Input, Typography } from "antd";
import React from "react";

const { Title } = Typography;

type handleSubmit = (value: { title: string; body: string }) => Promise<void>;

interface PostsFormProps {
  title: string;
  handleSubmit: handleSubmit;
  initialValues: {
    title: string;
    body: string;
  };
}

export default function PostsForm({
  title,
  handleSubmit,
  initialValues,
}: PostsFormProps) {
  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={initialValues}
      className="w-9/12 sm:w-4/5 lg:w-3/5"
    >
      <Title level={2} className="text-left">
        {title} Your Blog
      </Title>
      <Form.Item
        name="title"
        rules={[
          {
            required: true,
            message: "Please input title!",
          },
        ]}
        required
      >
        <Input size="large" type="text" placeholder="Title" />
      </Form.Item>
      <Form.Item
        name="body"
        rules={[
          {
            required: true,
            message: "Please input body!",
          },
        ]}
        required
      >
        <Input.TextArea
          size="large"
          rows={8}
          placeholder="Tell your story..."
        />
      </Form.Item>
      <Form.Item className="flex justify-end">
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
