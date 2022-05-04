import { Card } from "antd";
import Page from "Core/components/page";
import React from "react";
import { useTranslation } from "react-i18next";
import UsersTable from "./Table";
import TableForm from "./TableForm";

const CreateCompanyPage = () => {
  const { t } = useTranslation("retail");
  return (
    <Page title={t("settings.users.card-title")}>
      <Card
        title={t("settings.users.card-title")}
        bordered={false}
        extra={<TableForm />}
      >
        <UsersTable />
      </Card>
    </Page>
  );
};

export default CreateCompanyPage;
