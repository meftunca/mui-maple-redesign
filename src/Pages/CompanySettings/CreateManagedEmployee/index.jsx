import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Table } from "antd";
import { RetailAPI } from "Core/API";
import MapleAvatar from "Core/components/avatar";
import Page from "Core/components/page";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuilding } from "Retail/state/actions/retail";
import TableForm from "./TableForm";

const CreateCompanyPage = () => {
  const { t } = useTranslation("retail");
  const [departments, setDepartments] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [visible, setVisible] = useState(false);
  const users = useSelector((state) => state.retail.employees.data);
  const buildings = useSelector((state) => state.retail.buildings.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (users.length > 0) getManagedEmployee();
    if (buildings.length === 0) dispatch(fetchBuilding());
  }, [users.length]);

  const getManagedEmployee = () => {
    RetailAPI.get("/managed-employee").then((data) => {
      if (Array.isArray(data)) {
        data = data.map((mEmployee, k) => {
          mEmployee.key = k;
          mEmployee.managedByDetail = users?.find(
            (u) => u.id === mEmployee.managedBy || u.id === mEmployee.managedBy
          );
          mEmployee.buildingName = buildings.find(
            (a) => a.id === mEmployee.buildingId
          )?.name;
          return mEmployee;
        });

        setDepartments([...data]);
      }
    });
  };
  return (
    <Page title={t("navigation.companySettings.managedEmployee")}>
      <Card
        extra={
          <Button
            color="red"
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            {t("navigation.companySettings.createManagedEmployee")}
          </Button>
        }
      >
        <TableForm
          visible={visible}
          onClose={() => {
            setIsEdit(false);
            setEditData(null);
            setVisible(!visible);
            getManagedEmployee();
          }}
          isEdit={isEdit}
          editData={editData}
        />
        <Table
          columns={[
            {
              title: "Çalışan Adı",
              key: "contactInfo",
              dataIndex: "contactInfo",
              render: (a) => a?.name || a?.mail,
              defaultSortOrder: "ascend",
              sorter: (a, b) => String(a?.name).localeCompare(b?.name),
            },
            {
              title: "Yöneten Kişi",
              key: "managedByDetail",
              dataIndex: "managedByDetail",
              sorter: (a, b) => String(a?.name).localeCompare(b?.name),
              render: (c, r) => (
                <div className="d-flex items-center">
                  <MapleAvatar {...c} />
                  <small className="ml-2">{c?.name || "N/A"}</small>
                </div>
              ),
            },
            {
              title: "Mağaza",
              key: "buildingName",
              dataIndex: "buildingName",
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
