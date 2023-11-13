import { Dispatch } from "react";
import DashboardItem from "../../DashboardItem";
import { DashboardAction, TDashboard } from "../../types";
import DashboardFolder from "../../DashboardFolder";
import { cloneItem } from "../services/cloneItem";

const cutItemsToFolder = (items: DashboardItem[], folder: DashboardFolder) => {
  items.forEach(item => {
    const parent = item.getParent();
    if (parent) {
      parent.moveChildToAnotherFolder(item, folder);
    } else {
      folder.addChild(item);
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
