import { AddOutlined } from "@mui/icons-material";
import { Button, Divider, Drawer, Form, Input } from "@mui/material";
import { RetailAPI } from "Core/API";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const CreateCoachingCompetencesItem = ({ fetchCompetencesList }) => {
  const { t } = useTranslation("retail");
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  return (
    <>
      <Button
        startIcon={<AddOutlined />}
        className="ml-1"
        onClick={() => setVisible(true)}
      >
        {t("navigation.companySettings.coaching.competenceItemsTitle")}
      </Button>

      <Drawer
        open={visible}
        onClose={() => setVisible(false)}
        anchor="right"
        sx={{ width: 400 }}
        title={t("navigation.companySettings.coaching.competenceItemsTitle")}
      >
        <Form
          form={form}
          defaultValue={{
            title: "",
            description: "",
          }}
          onFinish={(values) => {
            RetailAPI.post("coaching/competence-item", values).then(() => {
              form?.resetFields();
              fetchCompetencesList();
              setVisible(false);
            });
          }}
        >
          <Divider style={{ margin: "4px 0 12px 0" }} />
          <Form.Item
            name="title"
            rules={[{ required: true, type: "string", min: 4 }]}
          >
            <Input placeholder="Başlık" />
          </Form.Item>
          <Form.Item name="description">
            <Input placeholder="Açıklama" />
          </Form.Item>
          <Button type="submit" color="primary" fullWidth>
            Kaydet
          </Button>
        </Form>
        <Divider />
        <Button onClick={() => setVisible(false)} size="small">
          Kapat
        </Button>
      </Drawer>
    </>
  );
};
export default CreateCoachingCompetencesItem;
