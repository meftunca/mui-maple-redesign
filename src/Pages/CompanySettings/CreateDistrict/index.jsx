import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Table } from "antd";
import Page from "Core/components/page";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchDistricts } from "Retail/state/actions/retail";
import TableForm from "./TableForm";
import { fetchEmployees } from "Retail/state/actions/retail";

const CreateCompanyPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const users = useSelector((state) => state.retail.employees.data);
  const districts = useSelector((state) =>
    state.retail.districts.data.sort((a, b) =>
      ("" + a.name).localeCompare(b.name)
    )
  );
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation("retail");
  useEffect(() => {
    if (users.length === 0) dispatch(fetchEmployees());
    if (districts.length === 0) dispatch(fetchDistricts());
  }, []);
  const dataSources = useMemo(() => {
    return districts.map((district) => {
      district.manager =
        users.find((a) => a.employeeId === district.managerId)?.name ||
        "Atanmadı";
      return district;
    });
  }, [districts, users]);
  return (
    <Page title={t("navigation.companySettings.createDistrict")}>
      <TableForm
        visible={visible}
        onClose={() => {
          setIsEdit(false);
          setEditData(null);
          setVisible(!visible);
          dispatch(fetchDistricts());
        }}
        isEdit={isEdit}
        editData={editData}
      />
      <Card>
        <div className="d-flex justify-end">
          <Button type="primary" onClick={() => setVisible(!visible)}>
            Yeni Bölge Oluştur
          </Button>
        </div>
        <Divider />
        <Table
          columns={[
            {
              title: "Bölge Adı",
              dataIndex: "name",
              key: "name",
              sorter: {
                compare: (a, b) => ("" + a.name).localeCompare(b.name),
                multiple: 3,
              },
            },
            {
              title: "Yönetici Adı",
              dataIndex: "manager",
              key: "manager",
              sorter: {
                compare: (a, b) => ("" + a.name).localeCompare(b.name),
                multiple: 3,
              },
            },
            {
              title: "Ayarlar",
              width: 120,
              render: (c, r) => (
                <Button
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setIsEdit(true);
                    setEditData({ ...r });
                    setTimeout(() => {
                      setVisible(true);
                    }, 100);
                  }}
                >
                  Düzenle
                </Button>
              ),
            },
          ]}
          dataSource={dataSources}
        />
      </Card>
    </Page>
  );
};

export default CreateCompanyPage;
