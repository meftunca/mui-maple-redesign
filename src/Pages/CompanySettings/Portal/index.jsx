import {
  DeleteOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, List } from "antd";
import Page from "Core/components/page";
import React from "react";

const data = [
  {
    title: "Yemek Listesi",
  },
  {
    title: "Servis Listeleri",
  },
  {
    title: "Yer Planları",
  },
];

const PortalPage = () => {
  return (
    <Page title="Portal Ayarları">
      <Card title="Sayfa Ayarları">
        <List
          dataSource={data}
          renderItem={(item, k) => (
            <List.Item
              actions={[
                <Button size="small" icon={<SettingOutlined />} type="primary">
                  Ayarlar
                </Button>,
                <Button size="small" icon={<DeleteOutlined />} type="secondary">
                  Sil
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={item.title}
                avatar={<Avatar>{k + 1}</Avatar>}
              />
            </List.Item>
          )}
          footer={
            <Button icon={<PlusOutlined />} type="primary" block>
              Yeni Sayfa Ekle
            </Button>
          }
        />
      </Card>
    </Page>
  );
};

export default PortalPage;
