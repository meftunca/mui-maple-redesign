import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import Table from "Core/components/table";
import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, deleteRoles } from "Retail/state/actions/roles";

const Permissions = forwardRef(({}, ref) => {
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.roles);

  useEffect(() => {
    if (permissions.created === false) dispatch(fetchRoles());
  }, [permissions.created]);

  useImperativeHandle(
    ref,
    () => {
      return {
        fetch: () => dispatch(fetchRoles()),
      };
    },
    []
  );

  const PermissionColumns = [
    {
      title: "",
      dataIndex: "avatar",
      width: 120,
      render: (col, row) => (
        <Avatar size="large">{row.name.slice(0, 2).toUpperCase()}</Avatar>
      ),
    },
    {
      title: "Permission Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "",
      dataIndex: "operation",
      width: 80,
      render: (col, row) => (
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          onClick={() => dispatch(deleteRoles({ id: row.id }))}
        >
          Delete
        </Button>
      ),
    },
  ];
  return (
    <Table
      rowKey="id"
      bordered={false}
      pagination={permissions.data.length < 10 ? false : true}
      dataSource={permissions.data}
      columns={PermissionColumns}
    />
  );
});
export default Permissions;
