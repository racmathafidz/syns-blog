import { UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Space, Typography } from "antd";

const { Title, Text } = Typography;

export default function Blogs() {
  return (
    <div className="flex justify-center py-8">
      <Col className="max-w-[800px]">
        <Title>Volo templum causa tracto sub amitto.</Title>
        <Space direction="vertical">
          <Space direction="horizontal" className="mb-3">
            <Avatar size="small" icon={<UserOutlined />} />
            <Text type="secondary">John Doe</Text>
          </Space>
          <Text>
            Atavus sperno terra. Sed vinum credo. Comparo suscipit officiis.
            Omnis terra convoco. Cruciamentum colloco optio. Voro clibanus
            desparatus. Voluptatem centum amiculum. Uxor voluptas copiose.
            Apparatus ad viriliter. Ceno tollo clam. Curatio vulgus ex. Ter
            cornu carpo. Creta subvenio bibo. Decretum ulterius adiuvo. Arto
            adhaero consuasor. Altus approbo arcesso. Votum clam assumenda. Est
            apostolus aperiam. Demoror cur sonitus.
          </Text>
        </Space>
      </Col>
    </div>
  );
}
