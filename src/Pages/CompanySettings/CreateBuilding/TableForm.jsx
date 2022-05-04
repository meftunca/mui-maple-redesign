import React, { useEffect, useMemo, useState } from "react";
import { Form, Input, Button, Select, message, Drawer, Switch } from "antd";
import { CoreAPI, RetailAPI } from "Core/API";
import checkPermissions from "Retail/Helpers/checkPermissions";
import { useSelector } from "react-redux";

const CreateNewUserForm = ({ visible, onClose, isEdit, editData }) => {
  const [companies, setCompanies] = useState([]);
  const [form] = Form.useForm();
  const locations = useSelector((state) => state.retail.locations.data);

  const isMapleAdmin = useMemo(() => {
    return checkPermissions("", "MAPLE_ADMIN", true);
  }, []);

  useEffect(() => {
    if (isMapleAdmin && companies.length === 0 && visible) {
      CoreAPI.get("company/list").then((data) => setCompanies([...data]));
    }
  }, [isMapleAdmin, visible]);

  const onSubmit = (values) => {
    let location = locations.find((i) => i.id === values.locationId);
    // if (!location) return message.error("Lokasyon bilgileri alınamadı");
    let formData = {
      // ...values,
      name: values.name,
      description: values.description,

      regionId: location.regionId,
      countryId: location.countryId,
      locationId: values.locationId,
      districtId: location.districtId,
      type: "STORE",
      external: Math.floor(Date.now() * Math.random()).toString(16),
      active: values.active || true,
    };
    RetailAPI[isEdit ? "put" : "post"](
      "/building" + (isEdit ? "/" + editData.id : ""),
      formData
    )
      .then(() => {
        message.info(
          isEdit ? "Mağaza Bilgileri Güncellendi" : "Mağaza Oluşturuldu"
        );
        onClose();
      })
      .catch(console.error);
  };

  return (
    <Drawer visible={visible} onClose={onClose} width={600}>
      {visible && (
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
              locationId: undefined,
              name: "",
              description: "",
              active: true,
            }
          }
        >
          {/* {isMapleAdmin && (
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
        )} */}

          <Form.Item
            label="Lokasyon"
            name={"locationId"}
            rules={[{ required: true, type: "string" }]}
          >
            <Select>
              {locations.map((i, k) => (
                <Select.Option key={k} value={i.id}>
                  {i.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Mağaza Adı"
            name="name"
            rules={[{ required: true, min: 3, type: "string" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Açıklama"
            name={["description"]}
            // rules={[{ required: true, type: "string" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="active" label="Aktif/Pasif">
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
      )}
    </Drawer>
  );
};

export default CreateNewUserForm;
