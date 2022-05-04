import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, message, Select } from "antd";
import { CoreAPI, RetailAPI } from "Core/API";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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

const CreateNewUserForm = () => {
  const { t } = useTranslation("retail");
  const [visible, setVisible] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [departments, setDepartments] = useState(null);
  const [buildings, setBuildings] = useState(null);
  const [form] = Form.useForm();
  const isMapleAdmin = React.useMemo(() => {
    return checkPermissions("", "MAPLE_ADMIN", true);
  }, []);
  useEffect(() => {
    // if (isMapleAdmin && companies.length === 0)
    // CoreAPI.get("company/list").then((data) => setCompanies([...data]));
  }, [isMapleAdmin]);
  useEffect(() => {
    if (isMapleAdmin === false) {
      Promise.all([
        CoreAPI.get("company/department"),
        RetailAPI.get("building"),
        CoreAPI.get("company/permission"),
      ]).then(([departments, buildings, permissionList]) => {
        setDepartments(departments);
        setBuildings(buildings);
        setPermissions(Array.from(permissionList));
      });
    }
  }, [isMapleAdmin]);

  const onSubmit = (values) => {
    const coreAPIData = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      language: "en-US",
      departments: [values.departments].filter(Boolean),
      positions: [],
      PermissionId: values.permissionId,
    };

    CoreAPI.post("user", coreAPIData)
      .then((id) => {
        const retailAPIData = {
          userId: id,
          companyId: values.company,
          buildingId: values.buildingId || null,
          contactInfo: { email: values.email },
          isManager: false,
          active: true,
        };
        return RetailAPI.post("employee", retailAPIData).then(() => {
          message.info("Kullanıcı Eklendi");
          form.resetFields();
        });
      })
      .catch(console.error);
  };

  const onValuesChange = (changeData, allData) => {
    if (isMapleAdmin && changeData["company"]) {
      Promise.all([
        CoreAPI.get(
          "company/department?optionalCompany=" + changeData["company"]
        ),
        RetailAPI.get("building?optionalCompanyId=" + changeData["company"]),
      ]).then(([departments, buildings]) => {
        setDepartments(departments);
        setBuildings(buildings);
      });
    }
  };

  return (
    <>
      <Button icon={<PlusCircleOutlined />} onClick={() => setVisible(true)}>
        {t("settings.users.create-user-button")}
      </Button>

      <Drawer
        title={t("settings.users.create-users.title")}
        width={768}
        visible={visible}
        onClose={() => setVisible(false)}
      >
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
            departments: "",
            fullName: "",
            email: "",
            password: "",
            active: true,
          }}
          onValuesChange={onValuesChange}
        >
          {/* {isMapleAdmin && (
            <Form.Item
              label="Şirket"
              name={"company"}
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
            label="Departmanlar"
            name={["departments"]}
            rules={[{ required: false, type: "string" }]}
          >
            <Select>
              {(departments || []).map((i, k) => (
                <Select.Option value={i.id}>{i.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="İzinler"
            name={["permissionId"]}
            rules={[{ required: true, type: "string" }]}
          >
            <Select>
              {(permissions || []).map((i, k) => (
                <Select.Option value={i.id}>{i.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Çalıştığı Mağaza"
            name={["buildingId"]}
            rules={[{ required: false, type: "string" }]}
          >
            <Select>
              {(buildings || []).map((i, k) => (
                <Select.Option value={i.id}>{i.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          {/* Kişisel Ayarlar */}
          <Form.Item
            label="Kullanıcı Adı"
            name="fullName"
            rules={[{ required: true, min: 3, type: "string" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email Adresi"
            name={["email"]}
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Şifresi"
            name="password"
            rules={[{ required: true, min: 6, max: 16 }]}
          >
            <Input />
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
    </>
  );
};

export default CreateNewUserForm;
