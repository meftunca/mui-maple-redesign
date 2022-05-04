import { EditOutlined } from "@ant-design/icons";
import { Button, Input, message, Table } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBuilding,
  fetchDepartments,
  fetchEmployees,
  fetchPermissions,
} from "Retail/state/actions/retail";
import EditNewUserForm from "./EditUser";

const UsersTable = () => {
  const [searchText, setSearchText] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const users = useSelector((state) => state.retail.employees.data);
  const buildings = useSelector((state) => state.retail.buildings.data);
  const departments = useSelector((state) => state.retail.departments?.data);
  const permissions = useSelector((state) => state.retail.permissions?.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (users.length === 0) dispatch(fetchEmployees());
    if (buildings.length === 0) dispatch(fetchBuilding());
    if (departments.length === 0) dispatch(fetchDepartments());
    if (permissions.length === 0) dispatch(fetchPermissions());
  }, []);
  useEffect(() => {
    if (buildings.length > 0 && departments.length > 0) {
      const newUsers = users.map((i) => {
        i.building = buildings.find((a) => a.id === i.buildingId);
        i.department = departments.find((a) =>
          i.departments?.some((d) => d.id === a.id)
        );
        return i;
      });
      setUserList(Array.from(newUsers));
      setIsLoading(false);
    }
  }, [users.length, departments.length > 0, buildings.length > 0]);

  const onClose = (newData) => {
    if (newData === undefined) return setEditUser(null);
    const findIndex = userList.findIndex((u) => u.userId === newData.userId);
    if (findIndex === -1) return message.info("Kullanıcı Bulunamadı");
    const newList = userList;
    newList[findIndex] = newData;
    newList[findIndex].building = buildings.find(
      (a) => a.id === newData.buildingId
    );
    setUserList(Array.from(newList));
    setEditUser(null);
  };

  const userFilteredList = useMemo(() => {
    return userList.filter((i) =>
      i.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }, [userList, searchText.length]);

  return (
    <>
      <Input.Search onSearch={setSearchText} />
      <Table
        loading={isLoading}
        dataSource={userFilteredList}
        columns={[
          {
            title: "Adı",
            key: "name",
            dataIndex: "name",
            defaultSortOrder: "ascend",
            sorter: (a, b) => String(a.name).localeCompare(b.name),
          },
          {
            title: "Mağaza",
            render: (col, row) => row.building?.name || "N/A",
            sorter: (a, b) =>
              String(a.building?.name).localeCompare(b.building?.name),
          },
          {
            title: "Departman",
            render: (col, row) => row.department?.name || "N/A",
            sorter: (a, b) =>
              String(a.department?.name).localeCompare(b.department?.name),
          },
          {
            title: "Rol",
            render: (col, row) =>
              row.permissions?.map((a) => a.name)?.join(", "),
          },
          {
            render: (_, row) => (
              <Button onClick={() => setEditUser(row)} icon={<EditOutlined />}>
                Düzenle
              </Button>
            ),
          },
        ]}
      />
      {editUser !== null && (
        <EditNewUserForm
          visible={editUser !== null}
          initial={editUser}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default UsersTable;
