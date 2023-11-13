import { Dispatch } from "react";
import DashboardItem from "../../DashboardItem";
import { DashboardAction } from "../../types";
import DashboardFolder from "../../DashboardFolder";
import { moveItem } from "../services/moveItem";

export const move = (
  item: DashboardItem,
  folder: DashboardFolder,
  dispatch: Dispatch<DashboardAction>
) => {
  moveItem(item, folder);
  dispatch({ type: "refresh" });
};
