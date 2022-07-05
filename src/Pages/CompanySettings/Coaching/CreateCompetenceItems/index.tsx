import { DeleteOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { RetailAPI } from "Core/API";
import MapleAvatar from "Core/components/avatar";
import Page from "Core/components/page";
import dayjs from "dayjs";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoachingCompetenceItems } from "Retail/state/actions/Coaching";
import { fetchEmployees } from "Retail/state/actions/retail";
import CreateCoachingCompetencesItem from "./Dialog";

const CoachingCompetenceItemsPage = () => {
  const { t } = useTranslation("retail");
  const employees = useSelector((state) => state.retail.employees.data);
  const competencesBaseList = useSelector(
    (state) => state.coachingCompetenceList.data
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (employees.length === 0) dispatch(fetchEmployees());
  }, [employees.length]);

  useEffect(() => {
    fetchCompetencesList();
  }, []);

  const competencesList = useMemo(() => {
    if (employees?.length === 0 || competencesBaseList?.length === 0) return [];
    const list = competencesBaseList
      .map((competenceItem) => {
        competenceItem.creator = employees.find(
          (a) => a.id === competenceItem.createdBy
        );
        return competenceItem;
      })
      .filter((a) => !!a?.creator);

    return list;
  }, [employees, competencesBaseList]);
  // const getEmployee = (id) => {
  //   let employeeData = employees.find((a) => a.id === id);
  //   if (employeeData === undefined) return null;
  //   return (
  //     <div className="d-flex items-center" style={{ minWidth: 160 }}>
  //       <MapleAvatar {...employeeData} size={26} />
  //       <span className="title ml-1" style={{ opacity: 1 }}>
  //         {employeeData.name}
  //       </span>
  //     </div>
  //   );
  // };

  const fetchCompetencesList = () => {
    dispatch(fetchCoachingCompetenceItems());
  };
  return (
    <Page
      title={t("navigation.companySettings.coaching.competenceItems")}
      headerContent={
        <CreateCoachingCompetencesItem
          fetchCompetencesList={fetchCompetencesList}
        />
      }
    >
      <Table
        dataSource={competencesList}
        columns={[
          {
            title: "Creator",
            key: "createdBy",
            dataIndex: "creator",
            render: (creator) => (
              <div className="d-flex items-center" style={{ minWidth: 160 }}>
                <MapleAvatar {...creator} size={26} />
                <span className="title ml-1" style={{ opacity: 1 }}>
                  {creator.name}
                </span>
              </div>
            ),
          },
          {
            title: "Title",
            key: "title",
            dataIndex: "title",
            sorter: (a, b) => a.title.localeCompare(b.title),
          },
          {
            title: "Description",
            key: "description",
            dataIndex: "description",
            sorter: (a, b) => a.description.localeCompare(b.description),
          },
          {
            title: "Time Created",
            key: "timeCreated",
            dataIndex: "timeCreated",
            sorter: (a, b) => dayjs(a.timeCreated).isAfter(b.timeCreated),
            render: (a) => {
              return dayjs(a).format("YYYY-MM-DD");
            },
          },
          {
            title: "",
            dataIndex: "id",
            key: "id",
            render: (id) => (
              <Button
                icon={<DeleteOutlined />}
                onClick={() => {
                  RetailAPI.delete("/coaching/competence-item/" + id).then(() =>
                    fetchCompetencesList()
                  );
                }}
              />
            ),
          },
        ]}
        pagination={{ hideOnSinglePage: true, size: "small" }}
      />
    </Page>
  );
};

export default CoachingCompetenceItemsPage;
