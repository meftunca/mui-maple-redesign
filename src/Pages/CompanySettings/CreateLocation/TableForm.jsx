import React, { useEffect, useMemo, useState } from "react";
import { Form, Input, Button, Select, message, Drawer, Switch } from "antd";
import { CoreAPI, RetailAPI } from "Core/API";
import checkPermissions from "Retail/Helpers/checkPermissions";
import { useSelector } from "react-redux";
import { isObject } from "lodash-es";

const CreateNewUserForm = ({ visible, onClose, isEdit, editData }) => {
  const [companies, setCompanies] = useState([]);
  const [form] = Form.useForm();
  const districts = useSelector((state) => state.retail.districts.data);

  const isMapleAdmin = useMemo(() => {
    return checkPermissions("", "MAPLE_ADMIN", true);
  }, []);

  useEffect(() => {
    if (isMapleAdmin) {
      CoreAPI.get("company/list").then((data) => setCompanies([...data]));
    }
  }, [isMapleAdmin, visible]);

  const onSubmit = (values) => {
    let district = districts.find((i) => i.id === values.districtId);

    // if (!district) return message.error("Lokasyon bilgileri alınamadı");
    let formData = {
      ...values,
      name: values.name,
      description: values.description,
      regionId: district.regionId || "TR-34",
      countryId: district.countryId || 1,
      // districtId: district.id,
      type: "STORE",
      gpsFence: "((0.0,0.0),(0.0,0.0),(0.0,0.0),(0.0,0.0))",
      location: "(0,0)",
      external: Math.floor(Date.now() * Math.random()).toString(16),
      active: values.active || true,
    };
    RetailAPI[isEdit ? "put" : "post"](
      "/location" + (isEdit ? "/" + editData.id : ""),
      formData
    )
      .then(() => {
        message.info(
          isEdit ? "Mağaza Bilgileri Güncellendi" : "Mağaza Oluşturuldu"
        );
        form.resetFields();
        onClose();
      })
      .catch(console.error);
  };
  useEffect(() => {
    if (visible === false) {
      form.resetFields();
    } else {
      if (isObject(editData)) form.setFieldsValue(editData);
    }
  }, [visible]);
  return (
    <Drawer visible={visible} onClose={onClose} width={600}>
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
        initialValues={
          editData || {
            districtId: undefined,
            name: "",
            active: true,
          }
        }
      >
        {isMapleAdmin && (
          <Form.Item
            label="Şirket"
            name={"companyId"}
            rules={[{ required: true, type: "string" }]}
          >
            <Select>
              {companies.map((i, k) => (
                <Select.Option key={k} value={i.id}>
                  {i.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          label="Bölge"
          name={"districtId"}
          rules={[{ required: true, type: "string" }]}
        >
          <Select>
            {districts.map((i, k) => (
              <Select.Option key={k} value={i.id}>
                {i.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Lokasyon Adı"
          name="name"
          rules={[{ required: true, min: 3, type: "string" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="active" label="Aktif/Pasif" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ padding: "auto 24px", margin: 24, float: "right" }}
        >
          Kaydet
        </Button>
      </Form>
    </Drawer>
  );
};

export default CreateNewUserForm;
