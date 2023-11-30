import { Dispatch } from "react";
import { DashboardAction, DashboardItem, DashboardItemCandidate, DashboardItemID, DashboardView } from "../../types";
import { add } from "./add";
import { clone } from "./clone";
import { move } from "./move";
import { refreshDashboard } from "./refreshDashboard";
import { getItemID, itemIsCandidate } from "../../util";

const cutItemsToFolder = async (
  items: (DashboardItem | DashboardItemCandidate)[],
  folderID: DashboardItemID
) => {
  for (const item of items) {
    if (itemIsCandidate(item)) {
      await add(folderID, item);
    } else {
      await move(getItemID(item), folderID);
    }
  }
};

const copyItemsToFolder = async (
  items: DashboardItem[],
  folderID: DashboardItemID
) => {
  const copiedItems = items.map((item) => clone(item));
  await cutItemsToFolder(copiedItems, folderID);
  return copiedItems;
};

export const paste = async (
  dashboard: DashboardView,
  folderID: DashboardItemID,
  dispatch: Dispatch<DashboardAction>
) => {
  const { cut, copied } = dashboard.clipboard;
  dispatch({ type: "reset_clipboard" });

  await cutItemsToFolder(cut, folderID);
  await copyItemsToFolder(copied, folderID);
  await refreshDashboard(dashboard, dispatch);
};
