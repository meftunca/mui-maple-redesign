import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Card, Button, message } from "antd";

import Page from "Core/components/page";
import Permissions from "./permissions";
import CreatePermission from "./create-permissions";

export default () => {
  const { t } = useTranslation("retail");
  const [modalVisibility, setModalVisibility] = useState(false);
  const listRef = useRef(null);
  return (
    <Page title={t("navigation.companySettings.permission")}>
      <CreatePermission
        onCancel={() => {
          setModalVisibility(false);
          message.info("Güncel İzin Listesi Alınıyor...");
          setTimeout(() => {
            listRef.current?.fetch();
            message.destroy();
          }, 700);
        }}
        visible={modalVisibility}
      />
      <Card
        type="header-bg-primary"
        title={t("settings.permissions.card-title")}
        bordered={false}
        extra={
          <Button
            icon={<PlusCircleOutlined />}
            onClick={() => setModalVisibility(true)}
          >
            {t("settings.permissions.create-permission-button")}
          </Button>
        }
      >
        <Permissions ref={listRef} />
      </Card>
    </Page>
  );
};
