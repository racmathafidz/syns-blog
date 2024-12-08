import { createPost } from "@/api/posts";
import constants from "@/constants";
import { getFromLocalStorage } from "@/lib/helper";
import { useMutation } from "@tanstack/react-query";
import { Button, Typography, Form, Input, Spin, message } from "antd";
import { useRouter } from "next/router";

const { Title } = Typography;

interface formValue {
  title: string;
  body: string;
}

export default function Create() {
  const router = useRouter();
  const user = getFromLocalStorage(constants.localStorage.USER_ID) || "";
  const formInitialValues = { title: "", body: "" };

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

  const handleSubmit = async (value: formValue) => {
    const formData = {
      user: parseInt(user as string, 10),
      ...value,
    };

    mutation.mutate(formData);
  };

  return (
    <Spin spinning={mutation.isPending}>
      <div className="flex flex-col justify-center items-center py-8">
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={formInitialValues}
          className="w-9/12 sm:w-4/5 lg:w-3/5"
        >
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
      </div>
    </Spin>
  );
}
