import React from "react";
import SectionButton from "./Sections/Button";
import SectionDrawer from "./Sections/Drawer";
import SectionInput from "./Sections/Inputs";
import SectionModal from "./Sections/Modals";
import SectionPagination from "./Sections/Pagination";

const StoryBoardPage = () => {
  return (
    <div>
      <SectionButton />
      <SectionModal />
      <SectionDrawer />
      <SectionPagination />
      <SectionInput />
    </div>
  );
};

export default StoryBoardPage;
