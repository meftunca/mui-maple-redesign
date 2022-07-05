import { Button, Checkbox, Drawer, Form, Input, message, Select } from "antd";
import { CoreAPI, RetailAPI } from "Core/API";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import checkPermissions from "Retail/Helpers/checkPermissions";
import { fetchBuilding, fetchEmployees } from "Retail/state/actions/retail";

const CreateNewUserForm = ({ visible, onClose, isEdit, editData }) => {
  const [companies, setCompanies] = useState([]);
  // const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const isMapleAdmin = React.useMemo(() => {
    return checkPermissions("", "MAPLE_ADMIN", true);
  }, []);
  const buildings = useSelector((state) => state.retail.buildings.data);
  const users = useSelector((state) => state.retail.employees.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (users.length === 0) dispatch(fetchEmployees());
    if (buildings.length === 0) dispatch(fetchBuilding());
  }, []);
  useEffect(() => {
    if (isMapleAdmin && companies.length === 0)
      CoreAPI.get("company/list").then((data) => setCompanies([...data]));
  }, [isMapleAdmin]);

  useEffect(() => {
    form.resetFields();
  }, [visible]);

  const onSubmit = (values) => {
    const managedBy = users.find((a) => a.id === values.managedBy);
    values = {
      ...values,
      buildingId: values.buildingId || managedBy.buildingId,
    };
    RetailAPI[isEdit ? "put" : "post"](
      "/managed-employee" + (isEdit ? "/" + editData.id : ""),
      values
    ).then(() => {
      message.info("Çalışan Eklendi");
      form.resetFields();
      onClose();
    });
  };
  // const onValuesChange = (changed) => {
  //   if (changed["optionalCompanyId"]) {
  //     RetailAPI.get(
  //       "employee?optionalCompanyId" + changed["optionalCompanyId"]
  //     ).then(setUsers);
  //   }
  // };
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
          initialValues={{
            contactInfo: {
              name: "",
              email: "",
            },
            managedBy: null,
            active: true,
            buildingId: null,
            ...(isEdit ? editData : {}),
          }}
          // onValuesChange={onValuesChange}
        >
          {isMapleAdmin && (
            <Form.Item
              label="Şirket"
              name={"optionalCompanyId"}
              // rules={[{ required: true, type: "string" }]}
            >
              <Select showSearch>
                {companies.map((i, k) => (
                  <Select.Option key={k} value={i.id}>
                    {i.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <Form.Item
            label="Çalışan Adı"
            name={["contactInfo", "name"]}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name={["contactInfo", "email"]}
            rules={[{ type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Çalıştığı Mağaza" name={["buildingId"]}>
            <Select showSearch>
              {(buildings || []).map((i, k) => (
                <Select.Option key={i.id} value={i.id}>
                  {i.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Yönetici"
            name={"managedBy"}
            rules={[{ required: true }]}
          >
            <Select showSearch>
              {users.map((i, k) => (
                <Select.Option key={k} value={i.id}>
                  {i.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="active" valuePropName="checked">
            <Checkbox>Aktif/Pasif</Checkbox>
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
