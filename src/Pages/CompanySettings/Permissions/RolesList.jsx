import { Menu } from "antd";
import React, {
  forwardRef,
  Fragment,
  useEffect,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "Retail/state/actions/roles";

const PermissionsList = forwardRef(({}, ref) => {
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
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{ height: "100%" }}
    >
      {permissions.data.map(({ name }, key) => (
        <Fragment key={String(key)}>
          <Menu.Item key={String(key + 1)}>{name}</Menu.Item>
        </Fragment>
      ))}
    </Menu>
  );
});
export default PermissionsList;
