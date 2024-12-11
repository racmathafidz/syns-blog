import { createPost } from "@/api/posts";
import PostsForm from "@/components/posts/postsForm";
import constants from "@/constants";
import helpers from "@/lib/helper";
import { useMutation } from "@tanstack/react-query";
import { Spin, message } from "antd";
import { useRouter } from "next/router";

interface formValue {
  title: string;
  body: string;
}

export default function Create() {
  const router = useRouter();
  const user =
    helpers.storage.getFromLocalStorage(constants.localStorage.USER_ID) || "";
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
        <PostsForm
          title="Write"
          handleSubmit={handleSubmit}
          initialValues={formInitialValues}
        />
      </div>
    </Spin>
  );
}
