// import { PlusCircleOutlined } from "@ant-design/icons";
// import { Button, Card } from "antd";
// import Page from "Core/components/page";
// import React, { useRef, useState } from "react";
// import { useTranslation } from "react-i18next";

// export default () => {
//   const { t } = useTranslation("retail");
//   const [modalVisibility, setModalVisibility] = useState(false);
//   const listRef = useRef(null);
//   return (
//     <Page title={t("navigation.companySettings.permission")}>
//       <Card
//         type="header-bg-primary"
//         title={t("settings.permissions.card-title")}
//         bordered={false}
//         extra={
//           <Button
//             icon={<PlusCircleOutlined />}
//             onClick={() => setModalVisibility(true)}
//           >
//             {t("settings.permissions.create-permission-button")}
//           </Button>
//         }
//       >
//         {/* <Permissions ref={listRef} /> */}
//       </Card>
//     </Page>
//   );
// };
import { Layout, Menu } from "antd";
import Page from "Core/components/page";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ModulesTabList from "./ModulesTabList";
import PermissionsList from "./PermissionsList";
import RolesList from "./RolesList";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default () => {
  const [activeModule, setActiveModule] = useState(null);
  const { t } = useTranslation("retail");

  return (
    <Page title={t("navigation.companySettings.permission")}>
      <Layout>
        <Content>
          <ModulesTabList
            activeModule={activeModule}
            setActiveModule={setActiveModule}
          />
          <Layout style={{ padding: "24px 0" }}>
            <Content style={{ paddingRight: 24, minHeight: 280 }}>
              <PermissionsList />
            </Content>
            <Sider width={200}>
              <RolesList />
            </Sider>
          </Layout>
        </Content>
      </Layout>
    </Page>
  );
};
