import { Button, Form, Input, InputNumber, message, Select } from "antd";
import { CoreAPI } from "Core/API";
import React from "react";

/*
	req := struct {
		CompanyID  *types.URID         `json:"id"`
		Employees  int                 `json:"employees"`
		Industries types.IndustryArray `json:"industries"`
		Contacts   types.JSON          `json:"contactInfo"`
		Active     bool                `json:"active"`
		Picture    *string             `json:"picture"`
		Name       string              `json:"name"`
	}{}
*/

const CreateCompanyForm = () => {
  const [form] = Form.useForm();
  const onSubmit = (values) => {
    console.table([values]);
    CoreAPI.post("company/create", values).then(() => {
      message.info("Şirket Eklendi");
      form.resetFields();
    });
  };
  return (
    <>
      <Form
        form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onFinish={onSubmit}
        initialValues={{
          name: "",
          contactInfo: { email: "" },
          active: true,
          employees: 20,
          industries: ["RETAIL"],
        }}
        onValuesChange={console.log}
      >
        <Form.Item
          label="Şirket Adı"
          name="name"
          rules={[{ required: true, min: 3, type: "string" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email Adresi"
          name={["contactInfo", "email"]}
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Kaç Çalışanı Var" name="employees">
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Endüstri"
          name={"industries"}
          rules={[{ required: true, type: "array" }]}
        >
          <Select showSearch>
            <Select.Option value={"RETAIL"}>Retail</Select.Option>
            <Select.Option value={"EDUCATION"}>Education</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Aktif Olarak Başlasın" name="active">
          <Select showSearch>
            <Select.Option value={true}>Aktif</Select.Option>
            <Select.Option value={false}>Pasif</Select.Option>
          </Select>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          style={{ padding: "auto 24px", margin: 24, float: "right" }}
        >
          Kaydet
        </Button>
      </Form>
    </>
  );
};

export default CreateCompanyForm;
