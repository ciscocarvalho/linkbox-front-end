"use client";
import { useContext, useEffect, useState } from "react";
import IconButton from "../../../../components/IconButton";
import {
  DashboardContext,
  DashboardDispatchContext,
} from "../contexts/DashboardContext";
import { goBack } from "../utils/actions/goBack";
import { paste } from "../utils/actions/paste";
import { refreshDashboard } from "../utils/actions/refreshDashboard";
import FolderBreadcrumb from "./FolderBreadcrumb";
import { getItemID } from "../utils";
import AddItemDialog from "./AddItemDialog";

const CardsHeader = () => {
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);
  const { currentFolder, clipboard } = dashboard;
  const clipboardInUse =
    clipboard.cut.length > 0 || clipboard.copied.length > 0;
  const [inSubfolder, setInSubfolder] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setInSubfolder(!!dashboard.dataOfCurrentFolder?.parent);
  }, [dashboard.dataOfCurrentFolder?.parent]);

  return (
    <header className="flex justify-between items-center min-h-[60px] h-[60px] py-[8px] px-[20px]">
      <div className="flex justify-center items-center gap-[20px]">
        {inSubfolder ? (
          <IconButton
            onClick={async () => await goBack(dashboard, dispatch)}
            icon="arrow_back"
          />
        ) : null}

        <FolderBreadcrumb folder={currentFolder} />
      </div>

      <div className="flex justify-center items-center gap-[20px]">
        {clipboardInUse ? (
          <>
            <IconButton
              onClick={() => dispatch({ type: "reset_clipboard" })}
              icon="cancel"
            />
            <IconButton
              onClick={async (e) => {
                e.stopPropagation();
                await paste(dashboard, getItemID(currentFolder), dispatch);
                await refreshDashboard(dashboard, dispatch);
              }}
              icon="content_paste"
            />
          </>
        ) : null}

        <IconButton onClick={() => setOpenDialog(true)} icon="add" />

        <AddItemDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
      </div>
    </header>
  );
};

export default CardsHeader;
