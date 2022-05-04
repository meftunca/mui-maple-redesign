import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Table } from "antd";
import { RetailAPI } from "Core/API";
import Page from "Core/components/page";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBuilding,
  fetchDistricts,
  fetchLocations,
} from "Retail/state/actions/retail";
import TableForm from "./TableForm";

const CreateCompanyPage = () => {
  const { t } = useTranslation("retail");
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  const locations = useSelector((state) => state.retail.locations.data);
  const districts = useSelector((state) => state.retail.districts.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (districts.length === 0) dispatch(fetchDistricts());
    if (locations.length === 0) dispatch(fetchLocations());
    columnGenerator();
  }, []);

  useEffect(() => {
    if (districts.length > 0 && locations.length > 0) {
      let tableData = locations
        .map((i) => {
          let findDistrict = districts.find((a) => a.id === i.districtId);
          return {
            key: i.id,
            name: i.name,
            description: i.description,
            picture: i.picture ? JSON.parse(i.picture) : undefined,
            district: findDistrict?.name || null,
            edit: i,
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
      setData(Array.from(tableData));
    }
  }, [districts, locations]);

  const columnGenerator = () => {
    const cols = [
      {
        title: "Mağaza Adı",
        key: "name",
        dataIndex: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ["ascend", "descend"],
      },
      {
        title: "Bölge Adı",
        key: "district",
        dataIndex: "district",
        sorter: (a, b) => a.district.localeCompare(b.district),
        sortDirections: ["ascend", "descend"],
      },
      {
        title: "Ayarlar",
        key: "edit",
        dataIndex: "edit",
        render: (c, r) => {
          return (
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={() => {
                setIsEdit(true);
                setEditData({ ...c });
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
    ];

    setColumns(Array.from(cols));
  };
  return (
    <Page title={t("navigation.companySettings.createLocation")}>
      <Card>
        <div className="d-flex justify-end">
          <Button onClick={() => setVisible(!visible)} type="primary">
            {t("navigation.companySettings.createLocation")}
          </Button>
        </div>
        <Divider />
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ hideOnSinglePage: true, size: "small" }}
        />
      </Card>
      <TableForm
        visible={visible}
        onClose={() => {
          setIsEdit(false);
          setEditData(null);
          setVisible(!visible);
          dispatch(fetchLocations());
        }}
        isEdit={isEdit}
        editData={editData}
      />
    </Page>
  );
};

export default CreateCompanyPage;
