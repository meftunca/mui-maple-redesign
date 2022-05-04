import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Drawer } from "antd";
import { CoreAPI, RetailAPI } from "Core/API";
import checkPermissions from "Retail/Helpers/checkPermissions";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "Retail/state/actions/retail";
import { isObject } from "lodash-es";

const CreateDepartmentForm = ({ visible, onClose, isEdit, editData }) => {
  const [companies, setCompanies] = useState([]);
  // const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const isMapleAdmin = React.useMemo(() => {
    return checkPermissions("", "MAPLE_ADMIN", true);
  }, []);
  const users = useSelector((state) => state.retail.employees.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (users.length === 0) dispatch(fetchEmployees());
  }, []);
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
    if (isEdit) values.id = editData.id;
    CoreAPI[isEdit ? "put" : "post"](
      "company/department",
      isEdit ? values : [values]
    ).then(() => {
      message.info("Departman Bilgileri Eklendi");
      dispatch(fetchEmployees());
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
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={onSubmit}
          initialValues={{
            name: "",
            users: [],
            supervisors: [],
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
            label="Departman Adı"
            name="name"
            rules={[{ required: true, min: 2, type: "string" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Yönetici"
            name={"supervisors"}
            rules={[{ type: "array" }]}
          >
            <Select mode="multiple">
              {users.map((i, k) => (
                <Select.Option key={k} value={i.id}>
                  {i.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Çalışanlar"
            name={"users"}
            rules={[{ type: "array" }]}
          >
            <Select mode="multiple">
              {users.map((i, k) => (
                <Select.Option key={k} value={i.id}>
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

export default CreateDepartmentForm;
