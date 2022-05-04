import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Drawer } from "antd";
import { CoreAPI, RetailAPI } from "Core/API";
import checkPermissions from "Retail/Helpers/checkPermissions";
import { isObject } from "lodash-es";
import { useSelector } from "react-redux";

const CreateNewDistrictForm = ({ visible, onClose, isEdit, editData }) => {
  const [companies, setCompanies] = useState([]);
  const users = useSelector((state) => state.retail.employees.data);
  const [form] = Form.useForm();

  const isMapleAdmin = React.useMemo(() => {
    return checkPermissions("", "MAPLE_ADMIN", true);
  }, []);
  useEffect(() => {
    form.resetFields();
  }, [visible]);

  useEffect(() => {
    if (isMapleAdmin && companies.length === 0)
      CoreAPI.get("company/list").then((data) => setCompanies([...data]));
  }, [isMapleAdmin]);

  useEffect(() => {
    if (visible === false) {
      form.resetFields();
    } else {
      if (isObject(editData)) form.setFieldsValue(editData);
    }
  }, [visible]);

  const onSubmit = (values) => {
    values = {
      ...values,
      region: "TR-34",
      country: "TUR",
      gpsFence: "((0.0,0.0),(0.0,0.0),(0.0,0.0),(0.0,0.0))",
      active: true,
    };
    RetailAPI[isEdit ? "put" : "post"](
      "/district" + (isEdit ? "/" + editData.id : ""),
      values
    )
      .then((id) => {
        message.info("Bölge Oluşturuldu");
        if (isEdit && values.managerId !== null) {
          updateDistrictManager(editData.id, values.managerId);
          createDistrictManager(editData.id, values.managerId);
        } else {
          createDistrictManager(id, values.managerId);
        }

        if (onClose) onClose();
      })
      .catch(console.error);
  };

  const createDistrictManager = (districtId, managerId) => {
    RetailAPI.post("/district/manager", {
      districtId: districtId,
      employeeId: managerId,
    }).then(() => {
      message.info("Bölge Yöneticisi Atandı");
    });
  };

  const updateDistrictManager = async (districtId, managerId) => {
    if (editData.managerId !== managerId && managerId) {
      RetailAPI.delete(`/district/${districtId}/manager/${managerId}`);
      message.info("Bölge Yöneticisi Güncelleniyor");
    }
  };
  return (
    <Drawer
      visible={visible}
      onClose={() => {
        form.resetFields();
        onClose();
      }}
      width={600}
    >
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
              name: "",
              description: "",
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

          {/* Kişisel Ayarlar */}
          <Form.Item
            label="Bölge Adı"
            name="name"
            rules={[{ required: true, min: 3, type: "string" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Yönetici" name={"managerId"}>
            <Select>
              {users.map((i, k) => (
                <Select.Option key={k} value={i.employeeId}>
                  {i.name}
                </Select.Option>
              ))}
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
      )}
    </Drawer>
  );
};

export default CreateNewDistrictForm;
