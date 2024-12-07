import { useState, useEffect } from "react";
import {
  Modal,
  Input,
  Button,
  Form,
  Typography,
  message,
  Col,
  Select,
  Spin,
} from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/api/users";
import { getFromLocalStorage } from "@/lib/helper";
import constants from "@/constants";
import { Author } from "@/types";

const { Text } = Typography;

export default function WelcomeDialog() {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const status = "active";

  useEffect(() => {
    const storedToken = getFromLocalStorage(
      constants.localStorage.ACCESS_TOKEN
    );
    if (!storedToken) {
      setIsModalVisible(true);
    }
  }, []);

  const saveUserData = (user_id: Author["id"]) => {
    if (user_id) {
      localStorage.setItem(constants.localStorage.USER_ID, user_id.toString());
    }
  };

  const invalidatePosts = async () => {
    await queryClient.refetchQueries({
      queryKey: ["posts"],
      type: "active",
    });
  };

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      if (data?.id) {
        setIsModalVisible(false);
        invalidatePosts();
        saveUserData(data.id);
        message.success(`User created successfully! Welcome, ${data?.name}!`);
      } else {
        message.error("Failed to retrieve user ID.");
      }
    },
    onError: (error) => {
      localStorage.removeItem(constants.localStorage.ACCESS_TOKEN);
      message.error(`Failed: ${error.message}. Please try again.`);
    },
  });

  const handleSubmit = async () => {
    localStorage.setItem(constants.localStorage.ACCESS_TOKEN, token);

    const formData = {
      email,
      name,
      gender,
      status,
    };

    mutation.mutate(formData);
  };

  return (
    <Modal
      title={
        <Col className="text-center">
          <SmileOutlined
            style={{ fontSize: 36, color: "#1577FF" }}
            className="block mb-2"
          />
          <Text className="block text-xl font-medium">
            Welcome to Syns-Blog
          </Text>
          <Text className="block font-normal">
            To get started, please provide your token and create an account.
          </Text>
        </Col>
      }
      open={isModalVisible}
      closable={false}
      footer={null}
    >
      <Spin spinning={mutation.isPending}>
        <Form layout="vertical" className="mt-6" onFinish={handleSubmit}>
          <Form.Item
            label="GoRest Token"
            name="token"
            rules={[
              {
                required: true,
                message: "Please input your GoRest Token!",
              },
            ]}
            required
          >
            <Input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter your GoRest Token"
            />
          </Form.Item>
          <Text>
            You can get your GoRest Token{" "}
            <a
              href={constants.redirects.GET_ACCESS_TOKEN}
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
          </Text>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
            className="mt-4"
            required
          >
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
            required
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please select your gender!",
              },
            ]}
            required
          >
            <Select
              placeholder="Select your gender"
              onChange={(value) => setGender(value)}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Account
          </Button>
        </Form>
      </Spin>
    </Modal>
  );
}
