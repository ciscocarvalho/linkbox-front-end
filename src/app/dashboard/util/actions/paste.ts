import { Dispatch } from "react";
import { DashboardAction, DashboardFolder, DashboardItem, DashboardItemCandidate, DashboardView } from "../../types";
import { add } from "./add";
import { clone } from "./clone";
import { move } from "./move";
import { refreshDashboard } from "./refreshDashboard";
import { itemIsCandidate } from "../../util";

const cutItemsToFolder = async (
  items: (DashboardItem | DashboardItemCandidate)[],
  folder: DashboardFolder
) => {
  for (const item of items) {
    if (itemIsCandidate(item)) {
      await add(folder, item);
    } else {
      await move(item, folder);
    }
  }
};

const copyItemsToFolder = async (
  items: DashboardItem[],
  folder: DashboardFolder
) => {
  const copiedItems = items.map((item) => clone(item));
  await cutItemsToFolder(copiedItems, folder);
  return copiedItems;
};

export const paste = async (
  dashboard: DashboardView,
  folder: DashboardFolder,
  dispatch: Dispatch<DashboardAction>
) => {
  const { cut, copied } = dashboard.clipboard;
  dispatch({ type: "reset_clipboard" });

  await cutItemsToFolder(cut, folder);
  await copyItemsToFolder(copied, folder);
  await refreshDashboard(dashboard, dispatch);
};
