import { Button, Checkbox, Drawer, Form, Input, message, Select } from "antd";
import { CoreAPI, RetailAPI } from "Core/API";
import { isObject } from "lodash-es";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import checkPermissions from "Retail/Helpers/checkPermissions";

const createUserTemplate = {
  core: {
    uri: "https://stg-core-api.workmaple.com/user",
    raw: {
      fullName: "Sephora Test1",
      email: "test1@sephora.com.tr",
      password: "88Maple88",
      language: "en-US",
      departments: [512],
      positions: ["6"],
      PermissionId: 19,
    },
  },
  retail: {
    uri: "https://stg-retail-api.workmaple.com/employee",
    data: {
      userId: "MLDC6MFCHVHPGSG3FXRFA3FAL4",
      companyId: "values.company",
      buildingId: "21",
      contactInfo: { email: "values.email" },
      isManager: false,
      active: true,
    },
  },
};

const EditNewUserForm = ({ visible, initial, onClose }) => {
  const { t } = useTranslation("retail");
  const [companies, setCompanies] = useState([]);

  const buildings = useSelector((state) => state.retail.buildings.data);
  const departments = useSelector((state) => state.retail.departments?.data);
  const permissions = useSelector((state) => state.retail.permissions?.data);
  const [form] = Form.useForm();
  const isMapleAdmin = React.useMemo(() => {
    return checkPermissions("", "MAPLE_ADMIN", true);
  }, []);
  useEffect(() => {
    if (isMapleAdmin && companies.length === 0)
      CoreAPI.get("company/list").then((data) => setCompanies([...data]));
  }, [isMapleAdmin]);

  const onSubmit = (values) => {
    const coreAPIData = {
      fullName: values.name,
      email: values.email,
      language: "en-US",
      departments: values.departments,
      positions: [],
      PermissionId: values.permissionId,
    };
    CoreAPI.put("user/integration/" + initial.id, coreAPIData);
    const retailAPIData = {
      id: initial.employeeId,
      userId: initial.userId,
      buildingId: values.buildingId || null,
      isManager: values.isManager,
      contactInfo: initial?.contactInfo || {},
      active: true,
    };
    RetailAPI.put("employee/" + initial.employeeId, retailAPIData)
      .then(() => {
        message.info("Kullanıcı Eklendi");
        if (onClose) onClose();
        // onClose(Object.assign({}, initial, retailAPIData));
      })
      .catch(console.error);
  };

  // const onValuesChange = (changeData, allData) => {
  //   if (isMapleAdmin && changeData["company"]) {
  //     Promise.all([
  //       CoreAPI.get(
  //         "company/department?optionalCompany=" + changeData["company"]
  //       ),
  //       RetailAPI.get("building?optionalCompanyId=" + changeData["company"]),
  //     ]).then(([departments, buildings]) => {
  //       setDepartments(departments);
  //       setBuildings(buildings);
  //     });
  //   }
  // };

  return (
    <>
      <Drawer
        title={t("settings.users.create-users.title")}
        width={768}
        visible={visible}
        onClose={() => onClose()}
      >
        {isObject(initial) && (
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
              name: initial?.name || "",
              permissionId: initial?.permissions?.pop()?.id,
              departments: initial?.departments?.map((i) => i?.id),
              buildingId: initial?.buildingId,
              isManager: initial?.isManager,
            }}
            // onValuesChange={onValuesChange}
          >
            <Form.Item label="Ad Soyad" name={["name"]}>
              <Input />
            </Form.Item>
            <Form.Item label="Departmanlar" name={["departments"]}>
              <Select mode="multiple" showSearch maxTagCount={5}>
                {(departments || []).map((i, k) => (
                  <Select.Option key={k} value={i.id}>
                    {i.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="İzinler" name={["permissionId"]}>
              <Select>
                {(permissions || []).map((i, k) => (
                  <Select.Option key={k} value={i.id}>
                    {i.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Çalıştığı Mağaza" name={["buildingId"]}>
              <Select>
                {(buildings || []).map((i, k) => (
                  <Select.Option key={i.id} value={i.id}>
                    {i.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {/* Kişisel Ayarlar */}
            <Form.Item
              valuePropName="checked"
              label="Mağaza Yöneticisi"
              name="isManager"
            >
              <Checkbox />
            </Form.Item>
            {/* <Form.Item
            label="Kullanıcı Adı"
            name="fullName"
            rules={[{ required: true, min: 3, type: "string" }]}
          >
            <Input />
          </Form.Item> */}
            {/* <Form.Item
            label="Email Adresi"
            name={["email"]}
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item> */}
            {/* <Form.Item
            label="Şifresi"
            name="password"
            rules={[{ required: true, min: 6, max: 16 }]}
          >
            <Input />
          </Form.Item> */}

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
    </>
  );
};

export default EditNewUserForm;
