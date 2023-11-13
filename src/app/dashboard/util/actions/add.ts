import { Dispatch } from "react";
import DashboardItem from "../../DashboardItem";
import { DashboardAction } from "../../types";
import DashboardFolder from "../../DashboardFolder";
import { addItem } from "../services/addItem";

export const add = (
  currentFolder: DashboardFolder,
  item: DashboardItem,
  dispatch: Dispatch<DashboardAction>
) => {
  addItem(currentFolder, item);
  dispatch({ type: "display", item });
};
