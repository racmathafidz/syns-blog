import { editPost } from "@/api/posts";
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

export default function Edit() {
  const router = useRouter();
  const { query } = router;
  const parsedData = query.postData
    ? JSON.parse(query.postData as string)
    : null;
  const { id, user_id, title, body } = parsedData;

  const mutation = useMutation({
    mutationFn: editPost,
    onSuccess: (data) => {
      if (data) {
        message.success("Blog edited successfully!");
        router.push(`/blogs/${data.id}`);
      } else {
        message.error("Failed to edit your blog, please try again.");
      }
    },
    onError: () => {
      message.error("Failed to edit your blog, please try again.");
    },
  });

  const handleSubmit = async (value: formValue) => {
    const formData = {
      id,
      user_id,
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
          initialValues={{ title, body }}
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
