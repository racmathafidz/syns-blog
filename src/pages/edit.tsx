import { editPost } from "@/api/posts";
import PostsForm from "@/components/posts/postsForm";
import { useMutation } from "@tanstack/react-query";
import { Spin, message } from "antd";
import { useRouter } from "next/router";

interface formValue {
  title: string;
  body: string;
}

export default function Edit() {
  const router = useRouter();
  const { query } = router;
  const parsedEditData = query.postData
    ? JSON.parse(query.postData as string)
    : null;
  const { id, user_id, title, body } = parsedEditData || {
    id: "",
    user_id: "",
    title: "",
    body: "",
  };

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
        <PostsForm
          title="Edit"
          handleSubmit={handleSubmit}
          initialValues={{ title, body }}
        />
      </div>
    </Spin>
  );
}
