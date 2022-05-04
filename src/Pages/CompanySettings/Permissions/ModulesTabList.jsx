import { Tabs } from "antd";
import { capitalize } from "lodash-es";
import React from "react";
const { TabPane } = Tabs;

const moduleNames = [
  "visit",
  "checklist",
  "task",
  "knowledge_base",
  "coaching",
  "portal",
  "stores",
  "activity",
];

const ModulesTabList = ({
  activeModule = null,
  setActiveModule = console.log,
}) => {
  return (
    <Tabs className="default" defaultActiveKey="1" onChange={setActiveModule}>
      <TabPane tab={"Tümü"}></TabPane>
      {moduleNames.map((a) => (
        <TabPane tab={capitalize(a.replaceAll("_", " "))} key={a}></TabPane>
      ))}
    </Tabs>
  );
};

export default ModulesTabList;
