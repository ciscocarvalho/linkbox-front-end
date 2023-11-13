import { Dispatch } from "react";
import DashboardItem from "../../DashboardItem";
import { DashboardAction } from "../../types";
import DashboardFolder from "../../DashboardFolder";
import { move } from "./move";

export const moveMany = (
  items: DashboardItem[],
  folder: DashboardFolder,
  dispatch: Dispatch<DashboardAction>
) => {
  items.forEach(item => { move(item, folder, dispatch) });
};
