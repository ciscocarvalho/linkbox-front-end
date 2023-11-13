"use client";
import { useContext, useEffect, useState } from "react";
import IconButton from "../../components/IconButton";
import { DashboardContext, DashboardDispatchContext } from '../contexts/DashboardContext';
import { inputNewItem } from "../util";
import { add } from "../util/actions/add";
import { getParent } from "../util/actions/getParent";
import { goBack } from "../util/actions/goBack";
import { paste } from "../util/actions/paste";
import { refreshDashboard } from "../util/actions/refreshDashboard";
import { DashboardItem } from "../types";

const CardsHeader = () => {
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);
  const { currentFolder, clipboard } = dashboard;
  const clipboardInUse =
    clipboard.cut.length > 0 || clipboard.copied.length > 0;
  const [inSubfolder, setInSubfolder] = useState(false);

  useEffect(() => {
    getParent(currentFolder).then((parent) => {
      const newInSubfolder = parent !== null;
      setInSubfolder(newInSubfolder);
    });
  }, [currentFolder]);

  return (
    <header className="flex justify-between items-center min-h-[60px] h-[60px] py-[8px] px-[20px]">
      <div className="flex justify-center items-center gap-[20px]">
        {inSubfolder ? (
          <IconButton
            onClick={async () => await goBack(currentFolder, dispatch)}
            icon="arrow_back"
          />
        ) : null}
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
                await paste(dashboard, currentFolder, dispatch);
                await refreshDashboard(dashboard, dispatch);
              }}
              icon="content_paste"
            />
          </>
        ) : null}

        <IconButton
          onClick={async () => {
            const item = inputNewItem();
            if (!item) {
              return;
            }
            await add(dashboard.currentFolder, item as any as DashboardItem);
            await refreshDashboard(dashboard, dispatch);
          }}
          icon="add"
        />

        {inSubfolder ? <p>{currentFolder.name}</p> : null}
      </div>
    </header>
  );
};

export default CardsHeader;
