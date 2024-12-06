import { createPost } from "@/api/posts";
import constants from "@/constants";
import { getFromLocalStorage } from "@/lib/helper";
import { useMutation } from "@tanstack/react-query";
import { Button, Typography, Form, Input, Spin, message } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

const { Title } = Typography;

export default function Create() {
  const router = useRouter();
  const user = getFromLocalStorage(constants.localStorage.USER_ID) || "";
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      if (data) {
        message.success("Blog created successfully!");
        router.push(`/blogs/${data.id}`);
      } else {
        message.error("Failed to created your blog, please try again.");
      }
    },
    onError: () => {
      message.error("Failed to created your blog, please try again.");
    },
  });

  const handleSubmit = async () => {
    const formData = {
      user: parseInt(user as string, 10),
      title,
      body,
    };

    mutation.mutate(formData);
  };

  return (
    <Spin spinning={mutation.isPending}>
      <div className="flex flex-col justify-center items-center py-8">
        <Form layout="vertical" onFinish={handleSubmit} className="w-2/5">
          <Title level={2} className="text-left">
            Write Your Blog
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
            <Input
              size="large"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
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
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tell your story..."
            />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
}
