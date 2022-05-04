import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Table } from "antd";
import { CoreAPI } from "Core/API";
import MapleAvatar from "Core/components/avatar";
import Page from "Core/components/page";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import TableForm from "./TableForm";

const CreateCompanyPage = () => {
  const { t } = useTranslation("retail");
  const [departments, setDepartments] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [visible, setVisible] = useState(false);
  const users = useSelector((state) => state.retail.employees.data);

  useEffect(() => {
    if (users.length > 0) getDepartments();
  }, [users.length]);

  const getDepartments = () => {
    CoreAPI.get("company/department").then((data) => {
      if (Array.isArray(data)) {
        data = data.map((department, k) => {
          department.key = k;
          department.users = users.filter((user) =>
            user.departments?.some((d) => d.id === department.id)
          );
          department.supervisors = users.filter((user) =>
            user.departments?.some(
              (d) => d.id === department.id && d.superVisor === true
            )
          );

          return department;
        });
        setDepartments(Array.from(data));
      }
    });
  };
  return (
    <Page title={t("navigation.companySettings.department")}>
      <Card
        extra={
          <Button
            color="red"
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            {t("navigation.companySettings.createDepartment")}
          </Button>
        }
      >
        <TableForm
          visible={visible}
          onClose={() => {
            setIsEdit(false);
            setEditData(null);
            setVisible(!visible);
            getDepartments();
          }}
          isEdit={isEdit}
          editData={editData}
        />
        <Table
          columns={[
            { title: "Departman Adı", key: "name", dataIndex: "name" },
            {
              title: "Yöneticiler",
              key: "supervisors",
              dataIndex: "supervisors",
              render: (c, r) => (
                <MapleAvatar.List
                  dataSource={c}
                  emptyText="Yönetici Bulunamadı"
                />
              ),
            },
            {
              title: "Departmandakiler",
              key: "users",
              dataIndex: "users",
              render: (c, r) => (
                <MapleAvatar.List
                  dataSource={c}
                  emptyText="Çalışan Bulunamadı"
                />
              ),
            },
            {
              title: "Ayarlar",
              key: "edit",
              dataIndex: "edit",
              width: 100,
              render: (c, r) => {
                return (
                  <Button
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => {
                      setIsEdit(true);
                      setEditData({
                        ...r,
                        supervisors: r.supervisors.map((i) => i.id),
                        users: r.users.map((i) => i.id),
                      });
                      setTimeout(() => {
                        setVisible(true);
                      }, 100);
                    }}
                  >
                    Düzenle
                  </Button>
                );
              },
            },
          ]}
          dataSource={departments}
          pagination={{ hideOnSinglePage: true, size: "small" }}
        />
      </Card>
    </Page>
  );
};

export default CreateCompanyPage;
