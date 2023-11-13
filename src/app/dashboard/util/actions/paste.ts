import { Dispatch } from "react";
import { DashboardAction, DashboardFolder, DashboardItem, DashboardView } from "../../types";
import { add } from "./add";
import { clone } from "./clone";
import { getParent } from "./getParent";
import { move } from "./move";
import { refreshDashboard } from "./refreshDashboard";

const cutItemsToFolder = async (
  items: DashboardItem[],
  folder: DashboardFolder
) => {
  for (const item of items) {
    const parent = await getParent(item);
    if (parent) {
      await move(item, folder);
    } else {
      await add(folder, item);
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
