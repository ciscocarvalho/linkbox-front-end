import { Dispatch } from "react";
import DashboardItem from "../../DashboardItem";
import { DashboardAction } from "../../types";
import DashboardFolder from "../../DashboardFolder";

export const add = (
  currentFolder: DashboardFolder,
  item: DashboardItem,
  dispatch: Dispatch<DashboardAction>
) => {
  currentFolder.addChild(item);
  dispatch({ type: "display", item });
};
