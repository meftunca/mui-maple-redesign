import { Card } from "antd";
import Page from "Core/components/page";
import React from "react";
import { useTranslation } from "react-i18next";
import CreateCompanyTableForm from "./TableForm";

const CreateCompanyPage = () => {
  const { t } = useTranslation("retail");
  return (
    <Page title={t("navigation.companySettings.createCompany")}>
      <Card>
        <CreateCompanyTableForm />
      </Card>
    </Page>
  );
};

export default CreateCompanyPage;
