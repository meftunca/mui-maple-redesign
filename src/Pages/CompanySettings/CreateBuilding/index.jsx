import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Table } from "antd";
import Page from "Core/components/page";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuilding, fetchLocations } from "Retail/state/actions/retail";
import TableForm from "./TableForm";

const CreateCompanyPage = () => {
  const { t } = useTranslation("retail");
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  const locations = useSelector((state) => state.retail.locations.data);
  const buildings = useSelector((state) => state.retail.buildings.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (buildings.length === 0) dispatch(fetchBuilding());
    if (locations.length === 0) dispatch(fetchLocations());
    columnGenerator();
  }, []);

  useEffect(() => {
    if (buildings.length > 0 && locations.length > 0) {
      let tableData = buildings.map((i) => {
        let findLocation = locations.find((a) => a.id === i.locationId);
        return {
          key: i.id,
          name: i.name,
          description: i.description,
          picture: i.picture ? JSON.parse(i.picture) : undefined,
          location: findLocation?.name || null,
          edit: {
            id: i.id,
            locationId: findLocation?.id,
            name: i.name,
            description: i.description,
            active: i.active || false,
          },
        };
      });
      setData(Array.from(tableData));
    }
  }, [buildings, locations]);

  const columnGenerator = () => {
    const cols = [
      {
        title: "Mağaza Adı",
        key: "name",
        dataIndex: "name",
        defaultSortOrder: "ascend",
        sorter: (a, b) => String(a.name).localeCompare(b.name),
        render: (c, r) => (
          <div>
            <div style={{ width: 200 }}>
              {r.picture?.id && (
                <img src={window.docsPathPrefix(r.picture.id)} />
              )}
            </div>
            <h4>{r.name}</h4>
            <p>{r.description}</p>
          </div>
        ),
      },
      {
        title: "Bölge Adı",
        key: "location",
        dataIndex: "location",
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
    <Page title={t("navigation.companySettings.createStore")}>
      <Card>
        <div className="d-flex justify-end">
          <Button onClick={() => setVisible(!visible)} type="primary">
            {t("navigation.companySettings.createStore")}
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
          dispatch(fetchBuilding());
        }}
        isEdit={isEdit}
        editData={editData}
      />
    </Page>
  );
};

export default CreateCompanyPage;
