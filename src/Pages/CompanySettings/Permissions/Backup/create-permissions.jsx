import { Divider, Empty, Form, Input, Modal, Select } from "antd";
import { CoreAPI } from "Core/API";
import { groupBy } from "lodash-es";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import withCheckPermission from "Retail/components/Feedback/withCheckPermission";
import checkPermissions from "Retail/Helpers/checkPermissions";
import { fetchPermissions } from "Retail/state/actions/permissions";
import { fetchEmployees } from "Retail/state/actions/retail";
import { addRoles } from "Retail/state/actions/roles";
import "./permissions.less";

function CreatePermission({ ...props }) {
  const [form] = Form.useForm();
  const [companyList, setCompanies] = useState([]);
  const { t } = useTranslation("retail");
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.permissions.data);
  const employees = useSelector((state) => state.retail.employees.data);
  const isMapleAdmin = React.useMemo(() => {
    return checkPermissions("", "MAPLE_ADMIN", true);
  }, []);
  useEffect(() => {
    if (isMapleAdmin && companies.length === 0)
      CoreAPI.get("company/list").then((data) => setCompanies([...data]));
  }, [isMapleAdmin]);
  useEffect(() => {
    if (permissions.length === 0) dispatch(fetchPermissions());
    if (employees.length === 0) dispatch(fetchEmployees());
  }, []);

  const permissionList = groupBy(permissions, (list) => {
    let permission = list.replace("RET_", "").split("_");
    return permission
      .slice(0, permission.length - 1)
      .join("_")
      .toLowerCase();
  });

  // console.log(
  //   "Array.isArray(Object.entries(permissionList))",
  //   Object.entries(permissionList)
  //     .map(
  //       ([title, types]) =>
  //         title + `:"${capitalize(title.replaceAll("_", " "))}"`
  //     )
  //     .join(",")
  // );
  return (
    <Form
      form={form}
      onFinish={(values) => {
        if (values.permissions === "all") {
          {
            values.permissions = [];
            Array.isArray(Object.entries(permissionList)) &&
              Object.entries(permissionList).map(([title, types], index) => {
                values.permissions = [...values.permissions, ...types];
              });
          }
        }
        dispatch(addRoles([values]));
        form.resetFields();
        props?.onCancel();
      }}
    >
      <Modal
        title={t("settings.permissions.create-permission.title")}
        {...props}
        okText={t("settings.permissions.create-permission.title")}
        onOk={() => form.submit()}
        width={700}
      >
        {isMapleAdmin && (
          <Form.Item
            label="Şirket"
            name={"companyId"}
            rules={[{ required: true, type: "string" }]}
          >
            <Select showSearch>
              {companyList.map((i, k) => (
                <Select.Option key={k} value={i.id}>
                  {i.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          label={t("settings.permissions.create-permission.name.label")}
          name="name"
          rules={[
            { required: true, message: "This field cannot be left blank" },
          ]}
        >
          <Input
            type="text"
            placeholder={t(
              "settings.permissions.create-permission.name.placeholder"
            )}
          />
        </Form.Item>
        <Divider />
        <Form.Item
          name="permissions"
          label={t("settings.permissions.create-permission.list.label")}
        >
          <Select mode="multiple" style={{ width: "100%" }}>
            <Select value="all">Hepsini Seç</Select>
            {Array.isArray(Object.entries(permissionList)) &&
              Object.entries(permissionList).map(([title, types], index) => (
                <Select.OptGroup
                  label={t(`permissions.fields.${title}`)}
                  key={title + index}
                >
                  {Array.isArray(types) && types.length > 0 ? (
                    types.map((type, k) => (
                      <Select.Option key={type + k} value={type}>
                        {t(
                          `permissions.types.${type
                            .split("_")
                            .pop()
                            .toLowerCase()}`
                        )}
                      </Select.Option>
                    ))
                  ) : (
                    <Empty />
                  )}
                </Select.OptGroup>
              ))}
          </Select>
        </Form.Item>
        <Divider />
        <Form.Item
          name="users"
          label={t("settings.permissions.create-permission.employee.label")}
        >
          <Select mode="multiple" style={{ width: "100%" }}>
            {!Array.isArray(employees) || employees?.length === 0 ? (
              <Empty />
            ) : (
              employees.map((employee, k) => (
                <Select.Option key={k} value={employee.id}>
                  {employee.name || employee.userName}
                </Select.Option>
              ))
            )}
          </Select>
        </Form.Item>
      </Modal>
    </Form>
  );
}

export default withCheckPermission({
  title: "navigation.companySettings",
  module: "employee",
  type: "modify",
})(CreatePermission);
