import { Dispatch } from "react";
import DashboardItem from "../../DashboardItem";
import { DashboardAction } from "../../types";
import DashboardFolder from "../../DashboardFolder";

export const move = (
  item: DashboardItem,
  folder: DashboardFolder,
  dispatch: Dispatch<DashboardAction>
) => {
  item.getParent()?.moveChildToAnotherFolder(item, folder);
  dispatch({ type: "refresh" });
};
