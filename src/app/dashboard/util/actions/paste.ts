import { Dispatch } from "react";
import DashboardItem from "../../DashboardItem";
import { DashboardAction, TDashboard } from "../../types";
import DashboardFolder from "../../DashboardFolder";
import { cloneItem } from "../services/cloneItem";
import { getParent } from "../services/getParent";
import { addItem } from "../services/addItem";
import { moveItem } from "../services/moveItem";

const cutItemsToFolder = (items: DashboardItem[], folder: DashboardFolder) => {
  items.forEach(item => {
    const parent = getParent(item);
    if (parent) {
      moveItem(item, folder);
    } else {
      addItem(folder, item);
    }
  });
}

const copyItemsToFolder = (items: DashboardItem[], folder: DashboardFolder) => {
  const copiedItems = items.map(item => cloneItem(item));
  cutItemsToFolder(copiedItems, folder);
  return copiedItems;
}

export const paste = (
  dashboard: TDashboard,
  folder: DashboardFolder,
  dispatch: Dispatch<DashboardAction>
) => {
  const { cut, copied } = dashboard.clipboard;
  dispatch({ type: "reset_clipboard" });

  cutItemsToFolder(cut, folder);
  dispatch({ type: "display_many", items: cut });

  const items = copyItemsToFolder(copied, folder);
  dispatch({ type: "display_many", items: items });
};
